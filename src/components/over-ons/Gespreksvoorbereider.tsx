"use client";

import { Suspense, useCallback, useEffect, useId, useState, type FormEvent, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { getCalApi } from "@calcom/embed-react";
import { kennismaking, metMinuten } from "@/lib/navigatie";
import { planner } from "@/content/site";
import { KeuzeTegel } from "./KeuzeTegel";
import { kopieerTekst } from "./kopieer";
import { Icoon, type IcoonNaam } from "./Iconen";
import {
  EIGEN_TAAK,
  SESSIE_ONDERWERPEN,
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

const CAL_NAMESPACE = "kennismaking";

/** Directe Cal.com-link met de gesprekskaart vooringevuld. Terugval als het agendavenster niet opent. */
function agendaUrl(velden: { name: string; email: string; notes: string }) {
  const params = new URLSearchParams(velden);
  return `https://cal.com/${kennismaking.calLink}?${params.toString()}`;
}

/** Laadt Cal.com één keer en zet de agenda in de Horizon-kleuren. */
function useAgenda(opGepland: () => void) {
  useEffect(() => {
    let actief = true;
    getCalApi({ namespace: CAL_NAMESPACE })
      .then((cal) => {
        if (!actief) return;
        cal("ui", {
          theme: "light",
          hideEventTypeDetails: false,
          layout: "month_view",
          cssVarsPerTheme: { light: { "cal-brand": "#1B2A4A" }, dark: { "cal-brand": "#FFF8EF" } },
        });
        cal("on", { action: "bookingSuccessful", callback: opGepland });
      })
      .catch(() => {});
    return () => {
      actief = false;
    };
  }, [opGepland]);
}

const DREMPEL = planner.drempel;

const afdelingIcoon: Record<AfdelingSlug, IcoonNaam> = { hr: "team", communicatie: "megafoon", bestuur: "bestuur", anders: "klembord" };

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
  const afdeling = k.afdeling && k.afdeling !== "anders" ? afdelingLabel(k.afdeling) : null;
  const taak = taakOmschrijving(k);
  const sessie = Boolean(k.taak && SESSIE_ONDERWERPEN.includes(k.taak));
  const uren = urenOpties.find((u) => u.waarde === k.uren);

  const punten = [afdeling ? planner.agendaStartAfdeling.replace("[AFDELING]", afdeling) : planner.agendaStart];

  if (sessie || !taak) {
    punten.push(planner.agendaSessie1);
    punten.push(planner.agendaSessie2);
  } else {
    punten.push(planner.agendaTaak1.replace("[ONDERWERP]", taak.charAt(0).toLowerCase() + taak.slice(1)));
    if (!uren) punten.push(planner.agendaTaakKosten);
    else if (uren.waarde === "onbekend") punten.push(planner.agendaTaakSchatten);
    else if (uren.waarde === "2-4") punten.push(planner.agendaTaakKlein);
    else punten.push(planner.agendaTaakUren.replace("[UREN]", uren.label.toLowerCase()));
  }

  punten.push(planner.agendaVeilig);
  punten.push(planner.agendaVervolg);
  return punten;
}

function maakTekst(k: Keuzes, aanvrager?: { naam: string; organisatie: string; email: string }): string {
  const uren = urenOpties.find((u) => u.waarde === k.uren);
  const regels = [
    metMinuten(planner.tekstversieKop),
    "",
    `${planner.kaartAfdeling}: ${k.afdeling ? afdelingLabel(k.afdeling) : planner.kaartLeeg.toLowerCase()}`,
    `${planner.kaartOnderwerp}: ${taakOmschrijving(k) ?? planner.kaartLeeg.toLowerCase()}`,
    `${planner.kaartTijd}: ${uren ? uren.label.toLowerCase() : planner.kaartLeeg.toLowerCase()}`,
    "",
    planner.kaartAgenda,
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
  const [terugval, setTerugval] = useState<string | null>(null);
  const [gepland, setGepland] = useState(false);
  const id = useId();
  // Na een geboekt gesprek wisselt de kaart naar de bevestiging.
  const opGepland = useCallback(() => {
    setGepland(true);
    setMelding("");
  }, []);
  useAgenda(opGepland);

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
    setMelding(gelukt ? planner.meldingGekopieerd : planner.meldingKopierenMislukt);
  }

  async function planIn(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!keuzes.afdeling || !taakTekst) {
      setMelding("");
      setFout(keuzes.taak === EIGEN_TAAK ? planner.foutEigen : planner.foutKeuze);
      return;
    }
    setFout("");
    const velden = { name: naam.trim(), email: email.trim(), notes: maakTekst(keuzes, { naam, organisatie, email }) };
    const url = agendaUrl(velden);
    setTerugval(url);
    try {
      const cal = await Promise.race([
        getCalApi({ namespace: CAL_NAMESPACE }),
        new Promise<never>((_, nee) => setTimeout(() => nee(new Error("timeout")), 5000)),
      ]);
      cal("modal", { calLink: kennismaking.calLink, config: { ...velden, layout: "month_view" } });
      setMelding(planner.meldingAgendaOpen);
    } catch {
      window.open(url, "_blank", "noopener");
      setMelding(planner.meldingAgendaTabblad);
    }
  }

  const veld =
    "mt-1 block w-full rounded-kaart border border-lijn-sterk bg-wolk px-3 py-2.5 text-[16px] text-nachtblauw placeholder:text-nachtblauw-zacht focus-visible:border-nachtblauw";

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-12">
      <div className="space-y-10">
        <fieldset>
          <Stapkop nummer={1} klaar={Boolean(keuzes.afdeling)}>
            {planner.stap1}
          </Stapkop>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
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
            {planner.stap2}
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
            <p className="mt-3 pl-12 text-[15px]">{planner.stap2Leeg}</p>
          )}
          {keuzes.taak === EIGEN_TAAK && (
            <div className="mt-4">
              <label htmlFor={`${id}-eigen`} className="text-[15px] font-semibold text-nachtblauw">
                {planner.eigenLabel}
              </label>
              <input
                id={`${id}-eigen`}
                type="text"
                value={keuzes.eigenTaak}
                onChange={(e) => setKeuzes((k) => ({ ...k, eigenTaak: e.target.value }))}
                placeholder={planner.eigenVoorbeeld}
                maxLength={120}
                className={veld}
              />
            </div>
          )}
        </fieldset>

        <fieldset>
          <Stapkop nummer={3} klaar={Boolean(uren)}>
            {planner.stap3}
          </Stapkop>
          <p className="mt-1 pl-12 text-[15px]">
            {planner.stap3Uitleg} {planner.stap3Overslaan}
          </p>
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
        <form onSubmit={planIn} className="overflow-hidden rounded-[var(--radius-lg)] border border-lijn bg-wolk shadow-kaart" aria-labelledby={`${id}-kaart`}>
          <div className="bg-nachtblauw px-5 pb-5 pt-6 sm:px-7">
            <div className="flex items-center gap-4">
              {portretten}
              <div>
                <h3 id={`${id}-kaart`} className="text-[22px] sm:text-[24px]" style={{ color: "var(--on-ink)" }}>
                  {planner.kaartTitel}
                </h3>
                <p className="flex items-center gap-1.5 text-[15px]" style={{ color: "var(--on-ink-soft)" }}>
                  <Icoon naam="klok" className="h-4 w-4 text-zandgeel" />
                  {metMinuten(planner.kaartDuur)}
                </p>
              </div>
            </div>
            <dl className="mt-5 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-[15px]">
              <dt style={{ color: "var(--on-ink-muted)" }}>{planner.kaartAfdeling}</dt>
              <dd className="text-creme">{keuzes.afdeling ? afdelingLabel(keuzes.afdeling) : planner.kaartLeeg}</dd>
              <dt style={{ color: "var(--on-ink-muted)" }}>{planner.kaartOnderwerp}</dt>
              <dd className="text-creme">{taakTekst ?? planner.kaartLeeg}</dd>
              <dt style={{ color: "var(--on-ink-muted)" }}>{planner.kaartTijd}</dt>
              <dd className="text-creme">{uren ? uren.label : planner.kaartLeeg}</dd>
            </dl>
          </div>

          <div className="px-5 py-5 sm:px-7" aria-live="polite">
            <p className="text-[15px] font-semibold text-nachtblauw">{planner.kaartAgenda}</p>
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

            {gepland ? (
              <div className="rounded-kaart bg-hemel-zacht px-4 py-3 text-[15px] text-nachtblauw">
                <p className="flex items-center gap-2 font-semibold">
                  <Icoon naam="vink" className="h-[18px] w-[18px]" />
                  {planner.geplandTitel}
                </p>
                <p className="mt-1">{planner.geplandTekst}</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3 pt-1">
                <button
                  type="submit"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-koraal px-6 py-3 text-[16px] font-semibold text-nachtblauw hover:bg-[var(--koraal-hover)]"
                >
                  <Icoon naam="kalender" className="h-[18px] w-[18px]" />
                  {planner.knopAgenda}
                </button>
                <button
                  type="button"
                  onClick={kopieer}
                  className="inline-flex min-h-[44px] items-center justify-center self-center rounded-full px-3 text-[15px] font-semibold text-hemel-diep underline-offset-4 hover:underline"
                >
                  {planner.knopKopieer}
                </button>
              </div>
            )}
            <p role="status" className="min-h-[1.25em] text-[15px] text-nachtblauw">
              {melding}
              {terugval && !gepland && (
                <>
                  {" "}
                  <a href={terugval} target="_blank" rel="noopener" className="font-semibold text-hemel-diep underline underline-offset-4">
                    {planner.meldingTerugval}
                  </a>
                </>
              )}
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
