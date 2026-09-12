import { Section } from "./Section";
import { useLens, type Tag } from "./lens";
import { roleOrder, roles } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

function Bullet({ text, tags, tag }: { text: string; tags: Tag[]; tag: Tag }) {
  const active = tags.includes(tag);
  return (
    <li
      className={cn(
        "relative pl-5 text-sm leading-relaxed transition-opacity duration-300",
        active ? "text-foreground opacity-100" : "text-muted-foreground opacity-45",
      )}
    >
      <span
        aria-hidden
        className={cn(
          "absolute left-0 top-2 size-1.5 rounded-full transition-colors",
          active ? "bg-accent" : "bg-border",
        )}
      />
      {text}
    </li>
  );
}

export function Experience() {
  const { lens, tag } = useLens();
  const ordered = roleOrder[lens]
    .map((id) => roles.find((r) => r.id === id)!)
    .filter(Boolean);

  return (
    <Section id="experience" kicker="Experience" title="Where I have done it">
      <ol className="relative space-y-5 border-l border-border pl-5 sm:pl-8">
        {ordered.map((role, i) => (
          <li key={role.id} className="relative">
            <span
              aria-hidden
              className={cn(
                "absolute -left-[1.7rem] top-6 size-2.5 rounded-full border-2 border-background sm:-left-[2.45rem]",
                i === 0 ? "bg-accent" : "bg-border",
              )}
            />
            <article className="rounded-xl border border-border bg-card p-5 shadow-card transition-all duration-300 sm:p-6">
              <div className="grid gap-1 sm:flex sm:items-baseline sm:justify-between sm:gap-4">
                <div className="min-w-0">
                  <h3 className="text-lg tracking-tight sm:text-xl">{role.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {role.org}, {role.place}
                  </p>
                </div>
                <p className="shrink-0 text-sm text-muted-foreground">{role.dates}</p>
              </div>
              <ul className="mt-4 space-y-2.5">
                {role.bullets.map((b) => (
                  <Bullet key={b.text} text={b.text} tags={b.tags} tag={tag} />
                ))}
              </ul>
            </article>
          </li>
        ))}
      </ol>
    </Section>
  );
}
