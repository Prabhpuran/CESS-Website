"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import { EventCard } from "@/components/event-card";
import { Button } from "@/components/ui/button";
import { events } from "@/lib/content";

export function EventBrowser() {
  const [search, setSearch] = useState("");
  const filtered = events.filter(
    (event) => `${event.name} ${event.tagline} ${event.category}`
      .toLowerCase()
      .includes(search.trim().toLowerCase()),
  );
  return (
    <div className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 lg:px-12">
      <div className="mb-8 border-y py-5">
        <div className="flex h-11 items-center gap-3 rounded-full border bg-card px-4 sm:max-w-md sm:px-5">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <input
            type="search"
            aria-label="Search events"
            placeholder="Find your event…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              aria-label="Clear search"
              className="flex size-7 items-center justify-center rounded-full"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
      </div>
      <p className="mb-6 text-xs text-muted-foreground" role="status">
        {filtered.length} {filtered.length === 1 ? "event" : "events"} · Open
        an event card for details and available registration links
      </p>
      {filtered.length ? (
        <div className="grid gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((event) => (
            <EventCard key={event.slug} event={event} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed px-6 py-20 text-center">
          <h2 className="font-display text-2xl">No events found.</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Try a different search term.
          </p>
          <Button
            variant="outline"
            className="mt-6 rounded-full"
            onClick={() => {
              setSearch("");
            }}
          >
            Show all events
          </Button>
        </div>
      )}
    </div>
  );
}
