import { planner } from "@/content/site";

/**
 * Gedeelde lijst met afdelingen en onderwerpen voor de planner op /kennismaking.
 * Andere pagina's (/hr, /communicatie, /diensten) kunnen deze slugs gebruiken met
 * kennismakingHref(afdeling, taak) uit src/lib/navigatie.ts.
 */

export type AfdelingSlug = "hr" | "communicatie" | "bestuur" | "anders";

export type Taak = {
  slug: string;
  label: string;
  /** Eén zin over wat er in het gesprek op tafel komt. */
  kort: string;
};

export const afdelingen: { slug: AfdelingSlug; label: string; kort: string }[] = [
  { slug: "hr", label: "HR & P&O", kort: "Cao-vragen, verzuim, werving en onboarding" },
  { slug: "communicatie", label: "Communicatie", kort: "B1-teksten, intranet, werving en crisis" },
  { slug: "bestuur", label: "Bestuur en directie", kort: "Stukken, actiepunten en AI-beleid" },
  { slug: "anders", label: "Andere afdeling", kort: "" },
];

export const takenPerAfdeling: Record<AfdelingSlug, Taak[]> = {
  hr: [
    { slug: "cao-loket", label: "Cao-loket", kort: "Vragen over ORT, verlof en inschaling" },
    { slug: "verzuim-poortwachter", label: "Verzuim en Poortwachter", kort: "Welke stap wanneer, en welke brief klaar moet staan" },
    { slug: "vacatureteksten", label: "Vacatureteksten", kort: "Van functieprofiel naar tekst in uw eigen toon" },
    { slug: "onboarding", label: "Onboarding per functie", kort: "Inwerkschema en documenten klaarzetten" },
    { slug: "big-herregistratie", label: "BIG-registratie en diploma's", kort: "Tijdig signaleren en herinneren" },
  ],
  communicatie: [
    { slug: "patientenfolders-b1", label: "Patiëntenfolders en brieven op B1", kort: "Begrijpelijke taal, medische feiten blijven staan" },
    { slug: "intranet-nieuwsbrief", label: "Intranet en medewerkersnieuwsbrief", kort: "Berichten en de nieuwsbrief voorbereiden" },
    { slug: "arbeidsmarktcommunicatie", label: "Arbeidsmarktcommunicatie", kort: "Wervingscampagnes en vacaturecommunicatie" },
    { slug: "website-faq", label: "Website en veelgestelde vragen", kort: "Pagina's actueel houden" },
    { slug: "crisiscommunicatie", label: "Kernboodschap bij crisis", kort: "Snel een eerste concept om af te tekenen" },
  ],
  bestuur: [
    { slug: "rvt-stukken", label: "Stukken voor bestuur en toezicht", kort: "Vergaderstukken samenvatten" },
    { slug: "actiepunten", label: "Actiepunten bewaken", kort: "Actiepuntenlijsten over vergaderingen heen bijhouden" },
    { slug: "ai-beleid", label: "Van AI-beleid naar de werkvloer", kort: "Beleid dat er ligt laten landen in het werk" },
  ],
  anders: [],
};

/** Onderwerpen die bij elke afdeling te kiezen zijn: de diensten en een eigen vraag of taak. */
export const algemeneTaken: Taak[] = planner.onderwerpen.map((o) => ({ slug: o.slug, label: o.label, kort: o.kort }));

/** Onderwerpen die over een sessie of verkenning gaan en niet over één taak doorrekenen. */
export const SESSIE_ONDERWERPEN: readonly string[] = ["keynote", "koerssessie", "teamtraining", "masterclass", "kansenoverzicht"];

export const EIGEN_TAAK = "eigen";

/**
 * Oude, korte slugs blijven werken zodat bestaande links niet breken.
 * Ze wijzen naar de slugs die ook /hr en /communicatie gebruiken.
 */
export const taakAliassen: Record<string, string> = {
  verzuim: "verzuim-poortwachter",
  vacatures: "vacatureteksten",
  big: "big-herregistratie",
  "b1-folders": "patientenfolders-b1",
  intranet: "intranet-nieuwsbrief",
  arbeidsmarkt: "arbeidsmarktcommunicatie",
  crisis: "crisiscommunicatie",
};

/** Zet een taak-slug uit een link om naar de officiële slug (alias of al officieel). */
export function normaliseerTaak(slug: string | null | undefined): string | null {
  if (!slug) return null;
  const schoon = slug.trim().toLowerCase();
  return taakAliassen[schoon] ?? schoon;
}

export function isAfdeling(waarde: string | null | undefined): waarde is AfdelingSlug {
  return waarde === "hr" || waarde === "communicatie" || waarde === "bestuur" || waarde === "anders";
}

export function takenVoor(afdeling: AfdelingSlug): Taak[] {
  return [...takenPerAfdeling[afdeling], ...algemeneTaken];
}

export function vindTaak(afdeling: AfdelingSlug, slug: string | null | undefined): Taak | undefined {
  const officieel = normaliseerTaak(slug);
  if (!officieel) return undefined;
  return takenVoor(afdeling).find((t) => t.slug === officieel);
}

/** Zoekt bij een losse taak-slug de afdeling erbij, voor links zonder ?afdeling=. */
export function afdelingVanTaak(slug: string | null | undefined): AfdelingSlug | undefined {
  const officieel = normaliseerTaak(slug);
  if (!officieel) return undefined;
  const gevonden = (Object.keys(takenPerAfdeling) as AfdelingSlug[]).find((a) => takenPerAfdeling[a].some((t) => t.slug === officieel));
  // Een dienst of eigen vraag hoort bij elke afdeling: zonder afdeling in de link kiezen we "Andere afdeling".
  return gevonden ?? (algemeneTaken.some((t) => t.slug === officieel) ? "anders" : undefined);
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
