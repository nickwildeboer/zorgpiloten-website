import type { Metadata } from "next";
import Link from "next/link";
import { AfsluitBand, Bovenkop, Container, PijlLink } from "@/components/ui";
import { Foto } from "@/components/Foto";
import { kennismaking, kennismakingHref, metMinuten } from "@/lib/navigatie";
import { dienstSlugs, diensten, pijlerIndeling, plannerOnderwerp } from "@/content/site";

export const metadata: Metadata = {
  title: diensten.meta.titel,
  description: diensten.meta.beschrijving,
  alternates: { canonical: "/diensten" },
};

const label = "text-[13px] font-semibold text-nachtblauw-zacht";

export default function DienstenPagina() {
  const { hero, pijlers, lijst, voorbeelden, cta } = diensten;
  return (
    <>
      {/* Hero met de vier ingangen */}
      <section className="pb-16 pt-14 sm:pb-24 sm:pt-20">
        <Container>
          <div className="grid gap-x-16 gap-y-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <Bovenkop>{hero.bovenkop}</Bovenkop>
              <h1 className="mt-6 text-[clamp(2.4rem,4.8vw,3.75rem)] leading-[1.05]">{hero.kop}</h1>
              <p className="mt-6 max-w-[38rem] text-[19px] leading-[1.6]">{hero.intro}</p>
            </div>
            <nav aria-label="Op deze pagina" className="lg:col-span-4">
              <ul className="border-t border-lijn">
                {pijlers.map((p) => (
                  <li key={p.naam} className="border-b border-lijn">
                    <a href={`#${p.naam.toLowerCase()}`} className="group flex items-center justify-between py-3.5 font-display text-[20px] font-semibold text-nachtblauw hover:text-hemel-diep">
                      {p.naam}
                      <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" className="transition-transform duration-200 group-hover:translate-y-0.5">
                        <path d="M8 2.5v10M4 8.5l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </Container>
      </section>

      {/* De vier dingen die wij doen, met de diensten eronder */}
      {pijlers.map((p, i) => (
        <section key={p.naam} id={p.naam.toLowerCase()} className={`scroll-mt-20 border-t border-lijn py-20 sm:py-24 ${i % 2 === 0 ? "bg-wolk" : ""}`}>
          <Container>
            <div className="grid gap-x-14 gap-y-10 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <div className="lg:sticky lg:top-28">
                  <h2 className="text-[38px] leading-none sm:text-[46px]">{p.naam}</h2>
                  <p className="mt-5 max-w-sm text-[17px]">{p.intro}</p>
                </div>
              </div>
              <div className="lg:col-span-8">
                {pijlerIndeling[i].map((n, j) => {
                  const d = lijst[n];
                  const slug = dienstSlugs[n];
                  return (
                    <article key={slug} id={slug} className={`scroll-mt-28 ${j > 0 ? "mt-12 border-t border-lijn pt-12" : ""}`}>
                      <h3 className="text-[26px] leading-[1.15] sm:text-[30px]">{d.dienst}</h3>
                      <p className="mt-3 max-w-[38rem] text-[18px] leading-[1.55] text-nachtblauw">{d.belofte}</p>
                      <dl className="mt-8 grid gap-x-12 gap-y-7 sm:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
                        <div>
                          <dt className={label}>Wat u krijgt</dt>
                          <dd className="mt-3">
                            <ul className="space-y-2.5 text-[16px] text-nachtblauw">
                              {d.krijgt.map((k) => (
                                <li key={k} className="flex gap-3">
                                  <span aria-hidden="true" className="mt-[10px] h-[6px] w-[6px] flex-none rounded-full bg-hemelblauw" />
                                  {k}
                                </li>
                              ))}
                            </ul>
                          </dd>
                        </div>
                        <div className="space-y-6">
                          <div>
                            <dt className={label}>Voor wie</dt>
                            <dd className="mt-2 text-[16px]">{d.voorWie}</dd>
                          </div>
                          <div>
                            <dt className={label}>Vorm</dt>
                            <dd className="mt-2 text-[16px]">{d.vorm}</dd>
                          </div>
                        </div>
                      </dl>
                      <PijlLink href={kennismakingHref(undefined, plannerOnderwerp[slug])} className="mt-8">
                        {kennismaking.knop}
                      </PijlLink>
                    </article>
                  );
                })}
              </div>
            </div>
          </Container>
        </section>
      ))}

      {/* Voorbeelden: de twee afdelingspagina's */}
      <section className="border-t border-lijn py-20 sm:py-24">
        <Container>
          <div className="max-w-2xl">
            <h2 className="text-[32px] leading-[1.1] sm:text-[42px]">{voorbeelden.kop}</h2>
            <p className="mt-5 text-[18px]">{voorbeelden.intro}</p>
          </div>
          <div className="mt-12 grid gap-x-10 gap-y-12 md:grid-cols-2">
            {[
              { href: "/hr", titel: "HR & P&O", tekst: voorbeelden.hr, src: "/fotos/sfeer/hr-werkplek.jpg", alt: "Een HR-medewerker bladert door een dossiermap aan een bureau" },
              { href: "/communicatie", titel: "Communicatie", tekst: voorbeelden.communicatie, src: "/fotos/sfeer/communicatie-drukproef.jpg", alt: "Een communicatiemedewerker corrigeert een drukproef met potlood" },
            ].map((v) => (
              <Link key={v.href} href={v.href} className="group block rounded-[var(--radius-lg)]">
                <Foto src={v.src} alt={v.alt} ratio="16/10" sizes="(min-width: 768px) 540px, 100vw" />
                <h3 className="mt-6 text-[26px] group-hover:text-hemel-diep">{v.titel}</h3>
                <p className="mt-2 max-w-md text-[16.5px]">{v.tekst}</p>
                <span className="zp-pijl mt-4">
                  {voorbeelden.linktekst}
                  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M2.5 8h10M8.5 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <AfsluitBand kop={cta.kop} tekst={metMinuten(cta.tekst)} knop={cta.knop} href={kennismakingHref()} />
    </>
  );
}
