import Image from "next/image";
import { Bovenkop, Container, Knop } from "@/components/ui";
import { Zon } from "@/components/Horizon";

/**
 * De ene call-to-action-band van de pagina, op hemel-zacht.
 * Neemt de taak mee die de bezoeker in de demo koos.
 * Mag in een client component staan: gebruikt next/image met een bestaand pad.
 */
export function TaakCta({ taakTitel, href, foto }: { taakTitel: string; href: string; foto: { src: string; alt: string } }) {
  return (
    <section className="relative overflow-hidden bg-hemel-zacht py-16 sm:py-24" aria-labelledby="taak-cta-kop">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <div className="relative">
            <Bovenkop>Taakgesprek van 45 minuten</Bovenkop>
            <h2 id="taak-cta-kop" className="mt-3 text-[32px] sm:text-[44px]">
              Reken deze taak samen met ons door.
            </h2>
            <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-wolk px-4 py-1.5 text-[15px] text-nachtblauw">
              <span className="koers-stop" data-gedaan="true" aria-hidden="true" />
              <span>
                <span className="sr-only">Gekozen taak: </span>
                {taakTitel}
              </span>
            </p>
            <p className="mt-4 max-w-md text-lg text-nachtblauw">Met uw eigen cijfers. Daarna weet u of de taak de moeite waard is.</p>
            <Knop href={href} className="mt-8">
              Plan een taakgesprek
            </Knop>
          </div>
          <div className="relative">
            <Zon className="absolute -top-10 right-10 h-20 w-40" />
            <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)] bg-wolk">
              <Image src={foto.src} alt={foto.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
