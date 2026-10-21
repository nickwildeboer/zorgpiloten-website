"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { taakgesprekHref } from "@/lib/navigatie";
import styles from "./home.module.css";

/* Iconen in Lucide-stijl: outline, 1.75px lijn, afgeronde uiteinden. */
const icoonProps = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const iconen: Record<string, ReactNode> = {
  schakelaar: (
    <svg {...icoonProps}>
      <rect width="20" height="12" x="2" y="6" rx="6" />
      <circle cx="16" cy="12" r="2" />
    </svg>
  ),
  klembord: (
    <svg {...icoonProps}>
      <rect width="8" height="4" x="8" y="2" rx="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="M9 14h6M9 18h4" />
    </svg>
  ),
  beleid: (
    <svg {...icoonProps}>
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M16 13H8M16 17H8M10 9H8" />
    </svg>
  ),
};

const problemen = [
  {
    icoon: "schakelaar",
    situatie: "Copilot staat aan, maar bijna niemand gebruikt het.",
    diagnose: "Een licentie is nog geen werkwijze.",
    eersteStap: "Kies één taak en spreek af wie het voorwerk nakijkt.",
  },
  {
    icoon: "klembord",
    situatie: "Collega's plakken teksten in hun eigen ChatGPT.",
    diagnose: "De behoefte is er, alleen buiten beeld en zonder afspraken.",
    eersteStap: "Maak één van die taken veilig en zichtbaar, met een eigenaar.",
  },
  {
    icoon: "beleid",
    situatie: "Het AI-beleid ligt er, maar het werk verandert niet.",
    diagnose: "Beleid zegt wat mag, niet welke taak morgen anders gaat.",
    eersteStap: "Vertaal het beleid naar één taak op één afdeling.",
  },
];

export function Praktijkproblemen() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="grid gap-3 lg:grid-cols-3 lg:gap-4">
      {problemen.map((p, i) => {
        const isOpen = open === i;
        const paneelId = `probleem-paneel-${i}`;
        return (
          <div key={p.situatie} className="contents">
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={paneelId}
              onClick={() => setOpen(isOpen ? null : i)}
              className={`${styles.probleem} flex h-full items-start gap-4 rounded-kaart border p-5 text-left lg:order-1 lg:flex-col lg:p-6`}
            >
              <span className={styles.probleemIcoon}>{iconen[p.icoon]}</span>
              <span className="flex-1 text-[18px] font-semibold leading-snug text-nachtblauw">{p.situatie}</span>
              <svg className={`${styles.plus} mt-1 flex-none lg:hidden`} width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M10 5v10M5 10h10" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
              </svg>
              <span className="sr-only">{isOpen ? "Sluit de diagnose" : "Toon de diagnose"}</span>
            </button>

            <div
              id={paneelId}
              role="region"
              aria-label={`Diagnose bij: ${p.situatie}`}
              hidden={!isOpen}
              className={`${styles.paneel} rounded-paneel bg-creme p-5 sm:p-7 lg:order-2 lg:col-span-3`}
            >
              <div className={styles.diagnoseRij}>
                <div>
                  <p className="zp-eyebrow">Diagnose</p>
                  <p className="mt-2 text-[18px] text-nachtblauw">{p.diagnose}</p>
                </div>
                <span className={styles.diagnoseRoute} aria-hidden="true" />
                <div>
                  <p className="zp-eyebrow">Eerste stap</p>
                  <p className="mt-2 text-[18px] text-nachtblauw">{p.eersteStap}</p>
                </div>
              </div>
              <Link
                href={taakgesprekHref()}
                className="mt-5 inline-flex text-[15px] font-medium text-hemel-diep underline underline-offset-4 hover:text-nachtblauw"
              >
                Bespreek uw situatie in een taakgesprek
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
