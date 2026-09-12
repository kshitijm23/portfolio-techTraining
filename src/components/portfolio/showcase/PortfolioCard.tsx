import { forwardRef } from "react";
import { ArrowUpRight } from "lucide-react";
import type { PortfolioItem } from "@/lib/showcase-data";
import { CardVisual } from "./CardVisual";
import { cn } from "@/lib/utils";

export const PortfolioCard = forwardRef<
  HTMLButtonElement,
  { item: PortfolioItem; active: boolean; onOpen: () => void; clone?: boolean }
>(function PortfolioCard({ item, active, onOpen, clone }, ref) {
  return (
    <button
      ref={ref}
      type="button"
      onClick={onOpen}
      tabIndex={clone ? -1 : 0}
      aria-hidden={clone ? true : undefined}
      aria-label={`${item.title}. View case study`}
      className={cn(
        "group relative flex h-[26rem] w-[17rem] shrink-0 snap-center flex-col gap-4 rounded-xl border border-border bg-card p-5 text-left shadow-card",
        "transition-[box-shadow,border-color] duration-300 hover:border-accent/60 sm:h-[30rem] sm:w-[21rem]",
        active ? "border-accent/50" : "",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-accent">{item.category}</span>
        <span className="font-display text-sm text-muted-foreground">{item.number}</span>
      </div>

      <div>
        <h3 className="text-xl leading-tight tracking-tight sm:text-2xl">{item.title}</h3>
        <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground sm:text-sm">{item.subtitle}</p>
      </div>

      <div className="min-h-0 flex-1">
        <CardVisual item={item} />
      </div>

      {item.tags?.length ? (
        <ul className="flex flex-wrap gap-1.5">
          {item.tags.slice(0, 3).map((t) => (
            <li key={t} className="rounded-full border border-border bg-secondary px-2 py-0.5 text-[0.6rem] text-muted-foreground">
              {t}
            </li>
          ))}
        </ul>
      ) : null}

      <span className="flex items-center gap-1.5 text-xs font-medium text-accent">
        View case study
        <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </button>
  );
});
