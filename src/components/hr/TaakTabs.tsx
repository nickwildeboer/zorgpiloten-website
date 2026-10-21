"use client";

import { useEffect, useRef, type KeyboardEvent } from "react";

export type TabTaak<S extends string> = {
  slug: S;
  titel: string;
  /** Korte naam voor de tabrij op een smal scherm. */
  pill: string;
};

export const tabId = (prefix: string, slug: string) => `${prefix}-tab-${slug}`;
export const paneelId = (prefix: string) => `${prefix}-paneel`;

/**
 * Taakkeuze als tablist. Op een smal scherm een horizontaal scrollende rij pillen,
 * vanaf lg een verticale koerslijn met een stop per taak.
 * Pijltjestoetsen, Home en End verplaatsen de keuze (automatische activatie).
 */
export function TaakTabs<S extends string>({
  taken,
  actief,
  onKies,
  label,
  idPrefix,
}: {
  taken: TabTaak<S>[];
  actief: S;
  onKies: (slug: S) => void;
  label: string;
  idPrefix: string;
}) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const lijst = useRef<HTMLDivElement>(null);

  // Houd op een smal scherm de actieve pil in beeld, zonder de pagina zelf te scrollen.
  useEffect(() => {
    const rij = lijst.current;
    const knop = refs.current[taken.findIndex((t) => t.slug === actief)];
    if (!rij || !knop || rij.scrollWidth <= rij.clientWidth) return;
    const links = knop.offsetLeft - rij.offsetLeft;
    const rechts = links + knop.offsetWidth;
    if (links < rij.scrollLeft || rechts > rij.scrollLeft + rij.clientWidth) {
      rij.scrollTo({ left: Math.max(links - 16, 0) });
    }
  }, [actief, taken]);

  function opToets(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    const laatste = taken.length - 1;
    const doelen: Record<string, number> = {
      ArrowRight: i === laatste ? 0 : i + 1,
      ArrowDown: i === laatste ? 0 : i + 1,
      ArrowLeft: i === 0 ? laatste : i - 1,
      ArrowUp: i === 0 ? laatste : i - 1,
      Home: 0,
      End: laatste,
    };
    const doel = doelen[e.key];
    if (doel === undefined) return;
    e.preventDefault();
    onKies(taken[doel].slug);
    refs.current[doel]?.focus();
  }

  return (
    <div
      ref={lijst}
      role="tablist"
      aria-label={label}
      className="relative -mx-4 flex lg:self-start snap-x gap-2 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0 lg:pb-0"
    >
      {/* De koerslijn achter de stops, alleen op groot scherm */}
      <span aria-hidden="true" className="absolute bottom-6 left-[17px] top-6 hidden w-[2px] bg-lijn lg:block" />
      {taken.map((t, i) => {
        const isActief = t.slug === actief;
        return (
          <button
            key={t.slug}
            ref={(el) => {
              refs.current[i] = el;
            }}
            id={tabId(idPrefix, t.slug)}
            type="button"
            role="tab"
            aria-selected={isActief}
            aria-controls={paneelId(idPrefix)}
            tabIndex={isActief ? 0 : -1}
            onClick={() => onKies(t.slug)}
            onKeyDown={(e) => opToets(e, i)}
            className={`relative min-h-11 shrink-0 snap-start rounded-full border px-4 py-2 text-left text-[15px] transition-colors lg:flex lg:items-center lg:gap-4 lg:border-0 lg:bg-transparent lg:px-3 lg:py-3 ${
              isActief
                ? "border-nachtblauw bg-nachtblauw font-medium text-creme"
                : "border-lijn bg-wolk text-nachtblauw-zacht hover:text-nachtblauw"
            }`}
          >
            <span className="koers-stop hidden lg:block" data-actief={isActief} aria-hidden="true" />
            <span className="lg:hidden">{t.pill}</span>
            <span
              className={`hidden leading-snug lg:block ${
                isActief ? "font-display text-[19px] font-bold tracking-[-0.01em] text-nachtblauw" : "text-nachtblauw-zacht hover:text-nachtblauw"
              }`}
            >
              {t.titel}
            </span>
          </button>
        );
      })}
    </div>
  );
}
