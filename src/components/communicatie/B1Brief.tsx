"use client";

import { Fragment, useState } from "react";
import { Icoon } from "@/components/home/Iconen";
import { TaakIcoon } from "@/components/hr/TaakIconen";
import { alineas, controlepunten, woordenlijst } from "./b1Voorbeeld";
import { Wissel } from "./Wissel";

type Versie = "origineel" | "b1";

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
    <div className="grid gap-8 xl:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] xl:gap-0">
      <div className="xl:pr-8">
        <Wissel
          label="Versie van de brief"
          opties={[
            { waarde: "origineel", label: "Oorspronkelijke brief" },
            { waarde: "b1", label: "B1-versie" },
          ]}
          waarde={versie}
          onChange={setVersie}
        />

        <article aria-label={versie === "b1" ? "Voorbeeldbrief, B1-versie" : "Voorbeeldbrief, oorspronkelijke versie"} className="mt-6 border-t border-lijn-koel pt-5">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="text-[15px] font-semibold text-nachtblauw">Ziekenhuis Voorbeeld, polikliniek MDL</p>
            <p className="text-[14px] text-nachtblauw-zacht">Fictieve voorbeeldbrief</p>
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
                            ? "rounded bg-koraal-zacht px-0.5 [box-decoration-break:clone] transition-opacity duration-500 starting:opacity-0 motion-reduce:transition-none"
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

        <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-nachtblauw-zacht" aria-label="Legenda">
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

      <div className="space-y-8 border-t border-lijn-koel pt-7 xl:border-l xl:border-t-0 xl:pl-8 xl:pt-0">
        <div>
          <p className="font-semibold text-nachtblauw">Gemiddelde zinslengte</p>
          <div className="mt-3 space-y-3" aria-label="Gemiddelde zinslengte in deze voorbeeldbrief">
            {(["origineel", "b1"] as const).map((v) => (
              <div key={v}>
                <div className="flex items-baseline justify-between text-[14px]">
                  <span className={versie === v ? "font-semibold text-nachtblauw" : ""}>{v === "origineel" ? "Origineel" : "B1-versie"}</span>
                  <span className={versie === v ? "font-semibold text-nachtblauw" : ""}>{zinslengte[v]} woorden</span>
                </div>
                <div className="mt-1.5 h-3 overflow-hidden rounded-full bg-creme">
                  <div
                    className={`h-full rounded-full ${v === "b1" ? "bg-hemelblauw" : "bg-nachtblauw-zacht/40"}`}
                    style={{ width: `${Math.round((zinslengte[v] / zinslengte.origineel) * 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="font-semibold text-nachtblauw">Woorden die verschuiven</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {woordenlijst.map(([oud, nieuw]) => (
              <li key={oud} className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[14px] shadow-[inset_0_0_0_1px_var(--lijn-koel)]">
                <span className="text-nachtblauw-zacht line-through decoration-nachtblauw-zacht/50">{oud}</span>
                <TaakIcoon naam="pijl" grootte={20} className="h-4 w-4 text-hemel-diep" />
                <span className="sr-only">wordt</span>
                <span className="font-semibold text-nachtblauw">{nieuw}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-semibold text-nachtblauw">De adviseur checkt</p>
          <ul className="mt-3 space-y-2.5">
            {controlepunten.map((punt) => (
              <li key={punt} className="flex gap-2.5 text-[15px] leading-snug">
                <Icoon naam="vink" grootte={20} className="text-hemel-diep" />
                <span>{punt}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
