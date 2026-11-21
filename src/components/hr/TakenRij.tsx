import { Container } from "@/components/ui";
import { TaakIcoon, type TaakIcoonNaam } from "./TaakIconen";

/**
 * De vijf taken van een afdelingspagina: icoon, titel en één regel.
 * Elke taak linkt naar #demo en kiest daar meteen die taak (werkt zonder JavaScript als gewone ankerlink).
 */
export function TakenRij({
  taken,
  iconen,
  onKies,
  label,
}: {
  taken: readonly { titel: string; regel: string }[];
  iconen: TaakIcoonNaam[];
  onKies: (index: number) => void;
  label: string;
}) {
  return (
    <section className="pb-20 pt-4 sm:pb-28" aria-label={label}>
      <Container>
        <ul className="grid gap-x-8 gap-y-6 lg:grid-cols-5 lg:gap-y-10">
          {taken.map((t, i) => (
            <li key={t.titel} className="border-t border-lijn-koel pt-6">
              <a href="#demo" onClick={() => onKies(i)} className="group flex gap-5 rounded-[var(--radius-sm)] text-nachtblauw lg:block">
                <TaakIcoon naam={iconen[i]} grootte={32} />
                <span className="block">
                  <span className="block font-display text-[20px] font-semibold leading-snug underline decoration-transparent decoration-1 underline-offset-4 transition-colors group-hover:decoration-current lg:mt-5">
                    {t.titel}
                  </span>
                  <span className="mt-2 block text-[16px] leading-[1.5] text-nachtblauw-zacht">{t.regel}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
