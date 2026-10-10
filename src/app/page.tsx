import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { EventCarousel } from "@/components/event-carousel";
import { Eyebrow } from "@/components/page-intro";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/content";

export default function Home() {
  return (
    <>
      <section
        className="relative isolate overflow-hidden bg-[#f2ded1] pb-8 sm:pb-10"
        aria-label="Welcome to Spectra"
      >
        <Image
          src="/images/spectra-scene.svg"
          alt=""
          fill
          preload
          sizes="100vw"
          className="pointer-events-none -z-10 object-cover object-center opacity-95"
        />
        <h1 className="sr-only">Spectra’26 — a festival of ideas, people, and culture</h1>
        <div className="absolute inset-0 -z-10 bg-linear-to-b from-[#f5e9e2] via-transparent to-[#efdbcf]/60" />
        <div className="pt-2 sm:pt-4">
          <EventCarousel />
        </div>
        <div className="mx-auto mt-1 flex max-w-4xl flex-col items-center justify-center gap-x-10 gap-y-2 px-5 text-center text-[10px] tracking-[.08em] text-foreground/70 uppercase sm:flex-row sm:text-xs">
          <span>{site.date}</span>
          <span className="hidden h-1 w-1 rounded-full bg-primary/60 sm:block" />
          <span>{site.venue}</span>
        </div>
      </section>

      <div
        className="overflow-hidden border-y border-primary/10 bg-[#f2e1da] py-5"
        aria-hidden="true"
      >
        <div className="mx-auto flex w-max items-center justify-center gap-8 font-display text-xs tracking-[.22em] text-[#88535e] sm:gap-14">
          {[
            "CREATE",
            "COMPETE",
            "CONNECT",
            "CELEBRATE",
            "CREATE",
            "COMPETE",
          ].map((word, i) => (
            <span key={i} className="flex items-center gap-8 sm:gap-14">
              {word}
              <Sparkles className="size-4 text-primary/60" />
            </span>
          ))}
        </div>
      </div>

      <section className="relative overflow-hidden bg-[#281b29] px-5 py-16 text-[#fff1e7] sm:px-8 sm:py-24 lg:px-12">
        <div className="pointer-events-none absolute -top-24 -right-24 size-[500px] rounded-full bg-[radial-gradient(ellipse_at_center,#a32c603d,transparent_65%)]" />
        <div className="relative mx-auto grid max-w-[1184px] items-center gap-12 md:grid-cols-[1.2fr_1fr]">
          <div>
            <Eyebrow className="text-[#efa1b6]">The spirit of Spectra</Eyebrow>
            <h2 className="mt-6 font-display text-4xl leading-[1.12] tracking-[-.045em] sm:text-5xl">
              Different passions.
              <br />
              One extraordinary
              <br />
              <span className="text-[#f197ae]">experience.</span>
            </h2>
          </div>
          <div>
            <p className="max-w-md text-base leading-8 text-[#d8c4cf]">
              Some moments are bigger when we share them. Spectra brings the
              CESS community together through technology, creativity, and
              culture. Come for what you love. Stay for what you discover.
            </p>
            <Button
              asChild
              variant="outline"
              className="mt-7 h-12 rounded-full border-white/30 bg-transparent px-6 text-white hover:bg-white/10 hover:text-white"
            >
              <Link href="/about">
                Meet the spirit behind it
                <ArrowUpRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>

    </>
  );
}
