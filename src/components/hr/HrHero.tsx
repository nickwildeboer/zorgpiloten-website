import { Bovenkop, Container, Knop } from "@/components/ui";
import { Foto } from "@/components/Foto";
import { Zon } from "@/components/Horizon";

/** Vragen die elke week terugkomen. Fictieve voorbeelden, als wolken over de foto. */
const vragen = [
  { vraag: "Hoeveel ORT krijg ik voor de zondagdienst?", taak: "Cao-loket", plek: "left-3 -bottom-8 sm:-left-8 sm:bottom-auto sm:top-10" },
  { vraag: "Mijn BIG-registratie loopt af. Wat moet ik regelen?", taak: "BIG", plek: "max-sm:hidden sm:-right-6 sm:bottom-12" },
];

export function HrHero() {
  return (
    <section className="relative overflow-hidden pt-10 pb-16 sm:pt-16 sm:pb-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
          <div>
            <Bovenkop>HR & P&O</Bovenkop>
            <h1 className="mt-4 text-[40px] sm:text-[54px] lg:text-[60px]">Het voorwerk staat klaar. Uw <span className="whitespace-nowrap">HR-team</span> beslist.</h1>
            <p className="mt-6 max-w-[32rem] text-lg">Cao-vragen, verzuim, vacatures, onboarding en BIG. Wij zetten het terugkerende werk klaar, veilig in uw eigen omgeving.</p>
            <Knop href="#taaksimulator" className="mt-8">
              Probeer de taaksimulator
            </Knop>
          </div>

          <div className="relative max-sm:mb-8">
            {/* Horizon: de zon komt op achter de foto */}
            <Zon className="absolute -top-12 right-[14%] h-24 w-48 sm:-top-16 sm:h-32 sm:w-64" />
            <Foto
              src="/fotos/sfeer/hr-werkplek.jpg"
              alt="Handen bladeren door een map met personeelsdossiers op een bureau in de ochtendzon"
              ratio="4/3"
              priority
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="relative"
            />
            {vragen.map((v) => (
              <figure
                key={v.taak}
                className={`absolute z-10 max-w-[15.5rem] rounded-kaart border border-lijn bg-wolk px-4 py-3 shadow-kaart ${v.plek}`}
              >
                <p className="text-[15px] leading-snug text-nachtblauw">{v.vraag}</p>
                <figcaption className="mt-1.5 text-sm text-hemel-diep">{v.taak}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
