"use client";

import { useEffect, useState } from "react";
import { MetPlekken } from "@/components/hr/MetPlekken";

const handmatig = [
  "Melding komt binnen",
  "Feiten verzamelen",
  "Protocol opzoeken",
  "Eerste versie schrijven",
  "Rondsturen voor commentaar",
  "Versies samenvoegen",
  "Akkoord van het MT",
];

const metVoorwerk = [
  "Melding komt binnen",
  "Zeven kernzinnen klaar",
  "Adviseur checkt en scherpt aan",
  "Akkoord van het MT",
];

/* Fictieve situatie. Wat nog niet vaststaat, staat als plaatshouder met de herkomst erbij. */
const kernzinnen = [
  { zin: "Door noodweer is vannacht water binnengekomen op [afdeling] van [locatie].", herkomst: "Uit de melding" },
  { zin: "Alle patiënten zijn veilig en liggen tijdelijk op [andere afdeling].", herkomst: "Uit de melding" },
  { zin: "Ze worden verzorgd door hun eigen team.", herkomst: "Te bevestigen" },
  { zin: "Familie en naasten krijgen vandaag persoonlijk bericht van de afdeling.", herkomst: "Uit uw protocol" },
  { zin: "Bezoek is welkom via [ingang], de bezoektijden blijven hetzelfde.", herkomst: "Te bevestigen" },
  { zin: "We verwachten dat de afdeling [verwachting van het MT] weer open is.", herkomst: "Invullen door MT" },
  { zin: "Hebt u vragen, bel dan [telefoonnummer].", herkomst: "Uit uw protocol" },
];

const MAX = handmatig.length;

function Baan({ titel, stappen, stand, accent }: { titel: string; stappen: string[]; stand: number; accent: boolean }) {
  const klaar = stand >= stappen.length;
  return (
    <div>
      <p className="font-semibold text-nachtblauw">{titel}</p>
      <p className="mt-0.5 text-sm text-nachtblauw-zacht">{klaar ? "Afgerond" : `Stap ${stand} van ${stappen.length}`}</p>
      <ol className="mt-4">
        {stappen.map((stap, i) => {
          const bereikt = i < stand;
          const huidig = i === stand - 1;
          return (
            <li key={stap} className="flex gap-3">
              <span className="flex flex-col items-center" aria-hidden="true">
                <span
                  className={`mt-[5px] h-3.5 w-3.5 shrink-0 rounded-full border-2 transition-[scale] duration-300 ${accent ? "border-nachtblauw" : "border-nachtblauw-zacht"} ${bereikt && !huidig ? (accent ? "bg-hemelblauw" : "bg-nachtblauw-zacht/40") : "bg-wolk"} ${huidig ? "scale-110" : ""}`}
                />
                {i < stappen.length - 1 && <span className="mt-1 w-[2px] flex-1 rounded-full bg-lijn-koel" />}
              </span>
              <span className={`pb-4 text-[15px] leading-snug transition-colors ${huidig ? "font-semibold text-nachtblauw" : bereikt ? "text-nachtblauw-zacht" : "text-nachtblauw-zacht/70"}`}>
                {stap}
                <span className="sr-only">{bereikt ? ", bereikt" : ", nog niet bereikt"}</span>
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export function CrisisTijdlijn() {
  const [moment, setMoment] = useState(1);
  const [speelt, setSpeelt] = useState(false);
  const [adviseur, setAdviseur] = useState(false);
  const [mt, setMt] = useState(false);

  const voorwerkStand = Math.min(moment, metVoorwerk.length);
  const conceptKlaar = voorwerkStand >= 2;

  useEffect(() => {
    if (!speelt) return;
    const t = window.setTimeout(() => {
      const volgende = Math.min(moment + 1, MAX);
      setMoment(volgende);
      if (volgende >= MAX) setSpeelt(false);
    }, 900);
    return () => window.clearTimeout(t);
  }, [speelt, moment]);

  function speelAf() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setMoment(MAX);
      return;
    }
    if (moment >= MAX) setMoment(1);
    setSpeelt(true);
  }

  const status = !conceptKlaar ? "Wacht op aftekening" : mt ? "Afgetekend, klaar om te delen" : adviseur ? "Adviseur akkoord, wacht op het MT" : "Wacht op de adviseur";

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-0">
      <div className="lg:pr-8">
        <div className="rounded-[var(--radius-md)] bg-creme p-4 sm:p-5">
          <label htmlFor="crisis-moment" className="block font-semibold text-nachtblauw">
            Loop door de tijdlijn
          </label>
          <input
            id="crisis-moment"
            type="range"
            min={1}
            max={MAX}
            step={1}
            value={moment}
            onChange={(e) => {
              setSpeelt(false);
              setMoment(Number(e.target.value));
            }}
            aria-valuetext={`Moment ${moment} van ${MAX}. Handmatig: ${handmatig[moment - 1]}. Met voorwerk: ${metVoorwerk[voorwerkStand - 1]}.`}
            className="mt-3 w-full accent-nachtblauw"
          />
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-nachtblauw-zacht">
              Moment {moment} van {MAX}
            </p>
            <button
              type="button"
              onClick={() => (speelt ? setSpeelt(false) : speelAf())}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-nachtblauw/30 bg-wolk px-5 py-2 text-[15px] font-semibold text-nachtblauw transition-colors hover:border-nachtblauw"
            >
              {speelt ? "Pauzeer" : "Speel de tijdlijn af"}
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-8">
          <Baan titel="Handmatig" stappen={handmatig} stand={moment} accent={false} />
          <Baan titel="Met voorwerk" stappen={metVoorwerk} stand={voorwerkStand} accent />
        </div>

        <p className="mt-2 text-sm text-nachtblauw-zacht">Een voorbeeld, geen meting.</p>
      </div>

      <div className="border-t border-lijn-koel pt-7 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
        <p className="sr-only" aria-live="polite">
          {conceptKlaar ? `Concept kernboodschap: ${status}.` : ""}
        </p>
        {conceptKlaar ? (
          <div className="transition-opacity duration-300 starting:opacity-0 motion-reduce:transition-none">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-display text-[19px] font-semibold text-nachtblauw">Concept kernboodschap</p>
              <span className="rounded-full bg-creme px-3 py-1 text-[14px] font-semibold text-nachtblauw">{status}</span>
            </div>
            <p className="mt-1 text-sm text-nachtblauw-zacht">Fictief: wateroverlast na noodweer</p>
            <ol className="mt-4 space-y-3">
              {kernzinnen.map((k, i) => (
                <li key={k.zin} className="grid grid-cols-[1.5rem_1fr] gap-1 text-[15px]">
                  <span className="text-nachtblauw-zacht">{i + 1}</span>
                  <span>
                    <span className="block text-nachtblauw">
                      <MetPlekken tekst={k.zin} />
                    </span>
                    <span className="mt-1 inline-block rounded-full bg-creme px-2.5 py-0.5 text-[13px] text-nachtblauw-zacht">{k.herkomst}</span>
                  </span>
                </li>
              ))}
            </ol>
            <div className="mt-5 flex flex-wrap gap-3 border-t border-lijn-koel pt-4">
              <button
                type="button"
                onClick={() => setAdviseur(true)}
                aria-disabled={adviseur}
                className={`inline-flex min-h-11 items-center gap-2 rounded-full px-4 py-2 text-[15px] font-semibold transition-colors ${
                  adviseur ? "cursor-default bg-hemel-zacht text-nachtblauw" : "bg-nachtblauw text-creme hover:bg-hemel-diep"
                }`}
              >
                {adviseur ? "Adviseur heeft afgetekend" : "Aftekenen als adviseur"}
              </button>
              <button
                type="button"
                onClick={() => adviseur && setMt(true)}
                aria-disabled={!adviseur || mt}
                className={`inline-flex min-h-11 items-center gap-2 rounded-full px-4 py-2 text-[15px] font-semibold transition-colors ${
                  mt ? "cursor-default bg-hemel-zacht text-nachtblauw" : adviseur ? "bg-nachtblauw text-creme hover:bg-hemel-diep" : "cursor-not-allowed shadow-[inset_0_0_0_1px_var(--lijn-koel)] text-nachtblauw-zacht"
                }`}
              >
                {mt ? "MT heeft afgetekend" : "Aftekenen als MT"}
              </button>
            </div>
            {mt && (
              <p className="mt-3 text-[15px] text-nachtblauw-zacht">
                Pas nu gaat de boodschap naar buiten.
              </p>
            )}
          </div>
        ) : (
          <div className="flex h-full min-h-44 flex-col justify-center gap-6 text-[15px] text-nachtblauw-zacht">
            <p className="max-w-[16rem]">Het concept verschijnt bij moment 2. Speel de tijdlijn af.</p>
            <div aria-hidden="true" className="max-w-[22rem] space-y-2.5 opacity-60">
              <div className="h-3 w-full rounded-full bg-lijn-koel" />
              <div className="h-3 w-[90%] rounded-full bg-lijn-koel" />
              <div className="h-3 w-[58%] rounded-full bg-lijn-koel" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
