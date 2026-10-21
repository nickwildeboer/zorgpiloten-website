import { Container, Knop } from "@/components/ui";

const weekstapel = [
  { vraag: "Hoeveel ORT krijg ik voor de zondagdienst?", taak: "Cao-loket" },
  { vraag: "Wanneer moet het plan van aanpak voor medewerker A rond zijn?", taak: "Verzuim" },
  { vraag: "Kun je voor vrijdag een vacature maken voor de avonddienst?", taak: "Vacature" },
  { vraag: "Ligt het inwerkpakket voor de nieuwe helpenden al klaar?", taak: "Onboarding" },
  { vraag: "Mijn BIG-registratie loopt af. Wat moet ik regelen?", taak: "BIG" },
  { vraag: "Bouw ik verlof op tijdens mijn ouderschapsverlof?", taak: "Cao-loket" },
];

const duo = [
  {
    naam: "Hugo van den Berk, MSc",
    wat: "Organisatie- en veranderkunde (Sioo). Ruim 15 jaar MT-lid in het Catharina Ziekenhuis.",
    rol: "Zorgt dat het team meekomt en dat helder is wie de regie heeft.",
  },
  {
    naam: "Nick Wildeboer, MSc",
    wat: "Strategische innovatie, digitalisering en AI. Management in de Zorg en grote zorg-ICT-implementaties.",
    rol: "Bouwt het voorwerk veilig in jullie eigen omgeving.",
  },
];

export function HrHero() {
  return (
    <section className="pt-12 pb-16 sm:pt-20 sm:pb-24">
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
          <div>
            <p className="text-[15px] font-medium text-nachtblauw-zacht">HR & P&O</p>
            <h1 className="mt-3 text-[36px] sm:text-[48px] lg:text-[56px]">HR in de zorg verdrinkt in vragen die elke week terugkomen.</h1>
            <div className="mt-6 max-w-[38rem] space-y-4 text-lg">
              <p>
                Cao-vragen over ORT en verlof. Verzuimdossiers met termijnen die je niet mag missen. Vacatures die elke keer opnieuw beginnen. Het werk vraagt vakkennis, maar het voorwerk is elke week hetzelfde.
              </p>
              <p>
                Automatisering op HR werkt alleen als twee dingen samenkomen. Een team dat weet wie de regie houdt, en een opstelling die veilig in jullie eigen omgeving draait. Daarom doen we het met z’n tweeën.
              </p>
            </div>
            <div className="mt-8">
              <Knop href="#taaksimulator">Probeer de taaksimulator</Knop>
            </div>

            <ul className="mt-12 grid gap-6 border-t border-lijn pt-8 sm:grid-cols-2">
              {duo.map((p) => (
                <li key={p.naam}>
                  <p className="font-medium text-nachtblauw">{p.naam}</p>
                  <p className="mt-1 text-[15px]">{p.wat}</p>
                  <p className="mt-2 text-[15px] text-nachtblauw">{p.rol}</p>
                </li>
              ))}
            </ul>
          </div>

          <figure className="rounded-paneel bg-hemel-zacht p-5 sm:p-6">
            <figcaption className="text-[15px] text-nachtblauw-zacht">Een gewone week op HR. En de week erna weer.</figcaption>
            <ul className="mt-4 space-y-2">
              {weekstapel.map((item, i) => (
                <li
                  key={item.vraag}
                  className={`rounded-kaart border border-lijn bg-wolk px-4 py-3 shadow-kaart ${i % 2 === 1 ? "sm:ml-6" : "sm:mr-6"} ${i >= 4 ? "max-sm:hidden" : ""}`}
                >
                  <p className="text-[15px] leading-snug text-nachtblauw">{item.vraag}</p>
                  <p className="mt-1 text-sm text-nachtblauw-zacht">{item.taak}</p>
                </li>
              ))}
            </ul>
          </figure>
        </div>
      </Container>
    </section>
  );
}
