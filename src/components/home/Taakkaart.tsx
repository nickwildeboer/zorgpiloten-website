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
      "Termijnen in de verzuimlijst nagaan",
      "Probleemanalyse van de bedrijfsarts zoeken",
      "Verslagen uit mail en dossier verzamelen",
      "Plan van aanpak uitschrijven",
      "Dossier op volledigheid controleren",
    ],
    aftekenen: "Nalezen, aanpassen en doorzetten",
    concept: "Plan van aanpak in concept, elke zin met bron.",
    afdeling: "hr",
    taakSlug: "verzuim-poortwachter",
  },
  b1: {
    voorwerk: [
      "Brief en richtlijn erbij zoeken",
      "Lange zinnen en vaktermen markeren",
      "Herschrijven naar taalniveau B1",
      "Afspraken en contactgegevens nagaan",
      "De tekst toetsen op B1",
    ],
    aftekenen: "Laten meelezen en vrijgeven",
    concept: "B1-versie naast het origineel, twijfels gemarkeerd.",
    afdeling: "communicatie",
    taakSlug: "patientenfolders-b1",
  },
};

function Vink() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <path d="M2.5 7.4l2.8 2.8 6.2-6.4" fill="none" stroke="var(--hemel-diep)" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Taakkaart() {
  const [taakSleutel, setTaakSleutel] = useState<TaakSleutel>("verzuim");
  const [stand, setStand] = useState<Stand>("nu");
  const taak = taken[taakSleutel];
  const met = stand === "met";

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-14">
      <div>
        <h2 className="text-[30px] sm:text-[40px]">Eén taak, twee manieren van werken</h2>
        <p className="mt-3 text-[17px] sm:text-lg">Kies een taak en zet de schakelaar om.</p>

        <div className="mt-6 grid gap-3">
          <Segment<TaakSleutel>
            label="Kies een taak"
            waarde={taakSleutel}
            onChange={setTaakSleutel}
            opties={[
              { waarde: "verzuim", titel: "Verzuimdossier", sub: "HR & P&O" },
              { waarde: "b1", titel: "Patiëntenbrief op B1", sub: "Communicatie" },
            ]}
          />
          <Segment<Stand>
            label="Kies de werkwijze"
            waarde={stand}
            onChange={setStand}
            opties={[
              { waarde: "nu", titel: "Nu, met de hand" },
              { waarde: "met", titel: "Met Zorgpiloten" },
            ]}
          />
        </div>

        <p className="mt-5 text-[16px] font-medium text-nachtblauw" aria-live="polite">
          {met ? "Twee blokken. Het voorwerk staat klaar, u tekent af." : "Zes losse stappen, allemaal handwerk."}
        </p>

        <Link
          href={taakgesprekHref(taak.afdeling, taak.taakSlug)}
          className="mt-4 inline-flex text-[15px] font-medium text-hemel-diep underline underline-offset-4 hover:text-nachtblauw"
        >
          Reken deze taak door in een taakgesprek
        </Link>
      </div>

      <div className="rounded-paneel bg-creme p-3 sm:p-5">
        <div key={taakSleutel} className={styles.stappen} data-stand={stand}>
          <div className={styles.groep} data-groep="a">
            <div className={styles.kop} aria-hidden={!met}>
              <div>
                <div className={styles.kopInhoud}>
                  <span className={styles.blokNr}>1</span>
                  <div>
                    <p className="font-semibold leading-snug text-nachtblauw">Voorwerk klaar, met bronverwijzing</p>
                    <p className="mt-0.5 text-[14px] leading-snug">{taak.concept}</p>
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
                  <span className={`${styles.blokNr} ${styles.blokNrU}`}>2</span>
                  <p className="font-semibold leading-snug text-nachtblauw">U controleert en tekent af</p>
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
      </div>
    </div>
  );
}
