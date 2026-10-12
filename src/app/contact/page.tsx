import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  CalendarDays,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { PageIntro, Eyebrow } from "@/components/page-intro";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { site } from "@/lib/content";

export const metadata: Metadata = { title: "Contact CESS" };

export default function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="Every connection starts somewhere"
        title="Something on your mind?"
        accent="Let’s make a connection."
      >
        <p>
          Questions about Spectra? Contact the CESS team directly by phone or
          email.
        </p>
      </PageIntro>
      <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-20 sm:px-8 md:grid-cols-2 lg:gap-20 lg:px-12">
        <div>
          <div className="rounded-3xl bg-[#2c1c2b] p-7 text-[#fff3e9] sm:p-10">
            <MessageCircle className="mb-8 size-9 text-[#fba4b9]" />
            <Eyebrow className="text-[#fba4b9]">Say hello to CESS</Eyebrow>
            <h2 className="mt-5 font-display text-3xl tracking-tight">
              Good things start
              <br />
              with a conversation.
            </h2>
            <div className="mt-7 space-y-4">
              <a
                href="tel:9463367887"
                className="flex min-h-14 items-center gap-4 rounded-xl border border-white/15 px-4 py-3 transition-colors hover:bg-white/5"
              >
                <Phone className="size-5 shrink-0 text-[#fba4b9]" />
                <span>
                  <span className="block text-xs text-[#d9c6d1]">Prabhpuran Singh</span>
                  <span className="mt-1 block font-medium">9463367887</span>
                </span>
              </a>
              <a
                href="tel:9872088879"
                className="flex min-h-14 items-center gap-4 rounded-xl border border-white/15 px-4 py-3 transition-colors hover:bg-white/5"
              >
                <Phone className="size-5 shrink-0 text-[#fba4b9]" />
                <span>
                  <span className="block text-xs text-[#d9c6d1]">Vaishali</span>
                  <span className="mt-1 block font-medium">9872088879</span>
                </span>
              </a>
              <a
                href="mailto:cess.cet@gndu.ac.in"
                className="flex min-h-14 items-center gap-4 rounded-xl border border-white/15 px-4 py-3 transition-colors hover:bg-white/5"
              >
                <Mail className="size-5 shrink-0 text-[#fba4b9]" />
                <span>
                  <span className="block text-xs text-[#d9c6d1]">Email</span>
                  <span className="mt-1 block break-all font-medium">cess.cet@gndu.ac.in</span>
                </span>
              </a>
            </div>
          </div>
          <div className="mt-6 space-y-4 rounded-2xl border p-6">
            <p className="flex items-center gap-3 text-sm">
              <CalendarDays className="size-4 text-primary" />
              {site.date}
            </p>
            <p className="flex items-center gap-3 text-sm">
              <MapPin className="size-4 text-primary" />
              {site.venue}
            </p>
          </div>
        </div>
        <section className="py-3">
          <Eyebrow>A little clarity</Eyebrow>
          <h2 className="mt-5 mb-7 font-display text-3xl tracking-tight">
            Before you reach out.
          </h2>
          <Accordion type="single" collapsible>
            {[
              {
                q: "When and where is Spectra’26?",
                a: "Spectra’26 is on 28–29 October 2026 at Maharaja Ranjit Singh Bhawan, Guru Nanak Dev University, Amritsar.",
              },
              {
                q: "Is registration open?",
                a: "Open an event card to review its details. For events with an active registration form, use the Register now button to open the official form.",
              },
              {
                q: "Can I collaborate or volunteer?",
                a: "For collaboration and volunteering enquiries, contact the CESS team using the phone numbers or email on this page.",
              },
            ].map(({ q, a }, i) => (
              <AccordionItem key={q} value={`faq-${i}`}>
                <AccordionTrigger className="py-5 text-left text-base">
                  {q}
                </AccordionTrigger>
                <AccordionContent className="leading-7 text-muted-foreground">
                  {a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <Link
            href="/events"
            className="mt-8 inline-flex min-h-11 items-center gap-3 text-sm font-semibold text-primary"
          >
            Explore events
            <ArrowUpRight className="size-4" />
          </Link>
        </section>
      </div>
    </>
  );
}
