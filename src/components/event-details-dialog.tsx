"use client";

import Image from "next/image";
import type { RefObject } from "react";
import { CalendarDays, Check, MapPin, Users, X } from "lucide-react";
import {
  DialogClose,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { EventRegistrationAction } from "@/components/event-registration-action";
import { type SpectraEvent, site } from "@/lib/content";

export function EventDetailsDialog({
  event,
  triggerRef,
  onClose,
}: {
  event: SpectraEvent | null;
  triggerRef: RefObject<HTMLButtonElement | null>;
  onClose: () => void;
}) {
  return (
    <Dialog open={event !== null} onOpenChange={(open) => !open && onClose()}>
      {event && (
        <DialogContent
          showCloseButton={false}
          onCloseAutoFocus={(e) => {
            e.preventDefault();
            triggerRef.current?.focus();
          }}
          className="event-details-reveal max-h-[92svh] w-[calc(100%-1rem)] max-w-5xl gap-0 overflow-y-auto rounded-3xl border-[#fff0de] bg-[#fbf5f0] p-0 shadow-[0_30px_100px_#170b20a6] sm:max-w-5xl sm:w-[calc(100%-3rem)] md:grid md:grid-cols-[.8fr_1.2fr] md:overflow-hidden"
        >
          <DialogClose
            aria-label="Close event details"
            className="absolute top-3 right-3 z-20 flex size-11 items-center justify-center rounded-full border border-white/55 bg-[#1c111c]/55 text-white shadow-sm transition-colors hover:bg-[#1c111c]/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:top-5 md:right-5 md:border-[#24181e]/15 md:bg-white/95 md:text-[#24181e] md:hover:bg-white"
          >
            <X className="size-5" />
            <span className="sr-only">Close event details</span>
          </DialogClose>
          <div className="relative aspect-[1.34] overflow-hidden bg-[#241420] md:aspect-auto md:min-h-[570px]">
            <Image
              src={event.cardImage}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
            />
            <Image
              src={event.image}
              alt={`${event.name} event artwork`}
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#180b18]/85 via-transparent to-[#180b18]/15" />
            <div className="absolute right-6 bottom-6 left-6 text-white sm:right-8 sm:bottom-8 sm:left-8">
              <p className="text-[9px] font-semibold tracking-[.25em] text-[#ffd2bf] uppercase">
                Spectra ’26 · {event.category}
              </p>
              <p className="mt-3 font-display text-3xl leading-tight tracking-tight sm:text-4xl">
                {event.tagline}
              </p>
            </div>
          </div>
          <div className="p-5 sm:p-8 md:max-h-[88svh] md:overflow-y-auto md:p-9 lg:p-11">
            <DialogHeader className="pr-10 text-left">
              <p className="text-[9px] font-semibold tracking-[.25em] text-primary uppercase">
                Step into your world
              </p>
              <DialogTitle className="mt-3 font-display text-3xl leading-tight font-medium tracking-[-.045em] sm:text-4xl">
                {event.name}
              </DialogTitle>
              <DialogDescription className="pt-3 text-sm leading-relaxed text-muted-foreground sm:text-base sm:leading-7">
                {event.description}
              </DialogDescription>
            </DialogHeader>

            <div className="my-6 grid gap-3 border-y py-5 text-xs sm:grid-cols-2 sm:text-sm">
              <p className="flex items-start gap-3">
                <CalendarDays className="mt-0.5 size-4 shrink-0 text-primary" />{site.date}
              </p>
              <p className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />{site.venue}
              </p>
              <p className="flex items-start gap-3 sm:col-span-2">
                <Users className="mt-0.5 size-4 shrink-0 text-primary" />{event.format} · Participation details to be announced
              </p>
            </div>

            <h3 className="font-display text-base font-medium">What to look forward to</h3>
            <ul className="mt-3 space-y-2.5">
              {event.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-2.5 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" />{highlight}
                </li>
              ))}
            </ul>

            <EventRegistrationAction url={event.registrationUrl} className="mt-7 w-full sm:w-auto" />
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}
