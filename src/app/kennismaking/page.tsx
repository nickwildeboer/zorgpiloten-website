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
    <section className="pb-20 pt-10 sm:pb-28 lg:pt-12">
      <Container>
        <div className="max-w-[40rem]">
          <h1 className="max-w-[16ch] text-[clamp(2.6rem,4.8vw,3.9rem)] leading-[1.03]">{hero.kop}</h1>
          <p className="mt-6 max-w-[34rem] text-[20px] leading-[1.5] text-nachtblauw">{metMinuten(hero.intro)}</p>
          <ol className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-[15px] text-nachtblauw">
            {hero.stappen.map((stap, i) => (
              <li key={stap} className="flex items-center gap-3">
                <span aria-hidden="true" className="grid h-7 w-7 flex-none place-items-center rounded-full border border-lijn-koel bg-wolk text-[13px] font-semibold">
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
