"use client";

import { useState } from "react";
import { Icoon, type IcoonNaam } from "@/components/over-ons/Iconen";

type Rol = "afdeling" | "bestuur" | "fg" | "ict";
type Vraag = { vraag: string; antwoord: string };

const rollen: { waarde: Rol; label: string; icoon: IcoonNaam; zorg: string; vragen: Vraag[] }[] = [
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
        antwoord: "De training maakt duidelijk wat mag. Daarna bouwen we een route in uw eigen omgeving.",
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
        antwoord: "U. Het MT stelt kaders, de medewerker beslist per taak. Wij adviseren en bouwen.",
      },
      {
        vraag: "Wie houdt toezicht?",
        antwoord: "Intern uw FG, en per workflow een vaste eigenaar. Extern onder meer de Autoriteit Persoonsgegevens voor de AVG.",
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
        antwoord: "Per workflow krijgt u de datastroom op papier, voordat we bouwen.",
      },
      {
        vraag: "Is er een verwerkersovereenkomst nodig?",
        antwoord: "Dat beoordeelt u. Wij leveren de informatie, ook voor een DPIA.",
      },
      {
        vraag: "Gaan er persoonsgegevens naar een AI-dienst?",
        antwoord: "Bij voorkeur niet. Zitten ze erin, dan bouwen we pas na uw akkoord.",
      },
      {
        vraag: "Garandeert u dat het aan de AVG voldoet?",
        antwoord: "Nee. Wij maken de opzet transparant, u of uw jurist oordeelt.",
      },
    ],
  },
  {
    waarde: "ict",
    label: "ICT en informatiebeveiliging",
    icoon: "server",
    zorg: "Geen schaduw-IT, wel een opstelling die u zelf beheert.",
    vragen: [
      {
        vraag: "Waar draait het?",
        antwoord: "Waar het kan in uw eigen omgeving. Een externe dienst staat vooraf beschreven.",
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
        antwoord: "Workflow, werkinstructie en technische beschrijving. U bent eigenaar.",
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
        <legend className="mb-3 text-[15px] font-semibold text-nachtblauw">Kijk mee door de bril van</legend>
        <div className="grid grid-cols-1 gap-2 min-[420px]:grid-cols-2 lg:grid-cols-4 [&>*]:min-w-0">
          {rollen.map((r) => {
            const actief = r.waarde === rol;
            return (
              <label
                key={r.waarde}
                className={`flex min-h-[56px] cursor-pointer items-center gap-3 rounded-kaart border px-3 py-3 text-[15px] leading-snug transition-colors sm:px-4 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-hemel-diep ${
                  actief ? "border-nachtblauw bg-nachtblauw font-semibold text-creme" : "border-lijn bg-creme text-nachtblauw hover:border-lijn-sterk hover:bg-hemel-zacht"
                }`}
              >
                <input type="radio" name="rol" value={r.waarde} checked={actief} onChange={() => setRol(r.waarde)} className="sr-only" />
                <span
                  aria-hidden="true"
                  className={`grid h-9 w-9 flex-none place-items-center rounded-full ${actief ? "bg-zandgeel text-nachtblauw" : "bg-hemel-zacht text-hemel-diep"}`}
                >
                  <Icoon naam={r.icoon} className="h-[18px] w-[18px]" />
                </span>
                {r.label}
              </label>
            );
          })}
        </div>
      </fieldset>

      <p aria-live="polite" className="sr-only">
        Vragen en antwoorden voor {huidig.label}
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-10">
        <div className="lg:pt-2">
          <span aria-hidden="true" className="grid h-16 w-16 place-items-center rounded-full bg-zandgeel text-nachtblauw">
            <Icoon naam={huidig.icoon} className="h-7 w-7" />
          </span>
          <h3 className="mt-5 text-[26px] sm:text-[30px]">{huidig.label}</h3>
          <p className="mt-2 text-nachtblauw">{huidig.zorg}</p>
        </div>
        <dl className="grid gap-3 sm:grid-cols-2">
          {huidig.vragen.map((v) => (
            <div key={v.vraag} className="rounded-kaart border border-lijn bg-creme p-5">
              <dt className="font-semibold leading-snug text-nachtblauw">{v.vraag}</dt>
              <dd className="mt-2 text-[15px] leading-relaxed">{v.antwoord}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
