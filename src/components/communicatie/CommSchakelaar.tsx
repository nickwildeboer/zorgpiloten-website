"use client";

import { useState, type ReactNode } from "react";
import { kennismakingHref, metMinuten } from "@/lib/navigatie";
import { Container } from "@/components/ui";
import { Icoon } from "@/components/home/Iconen";
import { communicatiePagina } from "@/content/paginas";
import { TaakTabs, paneelId, tabId } from "@/components/hr/TaakTabs";
import { TakenRij } from "@/components/hr/TakenRij";
import { TaakCta } from "@/components/hr/TaakCta";
import { Gegevenslabel } from "@/components/hr/Gegevenslabel";
import type { TaakIcoonNaam } from "@/components/hr/TaakIconen";
import { commTaken, type CommSlug } from "./commTaken";
import { B1Brief } from "./B1Brief";
import { CrisisTijdlijn } from "./CrisisTijdlijn";
import { VoorNa } from "./VoorNa";

const ID = "comm-schakelaar";
const iconen: TaakIcoonNaam[] = ["document", "krant", "megafoon", "wereld", "sirene"];

/**
 * Taken, demo en slotband van de Communicatie-pagina. Ze delen de gekozen taak:
 * een taak in de rij kiest hem in de demo, de slotband neemt hem mee naar de kennismaking.
 * Alles tussen demo en band komt binnen als `tussen`, de portretten als `portretten` (server components).
 */
export function CommDemo({ tussen, portretten }: { tussen?: ReactNode; portretten?: ReactNode }) {
  const [slug, setSlug] = useState<CommSlug>("patientenfolders-b1");
  const taak = commTaken.find((t) => t.slug === slug) ?? commTaken[0];
  const { taken, demo, cta } = communicatiePagina;

  return (
    <>
      <TakenRij taken={taken} iconen={iconen} label="Communicatietaken" onKies={(i) => setSlug(commTaken[i].slug)} />

      <section id="demo" className="scroll-mt-16 bg-creme py-20 sm:py-28" aria-labelledby="demo-kop">
        <Container>
          <div className="max-w-2xl">
            <h2 id="demo-kop" className="text-[32px] leading-[1.1] sm:text-[42px]">
              {demo.kop}
            </h2>
            <p className="mt-5 text-[18px] leading-[1.6] text-nachtblauw">{demo.zin}</p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-8">
            <TaakTabs taken={commTaken} actief={slug} onKies={setSlug} label="Kies een communicatietaak" idPrefix={ID} />

            <div
              id={paneelId(ID)}
              role="tabpanel"
              aria-labelledby={tabId(ID, slug)}
              tabIndex={0}
              className="min-w-0 rounded-[var(--radius-md)] bg-wolk shadow-kaart"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-lijn-koel px-5 py-4 sm:px-7">
                <h3 className="inline-flex items-center gap-3 text-[19px] text-nachtblauw">
                  <Icoon naam="document" grootte={20} />
                  {taak.titel}
                </h3>
                <span className="rounded-full bg-creme px-3 py-1 text-[14px] font-semibold text-nachtblauw">Voorbeeld</span>
              </div>

              <div key={taak.slug} className="space-y-7 p-5 sm:p-7">
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
                  {taak.intro && <p className="text-nachtblauw">{taak.intro}</p>}
                  <Gegevenslabel persoonsgegevens={false} gegevens={taak.gegevens} oordeel={taak.tekentAf} />
                </div>
                {taak.demo === "b1" ? <B1Brief /> : taak.demo === "crisis" ? <CrisisTijdlijn /> : <VoorNa data={taak.demo} />}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {tussen}

      <TaakCta kop={cta.kop} tekst={metMinuten(cta.tekst)} taakTitel={taak.titel} href={kennismakingHref("communicatie", taak.slug)}>
        {portretten}
      </TaakCta>
    </>
  );
}
