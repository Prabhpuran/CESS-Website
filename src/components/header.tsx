"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { Brand } from "@/components/brand";
import { cn } from "@/lib/utils";

const links = [
  ["Home", "/"],
  ["Events", "/events"],
  ["About", "/about"],
  ["Contact", "/contact"],
];

export function Header() {
  const pathname = usePathname();
  const active = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);
  return (
    <header className="relative z-30 border-b border-foreground/5 bg-[#f5e9e2]">
      <div className="mx-auto flex h-[84px] max-w-[1600px] items-center justify-between gap-4 px-5 sm:h-24 sm:px-8 xl:px-12">
        <Brand />
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-7 lg:flex xl:gap-10"
        >
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              aria-current={active(href) ? "page" : undefined}
              className={cn(
                "relative py-3 text-[11px] font-semibold tracking-[.13em] uppercase transition-colors hover:text-primary after:absolute after:right-0 after:bottom-0 after:left-0 after:h-px after:origin-left after:scale-x-0 after:bg-primary after:transition-transform",
                active(href) && "text-primary after:scale-x-100",
              )}
            >
              {label}
            </Link>
          ))}
        </nav>
        <Link href="/events" className="flex min-h-11 items-center gap-1 text-xs font-semibold tracking-wider uppercase hover:text-primary lg:hidden">
          Events <ArrowUpRight className="size-4" />
        </Link>
      </div>
    </header>
  );
}
