"use client";

import { useEffect, useId, useState, type KeyboardEvent } from "react";
import { homeBeeld } from "@/content/site";
import { Icoon } from "./Iconen";

const blad = homeBeeld.werkblad;
type Voorbeeld = (typeof blad.voorbeelden)[number];
type Regel = Voorbeeld["regels"][number];

/*
 * De lus in stappen. Voor regel i: stap 2i+1 = bezig, stap 2i+2 = klaar.
 * Daarna stap 2n+1 = concept en 2n+2 = afgetekend (de eindstand).
 * Zonder JavaScript en bij prefers-reduced-motion blijft de eindstand staan.
 */
const eind = (v: Voorbeeld) => v.regels.length * 2 + 2;

function wachttijd(v: Voorbeeld, stap: number) {
  const n = v.regels.length;
  if (stap < 2 * n) {
    const regel = v.regels[Math.floor(stap / 2)];
    const tekst = regel.soort === "tekst";
    const wordtBezig = stap % 2 === 0;
    return wordtBezig ? (tekst ? 500 : 350) : tekst ? 1700 : 750;
  }
  return stap === 2 * n ? 700 : 1800;
}

const RUST_NA_AFTEKENEN = 4500;

export function Werkblad() {
  const id = useId();
  const [tab, setTab] = useState(0);
  const [stap, setStap] = useState(() => eind(blad.voorbeelden[0]));
  const [live, setLive] = useState(false);
  const [gepauzeerd, setGepauzeerd] = useState(false);

  // Start de lus pas na het laden, en alleen als beweging mag.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setTimeout(() => {
      setLive(true);
      setStap(0);
    }, 700);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!live || gepauzeerd) return;
    const v = blad.voorbeelden[tab];
    if (stap >= eind(v)) {
      const t = window.setTimeout(() => {
        setTab((x) => (x + 1) % blad.voorbeelden.length);
        setStap(0);
      }, RUST_NA_AFTEKENEN);
      return () => window.clearTimeout(t);
    }
    const t = window.setTimeout(() => setStap((s) => s + 1), wachttijd(v, stap));
    return () => window.clearTimeout(t);
  }, [live, gepauzeerd, tab, stap]);

  const kies = (i: number) => {
    setTab(i);
    setStap(live && !gepauzeerd ? 0 : eind(blad.voorbeelden[i]));
  };

  const opToets = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const n = (i + (e.key === "ArrowRight" ? 1 : -1) + blad.voorbeelden.length) % blad.voorbeelden.length;
    document.getElementById(`${id}-tab-${n}`)?.focus();
    kies(n);
  };

  return (
    <div className="relative rounded-[var(--radius-md)] bg-wolk p-5 shadow-kaart sm:p-7" aria-label={blad.label} role="group">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div role="tablist" aria-label={blad.tabsLabel} className="inline-flex gap-1 rounded-full bg-creme p-1">
          {blad.voorbeelden.map((v, i) => (
            <button
              key={v.tab}
              id={`${id}-tab-${i}`}
              type="button"
              role="tab"
              aria-selected={i === tab}
              aria-controls={`${id}-paneel-${i}`}
              tabIndex={i === tab ? 0 : -1}
              onClick={() => kies(i)}
              onKeyDown={(e) => opToets(e, i)}
              className={`rounded-full px-4 py-2 text-[14px] font-semibold text-nachtblauw transition-colors ${i === tab ? "bg-wolk shadow-[inset_0_0_0_1px_var(--lijn-koel)]" : "hover:bg-wolk/60"}`}
            >
              {v.tab}
            </button>
          ))}
        </div>
        {live && (
          <button
            type="button"
            aria-pressed={gepauzeerd}
            onClick={() => setGepauzeerd((p) => !p)}
            className="inline-flex items-center gap-2 rounded-full border border-lijn-koel py-2 pl-3 pr-4 text-[14px] font-semibold text-nachtblauw hover:border-nachtblauw/40"
          >
            <Icoon naam={gepauzeerd ? "afspelen" : "pauze"} grootte={20} />
            {gepauzeerd ? blad.speelAf : blad.pauzeer}
          </button>
        )}
      </div>

      {/* Beide panelen in dezelfde cel: de kaart houdt de hoogte van de grootste en springt niet. */}
      <div className="mt-5 grid">
        {blad.voorbeelden.map((v, i) => (
          <Paneel
            key={v.tab}
            v={v}
            id={`${id}-paneel-${i}`}
            tabId={`${id}-tab-${i}`}
            actief={i === tab}
            stap={i === tab ? stap : eind(v)}
          />
        ))}
      </div>
    </div>
  );
}

function Paneel({ v, id, tabId, actief, stap }: { v: Voorbeeld; id: string; tabId: string; actief: boolean; stap: number }) {
  const n = v.regels.length;
  const status = stap >= 2 * n + 2 ? "afgetekend" : stap === 2 * n + 1 ? "concept" : "werk";
  return (
    <div
      id={id}
      role="tabpanel"
      aria-labelledby={tabId}
      aria-hidden={!actief}
      inert={!actief}
      className={`flex flex-col [grid-area:1/1] ${actief ? "" : "invisible"}`}
    >
      <div className="flex items-center gap-3 border-b border-lijn-koel pb-3 text-nachtblauw">
        <Icoon naam="document" grootte={20} />
        <span className="font-display text-[19px] font-semibold">{v.titel}</span>
        <span className="ml-auto text-[14px] text-nachtblauw-zacht max-sm:hidden">{v.meta}</span>
      </div>

      <ol className="relative mt-2 flex flex-1 flex-col justify-between">
        {/* De koerslijn door het werk */}
        <span aria-hidden="true" className="absolute bottom-8 left-[7px] top-6 w-[2px] rounded-full bg-lijn-koel" />
        {v.regels.map((r, i) => (
          <RegelRij key={r.tekst} r={r} bezig={stap === 2 * i + 1} klaar={stap >= 2 * i + 2} />
        ))}
        <li className="relative mt-2 pl-10">
          <Stop klaar={status === "afgetekend"} bezig={false} vul="nacht" className="top-[22px]" />
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-lijn-koel pt-3">
            <span className="inline-flex items-center gap-2.5 font-semibold text-nachtblauw">
              <Icoon naam="aftekenen" />
              {v.aftekenaar}
            </span>
            <span className="grid justify-items-end">
              <span
                className={`[grid-area:1/1] inline-flex items-center rounded-full bg-zandgeel px-4 py-1.5 text-[14px] font-semibold text-nachtblauw transition-[opacity,transform] duration-500 ${status === "concept" ? "opacity-100" : "translate-y-1 opacity-0"}`}
                aria-hidden={status !== "concept"}
              >
                {blad.concept}
              </span>
              <span
                className={`[grid-area:1/1] inline-flex items-center gap-1.5 rounded-full bg-nachtblauw px-4 py-1.5 text-[14px] font-semibold text-creme transition-[opacity,transform] duration-500 ${status === "afgetekend" ? "opacity-100" : "translate-y-1 opacity-0"}`}
                aria-hidden={status !== "afgetekend"}
              >
                <Icoon naam="vink" grootte={20} />
                {blad.afgetekend}
              </span>
            </span>
          </div>
        </li>
      </ol>
    </div>
  );
}

function Stop({ klaar, bezig, vul = "hemel", className = "" }: { klaar: boolean; bezig: boolean; vul?: "hemel" | "nacht"; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute left-0 h-4 w-4 rounded-full border-2 border-nachtblauw bg-wolk transition-transform duration-500 ${bezig ? "scale-125" : "scale-100"} ${className}`}
    >
      <span
        className={`absolute inset-[2px] rounded-full transition-transform duration-500 ${vul === "hemel" ? "bg-hemelblauw" : "bg-nachtblauw"} ${klaar ? "scale-100" : "scale-0"}`}
      />
    </span>
  );
}

function RegelRij({ r, bezig, klaar }: { r: Regel; bezig: boolean; klaar: boolean }) {
  if (r.soort === "tekst") {
    // De herschreven zin vervangt de oorspronkelijke in dezelfde cel: geen lege regels tijdens het afspelen.
    return (
      <li className="relative py-3 pl-10">
        <Stop klaar={klaar} bezig={bezig} className="top-[17px]" />
        <div className="grid">
          <p
            aria-hidden={klaar}
            className={`relative isolate [grid-area:1/1] self-center text-[14.5px] leading-[1.45] text-nachtblauw-zacht transition-opacity ${klaar ? "opacity-0 duration-200" : "opacity-100 duration-300 delay-200"}`}
          >
            <span
              aria-hidden="true"
              className={`absolute -inset-x-1.5 -inset-y-0.5 -z-10 origin-left rounded-md bg-hemel-zacht transition-[transform,opacity] ${bezig ? "scale-x-100 opacity-100 duration-[1500ms] ease-linear" : "scale-x-0 opacity-0 duration-200"}`}
            />
            {r.origineel}
          </p>
          <p
            aria-hidden={!klaar}
            className={`[grid-area:1/1] self-center text-[17px] font-medium leading-[1.4] text-nachtblauw transition-[opacity,transform] ${klaar ? "translate-y-0 opacity-100 duration-400 delay-200" : "translate-y-1.5 opacity-0 duration-200"}`}
          >
            {r.tekst}
          </p>
        </div>
      </li>
    );
  }
  const resultaat = r.soort === "resultaat";
  return (
    <li className={`relative flex items-center justify-between gap-3 pl-10 ${resultaat ? "py-3" : "py-2"}`}>
      <Stop klaar={klaar} bezig={bezig} className={resultaat ? "top-[15px]" : "top-[12px]"} />
      <span
        className={`text-nachtblauw transition-opacity duration-500 ${resultaat ? "font-display text-[17px] font-semibold" : "text-[15.5px]"} ${klaar ? "opacity-100" : "opacity-45"}`}
      >
        {r.tekst}
      </span>
      {!resultaat && (
        <span className={`text-nachtblauw transition-[opacity,transform] duration-500 ${klaar ? "scale-100 opacity-100" : "scale-60 opacity-0"}`}>
          <Icoon naam="vink" grootte={20} />
        </span>
      )}
    </li>
  );
}
