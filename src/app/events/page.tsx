import type { Metadata } from "next";
import { CalendarDays, MapPin } from "lucide-react";
import { PageIntro } from "@/components/page-intro";
import { EventBrowser } from "@/components/event-browser";
import { programSchedule, site } from "@/lib/content";

export const metadata: Metadata = { title: "Explore events" };

export default function EventsPage() {
  return (
    <>
      <PageIntro
        eyebrow="The Spectra programme"
        title="Follow your curiosity."
        accent="Find your stage."
      >
        <p>
          Dance, build, take the stage, or find your voice. Explore the
          Spectra’26 events, review their details, and follow the official
          registration links.
        </p>
      </PageIntro>
      <div className="mx-auto mb-8 grid max-w-7xl gap-4 px-5 sm:grid-cols-2 sm:px-8 lg:px-12">
        <p className="flex items-start gap-3 rounded-xl border bg-card px-4 py-4 text-sm">
          <CalendarDays className="mt-0.5 size-4 shrink-0 text-primary" />
          {site.date}
        </p>
        <p className="flex items-start gap-3 rounded-xl border bg-card px-4 py-4 text-sm">
          <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
          {site.venue}
        </p>
      </div>
      <section className="mx-auto mb-12 max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-semibold tracking-[.2em] text-primary uppercase">Two days of Spectra</p>
            <h2 className="mt-2 font-display text-2xl tracking-tight sm:text-3xl">Festival schedule</h2>
          </div>
          <span className="hidden text-xs text-muted-foreground sm:block">October 2026</span>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {programSchedule.map((day, index) => (
            <article key={day.date} className="rounded-2xl border bg-card p-5 sm:p-6">
              <p className="flex items-center gap-2 text-sm font-semibold">
                <CalendarDays className="size-4 text-primary" />
                Day {index + 1} · {day.date}
              </p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {day.events.map((event) => (
                  <li key={event} className="rounded-lg bg-background/70 px-3 py-2.5 text-sm text-muted-foreground">
                    {event}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
      <EventBrowser />
    </>
  );
}
