import type { Metadata } from "next";
import Link from "next/link";
import { AfsluitBand, Container, PijlLink, SectieKop } from "@/components/ui";
import { Icoon, type IcoonNaam } from "@/components/home/Iconen";
import { VoorbeeldBeeld } from "@/components/diensten/Voorbeeld";
import { kennismaking, kennismakingHref, metMinuten } from "@/lib/navigatie";
import { dienstSlugs, diensten, home, pijlerIndeling, plannerOnderwerp } from "@/content/site";

export const metadata: Metadata = {
  title: diensten.meta.titel,
  description: diensten.meta.beschrijving,
  alternates: { canonical: "/diensten" },
};

const pijlerIconen: IcoonNaam[] = ["lamp", "muts", "kompas", "bot"];
const label = "text-[13px] font-semibold text-nachtblauw-zacht";

/** Alleen de eerste zin van een tekst, zonder iets te herschrijven. */
function eersteZin(tekst: string) {
  return tekst.match(/^.*?[.!?](?=\s|$)/)?.[0] ?? tekst;
}

export default function DienstenPagina() {
  const { hero, pijlers, lijst, voorbeelden, cta } = diensten;
  return (
    <>
      {/* Hero: de belofte links, de vier ingangen als tegels rechts */}
      <section className="pb-16 pt-10 sm:pb-24 lg:pt-12">
        <Container>
          <div className="grid items-center gap-x-12 gap-y-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
            <div>
              <h1 className="max-w-[14ch] text-[clamp(2.6rem,4.8vw,3.9rem)] leading-[1.03]">{hero.kop}</h1>
              <p className="mt-6 max-w-[30rem] text-[20px] leading-[1.5] text-nachtblauw">{eersteZin(hero.intro)}</p>
            </div>
            <nav aria-label="Op deze pagina">
              <ul className="grid gap-4 sm:grid-cols-2">
                {pijlers.map((p, i) => (
                  <li key={p.naam}>
                    <a
                      href={`#${p.naam.toLowerCase()}`}
                      className="group flex h-full flex-col rounded-[var(--radius-lg)] bg-creme p-6 transition-transform duration-200 hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-7"
                    >
                      <Icoon naam={pijlerIconen[i]} grootte={32} className="text-nachtblauw" />
                      <span className="mt-5 font-display text-[24px] font-semibold leading-tight text-nachtblauw group-hover:text-hemel-diep">{p.naam}</span>
                      <span className="mt-2 text-[16px] leading-[1.5] text-tekst-2">{home.doen.pijlers[i].zin}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </Container>
      </section>

      {/* Per pijler: links de naam en intro, rechts per dienst één kaart */}
      {pijlers.map((p, i) => {
        const opCreme = i % 2 === 0;
        return (
          <section key={p.naam} id={p.naam.toLowerCase()} className={`scroll-mt-20 py-20 sm:py-24 ${opCreme ? "bg-creme" : ""}`}>
            <Container>
              <div className="grid gap-x-14 gap-y-10 lg:grid-cols-12">
                <div className="lg:col-span-4">
                  <div className="lg:sticky lg:top-28">
                    <Icoon naam={pijlerIconen[i]} grootte={32} className="text-nachtblauw" />
                    <h2 className="mt-5 text-[38px] leading-none sm:text-[46px]">{p.naam}</h2>
                    <p className="mt-5 max-w-sm text-[17px] leading-[1.55]">{p.intro}</p>
                  </div>
                </div>
                <div className="space-y-6 lg:col-span-8">
                  {pijlerIndeling[i].map((n) => {
                    const d = lijst[n];
                    const slug = dienstSlugs[n];
                    return (
                      <article
                        key={slug}
                        id={slug}
                        className={`scroll-mt-28 rounded-2xl p-7 sm:p-9 ${opCreme ? "border border-lijn-koel bg-wolk" : "bg-creme"}`}
                      >
                        <h3 className="text-[24px] leading-[1.15] sm:text-[28px]">{d.dienst}</h3>
                        <p className="mt-3 max-w-[38rem] text-[17px] leading-[1.55] text-nachtblauw">{d.belofte}</p>
                        <ul className="mt-6 space-y-3 text-[16px] text-nachtblauw">
                          {d.krijgt.map((k) => (
                            <li key={k} className="flex gap-3">
                              <Icoon naam="vink" grootte={20} className="mt-0.5 text-hemel-diep" />
                              {k}
                            </li>
                          ))}
                        </ul>
                        <dl className="mt-7 grid gap-x-10 gap-y-5 border-t border-lijn-koel pt-6 sm:grid-cols-2">
                          <div>
                            <dt className={label}>Voor wie</dt>
                            <dd className="mt-1.5 text-[15.5px]">{d.voorWie}</dd>
                          </div>
                          <div>
                            <dt className={label}>Vorm</dt>
                            <dd className="mt-1.5 text-[15.5px]">{d.vorm}</dd>
                          </div>
                        </dl>
                        <PijlLink href={kennismakingHref(undefined, plannerOnderwerp[slug])} className="mt-7">
                          {kennismaking.knop}
                        </PijlLink>
                      </article>
                    );
                  })}
                </div>
              </div>
            </Container>
          </section>
        );
      })}

      {/* Voorbeelden: de twee afdelingspagina's, elk met een stukje uit de demo */}
      <section className="border-t border-lijn-koel py-20 sm:py-28">
        <Container>
          <SectieKop titel={voorbeelden.kop} intro={voorbeelden.intro} />
          <div className="mt-12 grid gap-x-10 gap-y-14 md:grid-cols-2">
            {(
              [
                { href: "/hr", titel: "HR & P&O", tekst: voorbeelden.hr, soort: "hr" },
                { href: "/communicatie", titel: "Communicatie", tekst: voorbeelden.communicatie, soort: "communicatie" },
              ] as const
            ).map((v) => (
              <Link key={v.href} href={v.href} className="group block rounded-[var(--radius-lg)]">
                <VoorbeeldBeeld soort={v.soort} />
                <h3 className="mt-6 text-[26px] group-hover:text-hemel-diep">{v.titel}</h3>
                <p className="mt-2 max-w-md text-[16.5px]">{v.tekst}</p>
                <span className="zp-pijl mt-4">{voorbeelden.linktekst}</span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <AfsluitBand kop={cta.kop} tekst={metMinuten(cta.tekst)} knop={cta.knop} href={kennismakingHref()} />
    </>
  );
}
