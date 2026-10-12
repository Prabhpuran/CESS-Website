import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  MapPin,
  Ticket,
  Users,
  Check,
} from "lucide-react";
import { events, site } from "@/lib/content";
import { Eyebrow } from "@/components/page-intro";
import { EventRegistrationAction } from "@/components/event-registration-action";
import { EventCard } from "@/components/event-card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function generateStaticParams() {
  return events.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = events.find((event) => event.slug === slug);
  return {
    title: event?.name || "Event not found",
    description: event?.description,
  };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = events.find((event) => event.slug === slug);
  if (!event) notFound();
  const related = events
    .filter((item) => item.slug !== slug)
    .sort(
      (a, b) =>
        Number(b.category === event.category) -
        Number(a.category === event.category),
    )
    .slice(0, 3);
  return (
    <div className="mx-auto max-w-7xl px-5 pt-8 pb-20 sm:px-8 lg:px-12">
      <Link
        href="/events"
        className="mb-9 inline-flex min-h-11 items-center gap-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase hover:text-primary"
      >
        <ArrowLeft className="size-4" />
        All events
      </Link>
      <div className="grid gap-9 md:grid-cols-[.85fr_1.15fr] lg:gap-16">
        <div className="relative mx-auto aspect-[1054/1492] w-full max-w-md overflow-hidden rounded-[24px] bg-[#251525] shadow-[0_20px_60px_#a9355720]">
          <Image
            src={event.image}
            alt={`${event.name} event poster`}
            fill
            preload
            sizes="(max-width: 768px) 90vw, 40vw"
            className="object-cover"
          />
            <span className="absolute top-5 left-5 rounded-full border border-white/30 bg-black/40 px-4 py-2 text-[10px] tracking-wider text-white backdrop-blur-sm uppercase">
              Event poster
            </span>
        </div>
        <div className="py-2 lg:py-5">
          <Eyebrow>{event.category} · Spectra’26</Eyebrow>
          <h1 className="mt-5 font-display text-5xl leading-[1.05] tracking-[-.05em] sm:text-6xl">
            {event.name}
          </h1>
          <p className="mt-5 font-display text-xl text-primary">
            {event.tagline}
          </p>
          <p className="mt-5 text-base leading-7 text-muted-foreground">
            {event.description}
          </p>
          <div className="my-8 grid gap-4 border-y py-6 text-sm">
            <p className="flex items-center gap-3">
              <CalendarDays className="size-4 text-primary" />
              {event.date ?? site.date}
            </p>
            <p className="flex items-center gap-3">
              <MapPin className="size-4 text-primary" />
              {event.venue ?? site.venue}
            </p>
            <p className="flex items-center gap-3">
              <Users className="size-4 text-primary" />
              {event.format}
            </p>
            {event.registrationFee && (
              <p className="flex items-center gap-3">
                <Ticket className="size-4 text-primary" />
                Registration fee: {event.registrationFee}
              </p>
            )}
          </div>
          {event.registrationNotes?.length ? (
            <div className="mb-7 rounded-xl border border-primary/15 bg-card px-4 py-4">
              <h2 className="font-display text-base font-medium">Registration notes</h2>
              <ul className="mt-2 space-y-2">
                {event.registrationNotes.map((note) => (
                  <li key={note} className="text-sm leading-relaxed text-muted-foreground">{note}</li>
                ))}
              </ul>
            </div>
          ) : null}
          <EventRegistrationAction url={event.registrationUrl} eventName={event.name} className="w-full sm:w-auto" />
          <h2 className="mt-9 font-display text-xl">Key details</h2>
          <ul className="mt-4 space-y-3">
            {event.highlights.map((item) => (
              <li
                key={item}
                className="flex gap-3 text-sm text-muted-foreground"
              >
                <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <section className="mt-16 max-w-3xl">
        <Eyebrow>A few things to know</Eyebrow>
        <h2 className="mt-4 mb-6 font-display text-3xl tracking-tight">
          Before your moment.
        </h2>
        <Accordion type="single" collapsible>
          <AccordionItem value="eligibility">
            <AccordionTrigger className="py-5 text-base">
              Who can participate?
            </AccordionTrigger>
            <AccordionContent className="leading-7 text-muted-foreground">
              Check the official registration link for event-specific
              eligibility, team sizes, and participation requirements.
            </AccordionContent>
          </AccordionItem>
          {event.registrationUrl ? (
            <AccordionItem value="registration">
              <AccordionTrigger className="py-5 text-base">
                How do I register?
              </AccordionTrigger>
              <AccordionContent className="leading-7 text-muted-foreground">
                Use the Register now button on this page to open the official
                registration link. The fee and any additional notes are shown above.
              </AccordionContent>
            </AccordionItem>
          ) : null}
          <AccordionItem value="help">
            <AccordionTrigger className="py-5 text-base">
              Where can I ask a question?
            </AccordionTrigger>
            <AccordionContent className="leading-7 text-muted-foreground">
              Contact details are available on our{" "}
              <Link
                href="/contact"
                className="text-primary underline underline-offset-4"
              >
                contact page
              </Link>
              . Reach out there if you have a question about an event.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
      <section className="mt-16 border-t pt-12">
        <div className="mb-7 flex items-center justify-between gap-4">
          <h2 className="font-display text-3xl tracking-tight">
            Keep exploring.
          </h2>
          <Link
            href="/events"
            className="flex items-center gap-2 text-xs font-semibold text-primary"
          >
            All events
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((item) => (
            <EventCard key={item.slug} event={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
