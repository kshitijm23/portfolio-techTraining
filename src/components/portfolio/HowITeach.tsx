import { useState } from "react";
import { Section } from "./Section";
import { audiences, concepts, explanations, learningLoop } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

export function HowITeach() {
  const [openStep, setOpenStep] = useState(0);
  const [concept, setConcept] = useState<string>(concepts[0]);
  const [audience, setAudience] = useState<string>(audiences[0]);

  return (
    <Section id="teaching" kicker="How I teach" title="The method, not just the outcome">
      <div className="rounded-xl border border-border bg-card p-5 shadow-card sm:p-6">
        <h3 className="text-lg tracking-tight">The learning loop</h3>
        <ol className="mt-4 grid gap-3 sm:grid-cols-5">
          {learningLoop.map((s, i) => (
            <li key={s.step}>
              <button
                type="button"
                aria-expanded={openStep === i}
                onClick={() => setOpenStep(i)}
                className={cn(
                  "h-full w-full rounded-lg border p-3 text-left text-sm transition-colors",
                  openStep === i
                    ? "border-accent bg-accent text-accent-foreground shadow-card"
                    : "border-border bg-background text-muted-foreground hover:border-accent",
                )}
              >
                <span className="block text-xs font-medium uppercase tracking-wider opacity-70">Step {i + 1}</span>
                <span className="mt-1 block font-medium">{s.step}</span>
              </button>
            </li>
          ))}
        </ol>
        <p key={openStep} className="mt-4 animate-fade-in text-sm leading-relaxed">
          {learningLoop[openStep]!.detail}
        </p>
      </div>

      <div className="mt-6 rounded-xl border border-border bg-card p-5 shadow-card sm:p-6">
        <h3 className="text-lg tracking-tight">Explain it three ways</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <p id="concept-label" className="text-sm font-medium">
              Concept
            </p>
            <div role="group" aria-labelledby="concept-label" className="mt-2 flex flex-wrap gap-2">
              {concepts.map((c) => (
                <button
                  key={c}
                  type="button"
                  aria-pressed={concept === c}
                  onClick={() => setConcept(c)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs transition-colors",
                    concept === c
                      ? "border-accent bg-accent text-accent-foreground"
                      : "border-border bg-secondary text-muted-foreground hover:border-accent",
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p id="audience-label" className="text-sm font-medium">
              Audience
            </p>
            <div role="group" aria-labelledby="audience-label" className="mt-2 flex flex-wrap gap-2">
              {audiences.map((a) => (
                <button
                  key={a}
                  type="button"
                  aria-pressed={audience === a}
                  onClick={() => setAudience(a)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs transition-colors",
                    audience === a
                      ? "border-accent bg-accent text-accent-foreground"
                      : "border-border bg-secondary text-muted-foreground hover:border-accent",
                  )}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>
        </div>
        <p
          key={concept + audience}
          aria-live="polite"
          className="mt-5 animate-fade-in rounded-lg border border-border bg-background p-4 text-sm leading-relaxed"
        >
          {explanations[concept]?.[audience]}
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          The same idea lands differently depending on who's in the room. Adjusting for that is most of the job.
        </p>
      </div>
    </Section>
  );
}
