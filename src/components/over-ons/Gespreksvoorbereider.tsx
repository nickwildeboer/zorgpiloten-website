"use client";

import { Suspense, useId, useState, type FormEvent, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { KeuzeTegel } from "./KeuzeTegel";
import { kopieerTekst } from "./kopieer";
import { Icoon, type IcoonNaam } from "./Iconen";
import {
  EIGEN_TAAK,
  afdelingLabel,
  afdelingVanTaak,
  afdelingen,
  isAfdeling,
  normaliseerTaak,
  takenVoor,
  urenOpties,
  vindTaak,
  type AfdelingSlug,
  type UrenWaarde,
} from "./taken";

const ontvanger = process.env.NEXT_PUBLIC_TAAKGESPREK_EMAIL;

const DREMPEL = "Onder de 4 uur per week raden wij geen apart automatiseringstraject aan. Kies een grotere tijdvreter of begin met een praktische teamtraining.";

const afdelingIcoon: Record<AfdelingSlug, IcoonNaam> = { hr: "team", communicatie: "megafoon", bestuur: "bestuur" };

type Keuzes = {
  afdeling: AfdelingSlug | null;
  taak: string | null;
  eigenTaak: string;
  uren: UrenWaarde | null;
};

function taakOmschrijving(k: Keuzes): string | null {
  if (!k.afdeling || !k.taak) return null;
  if (k.taak === EIGEN_TAAK) return k.eigenTaak.trim() || null;
  return vindTaak(k.afdeling, k.taak)?.label ?? null;
}

function maakAgenda(k: Keuzes): string[] {
  const afdeling = k.afdeling ? afdelingLabel(k.afdeling) : null;
  const taak = taakOmschrijving(k);
  const training = k.taak === "teamtraining";
  const uren = urenOpties.find((u) => u.waarde === k.uren);

  const punten = [afdeling ? `Kennismaking en hoe het werk op ${afdeling} nu loopt` : "Kennismaking en hoe het werk op uw afdeling nu loopt"];

  if (training) {
    punten.push("Wat het team nu al met AI doet en waar de vragen zitten");
    punten.push("Welke taken de meeste tijd kosten en waar AI veilig kan helpen");
  } else {
    punten.push(`${taak ?? "De taak"} stap voor stap: wie doet wat, hoe vaak en in welk systeem`);
    if (!uren) punten.push("Grof doorrekenen wat de taak nu kost en welk deel voorwerk kan worden");
    else if (uren.waarde === "onbekend") punten.push("Samen schatten hoeveel tijd er per week in de taak zit");
    else if (uren.waarde === "2-4") punten.push("Grof doorrekenen: 2 tot 4 uur per week. We kijken eerlijk of een apart traject loont");
    else punten.push(`Grof doorrekenen: ${uren.label.toLowerCase()} per week, en welk deel voorwerk kan worden`);
  }

  punten.push("Gegevens en veiligheid: wat zit erin en wie kijkt mee, zoals FG of ICT");
  punten.push("Een passende vervolgstap, als die er is");
  return punten;
}

function maakTekst(k: Keuzes, aanvrager?: { naam: string; organisatie: string; email: string }): string {
  const uren = urenOpties.find((u) => u.waarde === k.uren);
  const regels = [
    "Taakgesprek met Hugo en Nick (45 minuten)",
    "",
    `Afdeling: ${k.afdeling ? afdelingLabel(k.afdeling) : "nog niet gekozen"}`,
    `Taak: ${taakOmschrijving(k) ?? "nog niet gekozen"}`,
    `Tijd per week nu: ${uren ? uren.label.toLowerCase() : "nog niet gekozen"}`,
    "",
    "Agenda",
    ...maakAgenda(k).map((p, i) => `${i + 1}. ${p}`),
  ];
  if (k.uren === "2-4") regels.push("", DREMPEL);
  if (aanvrager && (aanvrager.naam || aanvrager.organisatie || aanvrager.email)) {
    regels.push("", "Aangevraagd door");
    if (aanvrager.naam) regels.push(`Naam: ${aanvrager.naam}`);
    if (aanvrager.organisatie) regels.push(`Organisatie: ${aanvrager.organisatie}`);
    if (aanvrager.email) regels.push(`E-mail: ${aanvrager.email}`);
  }
  return regels.join("\n");
}

/** Leest ?afdeling= en ?taak= uit de link. Oude korte slugs (verzuim, b1-folders, crisis) werken via de aliassen. */
function beginKeuzes(afdelingParam: string | null, taakParam: string | null): Keuzes {
  const taakSlug = normaliseerTaak(taakParam);
  const afdeling = isAfdeling(afdelingParam) ? afdelingParam : (afdelingVanTaak(taakSlug) ?? null);
  const taak = afdeling && vindTaak(afdeling, taakSlug) ? taakSlug : null;
  return { afdeling, taak, eigenTaak: "", uren: null };
}

function Stapkop({ nummer, children, klaar }: { nummer: number; children: ReactNode; klaar: boolean }) {
  return (
    <legend className="flex items-center gap-3 text-[20px] font-semibold leading-snug text-nachtblauw">
      <span
        aria-hidden="true"
        className={`grid h-9 w-9 flex-none place-items-center rounded-full font-display text-[16px] font-bold transition-colors ${
          klaar ? "bg-zandgeel text-nachtblauw" : "bg-wolk text-nachtblauw ring-1 ring-lijn"
        }`}
      >
        {klaar ? <Icoon naam="vink" className="h-4 w-4" /> : nummer}
      </span>
      <span>
        <span className="sr-only">Stap {nummer}: </span>
        {children}
      </span>
    </legend>
  );
}

function Voorbereider({ begin, portretten }: { begin: Keuzes; portretten?: ReactNode }) {
  const [keuzes, setKeuzes] = useState<Keuzes>(begin);
  const [naam, setNaam] = useState("");
  const [organisatie, setOrganisatie] = useState("");
  const [email, setEmail] = useState("");
  const [melding, setMelding] = useState("");
  const [fout, setFout] = useState("");
  const id = useId();

  const taken = keuzes.afdeling ? takenVoor(keuzes.afdeling) : [];
  const agenda = maakAgenda(keuzes);
  const uren = urenOpties.find((u) => u.waarde === keuzes.uren);
  const taakTekst = taakOmschrijving(keuzes);

  function kiesAfdeling(waarde: string) {
    if (!isAfdeling(waarde)) return;
    setKeuzes((k) => ({ ...k, afdeling: waarde, taak: k.taak && vindTaak(waarde, k.taak) ? k.taak : null }));
    setMelding("");
    setFout("");
  }

  async function kopieer() {
    const gelukt = await kopieerTekst(maakTekst(keuzes, { naam, organisatie, email }));
    setFout("");
    setMelding(gelukt ? "Gesprekskaart gekopieerd. Plak hem in een mail of document." : "Kopiëren lukte niet. Selecteer de tekst van de kaart en kopieer hem zelf.");
  }

  function verstuur(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!ontvanger) return;
    if (!keuzes.afdeling || !taakTekst) {
      setMelding("");
      setFout(keuzes.taak === EIGEN_TAAK ? "Beschrijf eerst uw eigen taak in stap 2." : "Kies eerst een afdeling en een taak.");
      return;
    }
    setFout("");
    const onderwerp = `Taakgesprek: ${taakTekst}`;
    const body = maakTekst(keuzes, { naam, organisatie, email }).replace(/\n/g, "\r\n");
    window.location.href = `mailto:${ontvanger}?subject=${encodeURIComponent(onderwerp)}&body=${encodeURIComponent(body)}`;
    setMelding("Uw mailprogramma opent met de gesprekskaart. Verstuur de mail om het gesprek aan te vragen.");
  }

  const veld =
    "mt-1 block w-full rounded-kaart border border-lijn-sterk bg-wolk px-3 py-2.5 text-[16px] text-nachtblauw placeholder:text-nachtblauw-zacht focus-visible:border-nachtblauw";

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-12">
      <div className="space-y-10">
        <fieldset>
          <Stapkop nummer={1} klaar={Boolean(keuzes.afdeling)}>
            Kies uw afdeling
          </Stapkop>
          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            {afdelingen.map((a) => (
              <KeuzeTegel
                key={a.slug}
                naam={`${id}-afdeling`}
                waarde={a.slug}
                gekozen={keuzes.afdeling === a.slug}
                onKies={kiesAfdeling}
                titel={a.label}
                icoon={<Icoon naam={afdelingIcoon[a.slug]} className="h-5 w-5" />}
              />
            ))}
          </div>
        </fieldset>

        <fieldset>
          <Stapkop nummer={2} klaar={Boolean(taakTekst)}>
            Welke taak wilt u doorrekenen?
          </Stapkop>
          {keuzes.afdeling ? (
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {taken.map((t) => (
                <KeuzeTegel
                  key={t.slug}
                  naam={`${id}-taak`}
                  waarde={t.slug}
                  gekozen={keuzes.taak === t.slug}
                  onKies={(w) => {
                    setKeuzes((k) => ({ ...k, taak: w }));
                    setFout("");
                  }}
                  titel={t.label}
                  toelichting={t.kort}
                  compact
                />
              ))}
            </div>
          ) : (
            <p className="mt-3 pl-12 text-[15px]">Kies eerst uw afdeling, dan verschijnen hier de taken.</p>
          )}
          {keuzes.taak === EIGEN_TAAK && (
            <div className="mt-4">
              <label htmlFor={`${id}-eigen`} className="text-[15px] font-semibold text-nachtblauw">
                Beschrijf de taak
              </label>
              <input
                id={`${id}-eigen`}
                type="text"
                value={keuzes.eigenTaak}
                onChange={(e) => setKeuzes((k) => ({ ...k, eigenTaak: e.target.value }))}
                placeholder="Bijvoorbeeld roosterwijzigingen verwerken"
                maxLength={120}
                className={veld}
              />
            </div>
          )}
        </fieldset>

        <fieldset>
          <Stapkop nummer={3} klaar={Boolean(uren)}>
            Hoeveel tijd zit hier nu in?
          </Stapkop>
          <p className="mt-1 pl-12 text-[15px]">Per week, voor de hele afdeling samen.</p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {urenOpties.map((u) => (
              <KeuzeTegel
                key={u.waarde}
                naam={`${id}-uren`}
                waarde={u.waarde}
                gekozen={keuzes.uren === u.waarde}
                onKies={(w) => setKeuzes((k) => ({ ...k, uren: w as UrenWaarde }))}
                titel={u.label}
                compact
              />
            ))}
          </div>
        </fieldset>
      </div>

      <div className="lg:sticky lg:top-24 lg:self-start">
        <form onSubmit={verstuur} className="overflow-hidden rounded-[var(--radius-lg)] border border-lijn bg-wolk shadow-kaart" aria-labelledby={`${id}-kaart`}>
          <div className="bg-nachtblauw px-5 pb-5 pt-6 sm:px-7">
            <div className="flex items-center gap-4">
              {portretten}
              <div>
                <h3 id={`${id}-kaart`} className="text-[22px] sm:text-[24px]" style={{ color: "var(--on-ink)" }}>
                  Uw gesprekskaart
                </h3>
                <p className="flex items-center gap-1.5 text-[15px]" style={{ color: "var(--on-ink-soft)" }}>
                  <Icoon naam="klok" className="h-4 w-4 text-zandgeel" />
                  45 minuten met Hugo en Nick
                </p>
              </div>
            </div>
            <dl className="mt-5 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-[15px]">
              <dt style={{ color: "var(--on-ink-muted)" }}>Afdeling</dt>
              <dd className="text-creme">{keuzes.afdeling ? afdelingLabel(keuzes.afdeling) : "Nog niet gekozen"}</dd>
              <dt style={{ color: "var(--on-ink-muted)" }}>Taak</dt>
              <dd className="text-creme">{taakTekst ?? "Nog niet gekozen"}</dd>
              <dt style={{ color: "var(--on-ink-muted)" }}>Tijd per week</dt>
              <dd className="text-creme">{uren ? uren.label : "Nog niet gekozen"}</dd>
            </dl>
          </div>

          <div className="px-5 py-5 sm:px-7" aria-live="polite">
            <p className="text-[15px] font-semibold text-nachtblauw">Agenda</p>
            <ol className="relative mt-3 space-y-3 before:absolute before:bottom-2 before:left-[5px] before:top-2 before:w-[2px] before:bg-zandgeel before:content-['']">
              {agenda.map((punt, i) => (
                <li key={i} className="relative flex gap-3 text-[15px] leading-snug">
                  <span aria-hidden="true" className="relative mt-[5px] h-3 w-3 flex-none rounded-full border-2 border-nachtblauw bg-wolk" />
                  <span className="text-nachtblauw">{punt}</span>
                </li>
              ))}
            </ol>
            {keuzes.uren === "2-4" && <p className="mt-4 rounded-kaart bg-hemel-zacht px-3 py-2.5 text-sm text-nachtblauw">{DREMPEL}</p>}
          </div>

          <div className="space-y-4 border-t border-lijn px-5 py-6 sm:px-7">
            <div>
              <label htmlFor={`${id}-naam`} className="text-[15px] font-semibold text-nachtblauw">
                Naam
              </label>
              <input id={`${id}-naam`} type="text" autoComplete="name" required value={naam} onChange={(e) => setNaam(e.target.value)} className={veld} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor={`${id}-organisatie`} className="text-[15px] font-semibold text-nachtblauw">
                  Organisatie
                </label>
                <input
                  id={`${id}-organisatie`}
                  type="text"
                  autoComplete="organization"
                  required
                  value={organisatie}
                  onChange={(e) => setOrganisatie(e.target.value)}
                  className={veld}
                />
              </div>
              <div>
                <label htmlFor={`${id}-email`} className="text-[15px] font-semibold text-nachtblauw">
                  E-mail
                </label>
                <input id={`${id}-email`} type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={veld} />
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-1 sm:flex-row">
              <button
                type="submit"
                disabled={!ontvanger}
                aria-describedby={!ontvanger ? `${id}-geen-adres` : undefined}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-koraal px-5 py-2.5 text-[15px] font-semibold text-nachtblauw hover:bg-zandgeel disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-koraal"
              >
                <Icoon naam="mail" className="h-[18px] w-[18px]" />
                Verstuur via e-mail
              </button>
              <button
                type="button"
                onClick={kopieer}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border-2 border-nachtblauw px-5 py-2 text-[15px] font-semibold text-nachtblauw hover:bg-hemel-zacht"
              >
                <Icoon naam="kopieer" className="h-[18px] w-[18px]" />
                Kopieer gesprekskaart
              </button>
            </div>
            {!ontvanger && (
              <p id={`${id}-geen-adres`} className="text-sm">
                Het mailadres wordt nog ingesteld. Kopieer zolang de gesprekskaart.
              </p>
            )}
            <p role="status" className="min-h-[1.25em] text-[15px] text-nachtblauw">
              {melding}
            </p>
            {fout && (
              <p role="alert" className="text-[15px] font-semibold text-koraal-diep">
                {fout}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

function MetZoekparameters({ portretten }: { portretten?: ReactNode }) {
  const params = useSearchParams();
  const afdeling = params.get("afdeling");
  const taak = params.get("taak");
  return <Voorbereider key={`${afdeling ?? ""}|${taak ?? ""}`} begin={beginKeuzes(afdeling, taak)} portretten={portretten} />;
}

/** De gespreksvoorbereider. Leest ?afdeling= en ?taak= uit de URL en vult die vooraf in. */
export function Gespreksvoorbereider({ portretten }: { portretten?: ReactNode }) {
  return (
    <Suspense fallback={<Voorbereider begin={beginKeuzes(null, null)} portretten={portretten} />}>
      <MetZoekparameters portretten={portretten} />
    </Suspense>
  );
}
