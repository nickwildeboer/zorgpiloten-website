import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { Zon } from "@/components/Horizon";
import { Gespreksvoorbereider } from "@/components/over-ons/Gespreksvoorbereider";
import { Portret } from "@/components/over-ons/Portret";
import { taakgesprek } from "@/lib/navigatie";

export const metadata: Metadata = {
  title: "Plan een taakgesprek",
  description: `In ${taakgesprek.minuten} minuten kiest u met Hugo van den Berk en Nick Wildeboer één terugkerende taak op HR of Communicatie en rekent die door. Stel uw gesprek samen en kies direct een moment.`,
  alternates: { canonical: "/taakgesprek" },
};

export default function TaakgesprekPagina() {
  return (
    <section className="relative overflow-hidden bg-hemel-zacht pb-16 pt-12 sm:pb-24 sm:pt-16">
      <Zon className="pointer-events-none absolute -right-16 -top-10 hidden h-40 w-80 lg:block" />
      <Container className="relative">
        <div className="max-w-2xl">
          <p className="zp-eyebrow">Taakgesprek</p>
          <h1 className="mt-4 text-[38px] leading-[1.05] sm:text-[52px]">Begin bij één taak die te veel tijd kost</h1>
          <p className="mt-5 text-lg text-nachtblauw">
            In {taakgesprek.minuten} minuten kiest u met Hugo en Nick één taak en rekent die door. Is hij te klein, dan zeggen wij dat.
          </p>
          <ol className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[15px] text-nachtblauw" aria-label="Zo plant u het gesprek">
            {["Kies afdeling en taak", "Schat de tijd per week", "Kies een moment in de agenda"].map((stap, i) => (
              <li key={stap} className="flex items-center gap-2">
                <span aria-hidden="true" className="grid h-6 w-6 place-items-center rounded-full bg-wolk text-[13px] font-semibold ring-1 ring-lijn">
                  {i + 1}
                </span>
                {stap}
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-12">
          <Gespreksvoorbereider
            portretten={
              <span className="flex -space-x-3">
                <Portret wie="hugo" className="h-12 w-12" tekstClass="text-[14px]" />
                <Portret wie="nick" className="h-12 w-12" tekstClass="text-[14px]" />
              </span>
            }
          />
        </div>
      </Container>
    </section>
  );
}
