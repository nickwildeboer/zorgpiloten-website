import type { Metadata } from "next";
import { Bovenkop, Container, Knop } from "@/components/ui";
import { Wolk, Zon } from "@/components/Horizon";
import { taakgesprekHref } from "@/lib/navigatie";
import { Foto } from "@/components/Foto";
import { HeroCollage } from "@/components/home/HeroCollage";
import { Portret } from "@/components/home/Portret";
import { Taakkaart } from "@/components/home/Taakkaart";
import { Afdelingsdeuren } from "@/components/home/Afdelingsdeuren";
import { Praktijkproblemen } from "@/components/home/Praktijkproblemen";
import { Tijdvretermeter } from "@/components/home/Tijdvretermeter";
import { KoerslijnStappen } from "@/components/home/KoerslijnStappen";

export const metadata: Metadata = {
  title: { absolute: "Zorgpiloten | Uw copilot voor HR en Communicatie in de zorg" },
  description:
    "Hugo van den Berk en Nick Wildeboer zetten AI in als copilot voor HR en Communicatie in de zorg. Wij beginnen bij één terugkerende taak en laten die werkend achter in uw eigen omgeving. Plan een taakgesprek van 45 minuten.",
  alternates: { canonical: "/" },
};

const duo = [
  {
    src: "/fotos/hugo-portret.jpg",
    initialen: "HB",
    naam: "Hugo van den Berk, MSc",
    tekst: "15 jaar Directeur Marketing & Communicatie en MT-lid Catharina Ziekenhuis, MSc Organisatie- en veranderkunde (Sioo).",
  },
  {
    src: "/fotos/nick-portret-nick.jpg",
    initialen: "NW",
    naam: "Nick Wildeboer, MSc",
    tekst: "MSc Strategische Innovatie (Digitalisering en AI), Management in de Zorg, ervaring bij onder meer Amsterdam UMC en Nedap ONS.",
  },
];

function Kop({ titel, intro }: { titel: string; intro?: string }) {
  return (
    <div className="max-w-xl">
      <h2 className="text-[30px] sm:text-[40px]">{titel}</h2>
      {intro && <p className="mt-3 text-[17px] sm:text-lg">{intro}</p>}
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* Hero: het merkmoment */}
      <section className="overflow-hidden pb-16 pt-8 sm:pb-24 sm:pt-14">
        <Container>
          <div className="grid gap-x-12 gap-y-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:grid-rows-[auto_auto]">
            <div className="lg:self-end">
              <Bovenkop>HR en Communicatie in de zorg</Bovenkop>
              <h1 className="mt-4 text-[44px] leading-[1.02] sm:text-[60px] lg:text-[68px]">Laat AI vliegen, houd zelf de koers.</h1>
              <p className="mt-5 max-w-[30rem] text-[18px] sm:text-[19px]">
                AI zet het voorwerk klaar, uw team controleert en beslist. Wij beginnen bij één taak.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Knop href={taakgesprekHref()}>Plan een taakgesprek</Knop>
                <Knop href="#tijdvreter-meter" variant="secundair">
                  Reken uw taak door
                </Knop>
              </div>
            </div>

            <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center">
              <HeroCollage />
            </div>

            <div className="lg:self-start">
              <ul className="grid gap-4 border-t border-lijn pt-6" aria-label="Wie er aan tafel zit">
                {duo.map((p) => (
                  <li key={p.naam} className="flex items-start gap-3.5">
                    <Portret src={p.src} naam={p.naam} initialen={p.initialen} grootte={48} />
                    <div className="min-w-0">
                      <p className="text-[15px] font-semibold text-nachtblauw">{p.naam}</p>
                      <p className="mt-0.5 text-[14px] leading-snug">{p.tekst}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Taakkaart met schakelaar */}
      <section className="bg-wolk py-16 sm:py-24">
        <Container>
          <Taakkaart />
        </Container>
      </section>

      {/* Afdelingsdeuren */}
      <section className="py-16 sm:py-24">
        <Container>
          <Kop titel="Kies uw afdeling" />
          <div className="mt-8 sm:mt-10">
            <Afdelingsdeuren />
          </div>
        </Container>
      </section>

      {/* Drie praktijkproblemen */}
      <section className="bg-wolk py-16 sm:py-24">
        <Container>
          <Kop titel="Herkent u dit?" intro="Kies wat het meest op uw situatie lijkt." />
          <div className="mt-8 sm:mt-10">
            <Praktijkproblemen />
          </div>
        </Container>
      </section>

      {/* Tijdvreter-meter */}
      <section id="tijdvreter-meter" className="scroll-mt-20 py-16 sm:py-24">
        <Container>
          <Kop titel="Wat kost één taak per jaar?" intro="Vul uw eigen cijfers in." />
          <div className="mt-8 sm:mt-10">
            <Tijdvretermeter />
          </div>
        </Container>
      </section>

      {/* De koerslijn */}
      <section className="bg-wolk py-16 sm:py-24">
        <Container>
          <Kop titel="Zo verloopt een samenwerking" intro="Vier stappen, van gesprek tot een team dat het zelf kan." />
          <div className="mt-8 sm:mt-10">
            <KoerslijnStappen />
          </div>
        </Container>
      </section>

      {/* De ene call-to-action-band op hemel-zacht */}
      <section className="relative overflow-hidden bg-hemel-zacht pt-16 sm:py-20">
        <Container className="relative">
          <div className="grid items-center gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-12">
            <div className="max-w-xl">
              <div className="flex -space-x-3">
                <Portret src="/fotos/hugo-portret.jpg" naam="Hugo van den Berk" initialen="HB" grootte={56} rand="hemel-zacht" />
                <Portret src="/fotos/nick-portret-nick.jpg" naam="Nick Wildeboer" initialen="NW" grootte={56} rand="hemel-zacht" />
              </div>
              <h2 className="mt-5 text-[30px] sm:text-[40px]">Begin bij één taak die te veel tijd kost</h2>
              <p className="mt-3 text-[17px] text-nachtblauw sm:text-lg">In 45 minuten kiest u met Hugo en Nick één taak en rekent die samen door.</p>
              <div className="mt-7">
                <Knop href={taakgesprekHref()}>Plan een taakgesprek</Knop>
              </div>
            </div>

            <div className="relative pb-10 md:pb-0">
              <Zon className="pointer-events-none absolute -right-6 bottom-0 w-[62%] md:-bottom-20" />
              <Wolk className="pointer-events-none absolute -left-4 top-6 h-4 w-24" kleur="var(--wolk)" />
              <Foto
                src="/fotos/nick-workshop-presentatie-2026.jpg"
                alt="Nick Wildeboer presenteert voor een groep"
                ratio="3/2"
                positie="80% 40%"
                sizes="(min-width: 768px) 560px, 100vw"
                className="relative"
              />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
