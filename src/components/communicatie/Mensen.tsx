import { Bovenkop, Container } from "@/components/ui";
import { Foto } from "@/components/Foto";

/** Wie er aan tafel zit: Hugo op het podium, Nick die bouwt. */
export function Mensen() {
  return (
    <section className="py-16 sm:py-24" aria-labelledby="mensen-kop">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
          <div className="relative">
            <Foto src="/fotos/hugo-keynote.jpg" alt="Hugo van den Berk geeft een keynote" ratio="3/2" sizes="(min-width: 1024px) 55vw, 100vw" />
          </div>

          <div>
            <Bovenkop>Wie er aan tafel zit</Bovenkop>
            <h2 id="mensen-kop" className="mt-3 text-[30px] sm:text-[40px]">
              Hugo weet waar een communicatieafdeling tijd verliest.
            </h2>

            <ul className="mt-8 space-y-5">
              <li>
                <p className="font-medium text-nachtblauw">Hugo van den Berk, MSc</p>
                <p className="mt-1 text-[15px] leading-snug">Ruim 15 jaar Directeur Marketing & Communicatie en MT-lid, Catharina Ziekenhuis.</p>
              </li>
              <li className="flex items-center gap-4">
                <Foto src="/fotos/nick-portret-nick.jpg" alt="Nick Wildeboer" ratio="1/1" sizes="80px" positie="center 25%" className="w-16 shrink-0 sm:w-20" />
                <div>
                  <p className="font-medium text-nachtblauw">Nick Wildeboer, MSc</p>
                  <p className="mt-1 text-[15px] leading-snug">Bouwt het voorwerk veilig in uw eigen omgeving.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
