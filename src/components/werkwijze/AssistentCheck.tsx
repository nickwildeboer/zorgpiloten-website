"use client";

import { useRef, useState } from "react";
import { KeuzeTegel } from "@/components/over-ons/KeuzeTegel";
import { Icoon, type IcoonNaam } from "@/components/over-ons/Iconen";
import { Zon } from "@/components/Horizon";

type Optie = { waarde: string; label: string; kort: string; reactie: string };
type Vraag = { afspraak: string; icoon: IcoonNaam; vraag: string; parallel: string; advies: string; opties: Optie[] };

const vragen: Vraag[] = [
  {
    afspraak: "Mandaat",
    icoon: "klembord",
    vraag: "Wat mag de assistent zelfstandig?",
    parallel: "Een nieuwe collega krijgt op dag één ook geen volmacht.",
    advies: "Begin met alleen voorwerk. Een medewerker beslist en verstuurt.",
    opties: [
      { waarde: "voorwerk", label: "Alleen voorwerk, een medewerker verstuurt", kort: "Alleen voorwerk", reactie: "Daar beginnen wij ook mee. Oordeel en handtekening blijven bij uw team." },
      { waarde: "zelf", label: "Bij standaardvragen antwoordt hij zelf", kort: "Standaardvragen zelf", reactie: "Dat kan later, niet aan het begin. Eerst moet het voorwerk kloppen." },
      { waarde: "onbekend", label: "Dat weten we nog niet", kort: "Nog open", reactie: "Heel normaal. Dit spreken we in stop 2 af met de leidinggevende." },
    ],
  },
  {
    afspraak: "Meekijker",
    icoon: "oog",
    vraag: "Wie kijkt mee in de proeftijd?",
    parallel: "Een nieuwe collega heeft ook iemand die meekijkt.",
    advies: "Wijs een vaste meekijker aan die de eerste weken het voorwerk naloopt.",
    opties: [
      { waarde: "meekijker", label: "Een vaste collega kijkt mee", kort: "Vaste meekijker", reactie: "Sterk. Eén vaste meekijker ziet patronen die u anders mist." },
      { waarde: "iedereen", label: "Iedereen controleert zijn eigen voorwerk", kort: "Ieder zelf", reactie: "Dat blijft zo. In de proeftijd houdt één meekijker de lijnen bij elkaar." },
      { waarde: "niemand", label: "Daar is nog niemand voor aangewezen", kort: "Nog niemand", reactie: "Dan is dit de eerste naam die u nodig hebt. Zonder meekijker geen proeftijd." },
    ],
  },
  {
    afspraak: "Uitknop",
    icoon: "uitknop",
    vraag: "Hoe zet u hem direct stil?",
    parallel: "Bij een collega grijpt u meteen in. Bij een assistent moet dat ook kunnen.",
    advies: "Spreek af wie hem stilzet en hoe, en test dat voor de livegang.",
    opties: [
      { waarde: "uitknop", label: "Er is een uitknop en iemand die hem bedient", kort: "Vaste uitknop", reactie: "Zo hoort het. Test het wel een keer samen." },
      { waarde: "ict", label: "Via ICT, als die er tijd voor heeft", kort: "Via ICT", reactie: "Dan duurt ingrijpen te lang. Iemand op de afdeling moet hem kunnen stilzetten." },
      { waarde: "onbekend", label: "Daar is nog niet over nagedacht", kort: "Nog open", reactie: "Dan nemen we het mee in de inrichting." },
    ],
  },
];

export function AssistentCheck() {
  const [stap, setStap] = useState(0);
  const [antwoorden, setAntwoorden] = useState<(string | null)[]>([null, null, null]);
  const kopRef = useRef<HTMLHeadingElement>(null);

  const klaar = stap >= vragen.length;
  const index = Math.min(stap, vragen.length - 1);
  const vraag = vragen[index];
  const gekozen = antwoorden[index];
  const gekozenOptie = vraag.opties.find((o) => o.waarde === gekozen);
  const eersteOpen = antwoorden.findIndex((a) => a === null);
  const bereikbaarTot = eersteOpen === -1 ? vragen.length - 1 : eersteOpen;

  function kies(waarde: string) {
    setAntwoorden((a) => a.map((x, i) => (i === stap ? waarde : x)));
  }

  function ga(naar: number) {
    setStap(naar);
    requestAnimationFrame(() => kopRef.current?.focus());
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-10">
      {/* De inwerkkaart van de assistent */}
      <aside className="relative overflow-hidden rounded-[var(--radius-lg)] bg-nachtblauw p-6 sm:p-8" aria-label="Inwerkkaart van de assistent">
        <Zon className="pointer-events-none absolute -right-10 bottom-0 h-20 w-40 sm:h-24 sm:w-48" />
        <p className="relative text-sm font-semibold text-zandgeel">Inwerkkaart</p>
        <p className="relative mt-1 max-w-[14rem] font-display text-[28px] font-bold leading-tight text-creme">Uw digitale assistent</p>
        <span className="relative mt-3 inline-flex rounded-full bg-hemel-zacht px-3 py-1 text-sm font-medium text-nachtblauw">
          {klaar ? "Klaar voor de proeftijd" : "Nog in te werken"}
        </span>

        <ol className="relative mt-8 space-y-2">
          {vragen.map((v, i) => {
            const keuze = v.opties.find((o) => o.waarde === antwoorden[i]);
            const nu = !klaar && i === stap;
            const bereikbaar = klaar || i <= bereikbaarTot;
            return (
              <li key={v.afspraak}>
                <button
                  type="button"
                  onClick={() => ga(i)}
                  disabled={!bereikbaar}
                  aria-current={nu ? "step" : undefined}
                  className={`flex w-full items-center gap-4 rounded-kaart px-3 py-3 text-left transition-colors disabled:cursor-default ${
                    nu ? "bg-[var(--white-15)]" : "hover:bg-[var(--white-15)] disabled:hover:bg-transparent"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`grid h-11 w-11 flex-none place-items-center rounded-full ${keuze ? "bg-zandgeel text-nachtblauw" : "bg-[var(--white-15)] text-creme"}`}
                  >
                    {keuze ? <Icoon naam="vink" className="h-5 w-5" /> : <Icoon naam={v.icoon} className="h-5 w-5" />}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[15px] font-semibold text-creme">{v.afspraak}</span>
                    <span className="block text-[15px]" style={{ color: "var(--on-ink-soft)" }}>
                      {keuze ? keuze.kort : nu ? "Nu aan de beurt" : "Nog open"}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </aside>

      {/* De vraagkaart */}
      <div className="rounded-[var(--radius-lg)] border border-lijn bg-creme p-5 sm:p-8">
        {!klaar ? (
          <div>
            <p className="text-sm">
              Kaart {stap + 1} van {vragen.length}: {vraag.afspraak.toLowerCase()}
            </p>
            <h3 ref={kopRef} tabIndex={-1} className="mt-1 text-[26px] outline-none sm:text-[30px]">
              {vraag.vraag}
            </h3>
            <p className="mt-2">{vraag.parallel}</p>

            <fieldset className="mt-6">
              <legend className="mb-3 text-[15px] font-semibold text-nachtblauw">Hoe is het bij u?</legend>
              <div className="grid gap-2">
                {vraag.opties.map((o) => (
                  <KeuzeTegel key={o.waarde} naam={`assistent-${stap}`} waarde={o.waarde} gekozen={gekozen === o.waarde} onKies={kies} titel={o.label} compact />
                ))}
              </div>
            </fieldset>

            <div aria-live="polite">
              {gekozenOptie && <p className="mt-5 rounded-kaart bg-wolk px-4 py-3 text-[15px] text-nachtblauw shadow-kaart">{gekozenOptie.reactie}</p>}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => ga(stap - 1)}
                disabled={stap === 0}
                className="min-h-[44px] rounded-full border border-lijn-sterk px-5 py-2 text-[15px] text-nachtblauw hover:bg-hemel-zacht disabled:opacity-40"
              >
                Vorige kaart
              </button>
              <button
                type="button"
                onClick={() => ga(stap + 1)}
                disabled={!gekozen}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-nachtblauw px-5 py-2.5 text-[15px] font-semibold text-creme hover:bg-[var(--ink-3)] disabled:opacity-40"
              >
                {stap === vragen.length - 1 ? "Bekijk de inwerkkaart" : "Volgende kaart"}
                <Icoon naam="pijl" className="h-4 w-4" />
              </button>
            </div>
          </div>
        ) : (
          <div aria-live="polite">
            <h3 ref={kopRef} tabIndex={-1} className="text-[26px] outline-none sm:text-[30px]">
              Zo houdt u de regie
            </h3>
            <ul className="mt-6 space-y-3">
              {vragen.map((v) => (
                <li key={v.afspraak} className="flex gap-3 rounded-kaart bg-wolk px-4 py-3">
                  <Icoon naam={v.icoon} className="mt-0.5 h-5 w-5 text-hemel-diep" />
                  <p className="text-[15px] text-nachtblauw">
                    <span className="font-semibold">{v.afspraak}. </span>
                    {v.advies}
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[15px]">Deze afspraken maken we in stop 2. Ze komen in de werkinstructie.</p>
            <button
              type="button"
              onClick={() => {
                setAntwoorden([null, null, null]);
                ga(0);
              }}
              className="mt-5 min-h-[44px] rounded-full border border-lijn-sterk px-5 py-2 text-[15px] text-nachtblauw hover:bg-hemel-zacht"
            >
              Opnieuw beginnen
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
