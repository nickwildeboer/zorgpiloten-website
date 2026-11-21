import { Icoon } from "@/components/home/Iconen";
import { TaakIcoon } from "./TaakIconen";

/** Gegevenslabel: in één oogopslag of er persoonsgegevens in een taak gaan, en wie het laatste woord heeft. */
export function Gegevenslabel({ persoonsgegevens, gegevens, oordeel }: { persoonsgegevens: boolean; gegevens: string; oordeel: string }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Gegevenslabel">
      <li
        className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[14px] font-semibold ${
          persoonsgegevens ? "bg-nachtblauw text-creme" : "bg-creme text-nachtblauw"
        }`}
      >
        {persoonsgegevens ? <TaakIcoon naam="slot" grootte={20} /> : <Icoon naam="document" grootte={20} />}
        {gegevens}
      </li>
      <li className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[14px] text-nachtblauw shadow-[inset_0_0_0_1px_var(--lijn-koel)]">
        <Icoon naam="aftekenen" grootte={20} />
        <span>
          Laatste woord: <span className="font-semibold">{oordeel}</span>
        </span>
      </li>
    </ul>
  );
}
