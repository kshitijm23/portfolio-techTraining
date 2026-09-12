import { useCallback, useEffect, useRef, useState } from "react";
import { Image as ImageIcon, X } from "lucide-react";
import { Section } from "./Section";
import { cn } from "@/lib/utils";

// Add photo paths here once the images are uploaded (for example "/beyond/craft-1.jpg").
const craftPhotos: { src: string; alt: string }[] = [];

function Lightbox({
  photos,
  index,
  onClose,
  onMove,
}: {
  photos: { src: string; alt: string }[];
  index: number;
  onClose: () => void;
  onMove: (next: number) => void;
}) {
  const touchX = useRef<number | null>(null);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onMove((index + 1) % photos.length);
      if (e.key === "ArrowLeft") onMove((index - 1 + photos.length) % photos.length);
    },
    [index, onClose, onMove, photos.length],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  const photo = photos[index];
  if (!photo) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
      onTouchStart={(e) => {
        touchX.current = e.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(e) => {
        const start = touchX.current;
        const end = e.changedTouches[0]?.clientX ?? null;
        if (start === null || end === null) return;
        if (Math.abs(end - start) < 40) return;
        onMove(end < start ? (index + 1) % photos.length : (index - 1 + photos.length) % photos.length);
      }}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close photo viewer"
        className="absolute right-4 top-4 rounded-md border border-white/30 p-2 text-white"
      >
        <X className="size-4" aria-hidden />
      </button>
      <img
        src={photo.src}
        alt={photo.alt}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[80vh] w-auto rounded-md"
      />
    </div>
  );
}

export function Beyond() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <Section id="beyond" title="Beyond work" quiet>
      <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
        When I'm not teaching or building, I'm usually singing or making something by hand.
      </p>

      <div className="mt-8 grid items-start gap-6 sm:grid-cols-2">
        <article className="rounded-xl border border-border bg-card/60 p-5">
          <h3 className="text-lg tracking-tight">Singing</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Singing is how I unwind. It's also taught me a lot about practice, patience, and
            performing in front of people.
          </p>
        </article>

        <article className="rounded-xl border border-border bg-card/60 p-5">
          <h3 className="text-lg tracking-tight">Handmade crafts</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            I like making things with my hands. Starting with raw materials and ending with something
            real scratches the same itch as building software.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {craftPhotos.length > 0
              ? craftPhotos.map((p, i) => (
                  <button
                    key={p.src}
                    type="button"
                    onClick={() => setOpen(i)}
                    className="overflow-hidden rounded-lg border border-border"
                  >
                    <img src={p.src} alt={p.alt} className="aspect-square w-full object-cover" />
                  </button>
                ))
              : [0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={cn(
                      "flex aspect-square flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed border-border bg-background p-2 text-center text-xs text-muted-foreground",
                    )}
                  >
                    <ImageIcon className="size-4" aria-hidden />
                    Photo {i + 1} placeholder
                  </div>
                ))}
          </div>
        </article>
      </div>

      {open !== null && craftPhotos.length > 0 ? (
        <Lightbox photos={craftPhotos} index={open} onClose={() => setOpen(null)} onMove={setOpen} />
      ) : null}
    </Section>
  );
}
