"use client";

import { useEffect, useState, type ReactNode } from "react";
import { taakgesprekHref } from "@/lib/navigatie";
import { Container, Pill } from "@/components/ui";
import { Koersbocht } from "@/components/Horizon";
import { TaakTabs, paneelId, tabId } from "./TaakTabs";
import { hrTaken, type HrSlug } from "./hrTaken";
import { Gegevenslabel } from "./Gegevenslabel";
import { MetPlekken } from "./MetPlekken";
import { TaakCta } from "./TaakCta";

type Fase = "wacht" | "bezig" | "klaar" | "verstuurd";

const ID = "hr-sim";

/**
 * De demo-sectie van de HR-pagina plus de CTA-band, die de gekozen taak meeneemt.
 * Alles wat tussen de demo en de band staat, komt binnen als `tussen` (server components).
 */
export function HrDemo({ tussen }: { tussen?: ReactNode }) {
  const [slug, setSlug] = useState<HrSlug>("cao-loket");
  const taak = hrTaken.find((t) => t.slug === slug) ?? hrTaken[0];

  return (
    <>
      <section id="taaksimulator" className="scroll-mt-16 bg-wolk py-16 sm:py-24" aria-labelledby="taaksimulator-kop">
        <Container>
          <div className="max-w-2xl">
            <h2 id="taaksimulator-kop" className="text-[32px] sm:text-[44px]">
              Probeer het met één HR-taak
            </h2>
            <p className="mt-3 text-lg">Kies een taak, zet het voorwerk klaar en keur het zelf goed.</p>
          </div>
          <div className="mt-10">
            <HrTaaksimulator slug={slug} onKies={setSlug} />
          </div>
        </Container>
      </section>
      {tussen}
      <TaakCta
        taakTitel={taak.titel}
        href={taakgesprekHref("hr", taak.slug)}
        foto={{ src: "/fotos/nick-workshop-locatie-1.jpg", alt: "Nick Wildeboer tijdens een werksessie met een klein team" }}
      />
    </>
  );
}

function HrTaaksimulator({ slug, onKies }: { slug: HrSlug; onKies: (s: HrSlug) => void }) {
  const [fase, setFase] = useState<Fase>("wacht");
  const [zichtbaar, setZichtbaar] = useState(0);

  const taak = hrTaken.find((t) => t.slug === slug) ?? hrTaken[0];
  const totaal = taak.stappen.length;

  function kies(s: HrSlug) {
    onKies(s);
    setFase("wacht");
    setZichtbaar(0);
  }

  function start() {
    if (fase !== "wacht") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
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
      zichtbaar === 0 ? 300 : 650,
    );
    return () => window.clearTimeout(t);
  }, [fase, zichtbaar, totaal]);

  const status =
    fase === "bezig" && zichtbaar > 0
      ? `Stap ${zichtbaar} van ${totaal}: ${taak.stappen[zichtbaar - 1].replace(/[[\]]/g, "")}`
      : fase === "klaar"
        ? "Het voorwerk staat klaar. Lees het concept en keur het goed."
        : fase === "verstuurd"
          ? `Goedgekeurd en verstuurd door de ${taak.rol}.`
          : "";

  return (
    <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-10">
      <TaakTabs taken={hrTaken} actief={slug} onKies={kies} label="Kies een HR-taak" idPrefix={ID} />

      <div
        id={paneelId(ID)}
        role="tabpanel"
        aria-labelledby={tabId(ID, slug)}
        tabIndex={0}
        className="min-w-0 overflow-hidden rounded-paneel border border-lijn bg-creme shadow-kaart"
      >
        {/* Kop van de werkplek */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-lijn bg-wolk px-5 py-3 sm:px-7">
          <p className="font-medium text-nachtblauw">Werkplek HR</p>
          <Pill toon="salie">Voorbeeld</Pill>
        </div>

        <div className="space-y-6 p-5 sm:p-7">
          <Gegevenslabel persoonsgegevens={taak.persoonsgegevens} gegevens={taak.gegevens} oordeel={taak.rol} />

          <div className="grid gap-6 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] xl:gap-8">
            {/* Links: het verzoek en de koers van het voorwerk */}
            <div>
              <div className="flex gap-3">
                <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-hemel-zacht text-hemel-diep">
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1.75" y="3.25" width="12.5" height="9.5" rx="1.5" />
                    <path d="m2.5 4 5.5 4.5L13.5 4" />
                  </svg>
                </span>
                <div className="min-w-0 rounded-kaart rounded-tl-sm border border-lijn bg-wolk px-4 py-3">
                  <p className="text-sm text-nachtblauw-zacht">{taak.binnen.van}</p>
                  <p className="mt-1 text-nachtblauw">{taak.binnen.tekst}</p>
                </div>
              </div>

              {fase === "wacht" ? (
                <button
                  type="button"
                  onClick={start}
                  className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-koraal px-5 py-2.5 text-[15px] font-semibold text-nachtblauw transition-colors hover:bg-zandgeel"
                >
                  Zet het voorwerk klaar
                </button>
              ) : (
                <ol className="mt-6 pl-1" aria-label="Wat het voorwerk doet">
                  {taak.stappen.slice(0, zichtbaar).map((stap, i) => {
                    const laatste = i === zichtbaar - 1;
                    const actief = fase === "bezig" && laatste;
                    return (
                      <li key={stap} className="flex gap-3 transition duration-300 ease-out starting:translate-y-1 starting:opacity-0">
                        <span className="flex flex-col items-center" aria-hidden="true">
                          <span className="koers-stop mt-[6px]" data-actief={actief} data-gedaan={!actief} />
                          {!laatste && <span className="mt-1 w-[2px] flex-1 bg-zandgeel" />}
                        </span>
                        <span className={`pb-3 text-[15px] leading-snug ${actief ? "font-medium text-nachtblauw" : "text-nachtblauw-zacht"}`}>
                          <MetPlekken tekst={stap} />
                        </span>
                      </li>
                    );
                  })}
                </ol>
              )}
            </div>

            {/* Rechts: het concept en het akkoord van de medewerker */}
            <div>
              {fase === "klaar" || fase === "verstuurd" ? (
                <div className="transition duration-300 ease-out starting:opacity-0">
                  <div className="relative rounded-kaart border border-lijn bg-wolk p-5 shadow-kaart">
                    <p className="text-sm text-nachtblauw-zacht">{taak.concept.titel}</p>
                    {taak.concept.kop && <p className="mt-2 font-display text-[19px] font-bold leading-snug tracking-[-0.01em] text-nachtblauw">{taak.concept.kop}</p>}
                    <div className="mt-3 space-y-2 text-[15px] text-nachtblauw">
                      {taak.concept.regels.map((r) => (
                        <p key={r}>
                          <MetPlekken tekst={r} />
                        </p>
                      ))}
                    </div>
                    <div className="mt-4 flex flex-wrap gap-1.5 border-t border-lijn pt-3" aria-label="Bronnen">
                      {taak.concept.bronnen.map((b) => (
                        <span key={b} className="rounded-full bg-creme px-2.5 py-0.5 text-sm text-nachtblauw-zacht">
                          {b}
                        </span>
                      ))}
                    </div>

                    {fase === "verstuurd" && (
                      <span
                        aria-hidden="true"
                        className="absolute -right-2 -top-3 flex h-16 w-16 rotate-[-8deg] flex-col items-center justify-center rounded-full bg-zandgeel text-center text-[11px] font-semibold leading-tight text-nachtblauw shadow-kaart transition duration-300 ease-out starting:scale-75 starting:opacity-0"
                      >
                        <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m3 8.5 3.2 3L13 4.5" />
                        </svg>
                        Akkoord
                      </span>
                    )}
                  </div>

                  {taak.grens && <p className="mt-3 text-sm text-nachtblauw-zacht">{taak.grens}</p>}

                  <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                    {fase === "klaar" ? (
                      <button
                        type="button"
                        onClick={() => setFase("verstuurd")}
                        className="inline-flex min-h-11 items-center gap-2 rounded-full bg-nachtblauw px-5 py-2.5 text-[15px] font-medium text-creme transition-colors hover:bg-hemel-diep"
                      >
                        Goedkeuren als {taak.rol}
                      </button>
                    ) : (
                      <>
                        <p className="text-[15px] font-medium text-nachtblauw">Verstuurd door de {taak.rol}</p>
                        <button type="button" onClick={() => kies(slug)} className="min-h-11 text-[15px] text-hemel-diep underline underline-offset-4 hover:text-nachtblauw">
                          Opnieuw
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <div className="relative flex h-full min-h-48 flex-col justify-between overflow-hidden rounded-kaart border border-dashed border-lijn-sterk p-5">
                  <p className="max-w-[16rem] text-[15px] text-nachtblauw-zacht">
                    {fase === "bezig" ? "Het voorwerk wordt klaargezet." : "Hier verschijnt het voorwerk. Niets gaat weg zonder uw akkoord."}
                  </p>
                  <Koersbocht route={false} className={`ml-auto w-40 transition-opacity duration-500 ${fase === "bezig" ? "opacity-100" : "opacity-40"}`} />
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
  );
}
