import type { Metadata } from "next";
import { AfsluitBand, Container, Knop, PijlLink } from "@/components/ui";
import { DuotoonFilter, Foto } from "@/components/Foto";
import { Portret } from "@/components/over-ons/Portret";
import { Icoon } from "@/components/home/Iconen";
import { ExtraIcoon } from "@/components/aanpak/ExtraIconen";
import { kennismakingHref, metMinuten } from "@/lib/navigatie";
import { aanpak } from "@/content/site";

export const metadata: Metadata = {
  title: aanpak.meta.titel,
  description: aanpak.meta.beschrijving,
  alternates: { canonical: "/aanpak" },
};

/** Alleen de eerste zin van een tekst, zonder iets te herschrijven. */
function eersteZin(tekst: string) {
  return tekst.match(/^.*?[.!?](?=\s|$)/)?.[0] ?? tekst;
}

const stapIconen = [
  <ExtraIcoon key="oor" naam="oor" grootte={32} />,
  <Icoon key="kompas" naam="kompas" grootte={32} />,
  <Icoon key="bot" naam="bot" grootte={32} />,
  <Icoon key="muts" naam="muts" grootte={32} />,
  <ExtraIcoon key="klembord" naam="klembord" grootte={32} />,
];

const principeIconen = [
  <Icoon key="aftekenen" naam="aftekenen" grootte={32} />,
  <ExtraIcoon key="kiem" naam="kiem" grootte={32} />,
  <ExtraIcoon key="meten" naam="meten" grootte={32} />,
  <ExtraIcoon key="schild" naam="schild" grootte={32} />,
];

export default function AanpakPagina() {
  const { hero, stappen, rollen, principes, cta } = aanpak;
  return (
    <>
      <DuotoonFilter />

      {/* Hero: de belofte links, de workshop in duotoon rechts */}
      <section className="pb-16 pt-10 sm:pb-24 lg:pt-12">
        <Container>
          <div className="grid items-center gap-x-12 gap-y-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
            <div>
              <h1 className="max-w-[14ch] text-[clamp(2.6rem,4.8vw,3.9rem)] leading-[1.03]">{hero.kop}</h1>
              <p className="mt-6 max-w-[30rem] text-[20px] leading-[1.5] text-nachtblauw">{eersteZin(hero.intro)}</p>
              <Knop href={kennismakingHref()} className="mt-8">
                {cta.knop}
              </Knop>
            </div>
            <Foto
              src="/fotos/hugo-workshop.jpg"
              alt="Een workshop: deelnemers staan bij een flip-over, een man in een beige trui kijkt vanaf de voorgrond mee"
              ratio="3/2"
              priority
              sizes="(min-width: 1152px) 580px, (min-width: 1024px) 50vw, 100vw"
              positie="60% 40%"
              duotoon
            />
          </div>
        </Container>
      </section>

      {/* De vijf stappen op één koers, de uitleg achter Lees meer */}
      <section className="bg-creme py-20 sm:py-28" style={{ ["--zp-vlak" as string]: "var(--creme)" }}>
        <Container>
          <ol className="zp-koers-rij !gap-12">
            {stappen.map((s, i) => (
              <li key={s.stap} className="!pl-10 sm:!pl-14">
                <span className="zp-stop" data-doel={i === stappen.length - 1} aria-hidden="true" />
                <div className="grid gap-x-12 gap-y-4 lg:grid-cols-12">
                  <div className="flex items-start gap-4 lg:col-span-4">
                    <span className="mt-1 text-nachtblauw">{stapIconen[i]}</span>
                    <div>
                      <p className="text-[13px] font-semibold text-nachtblauw-zacht">Stap {i + 1}</p>
                      <h2 className="mt-1 text-[30px] leading-none sm:text-[36px]">{s.stap}</h2>
                    </div>
                  </div>
                  <div className="lg:col-span-8">
                    <p className="font-display text-[21px] font-semibold leading-snug text-nachtblauw">{s.kop}</p>
                    <p className="mt-3 max-w-[38rem] text-[16.5px] text-nachtblauw">
                      <span className="mr-2 font-semibold">Opbrengst</span>
                      {s.opbrengst}
                    </p>
                    <details className="group mt-4 max-w-[38rem]">
                      <summary className="inline-flex cursor-pointer list-none items-center gap-1.5 rounded-sm text-[15px] font-semibold text-hemel-diep underline decoration-lijn-koel decoration-1 underline-offset-4 hover:decoration-current focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-hemel-diep [&::-webkit-details-marker]:hidden">
                        Lees meer
                        <ExtraIcoon
                          naam="open"
                          grootte={16}
                          className="transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
                        />
                      </summary>
                      <p className="mt-3 text-[16.5px] leading-[1.6]">{s.tekst}</p>
                    </details>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Wie doet wat */}
      <section className="py-20 sm:py-24">
        <Container>
          <div className="grid gap-8 rounded-[var(--radius-lg)] bg-nachtblauw p-8 sm:p-12 lg:grid-cols-12 lg:items-center lg:gap-12" style={{ color: "var(--on-ink-soft)" }}>
            <h2 className="text-[30px] leading-[1.1] sm:text-[36px] lg:col-span-4" style={{ color: "var(--on-ink)" }}>
              {rollen.kop}
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:col-span-8">
              {(["hugo", "nick"] as const).map((k) => (
                <div key={k} className="flex items-start gap-4">
                  <Portret wie={k} className="h-14 w-14" />
                  <p className="text-[16px] leading-[1.55]">{rollen[k]}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Werkafspraken: vier principes, elk met een icoon */}
      <section className="bg-creme py-20 sm:py-28">
        <Container>
          <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <h2 className="text-[32px] leading-[1.1] sm:text-[42px] lg:sticky lg:top-28">{principes.kop}</h2>
            </div>
            <dl className="grid gap-x-12 gap-y-12 sm:grid-cols-2 lg:col-span-8">
              {principes.principes.map((p, i) => (
                <div key={p.titel} className="border-t border-lijn-koel pt-7 text-nachtblauw">
                  {principeIconen[i]}
                  <dt className="mt-5 font-display text-[21px] font-semibold leading-snug">{p.titel}</dt>
                  <dd className="mt-3 text-[16.5px] text-tekst">
                    {p.tekst}
                    {i === principes.principes.length - 1 && (
                      <PijlLink href="/veiligheid" className="mt-4 flex">
                        {principes.veiligheidLink}
                      </PijlLink>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      <AfsluitBand kop={cta.kop} tekst={metMinuten(cta.tekst)} knop={cta.knop} href={kennismakingHref()} />
    </>
  );
}
