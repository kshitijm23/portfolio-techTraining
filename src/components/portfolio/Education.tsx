import { Section } from "./Section";
import { education } from "@/lib/portfolio-data";

export function Education() {
  return (
    <Section id="education" kicker="Education" title="Where I studied">
      <div className="grid gap-4 sm:grid-cols-2">
        {education.map((e) => (
          <article key={e.degree} className="rounded-xl border border-border bg-card p-5 shadow-card">
            <h3 className="text-lg tracking-tight">{e.degree}</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {e.school}, {e.place}
            </p>
            <p className="mt-3 text-sm">
              <span className="font-medium text-accent">{e.detail}</span>
              <span className="text-muted-foreground"> / {e.date}</span>
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}
