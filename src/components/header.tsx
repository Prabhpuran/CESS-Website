"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu } from "lucide-react";
import { Brand } from "@/components/brand";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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
        <Sheet>
          <SheetTrigger asChild>
            <button
              type="button"
              aria-label="Open navigation menu"
              className="flex size-11 items-center justify-center rounded-full border border-foreground/25 transition-colors hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary lg:hidden"
            >
              <Menu className="size-5" aria-hidden="true" />
            </button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[min(88vw,400px)] border-l border-foreground/10 bg-[#f5e9e2] p-6 pt-16 text-foreground sm:max-w-[400px]"
          >
            <SheetHeader className="px-0 pb-8">
              <SheetTitle className="font-display text-2xl tracking-wide">SPECTRA<span className="text-primary">’26</span></SheetTitle>
              <SheetDescription className="text-xs tracking-[.2em] uppercase">Ideas. People. Culture.</SheetDescription>
            </SheetHeader>
            <nav aria-label="Mobile navigation" className="flex flex-col">
              {links.map(([label, href], index) => (
                <SheetClose asChild key={href}>
                  <Link
                    href={href}
                    aria-current={active(href) ? "page" : undefined}
                    className={cn(
                      "flex min-h-[72px] items-center justify-between border-b border-foreground/10 text-2xl transition-colors hover:text-primary",
                      active(href) && "text-primary",
                    )}
                  >
                    <span className="flex items-center gap-5">
                      <span className="font-mono text-xs text-foreground/50">{String(index + 1).padStart(2, "0")}</span>
                      {label}
                    </span>
                    <ArrowUpRight className="size-5" aria-hidden="true" />
                  </Link>
                </SheetClose>
              ))}
            </nav>
            <p className="mt-auto pt-10 text-xs tracking-[.2em] text-foreground/55 uppercase">A festival by CESS · 28–29 October</p>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
