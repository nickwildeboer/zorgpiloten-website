import { Bovenkop, Container } from "@/components/ui";
import { Foto } from "@/components/Foto";

const parallel = [
  { thema: "Kaders", collega: "Weet wat ze zelf beslist", assistent: "Weet wat hij nooit zelf verstuurt" },
  { thema: "Proeftijd", collega: "Een ervaren collega leest mee", assistent: "Twee collega’s controleren elk voorwerk" },
  { thema: "Regie", collega: "Een leidinggevende is aanspreekbaar", assistent: "Eén eigenaar stuurt bij of zet stil" },
];

function Persoon() {
  return (
    <svg width="20" height="20" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true">
      <circle cx="9" cy="6" r="3" />
      <path d="M3.5 15.5c.8-3 2.9-4.5 5.5-4.5s4.7 1.5 5.5 4.5" />
    </svg>
  );
}

function Assistent() {
  return (
    <svg width="20" height="20" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 9.5 15 3l-3.5 12-2.3-4.7z" />
    </svg>
  );
}

/** De noot van Hugo, vanuit de veranderkunde. Tekst ter controle bij Hugo voor livegang. */
export function LeidinggevendeNoot() {
  return (
    <section className="py-16 sm:py-24" aria-labelledby="noot-kop">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <div className="relative order-2 lg:order-1">
            <Foto
              src="/fotos/hugo-training.jpg"
              alt="Hugo van den Berk geeft een training aan een groep bij het whiteboard"
              ratio="4/3"
              positie="65% center"
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
          </div>

          <div className="order-1 lg:order-2">
            <Bovenkop>Noot van Hugo</Bovenkop>
            <h2 id="noot-kop" className="mt-3 text-[30px] sm:text-[40px]">
              Wie is de leidinggevende van een digitale assistent?
            </h2>
            <p className="mt-4 max-w-md text-lg">Dezelfde zorg als voor een nieuwe collega. Pas als de regie helder is, bouwen we.</p>

            <div className="mt-8 rounded-paneel border border-lijn bg-wolk p-2">
              <div className="grid grid-cols-2 gap-2 px-3 pb-2 pt-3 text-sm font-medium text-nachtblauw">
                <span className="flex items-center gap-2">
                  <span className="text-hemel-diep">
                    <Persoon />
                  </span>
                  Nieuwe collega
                </span>
                <span className="flex items-center gap-2">
                  <span className="text-hemel-diep">
                    <Assistent />
                  </span>
                  Digitale assistent
                </span>
              </div>
              <dl className="space-y-2">
                {parallel.map((r) => (
                  <div key={r.thema} className="rounded-kaart bg-creme px-3 py-3">
                    <dt className="text-sm font-semibold uppercase tracking-[0.06em] text-hemel-diep">{r.thema}</dt>
                    <dd className="mt-1 grid grid-cols-2 gap-3 text-[15px] leading-snug">
                      <span>
                        <span className="sr-only">Nieuwe collega: </span>
                        {r.collega}
                      </span>
                      <span className="text-nachtblauw">
                        <span className="sr-only">Digitale assistent: </span>
                        {r.assistent}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <p className="mt-6 text-[15px]">
              <span className="font-medium text-nachtblauw">Hugo van den Berk, MSc.</span> Organisatie- en veranderkunde (Sioo).
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
