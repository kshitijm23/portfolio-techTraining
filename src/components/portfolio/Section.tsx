import type { ReactNode } from "react";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

export function Section({
  id,
  title,
  kicker,
  children,
  className,
  quiet,
}: {
  id: string;
  title?: string;
  kicker?: string;
  children: ReactNode;
  className?: string;
  quiet?: boolean;
}) {
  const { ref, className: revealClass } = useReveal<HTMLDivElement>();
  return (
    <section id={id} className={cn(quiet ? "py-14 sm:py-20" : "py-16 sm:py-24", className)}>
      <div ref={ref} className={cn("mx-auto w-full max-w-5xl px-5 sm:px-8", revealClass)}>
        {kicker ? (
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-accent">{kicker}</p>
        ) : null}
        {title ? (
          <h2 className="mb-8 text-2xl leading-tight tracking-tight sm:text-4xl">{title}</h2>
        ) : null}
        {children}
      </div>
    </section>
  );
}
