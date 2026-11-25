import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AfsluitBand, Container, Knop, PijlLink, SectieKop } from "@/components/ui";
import { DuotoonFilter, Foto } from "@/components/Foto";
import { Portret } from "@/components/home/Portret";
import { Icoon, type IcoonNaam } from "@/components/home/Iconen";
import { Werkblad } from "@/components/home/Werkblad";
import { kennismakingHref, metMinuten } from "@/lib/navigatie";
import { dienstSlugs, home, homeBeeld, mensen, pijlerIndeling } from "@/content/site";

export const metadata: Metadata = {
  title: { absolute: home.meta.titel },
  description: home.meta.beschrijving,
  alternates: { canonical: "/" },
};

const herkenningIconen: IcoonNaam[] = ["aan", "assistent", "plakken", "document"];
const pijlerIconen: IcoonNaam[] = ["lamp", "muts", "bot", "kompas"];
const rolIconen: IcoonNaam[] = ["assistent", "aftekenen"];

/** Zet één deel van een zin zwaarder, zonder de tekst zelf te veranderen. */
function metNadruk(tekst: string, deel: string) {
  const i = tekst.indexOf(deel);
  if (i < 0) return tekst;
  return (
    <>
      {tekst.slice(0, i)}
      <strong className="font-semibold">{deel}</strong>
      {tekst.slice(i + deel.length)}
    </>
  );
}

export default function Home() {
  const { hero, oprichtersKort, herkenning, doen, wie, aanpak, cta } = home;
  const { beslist } = homeBeeld;
  return (
    <>
      <DuotoonFilter />

      {/* Hero: de belofte links, het werkblad met de demo rechts */}
      <section className="pb-16 pt-10 sm:pb-24 lg:pt-12">
        <Container>
          <div className="grid items-center gap-x-12 gap-y-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
            <div>
              <h1 className="max-w-[12ch] text-[clamp(2.6rem,4.8vw,3.9rem)] leading-[1.03]">{hero.kop}</h1>
              <p className="mt-6 max-w-[30rem] text-[20px] leading-[1.5] text-nachtblauw">{homeBeeld.hero.zin}</p>
              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
                <Knop href={kennismakingHref()}>{hero.knop}</Knop>
                <PijlLink href="/diensten">{hero.tweedeLink}</PijlLink>
              </div>
              <div className="mt-10 flex items-center gap-4">
                <div className="flex -space-x-3">
                  <Portret src={mensen.hugo.portret} naam={mensen.hugo.naam} initialen="HB" grootte={48} rand="wit" />
                  <Portret src={mensen.nick.portret} naam={mensen.nick.naam} initialen="NW" grootte={48} rand="wit" />
                </div>
                <p className="text-[15px] text-nachtblauw">{homeBeeld.hero.mensen}</p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[var(--radius-lg)] bg-creme px-3 pb-3 pt-14 sm:px-8 sm:pb-8 sm:pt-20 lg:px-10 lg:pb-10">
              <span aria-hidden="true" className="absolute right-8 top-6 aspect-[2/1] w-[180px] rounded-t-full bg-zandgeel sm:right-14 sm:w-[240px]" />
              <Werkblad />
            </div>
          </div>
        </Container>
      </section>

      {/* Herkenning: vier situaties, elk met een icoon */}
      <section className="pb-20 pt-4 sm:pb-28">
        <Container>
          <SectieKop titel={herkenning.kop} />
          <ul className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {herkenning.situaties.map((s, i) => (
              <li key={s} className="border-t border-lijn-koel pt-7 text-nachtblauw">
                <Icoon naam={herkenningIconen[i]} grootte={32} />
                <p className="mt-5 max-w-[24ch] font-display text-[21px] font-semibold leading-snug">{s}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* De route: vier stappen, met de onderdelen eronder */}
      <section className="bg-creme py-20 sm:py-28">
        <Container>
          <SectieKop titel={doen.kop} />
          <div className="mt-14 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {doen.pijlers.map((p, i) => (
              <div key={p.naam} className="flex flex-col">
                <Icoon naam={pijlerIconen[i]} grootte={32} className="text-nachtblauw" />
                <h3 className="mt-5 text-[26px]">{p.naam}</h3>
                <p className="mt-2 text-[16px] leading-[1.5]">{homeBeeld.pijlerRegels[i]}</p>
                <ul className="mt-6 space-y-3 border-t border-lijn-koel pt-5 text-[15px]">
                  {pijlerIndeling[i].map((n) => (
                    <li key={dienstSlugs[n]}>
                      <Link
                        href={`/diensten#${dienstSlugs[n]}`}
                        className="font-semibold text-nachtblauw underline decoration-lijn-koel decoration-1 underline-offset-4 transition-colors hover:text-hemel-diep hover:decoration-current"
                      >
                        {doen.diensten[n].naam}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <PijlLink href="/diensten" className="mt-14">
            {doen.link}
          </PijlLink>
        </Container>
      </section>

      {/* De professional beslist: de werkfoto in duotoon met de werkregel */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="relative overflow-hidden rounded-[var(--radius-lg)] bg-nachtblauw lg:flex lg:min-h-[540px] lg:items-center">
            <div className="relative aspect-[3/2] lg:absolute lg:inset-0 lg:aspect-auto">
              <Image
                src="/fotos/hugo-training.jpg"
                alt={beslist.foto}
                fill
                sizes="(min-width: 1152px) 1088px, 100vw"
                className="zp-duotoon object-cover"
                style={{ objectPosition: "68% 35%" }}
              />
              <div aria-hidden="true" className="zp-scrim absolute inset-0" />
            </div>
            <div className="relative px-6 pb-9 pt-2 sm:px-10 sm:pb-12 lg:max-w-[33rem] lg:px-14 lg:py-16">
              <h2 className="text-[34px] leading-[1.06] sm:text-[48px]" style={{ color: "var(--on-ink)" }}>
                {beslist.kop}
              </h2>
              <p className="mt-5 max-w-[28ch] text-[20px] leading-[1.5]" style={{ color: "var(--on-ink)" }}>
                {beslist.regel}
              </p>
              <ul className="mt-10 grid gap-6 border-t pt-6 sm:grid-cols-2" style={{ borderColor: "var(--white-15)" }}>
                {beslist.rollen.map((r, i) => (
                  <li key={r.wie} style={{ color: "var(--on-ink)" }}>
                    <Icoon naam={rolIconen[i]} />
                    <p className="mt-3 font-semibold">{r.wie}</p>
                    <p className="mt-0.5 text-[16px]" style={{ color: "var(--on-ink-soft)" }}>
                      {r.wat}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Wie wij zijn: Hugo en Nick in dezelfde duotoon, met hetzelfde gewicht */}
      <section className="pb-20 sm:pb-28">
        <Container>
          <SectieKop titel={wie.kop} />
          <div className="mt-12 grid gap-x-10 gap-y-14 md:grid-cols-2">
            {(["hugo", "nick"] as const).map((k) => (
              <figure key={k}>
                <Foto
                  src={mensen[k].portret}
                  alt={`Portret van ${mensen[k].naam}`}
                  ratio="4/5"
                  sizes="(min-width: 1152px) 524px, (min-width: 768px) 46vw, 100vw"
                  positie={mensen[k].positie}
                  duotoon
                />
                <figcaption className="mt-6">
                  <h3 className="text-[20px]">{mensen[k].naam}</h3>
                  <p className="mt-3 max-w-[32ch] font-display text-[22px] font-medium leading-[1.3] text-nachtblauw sm:text-[24px]">
                    {metNadruk(oprichtersKort[k], homeBeeld.nadruk[k])}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
          <PijlLink href="/over-ons" className="mt-12">
            {wie.link}
          </PijlLink>
        </Container>
      </section>

      {/* Aanpak: vijf stops op één koers, alleen de namen */}
      <section className="bg-creme py-20 sm:py-28" style={{ ["--zp-vlak" as string]: "var(--creme)" }}>
        <Container>
          <SectieKop titel={aanpak.kop} />
          <ol className="zp-koers-rij mt-14" data-liggend="true">
            {aanpak.stappen.map((s, i) => (
              <li key={s.naam}>
                <span className="zp-stop" data-doel={i === aanpak.stappen.length - 1} aria-hidden="true" />
                <h3 className="text-[22px]">{s.naam}</h3>
              </li>
            ))}
          </ol>
          <PijlLink href="/aanpak" className="mt-12">
            {aanpak.link}
          </PijlLink>
        </Container>
      </section>

      <AfsluitBand kop={cta.kop} tekst={metMinuten(cta.tekst)} knop={cta.knop} href={kennismakingHref()} />
    </>
  );
}
