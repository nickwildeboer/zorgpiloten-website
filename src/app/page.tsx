import type { Metadata } from "next";
import Link from "next/link";
import { AfsluitBand, Bovenkop, Container, Knop, PijlLink, SectieKop } from "@/components/ui";
import { Foto } from "@/components/Foto";
import { Portret } from "@/components/home/Portret";
import { kennismakingHref, metMinuten } from "@/lib/navigatie";
import { dienstSlugs, home, mensen, pijlerIndeling } from "@/content/site";

export const metadata: Metadata = {
  title: { absolute: home.meta.titel },
  description: home.meta.beschrijving,
  alternates: { canonical: "/" },
};

export default function Home() {
  const { hero, oprichtersKort, herkenning, visie, doen, wie, aanpak, waarom, cta } = home;
  return (
    <>
      {/* Hero: één belofte, twee mensen */}
      <section className="pb-20 pt-12 sm:pb-28 sm:pt-20">
        <Container>
          <div className="grid items-center gap-x-12 gap-y-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.12fr)]">
            <div>
              <Bovenkop>{hero.bovenkop}</Bovenkop>
              <h1 className="mt-6 text-[clamp(2.6rem,5.2vw,4.1rem)] leading-[1.03]">{hero.kop}</h1>
              <p className="mt-7 max-w-[33rem] text-[19px] leading-[1.6]">{hero.tekst}</p>
              <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
                <Knop href={kennismakingHref()}>{hero.knop}</Knop>
                <PijlLink href="/diensten">{hero.tweedeLink}</PijlLink>
              </div>
            </div>

            <div className="grid grid-cols-2 items-start gap-4 sm:gap-5">
              <figure>
                <Foto
                  src="/fotos/hugo-training.jpg"
                  alt="Hugo van den Berk geeft een training aan een team bij het whiteboard"
                  ratio="4/5"
                  priority
                  sizes="(min-width: 1024px) 290px, 46vw"
                  positie="72% 40%"
                />
                <figcaption className="mt-4">
                  <span className="block text-[15px] font-semibold text-nachtblauw">{mensen.hugo.naam}</span>
                  <span className="mt-1 block text-[14px] leading-snug">{oprichtersKort.hugo}</span>
                </figcaption>
              </figure>
              <figure className="mt-10 sm:mt-14">
                <Foto
                  src="/fotos/nick-hero-presentatie.jpg"
                  alt="Nick Wildeboer geeft een training aan een groep"
                  ratio="4/5"
                  priority
                  sizes="(min-width: 1024px) 270px, 46vw"
                  positie="60% 40%"
                />
                <figcaption className="mt-4">
                  <span className="block text-[15px] font-semibold text-nachtblauw">{mensen.nick.naam}</span>
                  <span className="mt-1 block text-[14px] leading-snug">{oprichtersKort.nick}</span>
                </figcaption>
              </figure>
            </div>
          </div>
        </Container>
      </section>

      {/* Herkenning: drie situaties, zonder kaarten */}
      <section className="border-y border-lijn bg-wolk py-20 sm:py-24">
        <Container>
          <div className="grid gap-x-12 gap-y-8 lg:grid-cols-12">
            <h2 className="text-[30px] leading-[1.12] sm:text-[36px] lg:col-span-4">{herkenning.kop}</h2>
            <ul className="lg:col-span-8">
              {herkenning.situaties.map((s, i) => (
                <li key={s.situatie} className={`grid gap-x-10 gap-y-2 py-6 sm:grid-cols-2 ${i > 0 ? "border-t border-lijn" : "pt-0"}`}>
                  <p className="font-display text-[20px] font-semibold leading-snug text-nachtblauw">{s.situatie}</p>
                  <p className="text-[16.5px]">{s.eronder}</p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Visie: het nachtblauwe anker met het ene bewegende moment */}
      <section className="bg-nachtblauw py-24 sm:py-32" style={{ color: "var(--on-ink-soft)" }}>
        <Container>
          <div className="grid items-center gap-x-16 gap-y-14 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Bovenkop opNacht>{visie.bovenkop}</Bovenkop>
              <h2 className="mt-5 max-w-[15ch] text-[36px] leading-[1.06] sm:text-[52px]" style={{ color: "var(--on-ink)" }}>
                {visie.kop}
              </h2>
              <div className="mt-9 max-w-[35rem] space-y-5 text-[18.5px] leading-[1.65]">
                {visie.tekst.map((alinea, i) => (
                  <p key={i} style={i === 0 ? { color: "var(--on-ink)" } : undefined}>
                    {alinea}
                  </p>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5">
              <Foto
                src="/fotos/sfeer/zorg-gang-ochtend.jpg"
                alt="Een lege gang in een zorggebouw bij zonsopkomst"
                ratio="4/5"
                sizes="(min-width: 1024px) 440px, 100vw"
                positie="18% 50%"
                className="zp-opkomst"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Wat wij doen: vier werkwoorden als index */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectieKop bovenkop={doen.bovenkop} titel={doen.kop} intro={doen.intro} />
          <div className="mt-14 border-t border-lijn">
            {doen.pijlers.map((p, i) => (
              <div key={p.naam} className="grid gap-x-10 gap-y-5 border-b border-lijn py-9 lg:grid-cols-12">
                <h3 className="text-[30px] leading-none sm:text-[34px] lg:col-span-3">
                  <Link href={`/diensten#${p.naam.toLowerCase()}`} className="hover:text-hemel-diep">
                    {p.naam}
                  </Link>
                </h3>
                <p className="text-[17px] text-nachtblauw lg:col-span-4">{p.zin}</p>
                <ul className="space-y-5 lg:col-span-5">
                  {pijlerIndeling[i].map((n) => {
                    const d = doen.diensten[n];
                    return (
                      <li key={d.naam}>
                        <Link href={`/diensten#${dienstSlugs[n]}`} className="group block">
                          <span className="block font-semibold text-nachtblauw group-hover:text-hemel-diep">{d.naam}</span>
                          <span className="mt-0.5 block text-[15.5px]">{d.regel}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
          <PijlLink href="/diensten" className="mt-10">
            {doen.link}
          </PijlLink>
        </Container>
      </section>

      {/* Wie wij zijn: het bewijs zit in de mensen */}
      <section className="border-y border-lijn bg-wolk py-20 sm:py-28">
        <Container>
          <SectieKop bovenkop={wie.bovenkop} titel={wie.kop} intro={wie.intro} />
          <div className="mt-14 grid gap-x-14 gap-y-16 md:grid-cols-2">
            {(["hugo", "nick"] as const).map((k) => {
              const m = mensen[k];
              return (
                <article key={k}>
                  <Foto src={m.portret} alt={`Portret van ${m.naam}`} ratio="5/4" sizes="(min-width: 768px) 520px, 100vw" positie={m.positie} />
                  <p className="zp-eyebrow mt-7">{k === "hugo" ? wie.hugoRol : wie.nickRol}</p>
                  <h3 className="mt-3 text-[28px]">{m.naam}</h3>
                  <p className="mt-4 text-[17px]">{k === "hugo" ? wie.hugo : wie.nick}</p>
                  <ul className="mt-6 border-t border-lijn text-[15px] text-nachtblauw">
                    {m.kort.map((regel) => (
                      <li key={regel} className="border-b border-lijn py-3">
                        {regel}
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
          <PijlLink href="/over-ons" className="mt-12">
            {wie.link}
          </PijlLink>
        </Container>
      </section>

      {/* Aanpak: vijf stops op één koers */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectieKop bovenkop={aanpak.bovenkop} titel={aanpak.kop} intro={aanpak.intro} />
          <ol className="zp-koers-rij mt-14" data-liggend="true">
            {aanpak.stappen.map((s, i) => (
              <li key={s.naam}>
                <span className="zp-stop" data-doel={i === aanpak.stappen.length - 1} aria-hidden="true" />
                <p className="text-[13px] font-semibold text-nachtblauw-zacht">Stap {i + 1}</p>
                <h3 className="mt-1.5 text-[22px]">{s.naam}</h3>
                <p className="mt-2.5 text-[15.5px] leading-[1.55]">{s.zin}</p>
              </li>
            ))}
          </ol>
          <PijlLink href="/aanpak" className="mt-12">
            {aanpak.link}
          </PijlLink>
        </Container>
      </section>

      {/* Waarom Zorgpiloten: vier redenen, kop blijft staan */}
      <section className="border-t border-lijn bg-wolk py-20 sm:py-28">
        <Container>
          <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <Bovenkop>{waarom.bovenkop}</Bovenkop>
                <h2 className="mt-4 text-[32px] leading-[1.1] sm:text-[42px]">{waarom.kop}</h2>
              </div>
            </div>
            <dl className="grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:col-span-8">
              {waarom.redenen.map((r) => (
                <div key={r.titel} className="border-t border-lijn pt-6">
                  <dt className="font-display text-[21px] font-semibold leading-snug text-nachtblauw">{r.titel}</dt>
                  <dd className="mt-3 text-[16.5px]">{r.tekst}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      <AfsluitBand kop={cta.kop} tekst={metMinuten(cta.tekst)} knop={cta.knop} href={kennismakingHref()}>
        <div className="mb-7 flex -space-x-3">
          <Portret src={mensen.hugo.portret} naam={mensen.hugo.naam} initialen="HB" grootte={56} rand="hemel-zacht" />
          <Portret src={mensen.nick.portret} naam={mensen.nick.naam} initialen="NW" grootte={56} rand="hemel-zacht" />
        </div>
      </AfsluitBand>
    </>
  );
}
