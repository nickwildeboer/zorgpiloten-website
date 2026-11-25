import { Container } from "@/components/ui";
import { Foto } from "@/components/Foto";
import { Portret } from "@/components/home/Portret";
import { communicatiePagina } from "@/content/paginas";
import { mensen } from "@/content/site";

/** Hugo op het podium, in de merkduotoon, met Nick klein ernaast. Vraagt <DuotoonFilter /> op de pagina. */
export function Mensen() {
  const { hugo } = communicatiePagina;
  return (
    <section className="py-20 sm:py-28" aria-labelledby="hugo-kop">
      <Container>
        <div className="grid items-center gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <Foto
            src="/fotos/hugo-keynote.jpg"
            alt="Hugo van den Berk spreekt op een podium tijdens een keynote"
            ratio="3/2"
            positie="40% 45%"
            sizes="(min-width: 1152px) 640px, (min-width: 1024px) 56vw, 100vw"
            duotoon
          />

          <div>
            <h2 id="hugo-kop" className="text-[32px] leading-[1.1] sm:text-[42px]">
              {hugo.kop}
            </h2>
            <p className="mt-5 max-w-[30rem] text-[18px] leading-[1.6] text-nachtblauw">{hugo.zin}</p>
            <div className="mt-10 flex items-center gap-4 border-t border-lijn-koel pt-6">
              <Portret src={mensen.nick.portret} naam={mensen.nick.naam} initialen="NW" grootte={56} rand="wit" />
              <p className="text-[15px] leading-snug text-nachtblauw-zacht">
                <span className="block font-semibold text-nachtblauw">{mensen.nick.naam}</span>
                Bouwt het voorwerk veilig in jullie eigen omgeving.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
