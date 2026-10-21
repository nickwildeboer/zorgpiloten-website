"use client";

import type { ReactNode } from "react";

export type KoersStap = { titel: string; kort?: string };

/**
 * De framboos koerslijn: een 2px lijn met ronde stops van 10px.
 * Open stops zijn volgende stappen, de actieve stop is gevuld met een zachte ring,
 * stops vóór de actieve zijn gevuld. Klikbaar als onKies is meegegeven.
 * richting="horizontaal" valt op smalle schermen terug op verticaal.
 */
export function Koerslijn({
  stappen,
  actief,
  onKies,
  label = "Koerslijn",
}: {
  stappen: KoersStap[];
  actief: number;
  onKies?: (i: number) => void;
  label?: string;
}) {
  return (
    <ol aria-label={label} className="relative grid gap-5 md:gap-0 max-md:before:absolute max-md:before:left-[4px] max-md:before:top-2 max-md:before:bottom-2 max-md:before:w-[2px] max-md:before:bg-zandgeel max-md:before:content-['']" style={{ gridTemplateColumns: `repeat(${stappen.length}, minmax(0, 1fr))` } as React.CSSProperties}>
      {stappen.map((stap, i) => {
        const isActief = i === actief;
        const gedaan = i < actief;
        const inhoud: ReactNode = (
          <>
            <span className="flex items-center max-md:absolute max-md:left-0 max-md:top-[0.55rem]">
              <span className="koers-stop" data-actief={isActief} data-gedaan={gedaan} aria-hidden="true" />
              {i < stappen.length - 1 && <span aria-hidden="true" className="flex-1 max-md:hidden" style={{ height: 2, backgroundImage: "radial-gradient(circle, var(--zandgeel) 2px, transparent 2.5px)", backgroundSize: "12px 4px", backgroundRepeat: "repeat-x", backgroundPosition: "center" }} />}
            </span>
            <span className={`mt-3 max-md:mt-0 block pr-3 text-[15px] leading-snug ${isActief ? "font-medium text-tekst" : "text-tekst-2"}`}>{stap.titel}</span>
            {stap.kort && <span className="mt-1 block pr-3 text-sm text-tekst-zacht">{stap.kort}</span>}
          </>
        );
        return (
          <li key={stap.titel} className="relative min-w-0 max-md:col-span-full max-md:pl-6">
            {onKies ? (
              <button
                type="button"
                onClick={() => onKies(i)}
                aria-current={isActief ? "step" : undefined}
                className="block w-full text-left rounded-lg py-1 hover:bg-salie/50 focus-visible:outline-2"
              >
                {inhoud}
              </button>
            ) : (
              <div aria-current={isActief ? "step" : undefined}>{inhoud}</div>
            )}
          </li>
        );
      })}
    </ol>
  );
}
