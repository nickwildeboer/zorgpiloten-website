import type { Metadata } from "next";
import { HrHero } from "@/components/hr/HrHero";
import { HrDemo } from "@/components/hr/HrTaaksimulator";
import { LeidinggevendeNoot } from "@/components/hr/LeidinggevendeNoot";
import { Portret } from "@/components/home/Portret";
import { hrPagina } from "@/content/paginas";
import { mensen } from "@/content/site";

export const metadata: Metadata = {
  title: hrPagina.meta.titel,
  description: hrPagina.meta.beschrijving,
  alternates: { canonical: "/hr" },
};

/* Secties: hero (wit, werkblad op creme), taken (wit), demo (creme), noot van Hugo (wit), slot (hemel-zacht). */
export default function HrPagina() {
  return (
    <>
      <HrHero />
      <HrDemo
        tussen={<LeidinggevendeNoot />}
        portretten={
          <>
            <Portret src={mensen.hugo.portret} naam={mensen.hugo.naam} initialen="HB" grootte={48} rand="hemel-zacht" />
            <Portret src={mensen.nick.portret} naam={mensen.nick.naam} initialen="NW" grootte={48} rand="hemel-zacht" />
          </>
        }
      />
    </>
  );
}
