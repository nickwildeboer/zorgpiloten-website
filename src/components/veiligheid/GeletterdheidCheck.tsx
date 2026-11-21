"use client";

import { useState } from "react";
import { kopieerTekst } from "@/components/over-ons/kopieer";
import { Icoon } from "@/components/home/Iconen";
import { VeiligIcoon } from "./Iconen";

type Antwoord = "ja" | "nee" | "weet-niet";

const antwoordLabels: Record<Antwoord, string> = { ja: "Ja", nee: "Nee", "weet-niet": "Weet ik niet" };

type Vraag = { vraag: string; reactie: Record<Antwoord, string>; stap?: Partial<Record<Antwoord, string>> };

const vragen: Vraag[] = [
  {
    vraag: "Gebruiken collega's nu wel eens AI voor teksten?",
    reactie: {
      ja: "Dan is AI al onderdeel van het werk.",
      nee: "Ga na of collega's het op eigen houtje al doen.",
      "weet-niet": "Een korte rondvraag geeft snel een eerlijk beeld.",
    },
    stap: {
      ja: "Breng in kaart welke AI-toepassingen collega's nu gebruiken en waarvoor.",
      nee: "Ga met een korte rondvraag na of collega's op eigen initiatief AI gebruiken.",
      "weet-niet": "Doe een korte rondvraag op de afdelingen: wie gebruikt AI, welke tool en waarvoor.",
    },
  },
  {
    vraag: "Zijn de spelregels over persoonsgegevens vastgelegd?",
    reactie: {
      ja: "Goed. Check of ze ook op de werkvloer bekend zijn.",
      nee: "Dan is dit een goed eerste gesprek met uw FG.",
      "weet-niet": "Uw FG weet het. Vraag het na.",
    },
    stap: {
      ja: "Check of de spelregels over persoonsgegevens bekend zijn bij medewerkers die AI gebruiken.",
      nee: "Stel met de FG spelregels op over welke gegevens wel en niet in een AI-dienst mogen.",
      "weet-niet": "Vraag de FG of er spelregels over persoonsgegevens en AI zijn vastgelegd.",
    },
  },
  {
    vraag: "Hebben medewerkers een praktische training gehad?",
    reactie: {
      ja: "Mooi. Houd bij wie welke training heeft gehad.",
      nee: "Een praktische training op eigen taken is een logische maatregel.",
      "weet-niet": "HR of opleidingen kan het snel nagaan.",
    },
    stap: {
      ja: "Houd bij welke medewerkers welke training hebben gevolgd.",
      nee: "Plan een praktische training veilig AI-gebruik op taken uit het eigen werk.",
      "weet-niet": "Ga bij HR of opleidingen na welke AI-trainingen er zijn gevolgd.",
    },
  },
  {
    vraag: "Is vastgelegd welke maatregelen de organisatie neemt voor AI-geletterdheid?",
    reactie: {
      ja: "Goed. Houd het bij. Een certificaat is niet nodig.",
      nee: "Begin klein. Een certificaat is niet nodig, u legt zelf vast.",
      "weet-niet": "Vraag het na bij de FG of het MT.",
    },
    stap: {
      ja: "Houd het overzicht van maatregelen voor AI-geletterdheid actueel.",
      nee: "Leg vast welke maatregelen de organisatie neemt om AI-geletterdheid te ondersteunen.",
      "weet-niet": "Ga na of en waar de maatregelen voor AI-geletterdheid zijn vastgelegd.",
    },
  },
];

const feiten = [
  "Artikel 4 van de AI-verordening geldt sinds 2 februari 2025 voor organisaties die AI inzetten.",
  "Een certificaat is niet nodig. U legt zelf vast welke maatregelen u neemt.",
  "Sinds de Digital Omnibus, in werking sinds 27 juli 2026, gaat het om maatregelen die AI-geletterdheid ondersteunen.",
  "Nationale toezichthouders houden sinds 2 augustus 2026 toezicht.",
];

const disclaimer = "Dit is geen juridisch advies. De FG of jurist beoordeelt wat voor de organisatie geldt.";
const slotstap = "Bespreek deze samenvatting met de FG, ICT en het MT en spreek af wie de maatregelen vastlegt.";

function maakSamenvatting(antwoorden: Antwoord[]): string {
  const stappen = vragen.map((v, i) => v.stap?.[antwoorden[i]]).filter((s): s is string => Boolean(s));
  stappen.push(slotstap);

  return [
    "AI-geletterdheid en veilig AI-gebruik: stand van zaken",
    "Ingevuld met de zelfcheck op zorgpiloten.nl/veiligheid",
    "",
    "Antwoorden",
    ...vragen.map((v, i) => `${i + 1}. ${v.vraag} ${antwoordLabels[antwoorden[i]]}`),
    "",
    "Wat vaststaat",
    ...feiten.map((f) => `- ${f}`),
    "",
    "Volgende stappen",
    ...stappen.map((s, i) => `${i + 1}. ${s}`),
    "",
    disclaimer,
  ].join("\n");
}

export function GeletterdheidCheck() {
  const [antwoorden, setAntwoorden] = useState<(Antwoord | null)[]>([null, null, null, null]);
  const [status, setStatus] = useState<"" | "gekopieerd" | "mislukt">("");

  const aantal = antwoorden.filter(Boolean).length;
  const klaar = aantal === vragen.length;
  const samenvatting = klaar ? maakSamenvatting(antwoorden as Antwoord[]) : "";

  function kies(i: number, a: Antwoord) {
    setAntwoorden((huidig) => huidig.map((x, j) => (j === i ? a : x)));
    setStatus("");
  }

  async function kopieer() {
    const gelukt = await kopieerTekst(samenvatting);
    setStatus(gelukt ? "gekopieerd" : "mislukt");
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-14">
      <ol className="border-t border-lijn-koel">
        {vragen.map((v, i) => {
          const gekozen = antwoorden[i];
          return (
            <li key={v.vraag} className="flex gap-4 border-b border-lijn-koel py-6 sm:gap-5">
              <span aria-hidden="true" className="grid h-7 w-7 flex-none place-items-center pt-0.5 font-display text-[18px] font-semibold text-hemel-diep">
                {gekozen ? <Icoon naam="vink" /> : i + 1}
              </span>
              <fieldset className="min-w-0 flex-1">
                <legend className="text-[18px] font-semibold leading-snug text-nachtblauw">{v.vraag}</legend>
                <div className="mt-4 flex flex-wrap gap-2">
                  {(Object.keys(antwoordLabels) as Antwoord[]).map((a) => {
                    const actief = gekozen === a;
                    return (
                      <label
                        key={a}
                        className={`inline-flex min-h-[44px] cursor-pointer items-center rounded-full border px-5 text-[15px] transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-hemel-diep ${
                          actief ? "border-nachtblauw bg-nachtblauw font-semibold text-creme" : "border-lijn-koel bg-wolk text-nachtblauw hover:border-nachtblauw/40"
                        }`}
                      >
                        <input type="radio" name={`geletterdheid-${i}`} value={a} checked={actief} onChange={() => kies(i, a)} className="sr-only" />
                        {antwoordLabels[a]}
                      </label>
                    );
                  })}
                </div>
                <div aria-live="polite">{gekozen && <p className="mt-3 text-[16px] text-nachtblauw">{v.reactie[gekozen]}</p>}</div>
              </fieldset>
            </li>
          );
        })}
      </ol>

      <aside className="lg:sticky lg:top-24 lg:self-start" aria-label="Overzicht">
        <div className="rounded-[var(--radius-lg)] bg-nachtblauw p-6 sm:p-8" style={{ color: "var(--on-ink-soft)" }}>
          <p className="text-[15px] font-semibold text-creme" aria-live="polite">
            {klaar ? "Uw overzicht is klaar" : `${aantal} van ${vragen.length} beantwoord`}
          </p>
          <div aria-hidden="true" className="mt-3 h-1 overflow-hidden rounded-full bg-[var(--white-15)]">
            <div
              className="h-full origin-left rounded-full bg-zandgeel motion-safe:transition-transform motion-safe:duration-300"
              style={{ transform: `scaleX(${aantal / vragen.length})` }}
            />
          </div>

          {klaar ? (
            <div>
              <h3 className="mt-7 text-[22px]" style={{ color: "var(--on-ink)" }}>
                Volgende stappen
              </h3>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-[15px]">
                {vragen.map((v, i) => {
                  const s = v.stap?.[antwoorden[i] as Antwoord];
                  return s ? <li key={v.vraag}>{s}</li> : null;
                })}
                <li>{slotstap}</li>
              </ol>
              <button
                type="button"
                onClick={kopieer}
                className="mt-7 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-creme px-5 py-3 text-center text-[15px] font-semibold text-nachtblauw transition-colors hover:bg-wolk focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-creme"
              >
                {status === "gekopieerd" ? <Icoon naam="vink" grootte={20} /> : <VeiligIcoon naam="kopieer" grootte={20} />}
                Kopieer de samenvatting voor FG, ICT of MT
              </button>
              <p role="status" className="mt-3 min-h-[1.5em] text-[15px] text-creme">
                {status === "gekopieerd" && "Gekopieerd. Plak de samenvatting in een mail of document."}
                {status === "mislukt" && "Kopiëren lukte niet. Selecteer de tekst hieronder en kopieer hem zelf."}
              </p>
              {status === "mislukt" && (
                <label className="mt-2 block text-[15px]">
                  <span className="sr-only">Samenvatting om zelf te kopiëren</span>
                  <textarea
                    readOnly
                    value={samenvatting}
                    rows={10}
                    onFocus={(e) => e.currentTarget.select()}
                    className="w-full rounded-kaart bg-wolk p-3 text-sm text-nachtblauw"
                  />
                </label>
              )}
            </div>
          ) : (
            <div>
              <h3 className="mt-7 text-[22px]" style={{ color: "var(--on-ink)" }}>
                Wat vaststaat
              </h3>
              <ul className="mt-4 space-y-3 text-[15px] leading-snug">
                {feiten.map((f) => (
                  <li key={f} className="flex gap-3">
                    <Icoon naam="vink" grootte={20} className="text-zandgeel" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <p className="mt-3 text-sm">{disclaimer}</p>
      </aside>
    </div>
  );
}
