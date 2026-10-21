"use client";

import { useState } from "react";

type Rol = "afdeling" | "bestuur" | "fg" | "ict";
type Vraag = { vraag: string; antwoord: string };

const rollen: { waarde: Rol; label: string; zorg: string; vragen: Vraag[] }[] = [
  {
    waarde: "afdeling",
    label: "Hoofd HR of Communicatie",
    zorg: "Jij wilt dat je team tijd terugkrijgt, zonder dat er iets misgaat met gegevens of met de kwaliteit van het werk.",
    vragen: [
      {
        vraag: "Mag mijn team er nu al mee werken?",
        antwoord:
          "Ja, met duidelijke spelregels. We beginnen bij voorkeur met een taak zonder persoonsgegevens, zoals het cao-loket of een folder op B1-niveau. Pas als het team veilig werkt, komt een taak met gevoelige gegevens in beeld.",
      },
      {
        vraag: "Wie is verantwoordelijk als het voorwerk niet klopt?",
        antwoord:
          "De medewerker die aftekent, net als bij het werk van een collega. De assistent zet alleen voorwerk klaar. Niets gaat de deur uit zonder dat iemand uit je team het heeft gecontroleerd.",
      },
      {
        vraag: "Collega's gebruiken al hun eigen ChatGPT. Wat nu?",
        antwoord:
          "Dat laat zien dat de behoefte er is. In de training bespreken we wat wel en niet mag en waarom. Daarna bouwen we een route in jullie eigen omgeving, zodat de omweg niet meer nodig is.",
      },
      {
        vraag: "Hoeveel tijd kost het mijn team?",
        antwoord:
          "Per stop staat een grove indicatie op de pagina Hoe wij werken. Het meeste gebeurt tijdens het gewone werk, met twee collega's die meetesten.",
      },
    ],
  },
  {
    waarde: "bestuur",
    label: "Bestuur of MT",
    zorg: "Jij wilt weten wie er beslist, wie toezicht houdt en of het iets oplevert voordat je verder gaat.",
    vragen: [
      {
        vraag: "Wie beslist over de inzet van AI?",
        antwoord:
          "Jullie. Het MT of bestuur bepaalt de kaders, de leidinggevende bepaalt waarvoor de assistent op de afdeling wordt ingezet en de medewerker beslist per taak. Wij adviseren en bouwen, maar nemen geen besluiten over jullie werk.",
      },
      {
        vraag: "Wie houdt toezicht?",
        antwoord:
          "Intern houdt jullie FG toezicht op de verwerking van persoonsgegevens. Per workflow leggen we vast wie eigenaar is en wie meekijkt. Extern zijn er toezichthouders, zoals de Autoriteit Persoonsgegevens voor de AVG.",
      },
      {
        vraag: "Wat vraagt de AI-verordening van ons?",
        antwoord:
          "Artikel 4 vraagt organisaties die AI inzetten om AI-geletterdheid te ondersteunen. Verderop op deze pagina staat een korte check. Je FG of jurist beoordeelt wat dat precies voor jullie betekent.",
      },
      {
        vraag: "Hoe voorkomen we een traject dat blijft hangen?",
        antwoord:
          "Door klein te beginnen. Eén taak, een nulmeting en een nameting. Over een volgende stap beslis je op basis van wat je zelf hebt gezien.",
      },
    ],
  },
  {
    waarde: "fg",
    label: "FG",
    zorg: "Jij wilt vooraf weten welke gegevens waar heen gaan, en zelf kunnen beoordelen of dat mag.",
    vragen: [
      {
        vraag: "Welke gegevens gaan waar heen?",
        antwoord:
          "Voordat we bouwen, zetten we de datastroom per workflow op papier. Welke gegevens erin gaan, waar ze verwerkt worden, wat eruit komt en wie erbij kan. Die beschrijving krijg je om te beoordelen.",
      },
      {
        vraag: "Is er een verwerkersovereenkomst nodig?",
        antwoord:
          "Dat beoordeel jij. Wij geven per dienst aan welke rol die heeft in de verwerking en leveren de informatie die je nodig hebt voor je eigen afweging, bijvoorbeeld over een verwerkersovereenkomst of een DPIA.",
      },
      {
        vraag: "Gaan er persoonsgegevens naar een AI-dienst?",
        antwoord:
          "We beginnen bij voorkeur met een taak zonder persoonsgegevens. Zitten ze er wel in, zoals bij verzuim, dan bespreken we eerst met jou hoe dat afgeschermd moet en bouwen we pas na jouw akkoord.",
      },
      {
        vraag: "Is het AVG-proof?",
        antwoord:
          "Dat stellen wij niet voor je vast en dat beloven we ook niet. Wij maken de opzet transparant en passen hem aan op jouw eisen. Het oordeel ligt bij jou of bij jullie jurist.",
      },
    ],
  },
  {
    waarde: "ict",
    label: "ICT en informatiebeveiliging",
    zorg: "Jij wilt geen schaduw-IT, geen onbekende koppelingen en een opstelling die je zelf kunt beheren.",
    vragen: [
      {
        vraag: "Waar draait het?",
        antwoord:
          "Waar het kan in jullie eigen omgeving, bijvoorbeeld binnen Microsoft 365, met accounts en rechten die jullie beheren. Is er een externe dienst nodig, dan staat dat vooraf in de technische beschrijving en beslissen jullie mee.",
      },
      {
        vraag: "Wie heeft toegang?",
        antwoord:
          "Alleen de accounts die we samen afspreken, met zo min mogelijk rechten. We werken binnen jullie bestaande beheer en vragen geen rechten die niet nodig zijn.",
      },
      {
        vraag: "Hoe zetten we het stil?",
        antwoord:
          "Per workflow spreken we een vaste manier af om hem stil te zetten. Die beschrijven we en testen we samen voordat hij in gebruik gaat.",
      },
      {
        vraag: "Wat blijft er achter na de overdracht?",
        antwoord:
          "Een werkende workflow in jullie omgeving, een werkinstructie voor het team en een technische beschrijving voor ICT. Jullie zijn eigenaar en kunnen het zelf beheren.",
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
        <legend className="mb-3 text-[15px] font-medium text-tekst">Kijk mee door de bril van</legend>
        <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-1 sm:rounded-full sm:border sm:border-lijn sm:bg-wolk sm:p-1">
          {rollen.map((r) => {
            const actief = r.waarde === rol;
            return (
              <label
                key={r.waarde}
                className={`flex cursor-pointer items-center justify-center rounded-kaart border px-3 py-2.5 text-center text-[15px] leading-snug transition-colors sm:rounded-full sm:border-0 sm:px-4 sm:py-2 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-framboos-ink ${
                  actief ? "border-spar bg-spar font-medium text-white" : "border-lijn bg-wolk text-tekst-2 hover:bg-salie hover:text-tekst sm:bg-transparent"
                }`}
              >
                <input
                  type="radio"
                  name="rol"
                  value={r.waarde}
                  checked={actief}
                  onChange={() => setRol(r.waarde)}
                  className="sr-only"
                />
                {r.label}
              </label>
            );
          })}
        </div>
      </fieldset>

      <p aria-live="polite" className="sr-only">
        Vragen en antwoorden voor {huidig.label}
      </p>
      <div className="mt-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.6fr)] lg:gap-12">
          <div>
            <h3 className="text-[24px] sm:text-[28px]">{huidig.label}</h3>
            <p className="mt-3 text-tekst-2">{huidig.zorg}</p>
          </div>
          <dl className="divide-y divide-lijn rounded-paneel border border-lijn bg-wolk">
            {huidig.vragen.map((v) => (
              <div key={v.vraag} className="px-5 py-5 sm:px-7">
                <dt className="text-[17px] font-medium text-tekst">{v.vraag}</dt>
                <dd className="mt-2">{v.antwoord}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
