import type { Metadata } from "next";
import { CalendarDays, MapPin } from "lucide-react";
import { PageIntro } from "@/components/page-intro";
import { EventBrowser } from "@/components/event-browser";
import { site } from "@/lib/content";

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
          Spectra’26 events, review their details, and register through the
          official forms.
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
      <EventBrowser />
    </>
  );
}
