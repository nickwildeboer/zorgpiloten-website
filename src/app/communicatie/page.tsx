import type { Metadata } from "next";
import { Sectie, SectieKop } from "@/components/ui";
import { CommHero } from "@/components/communicatie/CommHero";
import { CommSchakelaar } from "@/components/communicatie/CommSchakelaar";

export const metadata: Metadata = {
  title: "Communicatie",
  description:
    "Van jargon naar begrijpelijke taal. Probeer de B1-schakelaar en zie hoe het voorwerk voor folders, nieuwsbrief, werving, website en crisis klaarstaat voor de adviseur.",
  alternates: { canonical: "/communicatie" },
};

export default function CommunicatiePagina() {
  return (
    <>
      <CommHero />

      <Sectie id="schakelaar" className="scroll-mt-16 border-t border-lijn">
        <SectieKop
          titel="Zet de schakelaar om"
          intro="Kies een taak en zie wat er binnenkomt en wat er klaarligt. Alle voorbeelden zijn fictief. De adviseur tekent altijd af."
        />
        <div className="mt-10">
          <CommSchakelaar />
        </div>
      </Sectie>
    </>
  );
}
