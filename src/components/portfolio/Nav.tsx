import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "#impact", label: "Impact" },
  { href: "#role-lens", label: "Role lens" },
  { href: "#experience", label: "Experience" },
  { href: "#prompt2print", label: "Project" },
  { href: "#teaching", label: "How I teach" },
  { href: "#skills", label: "Skills" },
  { href: "#beyond", label: "Beyond work" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);


  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <nav
        aria-label="Main"
        className="mx-auto grid max-w-5xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-5 py-3 sm:px-8"
      >
        <a href="#top" className="min-w-0 truncate font-display text-base font-semibold sm:text-lg">
          Kshitij Mahajan
        </a>
        <div className="flex shrink-0 items-center gap-1">
          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="rounded-md px-2.5 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="rounded-md border border-border p-2 text-foreground transition-colors hover:bg-secondary lg:hidden"
          >
            {open ? <X className="size-4" aria-hidden /> : <Menu className="size-4" aria-hidden />}
          </button>
        </div>
      </nav>
      <div
        id="mobile-menu"
        className={cn("border-t border-border lg:hidden", open ? "block" : "hidden")}
      >
        <ul className="mx-auto grid max-w-5xl grid-cols-2 gap-1 px-5 py-3 sm:px-8">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-md px-2 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
