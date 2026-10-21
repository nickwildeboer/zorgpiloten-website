"use client";

import { useState } from "react";
import { Schakelaar } from "@/components/ui";
import { MetPlekken } from "@/components/hr/MetPlekken";

export type Blok = { label: string; tekst: string };

export type VoorNaData = {
  voor: Blok[];
  naTitel: string;
  na: Blok[];
  /** Optioneel signaal dat het voorwerk meegeeft, zoals pagina's die nog verouderd zijn. */
  signaal?: { titel: string; items: string[] };
  controle: string;
};

type Kant = "voor" | "na";

/** Compacte voor-en-na-demo: wat er binnenkomt tegenover wat er klaarligt. */
export function VoorNa({ data }: { data: VoorNaData }) {
  const [kant, setKant] = useState<Kant>("voor");

  return (
    <div>
      <Schakelaar
        label="Voor of na het voorwerk"
        opties={[
          { waarde: "voor", label: "Wat er binnenkomt" },
          { waarde: "na", label: "Wat klaarligt" },
        ]}
        waarde={kant}
        onChange={setKant}
      />

      <div key={kant} className="mt-5 transition duration-300 starting:translate-y-1 starting:opacity-0">
        {kant === "voor" ? (
          <ul className="grid gap-3 md:grid-cols-2">
            {data.voor.map((b, i) => (
              <li
                key={b.label}
                className={`rounded-kaart border border-dashed border-lijn-sterk bg-creme p-4 ${i === data.voor.length - 1 && data.voor.length % 2 === 1 ? "md:col-span-2 md:max-w-[calc(50%-0.375rem)]" : ""}`}
              >
                <p className="text-sm text-nachtblauw-zacht">{b.label}</p>
                <p className="mt-1 text-[15px] text-nachtblauw">
                  <MetPlekken tekst={b.tekst} />
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
            <div className="rounded-kaart border border-lijn-sterk bg-wolk p-5 shadow-kaart">
              <p className="font-medium text-nachtblauw">{data.naTitel}</p>
              <div className="mt-3 divide-y divide-lijn">
                {data.na.map((b) => (
                  <div key={b.label} className="py-3 first:pt-0 last:pb-0">
                    <p className="font-medium text-nachtblauw">{b.label}</p>
                    <p className="mt-1 text-[15px]">
                      <MetPlekken tekst={b.tekst} />
                    </p>
                  </div>
                ))}
              </div>
            </div>
            {data.signaal && (
              <div className="self-start rounded-kaart bg-hemel-zacht p-5">
                <p className="font-medium text-nachtblauw">{data.signaal.titel}</p>
                <ul className="mt-2 space-y-1.5 text-[15px]">
                  {data.signaal.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span aria-hidden="true" className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-hemel-diep" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      <p className="mt-5 text-[15px]">
        <span className="font-medium text-nachtblauw">Controle door de adviseur: </span>
        {data.controle}
      </p>

      <p className="sr-only" aria-live="polite">
        {kant === "na" ? `Je ziet nu wat klaarligt: ${data.naTitel}.` : "Je ziet nu wat er binnenkomt."}
      </p>
    </div>
  );
}
