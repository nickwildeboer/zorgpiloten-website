import type { Metadata } from "next";
import { Container, Knop, Sectie } from "@/components/ui";
import { Foto } from "@/components/Foto";
import { Zon, Wolk } from "@/components/Horizon";
import { Profiel } from "@/components/over-ons/Profielen";
import { Portret } from "@/components/over-ons/Portret";
import { taakgesprek, taakgesprekHref } from "@/lib/navigatie";

export const metadata: Metadata = {
  title: "Over ons",
  description: `Hugo van den Berk, MSc en Nick Wildeboer, MSc. Bestuurservaring uit het ziekenhuis, gekoppeld aan zorg-ICT en bouwkracht. Plan een taakgesprek van ${taakgesprek.minuten} minuten.`,
};

const duo = [
  { naam: "Hugo van den Berk", src: "/fotos/hugo-portret.jpg", positie: "50% 30%", rol: "Team en verandering", href: "#hugo" },
  { naam: "Nick Wildeboer", src: "/fotos/nick-portret-nick.jpg", positie: "50% 20%", rol: "Proces en techniek", href: "#nick" },
];

export default function OverOnsPagina() {
  return (
    <>
      {/* Hero: wie er aan tafel zit */}
      <section className="overflow-hidden pb-16 pt-12 sm:pb-24 sm:pt-16">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-16">
            <div>
              <p className="zp-eyebrow">Over ons</p>
              <h1 className="mt-4 text-[38px] sm:text-[52px] lg:text-[56px]">Bestuurservaring uit het ziekenhuis, gekoppeld aan zorg-ICT en bouwkracht.</h1>
              <p className="mt-5 max-w-lg text-lg">Twee academisch opgeleide specialisten uit de zorg zelf.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Knop href={taakgesprekHref()} variant="secundair">
                  Plan een taakgesprek
                </Knop>
              </div>
            </div>

            <div className="relative">
              <Zon className="absolute -top-6 left-1/2 h-28 w-56 -translate-x-1/2 sm:h-36 sm:w-72" />
              <Wolk className="absolute left-0 top-16 h-5 w-28" kleur="var(--wolk)" />
              <ul className="relative grid grid-cols-2 gap-4 pt-10 sm:gap-6">
                {duo.map((m, i) => (
                  <li key={m.naam} className={i === 1 ? "translate-y-10" : ""}>
                    <a href={m.href} className="group block rounded-[var(--radius-lg)]">
                      <Foto
                        src={m.src}
                        alt={`Portret van ${m.naam}`}
                        ratio="3/4"
                        priority
                        sizes="(min-width: 1024px) 260px, 45vw"
                        positie={m.positie}
                        className="shadow-kaart"
                      />
                      <span className="mt-3 block font-display text-[18px] font-bold leading-tight text-nachtblauw group-hover:text-hemel-diep sm:text-[20px]">
                        {m.naam}
                      </span>
                      <span className="block text-sm">{m.rol}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <Sectie toon="wolk" className="border-y border-lijn">
        <Profiel wie="hugo" />
      </Sectie>

      <Sectie>
        <Profiel wie="nick" spiegel />
      </Sectie>

      {/* Call-to-action-band. Het anker blijft voor oude links naar /over-ons#taakgesprek. */}
      <section id="taakgesprek" className="scroll-mt-16 bg-hemel-zacht py-14 sm:py-20">
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex max-w-xl items-start gap-5">
              <span className="hidden flex-none -space-x-3 sm:flex">
                <Portret wie="hugo" className="h-14 w-14" tekstClass="text-[15px]" />
                <Portret wie="nick" className="h-14 w-14" tekstClass="text-[15px]" />
              </span>
              <div>
                <h2 className="text-[32px] sm:text-[40px]">Aan tafel met Hugo en Nick</h2>
                <p className="mt-3 text-lg text-nachtblauw">In {taakgesprek.minuten} minuten kiezen we samen één taak en rekenen we die door.</p>
              </div>
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
