"use client";

import Link from "next/link";
import { useState, type CSSProperties } from "react";
import { taakgesprekHref } from "@/lib/navigatie";
import { Segment } from "./Segment";
import styles from "./home.module.css";

type TaakSleutel = "verzuim" | "b1";
type Stand = "nu" | "met";

type Taak = {
  /** Vijf zoek- en schrijfstappen die in het voorwerk opgaan. */
  voorwerk: string[];
  /** De zesde stap, die bij de medewerker blijft. */
  aftekenen: string;
  /** Wat er in blok 1 klaarstaat. */
  concept: string;
  afdeling: "hr" | "communicatie";
  taakSlug: string;
};

const taken: Record<TaakSleutel, Taak> = {
  verzuim: {
    voorwerk: [
      "In de verzuimlijst nagaan wie deze week een termijn heeft, zoals week 6, 8 of 42",
      "De probleemanalyse van de bedrijfsarts opzoeken",
      "Gespreksverslagen en afspraken uit mail en dossier bij elkaar zoeken",
      "Het plan van aanpak of de bijstelling uitschrijven",
      "Nagaan of elke verplichte stap op tijd en volledig in het dossier staat",
    ],
    aftekenen: "Nalezen, aanpassen en het plan doorzetten naar medewerker en leidinggevende",
    concept:
      "Termijnen gesignaleerd, stukken verzameld en het plan van aanpak in concept. Elke zin verwijst naar het dossierstuk waar hij vandaan komt.",
    afdeling: "hr",
    taakSlug: "verzuim",
  },
  b1: {
    voorwerk: [
      "De oorspronkelijke brief en de bijbehorende richtlijn of folder erbij zoeken",
      "Lange zinnen en vaktermen markeren",
      "Elke alinea herschrijven naar B1 zonder de medische inhoud te veranderen",
      "Nagaan of afspraken, tijden en contactgegevens nog kloppen",
      "De nieuwe tekst toetsen op taalniveau B1",
    ],
    aftekenen: "Laten meelezen door de afdeling en de brief vrijgeven",
    concept:
      "Een B1-versie met elke nieuwe zin naast de oorspronkelijke zin. Medische feiten blijven ongewijzigd en twijfelplekken zijn gemarkeerd.",
    afdeling: "communicatie",
    taakSlug: "b1-folders",
  },
};

function Vink() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <path d="M2.5 7.4l2.8 2.8 6.2-6.4" fill="none" stroke="var(--ink-3)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Taakkaart() {
  const [taakSleutel, setTaakSleutel] = useState<TaakSleutel>("verzuim");
  const [stand, setStand] = useState<Stand>("nu");
  const taak = taken[taakSleutel];
  const met = stand === "met";

  return (
    <div className="rounded-paneel border border-lijn bg-wolk p-4 shadow-kaart sm:p-6">
      <h2 className="text-[19px] sm:text-[21px]">Eén taak, twee manieren van werken</h2>
      <p className="mt-1 text-[15px] text-tekst-zacht">Kies een taak en zet de schakelaar om.</p>

      <div className="mt-5 grid gap-3">
        <Segment<TaakSleutel>
          label="Kies een taak"
          waarde={taakSleutel}
          onChange={setTaakSleutel}
          opties={[
            { waarde: "verzuim", titel: "Verzuimdossier Poortwachter", sub: "HR & P&O" },
            { waarde: "b1", titel: "Patiëntenbrief naar B1", sub: "Communicatie" },
          ]}
        />
        <Segment<Stand>
          label="Kies de werkwijze"
          waarde={stand}
          onChange={setStand}
          stapel
          opties={[
            { waarde: "nu", titel: "Nu: handmatig zoek- en schrijfwerk" },
            { waarde: "met", titel: "Met Zorgpiloten: voorwerk klaar, jij tekent af" },
          ]}
        />
      </div>

      <div key={taakSleutel} className={`${styles.stappen} mt-5`} data-stand={stand}>
        <div className={styles.groep} data-groep="a">
          <div className={styles.kop} aria-hidden={!met}>
            <div>
              <div className={styles.kopInhoud}>
                <span className={styles.blokNr}>1</span>
                <div>
                  <p className="font-medium leading-snug text-tekst">De computer zet het concept met bronverwijzing klaar</p>
                  <p className="mt-1 text-[14px] leading-snug text-tekst-2">{taak.concept}</p>
                </div>
              </div>
            </div>
          </div>
          <ol className="contents">
            {taak.voorwerk.map((stap, i) => (
              <li key={stap} className={styles.stap} style={{ "--i": i } as CSSProperties}>
                <span className={styles.nr} aria-hidden="true">
                  <span className={styles.cijfer}>{i + 1}</span>
                  <span className={styles.vink}>
                    <Vink />
                  </span>
                </span>
                <span>{stap}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className={styles.route} aria-hidden="true" />

        <div className={styles.groep} data-groep="b">
          <div className={styles.kop} aria-hidden={!met}>
            <div>
              <div className={styles.kopInhoud}>
                <span className={styles.blokNr}>2</span>
                <p className="font-medium leading-snug text-tekst">De medewerker controleert en tekent af</p>
              </div>
            </div>
          </div>
          <div className={styles.stap} style={{ "--i": 5 } as CSSProperties}>
            <span className={styles.nr} aria-hidden="true">
              <span className={styles.cijfer}>6</span>
            </span>
            <span>{taak.aftekenen}</span>
          </div>
        </div>
      </div>

      <p className="mt-5 text-[15px] text-tekst-2" aria-live="polite">
        {met
          ? "Twee blokken. Het voorwerk staat klaar en jij houdt het laatste woord."
          : "Zes losse stappen, allemaal handwerk van jou of een collega."}
      </p>

      <div className="mt-4 border-t border-lijn pt-4">
        <Link
          href={taakgesprekHref(taak.afdeling, taak.taakSlug)}
          className="inline-flex items-center gap-1.5 text-[15px] font-medium text-tekst underline decoration-lijn-sterk underline-offset-4 hover:decoration-spar"
        >
          Reken deze taak door in een taakgesprek
        </Link>
      </div>
    </div>
  );
}
