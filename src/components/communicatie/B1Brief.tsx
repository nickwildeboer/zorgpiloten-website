"use client";

import { Fragment, useState } from "react";
import { Schakelaar } from "@/components/ui";

type Versie = "origineel" | "b1";

type Zin = {
  origineel: string;
  b1: string;
  /** Feiten die letterlijk in beide versies staan. */
  feiten: string[];
};

/*
 * Fictieve voorbeeldbrief van een fictief ziekenhuis. Geen echte namen.
 * De medische feiten staan in beide versies letterlijk hetzelfde.
 * Wat het origineel niet zegt, voegt de B1-versie ook niet toe. Dat staat bij de controlepunten.
 */
const alineas: Zin[][] = [
  [
    {
      origineel: "Hierbij ontvangt u informatie omtrent de voorbereiding op de coloscopie welke bij u zal worden verricht op [datum] om [tijd].",
      b1: "U krijgt een onderzoek van uw darm. Dit heet een coloscopie. Het onderzoek is op [datum] om [tijd].",
      feiten: ["coloscopie", "[datum] om [tijd]"],
    },
  ],
  [
    {
      origineel: "Teneinde een adequate visualisatie van het darmslijmvlies te bewerkstelligen, dient de darm volledig gereinigd te zijn.",
      b1: "Uw darm moet helemaal schoon zijn. Alleen dan kan de arts de binnenkant van uw darm goed zien.",
      feiten: [],
    },
    {
      origineel: "Gedurende drie dagen voorafgaand aan het onderzoek dient u een vezelarm dieet aan te houden.",
      b1: "Eet de drie dagen voor het onderzoek vezelarm.",
      feiten: ["drie dagen", "vezelarm"],
    },
    {
      origineel: "De avond voorafgaand aan het onderzoek neemt u [naam van het laxeermiddel] in conform het schema in de bijlage.",
      b1: "De avond voor het onderzoek neemt u [naam van het laxeermiddel] in. Volg daarbij het schema in de bijlage.",
      feiten: ["[naam van het laxeermiddel]", "het schema in de bijlage"],
    },
  ],
  [
    {
      origineel: "Indien u anticoagulantia gebruikt, dient u tijdig contact op te nemen met de polikliniek.",
      b1: "Gebruikt u bloedverdunners? Bel dan op tijd de polikliniek.",
      feiten: ["polikliniek"],
    },
  ],
  [
    {
      origineel: "Na sedatie is het u niet toegestaan zelfstandig een motorvoertuig te besturen. Wij adviseren u derhalve een begeleider mee te nemen.",
      b1: "Krijgt u een roesje? Dan mag u daarna niet zelf autorijden. Neem daarom iemand mee die u naar huis brengt.",
      feiten: [],
    },
  ],
  [
    {
      origineel: "Voor vragen kunt u zich wenden tot de polikliniek Maag-, Darm- en Leverziekten via [telefoonnummer].",
      b1: "Hebt u vragen? Bel dan de polikliniek Maag-, Darm- en Leverziekten via [telefoonnummer].",
      feiten: ["polikliniek Maag-, Darm- en Leverziekten", "[telefoonnummer]"],
    },
  ],
];

const woordenlijst = [
  ["anticoagulantia", "bloedverdunners"],
  ["sedatie", "roesje"],
  ["motorvoertuig besturen", "autorijden"],
  ["conform", "volg daarbij"],
];

const controlepunten = [
  "Datum, tijd, middel en telefoonnummer staan er letterlijk in.",
  "‘Op tijd’ is geen termijn. Vraag de afdeling om een aantal dagen.",
  "Een verpleegkundige van de afdeling leest mee.",
];

const alleZinnen = alineas.flat();
const herschreven = alleZinnen.filter((z) => z.origineel !== z.b1).length;

function gemiddeldeZinslengte(versie: Versie) {
  const tekst = alleZinnen.map((z) => z[versie]).join(" ");
  const zinnen = tekst.match(/[^.?]+[.?]/g) ?? [];
  const woorden = zinnen.reduce((som, zin) => som + zin.trim().split(/\s+/).length, 0);
  return Math.round(woorden / Math.max(zinnen.length, 1));
}

const zinslengte = { origineel: gemiddeldeZinslengte("origineel"), b1: gemiddeldeZinslengte("b1") };

function escape(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Zet de feiten in een zin onder een stippellijn, zodat zichtbaar is dat ze blijven staan. */
function MetFeiten({ tekst, feiten }: { tekst: string; feiten: string[] }) {
  if (feiten.length === 0) return <>{tekst}</>;
  const patroon = new RegExp(`(${feiten.map(escape).join("|")})`, "g");
  return (
    <>
      {tekst.split(patroon).map((deel, i) =>
        feiten.includes(deel) ? (
          <span key={i} className="underline decoration-hemel-diep decoration-dotted decoration-2 underline-offset-[5px]">
            {deel}
          </span>
        ) : (
          <Fragment key={i}>{deel}</Fragment>
        ),
      )}
    </>
  );
}

export function B1Brief() {
  const [versie, setVersie] = useState<Versie>("origineel");

  return (
    <div className="grid gap-8 xl:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
      <div>
        <Schakelaar
          label="Versie van de brief"
          opties={[
            { waarde: "origineel", label: "Oorspronkelijke brief" },
            { waarde: "b1", label: "B1-versie" },
          ]}
          waarde={versie}
          onChange={setVersie}
        />

        <article aria-label={versie === "b1" ? "Voorbeeldbrief, B1-versie" : "Voorbeeldbrief, oorspronkelijke versie"} className="mt-5 rounded-kaart border border-lijn bg-wolk p-5 shadow-kaart sm:p-8">
          <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-lijn pb-4">
            <p className="text-[15px] font-medium text-nachtblauw">Ziekenhuis Voorbeeld, polikliniek MDL</p>
            <p className="text-sm text-nachtblauw-zacht">Fictieve voorbeeldbrief</p>
          </div>
          <h4 className="mt-5 text-lg">Voorbereiding op uw coloscopie</h4>
          <div className="mt-4 space-y-4 text-[16px] leading-relaxed text-nachtblauw">
            <p>Geachte heer, mevrouw,</p>
            {alineas.map((alinea, a) => (
              <p key={a}>
                {alinea.map((zin, z) => {
                  const anders = zin.origineel !== zin.b1;
                  return (
                    <Fragment key={z}>
                      {z > 0 && " "}
                      <span
                        key={versie}
                        className={
                          anders
                            ? "rounded bg-koraal-zacht px-0.5 [box-decoration-break:clone] transition duration-500 starting:opacity-0 starting:blur-[3px]"
                            : undefined
                        }
                      >
                        <MetFeiten tekst={zin[versie]} feiten={zin.feiten} />
                      </span>
                    </Fragment>
                  );
                })}
              </p>
            ))}
            <p>
              Met vriendelijke groet,
              <br />
              Polikliniek Maag-, Darm- en Leverziekten
            </p>
          </div>
        </article>

        <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-nachtblauw-zacht" aria-label="Legenda">
          <li className="flex items-center gap-2">
            <span aria-hidden="true" className="inline-block h-3.5 w-6 rounded bg-koraal-zacht" />
            Lastige zin, herschreven
          </li>
          <li className="flex items-center gap-2">
            <span aria-hidden="true" className="inline-block w-6 border-b-2 border-dotted border-hemel-diep" />
            Feit, blijft letterlijk staan
          </li>
        </ul>

        <p className="sr-only" aria-live="polite">
          {versie === "b1"
            ? `B1-versie getoond. ${herschreven} zinnen herschreven, de feiten zijn ongewijzigd.`
            : "Oorspronkelijke brief getoond."}
        </p>
      </div>

      <div className="space-y-8">
        <div>
          <p className="font-medium text-nachtblauw">Gemiddelde zinslengte</p>
          <div className="mt-3 space-y-3" aria-label="Gemiddelde zinslengte in deze voorbeeldbrief">
            {(["origineel", "b1"] as const).map((v) => (
              <div key={v}>
                <div className="flex items-baseline justify-between text-sm">
                  <span className={versie === v ? "font-medium text-nachtblauw" : ""}>{v === "origineel" ? "Origineel" : "B1-versie"}</span>
                  <span className={versie === v ? "font-medium text-nachtblauw" : ""}>{zinslengte[v]} woorden</span>
                </div>
                <div className="mt-1.5 h-3 overflow-hidden rounded-full border border-lijn bg-wolk">
                  <div
                    className={`h-full rounded-full transition-colors duration-300 ${v === "b1" ? "bg-hemelblauw" : "bg-nachtblauw-zacht/40"}`}
                    style={{ width: `${Math.round((zinslengte[v] / zinslengte.origineel) * 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="font-medium text-nachtblauw">Woorden die verschuiven</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {woordenlijst.map(([oud, nieuw]) => (
              <li key={oud} className="inline-flex items-center gap-1.5 rounded-full border border-lijn bg-wolk px-3 py-1 text-sm">
                <span className="text-nachtblauw-zacht line-through decoration-nachtblauw-zacht/50">{oud}</span>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="var(--hemel-diep)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
                <span className="sr-only">wordt</span>
                <span className="font-medium text-nachtblauw">{nieuw}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-medium text-nachtblauw">De adviseur checkt</p>
          <ul className="mt-3 space-y-2.5">
            {controlepunten.map((punt) => (
              <li key={punt} className="flex gap-2.5 text-[15px] leading-snug">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="var(--hemel-diep)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="mt-0.5 shrink-0">
                  <rect x="2.5" y="2.5" width="13" height="13" rx="3" />
                  <path d="m5.8 9.2 2.2 2.2 4.4-4.6" />
                </svg>
                <span>{punt}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
