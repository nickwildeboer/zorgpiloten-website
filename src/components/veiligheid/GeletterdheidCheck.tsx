"use client";

import { useState } from "react";
import { kopieerTekst } from "@/components/over-ons/kopieer";

type Antwoord = "ja" | "nee" | "weet-niet";

const antwoordLabels: Record<Antwoord, string> = { ja: "Ja", nee: "Nee", "weet-niet": "Weet ik niet" };

type Vraag = { vraag: string; reactie: Record<Antwoord, string>; stap?: Partial<Record<Antwoord, string>> };

const vragen: Vraag[] = [
  {
    vraag: "Gebruiken collega's nu wel eens AI voor teksten?",
    reactie: {
      ja: "Dan is AI al onderdeel van het werk. Artikel 4 van de AI-verordening geldt sinds 2 februari 2025 voor organisaties die AI inzetten.",
      nee: "Ook als AI officieel niet gebruikt wordt, loont het om na te gaan of collega's het op eigen houtje al doen.",
      "weet-niet": "Een korte rondvraag op de afdeling geeft snel een eerlijk beeld.",
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
      ja: "Goed. Check of die spelregels ook bekend zijn op de werkvloer, en niet alleen op papier staan.",
      nee: "Dan is dit een goed eerste gesprek met je FG. Welke gegevens mogen wel en niet in een AI-dienst.",
      "weet-niet": "Je FG weet of er spelregels liggen. Vraag het na.",
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
      ja: "Mooi. Houd bij wie welke training heeft gehad, dan kun je dat later laten zien.",
      nee: "Een praktische training op eigen taken is een logische maatregel om AI-geletterdheid te ondersteunen.",
      "weet-niet": "HR of de afdeling opleidingen kan dat meestal snel nagaan.",
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
      ja: "Goed. Een certificaat is niet nodig. Het gaat erom dat je zelf vastlegt welke maatregelen je neemt, en dat bijhoudt.",
      nee: "Dat kan klein beginnen. Een certificaat is niet nodig, je legt zelf vast welke maatregelen je neemt.",
      "weet-niet": "Vraag het na bij de FG of het MT. Een certificaat is niet nodig, het gaat om je eigen vastlegging.",
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
  "Een certificaat is niet nodig. Je legt zelf vast welke maatregelen je neemt.",
  "Sinds de Digital Omnibus, in werking sinds 27 juli 2026, gaat het om maatregelen die AI-geletterdheid ondersteunen.",
  "Nationale toezichthouders houden sinds 2 augustus 2026 toezicht.",
];

const disclaimer = "Dit is geen juridisch advies. De FG of jurist beoordeelt wat voor de organisatie geldt.";

function maakSamenvatting(antwoorden: Antwoord[]): string {
  const stappen = vragen.map((v, i) => v.stap?.[antwoorden[i]]).filter((s): s is string => Boolean(s));
  stappen.push("Bespreek deze samenvatting met de FG, ICT en het MT en spreek af wie de maatregelen vastlegt.");

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
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-12">
      <div>
        <ol className="space-y-4">
          {vragen.map((v, i) => {
            const gekozen = antwoorden[i];
            return (
              <li key={v.vraag} className="rounded-kaart border border-lijn bg-wolk px-4 py-5 sm:px-6">
                <fieldset>
                  <legend className="text-[17px] font-medium leading-snug text-tekst">
                    <span className="text-tekst-zacht">{i + 1}. </span>
                    {v.vraag}
                  </legend>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {(Object.keys(antwoordLabels) as Antwoord[]).map((a) => {
                      const actief = gekozen === a;
                      return (
                        <label
                          key={a}
                          className={`cursor-pointer rounded-full border px-4 py-2 text-[15px] transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-framboos-ink ${
                            actief ? "border-spar bg-spar font-medium text-white" : "border-lijn-sterk text-tekst-2 hover:bg-salie hover:text-tekst"
                          }`}
                        >
                          <input type="radio" name={`geletterdheid-${i}`} value={a} checked={actief} onChange={() => kies(i, a)} className="sr-only" />
                          {antwoordLabels[a]}
                        </label>
                      );
                    })}
                  </div>
                  <div aria-live="polite">{gekozen && <p className="mt-4 text-[15px]">{v.reactie[gekozen]}</p>}</div>
                </fieldset>
              </li>
            );
          })}
        </ol>
      </div>

      <aside className="lg:sticky lg:top-24 lg:self-start" aria-label="Overzicht">
        <div className="rounded-paneel bg-spar p-5 sm:p-7" style={{ color: "var(--on-ink-soft)" }}>
          <p className="text-[15px]" style={{ color: "var(--on-ink-muted)" }} aria-live="polite">
            {klaar ? "Je overzicht is klaar" : `${aantal} van ${vragen.length} vragen beantwoord`}
          </p>
          <div className="mt-3 h-[2px] w-full" style={{ background: "rgba(244, 246, 243, 0.18)" }} aria-hidden="true">
            <div className="h-full transition-[width] duration-300" style={{ width: `${(aantal / vragen.length) * 100}%`, background: "var(--accent-on-ink)" }} />
          </div>

          {klaar ? (
            <div>
              <h3 className="mt-6 text-[22px]" style={{ color: "var(--on-ink)" }}>
                Volgende stappen
              </h3>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-[15px]">
                {vragen.map((v, i) => {
                  const s = v.stap?.[antwoorden[i] as Antwoord];
                  return s ? <li key={v.vraag}>{s}</li> : null;
                })}
                <li>Bespreek dit met de FG, ICT en het MT en spreek af wie de maatregelen vastlegt.</li>
              </ol>
              <button
                type="button"
                onClick={kopieer}
                className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-koraal px-5 py-3 text-center text-[15px] font-semibold text-nachtblauw hover:bg-zandgeel"
              >
                Kopieer 1-pagina samenvatting voor je FG, ICT of MT
              </button>
              <p role="status" className="mt-3 min-h-[1.5em] text-[15px]" style={{ color: "var(--on-ink)" }}>
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
                    className="w-full rounded-kaart bg-wolk p-3 text-sm text-tekst"
                  />
                </label>
              )}
            </div>
          ) : (
            <div>
              <h3 className="mt-6 text-[22px]" style={{ color: "var(--on-ink)" }}>
                Wat vaststaat
              </h3>
              <ul className="mt-3 space-y-3 text-[15px]">
                {feiten.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <p className="mt-5 text-sm" style={{ color: "var(--on-ink-muted)" }}>
                Beantwoord de vier vragen, dan verschijnen hier je volgende stappen en een samenvatting om te delen.
              </p>
            </div>
          )}
        </div>
        <p className="mt-3 text-sm text-tekst-zacht">{disclaimer}</p>
      </aside>
    </div>
  );
}
