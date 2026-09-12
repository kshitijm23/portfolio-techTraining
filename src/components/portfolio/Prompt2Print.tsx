import { useState } from "react";
import { ChevronDown, ExternalLink, Github, Loader2, Sparkles } from "lucide-react";
import { Section } from "./Section";
import { useLens } from "./lens";
import { cn } from "@/lib/utils";

type Question = { q: string; a: string };
type Sheet = { title: string; grade: string; questions: Question[]; showKey: boolean };

const presets: { prompt: string; base: Sheet; harder: Question[]; words: Question[] }[] = [
  {
    prompt: "10 two-step equations for 7th grade with an answer key",
    base: {
      title: "Two-Step Equations",
      grade: "Grade 7 / Expressions and Equations",
      showKey: true,
      questions: [
        { q: "Solve for x:  3x + 5 = 20", a: "x = 5" },
        { q: "Solve for x:  4x - 7 = 21", a: "x = 7" },
        { q: "Solve for x:  x/2 + 6 = 10", a: "x = 8" },
        { q: "Solve for x:  -2x + 9 = 1", a: "x = 4" },
        { q: "Solve for x:  5x - 12 = 3", a: "x = 3" },
      ],
    },
    harder: [
      { q: "Solve for x:  -3(x - 4) = 18", a: "x = -2" },
      { q: "Solve for x:  (2x + 1)/3 = 5", a: "x = 7" },
      { q: "Solve for x:  7 - 4x = -13", a: "x = 5" },
      { q: "Solve for x:  x/4 - 2.5 = 1.5", a: "x = 16" },
      { q: "Solve for x:  -5x + 3 = -22", a: "x = 5" },
    ],
    words: [
      {
        q: "A gym charges a $12 sign-up fee plus $8 per month. Maya paid $60 in total. How many months did she pay for?",
        a: "8m + 12 = 60, so m = 6 months",
      },
      {
        q: "A taxi ride costs $3.50 to start plus $2 per mile. The ride cost $15.50. How many miles was it?",
        a: "2d + 3.50 = 15.50, so d = 6 miles",
      },
      {
        q: "Half of a number increased by 7 is 19. What is the number?",
        a: "n/2 + 7 = 19, so n = 24",
      },
      {
        q: "A class sells tickets for $5 each and spent $40 on supplies. Their profit was $135. How many tickets did they sell?",
        a: "5t - 40 = 135, so t = 35 tickets",
      },
      {
        q: "Three friends split a bill evenly after using a $6 coupon. Each paid $9. What was the bill before the coupon?",
        a: "(b - 6)/3 = 9, so b = $33",
      },
    ],
  },
  {
    prompt: "Newton's second law practice for 9th grade physics",
    base: {
      title: "Newton's Second Law Practice",
      grade: "Grade 9 / Forces and Motion",
      showKey: false,
      questions: [
        { q: "A net force of 12 N acts on a 4 kg box. Find its acceleration.", a: "a = F/m = 3 m/s^2" },
        {
          q: "A 1200 kg car accelerates at 2.5 m/s^2. Find the net force on the car.",
          a: "F = ma = 3000 N",
        },
        {
          q: "A net force of 25 N gives an object an acceleration of 5 m/s^2. Find its mass.",
          a: "m = F/a = 5 kg",
        },
        {
          q: "A 0.5 kg ball is pushed with a net force of 10 N. Find its acceleration.",
          a: "a = 20 m/s^2",
        },
        {
          q: "A 2.5 kg cart has an 8 N force to the right and a 3 N force to the left. Find the net force and the acceleration.",
          a: "Net force = 5 N right, a = 2 m/s^2 right",
        },
      ],
    },
    harder: [
      {
        q: "A 3 kg block on a frictionless surface is pulled with 15 N at 0 degrees, then friction of 3 N is added. Find the acceleration in each case.",
        a: "Frictionless: a = 5 m/s^2. With friction: a = 12/3 = 4 m/s^2",
      },
      {
        q: "A 1500 kg car goes from 0 to 24 m/s in 8 s. Find the average net force.",
        a: "a = 3 m/s^2, so F = 4500 N",
      },
      {
        q: "A 70 kg skydiver falls with air resistance of 490 N. Take g = 9.8 m/s^2 and find the acceleration.",
        a: "Weight = 686 N, net = 196 N down, a = 2.8 m/s^2 down",
      },
      {
        q: "A 4 kg object slows from 10 m/s to rest over 5 s. Find the magnitude and direction of the net force.",
        a: "a = -2 m/s^2, so F = 8 N opposite the motion",
      },
      {
        q: "Two students push a 20 kg cart with 30 N and 18 N in the same direction against 8 N of friction. Find the acceleration.",
        a: "Net = 40 N, a = 2 m/s^2",
      },
    ],
    words: [
      {
        q: "A grocery cart with a total mass of 25 kg is pushed with a steady net force of 50 N down an aisle. How fast is it speeding up each second?",
        a: "a = 2 m/s^2",
      },
      {
        q: "An elevator holding a 60 kg passenger accelerates upward at 1.2 m/s^2. What net force acts on the passenger?",
        a: "F = 72 N upward",
      },
      {
        q: "A soccer ball of mass 0.45 kg leaves a foot with an acceleration of 200 m/s^2. What net force did the kick apply?",
        a: "F = 90 N",
      },
      {
        q: "A sled and rider together have a mass of 40 kg and speed up at 0.75 m/s^2 while being pulled. What is the net force on them?",
        a: "F = 30 N",
      },
      {
        q: "A 5 kg toolbox slides across a floor and stops because of a 10 N friction force. What is its acceleration while stopping?",
        a: "a = 2 m/s^2 opposite the motion",
      },
    ],
  },
  {
    prompt: "Mixed review on ratios and proportions for 6th grade",
    base: {
      title: "Ratios and Proportions Mixed Review",
      grade: "Grade 6 / Ratios and Proportional Relationships",
      showKey: false,
      questions: [
        { q: "Write the ratio 12 red marbles to 18 blue marbles in simplest form.", a: "2 : 3" },
        { q: "If 3 apples cost $1.80, what do 7 apples cost?", a: "$0.60 each, so $4.20" },
        {
          q: "A car travels 150 miles in 3 hours. What is the unit rate, and how far does it go in 5 hours?",
          a: "50 miles per hour, so 250 miles",
        },
        { q: "Solve the proportion:  4/10 = x/25", a: "x = 10" },
        {
          q: "A recipe uses 2 cups of flour for every 3 cups of milk. How much flour is needed for 9 cups of milk?",
          a: "6 cups of flour",
        },
      ],
    },
    harder: [
      {
        q: "A map scale is 1 inch to 45 miles. Two cities are 3.5 inches apart on the map. Find the actual distance.",
        a: "157.5 miles",
      },
      { q: "Solve the proportion:  (x + 2)/6 = 5/3", a: "x = 8" },
      {
        q: "A 15 oz box costs $4.20 and a 25 oz box costs $6.50. Which is the better buy and by how much per ounce?",
        a: "$0.28 vs $0.26 per ounce, so the 25 oz box is better by $0.02 per ounce",
      },
      {
        q: "A paint mix is 5 parts white to 2 parts blue. How much blue is in 42 gallons of mix?",
        a: "12 gallons of blue",
      },
      {
        q: "In a class the ratio of students who walk to students who ride is 3 : 4. There are 28 students total. How many walk?",
        a: "12 students walk",
      },
    ],
    words: [
      {
        q: "A school store sells 4 notebooks for $5. At that rate, what does a pack of 10 notebooks cost?",
        a: "$1.25 each, so $12.50",
      },
      {
        q: "Jordan reads 24 pages in 30 minutes. At the same pace, how many pages does he read in 45 minutes?",
        a: "36 pages",
      },
      {
        q: "A punch recipe mixes 3 cups of juice with 5 cups of soda. How much soda goes with 12 cups of juice?",
        a: "20 cups of soda",
      },
      {
        q: "A printer prints 90 pages in 6 minutes. How long does it take to print 210 pages?",
        a: "15 pages per minute, so 14 minutes",
      },
      {
        q: "For every 7 students on a field trip there is 1 chaperone. If 63 students go, how many chaperones are needed?",
        a: "9 chaperones",
      },
    ],
  },
];

const steps = ["Prompt received", "Grounding in reference document", "Drafting with LLM", "Rendering LaTeX to PDF"];

const editChips = ["Make it harder", "Add word problems", "Shorten to 3 questions"] as const;

export function Prompt2Print() {
  const { lens } = useLens();
  const [prompt, setPrompt] = useState("");
  const [activePreset, setActivePreset] = useState<number | null>(null);
  const [sheet, setSheet] = useState<Sheet | null>(null);
  const [step, setStep] = useState(-1);
  const [editing, setEditing] = useState(false);
  const [note, setNote] = useState<string | null>(null);
  const [learned, setLearned] = useState(false);

  function runPipeline(index: number) {
    setNote(null);
    setActivePreset(index);
    setSheet(null);
    setStep(0);
    const timers: number[] = [];
    for (let i = 1; i <= steps.length; i++) {
      timers.push(
        window.setTimeout(() => {
          if (i === steps.length) {
            setStep(-1);
            setSheet(presets[index]!.base);
          } else {
            setStep(i);
          }
        }, i * 800),
      );
    }
  }

  function handleGenerate() {
    const match = presets.findIndex((p) => p.prompt.toLowerCase() === prompt.trim().toLowerCase());
    if (match >= 0) {
      runPipeline(match);
      return;
    }
    if (prompt.trim().length === 0) {
      setNote("Pick one of the three preset prompts to run the demo.");
      return;
    }
    setNote(
      "This demo only runs the three preset prompts. For anything you type yourself, try the live app linked below.",
    );
  }

  function applyEdit(chip: (typeof editChips)[number]) {
    if (activePreset === null || !sheet) return;
    const preset = presets[activePreset];
    if (!preset) return;
    setEditing(true);
    window.setTimeout(() => {
      if (chip === "Make it harder") {
        setSheet({ ...sheet, title: `${preset.base.title} (Challenge Set)`, questions: preset.harder });
      } else if (chip === "Add word problems") {
        setSheet({ ...sheet, title: `${preset.base.title}: Word Problems`, questions: preset.words });
      } else {
        setSheet({ ...sheet, questions: sheet.questions.slice(0, 3) });
      }
      setEditing(false);
    }, 700);
  }

  const badges = ["Next.js", "Python FastAPI", "LaTeX", "Docker", "Supabase/PostgreSQL", "Row-level access control"];

  return (
    <Section id="prompt2print" kicker="Featured project" title="Prompt2Print">
      <div className="mb-4 flex flex-wrap gap-2">
        {lens === "engineering" ? (
          <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
            Engineering highlight
          </span>
        ) : null}
        {lens === "product" ? (
          <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
            Product highlight
          </span>
        ) : null}
      </div>

      <p className="max-w-3xl text-base leading-relaxed text-muted-foreground">
        Prompt2Print is an AI platform I designed, built, and deployed solo. Teachers type what they need, optionally
        upload a reference document, and get back a standards-aligned, print-ready PDF worksheet. I used it in my own
        classroom.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.35fr_1fr]">
        <div className="rounded-xl border border-border bg-card p-5 shadow-card">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
            <Sparkles className="size-3.5 text-accent" aria-hidden />
            Interactive demo with simulated output
          </p>

          <label htmlFor="p2p-prompt" className="mt-2 block text-sm font-medium">
            What worksheet do you need?
          </label>
          <textarea
            id="p2p-prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={2}
            placeholder="Type a request, or pick a preset below"
            className="mt-2 w-full resize-none rounded-lg border border-input bg-background p-3 text-sm outline-none"
          />
          <div className="mt-3 flex flex-wrap gap-2">
            {presets.map((p, i) => (
              <button
                key={p.prompt}
                type="button"
                onClick={() => {
                  setPrompt(p.prompt);
                  runPipeline(i);
                }}
                className="rounded-full border border-border bg-secondary px-3 py-1.5 text-xs text-foreground transition-colors hover:border-accent"
              >
                {p.prompt}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={handleGenerate}
            className="mt-4 inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-transform hover:-translate-y-0.5"
          >
            Generate
          </button>
          {note ? (
            <p
              role="status"
              className="mt-3 rounded-lg border border-border bg-secondary p-3 text-sm text-muted-foreground"
            >
              {note}
            </p>
          ) : null}

          {step >= 0 ? (
            <ol className="mt-5 space-y-2" aria-live="polite">
              {steps.map((s, i) => (
                <li
                  key={s}
                  className={cn(
                    "flex items-center gap-2 text-sm transition-opacity",
                    i <= step ? "text-foreground" : "text-muted-foreground opacity-50",
                  )}
                >
                  {i === step ? (
                    <Loader2 className="size-4 animate-spin text-accent" aria-hidden />
                  ) : (
                    <span aria-hidden className={cn("size-2 rounded-full", i < step ? "bg-accent" : "bg-border")} />
                  )}
                  {s}
                </li>
              ))}
            </ol>
          ) : null}

          {sheet ? (
            <div className="mt-6">
              <div
                className={cn(
                  "rounded-sm bg-sheet p-6 text-sheet-foreground shadow-paper transition-opacity sm:p-8",
                  editing && "opacity-50",
                )}
              >
                <div className="font-paper">
                  <h3 className="text-center font-paper text-lg font-bold text-sheet-foreground">{sheet.title}</h3>
                  <p className="mt-1 text-center text-xs">{sheet.grade}</p>
                  <div className="mt-5 flex gap-6 text-xs">
                    <span className="flex-1 border-b border-sheet-rule pb-1">Name:</span>
                    <span className="w-32 border-b border-sheet-rule pb-1">Date:</span>
                  </div>
                  <ol className="mt-5 space-y-4 text-sm">
                    {sheet.questions.map((q, i) => (
                      <li key={q.q} className="leading-relaxed">
                        <span className="font-bold">{i + 1}. </span>
                        {q.q}
                      </li>
                    ))}
                  </ol>
                  {sheet.showKey ? (
                    <div className="mt-6 border-t border-sheet-rule pt-3 text-xs">
                      <p className="font-bold">Answer key</p>
                      <p className="mt-1">{sheet.questions.map((q, i) => `${i + 1}. ${q.a}`).join("    |    ")}</p>
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium">Edit with AI</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {editChips.map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      disabled={editing}
                      onClick={() => applyEdit(chip)}
                      className="rounded-full border border-border bg-secondary px-3 py-1.5 text-xs transition-colors hover:border-accent disabled:opacity-50"
                    >
                      {chip}
                    </button>
                  ))}
                  {editing ? (
                    <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                      <Loader2 className="size-3.5 animate-spin text-accent" aria-hidden />
                      Updating
                    </span>
                  ) : null}
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <div className="space-y-5">
          <div className="rounded-xl border border-border bg-card p-5 shadow-card">
            <h3 className="text-base tracking-tight">Stack</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {badges.map((b) => (
                <li
                  key={b}
                  className="rounded-full border border-accent bg-accent-soft px-3 py-1 text-xs skillaccent-foreground"
                >
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-border bg-card p-5 shadow-card">
            <h3 className="text-base tracking-tight">Highlights</h3>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
              <li>
                Grounded generation in uploaded reference documents to reduce hallucinated and off-standard content
              </li>
              <li>Conversational "edit with AI" loop for refining outputs</li>
              <li>Authenticated multi-user access with a saved worksheet library</li>
            </ul>
          </div>
          <div className="rounded-xl border border-border bg-card shadow-card">
            <button
              type="button"
              onClick={() => setLearned((v) => !v)}
              aria-expanded={learned}
              className="flex w-full items-center justify-between gap-3 p-5 text-left text-base font-medium"
            >
              What I learned shipping it
              <ChevronDown
                aria-hidden
                className={cn("size-4 shrink-0 transition-transform", learned && "rotate-180")}
              />
            </button>
            {learned ? (
              <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">
                I owned the full lifecycle, from prototyping to deployment and debugging live issues. A few real ones:
                the backend container ignored the host's port variable until I fixed how the start command expanded it,
                production logins kept redirecting to localhost until I corrected the auth URL configuration, and a
                stale deployment config returned 404 on every route until I rebuilt the project from scratch.
              </p>
            ) : null}
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://prompt2print.vercel.app"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground"
            >
              <ExternalLink className="size-4" aria-hidden />
              Live app
            </a>
            <a
              href="https://github.com/kshitijm23/Prompt2Print"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary"
            >
              <Github className="size-4" aria-hidden />
              GitHub
            </a>
          </div>
          <p className="text-xs text-muted-foreground">Sign-in required on the live app.</p>
        </div>
      </div>
    </Section>
  );
}
