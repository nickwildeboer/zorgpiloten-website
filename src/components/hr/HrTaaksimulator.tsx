"use client";

import { useEffect, useState } from "react";
import { taakgesprekHref } from "@/lib/navigatie";
import { Pill } from "@/components/ui";
import { TaakTabs, paneelId, tabId } from "./TaakTabs";
import { hrTaken, type HrSlug } from "./hrTaken";
import { Gegevenslabel } from "./Gegevenslabel";
import { MetPlekken } from "./MetPlekken";
import { TaakCta } from "./TaakCta";

type Fase = "wacht" | "bezig" | "klaar" | "verstuurd";

const ID = "hr-sim";

export function HrTaaksimulator() {
  const [slug, setSlug] = useState<HrSlug>("cao-loket");
  const [fase, setFase] = useState<Fase>("wacht");
  const [zichtbaar, setZichtbaar] = useState(0);

  const taak = hrTaken.find((t) => t.slug === slug) ?? hrTaken[0];
  const totaal = taak.stappen.length;

  function kies(s: HrSlug) {
    setSlug(s);
    setFase("wacht");
    setZichtbaar(0);
  }

  function start() {
    if (fase !== "wacht") return;
    const rustig = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (rustig) {
      setZichtbaar(totaal);
      setFase("klaar");
    } else {
      setZichtbaar(0);
      setFase("bezig");
    }
  }

  // Laat de stappen een voor een verschijnen, daarna staat het concept klaar.
  useEffect(() => {
    if (fase !== "bezig") return;
    const t = window.setTimeout(
      () => {
        if (zichtbaar + 1 >= totaal) {
          setZichtbaar(totaal);
          setFase("klaar");
        } else {
          setZichtbaar(zichtbaar + 1);
        }
      },
      zichtbaar === 0 ? 350 : 800,
    );
    return () => window.clearTimeout(t);
  }, [fase, zichtbaar, totaal]);

  function keurGoed() {
    if (fase === "klaar") setFase("verstuurd");
  }

  const status =
    fase === "bezig" && zichtbaar > 0
      ? `Stap ${zichtbaar} van ${totaal}: ${taak.stappen[zichtbaar - 1].replace(/[[\]]/g, "")}`
      : fase === "klaar"
        ? "Het voorwerk staat klaar. Lees het concept en keur het goed als het klopt."
        : fase === "verstuurd"
          ? `Goedgekeurd en verstuurd door ${taak.rol}.`
          : "";

  const startLabel = { wacht: "Bereid voorwerk voor", bezig: "Voorwerk wordt klaargezet", klaar: "Voorwerk staat klaar", verstuurd: "Voorwerk staat klaar" }[fase];

  return (
    <div>
      <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-8">
        <TaakTabs taken={hrTaken} actief={slug} onKies={kies} label="Kies een HR-taak" idPrefix={ID} />

        <div
          id={paneelId(ID)}
          role="tabpanel"
          aria-labelledby={tabId(ID, slug)}
          tabIndex={0}
          className="min-w-0 overflow-hidden rounded-paneel border border-lijn bg-wolk shadow-kaart"
        >
          {/* Kop van de werkplek */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-lijn bg-creme px-5 py-3 sm:px-6">
            <p className="font-medium text-nachtblauw">
              Werkplek HR <span className="font-normal text-nachtblauw-zacht">met een fictief verzoek</span>
            </p>
            <Pill toon="wolk">Voorbeeld</Pill>
          </div>

          <div className="space-y-6 p-5 sm:p-6">
            <Gegevenslabel persoonsgegevens={taak.persoonsgegevens} kop={taak.gegevensKop} tekst={taak.gegevens} oordeel={taak.oordeel} />

            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
              {/* Links: wat er binnenkomt en wat het voorwerk doet */}
              <div>
                <p className="text-sm text-nachtblauw-zacht">Binnengekomen</p>
                <div className="mt-2 rounded-kaart border border-lijn bg-creme p-4">
                  <p className="flex items-center gap-2 text-[15px] font-medium text-nachtblauw">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className="shrink-0 text-hemel-diep">
                      <rect x="1.75" y="3.25" width="12.5" height="9.5" rx="1.5" />
                      <path d="m2.5 4 5.5 4.5L13.5 4" />
                    </svg>
                    {taak.binnen.van}
                  </p>
                  <p className="mt-2 text-nachtblauw">{taak.binnen.tekst}</p>
                </div>

                <button
                  type="button"
                  onClick={start}
                  aria-disabled={fase !== "wacht"}
                  className={`mt-4 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[15px] font-medium transition-colors ${
                    fase === "wacht" ? "bg-koraal font-semibold text-nachtblauw hover:bg-zandgeel" : "cursor-default border border-lijn bg-wolk text-nachtblauw-zacht"
                  }`}
                >
                  {startLabel}
                </button>

                {zichtbaar > 0 && (
                  <ol className="mt-6" aria-label="Wat het voorwerk doet">
                    {taak.stappen.slice(0, zichtbaar).map((stap, i) => {
                      const laatsteZichtbaar = i === zichtbaar - 1;
                      const actief = fase === "bezig" && laatsteZichtbaar;
                      return (
                        <li key={stap} className="flex gap-3 transition duration-300 starting:translate-y-1 starting:opacity-0">
                          <span className="flex flex-col items-center" aria-hidden="true">
                            <span className="koers-stop mt-[7px]" data-actief={actief} data-gedaan={!actief} />
                            {!laatsteZichtbaar && <span className="mt-1 w-[2px] flex-1 bg-zandgeel" />}
                          </span>
                          <span className={`pb-4 text-[15px] leading-snug ${actief ? "font-medium text-nachtblauw" : "text-nachtblauw-zacht"}`}>
                            <MetPlekken tekst={stap} />
                          </span>
                        </li>
                      );
                    })}
                  </ol>
                )}
              </div>

              {/* Rechts: het concept en de handtekening van de medewerker */}
              <div>
                {fase === "klaar" || fase === "verstuurd" ? (
                  <div className="transition duration-300 starting:opacity-0">
                    <div className="rounded-kaart border border-lijn-sterk bg-wolk p-4 sm:p-5">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="font-medium text-nachtblauw">{taak.concept.titel}</p>
                        <Pill toon="salie">{fase === "verstuurd" ? "Verstuurd" : "Nog niet verstuurd"}</Pill>
                      </div>
                      {taak.concept.kop && <p className="mt-3 text-lg font-semibold leading-snug text-nachtblauw">{taak.concept.kop}</p>}
                      <div className="mt-3 space-y-2 text-[15px] text-nachtblauw">
                        {taak.concept.regels.map((r) => (
                          <p key={r}>
                            <MetPlekken tekst={r} />
                          </p>
                        ))}
                      </div>
                      <p className="mt-4 border-t border-lijn pt-3 text-sm text-nachtblauw-zacht">Bronnen: {taak.concept.bronnen.join(", ")}</p>
                    </div>

                    <p className="mt-4 text-[15px]">
                      <span className="font-medium text-nachtblauw">Wat {taak.rol} doet: </span>
                      {taak.medewerker}
                    </p>
                    {taak.grens && <p className="mt-2 text-[15px] text-nachtblauw-zacht">{taak.grens}</p>}

                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={keurGoed}
                        aria-disabled={fase === "verstuurd"}
                        className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[15px] font-medium transition-colors ${
                          fase === "verstuurd" ? "cursor-default bg-hemel-zacht text-nachtblauw" : "bg-nachtblauw text-creme hover:bg-hemel-diep"
                        }`}
                      >
                        {fase === "verstuurd" && (
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                            <path d="m3 8.5 3.2 3L13 4.5" />
                          </svg>
                        )}
                        {fase === "verstuurd" ? "Goedgekeurd en verstuurd" : "Goedkeuren en versturen"}
                      </button>
                      {fase === "verstuurd" && (
                        <button type="button" onClick={() => kies(slug)} className="text-[15px] text-nachtblauw-zacht underline underline-offset-4 hover:text-nachtblauw">
                          Opnieuw bekijken
                        </button>
                      )}
                    </div>
                    {fase === "verstuurd" && (
                      <p className="mt-3 text-[15px] text-nachtblauw-zacht">
                        Verstuurd door {taak.rol}. De computer deed het voorwerk, het oordeel en de handtekening bleven bij een mens.
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="flex h-full min-h-40 items-center rounded-kaart border border-dashed border-lijn-sterk p-5 text-[15px] text-nachtblauw-zacht">
                    <p>
                      Hier verschijnt het voorwerk. Niets gaat de deur uit zonder het akkoord van {taak.rol}.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <p className="sr-only" aria-live="polite">
            {status}
          </p>
        </div>
      </div>

      <TaakCta taakTitel={taak.titel} href={taakgesprekHref("hr", taak.slug)} />
    </div>
  );
}
