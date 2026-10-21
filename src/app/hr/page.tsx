import type { Metadata } from "next";
import { Sectie, SectieKop } from "@/components/ui";
import { HrHero } from "@/components/hr/HrHero";
import { HrTaaksimulator } from "@/components/hr/HrTaaksimulator";
import { LeidinggevendeNoot } from "@/components/hr/LeidinggevendeNoot";

export const metadata: Metadata = {
  title: "HR & P&O",
  description:
    "Cao-vragen, verzuimdossiers, vacatures, onboarding en BIG-bewaking. Probeer in de taaksimulator hoe het voorwerk klaarstaat en jouw HR-team aftekent.",
  alternates: { canonical: "/hr" },
};

export default function HrPagina() {
  return (
    <>
      <HrHero />

      <Sectie id="taaksimulator" className="scroll-mt-16 border-t border-lijn">
        <SectieKop
          titel="Probeer het met één HR-taak"
          intro="Kies een taak. Er komt een verzoek binnen, het voorwerk zet het antwoord klaar en jij beslist of het de deur uitgaat. Alles op deze werkplek is een voorbeeld."
        />
        <div className="mt-10">
          <HrTaaksimulator />
        </div>
      </Sectie>

      <LeidinggevendeNoot />
    </>
  );
}
