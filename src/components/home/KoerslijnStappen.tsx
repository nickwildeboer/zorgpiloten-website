"use client";

import Image from "next/image";
import { useState } from "react";
import { Koerslijn } from "@/components/Koerslijn";
import styles from "./home.module.css";

const stappen = [
  {
    titel: "Taakgesprek",
    kort: "Eén taak doorrekenen",
    uitleg: "In 45 minuten kiest u met Hugo en Nick één taak en rekent die door. Is hij te klein, dan zeggen wij dat.",
    opTafel: "Een doorgerekende taak en een eerlijk advies.",
    foto: { src: "/fotos/nick-workshop-locatie-1.jpg", alt: "Een team in overleg aan tafel tijdens een workshop van Nick", positie: "45% 55%" },
  },
  {
    titel: "Meelopen en trainen",
    kort: "Op de afdeling, met het team",
    uitleg: "Wij lopen een werkdag mee en Hugo traint het team in veilig werken met AI.",
    opTafel: "Een nulmeting en afspraken over eigenaarschap.",
    foto: { src: "/fotos/nick-workshop-locatie-2.jpg", alt: "Nick geeft een training aan een team", positie: "50% 35%" },
  },
  {
    titel: "Eén taak bouwen",
    kort: "Getest door twee collega's",
    uitleg: "Nick bouwt het voorwerk in uw eigen omgeving. Twee collega's testen het in hun echte werk.",
    opTafel: "Een werkende opstelling die past bij uw team.",
    foto: { src: "/fotos/sfeer/overleg-whiteboard.jpg", alt: "Collega's zetten werkstappen op een whiteboard", positie: "50% 40%" },
  },
  {
    titel: "Nameting en overdracht",
    kort: "Het verschil zwart op wit",
    uitleg: "Wij meten opnieuw. Daarna beheert uw team de taak zelf.",
    opTafel: "Het gemeten verschil en een werkinstructie.",
    foto: { src: "/fotos/sfeer/zorg-gang-ochtend.jpg", alt: "Een zorggang in ochtendlicht", positie: "30% 50%" },
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

      <div className="mt-8 grid overflow-hidden rounded-paneel border border-lijn bg-creme md:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]">
        <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[340px]">
          <Image
            key={stap.foto.src}
            src={stap.foto.src}
            alt={stap.foto.alt}
            fill
            sizes="(min-width: 768px) 620px, 100vw"
            className={`${styles.stapFoto} object-cover`}
            style={{ objectPosition: stap.foto.positie }}
          />
        </div>

        <div className="flex flex-col p-5 sm:p-8" aria-live="polite">
          <p className="zp-eyebrow">
            Stap {actief + 1} van {stappen.length}
          </p>
          <h3 className="mt-2 text-[26px] sm:text-[30px]">{stap.titel}</h3>
          <p className="mt-3 text-[17px]">{stap.uitleg}</p>
          <div className="mt-5 flex gap-3 rounded-kaart bg-hemel-zacht p-4">
            <span aria-hidden="true" className="mt-1.5 h-3 w-3 flex-none rounded-full bg-zandgeel" />
            <p className="text-[15px] text-nachtblauw">
              <span className="font-semibold">Op tafel: </span>
              {stap.opTafel}
            </p>
          </div>
          <div className="mt-auto flex flex-wrap gap-2 pt-6">
            <button
              type="button"
              onClick={() => setActief((a) => Math.max(0, a - 1))}
              disabled={actief === 0}
              className="min-h-11 rounded-full border-2 border-nachtblauw px-4 py-2 text-[15px] font-semibold text-nachtblauw transition-colors hover:bg-hemel-zacht disabled:border-lijn disabled:text-nachtblauw-zacht disabled:hover:bg-transparent"
            >
              Vorige stap
            </button>
            <button
              type="button"
              onClick={() => setActief((a) => Math.min(stappen.length - 1, a + 1))}
              disabled={actief === stappen.length - 1}
              className="min-h-11 rounded-full border-2 border-nachtblauw px-4 py-2 text-[15px] font-semibold text-nachtblauw transition-colors hover:bg-hemel-zacht disabled:border-lijn disabled:text-nachtblauw-zacht disabled:hover:bg-transparent"
            >
              Volgende stap
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
