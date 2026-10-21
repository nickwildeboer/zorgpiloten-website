import type { TabTaak } from "./TaakTabs";

export type HrSlug = "cao-loket" | "verzuim-poortwachter" | "vacatureteksten" | "onboarding" | "big-herregistratie";

export type HrTaak = TabTaak<HrSlug> & {
  /** Het verzoek dat in de gesimuleerde werkplek binnenkomt. Fictief. */
  binnen: { van: string; tekst: string };
  /** Wat het voorwerk stap voor stap doet. [Haken] zijn plaatshouders. */
  stappen: string[];
  concept: { titel: string; kop?: string; regels: string[]; bronnen: string[] };
  persoonsgegevens: boolean;
  /** Korte tekst op het gegevenslabel. */
  gegevens: string;
  /** Wie goedkeurt en het laatste woord heeft. */
  rol: string;
  grens?: string;
};

/*
 * Bron: zorgstaf-hugo.md, sectie 6 en 6b (Business Developer).
 * Bewust geen echte cao-artikelnummers, percentages of wettelijke termijnen.
 * Die staan als plaatshouder, zodat de werkplek als voorbeeld leesbaar blijft.
 * Het concept is een bericht van HR aan een collega en staat daarom in de je-vorm.
 */
export const hrTaken: HrTaak[] = [
  {
    slug: "cao-loket",
    titel: "Cao-loket",
    pill: "Cao-loket",
    binnen: {
      van: "Verpleegkundige, via het HR-portaal",
      tekst: "Ik werk dit weekend twee avonddiensten en een zondagdienst. Welke toeslag krijg ik daarvoor?",
    },
    stappen: ["Herkend als vraag over ORT", "Gezocht in uw cao en personeelshandboek", "Het juiste artikel gevonden", "Antwoord opgesteld, met bron"],
    concept: {
      titel: "Conceptantwoord",
      regels: [
        "Voor avond- en zondagdiensten krijg je onregelmatigheidstoeslag. De hoogte staat in [het artikel over ORT uit uw cao].",
        "Uitbetaling gaat zoals in [de passage uit uw personeelshandboek].",
      ],
      bronnen: ["Cao", "Personeelshandboek"],
    },
    persoonsgegevens: false,
    gegevens: "Geen persoonsgegevens",
    rol: "HR-adviseur",
  },
  {
    slug: "verzuim-poortwachter",
    titel: "Verzuim & Poortwachter",
    pill: "Verzuim",
    binnen: {
      van: "Verzuimdossier van medewerker A",
      tekst: "De probleemanalyse van de bedrijfsarts is binnen. Wat moet er nu gebeuren, en voor wanneer?",
    },
    stappen: ["Dossier gelezen, afgeschermd", "Naast de stappen van de Wet poortwachter gelegd", "Volgende stap: plan van aanpak", "Uitnodiging en opzet klaargezet"],
    concept: {
      titel: "Klaargezet voor de casemanager",
      regels: [
        "Openstaand: het plan van aanpak, samen met medewerker A.",
        "Uiterste datum: [volgens de poortwachtertermijn].",
        "Medische informatie staat er niet in. Die blijft bij de bedrijfsarts.",
      ],
      bronnen: ["Verzuimdossier", "Uw verzuimprotocol"],
    },
    persoonsgegevens: true,
    gegevens: "Persoonsgegevens, afgeschermd in uw omgeving",
    rol: "casemanager",
  },
  {
    slug: "vacatureteksten",
    titel: "Vacatureteksten",
    pill: "Vacatures",
    binnen: {
      van: "Teamleider psychogeriatrie",
      tekst: "We zoeken een verzorgende IG voor de avonddienst. Kun je er een vacature van maken?",
    },
    stappen: ["Functieprofiel en schrijfwijzer gelezen", "Vertaald naar een gewone avonddienst", "Tekst opgesteld in uw toon", "Inschaling en uren open gelaten"],
    concept: {
      titel: "Conceptvacature",
      kop: "Verzorgende IG voor de avond, op een afdeling waar rust het verschil maakt",
      regels: ["Je kent de bewoners bij naam en zorgt voor een rustige overgang naar de nacht.", "Inschaling: [FWG-schaal]. Uren: [in te vullen door HR]."],
      bronnen: ["Functieprofiel", "Uw schrijfwijzer"],
    },
    persoonsgegevens: false,
    gegevens: "Geen persoonsgegevens",
    rol: "recruiter",
    grens: "Kandidaten selecteren doet het voorwerk bewust niet.",
  },
  {
    slug: "onboarding",
    titel: "Onboarding",
    pill: "Onboarding",
    binnen: {
      van: "Planning",
      tekst: "Op de eerste van de maand starten twee helpenden op locatie Noord. Staat hun inwerkpakket klaar?",
    },
    stappen: ["Functie en locatie herkend", "Inwerkschema samengesteld", "Documenten verzameld", "Welkomstmail en checklist opgesteld"],
    concept: {
      titel: "Inwerkpakket",
      regels: [
        "Welkomstmail met de eerste werkdag en wie hen opvangt: [werkbegeleider].",
        "Inwerkschema voor twee weken, met documenten en rooster.",
        "Checklist voor de werkbegeleider.",
      ],
      bronnen: ["Uw inwerkprogramma", "Personeelshandboek"],
    },
    persoonsgegevens: true,
    gegevens: "Alleen naam en startdatum, in uw omgeving",
    rol: "HR-adviseur",
  },
  {
    slug: "big-herregistratie",
    titel: "BIG-herregistratie",
    pill: "BIG",
    binnen: {
      van: "Maandelijkse controle, personeelssysteem",
      tekst: "Overzicht van alle BIG-registraties en diploma’s, bijgewerkt tot vandaag.",
    },
    stappen: ["Registraties gelezen, afgeschermd", "Gemarkeerd wie binnenkort moet herregistreren", "Herinneringen opgesteld", "Overzicht klaargezet"],
    concept: {
      titel: "Overzicht deze maand",
      regels: [
        "Medewerker B. Registratie loopt af binnen [uw signaaltermijn]. Herinnering klaar.",
        "Medewerker C. Aangevraagd, nog geen bevestiging. Navragen.",
        "Medewerker D. Diploma ontbreekt in het dossier. Opvragen.",
      ],
      bronnen: ["Personeelssysteem"],
    },
    persoonsgegevens: true,
    gegevens: "Persoonsgegevens, afgeschermd in uw omgeving",
    rol: "HR-adviseur",
  },
];
