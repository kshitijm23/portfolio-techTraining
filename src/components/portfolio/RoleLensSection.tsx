import { Section } from "./Section";
import { LENSES, useLens } from "./lens";
import { cn } from "@/lib/utils";

export function RoleLensSection() {
  const { lens, setLens } = useLens();
  const current = LENSES.find((l) => l.id === lens)!;

  return (
    <Section id="role-lens" kicker="Role lens" title="What are you hiring for?">
      <div
        role="group"
        aria-label="What are you hiring for?"
        className="inline-flex flex-wrap gap-1 rounded-xl border border-border bg-card p-1 shadow-card"
      >
        {LENSES.map((l) => (
          <button
            key={l.id}
            type="button"
            aria-pressed={lens === l.id}
            onClick={() => setLens(l.id)}
            className={cn(
              "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
              lens === l.id
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground",
            )}
          >
            {l.label}
          </button>
        ))}
      </div>
      <p
        key={current.id}
        className="mt-5 max-w-2xl animate-fade-in text-base leading-relaxed text-foreground"
      >
        {current.summary}
      </p>
      <p className="mt-3 text-sm text-muted-foreground">
        Pick a lens and the sections below reorder and highlight what matters most for that role.
      </p>
    </Section>
  );
}
