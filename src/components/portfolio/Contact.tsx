import { useState } from "react";
import { Copy, Download, Github, Linkedin } from "lucide-react";
import { Section } from "./Section";
import { profile } from "@/lib/portfolio-data";

export function Contact() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
    } catch {
      // clipboard unavailable, the address is still visible on screen
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <Section id="contact" title="Let's talk.">
      <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
        I'm open to roles in technical training, AI enablement, and technical product or project
        management.
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <span className="rounded-md border border-border bg-card px-4 py-2.5 text-sm">
          {profile.email}
        </span>
        <button
          type="button"
          onClick={copyEmail}
          className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-accent-foreground"
        >
          <Copy className="size-4" aria-hidden />
          Copy email
        </button>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2.5 text-sm font-medium transition-colors hover:bg-secondary"
        >
          <Linkedin className="size-4" aria-hidden />
          LinkedIn
        </a>
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2.5 text-sm font-medium transition-colors hover:bg-secondary"
        >
          <Github className="size-4" aria-hidden />
          GitHub
        </a>
        <a
          href={profile.resume}
          download
          className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2.5 text-sm font-medium transition-colors hover:bg-secondary"
        >
          <Download className="size-4" aria-hidden />
          Download resume
        </a>
      </div>
      <div aria-live="polite" className="mt-4 h-6">
        {copied ? (
          <span className="inline-flex animate-fade-in items-center rounded-md bg-foreground px-3 py-1 text-xs text-background">
            Copied
          </span>
        ) : null}
      </div>
      <footer className="mt-12 border-t border-border pt-6 text-sm text-muted-foreground">
        {profile.name}, {profile.location}
      </footer>
    </Section>
  );
}
