import { Container, Knop } from "@/components/ui";
import { Icoon } from "@/components/home/Iconen";
import { kennismakingHref } from "@/lib/navigatie";
import { hrPagina } from "@/content/paginas";
import { hrTaken } from "./hrTaken";
import { TaakIcoon } from "./TaakIconen";

/* De vraag van de verpleegkundige uit de werkplek verderop: één bron. */
const cao = hrTaken[0];

/*
 * Eén rustige beweging bij het laden: het concept tekent zich in drie balkjes uit en wordt afgetekend.
 * Alleen CSS (@starting-style), dus zonder JavaScript en bij reduced motion staat meteen de eindstand.
 */
const op = "transition-[opacity,translate] duration-700 ease-out translate-y-0 starting:translate-y-2 starting:opacity-0 motion-reduce:transition-none";
const balk = "h-3 origin-left rounded-full bg-lijn-koel transition-[scale] duration-[900ms] ease-out scale-x-100 starting:scale-x-0 motion-reduce:transition-none";

export function HrHero() {
  const { hero } = hrPagina;
  return (
    <section className="pb-16 pt-10 sm:pb-24 lg:pt-12">
      <Container>
        <div className="grid items-center gap-x-12 gap-y-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <div>
            <h1 className="max-w-[14ch] text-[clamp(2.6rem,4.8vw,3.9rem)] leading-[1.03]">{hero.kop}</h1>
            <p className="mt-6 max-w-[30rem] text-[20px] leading-[1.5] text-nachtblauw">{hero.zin}</p>
            <Knop href={kennismakingHref("hr")} className="mt-8">
              Plan een kennismaking
            </Knop>
          </div>

          <div className="relative overflow-hidden rounded-[var(--radius-lg)] bg-creme px-3 pb-3 pt-14 sm:px-8 sm:pb-8 sm:pt-20 lg:px-10 lg:pb-10">
            <span aria-hidden="true" className="absolute right-8 top-6 aspect-[2/1] w-[180px] rounded-t-full bg-zandgeel sm:right-14 sm:w-[240px]" />
            <figure className="relative rounded-[var(--radius-md)] bg-wolk p-5 shadow-kaart sm:p-7">
              <figcaption className="flex items-center gap-3 border-b border-lijn-koel pb-3 text-nachtblauw">
                <TaakIcoon naam="vraag" grootte={20} />
                <span className="font-display text-[19px] font-semibold">Cao-loket</span>
                <span className="ml-auto text-[14px] text-nachtblauw-zacht max-sm:hidden">Verpleegkundige</span>
              </figcaption>

              <p className="mt-5 max-w-[30rem] rounded-[var(--radius-md)] rounded-tl-sm bg-creme px-5 py-4 text-[17px] leading-[1.45] text-nachtblauw">
                {cao.binnen.tekst}
              </p>

              <div className="ml-auto mt-6 max-w-[26rem]">
                <span className={`inline-flex items-center rounded-full bg-zandgeel px-4 py-1.5 text-[14px] font-semibold text-nachtblauw delay-300 ${op}`}>
                  Concept
                </span>
                <div aria-hidden="true" className="mt-4 space-y-2.5">
                  <div className={`w-full delay-700 ${balk}`} />
                  <div className={`w-[90%] delay-[1100ms] ${balk}`} />
                  <div className={`w-[58%] delay-[1500ms] ${balk}`} />
                </div>
              </div>

              <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-lijn-koel pt-4">
                <span className="inline-flex items-center gap-2.5 font-semibold text-nachtblauw">
                  <Icoon naam="aftekenen" />
                  {cao.rol}
                </span>
                <span className={`inline-flex items-center gap-1.5 rounded-full bg-nachtblauw px-4 py-1.5 text-[14px] font-semibold text-creme delay-[2500ms] ${op}`}>
                  <Icoon naam="vink" grootte={20} />
                  Afgetekend
                </span>
              </div>
            </figure>
          </div>
        </div>
      </Container>
    </section>
  );
}
