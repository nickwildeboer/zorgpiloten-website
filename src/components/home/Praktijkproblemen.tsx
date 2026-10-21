"use client";

import Link from "next/link";
import { useState } from "react";
import { taakgesprekHref } from "@/lib/navigatie";
import styles from "./home.module.css";

const problemen = [
  {
    situatie: "Copilot staat aan in Microsoft 365, maar op de afdeling gebruikt bijna niemand het.",
    diagnose:
      "Een licentie is nog geen werkwijze. Zolang niet vaststaat voor welke taak de assistent er is en wie zijn werk nakijkt, blijft het een knop die niemand indrukt. Dit is geen IT-vraag maar een verander- en inrichtingsvraag.",
    eersteStap:
      "Kies samen één terugkerende taak waar je team elke week uren in steekt en spreek af wie het voorwerk controleert. Begin daar, niet bij de hele organisatie.",
  },
  {
    situatie: "Medewerkers plakken stiekem teksten in hun eigen ChatGPT, en niemand is eigenaar.",
    diagnose:
      "Je team laat zien dat de behoefte er is. Het gebeurt alleen buiten beeld, zonder afspraken over persoonsgegevens en zonder iemand die meekijkt. Verbieden duwt het verder weg, eigenaarschap haalt het terug.",
    eersteStap:
      "Breng in kaart voor welke taken collega's nu al AI gebruiken. Maak één van die taken veilig en zichtbaar, met een eigenaar en spelregels die iedereen kent.",
  },
  {
    situatie: "Er ligt wel beleid of een visiestuk, maar op maandagochtend verandert er niets in het werk.",
    diagnose:
      "Beleid beschrijft wat mag. Het zegt niet wie de leidinggevende van de assistent is en welke taak hij morgen oppakt. Daar zit het gat tussen papier en werkvloer.",
    eersteStap:
      "Vertaal het beleid naar één taak op één afdeling, met een vaste controle door een medewerker. Dan heb je een werkend voorbeeld dat de rest van de organisatie kan volgen.",
  },
];

export function Praktijkproblemen() {
  const [open, setOpen] = useState<number | null>(null);

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
              className={`flex h-full flex-col justify-between gap-6 rounded-kaart border p-5 text-left transition-colors sm:p-6 lg:order-1 ${
                isOpen ? "border-spar bg-salie" : "border-lijn bg-wolk shadow-kaart hover:border-lijn-sterk"
              }`}
            >
              <span className="text-[19px] font-medium leading-snug text-tekst">{p.situatie}</span>
              <span className="inline-flex items-center gap-2 text-[15px] text-tekst-2">
                <svg className={styles.plus} width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                  <circle cx="9" cy="9" r="8.2" fill="none" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M9 5.5v7M5.5 9h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                {isOpen ? "Sluit de diagnose" : "Bekijk de diagnose en de eerste stap"}
              </span>
            </button>

            <div
              id={paneelId}
              role="region"
              aria-label={`Diagnose bij: ${p.situatie}`}
              hidden={!isOpen}
              className={`${styles.paneel} rounded-kaart bg-salie p-5 sm:p-8 lg:order-2 lg:col-span-3`}
            >
              <div className="grid gap-6 md:grid-cols-2 md:gap-10">
                <div>
                  <h3 className="text-[17px]">Onze diagnose</h3>
                  <p className="mt-2 text-tekst-2">{p.diagnose}</p>
                </div>
                <div>
                  <h3 className="text-[17px]">De eerste stap</h3>
                  <p className="mt-2 text-tekst-2">{p.eersteStap}</p>
                </div>
              </div>
              <Link
                href={taakgesprekHref()}
                className="mt-6 inline-flex text-[15px] font-medium text-tekst underline decoration-lijn-sterk underline-offset-4 hover:decoration-spar"
              >
                Bespreek jullie situatie in een taakgesprek
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
