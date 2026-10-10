import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Brand({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Spectra 26 home"
      className={cn("inline-flex shrink-0 items-center gap-2.5", className)}
    >
      <Image
        src="/images/cess-logo.svg"
        width={44}
        height={44}
        alt=""
        className="size-10 object-contain sm:size-11"
      />
      <span>
        <span className="block font-display text-[23px] leading-none font-bold tracking-[-0.06em] sm:text-[29px]">
          SPECTRA<span className="text-primary">’26</span>
        </span>
        <span className="mt-2 block text-[7px] font-medium tracking-[.47em] sm:text-[8px]">
          IDEAS PEOPLE CULTURE
        </span>
      </span>
    </Link>
  );
}
