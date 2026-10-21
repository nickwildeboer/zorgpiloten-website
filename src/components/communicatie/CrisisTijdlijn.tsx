"use client";

import { useEffect, useState } from "react";
import { Pill } from "@/components/ui";
import { MetPlekken } from "@/components/hr/MetPlekken";

const handmatig = [
  "Melding komt binnen",
  "Feiten verzamelen via telefoon en mail",
  "Protocol en eerdere berichten opzoeken",
  "Eerste versie schrijven",
  "Rondsturen voor commentaar",
  "Versies samenvoegen",
  "Akkoord van het MT",
];

const metVoorwerk = [
  "Melding komt binnen",
  "Concept met zeven kernzinnen staat klaar",
  "Adviseur checkt de feiten en scherpt aan",
  "Akkoord van het MT",
];

/* Fictieve situatie. Wat nog niet vaststaat, staat als plaatshouder met de herkomst erbij. */
const kernzinnen = [
  { zin: "Door noodweer is vannacht water binnengekomen op [afdeling] van [locatie].", herkomst: "Uit de melding" },
  { zin: "Alle patiënten zijn veilig en liggen tijdelijk op [andere afdeling].", herkomst: "Uit de melding" },
  { zin: "Ze worden verzorgd door hun eigen team.", herkomst: "Te bevestigen door de afdeling" },
  { zin: "Familie en naasten krijgen vandaag persoonlijk bericht van de afdeling.", herkomst: "Uit jullie crisisprotocol" },
  { zin: "Bezoek is welkom via [ingang], de bezoektijden blijven hetzelfde.", herkomst: "Te bevestigen door de afdeling" },
  { zin: "We verwachten dat de afdeling [verwachting van het MT] weer open is.", herkomst: "In te vullen door het MT" },
  { zin: "Hebt u vragen, bel dan [telefoonnummer].", herkomst: "Uit jullie crisisprotocol" },
];

const MAX = handmatig.length;

function Baan({ titel, stappen, stand, accent }: { titel: string; stappen: string[]; stand: number; accent: boolean }) {
  const klaar = stand >= stappen.length;
  return (
    <div>
      <p className="font-medium text-nachtblauw">{titel}</p>
      <p className="mt-0.5 text-sm text-nachtblauw-zacht">{klaar ? "Afgerond" : `Stap ${stand} van ${stappen.length}`}</p>
      <ol className="mt-4">
        {stappen.map((stap, i) => {
          const bereikt = i < stand;
          const huidig = i === stand - 1;
          return (
            <li key={stap} className="flex gap-3">
              <span className="flex flex-col items-center" aria-hidden="true">
                {accent ? (
                  <span className="koers-stop mt-[7px]" data-actief={huidig} data-gedaan={bereikt && !huidig} />
                ) : (
                  <span
                    className={`mt-[7px] h-2.5 w-2.5 shrink-0 rounded-full border-2 border-hemel-diep transition-colors ${bereikt ? "bg-hemel-diep" : "bg-wolk"} ${huidig ? "ring-4 ring-hemel-zacht" : ""}`}
                  />
                )}
                {i < stappen.length - 1 && <span className={`mt-1 w-[2px] flex-1 ${accent ? "bg-zandgeel" : "bg-nachtblauw-zacht/40"}`} />}
              </span>
              <span className={`pb-4 text-[15px] leading-snug transition-colors ${huidig ? "font-medium text-nachtblauw" : bereikt ? "text-nachtblauw-zacht" : "text-nachtblauw-zacht/70"}`}>
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
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      <div>
        <div className="rounded-kaart border border-lijn bg-creme p-4 sm:p-5">
          <label htmlFor="crisis-moment" className="block font-medium text-nachtblauw">
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
            className="mt-3 w-full"
          />
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-nachtblauw-zacht">
              Moment {moment} van {MAX}
            </p>
            <button
              type="button"
              onClick={() => (speelt ? setSpeelt(false) : speelAf())}
              className="inline-flex items-center gap-2 rounded-full border border-nachtblauw px-4 py-2 text-[15px] font-medium text-nachtblauw transition-colors hover:bg-hemel-zacht"
            >
              {speelt ? "Pauzeer" : "Speel de tijdlijn af"}
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-8">
          <Baan titel="Handmatig" stappen={handmatig} stand={moment} accent={false} />
          <Baan titel="Met voorwerk" stappen={metVoorwerk} stand={voorwerkStand} accent />
        </div>

        <p className="mt-2 text-sm text-nachtblauw-zacht">
          Een voorbeeld van hoe de stappen verschuiven, geen meting. Hoeveel tijd het bij jullie scheelt, meten we in jullie eigen praktijk.
        </p>
      </div>

      <div>
        <p className="sr-only" aria-live="polite">
          {conceptKlaar ? `Concept kernboodschap: ${status}.` : ""}
        </p>
        {conceptKlaar ? (
          <div className="rounded-kaart border border-lijn-sterk bg-wolk p-5 shadow-kaart transition duration-300 starting:opacity-0">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-medium text-nachtblauw">Concept kernboodschap</p>
              <Pill toon="salie">{status}</Pill>
            </div>
            <p className="mt-1 text-sm text-nachtblauw-zacht">Fictieve situatie: wateroverlast na noodweer</p>
            <ol className="mt-4 space-y-3">
              {kernzinnen.map((k, i) => (
                <li key={k.zin} className="grid grid-cols-[1.5rem_1fr] gap-1 text-[15px]">
                  <span className="text-nachtblauw-zacht">{i + 1}</span>
                  <span>
                    <span className="block text-nachtblauw">
                      <MetPlekken tekst={k.zin} />
                    </span>
                    <span className="block text-sm text-nachtblauw-zacht">{k.herkomst}</span>
                  </span>
                </li>
              ))}
            </ol>
            <div className="mt-5 flex flex-wrap gap-3 border-t border-lijn pt-4">
              <button
                type="button"
                onClick={() => setAdviseur(true)}
                aria-disabled={adviseur}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[15px] font-medium transition-colors ${
                  adviseur ? "cursor-default bg-hemel-zacht text-nachtblauw" : "bg-nachtblauw text-creme hover:bg-hemel-diep"
                }`}
              >
                {adviseur ? "Adviseur heeft afgetekend" : "Aftekenen als adviseur"}
              </button>
              <button
                type="button"
                onClick={() => adviseur && setMt(true)}
                aria-disabled={!adviseur || mt}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[15px] font-medium transition-colors ${
                  mt ? "cursor-default bg-hemel-zacht text-nachtblauw" : adviseur ? "bg-nachtblauw text-creme hover:bg-hemel-diep" : "cursor-not-allowed border border-lijn text-nachtblauw-zacht"
                }`}
              >
                {mt ? "MT heeft afgetekend" : "Aftekenen als MT"}
              </button>
            </div>
            {mt && (
              <p className="mt-3 text-[15px] text-nachtblauw-zacht">
                De boodschap is afgetekend door de adviseur en het MT. Pas nu gaat hij naar patiënten, familie en medewerkers.
              </p>
            )}
          </div>
        ) : (
          <div className="flex h-full min-h-48 items-center rounded-kaart border border-dashed border-lijn-sterk p-5 text-[15px] text-nachtblauw-zacht">
            <p>Het concept met zeven kernzinnen verschijnt zodra de melding is verwerkt. Schuif door de tijdlijn of speel hem af.</p>
          </div>
        )}
      </div>
    </div>
  );
}
