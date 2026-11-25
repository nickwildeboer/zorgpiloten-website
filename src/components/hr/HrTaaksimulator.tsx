"use client";

import { useEffect, useState, type ReactNode } from "react";
import { kennismakingHref, metMinuten } from "@/lib/navigatie";
import { Container } from "@/components/ui";
import { Icoon } from "@/components/home/Iconen";
import { hrPagina } from "@/content/paginas";
import { TaakTabs, paneelId, tabId } from "./TaakTabs";
import { TakenRij } from "./TakenRij";
import { hrTaken, type HrSlug } from "./hrTaken";
import { Gegevenslabel } from "./Gegevenslabel";
import { MetPlekken } from "./MetPlekken";
import { TaakCta } from "./TaakCta";
import { TaakIcoon, type TaakIcoonNaam } from "./TaakIconen";

type Fase = "wacht" | "bezig" | "klaar" | "verstuurd";

const ID = "hr-sim";
const iconen: TaakIcoonNaam[] = ["vraag", "kalender", "koffer", "nieuw", "badge"];

/**
 * Taken, demo en slotband van de HR-pagina. Ze delen de gekozen taak:
 * een taak in de rij kiest hem in de demo, de slotband neemt hem mee naar de kennismaking.
 * Alles tussen demo en band komt binnen als `tussen`, de portretten als `portretten` (server components).
 */
export function HrDemo({ tussen, portretten }: { tussen?: ReactNode; portretten?: ReactNode }) {
  const [slug, setSlug] = useState<HrSlug>("cao-loket");
  const taak = hrTaken.find((t) => t.slug === slug) ?? hrTaken[0];
  const { taken, demo, cta } = hrPagina;

  return (
    <>
      <TakenRij taken={taken} iconen={iconen} label="HR-taken" onKies={(i) => setSlug(hrTaken[i].slug)} />

      <section id="demo" className="scroll-mt-16 bg-creme py-20 sm:py-28" aria-labelledby="demo-kop">
        <Container>
          <div className="max-w-2xl">
            <h2 id="demo-kop" className="text-[32px] leading-[1.1] sm:text-[42px]">
              {demo.kop}
            </h2>
            <p className="mt-5 text-[18px] leading-[1.6] text-nachtblauw">{demo.zin}</p>
          </div>
          <div className="mt-12">
            <HrTaaksimulator slug={slug} onKies={setSlug} />
          </div>
        </Container>
      </section>

      {tussen}

      <TaakCta kop={cta.kop} tekst={metMinuten(cta.tekst)} taakTitel={taak.titel} href={kennismakingHref("hr", taak.slug)}>
        {portretten}
      </TaakCta>
    </>
  );
}

/** Drie grijze balkjes: het antwoord dat nog moet komen. */
function Balkjes({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`space-y-2.5 ${className}`}>
      <div className="h-3 w-full rounded-full bg-lijn-koel" />
      <div className="h-3 w-[90%] rounded-full bg-lijn-koel" />
      <div className="h-3 w-[58%] rounded-full bg-lijn-koel" />
    </div>
  );
}

function HrTaaksimulator({ slug, onKies }: { slug: HrSlug; onKies: (s: HrSlug) => void }) {
  const [fase, setFase] = useState<Fase>("wacht");
  const [zichtbaar, setZichtbaar] = useState(0);
  const [vorige, setVorige] = useState(slug);

  // Een andere taak (hier of via de takenrij) begint opnieuw.
  if (slug !== vorige) {
    setVorige(slug);
    setFase("wacht");
    setZichtbaar(0);
  }

  const taak = hrTaken.find((t) => t.slug === slug) ?? hrTaken[0];
  const totaal = taak.stappen.length;

  function opnieuw() {
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
    <div className="grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-8">
      <TaakTabs taken={hrTaken} actief={slug} onKies={onKies} label="Kies een HR-taak" idPrefix={ID} />

      <div
        id={paneelId(ID)}
        role="tabpanel"
        aria-labelledby={tabId(ID, slug)}
        tabIndex={0}
        className="min-w-0 rounded-[var(--radius-md)] bg-wolk shadow-kaart"
      >
        {/* Kop van de werkplek */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-lijn-koel px-5 py-4 sm:px-7">
          <p className="inline-flex items-center gap-3 font-display text-[19px] font-semibold text-nachtblauw">
            <Icoon naam="document" grootte={20} />
            Werkplek HR
          </p>
          <span className="rounded-full bg-creme px-3 py-1 text-[14px] font-semibold text-nachtblauw">Voorbeeld</span>
        </div>

        <div className="space-y-7 p-5 sm:p-7">
          <Gegevenslabel persoonsgegevens={taak.persoonsgegevens} gegevens={taak.gegevens} oordeel={taak.rol} />

          <div className="grid gap-7 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] xl:gap-0">
            {/* Links: het verzoek en de koers van het voorwerk */}
            <div className="xl:pr-8">
              <div className="flex gap-3">
                <TaakIcoon naam="post" className="mt-3 text-nachtblauw" />
                <div className="min-w-0 rounded-[var(--radius-md)] rounded-tl-sm bg-creme px-4 py-3">
                  <p className="text-[14px] text-nachtblauw-zacht">{taak.binnen.van}</p>
                  <p className="mt-1 text-nachtblauw">{taak.binnen.tekst}</p>
                </div>
              </div>

              {fase === "wacht" ? (
                <button
                  type="button"
                  onClick={start}
                  className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-koraal px-6 py-3 text-[15px] font-semibold text-nachtblauw transition-colors hover:bg-[var(--koraal-hover)]"
                >
                  Zet het voorwerk klaar
                </button>
              ) : (
                <ol className="mt-6 pl-1" aria-label="Wat het voorwerk doet">
                  {taak.stappen.slice(0, zichtbaar).map((stap, i) => {
                    const laatste = i === zichtbaar - 1;
                    const actief = fase === "bezig" && laatste;
                    return (
                      <li
                        key={stap}
                        className="flex gap-3 transition-[opacity,translate] duration-300 ease-out starting:translate-y-1 starting:opacity-0 motion-reduce:transition-none"
                      >
                        <span className="flex flex-col items-center" aria-hidden="true">
                          <span
                            className={`mt-[5px] h-3.5 w-3.5 flex-none rounded-full border-2 border-nachtblauw transition-[scale] duration-300 ${actief ? "scale-110 bg-wolk" : "bg-hemelblauw"}`}
                          />
                          {!laatste && <span className="mt-1 w-[2px] flex-1 rounded-full bg-lijn-koel" />}
                        </span>
                        <span className={`pb-3 text-[15px] leading-snug ${actief ? "font-semibold text-nachtblauw" : "text-nachtblauw-zacht"}`}>
                          <MetPlekken tekst={stap} />
                        </span>
                      </li>
                    );
                  })}
                </ol>
              )}
            </div>

            {/* Rechts: het concept en het akkoord van de medewerker */}
            <div className="border-t border-lijn-koel pt-7 xl:border-l xl:border-t-0 xl:pl-8 xl:pt-0">
              {fase === "klaar" || fase === "verstuurd" ? (
                <div className="transition-opacity duration-300 ease-out starting:opacity-0 motion-reduce:transition-none">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-[14px] text-nachtblauw-zacht">{taak.concept.titel}</p>
                    {fase === "verstuurd" ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-nachtblauw px-4 py-1.5 text-[14px] font-semibold text-creme transition-opacity duration-300 starting:opacity-0 motion-reduce:transition-none">
                        <Icoon naam="vink" grootte={20} />
                        Afgetekend
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-zandgeel px-4 py-1.5 text-[14px] font-semibold text-nachtblauw">Concept</span>
                    )}
                  </div>
                  {taak.concept.kop && <p className="mt-3 font-display text-[19px] font-semibold leading-snug text-nachtblauw">{taak.concept.kop}</p>}
                  <div className="mt-3 space-y-2 text-[15.5px] leading-[1.5] text-nachtblauw">
                    {taak.concept.regels.map((r) => (
                      <p key={r}>
                        <MetPlekken tekst={r} />
                      </p>
                    ))}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-1.5 border-t border-lijn-koel pt-3" aria-label="Bronnen">
                    {taak.concept.bronnen.map((b) => (
                      <span key={b} className="rounded-full bg-creme px-2.5 py-0.5 text-[14px] text-nachtblauw-zacht">
                        {b}
                      </span>
                    ))}
                  </div>

                  {taak.grens && <p className="mt-3 text-[14px] text-nachtblauw-zacht">{taak.grens}</p>}

                  <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
                    {fase === "klaar" ? (
                      <button
                        type="button"
                        onClick={() => setFase("verstuurd")}
                        className="inline-flex min-h-11 items-center gap-2 rounded-full bg-nachtblauw px-5 py-2.5 text-[15px] font-semibold text-creme transition-colors hover:bg-hemel-diep"
                      >
                        Goedkeuren als {taak.rol}
                      </button>
                    ) : (
                      <>
                        <p className="text-[15px] font-semibold text-nachtblauw">Verstuurd door de {taak.rol}</p>
                        <button type="button" onClick={opnieuw} className="min-h-11 text-[15px] text-hemel-diep underline underline-offset-4 hover:text-nachtblauw">
                          Opnieuw
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex h-full min-h-44 flex-col justify-center gap-6">
                  <p className="max-w-[18rem] text-[15px] text-nachtblauw-zacht">
                    {fase === "bezig" ? "Het voorwerk wordt klaargezet." : "Hier verschijnt het voorwerk. Niets gaat weg zonder je akkoord."}
                  </p>
                  <Balkjes className={`max-w-[22rem] transition-opacity duration-500 ${fase === "bezig" ? "opacity-100" : "opacity-60"}`} />
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
