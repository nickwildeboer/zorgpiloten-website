"use client";

import { useEffect, useRef, type KeyboardEvent } from "react";

export type TabTaak<S extends string> = {
  slug: S;
  titel: string;
  /** Korte naam voor de tabrij op een smal scherm. */
  pill: string;
  kort: string;
};

export const tabId = (prefix: string, slug: string) => `${prefix}-tab-${slug}`;
export const paneelId = (prefix: string) => `${prefix}-paneel`;

/**
 * Taakkeuze als tablist. Op een smal scherm een horizontaal scrollende rij pillen,
 * vanaf lg een verticale lijst met titel en korte omschrijving.
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
      className="-mx-4 flex snap-x gap-2 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 lg:mx-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0 lg:pb-0"
    >
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
            className={`shrink-0 snap-start rounded-full border px-4 py-2 text-left text-[15px] transition-colors lg:flex lg:items-start lg:gap-3 lg:rounded-kaart lg:px-4 lg:py-3 ${
              isActief
                ? "border-nachtblauw bg-nachtblauw font-medium text-creme lg:border-lijn-sterk lg:bg-wolk lg:font-normal lg:shadow-kaart"
                : "border-lijn bg-wolk text-nachtblauw-zacht hover:text-nachtblauw lg:border-transparent lg:bg-transparent lg:hover:bg-wolk/70"
            }`}
          >
            <span className="koers-stop mt-[7px] hidden lg:block" data-actief={isActief} aria-hidden="true" />
            <span className="block">
              <span className="lg:hidden">{t.pill}</span>
              <span className={`hidden leading-snug lg:block ${isActief ? "font-medium text-nachtblauw" : "text-nachtblauw"}`}>{t.titel}</span>
              <span className="mt-0.5 hidden text-sm leading-snug text-nachtblauw-zacht lg:block">{t.kort}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
