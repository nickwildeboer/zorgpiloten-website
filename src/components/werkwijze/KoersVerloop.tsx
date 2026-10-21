"use client";

import { useState } from "react";
import { Koerslijn } from "@/components/Koerslijn";

type Stop = {
  titel: string;
  kort: string;
  samenvatting: string;
  hugo: string;
  nick: string;
  tijd: string;
  opTafel: string;
};

const stops: Stop[] = [
  {
    titel: "Taakgesprek en nulmeting",
    kort: "Meekijken op een gewone werkdag",
    samenvatting:
      "We kijken op een gewone werkdag mee, klokken de stappen en leggen vast wat de taak nu kost.",
    hugo: "Voert het gesprek met de leidinggevende en het team. Waar zit de tijd, wie voelt zich eigenaar en wat speelt er rond de verandering.",
    nick: "Loopt de taak stap voor stap mee en brengt in kaart welke systemen, gegevens en koppelingen erbij horen.",
    tijd: "Het taakgesprek van 45 minuten en ongeveer een dagdeel waarin we meekijken. Je team werkt gewoon door.",
    opTafel: "Een nulmeting van de taak en een eerlijk beeld van welk deel als voorwerk klaargezet kan worden.",
  },
  {
    titel: "Veilig inrichten en het team meenemen",
    kort: "Training, eigenaarschap en een veilige omgeving",
    samenvatting:
      "Hugo traint het team in veilig, mensgericht gebruik en bespreekt het eigenaarschap. Nick richt de omgeving veilig in.",
    hugo: "Traint het team in veilig en mensgericht werken met AI en maakt afspraken over eigenaarschap. Wie kijkt mee en wie grijpt in.",
    nick: "Richt de omgeving veilig in, legt vast welke gegevens waar heen gaan en stemt dat af met jullie FG en ICT.",
    tijd: "Een training van ongeveer een dagdeel voor het team en een kort overleg met FG en ICT.",
    opTafel: "Een team dat weet wat wel en niet mag, duidelijke afspraken over eigenaarschap en een omgeving waar FG en ICT van weten.",
  },
  {
    titel: "Het voorwerk bouwen en testen",
    kort: "Scherpstellen met twee collega's",
    samenvatting:
      "Met twee mensen uit het team stellen we het voorwerk scherp tot het echt werk scheelt.",
    hugo: "Begeleidt de twee collega's die meetesten en haalt op wat werkt en wat schuurt in het dagelijkse werk.",
    nick: "Bouwt de workflow en stelt hem na elke testronde bij, tot het voorwerk klopt met hoe jullie werken.",
    tijd: "Twee collega's testen mee in hun gewone werk, met korte terugkoppelmomenten tussendoor.",
    opTafel: "Een werkende workflow, getest op echte taken en scherpgesteld door mensen uit je eigen team.",
  },
  {
    titel: "Nameting en overdracht",
    kort: "Het verschil zwart op wit",
    samenvatting:
      "Het verschil zwart op wit, een heldere werkinstructie en een team dat het zelfstandig beheerst.",
    hugo: "Borgt het eigenaarschap in het team en spreekt af hoe jullie het na de overdracht zelf blijven sturen.",
    nick: "Doet de nameting en legt de werking vast in een werkinstructie en een technische beschrijving voor ICT.",
    tijd: "Een korte nameting en een overdrachtsmoment met het team, samen ongeveer een dagdeel.",
    opTafel: "De nameting naast de nulmeting, een werkinstructie en een team dat het zonder ons beheerst.",
  },
];

export function KoersVerloop() {
  const [actief, setActief] = useState(0);
  const stop = stops[actief];

  return (
    <div>
      <div className="rounded-paneel border border-lijn bg-wolk px-4 py-5 sm:px-8 sm:py-7">
        <Koerslijn
          stappen={stops.map((s) => ({ titel: s.titel, kort: s.kort }))}
          actief={actief}
          onKies={setActief}
          label="De vier stops van een samenwerking"
        />
      </div>

      <p aria-live="polite" className="sr-only">
        Stop {actief + 1} van {stops.length}: {stop.titel}
      </p>
      <div className="mt-6">
        <article className="overflow-hidden rounded-paneel border border-lijn bg-wolk shadow-kaart" aria-labelledby="stop-titel">
          <header className="border-b border-lijn px-5 py-6 sm:px-8">
            <p className="text-[15px] text-tekst-zacht">
              Stop {actief + 1} van {stops.length}
            </p>
            <h3 id="stop-titel" className="mt-1 text-[24px] sm:text-[28px]">
              {stop.titel}
            </h3>
            <p className="mt-2 max-w-2xl text-tekst-2">{stop.samenvatting}</p>
          </header>

          <div className="grid md:grid-cols-2">
            <section className="px-5 py-6 sm:px-8 md:border-r md:border-lijn">
              <h4 className="text-[17px]">Wat Hugo doet</h4>
              <p className="text-sm text-tekst-zacht">Verandering en training</p>
              <p className="mt-3">{stop.hugo}</p>
            </section>
            <section className="border-t border-lijn px-5 py-6 sm:px-8 md:border-t-0">
              <h4 className="text-[17px]">Wat Nick doet</h4>
              <p className="text-sm text-tekst-zacht">Proces en techniek</p>
              <p className="mt-3">{stop.nick}</p>
            </section>
          </div>

          <div className="grid gap-px bg-lijn md:grid-cols-2">
            <section className="bg-salie px-5 py-5 sm:px-8">
              <h4 className="text-[15px]">Wat het van je team vraagt</h4>
              <p className="mt-2 text-[15px]">{stop.tijd}</p>
            </section>
            <section className="bg-salie px-5 py-5 sm:px-8">
              <h4 className="text-[15px]">Wat er aan het eind op tafel ligt</h4>
              <p className="mt-2 text-[15px]">{stop.opTafel}</p>
            </section>
          </div>
        </article>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setActief((a) => Math.max(0, a - 1))}
          disabled={actief === 0}
          className="rounded-full border border-lijn-sterk px-4 py-2 text-[15px] text-tekst hover:bg-salie disabled:opacity-40"
        >
          Vorige stop
        </button>
        <button
          type="button"
          onClick={() => setActief((a) => Math.min(stops.length - 1, a + 1))}
          disabled={actief === stops.length - 1}
          className="rounded-full border border-spar px-4 py-2 text-[15px] font-medium text-tekst hover:bg-salie disabled:opacity-40"
        >
          Volgende stop
        </button>
      </div>
    </div>
  );
}
