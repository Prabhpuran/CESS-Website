import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { EventRegistrationAction } from "@/components/event-registration-action";
import { type SpectraEvent } from "@/lib/content";
import { cn } from "@/lib/utils";

export function EventCard({
  event,
  className,
}: {
  event: SpectraEvent;
  className?: string;
}) {
  return (
    <article className={cn("group", className)}>
      <Link href={`/events/${event.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#251525]">
          <Image
            src={event.cardImage}
            alt=""
            fill
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <span className="absolute top-4 left-4 rounded-full border border-white/25 bg-black/30 px-3 py-1.5 text-[10px] tracking-wider text-white backdrop-blur-sm uppercase">
            {event.category}
          </span>
          <span className="absolute right-4 bottom-4 flex size-11 items-center justify-center rounded-full border border-white/60 bg-black/15 text-white backdrop-blur-sm transition group-hover:rotate-45 group-hover:bg-white group-hover:text-primary">
            <ArrowUpRight className="size-5" />
          </span>
        </div>
        <div className="mt-4 flex items-center justify-between gap-3">
          <h3 className="font-display text-xl font-medium tracking-tight transition-colors group-hover:text-primary">
            {event.name}
          </h3>
          {event.registrationFee ? (
            <span className="shrink-0 text-[10px] font-semibold tracking-wide text-primary uppercase">
              Fee · {event.registrationFee}
            </span>
          ) : (
            <span className="shrink-0 text-[10px] tracking-widest text-muted-foreground uppercase">
              Details
            </span>
          )}
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{event.tagline}</p>
      </Link>
      <EventRegistrationAction
        url={event.registrationUrl}
        eventName={event.name}
        className="mt-4 w-full rounded-full"
      />
    </article>
  );
}
