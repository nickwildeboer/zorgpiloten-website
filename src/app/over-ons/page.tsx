import type { Metadata } from "next";
import { Container, Knop, Sectie, SectieKop } from "@/components/ui";
import { Foto } from "@/components/Foto";
import { Zon, Wolk } from "@/components/Horizon";
import { Profiel } from "@/components/over-ons/Profielen";
import { Gespreksvoorbereider } from "@/components/over-ons/Gespreksvoorbereider";
import { Portret } from "@/components/over-ons/Portret";

export const metadata: Metadata = {
  title: "Over ons en taakgesprek plannen",
  description:
    "Hugo van den Berk, MSc en Nick Wildeboer, MSc. Bestuurservaring uit het ziekenhuis, gekoppeld aan zorg-ICT en bouwkracht. Stel in drie klikken uw taakgesprek van 45 minuten samen.",
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
                <Knop href="#taakgesprek" variant="secundair">
                  Stel uw taakgesprek samen
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

      {/* Gespreksvoorbereider als call-to-action-band */}
      <Sectie id="taakgesprek" className="scroll-mt-16 bg-hemel-zacht">
        <SectieKop
          bovenkop="Taakgesprek"
          titel="Stel in drie klikken uw taakgesprek samen"
          intro="Kies afdeling, taak en tijd. De agenda staat er meteen."
        />
        <div className="mt-10">
          <Gespreksvoorbereider
            portretten={
              <span className="flex -space-x-3">
                <Portret wie="hugo" className="h-12 w-12" tekstClass="text-[14px]" />
                <Portret wie="nick" className="h-12 w-12" tekstClass="text-[14px]" />
              </span>
            }
          />
        </div>
      </Sectie>
    </>
  );
}
