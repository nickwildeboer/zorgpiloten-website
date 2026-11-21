import type { ReactNode } from "react";
import { Container, Knop } from "@/components/ui";
import { Icoon } from "@/components/home/Iconen";
import { kennismaking } from "@/lib/navigatie";

/**
 * De afsluitende band van een afdelingspagina, in de vorm van de AfsluitBand op de homepage.
 * Neemt de taak mee die de bezoeker in de demo koos. Geen foto: hooguit de kleine portretten (children).
 */
export function TaakCta({ kop, tekst, taakTitel, href, children }: { kop: string; tekst: string; taakTitel: string; href: string; children?: ReactNode }) {
  return (
    <section className="bg-hemel-zacht py-20 sm:py-24" aria-labelledby="taak-cta-kop">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="max-w-2xl">
            {children && <div className="mb-6 flex -space-x-3">{children}</div>}
            <h2 id="taak-cta-kop" className="text-[32px] leading-[1.1] sm:text-[42px]">
              {kop}
            </h2>
            <p className="mt-4 max-w-xl text-[18px] leading-[1.6] text-nachtblauw">{tekst}</p>
          </div>
          <div className="flex flex-col items-start gap-4 lg:items-end">
            <p className="inline-flex items-center gap-2 rounded-full bg-wolk px-4 py-1.5 text-[15px] font-semibold text-nachtblauw">
              <Icoon naam="vink" grootte={20} />
              <span>
                <span className="sr-only">Gekozen taak: </span>
                {taakTitel}
              </span>
            </p>
            <Knop href={href}>{kennismaking.knop}</Knop>
          </div>
        </div>
      </Container>
    </section>
  );
}
