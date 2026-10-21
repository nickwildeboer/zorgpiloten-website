import type { TabTaak } from "@/components/hr/TaakTabs";
import type { VoorNaData } from "./VoorNa";

export type CommSlug = "patientenfolders-b1" | "intranet-nieuwsbrief" | "arbeidsmarktcommunicatie" | "website-faq" | "crisiscommunicatie";

export type CommTaak = TabTaak<CommSlug> & {
  /** Eén korte zin boven de demo. */
  intro: string;
  /** Wie het laatste woord heeft, voor het gegevenslabel. */
  tekentAf: string;
  /** Korte tekst op het gegevenslabel. */
  gegevens: string;
  demo: "b1" | "crisis" | VoorNaData;
};

/*
 * Bron: zorgstaf-hugo.md, sectie 6 (Communicatie). Alle voorbeelden zijn fictief.
 * Teksten voor medewerkers (nieuwsbrief, werving) staan in de je-vorm, zoals een zorgorganisatie haar eigen mensen aanspreekt.
 */
export const commTaken: CommTaak[] = [
  {
    slug: "patientenfolders-b1",
    titel: "Folders en brieven naar B1",
    pill: "Folders naar B1",
    intro: "Zet de schakelaar om. De medische feiten blijven letterlijk staan.",
    tekentAf: "adviseur en afdeling",
    gegevens: "Geen persoonsgegevens",
    demo: "b1",
  },
  {
    slug: "intranet-nieuwsbrief",
    titel: "Intranet en nieuwsbrief",
    pill: "Nieuwsbrief",
    intro: "Drie losse berichten worden één heldere nieuwsbrief.",
    tekentAf: "communicatieadviseur",
    gegevens: "Geen persoonsgegevens",
    demo: {
      voor: [
        { label: "Mail van facilitair", tekst: "Vanaf [datum] gaat P2 dicht ivm onderhoud, mensen moeten dan naar P4. Kan dit in de nieuwsbrief?" },
        { label: "Uit het OR-verslag", tekst: "De OR heeft instemming verleend op het voorgenomen besluit inzake het herziene verlofbeleid." },
        { label: "Appje van de bestuurder", tekst: "Wil graag het team van [afdeling] bedanken voor de drukke weken." },
      ],
      naTitel: "Nieuwsbrief deze week",
      na: [
        { label: "P2 tijdelijk dicht", tekst: "Vanaf [datum] parkeer je op P4." },
        { label: "Nieuw verlofbeleid goedgekeurd", tekst: "Wat er voor jou verandert, lees je hier zodra de datum bekend is." },
        { label: "Dank aan [afdeling]", tekst: "[De eigen woorden van de bestuurder]" },
      ],
      controle: "De adviseur checkt de datum bij HR en vraagt de bestuurder om eigen woorden.",
    },
  },
  {
    slug: "arbeidsmarktcommunicatie",
    titel: "Arbeidsmarktcommunicatie",
    pill: "Werving",
    intro: "Eén wervingsvraag, een eerste tekst per kanaal.",
    tekentAf: "adviseur en recruiter",
    gegevens: "Geen persoonsgegevens",
    demo: {
      voor: [
        { label: "Vraag van de recruiter", tekst: "We hebben structureel nachtdiensten open in de wijkverpleging. Kunnen we hier een campagne voor maken?" },
        { label: "Uit uw werkgeversmerk", tekst: "Toon: persoonlijk, nuchter, geen superlatieven." },
      ],
      naTitel: "Campagneset, eerste versie",
      na: [
        { label: "Vacaturesite", tekst: "Nachtdienst in de wijk. Jij bent er als het stil is." },
        { label: "Sociale media", tekst: "In de nacht ben je vaak de enige zorgverlener die langskomt. Dat vraagt zelfstandigheid, en het geeft veel terug." },
        { label: "Schermen op locatie", tekst: "Ken jij iemand die de nacht in de wijk aankan? Tip [contactpersoon werving]." },
      ],
      controle: "De adviseur toetst de toon en checkt elke belofte tegen de vacature.",
    },
  },
  {
    slug: "website-faq",
    titel: "Website en FAQ",
    pill: "Website",
    intro: "De praktijk verandert, de website loopt mee.",
    tekentAf: "webredacteur",
    gegevens: "Geen persoonsgegevens",
    demo: {
      voor: [{ label: "Interne mededeling", tekst: "De bezoektijden op de verpleegafdelingen veranderen per [datum]. Nieuwe tijden: [nieuwe bezoektijden]." }],
      naTitel: "Bijgewerkte vraag",
      na: [{ label: "Wanneer kan ik op bezoek komen?", tekst: "Vanaf [datum] zijn de bezoektijden [nieuwe bezoektijden]." }],
      signaal: {
        titel: "Deze pagina’s noemen nog de oude tijden",
        items: ["Bezoek en verblijf", "Opname op een verpleegafdeling", "Parkeren en bereikbaarheid"],
      },
      controle: "De webredacteur kijkt alles na en zet het in één keer live.",
    },
  },
  {
    slug: "crisiscommunicatie",
    titel: "Kernboodschap bij crisis",
    pill: "Crisis",
    intro: "Zeven kernzinnen klaar, terwijl de feiten nog binnenkomen.",
    tekentAf: "adviseur en MT",
    gegevens: "Geen persoonsgegevens",
    demo: "crisis",
  },
];
