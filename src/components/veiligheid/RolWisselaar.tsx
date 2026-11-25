"use client";

import { useState } from "react";
import { VeiligIcoon, type VeiligIcoonNaam } from "./Iconen";

type Rol = "afdeling" | "bestuur" | "fg" | "ict";
type Vraag = { vraag: string; antwoord: string };

const rollen: { waarde: Rol; label: string; icoon: VeiligIcoonNaam; zorg: string; vragen: Vraag[] }[] = [
  {
    waarde: "afdeling",
    label: "Hoofd HR of Communicatie",
    icoon: "team",
    zorg: "Tijd terug, zonder risico voor gegevens of kwaliteit.",
    vragen: [
      {
        vraag: "Mag mijn team er nu al mee werken?",
        antwoord: "Ja, met spelregels. Bij voorkeur eerst een taak zonder persoonsgegevens.",
      },
      {
        vraag: "Wie is verantwoordelijk als het voorwerk niet klopt?",
        antwoord: "De medewerker die aftekent. Niets gaat ongecontroleerd de deur uit.",
      },
      {
        vraag: "Collega's gebruiken al hun eigen ChatGPT. Wat nu?",
        antwoord: "De training maakt duidelijk wat mag. Daarna bouwen we een route in jullie eigen omgeving.",
      },
      {
        vraag: "Hoeveel tijd kost het mijn team?",
        antwoord: "Het meeste gebeurt tijdens het gewone werk. Zie de stops op Hoe wij werken.",
      },
    ],
  },
  {
    waarde: "bestuur",
    label: "Bestuur of MT",
    icoon: "bestuur",
    zorg: "Wie beslist, wie houdt toezicht, wat levert het op.",
    vragen: [
      {
        vraag: "Wie beslist over de inzet van AI?",
        antwoord: "Jij. Het MT stelt kaders, de medewerker beslist per taak. Wij adviseren en bouwen.",
      },
      {
        vraag: "Wie houdt toezicht?",
        antwoord: "Intern jullie FG, en per workflow een vaste eigenaar. Extern onder meer de Autoriteit Persoonsgegevens voor de AVG.",
      },
      {
        vraag: "Wat vraagt de AI-verordening van ons?",
        antwoord: "Artikel 4 vraagt AI-geletterdheid te ondersteunen. Doe hieronder de check.",
      },
      {
        vraag: "Hoe voorkomen we een traject dat blijft hangen?",
        antwoord: "Klein beginnen: één taak, een nul- en een nameting.",
      },
    ],
  },
  {
    waarde: "fg",
    label: "FG",
    icoon: "schild",
    zorg: "Vooraf weten welke gegevens waar heen gaan.",
    vragen: [
      {
        vraag: "Welke gegevens gaan waar heen?",
        antwoord: "Per workflow krijg je de datastroom op papier, voordat we bouwen.",
      },
      {
        vraag: "Is er een verwerkersovereenkomst nodig?",
        antwoord: "Dat beoordeel je. Wij leveren de informatie, ook voor een DPIA.",
      },
      {
        vraag: "Gaan er persoonsgegevens naar een AI-dienst?",
        antwoord: "Bij voorkeur niet. Zitten ze erin, dan bouwen we pas na je akkoord.",
      },
      {
        vraag: "Garandeer je dat het aan de AVG voldoet?",
        antwoord: "Nee. Wij maken de opzet transparant, jij of jullie jurist oordeelt.",
      },
    ],
  },
  {
    waarde: "ict",
    label: "ICT en informatiebeveiliging",
    icoon: "server",
    zorg: "Geen schaduw-IT, wel een opstelling die je zelf beheert.",
    vragen: [
      {
        vraag: "Waar draait het?",
        antwoord: "Waar het kan in jullie eigen omgeving. Een externe dienst staat vooraf beschreven.",
      },
      {
        vraag: "Wie heeft toegang?",
        antwoord: "Alleen afgesproken accounts, met minimale rechten.",
      },
      {
        vraag: "Hoe zetten we het stil?",
        antwoord: "Op een vaste manier, vooraf samen getest.",
      },
      {
        vraag: "Wat blijft er achter na de overdracht?",
        antwoord: "Workflow, werkinstructie en technische beschrijving. Je bent eigenaar.",
      },
    ],
  },
];

export function RolWisselaar() {
  const [rol, setRol] = useState<Rol>("afdeling");
  const huidig = rollen.find((r) => r.waarde === rol) ?? rollen[0];

  return (
    <div>
      <fieldset>
        <legend className="mb-4 text-[15px] text-nachtblauw">Kies je rol</legend>
        <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 lg:grid-cols-4 [&>*]:min-w-0">
          {rollen.map((r) => {
            const actief = r.waarde === rol;
            return (
              <label
                key={r.waarde}
                className={`flex min-h-[60px] cursor-pointer items-center gap-3 rounded-kaart border px-4 py-3 text-[15px] leading-snug transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-hemel-diep ${
                  actief ? "border-nachtblauw bg-nachtblauw font-semibold text-creme" : "border-lijn-koel bg-wolk text-nachtblauw hover:border-nachtblauw/40"
                }`}
              >
                <input type="radio" name="rol" value={r.waarde} checked={actief} onChange={() => setRol(r.waarde)} className="sr-only" />
                <VeiligIcoon naam={r.icoon} grootte={20} className={actief ? "" : "text-hemel-diep"} />
                {r.label}
              </label>
            );
          })}
        </div>
      </fieldset>

      <p aria-live="polite" className="sr-only">
        Vragen en antwoorden voor {huidig.label}
      </p>

      <div
        key={huidig.waarde}
        className="mt-10 grid gap-x-12 gap-y-8 border-t border-lijn-koel pt-10 starting:opacity-0 motion-safe:transition-opacity motion-safe:duration-300 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]"
      >
        <div>
          <VeiligIcoon naam={huidig.icoon} grootte={32} className="text-nachtblauw" />
          <h3 className="mt-5 text-[26px] leading-[1.15] sm:text-[30px]">{huidig.label}</h3>
          <p className="mt-3 max-w-[28ch] text-[18px] leading-[1.5] text-nachtblauw">{huidig.zorg}</p>
        </div>
        <dl className="grid gap-x-10 sm:grid-cols-2">
          {huidig.vragen.map((v) => (
            <div key={v.vraag} className="border-t border-lijn-koel py-5 first:border-t-0 first:pt-0 sm:[&:nth-child(2)]:border-t-0 sm:[&:nth-child(2)]:pt-0">
              <dt className="font-semibold leading-snug text-nachtblauw">{v.vraag}</dt>
              <dd className="mt-2 text-[16px] leading-relaxed">{v.antwoord}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
