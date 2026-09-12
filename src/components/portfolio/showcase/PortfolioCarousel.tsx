import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import type { PortfolioItem } from "@/lib/showcase-data";
import { PortfolioCard } from "./PortfolioCard";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

/**
 * Continuously looping 3D filmstrip. The card list is rendered twice and the
 * track drifts left forever, wrapping at the width of one set so there is no
 * visible start or end. Wheel, drag, and the arrow buttons nudge the same
 * offset, so the position is preserved when a case study opens and closes.
 */
export function PortfolioCarousel({
  items,
  onOpen,
  cardRefs,
  paused,
}: {
  items: PortfolioItem[];
  onOpen: (index: number) => void;
  cardRefs: React.MutableRefObject<(HTMLButtonElement | null)[]>;
  paused: boolean;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const offset = useRef(0);
  const setWidth = useRef(1);
  const hovering = useRef(false);
  const dragging = useRef(false);
  const [autoplay, setAutoplay] = useState(true);
  const isMobile = useIsMobile();
  const reduced =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const flat = isMobile || reduced;

  // Continuous drift plus wrapping, all in one animation frame loop.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;
    let last = performance.now();
    const measure = () => {
      setWidth.current = Math.max(1, track.scrollWidth / 2);
    };
    measure();
    window.addEventListener("resize", measure);

    const speed = reduced ? 0 : 26; // px per second
    const tick = (now: number) => {
      const dt = Math.min(64, now - last) / 1000;
      last = now;
      if (autoplay && !paused && !hovering.current && !dragging.current) {
        offset.current += speed * dt;
      }
      const w = setWidth.current;
      if (offset.current >= w) offset.current -= w;
      if (offset.current < 0) offset.current += w;
      track.style.transform = `translate3d(${-offset.current}px, 0, 0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", measure);
    };
  }, [autoplay, paused, reduced]);

  // Wheel and trackpad drive the strip horizontally.
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const onWheel = (e: WheelEvent) => {
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (!delta) return;
      e.preventDefault();
      offset.current += delta;
    };
    viewport.addEventListener("wheel", onWheel, { passive: false });
    return () => viewport.removeEventListener("wheel", onWheel);
  }, []);

  // Pointer and touch drag.
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    let startX = 0;
    let startOffset = 0;
    let moved = false;
    const down = (e: PointerEvent) => {
      dragging.current = true;
      moved = false;
      startX = e.clientX;
      startOffset = offset.current;
    };
    const move = (e: PointerEvent) => {
      if (!dragging.current) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 4) moved = true;
      if (moved) offset.current = startOffset - dx;
    };
    const up = () => {
      dragging.current = false;
    };
    const click = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
        moved = false;
      }
    };
    viewport.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    viewport.addEventListener("click", click, true);
    return () => {
      viewport.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
      viewport.removeEventListener("click", click, true);
    };
  }, []);

  const nudge = (dir: 1 | -1) => {
    const step = (trackRef.current?.firstElementChild as HTMLElement | null)?.offsetWidth ?? 260;
    offset.current += dir * (step + 24);
  };

  const strip = [...items, ...items];

  return (
    <div className="relative">
      <div
        ref={viewportRef}
        role="group"
        aria-label="Selected work, looping carousel"
        onMouseEnter={() => {
          hovering.current = true;
        }}
        onMouseLeave={() => {
          hovering.current = false;
        }}
        className="relative cursor-grab overflow-hidden py-8 active:cursor-grabbing"
        style={{ perspective: flat ? undefined : "1500px", touchAction: "pan-y" }}
      >
        <div
          ref={trackRef}
          className="flex w-max items-center will-change-transform"
          style={{ transformStyle: flat ? undefined : "preserve-3d" }}
        >
          {strip.map((item, i) => {
            const index = i % items.length;
            const clone = i >= items.length;
            return (
              <div
                key={`${item.id}-${clone ? "b" : "a"}`}
                className="shrink-0 transition-transform duration-500 hover:z-20"
                style={{
                  marginRight: flat ? "1rem" : "-2.5rem",
                  transform: flat ? undefined : "rotateY(-34deg) rotateZ(0.5deg)",
                }}
              >
                <PortfolioCard
                  item={item}
                  active={false}
                  clone={clone}
                  onOpen={() => onOpen(index)}
                  ref={
                    clone
                      ? undefined
                      : (el) => {
                          cardRefs.current[index] = el;
                        }
                  }
                />
              </div>
            );
          })}
        </div>

        {/* Edge fades so the strip dissolves instead of ending. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent sm:w-40"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent sm:w-40"
        />
      </div>

      <div className="mx-auto mt-2 flex w-full max-w-5xl items-center justify-between gap-4 px-5 sm:px-8">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => nudge(-1)}
            aria-label="Move carousel left"
            className="rounded-full border border-border bg-card p-2 text-muted-foreground transition-colors hover:border-accent/60 hover:text-accent"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => nudge(1)}
            aria-label="Move carousel right"
            className="rounded-full border border-border bg-card p-2 text-muted-foreground transition-colors hover:border-accent/60 hover:text-accent"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setAutoplay((a) => !a)}
            aria-label={autoplay ? "Pause the carousel" : "Play the carousel"}
            className={cn(
              "rounded-full border border-border bg-card p-2 transition-colors hover:border-accent/60 hover:text-accent",
              autoplay ? "text-muted-foreground" : "text-accent",
            )}
          >
            {autoplay ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
        </div>
        <span className="text-xs text-muted-foreground">Scroll, drag, or click a card</span>
      </div>
    </div>
  );
}
