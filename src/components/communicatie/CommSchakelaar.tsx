"use client";

import { useState } from "react";
import { taakgesprekHref } from "@/lib/navigatie";
import { Pill } from "@/components/ui";
import { TaakTabs, paneelId, tabId } from "@/components/hr/TaakTabs";
import { TaakCta } from "@/components/hr/TaakCta";
import { commTaken, type CommSlug } from "./commTaken";
import { B1Brief } from "./B1Brief";
import { CrisisTijdlijn } from "./CrisisTijdlijn";
import { VoorNa } from "./VoorNa";

const ID = "comm-schakelaar";

export function CommSchakelaar() {
  const [slug, setSlug] = useState<CommSlug>("patientenfolders-b1");
  const taak = commTaken.find((t) => t.slug === slug) ?? commTaken[0];

  return (
    <div>
      <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-8">
        <TaakTabs taken={commTaken} actief={slug} onKies={setSlug} label="Kies een communicatietaak" idPrefix={ID} />

        <div
          id={paneelId(ID)}
          role="tabpanel"
          aria-labelledby={tabId(ID, slug)}
          tabIndex={0}
          className="min-w-0 rounded-paneel border border-lijn bg-wolk shadow-kaart"
        >
          <div className="border-b border-lijn px-5 py-5 sm:px-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <h3 className="text-[22px] sm:text-[26px]">{taak.titel}</h3>
              <Pill toon="salie">Voorbeeld</Pill>
            </div>
            <p className="mt-2 max-w-[42rem]">{taak.intro}</p>
            <div className="mt-4 flex flex-col gap-1 text-[15px] sm:flex-row sm:flex-wrap sm:gap-x-8">
              <p>
                <span className="font-medium text-nachtblauw">Tekent af: </span>
                {taak.tekentAf}
              </p>
              <p>
                <span className="font-medium text-nachtblauw">Gegevens: </span>
                {taak.gegevens}
              </p>
            </div>
          </div>

          <div key={taak.slug} className="p-5 sm:p-6">
            {taak.demo === "b1" ? <B1Brief /> : taak.demo === "crisis" ? <CrisisTijdlijn /> : <VoorNa data={taak.demo} />}
          </div>
        </div>
      </div>

      <TaakCta taakTitel={taak.titel} href={taakgesprekHref("communicatie", taak.slug)} />
    </div>
  );
}
