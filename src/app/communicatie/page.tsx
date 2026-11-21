import type { Metadata } from "next";
import { DuotoonFilter } from "@/components/Foto";
import { CommHero } from "@/components/communicatie/CommHero";
import { CommDemo } from "@/components/communicatie/CommSchakelaar";
import { Mensen } from "@/components/communicatie/Mensen";
import { Portret } from "@/components/home/Portret";
import { communicatiePagina } from "@/content/paginas";
import { mensen } from "@/content/site";

export const metadata: Metadata = {
  title: communicatiePagina.meta.titel,
  description: communicatiePagina.meta.beschrijving,
  alternates: { canonical: "/communicatie" },
};

/* Secties: hero (wit, brief op creme), taken (wit), demo (creme), Hugo (wit, duotoon), slot (hemel-zacht). */
export default function CommunicatiePagina() {
  return (
    <>
      <DuotoonFilter />
      <CommHero />
      <CommDemo
        tussen={<Mensen />}
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
