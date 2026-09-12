import { Section } from "./Section";
import { skillGroups } from "@/lib/portfolio-data";

export function Skills() {
  return (
    <Section id="skills" kicker="Skills" title="What I work with">
      <div className="grid gap-5 sm:grid-cols-2">
        {skillGroups.map((group) => (
          <div key={group.title} className="rounded-xl border border-accent/50 bg-card p-5 shadow-card">
            <h3 className="text-base tracking-tight text-foreground sm:text-lg">{group.title}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {group.skills.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-accent bg-accent-soft px-3 py-1 text-xs text-foreground"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
