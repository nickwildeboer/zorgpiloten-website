import type { Metadata } from "next";
import { Container, Knop, Sectie, SectieKop } from "@/components/ui";
import { Foto } from "@/components/Foto";
import { RolWisselaar } from "@/components/veiligheid/RolWisselaar";
import { GeletterdheidCheck } from "@/components/veiligheid/GeletterdheidCheck";
import { Icoon, type IcoonNaam } from "@/components/over-ons/Iconen";
import { taakgesprekHref } from "@/lib/navigatie";

export const metadata: Metadata = {
  title: "Veiligheid, AVG en AI-geletterdheid",
  description:
    "Antwoorden voor de FG, ICT, het MT en het hoofd van de afdeling over datastromen, eigen omgeving en toezicht. Plus een korte check op AI-geletterdheid volgens artikel 4 van de AI-verordening.",
};

const uitgangspunten: { icoon: IcoonNaam; titel: string; tekst: string }[] = [
  { icoon: "klembord", titel: "Voorwerk, geen besluiten", tekst: "De assistent zet klaar. Een medewerker beslist en tekent af." },
  { icoon: "slot", titel: "Eerst zonder persoonsgegevens", tekst: "Bij voorkeur een taak als cao-vragen of een folder op B1-niveau." },
  { icoon: "huis", titel: "In uw eigen omgeving", tekst: "Waar het kan, bijvoorbeeld in Microsoft 365, met rechten die u zelf beheert." },
  { icoon: "weegschaal", titel: "Uw FG of jurist beoordeelt", tekst: "Wij maken de opzet transparant. Het oordeel ligt bij u." },
];

export default function VeiligheidPagina() {
  return (
    <>
      {/* Hero: rustig, met de ochtendgang */}
      <section className="pb-16 pt-12 sm:pb-24 sm:pt-16">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:items-end lg:gap-16">
            <div>
              <p className="zp-eyebrow">Veiligheid en FG</p>
              <h1 className="mt-4 text-[38px] sm:text-[52px] lg:text-[56px]">Rust voor de FG, ICT en het MT. Duidelijkheid voor de werkvloer.</h1>
            </div>
            <p className="text-lg lg:pb-2">Per rol eerlijke antwoorden over gegevens, eigen omgeving en wie er beslist.</p>
          </div>

          <div className="relative mt-10 sm:mt-12">
            <Foto
              src="/fotos/sfeer/zorg-gang-ochtend.jpg"
              alt="Een lege ziekenhuisgang in het eerste ochtendlicht, met een bank en een plant bij het raam"
              ratio="21/9"
              priority
              sizes="(min-width: 1152px) 1104px, 100vw"
              positie="40% 55%"
              className="max-sm:!aspect-[4/3]"
            />
          </div>

          <ul className="relative mx-auto -mt-10 grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-lijn bg-lijn shadow-kaart sm:-mt-16 sm:w-[94%] sm:grid-cols-2 lg:grid-cols-4">
            {uitgangspunten.map((u) => (
              <li key={u.titel} className="bg-wolk p-5 sm:p-6">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-hemel-zacht text-hemel-diep">
                  <Icoon naam={u.icoon} className="h-5 w-5" />
                </span>
                <p className="mt-4 font-semibold leading-snug text-nachtblauw">{u.titel}</p>
                <p className="mt-1 text-[15px] leading-snug">{u.tekst}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Per rol */}
      <Sectie toon="wolk" id="rollen" className="border-y border-lijn">
        <SectieKop bovenkop="Per rol" titel="Elke rol heeft eigen vragen" intro="Kies uw rol, of die van de collega die u wilt overtuigen." />
        <div className="mt-10">
          <RolWisselaar />
        </div>
        <p className="mt-8 max-w-2xl text-sm">
          Dit is geen juridisch advies en geen garantie dat een opstelling aan de AVG voldoet. Uw FG of jurist beoordeelt wat voor uw organisatie geldt.
        </p>
      </Sectie>

      {/* AI-geletterdheid */}
      <Sectie id="ai-geletterdheid" className="scroll-mt-16">
        <SectieKop
          bovenkop="AI-geletterdheid"
          titel="Hoe staat het met AI-geletterdheid bij u?"
          intro="Artikel 4 van de AI-verordening vraagt organisaties die AI inzetten om AI-geletterdheid te ondersteunen. Vier vragen, daarna kopieert u een samenvatting."
        />
        <div className="mt-10">
          <GeletterdheidCheck />
        </div>
      </Sectie>

      {/* Call-to-action-band */}
      <section className="bg-hemel-zacht py-14 sm:py-20">
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <h2 className="text-[32px] sm:text-[40px]">Neem uw FG of ICT mee naar het gesprek</h2>
              <p className="mt-3 text-lg">In het taakgesprek van 45 minuten kijken we ook naar de gegevens in de taak. Iedereen die u erbij wilt, is welkom.</p>
            </div>
            <Knop href={taakgesprekHref()} className="self-start md:self-auto">
              Plan een taakgesprek
            </Knop>
          </div>
        </Container>
      </section>
    </>
  );
}
