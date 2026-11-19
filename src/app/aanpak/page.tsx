import type { Metadata } from "next";
import { AfsluitBand, Container, PijlLink } from "@/components/ui";
import { Foto } from "@/components/Foto";
import { Portret } from "@/components/over-ons/Portret";
import { kennismakingHref, metMinuten } from "@/lib/navigatie";
import { aanpak } from "@/content/site";

export const metadata: Metadata = {
  title: aanpak.meta.titel,
  description: aanpak.meta.beschrijving,
  alternates: { canonical: "/aanpak" },
};

export default function AanpakPagina() {
  const { hero, stappen, rollen, principes, cta } = aanpak;
  return (
    <>
      <section className="pb-20 pt-14 sm:pb-24 sm:pt-20">
        <Container>
          <div className="grid items-center gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
            <div>
              <h1 className="text-[clamp(2.4rem,4.8vw,3.75rem)] leading-[1.05]">{hero.kop}</h1>
              <p className="mt-6 max-w-[36rem] text-[19px] leading-[1.6]">{hero.intro}</p>
            </div>
            <Foto
              src="/fotos/sfeer/overleg-whiteboard.jpg"
              alt="Twee collega's hangen briefjes bij een processchema op een whiteboard, het team kijkt mee vanaf tafel"
              ratio="16/11"
              priority
              sizes="(min-width: 1024px) 540px, 100vw"
              positie="55% 40%"
            />
          </div>
        </Container>
      </section>

      {/* De vijf stappen op één koers */}
      <section className="border-y border-lijn-koel bg-creme py-20 sm:py-28" style={{ ["--zp-vlak" as string]: "var(--creme)" }}>
        <Container>
          <ol className="zp-koers-rij !gap-14">
            {stappen.map((s, i) => (
              <li key={s.stap} className="!pl-10 sm:!pl-14">
                <span className="zp-stop" data-doel={i === stappen.length - 1} aria-hidden="true" />
                <div className="grid gap-x-12 gap-y-4 lg:grid-cols-12">
                  <div className="lg:col-span-4">
                    <p className="text-[13px] font-semibold text-nachtblauw-zacht">Stap {i + 1}</p>
                    <h2 className="mt-1.5 text-[34px] leading-none sm:text-[40px]">{s.stap}</h2>
                  </div>
                  <div className="lg:col-span-8">
                    <p className="font-display text-[22px] font-semibold leading-snug text-nachtblauw">{s.kop}</p>
                    <p className="mt-3 max-w-[38rem] text-[17px]">{s.tekst}</p>
                    <p className="mt-5 max-w-[38rem] border-t border-lijn-koel pt-4 text-[15.5px] text-nachtblauw">
                      <span className="mr-2 font-semibold">Opbrengst</span>
                      {s.opbrengst}
                    </p>
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

      {/* Werkafspraken */}
      <section className="border-t border-lijn-koel bg-creme py-20 sm:py-28">
        <Container>
          <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <h2 className="text-[32px] leading-[1.1] sm:text-[42px]">{principes.kop}</h2>
              </div>
            </div>
            <dl className="grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:col-span-8">
              {principes.principes.map((p, i) => (
                <div key={p.titel} className="border-t border-lijn-koel pt-6">
                  <dt className="font-display text-[21px] font-semibold leading-snug text-nachtblauw">{p.titel}</dt>
                  <dd className="mt-3 text-[16.5px]">
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
