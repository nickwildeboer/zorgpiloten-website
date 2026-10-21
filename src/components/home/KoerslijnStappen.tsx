"use client";

import { useState } from "react";
import { Koerslijn } from "@/components/Koerslijn";

const stappen = [
  {
    titel: "Taakgesprek",
    kort: "Eén taak samen doorrekenen",
    uitleg:
      "In 45 minuten kies je met Hugo en Nick één terugkerende taak en rekenen jullie samen door wat die nu kost. Is de taak te klein om mee te beginnen, dan zeggen we dat ook.",
    opTafel: "Eén doorgerekende taak en een eerlijk advies om wel of niet te starten.",
  },
  {
    titel: "Meelopen en veilig trainen",
    kort: "Op de afdeling, met het team",
    uitleg:
      "We lopen een gewone werkdag mee en leggen vast hoe de taak nu verloopt. Hugo traint het team in veilig en mensgericht werken met AI, en samen spreken jullie af wie het voorwerk nakijkt.",
    opTafel: "Een nulmeting en heldere afspraken over eigenaarschap.",
  },
  {
    titel: "Eén taak werkend bouwen",
    kort: "Testen met twee collega's",
    uitleg:
      "Nick bouwt het voorwerk in jullie eigen omgeving. Twee collega's gebruiken het in hun echte werk en we stellen bij tot het past bij hoe jullie werken.",
    opTafel: "Een werkende opstelling die door je eigen collega's is getest.",
  },
  {
    titel: "Nameting en overdracht",
    kort: "Het verschil zwart op wit",
    uitleg:
      "We meten opnieuw en leggen het verschil naast de nulmeting. Je team krijgt een heldere werkinstructie en beheert de taak daarna zelf.",
    opTafel: "Het gemeten verschil, een werkinstructie en een team dat het zelf kan.",
  },
];

export function KoerslijnStappen() {
  const [actief, setActief] = useState(0);
  const stap = stappen[actief];

  return (
    <div>
      <Koerslijn
        label="Hoe een samenwerking verloopt"
        stappen={stappen.map(({ titel, kort }) => ({ titel, kort }))}
        actief={actief}
        onKies={setActief}
      />

      <div className="mt-8 rounded-kaart border border-lijn bg-wolk p-5 shadow-kaart sm:p-8" aria-live="polite">
        <p className="text-[15px] text-tekst-zacht">
          Stap {actief + 1} van {stappen.length}
        </p>
        <h3 className="mt-1 text-[24px] sm:text-[28px]">{stap.titel}</h3>
        <div className="mt-4 grid gap-6 md:grid-cols-[1.4fr_1fr] md:gap-10">
          <p className="max-w-prose text-tekst-2">{stap.uitleg}</p>
          <div className="rounded-kaart bg-salie p-4">
            <p className="text-[15px] font-medium text-tekst">Wat er aan het eind op tafel ligt</p>
            <p className="mt-1 text-[15px] text-tekst-2">{stap.opTafel}</p>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActief((a) => Math.max(0, a - 1))}
            disabled={actief === 0}
            className="rounded-full border border-lijn-sterk px-4 py-2 text-[15px] text-tekst transition-colors hover:bg-salie disabled:opacity-40 disabled:hover:bg-transparent"
          >
            Vorige stap
          </button>
          <button
            type="button"
            onClick={() => setActief((a) => Math.min(stappen.length - 1, a + 1))}
            disabled={actief === stappen.length - 1}
            className="rounded-full border border-lijn-sterk px-4 py-2 text-[15px] text-tekst transition-colors hover:bg-salie disabled:opacity-40 disabled:hover:bg-transparent"
          >
            Volgende stap
          </button>
        </div>
      </div>
    </div>
  );
}
