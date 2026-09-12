import { useEffect, useRef, useState } from "react";
import { Section } from "./Section";
import { stats } from "@/lib/portfolio-data";

function useCountUp(target: number, decimals: number) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || typeof IntersectionObserver === "undefined") {
      setValue(target);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        obs.disconnect();
        const start = performance.now();
        const dur = 1100;
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          setValue(target * eased);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return { ref, display: value.toFixed(decimals) };
}

function StatCard({ stat }: { stat: (typeof stats)[number] }) {
  const { ref, display } = useCountUp(stat.value, stat.decimals);
  return (
    <div
      ref={ref}
      className="rounded-xl border border-border bg-card p-5 shadow-card transition-transform hover:-translate-y-0.5"
    >
      <p className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
        <span className="text-muted-foreground">{stat.prefix}</span>
        <span>{display}</span>
        <span>{stat.suffix}</span>
      </p>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{stat.caption}</p>
    </div>
  );
}

export function Stats() {
  return (
    <Section id="impact" kicker="Impact at a glance" title="The numbers behind the work">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((s) => (
          <StatCard key={s.caption} stat={s} />
        ))}
      </div>
    </Section>
  );
}
