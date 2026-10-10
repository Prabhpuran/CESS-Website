import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Brand } from "@/components/brand";
import { site } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-border bg-[#f0e5df] px-5 pt-12 pb-7 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-9 pb-10 md:flex-row md:items-start md:justify-between">
          <div>
            <Brand />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
              A meeting of ideas, people, and everything that makes us feel
              alive.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <Image
                src="/images/cess-logo.svg"
                alt=""
                width={44}
                height={44}
                sizes="44px"
                className="size-11 object-contain"
              />
              <p className="text-xs leading-5 text-muted-foreground">
                Presented by<br />
                <span className="font-semibold text-foreground">CESS · Guru Nanak Dev University</span>
              </p>
            </div>
          </div>
          <nav
            aria-label="Footer navigation"
            className="grid grid-cols-2 gap-x-12 gap-y-4 text-sm sm:grid-cols-3"
          >
            {[
              ["Events", "/events"],
              ["About CESS", "/about"],
              ["Contact", "/contact"],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-2 hover:text-primary"
              >
                {label}
                <ArrowUpRight className="size-3.5" />
              </Link>
            ))}
          </nav>
          <div>
            <p className="text-[10px] font-semibold tracking-[.2em] text-muted-foreground uppercase">
              The next chapter
            </p>
            <p className="mt-3 font-display text-xl">See you at Spectra.</p>
            <p className="mt-2 max-w-xs text-xs leading-5 text-muted-foreground">
              {site.date}<br />{site.venue}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3 border-t border-foreground/10 pt-6 text-[11px] text-muted-foreground sm:flex-row sm:justify-between">
          <p>© 2026 CESS. Made for the moments that matter.</p>
          <p>Spectra’26 preview · Programme subject to announcement</p>
        </div>
      </div>
    </footer>
  );
}
