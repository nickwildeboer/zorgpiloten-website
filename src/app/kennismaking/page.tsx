import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { Gespreksvoorbereider } from "@/components/over-ons/Gespreksvoorbereider";
import { Portret } from "@/components/over-ons/Portret";
import { metMinuten } from "@/lib/navigatie";
import { kennismakingPagina } from "@/content/site";

export const metadata: Metadata = {
  title: kennismakingPagina.meta.titel,
  description: metMinuten(kennismakingPagina.meta.beschrijving),
  alternates: { canonical: "/kennismaking" },
};

export default function KennismakingPagina() {
  const { hero } = kennismakingPagina;
  return (
    <section className="bg-hemel-zacht pb-20 pt-14 sm:pb-28 sm:pt-20">
      <Container>
        <div className="max-w-2xl">
          <h1 className="text-[clamp(2.3rem,4.4vw,3.4rem)] leading-[1.05]">{hero.kop}</h1>
          <p className="mt-6 text-[19px] leading-[1.6] text-nachtblauw">{metMinuten(hero.intro)}</p>
          <ol className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-[15px] text-nachtblauw">
            {hero.stappen.map((stap, i) => (
              <li key={stap} className="flex items-center gap-2.5">
                <span aria-hidden="true" className="grid h-6 w-6 place-items-center rounded-full bg-wolk text-[13px] font-semibold">
                  {i + 1}
                </span>
                {stap}
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-14">
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
