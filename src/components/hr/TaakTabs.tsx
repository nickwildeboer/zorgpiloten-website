"use client";

import { useRef, type KeyboardEvent } from "react";

export type TabTaak<S extends string> = {
  slug: S;
  titel: string;
  /** Korte naam voor de tabrij op een smal scherm. */
  pill: string;
};

export const tabId = (prefix: string, slug: string) => `${prefix}-tab-${slug}`;
export const paneelId = (prefix: string) => `${prefix}-paneel`;

/**
 * Taakkeuze als tablist, in de vorm van de tabs in het werkblad op de homepage:
 * de actieve taak wit met een koele haarlijn op het zachte vlak.
 * Op een smal scherm een rij pillen die omloopt, vanaf lg een rustige lijst onder elkaar.
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
    <div role="tablist" aria-label={label} className="flex flex-wrap gap-1.5 lg:flex-col lg:gap-1 lg:self-start">
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
            className={`min-h-11 rounded-full px-4 py-2 text-left text-[15px] font-semibold leading-snug transition-colors lg:px-5 lg:py-3 ${
              isActief
                ? "bg-wolk text-nachtblauw shadow-[inset_0_0_0_1px_var(--lijn-koel)]"
                : "text-nachtblauw-zacht hover:bg-wolk/60 hover:text-nachtblauw max-lg:shadow-[inset_0_0_0_1px_var(--lijn-koel)]"
            }`}
          >
            <span className="lg:hidden">{t.pill}</span>
            <span className="hidden lg:inline">{t.titel}</span>
          </button>
        );
      })}
    </div>
  );
}
