import { Foto } from "@/components/Foto";
import { mensen, over } from "@/content/site";

type Beeld = { src: string; alt: string; positie: string };

/** Eén werkfoto per persoon, in dezelfde duotoon als het portret. */
const werk: Record<"hugo" | "nick", Beeld> = {
  hugo: { src: "/fotos/hugo-keynote.jpg", alt: "Hugo van den Berk spreekt op een podium", positie: "40% 40%" },
  nick: { src: "/fotos/nick-hero-presentatie.jpg", alt: "Nick Wildeboer geeft een presentatie", positie: "68% 40%" },
};

/** Groot profiel: portret en werkfoto aan de ene kant, verhaal en achtergrond aan de andere. Vraagt <DuotoonFilter /> op de pagina. */
export function Profiel({ wie, spiegel = false }: { wie: "hugo" | "nick"; spiegel?: boolean }) {
  const m = mensen[wie];
  const p = over[wie];
  const w = werk[wie];
  return (
    <article id={wie} className="scroll-mt-24" aria-labelledby={`profiel-${wie}`}>
      <div className={`grid items-start gap-x-16 gap-y-12 lg:grid-cols-2 ${spiegel ? "lg:[&>*:first-child]:order-2" : ""}`}>
        <div className="grid grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] items-end gap-3 sm:gap-4">
          <Foto
            src={m.portret}
            alt={`Portret van ${m.naam}`}
            ratio="4/5"
            sizes="(min-width: 1152px) 300px, (min-width: 1024px) 26vw, 56vw"
            positie={m.positie}
            duotoon
          />
          <Foto src={w.src} alt={w.alt} ratio="3/4" sizes="(min-width: 1152px) 220px, (min-width: 1024px) 20vw, 42vw" positie={w.positie} duotoon />
        </div>

        <div>
          <h2 id={`profiel-${wie}`} className="text-[32px] leading-[1.1] sm:text-[42px]">
            {m.naam}
          </h2>
          <p className="mt-2 font-display text-[20px] font-medium text-hemel-diep">{p.rol}</p>
          <p className="mt-6 text-[19px] leading-[1.55] text-nachtblauw">{p.kern}</p>
          <p className="mt-5 text-[17px]">{p.verhaal}</p>
          <p className="mt-7 font-display text-[21px] font-semibold leading-snug text-nachtblauw">{p.belofte}</p>

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
