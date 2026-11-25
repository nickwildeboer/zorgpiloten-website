import type { Metadata } from "next";
import { AfsluitBand, Container, Knop, PijlLink, SectieKop } from "@/components/ui";
import { Icoon } from "@/components/home/Iconen";
import { VeiligIcoon } from "@/components/veiligheid/Iconen";
import { RolWisselaar } from "@/components/veiligheid/RolWisselaar";
import { GeletterdheidCheck } from "@/components/veiligheid/GeletterdheidCheck";
import { kennismaking, kennismakingHref, metMinuten } from "@/lib/navigatie";
import { veiligheidPagina } from "@/content/paginas";

export const metadata: Metadata = {
  title: veiligheidPagina.meta.titel,
  description: veiligheidPagina.meta.beschrijving,
  alternates: { canonical: "/veiligheid" },
};

export default function VeiligheidPagina() {
  const { hero, principes, rollen, check, cta } = veiligheidPagina;
  return (
    <>
      {/* Hero: de belofte links, de vier uitgangspunten als checklist rechts */}
      <section className="pb-16 pt-10 sm:pb-24 lg:pt-12">
        <Container>
          <div className="grid items-center gap-x-12 gap-y-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
            <div>
              <h1 className="max-w-[13ch] text-[clamp(2.6rem,4.8vw,3.9rem)] leading-[1.03]">{hero.kop}</h1>
              <p className="mt-6 max-w-[30rem] text-[20px] leading-[1.5] text-nachtblauw">{hero.zin}</p>
              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
                <Knop href={kennismakingHref()}>{kennismaking.knop}</Knop>
                <PijlLink href="#ai-geletterdheid">Doe de check</PijlLink>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[var(--radius-lg)] bg-creme px-3 pb-3 pt-14 sm:px-8 sm:pb-8 sm:pt-20 lg:px-10 lg:pb-10">
              <span aria-hidden="true" className="absolute right-8 top-6 aspect-[2/1] w-[180px] rounded-t-full bg-zandgeel sm:right-14 sm:w-[240px]" />
              <div className="relative rounded-kaart border border-lijn-koel bg-wolk px-5 py-1 sm:px-7">
                <p className="flex items-center gap-3 border-b border-lijn-koel py-4 font-semibold text-nachtblauw">
                  <VeiligIcoon naam="schild" className="text-hemel-diep" />
                  Vier uitgangspunten
                </p>
                <ul>
                  {principes.map((p, i) => (
                    <li key={p.titel} className={`flex gap-4 py-5 ${i < principes.length - 1 ? "border-b border-lijn-koel" : ""}`}>
                      <Icoon naam="vink" className="mt-0.5 text-hemel-diep" />
                      <div>
                        <p className="font-display text-[19px] font-semibold leading-snug text-nachtblauw">{p.titel}</p>
                        <p className="mt-1 text-[16px] leading-[1.5]">{p.regel}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Per rol: dezelfde vragen, door de bril van de lezer */}
      <section id="rollen" className="scroll-mt-16 border-t border-lijn-koel py-20 sm:py-28">
        <Container>
          <SectieKop titel={rollen.kop} intro={rollen.zin} />
          <div className="mt-12">
            <RolWisselaar />
          </div>
          <p className="mt-10 max-w-2xl text-sm">Geen juridisch advies en geen garantie dat iets aan de AVG voldoet. Jullie FG of jurist beoordeelt.</p>
        </Container>
      </section>

      {/* AI-geletterdheid: vier vragen en een samenvatting om door te sturen */}
      <section id="ai-geletterdheid" className="scroll-mt-16 bg-creme py-20 sm:py-28">
        <Container>
          <SectieKop titel={check.kop} intro={check.zin} />
          <div className="mt-12">
            <GeletterdheidCheck />
          </div>
        </Container>
      </section>

      <AfsluitBand kop={cta.kop} tekst={metMinuten(cta.tekst)} knop={kennismaking.knop} href={kennismakingHref()} />
    </>
  );
}
