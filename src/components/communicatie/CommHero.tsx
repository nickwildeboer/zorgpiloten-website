import { Container, Knop } from "@/components/ui";
import { Icoon } from "@/components/home/Iconen";
import { kennismakingHref } from "@/lib/navigatie";
import { communicatiePagina } from "@/content/paginas";
import { alineas } from "./b1Voorbeeld";

/* Drie lastige zinnen uit de voorbeeldbrief verderop: vezelarm dieet, anticoagulantia en sedatie. */
const zinnen = [alineas[1][1], alineas[2][0], alineas[3][0]];
const vertraging = ["delay-[900ms]", "delay-[1900ms]", "delay-[2900ms]"];

/*
 * Eén rustige beweging bij het laden: elke zin springt om naar B1, daarna verschijnt het label.
 * Alleen CSS (@starting-style), dus zonder JavaScript en bij reduced motion staat meteen de B1-versie.
 */
const weg = "transition-opacity duration-300 ease-out opacity-0 starting:opacity-100 motion-reduce:transition-none";
const op = "transition-[opacity,translate] duration-500 ease-out opacity-100 translate-y-0 starting:translate-y-1.5 starting:opacity-0 motion-reduce:transition-none";

export function CommHero() {
  const { hero } = communicatiePagina;
  return (
    <section className="pb-16 pt-10 sm:pb-24 lg:pt-12">
      <Container>
        <div className="grid items-center gap-x-12 gap-y-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <div>
            <h1 className="max-w-[14ch] text-[clamp(2.6rem,4.8vw,3.9rem)] leading-[1.03]">{hero.kop}</h1>
            <p className="mt-6 max-w-[30rem] text-[20px] leading-[1.5] text-nachtblauw">{hero.zin}</p>
            <Knop href={kennismakingHref("communicatie")} className="mt-8">
              Plan een kennismaking
            </Knop>
          </div>

          <div className="relative overflow-hidden rounded-[var(--radius-lg)] bg-creme px-3 pb-3 pt-14 sm:px-8 sm:pb-8 sm:pt-20 lg:px-10 lg:pb-10">
            <span aria-hidden="true" className="absolute right-8 top-6 aspect-[2/1] w-[180px] rounded-t-full bg-zandgeel sm:right-14 sm:w-[240px]" />
            <figure className="relative rounded-[var(--radius-md)] bg-wolk p-5 shadow-kaart sm:p-7">
              <figcaption className="flex flex-wrap items-center gap-3 border-b border-lijn-koel pb-3 text-nachtblauw">
                <Icoon naam="document" grootte={20} />
                <span className="font-display text-[19px] font-semibold">Voorbereiding op uw coloscopie</span>
                <span className={`ml-auto inline-flex items-center gap-1.5 rounded-full bg-nachtblauw px-4 py-1.5 text-[14px] font-semibold text-creme delay-[3700ms] ${op}`}>
                  <Icoon naam="vink" grootte={20} />
                  B1-versie
                </span>
              </figcaption>

              <ol className="mt-2 divide-y divide-lijn-koel">
                {zinnen.map((z, i) => (
                  <li key={z.b1} className="grid py-4">
                    <p aria-hidden="true" className={`[grid-area:1/1] self-center text-[15px] leading-[1.45] text-nachtblauw-zacht ${vertraging[i]} ${weg}`}>
                      {z.origineel}
                    </p>
                    <p className={`[grid-area:1/1] self-center text-[17px] font-medium leading-[1.4] text-nachtblauw ${vertraging[i]} ${op}`}>{z.b1}</p>
                  </li>
                ))}
              </ol>
            </figure>
          </div>
        </div>
      </Container>
    </section>
  );
}
