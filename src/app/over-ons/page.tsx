import type { Metadata } from "next";
import { AfsluitBand, Bovenkop, Container } from "@/components/ui";
import { Foto } from "@/components/Foto";
import { Profiel } from "@/components/over-ons/Profielen";
import { Portret } from "@/components/home/Portret";
import { kennismakingHref, metMinuten } from "@/lib/navigatie";
import { mensen, over } from "@/content/site";

export const metadata: Metadata = {
  title: over.meta.titel,
  description: over.meta.beschrijving,
  alternates: { canonical: "/over-ons" },
};

export default function OverOnsPagina() {
  const { hero, verhaal, cta } = over;
  return (
    <>
      {/* Hero: wie er aan tafel zit */}
      <section className="pb-20 pt-14 sm:pb-28 sm:pt-20">
        <Container>
          <div className="grid items-center gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
            <div>
              <Bovenkop>{hero.bovenkop}</Bovenkop>
              <h1 className="mt-6 text-[clamp(2.4rem,4.8vw,3.75rem)] leading-[1.05]">{hero.kop}</h1>
              <p className="mt-6 max-w-[36rem] text-[19px] leading-[1.6]">{hero.intro}</p>
            </div>
            <ul className="grid grid-cols-2 items-start gap-4 sm:gap-5">
              {(["hugo", "nick"] as const).map((k, i) => (
                <li key={k} className={i === 1 ? "mt-10 sm:mt-14" : ""}>
                  <a href={`#${k}`} className="group block rounded-[var(--radius-lg)]">
                    <Foto src={mensen[k].portret} alt={`Portret van ${mensen[k].naam}`} ratio="4/5" priority sizes="(min-width: 1024px) 270px, 46vw" positie={mensen[k].positie} />
                    <span className="mt-4 block text-[15px] font-semibold text-nachtblauw group-hover:text-hemel-diep">{mensen[k].naam}</span>
                    <span className="mt-1 block text-[14px] leading-snug">{over[k].rol}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Ons verhaal, met het beeldmerk dat de naam uitlegt */}
      <section className="border-y border-lijn bg-wolk py-20 sm:py-28">
        <Container>
          <div className="grid gap-x-14 gap-y-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo/horizon/zorgpiloten-beeldmerk-kleur.svg" alt="" className="h-24 w-auto sm:h-28" />
            </div>
            <div className="lg:col-span-8">
              <Bovenkop>{verhaal.bovenkop}</Bovenkop>
              <h2 className="mt-4 max-w-[20ch] text-[32px] leading-[1.1] sm:text-[42px]">{verhaal.kop}</h2>
              <div className="mt-8 max-w-[38rem] space-y-5 text-[18px] leading-[1.65]">
                {verhaal.tekst.map((alinea, i) => (
                  <p key={i} className={i === 0 ? "text-nachtblauw" : ""}>
                    {alinea}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <Profiel wie="hugo" />
        </Container>
      </section>

      <section className="border-t border-lijn bg-wolk py-20 sm:py-28">
        <Container>
          <Profiel wie="nick" spiegel />
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
