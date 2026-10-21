"use client";

import { useState, type ReactNode } from "react";
import { Koerslijn } from "@/components/Koerslijn";
import { Icoon } from "@/components/over-ons/Iconen";

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
    kort: "Meekijken op een werkdag",
    samenvatting: "We kijken een gewone werkdag mee en leggen vast wat de taak nu kost.",
    hugo: "Spreekt leidinggevende en team over tijd, eigenaarschap en verandering.",
    nick: "Loopt de taak mee en brengt systemen en gegevens in kaart.",
    tijd: "Het gesprek van 45 minuten en een dagdeel meekijken.",
    opTafel: "Een nulmeting en welk deel voorwerk kan worden.",
  },
  {
    titel: "Veilig inrichten en het team meenemen",
    kort: "Training en eigenaarschap",
    samenvatting: "Het team leert veilig werken. De omgeving wordt veilig ingericht.",
    hugo: "Traint het team in veilig, mensgericht AI-gebruik en legt eigenaarschap vast.",
    nick: "Richt de omgeving veilig in en stemt de gegevensstroom af met FG en ICT.",
    tijd: "Een training van een dagdeel en kort overleg met FG en ICT.",
    opTafel: "Een team dat weet wat mag, in een omgeving die FG en ICT kennen.",
  },
  {
    titel: "Het voorwerk bouwen en testen",
    kort: "Scherpstellen met twee collega's",
    samenvatting: "Twee collega's testen mee tot het voorwerk echt werk scheelt.",
    hugo: "Begeleidt de testers en haalt op wat werkt en wat schuurt.",
    nick: "Bouwt de workflow en stelt hem na elke testronde bij.",
    tijd: "Twee collega's testen mee in hun gewone werk.",
    opTafel: "Een werkende workflow, getest op echte taken.",
  },
  {
    titel: "Nameting en overdracht",
    kort: "Het verschil zwart op wit",
    samenvatting: "De nameting naast de nulmeting, en een team dat het zelf beheerst.",
    hugo: "Borgt het eigenaarschap en spreekt af hoe u zelf blijft sturen.",
    nick: "Doet de nameting en schrijft de werkinstructie en de technische beschrijving.",
    tijd: "Nameting en overdracht, samen ongeveer een dagdeel.",
    opTafel: "Een werkinstructie en een team dat het zonder ons kan.",
  },
];

export function KoersVerloop({
  portretten,
  fotos,
}: {
  portretten: { hugo: ReactNode; nick: ReactNode };
  /** Foto's uit een server component: Hugo bij een training, Nick aan het bouwen. */
  fotos?: { hugo: ReactNode; nick: ReactNode };
}) {
  const [actief, setActief] = useState(0);
  const stop = stops[actief];

  const rollen = [
    { wie: "Hugo", rol: "Team en verandering", tekst: stop.hugo, portret: portretten.hugo, foto: fotos?.hugo },
    { wie: "Nick", rol: "Proces en techniek", tekst: stop.nick, portret: portretten.nick, foto: fotos?.nick },
  ];

  return (
    <div>
      <div className="rounded-[var(--radius-lg)] border border-lijn bg-wolk px-4 py-5 sm:px-8 sm:py-7">
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

      <article className="mt-6 overflow-hidden rounded-[var(--radius-lg)] border border-lijn bg-wolk shadow-kaart" aria-labelledby="stop-titel">
        <header className="flex items-start gap-5 px-5 py-6 sm:px-8 sm:py-7">
          <span
            aria-hidden="true"
            className="grid h-14 w-14 flex-none place-items-center rounded-full bg-zandgeel font-display text-[26px] font-bold text-nachtblauw"
          >
            {actief + 1}
          </span>
          <div className="min-w-0">
            <p className="text-sm">
              Stop {actief + 1} van {stops.length}
            </p>
            <h3 id="stop-titel" className="mt-0.5 text-[24px] sm:text-[28px]">
              {stop.titel}
            </h3>
            <p className="mt-2 max-w-xl text-nachtblauw">{stop.samenvatting}</p>
          </div>
        </header>

        <div className="grid border-t border-lijn md:grid-cols-2">
          {rollen.map((r, i) => (
            <section key={r.wie} className={`px-5 py-6 sm:px-8 ${i === 1 ? "border-t border-lijn md:border-l md:border-t-0" : ""}`}>
              {r.foto && <div className="mb-5">{r.foto}</div>}
              <div className="flex gap-4">
                {r.portret}
                <div className="min-w-0">
                  <h4 className="text-[18px]">Wat {r.wie} doet</h4>
                  <p className="text-sm">{r.rol}</p>
                  <p className="mt-2 text-nachtblauw">{r.tekst}</p>
                </div>
              </div>
            </section>
          ))}
        </div>

        <dl className="grid gap-px bg-lijn md:grid-cols-2">
          <div className="flex gap-3 bg-hemel-zacht px-5 py-4 sm:px-8">
            <Icoon naam="klok" className="mt-0.5 h-5 w-5 text-hemel-diep" />
            <div>
              <dt className="text-sm font-semibold text-nachtblauw">Van uw team</dt>
              <dd className="text-[15px] text-nachtblauw">{stop.tijd}</dd>
            </div>
          </div>
          <div className="flex gap-3 bg-hemel-zacht px-5 py-4 sm:px-8">
            <Icoon naam="vink" className="mt-0.5 h-5 w-5 text-hemel-diep" />
            <div>
              <dt className="text-sm font-semibold text-nachtblauw">Op tafel</dt>
              <dd className="text-[15px] text-nachtblauw">{stop.opTafel}</dd>
            </div>
          </div>
        </dl>
      </article>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setActief((a) => Math.max(0, a - 1))}
          disabled={actief === 0}
          className="min-h-[44px] rounded-full border border-lijn-sterk px-5 py-2 text-[15px] text-nachtblauw hover:bg-hemel-zacht disabled:opacity-40"
        >
          Vorige stop
        </button>
        <button
          type="button"
          onClick={() => setActief((a) => Math.min(stops.length - 1, a + 1))}
          disabled={actief === stops.length - 1}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-full border-2 border-nachtblauw px-5 py-2 text-[15px] font-semibold text-nachtblauw hover:bg-hemel-zacht disabled:opacity-40"
        >
          Volgende stop
          <Icoon naam="pijl" className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
