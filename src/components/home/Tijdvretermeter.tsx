"use client";

import Link from "next/link";
import { useId, useState, type CSSProperties } from "react";
import { Schakelaar } from "@/components/ui";
import { taakgesprekHref } from "@/lib/navigatie";
import styles from "./home.module.css";

const WERKWEKEN = 46;
const DREMPEL_UREN = 4;
const MAX_UREN_PP = 10;
const MAX_MEDEWERKERS = 20;
const MAX_DEEL = 80;

type Afdeling = "hr" | "communicatie";
const afdelingen: { waarde: Afdeling; label: string }[] = [
  { waarde: "hr", label: "HR & P&O" },
  { waarde: "communicatie", label: "Communicatie" },
];

/* Een denkbeeldige afdeling om mee te beginnen. Geen gemeten gemiddelde. */
const voorbeelden: Record<Afdeling, { medewerkers: number; uren: number; deel: number; tarief: Tarief }> = {
  hr: { medewerkers: 5, uren: 2, deel: 60, tarief: "50" },
  communicatie: { medewerkers: 4, uren: 3, deel: 60, tarief: "65" },
};

type Tarief = "35" | "50" | "65" | "85";
const tarieven: { waarde: Tarief; label: string }[] = [
  { waarde: "35", label: "€35" },
  { waarde: "50", label: "€50" },
  { waarde: "65", label: "€65" },
  { waarde: "85", label: "€85" },
];

const getal = new Intl.NumberFormat("nl-NL", { maximumFractionDigits: 0 });
const getal1 = new Intl.NumberFormat("nl-NL", { maximumFractionDigits: 1 });

export function Tijdvretermeter() {
  const [afdeling, setAfdeling] = useState<Afdeling>("hr");
  const [medewerkers, setMedewerkers] = useState(4);
  const [uren, setUren] = useState(1.5);
  const [deel, setDeel] = useState(60);
  const [tarief, setTarief] = useState<Tarief>("50");
  const [isVoorbeeld, setIsVoorbeeld] = useState(false);
  const urenId = useId();
  const medewerkersId = useId();
  const deelId = useId();

  const vulVoorbeeld = () => {
    const v = voorbeelden[afdeling];
    setMedewerkers(v.medewerkers);
    setUren(v.uren);
    setDeel(v.deel);
    setTarief(v.tarief);
    setIsVoorbeeld(true);
  };
  const handmatig = <T,>(zet: (w: T) => void) => (w: T) => {
    zet(w);
    setIsVoorbeeld(false);
  };

  const teamUren = uren * medewerkers;
  const jaarUren = teamUren * WERKWEKEN;
  const voorwerkUren = Math.round((jaarUren * deel) / 100);
  const waarde = voorwerkUren * Number(tarief);
  const onderDrempel = teamUren < DREMPEL_UREN;
  /* Hoe hoog de zon boven de horizon staat: 0 bij weinig voorwerk, 1 bij het maximum. */
  const hoogte = Math.min(1, voorwerkUren / ((40 * WERKWEKEN * MAX_DEEL) / 100));

  return (
    <div className="grid overflow-hidden rounded-paneel border border-lijn bg-wolk lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      {/* Bediening */}
      <div className="grid content-start gap-7 p-5 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Schakelaar<Afdeling>
            label="Afdeling"
            opties={afdelingen}
            waarde={afdeling}
            onChange={(a) => {
              setAfdeling(a);
              setIsVoorbeeld(false);
            }}
          />
          <button
            type="button"
            onClick={vulVoorbeeld}
            className="rounded-full border-2 border-nachtblauw px-4 py-2 text-[15px] font-semibold text-nachtblauw hover:bg-hemel-zacht"
          >
            Vul een voorbeeld in
          </button>
        </div>

        <div>
          <div className="flex items-baseline justify-between gap-4">
            <label htmlFor={medewerkersId} className="text-[16px] font-medium text-nachtblauw">
              Medewerkers op {afdeling === "hr" ? "HR & P&O" : "Communicatie"} die deze taak doen
            </label>
            <output htmlFor={medewerkersId} className="flex-none text-[18px] font-semibold tabular-nums text-nachtblauw">
              {medewerkers}
            </output>
          </div>
          <input
            id={medewerkersId}
            type="range"
            min={1}
            max={MAX_MEDEWERKERS}
            step={1}
            value={medewerkers}
            onChange={(e) => handmatig(setMedewerkers)(Number(e.target.value))}
            aria-valuetext={`${medewerkers} medewerkers`}
            className={`${styles.schuif} mt-1`}
          />
        </div>

        <div>
          <div className="flex items-baseline justify-between gap-4">
            <label htmlFor={urenId} className="text-[16px] font-medium text-nachtblauw">
              Uren per week per medewerker
            </label>
            <output htmlFor={urenId} className="flex-none text-[18px] font-semibold tabular-nums text-nachtblauw">
              {getal1.format(uren)} uur
            </output>
          </div>
          <input
            id={urenId}
            type="range"
            min={0.5}
            max={MAX_UREN_PP}
            step={0.5}
            value={uren}
            onChange={(e) => handmatig(setUren)(Number(e.target.value))}
            aria-valuetext={`${getal1.format(uren)} uur per week per medewerker`}
            className={`${styles.schuif} mt-1`}
          />
        </div>

        <div>
          <div className="flex items-baseline justify-between gap-4">
            <label htmlFor={deelId} className="text-[16px] font-medium text-nachtblauw">
              Deel dat voorwerk is
            </label>
            <output htmlFor={deelId} className="flex-none text-[18px] font-semibold tabular-nums text-nachtblauw">
              {deel} procent
            </output>
          </div>
          <input
            id={deelId}
            type="range"
            min={20}
            max={MAX_DEEL}
            step={5}
            value={deel}
            onChange={(e) => handmatig(setDeel)(Number(e.target.value))}
            aria-valuetext={`${deel} procent`}
            className={`${styles.schuif} mt-1`}
          />
        </div>

        <div>
          <p className="text-[16px] font-medium text-nachtblauw">
            Kosten per uur van de medewerker
          </p>
          <Schakelaar<Tarief> label="Kosten per uur van de medewerker" opties={tarieven} waarde={tarief} onChange={handmatig(setTarief)} className="mt-3" />
        </div>
      </div>

      {/* Uitkomst: de zon komt op naarmate er meer voorwerk is */}
      <div className={`relative flex flex-col bg-nachtblauw p-5 text-creme sm:p-8`}>
        <p className="text-[13px] font-semibold uppercase tracking-[0.06em] text-[var(--on-ink-soft)]">Voorbeeldberekening</p>

        <dl className={`relative z-[1] mt-4 grid gap-1 transition-opacity ${onderDrempel ? "opacity-70" : ""}`}>
          <dt className="sr-only">Waarde van het voorwerk per jaar</dt>
          <dd className="text-[48px] font-semibold leading-none tracking-[-0.02em] tabular-nums sm:text-[60px]" aria-live="polite">
            €{getal.format(waarde)}
          </dd>
          <dt className="sr-only">Uren</dt>
          <dd className="mt-2 text-[15px] text-[var(--on-ink-soft)]">
            per jaar, voor {getal.format(voorwerkUren)} van de {getal.format(jaarUren)} uur van {medewerkers}{" "}
            {medewerkers === 1 ? "medewerker" : "medewerkers"}
          </dd>
        </dl>

        <div aria-live="polite" className="relative z-[1]">
          {onderDrempel && (
            <p className="mt-5 max-w-md rounded-kaart bg-[var(--white-15)] p-4 text-[15px] leading-relaxed text-creme">
              Onder de 4 uur per week adviseren wij om niet met een apart automatiseringstraject te starten. Kies eerst een grotere
              tijdvreter of begin met een praktische teamtraining.
            </p>
          )}
        </div>

        <div className={styles.horizon} aria-hidden="true">
          <span className={styles.zon} style={{ "--hoogte": hoogte } as CSSProperties} />
          <span className={styles.horizonWolk} />
        </div>

        <div className="relative z-[1] flex flex-wrap items-end justify-between gap-x-6 gap-y-3 pt-5">
          <p className="max-w-[16rem] text-[13px] leading-snug text-[var(--on-ink-muted)]">
            Gerekend met {WERKWEKEN} werkweken.{" "}
            {isVoorbeeld ? "Ingevuld met een denkbeeldige afdeling, geen gemeten gemiddelde." : "Een voorbeeld, geen belofte."}
          </p>
          <Link href={taakgesprekHref(afdeling)} className="text-[15px] font-medium text-creme underline decoration-[var(--on-ink-muted)] underline-offset-4 hover:decoration-creme">
            Reken het samen door
          </Link>
        </div>
      </div>
    </div>
  );
}
