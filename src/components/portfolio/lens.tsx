import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type Lens = "training" | "product" | "engineering";
export type Tag = "T" | "P" | "E";

export const LENSES: { id: Lens; label: string; tag: Tag; summary: string }[] = [
  {
    id: "training",
    label: "Training & Enablement",
    tag: "T",
    summary:
      "I design and deliver hands-on training for technical and non-technical learners, and I measure whether it actually worked.",
  },
  {
    id: "product",
    label: "Product & Project Management",
    tag: "P",
    summary:
      "I gather requirements from stakeholders, run concurrent projects, and use data to decide what to build or change next.",
  },
  {
    id: "engineering",
    label: "Engineering",
    tag: "E",
    summary:
      "I ship full-stack and AI software end to end, from problem framing through deployment and live debugging.",
  },
];

type Ctx = { lens: Lens; setLens: (l: Lens) => void; tag: Tag };

const LensContext = createContext<Ctx | null>(null);

export function LensProvider({ children }: { children: ReactNode }) {
  const [lens, setLens] = useState<Lens>("training");
  const value = useMemo(
    () => ({ lens, setLens, tag: LENSES.find((l) => l.id === lens)!.tag }),
    [lens],
  );
  return <LensContext.Provider value={value}>{children}</LensContext.Provider>;
}

export function useLens() {
  const ctx = useContext(LensContext);
  if (!ctx) throw new Error("useLens must be used inside LensProvider");
  return ctx;
}

export function useLensState(tags: Tag[]) {
  const { tag } = useLens();
  const active = tags.includes(tag);
  return { active, className: active ? "lens-on" : "lens-dim" };
}
