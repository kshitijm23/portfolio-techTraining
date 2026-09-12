import { Download, Github, Linkedin, Mail, ArrowDown } from "lucide-react";
import { profile } from "@/lib/portfolio-data";

export function Hero() {
  return (
    <section id="top" className="px-5 pb-10 pt-16 sm:px-8 sm:pb-16 sm:pt-24">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
          Technical educator and builder
        </p>
        <h1 className="mt-4 max-w-3xl text-3xl leading-[1.12] tracking-tight sm:text-5xl md:text-6xl">
          I turn complex technical systems into learning people can actually use.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Technical educator and builder with an M.S. in Computer Science. I design training,
          measure what sticks, and build AI tools that help it scale.
        </p>
        <p className="mt-3 text-sm text-muted-foreground">{profile.location}</p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="#prompt2print"
            className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-transform hover:-translate-y-0.5"
          >
            See my work
            <ArrowDown className="size-4" aria-hidden />
          </a>
          <a
            href={profile.resume}
            download
            className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            <Download className="size-4" aria-hidden />
            Download resume
          </a>
          <div className="flex items-center gap-2">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn profile"
              className="rounded-md border border-border p-2.5 transition-colors hover:bg-secondary"
            >
              <Linkedin className="size-4" aria-hidden />
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile"
              className="rounded-md border border-border p-2.5 transition-colors hover:bg-secondary"
            >
              <Github className="size-4" aria-hidden />
            </a>
            <a
              href={`mailto:${profile.email}`}
              aria-label="Send an email"
              className="rounded-md border border-border p-2.5 transition-colors hover:bg-secondary"
            >
              <Mail className="size-4" aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
