import { useCallback, useRef, useState } from "react";
import { useReveal } from "@/hooks/use-reveal";
import { portfolioItems } from "@/lib/showcase-data";
import { PortfolioCarousel } from "./PortfolioCarousel";
import { PortfolioCaseStudy } from "./PortfolioCaseStudy";
import { cn } from "@/lib/utils";

export function PortfolioShowcase() {
  const { ref, className } = useReveal<HTMLDivElement>();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const close = useCallback(() => {
    const i = openIndex;
    setOpenIndex(null);
    // Return focus to the card that was opened, carousel position untouched.
    requestAnimationFrame(() => {
      if (i !== null) cardRefs.current[i]?.focus({ preventScroll: true });
    });
  }, [openIndex]);

  const open = portfolioItems[openIndex ?? -1];

  return (
    <section id="selected-work" className="py-16 sm:py-24">
      <div ref={ref} className={cn("mx-auto w-full max-w-5xl px-5 sm:px-8", className)}>
        <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-accent">Selected work</p>
        <h2 className="mb-4 text-2xl leading-tight tracking-tight sm:text-4xl">
          Making complex things easier to understand.
        </h2>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          A collection of things I have built, taught, designed, and led, connected by one idea: understand the
          complexity, find what matters, and make it useful for someone else.
        </p>
      </div>

      <div className="mt-10 overflow-hidden">
        <PortfolioCarousel items={portfolioItems} onOpen={setOpenIndex} cardRefs={cardRefs} paused={openIndex !== null} />
      </div>

      {open ? <PortfolioCaseStudy item={open} onClose={close} /> : null}
    </section>
  );
}
