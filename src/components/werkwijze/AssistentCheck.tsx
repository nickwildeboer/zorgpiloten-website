"use client";

import { useRef, useState } from "react";
import { KeuzeTegel } from "@/components/over-ons/KeuzeTegel";

type Optie = { waarde: string; label: string; reactie: string };
type Vraag = { vraag: string; parallel: string; advies: string; opties: Optie[] };

const vragen: Vraag[] = [
  {
    vraag: "Wat mag de assistent wel en niet zelfstandig?",
    parallel: "Een nieuwe collega krijgt op dag één ook geen volmacht. Je spreekt eerst af wat hij zelf mag en waar hij het moet voorleggen.",
    advies: "Begin met alleen voorwerk. De assistent zet klaar, een medewerker beslist en verstuurt.",
    opties: [
      {
        waarde: "voorwerk",
        label: "Alleen voorwerk klaarzetten, een medewerker verstuurt",
        reactie: "Dat is precies waar we zelf ook mee beginnen. Het oordeel en de handtekening blijven bij je team.",
      },
      {
        waarde: "zelf",
        label: "Bij standaardvragen mag hij zelf antwoorden",
        reactie: "Dat kan later een stap zijn, maar niet aan het begin. Eerst moet blijken dat het voorwerk klopt, dan pas bespreek je meer ruimte.",
      },
      {
        waarde: "onbekend",
        label: "Dat weten we nog niet",
        reactie: "Heel normaal. Dit is een van de eerste afspraken die we in stop 2 samen met de leidinggevende maken.",
      },
    ],
  },
  {
    vraag: "Wie controleert het voorwerk in de proeftijd?",
    parallel: "Een nieuwe collega heeft een inwerkperiode met iemand die meekijkt. Bij een assistent werkt dat net zo.",
    advies: "Wijs een vaste meekijker aan die in de eerste weken het voorwerk naloopt en bijhoudt wat beter moet.",
    opties: [
      {
        waarde: "meekijker",
        label: "Een vaste collega kijkt mee",
        reactie: "Sterk. Eén vaste meekijker ziet patronen die je anders mist en is het aanspreekpunt voor de rest van het team.",
      },
      {
        waarde: "iedereen",
        label: "Iedere medewerker controleert zijn eigen voorwerk",
        reactie: "Dat blijft altijd zo, maar in de proeftijd helpt één vaste meekijker die de lijnen bij elkaar houdt.",
      },
      {
        waarde: "niemand",
        label: "Daar is nog niemand voor aangewezen",
        reactie: "Dan is dit de eerste naam die je nodig hebt. Zonder meekijker is er geen proeftijd, alleen hoop.",
      },
    ],
  },
  {
    vraag: "Hoe zet je hem bij twijfel direct stil?",
    parallel: "Als een collega iets doet wat niet klopt, kun je meteen ingrijpen. Dat moet bij een assistent ook kunnen, zonder eerst een ticket te maken.",
    advies: "Spreek af wie de assistent mag stilzetten, hoe dat gaat en test het een keer voordat hij live gaat.",
    opties: [
      {
        waarde: "uitknop",
        label: "Er is een vaste uitknop en iemand die hem bedient",
        reactie: "Zo hoort het. Test het wel een keer samen, dan weet iedereen dat het echt werkt.",
      },
      {
        waarde: "ict",
        label: "Via ICT, als die er tijd voor heeft",
        reactie: "Dan duurt ingrijpen te lang. We regelen dat iemand op de afdeling zelf de assistent kan stilzetten, met ICT op de hoogte.",
      },
      {
        waarde: "onbekend",
        label: "Daar is nog niet over nagedacht",
        reactie: "Dan nemen we het mee. Een manier om hem direct stil te zetten hoort bij de inrichting.",
      },
    ],
  },
];

export function AssistentCheck() {
  const [stap, setStap] = useState(0);
  const [antwoorden, setAntwoorden] = useState<(string | null)[]>([null, null, null]);
  const kopRef = useRef<HTMLHeadingElement>(null);

  const klaar = stap >= vragen.length;
  const vraag = vragen[Math.min(stap, vragen.length - 1)];
  const gekozen = antwoorden[Math.min(stap, vragen.length - 1)];
  const gekozenOptie = vraag.opties.find((o) => o.waarde === gekozen);

  function kies(waarde: string) {
    setAntwoorden((a) => a.map((x, i) => (i === stap ? waarde : x)));
  }

  function ga(naar: number) {
    setStap(naar);
    requestAnimationFrame(() => kopRef.current?.focus());
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] lg:gap-12">
      <div>
        <ol className="space-y-3" aria-label="Voortgang">
          {vragen.map((v, i) => {
            const status = i < stap || klaar ? "gedaan" : i === stap ? "nu" : "straks";
            return (
              <li key={v.vraag} className="flex items-start gap-3">
                <span className="koers-stop mt-[7px]" data-actief={status === "nu"} data-gedaan={status === "gedaan"} aria-hidden="true" />
                <span className={`text-[15px] ${status === "nu" ? "font-medium text-tekst" : "text-tekst-2"}`}>
                  {v.vraag}
                  <span className="sr-only">{status === "gedaan" ? ", beantwoord" : status === "nu" ? ", huidige kaart" : ""}</span>
                </span>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="rounded-paneel border border-lijn bg-wolk p-5 shadow-kaart sm:p-8">
        {!klaar ? (
          <div>
            <p className="text-[15px] text-tekst-zacht">
              Kaart {stap + 1} van {vragen.length}
            </p>
            <h3 ref={kopRef} tabIndex={-1} className="mt-1 text-[24px] outline-none sm:text-[28px]">
              {vraag.vraag}
            </h3>
            <p className="mt-3 text-tekst-2">{vraag.parallel}</p>

            <fieldset className="mt-6">
              <legend className="mb-3 text-[15px] font-medium text-tekst">Hoe is het bij jullie?</legend>
              <div className="grid gap-2">
                {vraag.opties.map((o) => (
                  <KeuzeTegel
                    key={o.waarde}
                    naam={`assistent-${stap}`}
                    waarde={o.waarde}
                    gekozen={gekozen === o.waarde}
                    onKies={kies}
                    titel={o.label}
                    compact
                  />
                ))}
              </div>
            </fieldset>

            <div aria-live="polite">
              {gekozenOptie && (
                <p className="mt-5 rounded-kaart bg-salie px-4 py-3 text-[15px] text-tekst">{gekozenOptie.reactie}</p>
              )}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => ga(stap - 1)}
                disabled={stap === 0}
                className="rounded-full border border-lijn-sterk px-4 py-2 text-[15px] text-tekst hover:bg-salie disabled:opacity-40"
              >
                Vorige kaart
              </button>
              <button
                type="button"
                onClick={() => ga(stap + 1)}
                disabled={!gekozen}
                className="rounded-full bg-spar px-5 py-2.5 text-[15px] font-medium text-white hover:bg-spar-2 disabled:opacity-40"
              >
                {stap === vragen.length - 1 ? "Bekijk de samenvatting" : "Volgende kaart"}
              </button>
            </div>
          </div>
        ) : (
          <div aria-live="polite">
            <h3 ref={kopRef} tabIndex={-1} className="text-[24px] outline-none sm:text-[28px]">
              Zo houd je de regie over jullie assistent
            </h3>
            <dl className="mt-6 divide-y divide-lijn border-y border-lijn">
              {vragen.map((v, i) => {
                const keuze = v.opties.find((o) => o.waarde === antwoorden[i]);
                return (
                  <div key={v.vraag} className="py-4">
                    <dt className="font-medium text-tekst">{v.vraag}</dt>
                    <dd className="mt-1 text-[15px]">
                      <span className="text-tekst-zacht">Jullie antwoord: </span>
                      {keuze?.label}
                    </dd>
                    <dd className="mt-1 text-[15px]">
                      <span className="text-tekst-zacht">Ons advies: </span>
                      {v.advies}
                    </dd>
                  </div>
                );
              })}
            </dl>
            <p className="mt-5 text-[15px]">
              Deze drie afspraken maken we in stop 2 samen met de leidinggevende en het team. Ze komen in de werkinstructie die bij de overdracht hoort.
            </p>
            <button
              type="button"
              onClick={() => {
                setAntwoorden([null, null, null]);
                ga(0);
              }}
              className="mt-5 rounded-full border border-lijn-sterk px-4 py-2 text-[15px] text-tekst hover:bg-salie"
            >
              Opnieuw beginnen
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
