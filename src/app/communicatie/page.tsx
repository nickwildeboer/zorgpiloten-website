import type { Metadata } from "next";
import { CommHero } from "@/components/communicatie/CommHero";
import { CommDemo } from "@/components/communicatie/CommSchakelaar";
import { Mensen } from "@/components/communicatie/Mensen";

export const metadata: Metadata = {
  title: "Communicatie",
  description:
    "Van jargon naar begrijpelijke taal. Probeer de B1-schakelaar en zie hoe het voorwerk voor folders, nieuwsbrief, werving, website en crisis klaarstaat voor de adviseur.",
  alternates: { canonical: "/communicatie" },
};

/* Secties: hero (creme), schakelaar (wolk), wie er aan tafel zit (creme), taakgesprek (hemel-zacht). */
export default function CommunicatiePagina() {
  return (
    <>
      <CommHero />
      <CommDemo tussen={<Mensen />} />
    </>
  );
}
