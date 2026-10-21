import type { Metadata } from "next";
import { Container, Knop, Sectie, SectieKop } from "@/components/ui";
import { RolWisselaar } from "@/components/veiligheid/RolWisselaar";
import { GeletterdheidCheck } from "@/components/veiligheid/GeletterdheidCheck";
import { taakgesprekHref } from "@/lib/navigatie";

export const metadata: Metadata = {
  title: "Veiligheid, AVG en AI-geletterdheid",
  description:
    "Antwoorden voor de FG, ICT, het MT en het hoofd van de afdeling over datastromen, eigen omgeving en toezicht. Plus een korte check op AI-geletterdheid volgens artikel 4 van de AI-verordening.",
};

const uitgangspunten = [
  {
    titel: "Voorwerk, geen besluiten",
    tekst: "De assistent zet klaar. Een medewerker controleert, beslist en tekent af.",
  },
  {
    titel: "Eerst een taak zonder persoonsgegevens",
    tekst: "We beginnen bij voorkeur waar geen persoonsgegevens in zitten, zoals cao-vragen of een folder op B1-niveau.",
  },
  {
    titel: "In jullie eigen omgeving waar het kan",
    tekst: "Bijvoorbeeld binnen Microsoft 365, met accounts en rechten die jullie zelf beheren.",
  },
  {
    titel: "Jullie FG of jurist beoordeelt",
    tekst: "Wij maken de opzet transparant. Het oordeel over wat mag, ligt bij jullie.",
  },
];

export default function VeiligheidPagina() {
  return (
    <>
      <section className="pb-14 pt-14 sm:pb-20 sm:pt-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-end">
            <div>
              <h1 className="text-[34px] sm:text-[50px]">
                Rust voor de functionaris gegevensbescherming, ICT en het MT. Duidelijkheid voor de werkvloer.
              </h1>
              <p className="mt-5 max-w-2xl text-lg text-tekst-2">
                Iedereen die bij een AI-toepassing betrokken is, heeft andere vragen. Hier vind je per rol eerlijke antwoorden over
                datastromen, eigen omgeving en wie er beslist. Zo kan ieder vanuit zijn eigen verantwoordelijkheid meekijken.
              </p>
            </div>
            <ul className="divide-y divide-lijn border-y border-lijn">
              {uitgangspunten.map((u) => (
                <li key={u.titel} className="py-4">
                  <p className="font-medium text-tekst">{u.titel}</p>
                  <p className="mt-1 text-[15px]">{u.tekst}</p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <Sectie toon="salie" id="rollen">
        <SectieKop
          titel="Elke rol heeft eigen vragen"
          intro="Kies de rol die bij jou past, of die van de collega die je wilt overtuigen."
        />
        <div className="mt-10">
          <RolWisselaar />
        </div>
        <p className="mt-8 max-w-2xl text-sm text-tekst-zacht">
          Dit is geen juridisch advies en geen garantie dat een opstelling aan de AVG voldoet. Jullie FG of jurist beoordeelt wat voor
          jullie organisatie geldt.
        </p>
      </Sectie>

      <Sectie id="ai-geletterdheid">
        <SectieKop
          titel="Hoe staat het met AI-geletterdheid bij jullie?"
          intro="Artikel 4 van de AI-verordening vraagt organisaties die AI inzetten om AI-geletterdheid te ondersteunen. Vier vragen geven een eerste beeld. Daarna kopieer je een samenvatting voor je FG, ICT of MT."
        />
        <div className="mt-10">
          <GeletterdheidCheck />
        </div>
      </Sectie>

      <Sectie toon="wolk" className="border-t border-lijn">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-[30px] sm:text-[36px]">Neem je FG of ICT mee naar het gesprek</h2>
              <p className="mt-3 text-lg text-tekst-2">
                In het taakgesprek van 45 minuten kijken we ook naar de gegevens in de taak en wie er moet meekijken. Iedereen die je erbij
                wilt hebben, is welkom.
              </p>
            </div>
            <Knop href={taakgesprekHref()} className="self-start md:self-auto">
              Plan een taakgesprek
            </Knop>
        </div>
      </Sectie>
    </>
  );
}
