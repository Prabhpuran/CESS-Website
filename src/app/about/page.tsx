import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Lightbulb,
  HeartHandshake,
  Sparkles,
} from "lucide-react";
import { PageIntro, Eyebrow } from "@/components/page-intro";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "The spirit of Spectra" };

export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="By CESS. For the community."
        title="A spectrum of ideas."
        accent="A world of possibility."
      >
        <p>
          Spectra is where curiosity meets creativity, and strangers become a
          community. A festival built around the things that bring us together.
        </p>
      </PageIntro>
      <div className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 lg:px-12">
        <div className="relative mb-14 aspect-[4/3] overflow-hidden rounded-3xl bg-[#edc9bb] sm:aspect-[2.3]">
          <Image
            src="/images/spectra-scene.svg"
            alt="A warm architectural setting prepared for an illuminated festival"
            fill
            sizes="(max-width: 1280px) 100vw, 1200px"
            className="object-cover object-center"
          />
          <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-[#2b102c]/90 to-transparent px-6 pt-20 pb-7 text-white sm:px-10">
            <p className="text-[10px] tracking-[.25em] uppercase">
              Ideas. People. Culture.
            </p>
            <p className="mt-3 font-display text-3xl tracking-tight sm:text-5xl">
              All our colors. One Spectra.
            </p>
          </div>
        </div>
        <div className="grid gap-8 border-b pb-14 md:grid-cols-2">
          <div>
            <Eyebrow>The idea behind it</Eyebrow>
            <h2 className="mt-5 max-w-md font-display text-4xl leading-tight tracking-[-.04em]">
              There’s more than one way to shine.
            </h2>
          </div>
          <div className="space-y-5 text-base leading-8 text-muted-foreground">
            <p>
              A new idea at HackerWrath. A voice finding its audience. A
              dancer taking the floor. Spectra brings these different energies
              into the same space.
            </p>
            <p>
              Presented by CESS, the festival is a place to explore your
              interests, meet new people, and make something memorable. Our
              official story, team, and programme will be shared as the event
              takes shape.
            </p>
          </div>
        </div>
        <div className="grid gap-8 py-14 md:grid-cols-3">
          {[
            {
              icon: Lightbulb,
              title: "Ideas that move us.",
              text: "Fresh perspectives, curious minds, and the excitement of making something new.",
            },
            {
              icon: HeartHandshake,
              title: "People who inspire us.",
              text: "Shared experiences that turn individual passions into a connected community.",
            },
            {
              icon: Sparkles,
              title: "Culture that connects us.",
              text: "Music, movement, and self-expression in all their different forms.",
            },
          ].map(({ icon: Icon, title, text }, i) => (
            <div key={title}>
              <div className="mb-5 flex items-center justify-between">
                <Icon className="size-7 text-primary" />
                <span className="font-display text-sm text-muted-foreground">
                  0{i + 1}
                </span>
              </div>
              <h3 className="font-display text-xl">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {text}
              </p>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-start justify-between gap-6 rounded-2xl bg-secondary/60 p-7 sm:flex-row sm:items-center sm:p-10">
          <div>
            <h2 className="font-display text-2xl tracking-tight">
              Find where you belong.
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Your Spectra story starts with a little curiosity.
            </p>
          </div>
          <Button asChild className="h-12 rounded-full px-6">
            <Link href="/events">
              Explore events
              <ArrowUpRight />
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}
