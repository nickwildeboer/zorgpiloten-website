"use client";

import { useState } from "react";
import { Icoon } from "@/components/home/Iconen";
import { MetPlekken } from "@/components/hr/MetPlekken";
import { Wissel } from "./Wissel";

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

/** Voor-en-na-demo: wat er binnenkomt tegenover wat er klaarligt. */
export function VoorNa({ data }: { data: VoorNaData }) {
  const [kant, setKant] = useState<Kant>("voor");

  return (
    <div>
      <Wissel
        label="Voor of na het voorwerk"
        opties={[
          { waarde: "voor", label: "Wat binnenkomt" },
          { waarde: "na", label: "Wat klaarligt" },
        ]}
        waarde={kant}
        onChange={setKant}
      />

      <div key={kant} className="mt-6 min-h-64 transition-[opacity,translate] duration-300 ease-out starting:translate-y-1 starting:opacity-0 motion-reduce:transition-none">
        {kant === "voor" ? (
          <ul className="max-w-xl space-y-3">
            {data.voor.map((b) => (
              <li key={b.label} className="rounded-[var(--radius-md)] rounded-tl-sm bg-creme px-4 py-3">
                <p className="text-[14px] text-nachtblauw-zacht">{b.label}</p>
                <p className="mt-1 text-[15px] text-nachtblauw">
                  <MetPlekken tekst={b.tekst} />
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
            <div>
              <p className="font-display text-[19px] font-semibold text-nachtblauw">{data.naTitel}</p>
              <div className="mt-2 divide-y divide-lijn-koel border-t border-lijn-koel">
                {data.na.map((b) => (
                  <div key={b.label} className="py-3">
                    <p className="font-semibold text-nachtblauw">
                      <MetPlekken tekst={b.label} />
                    </p>
                    <p className="mt-1 text-[15px]">
                      <MetPlekken tekst={b.tekst} />
                    </p>
                  </div>
                ))}
              </div>
            </div>
            {data.signaal && (
              <div className="self-start rounded-[var(--radius-md)] bg-hemel-zacht p-5">
                <p className="font-semibold text-nachtblauw">{data.signaal.titel}</p>
                <ul className="mt-2 space-y-1.5 text-[15px] text-nachtblauw">
                  {data.signaal.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      <p className="mt-6 flex items-start gap-2.5 border-t border-lijn-koel pt-5 text-[15px]">
        <Icoon naam="vink" grootte={20} className="text-hemel-diep" />
        <span className="text-nachtblauw">{data.controle}</span>
      </p>

      <p className="sr-only" aria-live="polite">
        {kant === "na" ? `Je ziet nu wat klaarligt: ${data.naTitel}.` : "Je ziet nu wat er binnenkomt."}
      </p>
    </div>
  );
}
