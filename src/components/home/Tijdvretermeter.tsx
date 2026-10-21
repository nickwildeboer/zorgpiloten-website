"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { Schakelaar } from "@/components/ui";
import { taakgesprekHref } from "@/lib/navigatie";
import styles from "./home.module.css";

const WERKWEKEN = 46;
const DREMPEL_UREN = 4;

type Tarief = "35" | "50" | "65" | "85";
const tarieven: { waarde: Tarief; label: string }[] = [
  { waarde: "35", label: "€35" },
  { waarde: "50", label: "€50" },
  { waarde: "65", label: "€65" },
  { waarde: "85", label: "€85" },
];

const getal = new Intl.NumberFormat("nl-NL", { maximumFractionDigits: 0 });

export function Tijdvretermeter() {
  const [uren, setUren] = useState(5);
  const [deel, setDeel] = useState(60);
  const [tarief, setTarief] = useState<Tarief>("35");
  const urenId = useId();
  const deelId = useId();

  const jaarUren = uren * WERKWEKEN;
  const voorwerkUren = Math.round((jaarUren * deel) / 100);
  const waarde = voorwerkUren * Number(tarief);
  const onderDrempel = uren < DREMPEL_UREN;

  return (
    <div className="grid overflow-hidden rounded-paneel border border-lijn shadow-kaart lg:grid-cols-[1.05fr_1fr]">
      {/* Bediening */}
      <div className="bg-base p-5 sm:p-8">
        <div>
          <div className="flex items-baseline justify-between gap-4">
            <label htmlFor={urenId} className="text-[16px] font-medium text-tekst">
              Uren per week aan één terugkerende taak
            </label>
            <output htmlFor={urenId} className="flex-none text-[17px] font-semibold text-tekst tabular-nums">
              {uren} uur
            </output>
          </div>
          <input
            id={urenId}
            type="range"
            min={1}
            max={20}
            step={1}
            value={uren}
            onChange={(e) => setUren(Number(e.target.value))}
            aria-valuetext={`${uren} uur per week`}
            className={`${styles.schuif} mt-2`}
          />
          <div className="flex justify-between text-[13px] text-tekst-zacht" aria-hidden="true">
            <span>1 uur</span>
            <span>20 uur</span>
          </div>
        </div>

        <div className="mt-7">
          <div className="flex items-baseline justify-between gap-4">
            <label htmlFor={deelId} className="text-[16px] font-medium text-tekst">
              Deel dat als voorwerk klaargezet kan worden
            </label>
            <output htmlFor={deelId} className="flex-none text-[17px] font-semibold text-tekst tabular-nums">
              {deel} procent
            </output>
          </div>
          <input
            id={deelId}
            type="range"
            min={20}
            max={80}
            step={5}
            value={deel}
            onChange={(e) => setDeel(Number(e.target.value))}
            aria-valuetext={`${deel} procent`}
            className={`${styles.schuif} mt-2`}
          />
          <div className="flex justify-between text-[13px] text-tekst-zacht" aria-hidden="true">
            <span>20 procent</span>
            <span>80 procent</span>
          </div>
        </div>

        <div className="mt-7">
          <p className="text-[16px] font-medium text-tekst">Kosten per uur van de medewerker</p>
          <p className="mt-0.5 text-[14px] text-tekst-zacht">Kies wat het dichtst bij jullie functie ligt.</p>
          <Schakelaar<Tarief>
            label="Kosten per uur van de medewerker"
            opties={tarieven}
            waarde={tarief}
            onChange={setTarief}
            className="mt-3"
          />
        </div>
      </div>

      {/* Uitkomst */}
      <div className="flex flex-col bg-spar p-5 text-[var(--on-ink)] sm:p-8">
        <p className="text-[15px] font-medium text-[var(--sage-on-ink)]">Voorbeeldberekening met je eigen cijfers</p>

        <dl className={`mt-5 grid gap-5 transition-opacity ${onderDrempel ? "opacity-70" : ""}`}>
          <div className="flex items-baseline justify-between gap-4 border-b border-white/15 pb-4">
            <dt className="text-[15px] text-[var(--on-ink-soft)]">Uren per jaar in deze taak</dt>
            <dd className="text-[22px] font-semibold tabular-nums">{getal.format(jaarUren)} uur</dd>
          </div>
          <div className="flex items-baseline justify-between gap-4 border-b border-white/15 pb-4">
            <dt className="text-[15px] text-[var(--on-ink-soft)]">Daarvan als voorwerk</dt>
            <dd className="text-[22px] font-semibold tabular-nums">{getal.format(voorwerkUren)} uur</dd>
          </div>
          <div>
            <dt className="text-[15px] text-[var(--on-ink-soft)]">Waarde van dat voorwerk per jaar</dt>
            <dd className="mt-1 text-[44px] font-semibold leading-none tracking-[-0.02em] tabular-nums sm:text-[56px]" aria-live="polite">
              €{getal.format(waarde)}
            </dd>
          </div>
        </dl>

        <div aria-live="polite">
          {onderDrempel && (
            <p className="mt-6 rounded-kaart border border-[var(--sage-on-ink)]/40 bg-white/5 p-4 text-[15px] leading-relaxed text-[var(--on-ink)]">
              Onder de 4 uur per week adviseren wij om niet met een apart automatiseringstraject te starten. Kies eerst een grotere
              tijdvreter of begin met een praktische teamtraining.
            </p>
          )}
        </div>

        <p className="mt-6 text-[14px] leading-relaxed text-[var(--on-ink-muted)]">
          Gerekend met {WERKWEKEN} werkweken per jaar. Dit is een voorbeeld en geen belofte. In een samenwerking meten we het echte getal
          met je mee, met een nulmeting vooraf en een nameting achteraf.
        </p>

        <div className="mt-auto pt-6">
          <Link
            href={taakgesprekHref()}
            className="inline-flex text-[15px] font-medium text-white underline decoration-white/40 underline-offset-4 hover:decoration-white"
          >
            Reken je eigen taak samen met ons door
          </Link>
        </div>
      </div>
    </div>
  );
}
