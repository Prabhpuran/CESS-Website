import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <p className="text-xs tracking-[.3em] text-primary uppercase">
        404 · A little off the spectrum
      </p>
      <h1 className="mt-6 font-display text-5xl tracking-tight">
        This page hasn’t
        <br />
        found its moment.
      </h1>
      <p className="mt-6 text-muted-foreground">
        The link may have changed. There’s plenty more to discover at Spectra.
      </p>
      <Button asChild className="mt-8 h-12 rounded-full px-6">
        <Link href="/events">
          <ArrowLeft />
          Explore events
        </Link>
      </Button>
    </div>
  );
}
