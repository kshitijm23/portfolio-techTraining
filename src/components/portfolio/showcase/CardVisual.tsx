import type { PortfolioItem } from "@/lib/showcase-data";
import { cn } from "@/lib/utils";

/**
 * Card face visuals. Each visualType gets its own deliberately different
 * treatment, built with CSS only so placeholders can be swapped for real
 * assets later without touching the carousel.
 */
export function CardVisual({ item }: { item: PortfolioItem }) {
  const c = item.cardContent;

  switch (item.visualType) {
    case "typography":
      return (
        <div className="flex h-full flex-col justify-between">
          <div className="flex flex-wrap gap-x-2 gap-y-1">
            {c.terms?.map((t, i) => (
              <span
                key={t}
                className={cn(
                  "font-display leading-tight tracking-tight text-muted-foreground",
                  i % 3 === 0 ? "text-base" : i % 3 === 1 ? "text-sm opacity-80" : "text-xs opacity-60",
                )}
              >
                {t}
              </span>
            ))}
          </div>
          <ul className="space-y-1">
            {c.flow?.map((f, i) => (
              <li
                key={f}
                className="text-[0.7rem] font-medium uppercase tracking-[0.22em]"
                style={{ color: i === (c.flow?.length ?? 0) - 1 ? "var(--accent)" : undefined, opacity: 0.45 + i * 0.09 }}
              >
                {f}
              </li>
            ))}
          </ul>
        </div>
      );

    case "explainer":
      return (
        <div className="grid h-full grid-cols-2 gap-2">
          {c.lines?.map((l) => (
            <div key={l} className="flex flex-col justify-between rounded-md border border-border/70 bg-secondary/50 p-2">
              <span className="text-[0.65rem] font-medium uppercase tracking-[0.18em] text-accent">{l}</span>
              <div className="space-y-1">
                <span className="block h-px w-full bg-border" />
                <span className="block h-px w-2/3 bg-border" />
                <span className="block h-1.5 w-1.5 rounded-full bg-accent/70" />
              </div>
            </div>
          ))}
        </div>
      );

    case "lms":
      return (
        <div className="flex h-full flex-col gap-2 rounded-md border border-border/70 bg-secondary/40 p-3">
          <span className="text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground">{c.note}</span>
          <p className="font-display text-lg leading-tight tracking-tight">{c.headline}</p>
          <div className="flex items-center gap-2 text-[0.7rem] text-muted-foreground">
            {c.lines?.map((l) => (
              <span key={l} className="rounded-full border border-border px-2 py-0.5">
                {l}
              </span>
            ))}
          </div>
          <div className="mt-auto flex items-center gap-1">
            {c.flow?.map((f, i) => (
              <span
                key={f}
                className={cn(
                  "flex-1 rounded-sm px-1 py-1 text-center text-[0.55rem] uppercase tracking-[0.1em]",
                  i === 2 ? "bg-accent-soft text-accent-foreground" : "bg-muted text-muted-foreground",
                )}
              >
                {f}
              </span>
            ))}
          </div>
        </div>
      );

    case "analytics":
      return (
        <div className="flex h-full flex-col justify-between">
          <p className="font-display text-lg leading-snug tracking-tight">{c.headline}</p>
          <div className="flex h-20 items-end gap-1.5" aria-hidden="true">
            {[38, 52, 30, 64, 46, 72, 58, 84].map((h, i) => (
              <span
                key={i}
                className={cn("flex-1 rounded-sm", i > 5 ? "bg-accent/70" : "bg-muted-foreground/30")}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <div className="grid grid-cols-2 gap-1">
            {c.flow?.map((f) => (
              <span key={f} className="rounded border border-border/70 px-1.5 py-1 text-[0.6rem] text-muted-foreground">
                {f}
              </span>
            ))}
          </div>
        </div>
      );

    case "product":
      return (
        <div className="flex h-full flex-col gap-2">
          {/* Placeholder browser frame. Replace with a real screenshot when available. */}
          <div className="flex-1 overflow-hidden rounded-md border border-border/70 bg-secondary/40">
            <div className="flex items-center gap-1 border-b border-border/70 px-2 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-accent/80" />
              <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
              <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
            </div>
            <div className="space-y-2 p-2">
              <p className="rounded border border-border/70 bg-card p-2 text-[0.62rem] leading-snug text-muted-foreground">
                {c.headline}
              </p>
              <div className="rounded border border-border/70 bg-sheet p-2">
                <span className="mb-1 block h-1 w-1/3 rounded bg-sheet-rule/70" />
                {[0, 1, 2, 3].map((i) => (
                  <span key={i} className="mb-1 block h-1 rounded bg-sheet-rule/40" style={{ width: `${90 - i * 12}%` }} />
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 text-[0.55rem] uppercase tracking-[0.14em] text-muted-foreground">
            {c.flow?.map((f, i) => (
              <span key={f} className="flex items-center gap-1">
                {i > 0 ? <span className="text-accent">{"\u2192"}</span> : null}
                {f}
              </span>
            ))}
          </div>
        </div>
      );

    case "workflow":
      return (
        <div className="flex h-full flex-col justify-center gap-1.5">
          {c.flow?.map((f, i) => (
            <div key={f} className="flex items-center gap-2">
              <span className="w-6 text-[0.55rem] text-muted-foreground">{`0${i + 1}`}</span>
              <span
                className={cn(
                  "flex-1 rounded-md border px-2 py-1.5 text-[0.7rem] uppercase tracking-[0.16em]",
                  i % 2 === 0 ? "border-accent/50 bg-accent-soft/40 text-accent" : "border-border bg-secondary/50 text-muted-foreground",
                )}
              >
                {f}
              </span>
            </div>
          ))}
        </div>
      );

    case "roadmap":
      return (
        <div className="flex h-full flex-col justify-center">
          {c.flow?.map((f, i) => (
            <div key={f} className="flex gap-3">
              <div className="flex flex-col items-center">
                <span className={cn("h-2 w-2 rounded-full", i === 0 ? "bg-accent" : "bg-muted-foreground/50")} />
                {i < (c.flow?.length ?? 0) - 1 ? <span className="w-px flex-1 bg-border" /> : null}
              </div>
              <span className="-mt-1 pb-3 text-[0.72rem] text-muted-foreground">{f}</span>
            </div>
          ))}
        </div>
      );

    case "systemmap":
      return (
        <div className="grid h-full grid-cols-2 content-center gap-1.5">
          {c.flow?.map((f, i) => (
            <span
              key={f}
              className={cn(
                "rounded-md border px-2 py-2 text-[0.62rem] uppercase tracking-[0.12em]",
                i === 0 || i === (c.flow?.length ?? 0) - 1
                  ? "border-accent/50 text-accent"
                  : "border-border text-muted-foreground",
                i === (c.flow?.length ?? 0) - 1 ? "col-span-2" : "",
              )}
            >
              {f}
            </span>
          ))}
        </div>
      );

    case "dashboard":
      return (
        <div className="flex h-full flex-col justify-center gap-3">
          <p className="font-display text-xl leading-tight tracking-tight text-muted-foreground line-through decoration-accent/70">
            {c.lines?.[0]}
          </p>
          <p className="font-display text-2xl leading-tight tracking-tight">{c.lines?.[1]}</p>
          <div className="space-y-1.5">
            {[95, 42].map((v, i) => (
              <div key={v} className="space-y-1">
                <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                  <span
                    className={cn("block h-full rounded-full", i === 0 ? "bg-muted-foreground/50" : "bg-accent")}
                    style={{ width: `${v}%` }}
                  />
                </div>
              </div>
            ))}
            <span className="text-[0.55rem] uppercase tracking-[0.16em] text-muted-foreground">Example scenario</span>
          </div>
        </div>
      );

    case "editorial":
      return (
        <div className="flex h-full flex-col gap-2">
          {/* Photo placeholders. Drop real images in here later. */}
          <div className="grid flex-1 grid-cols-3 grid-rows-2 gap-1.5">
            <div className="col-span-2 row-span-2 rounded-md border border-border/70 bg-secondary/50" />
            <div className="rounded-md border border-border/70 bg-secondary/40" />
            <div className="rounded-md border border-border/70 bg-secondary/30" />
          </div>
          <div className="space-y-0.5">
            {c.lines?.map((l) => (
              <p key={l} className="font-display text-[0.78rem] leading-snug tracking-tight">
                {l}
              </p>
            ))}
          </div>
          <span className="text-[0.55rem] uppercase tracking-[0.16em] text-muted-foreground">{c.note}</span>
        </div>
      );
  }
}
