import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-[10px] font-semibold tracking-[.24em] uppercase text-primary",
        className,
      )}
    >
      <span className="h-px w-7 bg-current" />
      {children}
    </p>
  );
}

export function PageIntro({
  eyebrow,
  title,
  accent,
  children,
}: {
  eyebrow: string;
  title: string;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative mx-auto max-w-7xl px-5 pt-14 pb-10 sm:px-8 sm:pt-20 lg:px-12">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.7rem,6vw,5.5rem)] leading-[1.06] font-medium tracking-[-.055em]">
        {title}
        <br />
        <span className="text-primary">{accent}</span>
      </h1>
      <div className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
        {children}
      </div>
    </div>
  );
}
