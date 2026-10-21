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
    zorg: "U wilt tijd terug voor uw team, zonder risico voor gegevens of kwaliteit.",
    vragen: [
      {
        vraag: "Mag mijn team er nu al mee werken?",
        antwoord: "Ja, met duidelijke spelregels. We beginnen bij voorkeur met een taak zonder persoonsgegevens, zoals het cao-loket.",
      },
      {
        vraag: "Wie is verantwoordelijk als het voorwerk niet klopt?",
        antwoord: "De medewerker die aftekent. Niets gaat de deur uit zonder controle door uw team.",
      },
      {
        vraag: "Collega's gebruiken al hun eigen ChatGPT. Wat nu?",
        antwoord: "In de training bespreken we wat wel en niet mag. Daarna bouwen we een route in uw eigen omgeving.",
      },
      {
        vraag: "Hoeveel tijd kost het mijn team?",
        antwoord: "Per stop staat een grove indicatie op Hoe wij werken. Het meeste gebeurt tijdens het gewone werk.",
      },
    ],
  },
  {
    waarde: "bestuur",
    label: "Bestuur of MT",
    icoon: "bestuur",
    zorg: "U wilt weten wie beslist, wie toezicht houdt en of het iets oplevert.",
    vragen: [
      {
        vraag: "Wie beslist over de inzet van AI?",
        antwoord: "U. Het MT bepaalt de kaders, de leidinggevende de inzet en de medewerker beslist per taak. Wij adviseren en bouwen.",
      },
      {
        vraag: "Wie houdt toezicht?",
        antwoord: "Intern uw FG, en per workflow een vaste eigenaar. Extern onder meer de Autoriteit Persoonsgegevens voor de AVG.",
      },
      {
        vraag: "Wat vraagt de AI-verordening van ons?",
        antwoord: "Artikel 4 vraagt organisaties die AI inzetten om AI-geletterdheid te ondersteunen. Doe hieronder de korte check.",
      },
      {
        vraag: "Hoe voorkomen we een traject dat blijft hangen?",
        antwoord: "Klein beginnen. Eén taak, een nulmeting en een nameting. Daarna beslist u zelf.",
      },
    ],
  },
  {
    waarde: "fg",
    label: "FG",
    icoon: "schild",
    zorg: "U wilt vooraf weten welke gegevens waar heen gaan, en zelf oordelen.",
    vragen: [
      {
        vraag: "Welke gegevens gaan waar heen?",
        antwoord: "Voor we bouwen, zetten we de datastroom per workflow op papier. Die beschrijving krijgt u om te beoordelen.",
      },
      {
        vraag: "Is er een verwerkersovereenkomst nodig?",
        antwoord: "Dat beoordeelt u. Wij leveren per dienst de informatie voor uw afweging, ook voor een DPIA.",
      },
      {
        vraag: "Gaan er persoonsgegevens naar een AI-dienst?",
        antwoord: "Bij voorkeur beginnen we zonder. Zitten ze er wel in, zoals bij verzuim, dan bouwen we pas na uw akkoord.",
      },
      {
        vraag: "Garandeert u dat het aan de AVG voldoet?",
        antwoord: "Nee, dat beloven wij niet. Wij maken de opzet transparant. Het oordeel ligt bij u of uw jurist.",
      },
    ],
  },
  {
    waarde: "ict",
    label: "ICT en informatiebeveiliging",
    icoon: "server",
    zorg: "U wilt geen schaduw-IT en een opstelling die u zelf beheert.",
    vragen: [
      {
        vraag: "Waar draait het?",
        antwoord: "Waar het kan in uw eigen omgeving, zoals Microsoft 365. Een externe dienst staat vooraf in de technische beschrijving.",
      },
      {
        vraag: "Wie heeft toegang?",
        antwoord: "Alleen de accounts die we samen afspreken, met zo min mogelijk rechten.",
      },
      {
        vraag: "Hoe zetten we het stil?",
        antwoord: "Per workflow een vaste manier, die we samen testen voor de livegang.",
      },
      {
        vraag: "Wat blijft er achter na de overdracht?",
        antwoord: "Een werkende workflow, een werkinstructie en een technische beschrijving. U bent eigenaar.",
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
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
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
