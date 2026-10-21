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

/** Losse briefjes schuin op een stapel, zoals ze binnenkomen. */
const kanteling = ["-rotate-[1.5deg]", "rotate-[1deg] sm:translate-x-6", "-rotate-[0.5deg] sm:translate-x-2"];

/** Voor-en-na-demo: wat er binnenkomt tegenover wat er klaarligt. */
export function VoorNa({ data }: { data: VoorNaData }) {
  const [kant, setKant] = useState<Kant>("voor");

  return (
    <div>
      <Schakelaar
        label="Voor of na het voorwerk"
        opties={[
          { waarde: "voor", label: "Wat binnenkomt" },
          { waarde: "na", label: "Wat klaarligt" },
        ]}
        waarde={kant}
        onChange={setKant}
      />

      <div key={kant} className="mt-6 min-h-64 transition duration-300 ease-out starting:translate-y-1 starting:opacity-0">
        {kant === "voor" ? (
          <ul className="max-w-xl space-y-3">
            {data.voor.map((b, i) => (
              <li key={b.label} className={`rounded-kaart border border-lijn bg-wolk p-4 shadow-kaart ${kanteling[i % kanteling.length]}`}>
                <p className="text-sm text-nachtblauw-zacht">{b.label}</p>
                <p className="mt-1 text-[15px] text-nachtblauw">
                  <MetPlekken tekst={b.tekst} />
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
            <div className="rounded-kaart border border-lijn bg-wolk p-5 shadow-kaart">
              <p className="font-display text-[19px] font-bold tracking-[-0.01em] text-nachtblauw">{data.naTitel}</p>
              <div className="mt-3 divide-y divide-lijn">
                {data.na.map((b) => (
                  <div key={b.label} className="py-3 last:pb-0">
                    <p className="font-medium text-nachtblauw">
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
              <div className="self-start rounded-kaart bg-hemel-zacht p-5">
                <p className="font-medium text-nachtblauw">{data.signaal.titel}</p>
                <ul className="mt-2 space-y-1.5 text-[15px] text-nachtblauw">
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

      <p className="mt-6 flex items-start gap-2 text-[15px]">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="var(--hemel-diep)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="mt-0.5 shrink-0">
          <rect x="2.5" y="2.5" width="13" height="13" rx="3" />
          <path d="m5.8 9.2 2.2 2.2 4.4-4.6" />
        </svg>
        <span className="text-nachtblauw">{data.controle}</span>
      </p>

      <p className="sr-only" aria-live="polite">
        {kant === "na" ? `U ziet nu wat klaarligt: ${data.naTitel}.` : "U ziet nu wat er binnenkomt."}
      </p>
    </div>
  );
}
