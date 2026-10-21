import type { Metadata } from "next";
import { Container, Knop, Sectie, SectieKop } from "@/components/ui";
import { KoersVerloop } from "@/components/werkwijze/KoersVerloop";
import { AssistentCheck } from "@/components/werkwijze/AssistentCheck";
import { taakgesprekHref } from "@/lib/navigatie";

export const metadata: Metadata = {
  title: "Hoe wij werken",
  description:
    "AI doet het voorwerk, je medewerker houdt het stuur. Zo verloopt een samenwerking met Zorgpiloten in vier stops, van taakgesprek tot overdracht.",
};

const valkuilen = [
  {
    titel: "Een tool zonder eigenaar",
    tekst:
      "Copilot of een andere assistent gaat aan, iedereen mag het proberen en niemand is verantwoordelijk. Na een paar weken gebruiken een paar enthousiastelingen het en de rest werkt zoals altijd. Er is niemand die bepaalt waarvoor de assistent wel en niet ingezet wordt, dus er verandert niets aan het werk.",
  },
  {
    titel: "Een training zonder werkende workflow",
    tekst:
      "Het team krijgt een goede training en gaat enthousiast naar huis. Op maandag staat er niets klaar in de eigen systemen en de oude routine wint. Wat je niet in je dagelijkse werk terugziet, zakt binnen een paar weken weg.",
  },
];

export default function WerkwijzePagina() {
  return (
    <>
      <section className="pb-14 pt-14 sm:pb-20 sm:pt-20">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-[38px] sm:text-[56px]">AI doet het voorwerk. Je medewerker houdt het stuur.</h1>
            <p className="mt-5 max-w-2xl text-lg text-tekst-2">
              Wij zetten AI in als copiloot op het voorwerk van één terugkerende taak. De medewerker controleert, beslist en tekent af. Daarom
              werken we aan twee dingen tegelijk: de mensen en de techniek.
            </p>
          </div>

          <figure className="mt-10 max-w-3xl" aria-label="De taakverdeling tussen assistent en medewerker">
            <div className="grid gap-px overflow-hidden rounded-paneel border border-lijn bg-lijn sm:grid-cols-[1fr_1.2fr]">
              <div className="bg-salie px-5 py-5">
                <p className="text-sm text-tekst-zacht">De assistent</p>
                <p className="mt-1 font-medium text-tekst">Zoekt, ordent en zet een concept klaar met bronverwijzing</p>
              </div>
              <div className="bg-spar px-5 py-5">
                <p className="text-sm" style={{ color: "var(--on-ink-muted)" }}>
                  Je medewerker
                </p>
                <p className="mt-1 font-medium" style={{ color: "var(--on-ink)" }}>
                  Controleert, past aan, beslist en tekent af
                </p>
              </div>
            </div>
            <figcaption className="mt-3 text-sm text-tekst-zacht">Het laatste woord ligt altijd bij een mens uit je team.</figcaption>
          </figure>
        </Container>
      </section>

      <Sectie toon="wolk" className="border-y border-lijn">
        <SectieKop
          titel="Waarom het vaak niet landt"
          intro="Als AI op een afdeling niet beklijft, ligt dat zelden aan de techniek. Meestal gaat het mis op een van deze twee punten."
        />
        <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-12">
          {valkuilen.map((v) => (
            <div key={v.titel} className="border-t-2 border-spar pt-5">
              <h3 className="text-[22px]">{v.titel}</h3>
              <p className="mt-3">{v.tekst}</p>
            </div>
          ))}
        </div>
        <p className="mt-12 max-w-3xl text-[20px] leading-snug text-tekst">
          Daarom zitten verandering en techniek bij ons in één hand. Hugo neemt het team mee en regelt het eigenaarschap. Nick bouwt de
          workflow die op maandag echt klaarstaat in jullie eigen omgeving.
        </p>
      </Sectie>

      <Sectie toon="salie" id="koerslijn">
        <SectieKop
          titel="Een samenwerking in vier stops"
          intro="Klik langs de stops. Per stop zie je wat Hugo doet, wat Nick doet, wat het van je team vraagt en wat er aan het eind op tafel ligt."
        />
        <div className="mt-10">
          <KoersVerloop />
        </div>
        <p className="mt-6 max-w-2xl text-sm text-tekst-zacht">
          De tijden zijn grove indicaties. Hoeveel het precies vraagt, hangt af van de taak en rekenen we samen door in het taakgesprek.
        </p>
      </Sectie>

      <Sectie id="leidinggevende">
        <SectieKop
          titel="Wie wordt de leidinggevende van jullie assistent?"
          intro="Een digitale assistent werk je in zoals een nieuwe collega. Met kaders, een proeftijd en iemand die de regie houdt. Klik door de drie kaarten en zie waar jullie staan."
        />
        <div className="mt-10">
          <AssistentCheck />
        </div>
      </Sectie>

      <Sectie toon="wolk" className="border-t border-lijn">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-[30px] sm:text-[36px]">Begin bij stop 1</h2>
            <p className="mt-3 text-lg text-tekst-2">
              In een taakgesprek van 45 minuten kiezen we samen één terugkerende taak en rekenen we door wat die nu kost.
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
