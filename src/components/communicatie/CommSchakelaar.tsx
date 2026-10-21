"use client";

import { useState, type ReactNode } from "react";
import { taakgesprekHref } from "@/lib/navigatie";
import { Container, Pill } from "@/components/ui";
import { TaakTabs, paneelId, tabId } from "@/components/hr/TaakTabs";
import { TaakCta } from "@/components/hr/TaakCta";
import { Gegevenslabel } from "@/components/hr/Gegevenslabel";
import { commTaken, type CommSlug } from "./commTaken";
import { B1Brief } from "./B1Brief";
import { CrisisTijdlijn } from "./CrisisTijdlijn";
import { VoorNa } from "./VoorNa";

const ID = "comm-schakelaar";

/**
 * De demo-sectie van de Communicatie-pagina plus de CTA-band, die de gekozen taak meeneemt.
 * Alles wat tussen de demo en de band staat, komt binnen als `tussen` (server components).
 */
export function CommDemo({ tussen }: { tussen?: ReactNode }) {
  const [slug, setSlug] = useState<CommSlug>("patientenfolders-b1");
  const taak = commTaken.find((t) => t.slug === slug) ?? commTaken[0];

  return (
    <>
      <section id="schakelaar" className="scroll-mt-16 bg-wolk py-16 sm:py-24" aria-labelledby="schakelaar-kop">
        <Container>
          <div className="max-w-2xl">
            <h2 id="schakelaar-kop" className="text-[32px] sm:text-[44px]">
              Zet de schakelaar om
            </h2>
            <p className="mt-3 text-lg">Kies een taak en zie wat er klaarligt. De adviseur tekent altijd af.</p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-10">
            <TaakTabs taken={commTaken} actief={slug} onKies={setSlug} label="Kies een communicatietaak" idPrefix={ID} />

            <div
              id={paneelId(ID)}
              role="tabpanel"
              aria-labelledby={tabId(ID, slug)}
              tabIndex={0}
              className="min-w-0 overflow-hidden rounded-paneel border border-lijn bg-creme shadow-kaart"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-lijn bg-wolk px-5 py-3 sm:px-7">
                <h3 className="text-[17px] text-nachtblauw">{taak.titel}</h3>
                <Pill toon="salie">Voorbeeld</Pill>
              </div>

              <div key={taak.slug} className="space-y-6 p-5 sm:p-7">
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
                  <p className="text-nachtblauw">{taak.intro}</p>
                  <Gegevenslabel persoonsgegevens={false} gegevens={taak.gegevens} oordeel={taak.tekentAf} />
                </div>
                {taak.demo === "b1" ? <B1Brief /> : taak.demo === "crisis" ? <CrisisTijdlijn /> : <VoorNa data={taak.demo} />}
              </div>
            </div>
          </div>
        </Container>
      </section>
      {tussen}
      <TaakCta
        taakTitel={taak.titel}
        href={taakgesprekHref("communicatie", taak.slug)}
        foto={{ src: "/fotos/sfeer/zorg-gang-ochtend.jpg", alt: "Een zorggang met grote ramen bij zonsopkomst" }}
      />
    </>
  );
}
