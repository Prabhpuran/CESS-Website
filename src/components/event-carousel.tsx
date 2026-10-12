"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { EventDetailsDialog } from "@/components/event-details-dialog";
import { SpectraGlobe } from "@/components/spectra-globe";
import { events, type SpectraEvent } from "@/lib/content";
import { cn } from "@/lib/utils";

const INITIAL_EVENT = 2;
const CARD_GAP = (Math.PI * 2) / events.length;
const ORBIT_SPEED = 0.14; // radians per second; about 25% quicker than the previous carousel
const FLIP_DURATION_MS = 1000;
const EXPAND_DURATION_MS = 480;
const HANDOFF_DURATION_MS = 240;
const REVEAL_FALLBACK_MS = FLIP_DURATION_MS + EXPAND_DURATION_MS + HANDOFF_DURATION_MS + 240;

function orbitMetrics(width: number) {
  const mobile = width < 640;
  const globeRadius = Math.min(width * 0.46, 340);
  const radius = mobile
    ? width * 0.41
    : Math.min(globeRadius - 8, width * 0.38);
  return { mobile, globeRadius, radius };
}

const smoothstep = (from: number, to: number, value: number) => {
  const amount = Math.max(0, Math.min(1, (value - from) / (to - from)));
  return amount * amount * (3 - 2 * amount);
};

export function EventCarousel() {
  const [selected, setSelected] = useState(INITIAL_EVENT);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [flippingSlug, setFlippingSlug] = useState<string | null>(null);
  const [openEvent, setOpenEvent] = useState<SpectraEvent | null>(null);
  const [handoff, setHandoff] = useState(false);
  const [liftStyle, setLiftStyle] = useState<CSSProperties>({});
  const [motionRevision, setMotionRevision] = useState(0);
  const [pageVisible, setPageVisible] = useState(true);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const rotation = useRef(0);
  const selectedIndex = useRef(INITIAL_EVENT);
  const destination = useRef<number | null>(null);
  const dragging = useRef(false);
  const dragged = useRef(false);
  const pointerStart = useRef({ x: 0 });
  const pendingEvent = useRef<SpectraEvent | null>(null);
  const flipTimer = useRef<number | null>(null);
  const handoffTimer = useRef<number | null>(null);
  const dialogTrigger = useRef<HTMLButtonElement | null>(null);
  const stageStyle = useRef({ globeSize: "", globeLayer: "" });

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setReducedMotion(media.matches);
    };
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const update = () => setPageVisible(!document.hidden);
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  useEffect(() => {
    const redraw = () => setMotionRevision((revision) => revision + 1);
    window.addEventListener("resize", redraw, { passive: true });
    return () => window.removeEventListener("resize", redraw);
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const handleWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaX) < 0.5 || flippingSlug || openEvent) return;
      event.preventDefault();
      const delta = event.deltaX * (event.deltaMode === WheelEvent.DOM_DELTA_LINE ? 16 : event.deltaMode === WheelEvent.DOM_DELTA_PAGE ? stage.clientWidth : 1);
      const radius = Math.max(220, orbitMetrics(stage.clientWidth || 360).radius);
      const wasIdle = destination.current === null;
      const currentDestination = destination.current ?? rotation.current;
      // Positive horizontal scrolling moves the visible cards to the right.
      destination.current = currentDestination - delta / radius;
      if (wasIdle) setMotionRevision((revision) => revision + 1);
    };

    stage.addEventListener("wheel", handleWheel, { passive: false });
    return () => stage.removeEventListener("wheel", handleWheel);
  }, [flippingSlug, openEvent]);

  useEffect(() => {
    let frame = 0;
    let lastTime = 0;

    const renderOrbit = (time: number) => {
      const elapsed = lastTime ? Math.min((time - lastTime) / 1000, 0.05) : 0;
      lastTime = time;
      if (!document.hidden) {
        if (!dragging.current && destination.current !== null && reducedMotion) {
          rotation.current = destination.current;
          destination.current = null;
        } else if (!dragging.current && destination.current !== null) {
          const delta = destination.current - rotation.current;
          rotation.current += delta * (1 - Math.exp(-elapsed * 5.5));
          if (Math.abs(delta) < 0.002) {
            rotation.current = destination.current;
            destination.current = null;
          }
        } else {
          rotation.current += ORBIT_SPEED * elapsed;
        }
      }

      const stage = stageRef.current;
      if (stage) {
        const width = stage.clientWidth;
        const { globeRadius, radius } = orbitMetrics(width);
        const activeIndex = ((Math.round(rotation.current / CARD_GAP) + INITIAL_EVENT) % events.length + events.length) % events.length;
        if (activeIndex !== selectedIndex.current) {
          selectedIndex.current = activeIndex;
          setSelected(activeIndex);
        }

        cardRefs.current.forEach((card, index) => {
          if (!card) return;
          const angle = (index - INITIAL_EVENT) * CARD_GAP - rotation.current;
          const front = Math.cos(angle);
          const depth = radius * front;
          const x = radius * Math.sin(angle);
          const shellVisibility = smoothstep(-0.08, 0.5, front);
          const detailVisibility = smoothstep(0.12, 0.68, front);
          const scale = 0.82 + Math.max(0, front) * 0.18;
          const yaw = Math.atan2(Math.sin(angle), Math.cos(angle));
          card.style.transform = `translate3d(calc(-50% + ${x}px), -50%, ${depth}px) rotateY(${yaw}rad) scale(${scale})`;
          const opacity = flippingSlug === events[index].slug ? "0" : `${shellVisibility}`;
          if (card.style.opacity !== opacity) card.style.opacity = opacity;
          const zIndex = `${Math.round(depth + radius + 1)}`;
          if (card.style.zIndex !== zIndex) card.style.zIndex = zIndex;
          const detailsOpacity = `${detailVisibility}`;
          if (card.style.getPropertyValue("--event-details-opacity") !== detailsOpacity) {
            card.style.setProperty("--event-details-opacity", detailsOpacity);
          }
          const pointerEvents = shellVisibility > 0.25 && flippingSlug !== events[index].slug ? "auto" : "none";
          if (card.style.pointerEvents !== pointerEvents) card.style.pointerEvents = pointerEvents;
        });
        const globeSize = `${globeRadius * 2}px`;
        const globeLayer = `${Math.round(radius + 2)}`;
        if (stageStyle.current.globeSize !== globeSize) {
          stage.style.setProperty("--globe-size", globeSize);
          stageStyle.current.globeSize = globeSize;
        }
        if (stageStyle.current.globeLayer !== globeLayer) {
          stage.style.setProperty("--globe-layer", globeLayer);
          stageStyle.current.globeLayer = globeLayer;
        }
      }
      const shouldAnimate = pageVisible;
      if (shouldAnimate) frame = requestAnimationFrame(renderOrbit);
    };

    frame = requestAnimationFrame(renderOrbit);
    return () => cancelAnimationFrame(frame);
  }, [flippingSlug, motionRevision, openEvent, pageVisible, reducedMotion]);

  useEffect(() => () => {
    if (flipTimer.current !== null) window.clearTimeout(flipTimer.current);
    if (handoffTimer.current !== null) window.clearTimeout(handoffTimer.current);
  }, []);

  function finishFlip(event: SpectraEvent, animateHandoff = true) {
    if (pendingEvent.current?.slug !== event.slug) return;
    if (flipTimer.current !== null) window.clearTimeout(flipTimer.current);
    flipTimer.current = null;
    pendingEvent.current = null;
    setOpenEvent(event);
    if (!animateHandoff) {
      setFlippingSlug(null);
      setHandoff(false);
      return;
    }
    setHandoff(true);
    handoffTimer.current = window.setTimeout(() => {
      handoffTimer.current = null;
      setFlippingSlug(null);
      setHandoff(false);
    }, HANDOFF_DURATION_MS);
  }

  function revealEvent(event: SpectraEvent) {
    if (pendingEvent.current) return;
    const posterRequest = new window.Image();
    posterRequest.fetchPriority = "high";
    posterRequest.src = event.image;
    const trigger = dialogTrigger.current;
    const rect = trigger?.getBoundingClientRect();
    if (rect && trigger) {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const stageWidth = stageRef.current?.clientWidth ?? viewportWidth;
      const { mobile, radius: orbitRadius } = orbitMetrics(stageWidth);
      const eventIndex = events.findIndex((item) => item.slug === event.slug);
      const angle = (eventIndex - INITIAL_EVENT) * CARD_GAP - rotation.current;
      const front = Math.cos(angle);
      const depth = orbitRadius * front;
      const yaw = Math.atan2(Math.sin(angle), Math.cos(angle));
      const orbitScale = 0.82 + Math.max(0, front) * 0.18;
      const perspectiveScale = 2000 / Math.max(500, 2000 - depth);
      const startScale = orbitScale * perspectiveScale;
      const cardWidth = trigger.offsetWidth || rect.width;
      const cardHeight = trigger.offsetHeight || rect.height;
      const targetScale = Math.max(1.05, Math.min(
        2.35,
        Math.min(viewportHeight * 0.78, 640) / cardHeight,
        Math.min(viewportWidth * (mobile ? 0.84 : 0.58), 520) / cardWidth,
      ));
      const sourceCenterX = rect.left + rect.width / 2;
      const sourceCenterY = rect.top + rect.height / 2;
      const sourceLeft = sourceCenterX - cardWidth / 2;
      const sourceTop = sourceCenterY - cardHeight / 2;
      setLiftStyle({
        left: sourceLeft,
        top: sourceTop,
        width: cardWidth,
        height: cardHeight,
        "--lift-x": `${viewportWidth / 2 - sourceCenterX}px`,
        "--lift-y": `${viewportHeight / 2 - sourceCenterY}px`,
        "--lift-start-scale": startScale,
        "--lift-target-scale": targetScale,
        "--lift-start-yaw": `${yaw}rad`,
        "--lift-start-opacity": smoothstep(-0.08, 0.5, front),
        "--lift-flip-duration": `${FLIP_DURATION_MS}ms`,
        "--lift-expand-duration": `${EXPAND_DURATION_MS}ms`,
      } as CSSProperties);
    }
    destination.current = null;
    pendingEvent.current = event;
    setFlippingSlug(event.slug);
    if (reducedMotion) {
      finishFlip(event, false);
    } else {
      flipTimer.current = window.setTimeout(() => finishFlip(event), REVEAL_FALLBACK_MS);
    }
  }

  function startDrag(event: PointerEvent<HTMLDivElement>) {
    if (!stageRef.current?.contains(event.target as Node)) return;
    dragging.current = true;
    setMotionRevision((revision) => revision + 1);
    dragged.current = false;
    pointerStart.current = { x: event.clientX };
    destination.current = null;
    const captureTarget = event.target instanceof HTMLElement ? event.target : stageRef.current;
    captureTarget?.setPointerCapture(event.pointerId);
  }

  function moveDrag(event: PointerEvent<HTMLDivElement>) {
    if (!dragging.current) return;
    const deltaX = event.clientX - pointerStart.current.x;
    if (Math.abs(deltaX) > 6) dragged.current = true;
    const radius = Math.max(220, (stageRef.current?.clientWidth ?? 360) * 0.76);
    rotation.current -= deltaX / radius;
    pointerStart.current.x = event.clientX;
  }

  function endDrag() {
    if (!dragging.current) return;
    dragging.current = false;
  }

  useEffect(() => {
    if (!flippingSlug && !openEvent) return;
    const surfaces = Array.from(document.querySelectorAll<HTMLElement>("header, main, footer"));
    const previousInert = surfaces.map((element) => element.inert);
    surfaces.forEach((element) => { element.inert = true; });
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const cancel = (event: KeyboardEvent) => {
      if (!flippingSlug) return;
      if (event.key !== "Escape") return;
      if (flipTimer.current !== null) window.clearTimeout(flipTimer.current);
      if (handoffTimer.current !== null) window.clearTimeout(handoffTimer.current);
      handoffTimer.current = null;
      pendingEvent.current = null;
      setFlippingSlug(null);
      setHandoff(false);
      requestAnimationFrame(() => dialogTrigger.current?.focus());
    };
    window.addEventListener("keydown", cancel);
    return () => {
      document.body.style.overflow = previousOverflow;
      surfaces.forEach((element, index) => { element.inert = previousInert[index]; });
      window.removeEventListener("keydown", cancel);
    };
  }, [flippingSlug, openEvent]);

  const revealedEvent = flippingSlug ? pendingEvent.current ?? openEvent : null;

  return (
    <div
      className="relative mx-auto w-full max-w-[1450px]"
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured events"
      onPointerDown={startDrag}
      onPointerMove={moveDrag}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      <div ref={stageRef} className="orbit-stage">
        <SpectraGlobe />
        {events.map((event, index) => {
          const isSelected = selected === index;
          const flipping = flippingSlug === event.slug;
          return (
            <button
              key={event.slug}
              ref={(element) => { cardRefs.current[index] = element; }}
              type="button"
              data-orbit-card
              tabIndex={isSelected ? 0 : -1}
              aria-label={`Open ${event.name} details`}
              aria-haspopup="dialog"
              onClick={(click) => {
                if (dragged.current) { click.preventDefault(); dragged.current = false; return; }
                dialogTrigger.current = click.currentTarget;
                revealEvent(event);
              }}
              className={cn("orbit-card group", flipping && "orbit-card-hidden")}
              style={{ "--card-width": "clamp(168px, 16.5vw, 226px)" } as CSSProperties}
            >
              <span className="orbit-card-face">
                <Image
                  src={event.cardImage}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 42vw, (max-width: 1024px) 168px, 226px"
                  preload={index === INITIAL_EVENT}
                  loading={index === INITIAL_EVENT ? undefined : Math.abs(index - INITIAL_EVENT) <= 1 ? "eager" : "lazy"}
                  draggable={false}
                  className="object-cover"
                />
                <span className="orbit-card-details">
                  <span className="mb-1 block text-[8px] tracking-[.23em] text-[#ffc5af] uppercase">{event.category}</span>
                  <span className="block font-display text-base font-medium tracking-[.09em] uppercase sm:text-lg">{event.name}</span>
                  {event.registrationFee && (
                    <span className="mt-1 block text-[8px] font-medium tracking-wide text-[#ffd2bf]">Fee · {event.registrationFee}</span>
                  )}
                  <span className="mx-auto mt-3 flex size-9 items-center justify-center rounded-full border border-white/80 transition group-hover:bg-white group-hover:text-primary sm:size-10">
                    <ArrowUpRight className="size-5" />
                  </span>
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <p aria-live="off" aria-atomic="true" className="sr-only">Featured event: {events[selected].name}</p>

      {revealedEvent && createPortal(
          <div className="event-reveal-layer" data-handoff={handoff} role="status" aria-label={`Opening ${revealedEvent.name} details`}>
          <div className="event-reveal-scrim" />
          <div
            className="event-lift"
            style={liftStyle}
            onAnimationEnd={(animation) => {
              if (animation.target !== animation.currentTarget || animation.animationName !== "event-card-expand") return;
              const event = pendingEvent.current;
              if (event) finishFlip(event);
            }}
          >
            <div
              className="event-lift-spin"
            >
              {[false, true].map((back) => (
                <div key={String(back)} className={cn("event-lift-face", back && "event-lift-back")}>
                  {back ? (
                    <div className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_70%_10%,#db4e9270,transparent_48%),linear-gradient(145deg,#27102a,#701344_52%,#190e20)] px-5 text-center text-white">
                      <Image src="/images/cess-logo.svg" alt="" width={40} height={40} />
                      <p className="mt-5 text-[9px] tracking-[.3em] text-[#ffd2bf] uppercase">CESS presents · {revealedEvent.category}</p>
                      <p className="mt-3 font-display text-2xl uppercase">{revealedEvent.name}</p>
                      <p className="mt-3 max-w-[16rem] text-sm leading-relaxed text-white/75">{revealedEvent.tagline}</p>
                    </div>
                  ) : (
                    <>
                      <Image src={revealedEvent.image} alt="" fill sizes="(max-width: 640px) 84vw, 520px" className="object-cover" />
                      <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-[#160b16] via-[#160b16]/80 to-transparent px-4 pt-20 pb-6 text-center text-white">
                        <p className="text-[9px] tracking-[.25em] uppercase">{revealedEvent.category}</p>
                        <p className="mt-2 font-display text-xl uppercase">{revealedEvent.name}</p>
                        <ArrowUpRight className="mx-auto mt-4 size-9 rounded-full border p-1.5" />
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>, document.body,
      )}
      <EventDetailsDialog event={openEvent} triggerRef={dialogTrigger} onClose={() => setOpenEvent(null)} />
    </div>
  );
}
