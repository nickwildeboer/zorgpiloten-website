import { Foto } from "@/components/Foto";
import { mensen, over } from "@/content/site";

type Beeld = { src: string; alt: string; positie?: string };

const werk: Record<"hugo" | "nick", [Beeld, Beeld]> = {
  hugo: [
    { src: "/fotos/hugo-training.jpg", alt: "Hugo van den Berk geeft een training aan een team bij het whiteboard", positie: "70% 35%" },
    { src: "/fotos/hugo-keynote.jpg", alt: "Hugo van den Berk spreekt op een podium", positie: "50% 30%" },
  ],
  nick: [
    { src: "/fotos/nick-workshop-presentatie-2026.jpg", alt: "Nick Wildeboer geeft een workshop voor een groep", positie: "70% 40%" },
    { src: "/fotos/nick-workshop-locatie-2.jpg", alt: "Nick Wildeboer licht een opdracht toe tijdens een training op locatie", positie: "45% 40%" },
  ],
};

/** Groot profiel: foto's aan de ene kant, verhaal en achtergrond aan de andere. */
export function Profiel({ wie, spiegel = false }: { wie: "hugo" | "nick"; spiegel?: boolean }) {
  const m = mensen[wie];
  const p = over[wie];
  return (
    <article id={wie} className="scroll-mt-24" aria-labelledby={`profiel-${wie}`}>
      <div className={`grid items-start gap-x-16 gap-y-12 lg:grid-cols-2 ${spiegel ? "lg:[&>*:first-child]:order-2" : ""}`}>
        <div className="grid grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] gap-3 sm:gap-4">
          <Foto src={m.portret} alt={`Portret van ${m.naam}`} ratio="4/5" sizes="(min-width: 1024px) 300px, 55vw" positie={m.positie} className="row-span-2" />
          {werk[wie].map((b) => (
            <Foto key={b.src} src={b.src} alt={b.alt} ratio="4/3" sizes="(min-width: 1024px) 240px, 45vw" positie={b.positie} className="self-stretch" />
          ))}
        </div>

        <div>
          <h2 id={`profiel-${wie}`} className="text-[32px] leading-[1.1] sm:text-[42px]">
            {m.naam}
          </h2>
          <p className="mt-5 text-[19px] leading-[1.55] text-nachtblauw">{p.kern}</p>
          <p className="mt-5 text-[17px]">{p.verhaal}</p>
          <p className="mt-7 border-l-0 font-display text-[20px] font-semibold leading-snug text-nachtblauw">{p.belofte}</p>

          <dl className="mt-9 border-t border-lijn-koel">
            {m.achtergrond.map((k) => (
              <div key={k.titel} className="border-b border-lijn-koel py-3.5">
                <dt className="font-semibold leading-snug text-nachtblauw">{k.titel}</dt>
                {k.context && <dd className="mt-0.5 text-[15px] leading-snug">{k.context}</dd>}
              </div>
            ))}
          </dl>
        </div>
      </div>
    </article>
  );
}
