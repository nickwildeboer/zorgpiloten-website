/**
 * Gedeelde lijst met afdelingen en taken voor de gespreksvoorbereider op /over-ons.
 * Andere pagina's (/hr, /communicatie, home) kunnen deze slugs gebruiken met
 * taakgesprekHref(afdeling, taak) uit src/lib/navigatie.ts.
 */

export type AfdelingSlug = "hr" | "communicatie" | "bestuur";

export type Taak = {
  slug: string;
  label: string;
  /** Eén zin over wat er in het gesprek op tafel komt. */
  kort: string;
};

export const afdelingen: { slug: AfdelingSlug; label: string; kort: string }[] = [
  { slug: "hr", label: "HR & P&O", kort: "Cao-vragen, verzuim, werving en onboarding" },
  { slug: "communicatie", label: "Communicatie", kort: "B1-teksten, intranet, werving en crisis" },
  { slug: "bestuur", label: "Bestuur of overkoepelend", kort: "Stukken, actiepunten en AI-beleid" },
];

export const takenPerAfdeling: Record<AfdelingSlug, Taak[]> = {
  hr: [
    { slug: "cao-loket", label: "Cao-loket", kort: "Terugkerende vragen over ORT, verlof en inschaling" },
    { slug: "verzuim", label: "Verzuim en Poortwachter", kort: "Bewaken welke stap wanneer moet en welke brief klaar moet staan" },
    { slug: "vacatures", label: "Vacatureteksten", kort: "Van functieprofiel naar een tekst in de toon van de organisatie" },
    { slug: "onboarding", label: "Onboarding per functie", kort: "Inwerkschema en documenten klaarzetten" },
    { slug: "big", label: "BIG-registratie en diploma's", kort: "Tijdig signaleren en herinneren" },
  ],
  communicatie: [
    { slug: "b1-folders", label: "Patiëntenfolders en brieven op B1", kort: "Begrijpelijke taal zonder medische feiten aan te raken" },
    { slug: "intranet", label: "Intranet en medewerkersnieuwsbrief", kort: "Berichten en de nieuwsbrief voorbereiden" },
    { slug: "arbeidsmarkt", label: "Arbeidsmarktcommunicatie", kort: "Wervingscampagnes en vacaturecommunicatie" },
    { slug: "website-faq", label: "Website en veelgestelde vragen", kort: "Pagina's actueel houden" },
    { slug: "crisis", label: "Kernboodschap bij crisis", kort: "Snel een eerste concept om af te tekenen" },
  ],
  bestuur: [
    { slug: "rvt-stukken", label: "Stukken voor bestuur en toezicht", kort: "Vergaderstukken samenvatten" },
    { slug: "actiepunten", label: "Actiepunten bewaken", kort: "Actiepuntenlijsten over vergaderingen heen bijhouden" },
    { slug: "ai-beleid", label: "Van AI-beleid naar de werkvloer", kort: "Beleid dat er ligt laten landen in het werk" },
  ],
};

/** Taken die bij elke afdeling horen. */
export const algemeneTaken: Taak[] = [
  { slug: "teamtraining", label: "Teamtraining veilig AI-gebruik", kort: "Het team leert veilig en praktisch werken met AI" },
  { slug: "eigen", label: "Eigen taak invullen", kort: "Beschrijf zelf de taak die je wilt doorrekenen" },
];

export const EIGEN_TAAK = "eigen";

export function isAfdeling(waarde: string | null | undefined): waarde is AfdelingSlug {
  return waarde === "hr" || waarde === "communicatie" || waarde === "bestuur";
}

export function takenVoor(afdeling: AfdelingSlug): Taak[] {
  return [...takenPerAfdeling[afdeling], ...algemeneTaken];
}

export function vindTaak(afdeling: AfdelingSlug, slug: string | null | undefined): Taak | undefined {
  if (!slug) return undefined;
  return takenVoor(afdeling).find((t) => t.slug === slug);
}

/** Zoekt bij een losse taak-slug de afdeling erbij, voor links zonder ?afdeling=. */
export function afdelingVanTaak(slug: string | null | undefined): AfdelingSlug | undefined {
  if (!slug) return undefined;
  return (Object.keys(takenPerAfdeling) as AfdelingSlug[]).find((a) => takenPerAfdeling[a].some((t) => t.slug === slug));
}

export function afdelingLabel(afdeling: AfdelingSlug): string {
  return afdelingen.find((a) => a.slug === afdeling)?.label ?? afdeling;
}

export const urenOpties = [
  { waarde: "2-4", label: "2 tot 4 uur" },
  { waarde: "4-8", label: "4 tot 8 uur" },
  { waarde: "8+", label: "Meer dan 8 uur" },
  { waarde: "onbekend", label: "Weet ik nog niet" },
] as const;

export type UrenWaarde = (typeof urenOpties)[number]["waarde"];
