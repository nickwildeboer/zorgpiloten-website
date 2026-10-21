import { Container, Knop } from "@/components/ui";

export function CommHero() {
  return (
    <section className="pt-12 pb-16 sm:pt-20 sm:pb-24">
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
          <div>
            <p className="text-[15px] font-medium text-nachtblauw-zacht">Communicatie</p>
            <h1 className="mt-3 text-[36px] sm:text-[48px] lg:text-[56px]">Van jargon naar taal die patiënten en collega’s meteen begrijpen.</h1>
            <div className="mt-6 max-w-[38rem] space-y-4 text-lg">
              <p>
                Hugo van den Berk was ruim 15 jaar Directeur Marketing & Communicatie en MT-lid in het Catharina Ziekenhuis. Hij weet waar een communicatieafdeling tijd verliest. Bij de folder die te moeilijk is geschreven, het intranetbericht dat uit vijf mails moet komen en de vacature die weer bij nul begint. En op de dag dat er iets misgaat, bij de eerste zeven zinnen.
              </p>
              <p>Het voorwerk zet de eerste versie klaar. De adviseur houdt de pen en tekent af.</p>
            </div>
            <div className="mt-8">
              <Knop href="#schakelaar">Probeer de schakelaar</Knop>
            </div>
          </div>

          <figure className="rounded-paneel bg-hemel-zacht p-5 sm:p-6">
            <figcaption className="text-[15px] text-nachtblauw-zacht">Eén zin uit de voorbeeldbrief verderop</figcaption>
            <div className="mt-4 space-y-3">
              <div className="rounded-kaart border border-lijn bg-wolk px-4 py-4">
                <p className="text-sm text-nachtblauw-zacht">Zo stond het er</p>
                <p className="mt-1 text-[17px] leading-snug text-nachtblauw-zacht">Na sedatie is het u niet toegestaan zelfstandig een motorvoertuig te besturen.</p>
              </div>
              <div className="rounded-kaart border border-lijn-sterk bg-wolk px-4 py-4 shadow-kaart">
                <p className="text-sm text-nachtblauw-zacht">Zo staat het klaar voor de adviseur</p>
                <p className="mt-1 text-[20px] font-medium leading-snug tracking-[-0.01em] text-nachtblauw">Krijgt u een roesje? Dan mag u daarna niet zelf autorijden.</p>
              </div>
            </div>
            <p className="mt-4 text-[15px] text-nachtblauw-zacht">Korter en helderder. Het feit blijft precies hetzelfde.</p>
          </figure>
        </div>

        <ul className="mt-14 grid gap-6 border-t border-lijn pt-8 sm:grid-cols-2 lg:max-w-[calc(57.5%-2rem)]">
          <li>
            <p className="font-medium text-nachtblauw">Hugo van den Berk, MSc</p>
            <p className="mt-1 text-[15px]">Ruim 15 jaar Directeur Marketing & Communicatie en MT-lid, Catharina Ziekenhuis. Organisatie- en veranderkunde (Sioo).</p>
          </li>
          <li>
            <p className="font-medium text-nachtblauw">Nick Wildeboer, MSc</p>
            <p className="mt-1 text-[15px]">Strategische innovatie, digitalisering en AI. Bouwt het voorwerk veilig in jullie eigen omgeving.</p>
          </li>
        </ul>
      </Container>
    </section>
  );
}
