import type { Metadata } from "next";
import { HrHero } from "@/components/hr/HrHero";
import { HrDemo } from "@/components/hr/HrTaaksimulator";
import { LeidinggevendeNoot } from "@/components/hr/LeidinggevendeNoot";

export const metadata: Metadata = {
  title: "HR & P&O",
  description:
    "Cao-vragen, verzuim, vacatures, onboarding en BIG. Probeer in de taaksimulator hoe het voorwerk klaarstaat en uw HR-team aftekent.",
  alternates: { canonical: "/hr" },
};

/* Secties: hero (creme), taaksimulator (wolk), noot van Hugo (creme), taakgesprek (hemel-zacht). */
export default function HrPagina() {
  return (
    <>
      <HrHero />
      <HrDemo tussen={<LeidinggevendeNoot />} />
    </>
  );
}
