import type { Metadata } from "next";
import { Container, Knop, Sectie, SectieKop } from "@/components/ui";
import { taakgesprekHref } from "@/lib/navigatie";
import { Taakkaart } from "@/components/home/Taakkaart";
import { Afdelingsdeuren } from "@/components/home/Afdelingsdeuren";
import { Praktijkproblemen } from "@/components/home/Praktijkproblemen";
import { Tijdvretermeter } from "@/components/home/Tijdvretermeter";
import { KoerslijnStappen } from "@/components/home/KoerslijnStappen";

export const metadata: Metadata = {
  title: { absolute: "Zorgpiloten | Minder klik- en schrijfwerk op HR en Communicatie in de zorg" },
  description:
    "Hugo van den Berk en Nick Wildeboer beginnen bij één terugkerende taak op HR of Communicatie, nemen je team mee in veilig AI-gebruik en laten het werkend achter in jullie eigen omgeving. Plan een taakgesprek van 45 minuten.",
  alternates: { canonical: "/" },
};

const anker = [
  {
    initialen: "HB",
    naam: "Hugo van den Berk, MSc",
    tekst: "15 jaar Directeur Marketing & Communicatie en MT-lid Catharina Ziekenhuis, MSc Organisatie- en veranderkunde (Sioo).",
  },
  {
    initialen: "NW",
    naam: "Nick Wildeboer, MSc",
    tekst: "MSc Strategische Innovatie (Digitalisering en AI), Management in de Zorg, ervaring bij onder meer Amsterdam UMC en Nedap ONS.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="pb-16 pt-10 sm:pb-24 sm:pt-16">
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-[1fr_minmax(0,500px)] lg:gap-14">
            <div className="lg:pt-6">
              <h1 className="text-[34px] sm:text-[44px] lg:text-[48px]">
                Minder klik- en schrijfwerk op HR en Communicatie. Een zorgteam dat AI veilig gebruikt.
              </h1>
              <p className="mt-5 max-w-xl text-[18px] text-tekst-2 sm:text-[19px]">
                Gebouwd door mensen die de zorg van binnenuit kennen. Wij beginnen bij één terugkerende taak op je afdeling, nemen het
                team mee en laten het werkend achter in jullie eigen omgeving.
              </p>
              <div className="mt-8">
                <Knop href={taakgesprekHref()}>Plan een taakgesprek</Knop>
              </div>

              <ul className="mt-10 grid max-w-xl gap-5 border-t border-lijn pt-6" aria-label="Wie er aan tafel zit">
                {anker.map((p) => (
                  <li key={p.naam} className="flex gap-4">
                    <span
                      aria-hidden="true"
                      className="grid h-11 w-11 flex-none place-items-center rounded-full bg-salie text-[14px] font-semibold text-tekst"
                    >
                      {p.initialen}
                    </span>
                    <div>
                      <p className="font-medium text-tekst">{p.naam}</p>
                      <p className="mt-0.5 text-[15px] leading-snug text-tekst-2">{p.tekst}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <Taakkaart />
          </div>
        </Container>
      </section>

      {/* Twee afdelingsdeuren */}
      <Sectie toon="salie">
        <SectieKop
          titel="Kies je afdeling"
          intro="We beginnen bij twee afdelingen waar het zoek- en schrijfwerk zich opstapelt. Wijs een deur aan om te zien waar de tijd nu in gaat."
        />
        <div className="mt-10">
          <Afdelingsdeuren />
        </div>
      </Sectie>

      {/* Drie praktijkproblemen */}
      <Sectie>
        <SectieKop
          titel="Waar loopt het bij jullie op vast?"
          intro="Drie situaties uit de zorgpraktijk. Kies degene die het meest op die van jullie lijkt."
        />
        <div className="mt-10">
          <Praktijkproblemen />
        </div>
      </Sectie>

      {/* Tijdvreter-meter */}
      <Sectie toon="wolk" id="tijdvreter-meter">
        <SectieKop
          titel="Hoeveel tijd zit er in één taak?"
          intro="Neem een taak in gedachten die elke week terugkomt en vul je eigen cijfers in. De meter laat zien wat die ene taak per jaar kost."
        />
        <div className="mt-10">
          <Tijdvretermeter />
        </div>
      </Sectie>

      {/* De koerslijn */}
      <Sectie>
        <SectieKop
          titel="Zo verloopt een samenwerking"
          intro="Vier stappen, van het eerste gesprek tot een team dat de taak zelf beheert. Kies een stap voor de uitleg."
        />
        <div className="mt-10">
          <KoerslijnStappen />
        </div>
      </Sectie>

      {/* Afsluitende call-to-action */}
      <Sectie toon="salie">
        <div className="grid items-end gap-8 md:grid-cols-[1fr_auto]">
          <div className="max-w-2xl">
            <h2 className="text-[32px] sm:text-[40px]">Begin bij één taak die nu te veel tijd kost</h2>
            <p className="mt-4 text-lg text-tekst-2">
              In een taakgesprek van 45 minuten kiezen Hugo en Nick samen met jou één terugkerende taak en rekenen die door. Daarna weet
              je of het de moeite waard is om te starten.
            </p>
          </div>
          <div>
            <Knop href={taakgesprekHref()}>Plan een taakgesprek</Knop>
          </div>
        </div>
      </Sectie>
    </>
  );
}
