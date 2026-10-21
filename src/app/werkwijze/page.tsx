import type { Metadata } from "next";
import { Container, Knop, Sectie, SectieKop } from "@/components/ui";
import { Foto } from "@/components/Foto";
import { Zon, Wolk } from "@/components/Horizon";
import { KoersVerloop } from "@/components/werkwijze/KoersVerloop";
import { AssistentCheck } from "@/components/werkwijze/AssistentCheck";
import { Icoon } from "@/components/over-ons/Iconen";
import { Portret } from "@/components/over-ons/Portret";
import { taakgesprekHref } from "@/lib/navigatie";

export const metadata: Metadata = {
  title: "Hoe wij werken",
  description:
    "AI doet het voorwerk, uw medewerker houdt het stuur. Zo verloopt een samenwerking met Zorgpiloten in vier stops, van taakgesprek tot overdracht.",
};

const valkuilen = [
  {
    icoon: "persoon-weg" as const,
    titel: "Een tool zonder eigenaar",
    tekst: "Iedereen mag het proberen, niemand is eigenaar.",
  },
  {
    icoon: "kalender-weg" as const,
    titel: "Een training zonder workflow",
    tekst: "Op maandag staat er niets klaar. De oude routine wint.",
  },
];

export default function WerkwijzePagina() {
  return (
    <>
      {/* Hero: tekst links, foto's rechts */}
      <section className="overflow-hidden pb-16 pt-12 sm:pb-24 sm:pt-16">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
            <div>
              <p className="zp-eyebrow">Hoe wij werken</p>
              <h1 className="mt-4 text-[40px] sm:text-[56px] lg:text-[60px]">AI doet het voorwerk. Uw medewerker houdt het stuur.</h1>
              <p className="mt-5 max-w-lg text-lg">Eén terugkerende taak. Hugo neemt het team mee, Nick bouwt de techniek.</p>

              <figure className="mt-8 max-w-lg" aria-label="De taakverdeling tussen assistent en medewerker">
                <div className="grid overflow-hidden rounded-[var(--radius-lg)] sm:grid-cols-2">
                  <div className="bg-hemel-zacht px-5 py-4">
                    <p className="text-sm font-semibold text-hemel-diep">De assistent</p>
                    <p className="mt-0.5 font-medium text-nachtblauw">Zoekt, ordent, zet klaar</p>
                  </div>
                  <div className="bg-nachtblauw px-5 py-4">
                    <p className="text-sm font-semibold text-zandgeel">Uw medewerker</p>
                    <p className="mt-0.5 font-medium text-creme">Controleert, beslist, tekent af</p>
                  </div>
                </div>
              </figure>

              <div className="mt-8">
                <Knop href="#koerslijn" variant="secundair">
                  Bekijk de vier stops
                </Knop>
              </div>
            </div>

            <div className="relative pb-10 pl-6 sm:pb-14 sm:pl-12">
              <Zon className="absolute -right-6 -top-10 h-24 w-48 sm:h-28 sm:w-56" />
              <Wolk className="absolute -right-2 top-10 h-5 w-24 sm:w-32" kleur="var(--wolk)" />
              <Foto
                src="/fotos/sfeer/overleg-whiteboard.jpg"
                alt="Twee collega's hangen post-its bij een procesflow op een whiteboard, de rest van het team kijkt mee vanaf tafel"
                ratio="16/11"
                priority
                sizes="(min-width: 1024px) 560px, 100vw"
                positie="55% 40%"
                className="relative"
              />
              <div className="absolute bottom-0 left-0 w-[38%] rounded-[calc(var(--radius-lg)+6px)] bg-creme p-1.5 shadow-kaart">
                <Foto
                  src="/fotos/nick-workshop-closeup-2026.jpg"
                  alt="Nick Wildeboer geeft een training aan een groep"
                  ratio="4/5"
                  sizes="(min-width: 1024px) 220px, 38vw"
                  positie="64% 30%"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Waarom het vaak niet landt */}
      <Sectie toon="wolk" className="border-y border-lijn">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <SectieKop bovenkop="Valkuilen" titel="Waarom AI vaak niet landt" intro="Zelden door de techniek." />
          <ul className="grid gap-4 sm:grid-cols-2">
            {valkuilen.map((v) => (
              <li key={v.titel} className="rounded-kaart border border-lijn bg-creme p-6">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-hemel-zacht text-hemel-diep">
                  <Icoon naam={v.icoon} />
                </span>
                <h3 className="mt-5 text-[22px]">{v.titel}</h3>
                <p className="mt-2">{v.tekst}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 grid gap-6 rounded-[var(--radius-lg)] bg-nachtblauw p-6 sm:p-8 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)_minmax(0,1fr)] md:items-center md:gap-8">
          <p className="font-display text-[26px] font-bold leading-tight text-creme sm:text-[30px]">Daarom zit het bij ons in één hand.</p>
          <div className="flex items-center gap-4">
            <Portret wie="hugo" className="h-14 w-14" />
            <p className="text-[15px] leading-snug" style={{ color: "var(--on-ink-soft)" }}>
              <span className="block font-semibold text-creme">Hugo</span>
              Neemt het team mee en regelt het eigenaarschap.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Portret wie="nick" className="h-14 w-14" />
            <p className="text-[15px] leading-snug" style={{ color: "var(--on-ink-soft)" }}>
              <span className="block font-semibold text-creme">Nick</span>
              Bouwt de workflow die op maandag klaarstaat.
            </p>
          </div>
        </div>
      </Sectie>

      {/* De koerslijn */}
      <Sectie id="koerslijn" className="scroll-mt-16">
        <SectieKop bovenkop="De koers" titel="Een samenwerking in vier stops" intro="Kies een stop en zie wie wat doet." />
        <div className="mt-10">
          <KoersVerloop
            portretten={{
              hugo: <Portret wie="hugo" className="h-11 w-11" tekstClass="text-[13px]" />,
              nick: <Portret wie="nick" className="h-11 w-11" tekstClass="text-[13px]" />,
            }}
            fotos={{
              hugo: (
                <Foto
                  src="/fotos/hugo-training.jpg"
                  alt="Hugo van den Berk geeft een training aan een team bij het whiteboard"
                  ratio="16/9"
                  sizes="(min-width: 768px) 520px, 100vw"
                  positie="68% 35%"
                  className="rounded-kaart"
                />
              ),
              nick: (
                <Foto
                  src="/fotos/nick-workshop-locatie-1.jpg"
                  alt="Nick Wildeboer werkt met een team aan tafel, met de workflow op het scherm"
                  ratio="16/9"
                  sizes="(min-width: 768px) 520px, 100vw"
                  positie="45% 52%"
                  className="rounded-kaart"
                />
              ),
            }}
          />
        </div>
        <p className="mt-6 text-sm">Tijden zijn grove indicaties.</p>
      </Sectie>

      {/* De assistent als nieuwe collega */}
      <Sectie toon="wolk" id="leidinggevende" className="border-t border-lijn">
        <SectieKop
          bovenkop="Eigenaarschap"
          titel="Wie wordt de leidinggevende van uw assistent?"
          intro="Werk hem in als een nieuwe collega."
        />
        <div className="mt-10">
          <AssistentCheck />
        </div>
      </Sectie>

      {/* Call-to-action-band */}
      <section className="bg-hemel-zacht py-14 sm:py-20">
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <h2 className="text-[32px] sm:text-[40px]">Begin bij stop 1</h2>
              <p className="mt-3 text-lg">In 45 minuten kiezen we samen één taak en rekenen we door wat die nu kost.</p>
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
