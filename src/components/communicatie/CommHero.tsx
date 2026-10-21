import { Bovenkop, Container, Knop } from "@/components/ui";
import { Foto } from "@/components/Foto";
import { Zon } from "@/components/Horizon";

export function CommHero() {
  return (
    <section className="relative overflow-hidden pt-10 pb-20 sm:pt-16 sm:pb-28">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
          <div>
            <Bovenkop>Communicatie</Bovenkop>
            <h1 className="mt-4 text-[40px] sm:text-[54px] lg:text-[60px]">Van jargon naar taal die iedereen begrijpt.</h1>
            <p className="mt-6 max-w-[32rem] text-lg">Folders, nieuwsbrief, werving, website en crisis. De eerste versie staat klaar, de adviseur houdt de pen.</p>
            <Knop href="#schakelaar" className="mt-8">
              Probeer de schakelaar
            </Knop>
          </div>

          <div className="relative pb-16 sm:pb-10">
            <Zon className="absolute -top-12 left-[12%] h-24 w-48 sm:-top-16 sm:h-32 sm:w-64" />
            <Foto
              src="/fotos/sfeer/communicatie-drukproef.jpg"
              alt="Een hand met potlood corrigeert een drukproef van een folder op tafel"
              ratio="4/3"
              priority
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="relative"
            />

            {/* Eén woord uit de voorbeeldbrief verderop, voor en na */}
            <p className="absolute right-3 top-4 z-10 inline-flex items-center gap-2 rounded-full border border-lijn bg-wolk px-4 py-2 text-[15px] shadow-kaart sm:-right-4 sm:top-8">
              <span className="text-nachtblauw-zacht line-through decoration-nachtblauw-zacht/60">sedatie</span>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="var(--hemel-diep)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
              <span className="sr-only">wordt</span>
              <span className="font-medium text-nachtblauw">roesje</span>
            </p>

            {/* Hugo als anker */}
            <figure className="absolute bottom-0 left-3 z-10 flex max-w-[22rem] items-end gap-3 rounded-paneel border border-lijn bg-wolk p-2.5 pr-5 shadow-kaart sm:-left-6">
              <Foto src="/fotos/hugo-portret.jpg" alt="Hugo van den Berk" ratio="4/5" sizes="96px" className="w-20 shrink-0 rounded-[var(--radius-md)] sm:w-24" />
              <figcaption className="pb-1">
                <span className="block font-medium text-nachtblauw">Hugo van den Berk, MSc</span>
                <span className="mt-0.5 block text-sm leading-snug">Ruim 15 jaar Directeur Marketing & Communicatie, Catharina Ziekenhuis</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </Container>
    </section>
  );
}
