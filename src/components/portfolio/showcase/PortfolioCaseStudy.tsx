import { useEffect, useRef } from "react";
import { ArrowUpRight, X } from "lucide-react";
import type { Block, PortfolioItem } from "@/lib/showcase-data";
import { cn } from "@/lib/utils";

function BlockView({ block }: { block: Block }) {
  switch (block.kind) {
    case "h":
      return <h4 className="mt-8 text-lg tracking-tight sm:text-xl">{block.text}</h4>;
    case "p":
      return <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">{block.text}</p>;
    case "quote":
      return (
        <p className="mt-4 border-l-2 border-accent pl-4 font-display text-base leading-snug tracking-tight sm:text-lg">
          {block.text}
        </p>
      );
    case "flow":
      return (
        <ol className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-2">
          {block.items.map((it, i) => (
            <li key={it} className="flex items-center gap-2">
              {i > 0 ? <span className="text-accent">{"\u2192"}</span> : null}
              <span className="rounded-full border border-border bg-secondary px-3 py-1 text-xs text-muted-foreground">{it}</span>
            </li>
          ))}
        </ol>
      );
    case "steps":
      return (
        <ol className="mt-4 space-y-3">
          {block.items.map((s) => (
            <li key={s.label + s.title} className="rounded-lg border border-border bg-card p-4">
              <span className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-accent">{s.label}</span>
              <p className="mt-1 text-sm tracking-tight sm:text-base">{s.title}</p>
              {s.body ? <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.body}</p> : null}
            </li>
          ))}
        </ol>
      );
    case "table":
      return (
        <div className="mt-4 overflow-hidden rounded-lg border border-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-secondary text-xs uppercase tracking-[0.12em] text-muted-foreground">
              <tr>
                <th scope="col" className="px-4 py-2 font-medium">
                  {block.head[0]}
                </th>
                <th scope="col" className="px-4 py-2 font-medium">
                  {block.head[1]}
                </th>
              </tr>
            </thead>
            <tbody>
              {block.rows.map((r) => (
                <tr key={r[0]} className="border-t border-border">
                  <td className="px-4 py-2.5">{r[0]}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{r[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "pairs":
      return (
        <dl className="mt-4 grid gap-3 sm:grid-cols-2">
          {block.items.map((p) => (
            <div key={p.term} className="rounded-lg border border-border bg-card p-4">
              <dt className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-accent">{p.term}</dt>
              <dd className="mt-1 text-sm text-muted-foreground">{p.def}</dd>
            </div>
          ))}
        </dl>
      );
    case "list":
      return (
        <ul className="mt-3 space-y-2">
          {block.items.map((i) => (
            <li key={i} className="flex gap-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
              {i}
            </li>
          ))}
        </ul>
      );
    case "note":
      return (
        <p className="mt-4 rounded-lg border border-accent/40 bg-accent-soft/40 px-4 py-3 text-xs leading-relaxed text-muted-foreground">
          {block.text}
        </p>
      );
    case "code":
      return (
        <pre className="mt-4 overflow-x-auto rounded-lg border border-border bg-secondary p-4 text-xs leading-relaxed text-muted-foreground">
          {block.text}
        </pre>
      );
    case "screens":
      return (
        <ol className="mt-4 grid gap-3 sm:grid-cols-2">
          {block.items.map((s) => (
            <li key={s.label} className="rounded-lg border border-border bg-card p-4">
              <span className="text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground">{s.label}</span>
              <p className="mt-1.5 text-sm leading-relaxed">{s.body}</p>
            </li>
          ))}
        </ol>
      );
  }
}

export function PortfolioCaseStudy({
  item,
  onClose,
}: {
  item: PortfolioItem;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && panelRef.current) {
        const nodes = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])',
        );
        if (!nodes.length) return;
        const first = nodes[0]!;
        const last = nodes[nodes.length - 1]!;
        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        } else if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-background/85 px-4 py-6 backdrop-blur-sm sm:py-12"
      style={{ pointerEvents: "auto" }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`case-${item.id}-title`}
        className={cn(
          "animate-fade-in relative w-full max-w-3xl rounded-2xl border border-border bg-card shadow-card",
          "p-6 sm:p-10",
        )}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close case study"
          className="absolute right-4 top-4 rounded-full border border-border bg-secondary p-2 text-muted-foreground transition-colors hover:border-accent/60 hover:text-accent"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="max-w-2xl pr-10">
          <div className="flex items-center gap-3">
            <span className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-accent">{item.category}</span>
            <span className="font-display text-sm text-muted-foreground">{item.number}</span>
          </div>
          <h3 id={`case-${item.id}-title`} className="mt-3 text-2xl leading-tight tracking-tight sm:text-4xl">
            {item.title}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">{item.subtitle}</p>
          <p className="mt-6 font-display text-lg leading-snug tracking-tight sm:text-2xl">{item.caseStudy.headline}</p>

          {item.caseStudy.blocks.map((b, i) => (
            <BlockView key={i} block={b} />
          ))}

          {item.tags?.length ? (
            <ul className="mt-8 flex flex-wrap gap-2">
              {item.tags.map((t) => (
                <li key={t} className="rounded-full border border-border bg-secondary px-3 py-1 text-xs text-muted-foreground">
                  {t}
                </li>
              ))}
            </ul>
          ) : null}

          {item.caseStudy.link?.length ? (
            <div className="mt-8 flex flex-wrap gap-3">
              {item.caseStudy.link.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-accent px-4 py-2 text-sm text-accent transition-colors hover:bg-accent-soft"
                >
                  {l.label}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
