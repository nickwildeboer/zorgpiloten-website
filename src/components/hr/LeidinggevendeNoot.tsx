import { Sectie } from "@/components/ui";

const parallel = [
  {
    thema: "Kaders",
    collega: "Je legt uit wat ze zelf mag beslissen en wanneer ze iemand erbij haalt.",
    assistent: "Je legt vast welke taak hij voorbereidt en wat hij nooit zelf verstuurt.",
  },
  {
    thema: "Proeftijd",
    collega: "De eerste weken leest een ervaren collega mee.",
    assistent: "Twee collega’s controleren elk voorwerk, tot het team erop vertrouwt.",
  },
  {
    thema: "Menselijke regie",
    collega: "Er is een leidinggevende die aanspreekbaar is als het misgaat.",
    assistent: "Er is één eigenaar die het voorwerk bijstuurt of direct stilzet.",
  },
];

/** Veranderkundige noot vanuit het vak van Hugo. Tekst ter controle bij Hugo voor livegang. */
export function LeidinggevendeNoot() {
  return (
    <Sectie toon="salie">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <div>
          <p className="text-[15px] font-medium text-nachtblauw-zacht">Veranderkundige noot</p>
          <h2 className="mt-2 text-[30px] sm:text-[40px]">Wie is de leidinggevende van een digitale assistent?</h2>
          <div className="mt-5 max-w-[34rem] space-y-4 text-lg">
            <p>
              Een nieuwe HR-collega laat je op dag één niet alleen de cao-vragen beantwoorden. Je geeft kaders, je kijkt mee in de proeftijd en iedereen weet wie aanspreekbaar is. Een digitale assistent verdient precies dezelfde zorg.
            </p>
            <p>
              Daarom beginnen we niet bij de techniek, maar bij de vraag wie de regie heeft. Pas als dat helder is, bouwen we.
            </p>
          </div>
          <p className="mt-8 border-l-2 border-hemel-diep pl-4 text-[15px]">
            <span className="block font-medium text-nachtblauw">Vanuit het vak van Hugo van den Berk, MSc</span>
            Organisatie- en veranderkunde (Sioo). Ruim 15 jaar MT-lid in het Catharina Ziekenhuis.
          </p>
        </div>

        <div className="rounded-paneel border border-lijn bg-wolk p-5 sm:p-8">
          <div aria-hidden="true" className="hidden grid-cols-[8.5rem_1fr_1fr] gap-6 border-b border-lijn pb-3 text-[15px] font-medium text-nachtblauw md:grid">
            <span />
            <span>Een nieuwe HR-collega</span>
            <span>Een digitale assistent</span>
          </div>
          <div className="divide-y divide-lijn">
            {parallel.map((r) => (
              <div key={r.thema} className="grid gap-3 py-5 md:grid-cols-[8.5rem_1fr_1fr] md:gap-6">
                <h3 className="text-lg">{r.thema}</h3>
                <p className="text-[15px]">
                  <span className="block text-sm text-nachtblauw-zacht md:sr-only">Een nieuwe HR-collega</span>
                  {r.collega}
                </p>
                <p className="text-[15px] text-nachtblauw">
                  <span className="block text-sm text-nachtblauw-zacht md:sr-only">Een digitale assistent</span>
                  {r.assistent}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Sectie>
  );
}
