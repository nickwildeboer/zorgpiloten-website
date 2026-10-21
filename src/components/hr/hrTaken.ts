import type { TabTaak } from "./TaakTabs";

export type HrSlug = "cao-loket" | "verzuim-poortwachter" | "vacatureteksten" | "onboarding" | "big-herregistratie";

export type HrTaak = TabTaak<HrSlug> & {
  /** Het verzoek dat in de gesimuleerde werkplek binnenkomt. Fictief. */
  binnen: { van: string; tekst: string };
  /** Wat het voorwerk stap voor stap doet. [Haken] zijn plaatshouders. */
  stappen: string[];
  concept: { titel: string; kop?: string; regels: string[]; bronnen: string[] };
  persoonsgegevens: boolean;
  gegevensKop: string;
  gegevens: string;
  oordeel: string;
  /** Wie in de bevestiging goedkeurt. */
  rol: string;
  medewerker: string;
  grens?: string;
};

/*
 * Bron: zorgstaf-hugo.md, sectie 6 en 6b (Business Developer).
 * Bewust geen echte cao-artikelnummers, percentages of wettelijke termijnen.
 * Die staan als plaatshouder, zodat de werkplek als voorbeeld leesbaar blijft.
 */
export const hrTaken: HrTaak[] = [
  {
    slug: "cao-loket",
    titel: "Cao-loket",
    pill: "Cao-loket",
    kort: "Vragen over ORT, verlof en inschaling",
    binnen: {
      van: "Vraag van een verpleegkundige, via het HR-portaal",
      tekst:
        "Ik werk dit weekend twee avonddiensten en op zondag een dagdienst. Welke toeslag krijg ik daarvoor en wanneer zie ik die terug op mijn loonstrook?",
    },
    stappen: [
      "Vraag herkend als cao-vraag over onregelmatigheidstoeslag (ORT)",
      "Gezocht in jullie cao en jullie personeelshandboek, en verder nergens",
      "Het artikel over ORT en de afspraak over uitbetaling gevonden",
      "Conceptantwoord opgesteld in jullie toon, met de bron erbij",
    ],
    concept: {
      titel: "Conceptantwoord",
      regels: [
        "Dank voor je vraag.",
        "Voor avonddiensten en diensten op zondag krijg je een onregelmatigheidstoeslag. Hoe hoog die per uur is, staat in [het artikel over ORT uit jullie cao].",
        "Voor jouw weekend gaat het om twee avonddiensten en één zondagdienst.",
        "De toeslag wordt uitbetaald zoals beschreven in [de passage over uitbetaling uit jullie personeelshandboek].",
        "Zie je iets anders op je loonstrook, laat het me dan weten.",
      ],
      bronnen: ["Cao, het artikel over ORT", "Personeelshandboek, uitbetaling van toeslagen"],
    },
    persoonsgegevens: false,
    gegevensKop: "Geen persoonsgegevens",
    gegevens: "Alleen jullie cao en personeelshandboek gaan erin.",
    oordeel: "De HR-adviseur",
    rol: "de HR-adviseur",
    medewerker: "Controleert of het artikel past bij deze situatie en verstuurt het antwoord onder eigen naam.",
  },
  {
    slug: "verzuim-poortwachter",
    titel: "Verzuim & Wet verbetering poortwachter",
    pill: "Verzuim & Poortwachter",
    kort: "Bewaken welke stap wanneer moet",
    binnen: {
      van: "Signaal uit het verzuimdossier van medewerker A",
      tekst: "De probleemanalyse van de bedrijfsarts is binnen. Wat moet er nu gebeuren, en voor wanneer?",
    },
    stappen: [
      "Dossier gelezen in jullie afgeschermde omgeving. Er gaat niets naar buiten",
      "De stand van het dossier naast de stappen van de Wet verbetering poortwachter gelegd",
      "Volgende stap gevonden: samen met de medewerker het plan van aanpak opstellen",
      "Uitnodiging voor het gesprek en een opzet voor het plan van aanpak klaargezet",
    ],
    concept: {
      titel: "Klaargezet voor de casemanager",
      regels: [
        "Openstaande stap: het plan van aanpak, samen met medewerker A.",
        "Uiterste datum: [datum volgens de poortwachtertermijn, gerekend vanaf de eerste ziektedag].",
        "Klaar: een conceptuitnodiging voor het gesprek en een opzet voor het plan van aanpak, met de adviezen over belastbaarheid uit de probleemanalyse.",
        "Medische informatie staat er niet in. Die blijft bij de bedrijfsarts.",
      ],
      bronnen: ["Verzuimdossier van medewerker A", "Jullie verzuimprotocol"],
    },
    persoonsgegevens: true,
    gegevensKop: "Wel persoonsgegevens",
    gegevens: "Draait daarom volledig afgeschermd in jullie eigen omgeving.",
    oordeel: "De casemanager of leidinggevende, met de bedrijfsarts voor alles wat medisch is",
    rol: "de casemanager",
    medewerker: "Controleert de datum, past de uitnodiging aan op de medewerker en verstuurt hem zelf.",
  },
  {
    slug: "vacatureteksten",
    titel: "Vacatureteksten",
    pill: "Vacatureteksten",
    kort: "Van functieprofiel naar wervende tekst",
    binnen: {
      van: "Verzoek van een teamleider",
      tekst:
        "We zoeken een verzorgende IG voor de avonddienst op onze psychogeriatrische afdeling. Kun je er een vacature van maken? Het functieprofiel zit in de bijlage.",
    },
    stappen: [
      "Functieprofiel en jullie schrijfwijzer gelezen",
      "De taken vertaald naar hoe een gewone avonddienst eruitziet",
      "Vacaturetekst opgesteld in de toon van jullie organisatie",
      "Gemarkeerd wat HR zelf invult: inschaling en contracturen",
    ],
    concept: {
      titel: "Conceptvacature",
      kop: "Verzorgende IG voor de avond, op een afdeling waar rust het verschil maakt",
      regels: [
        "Je begint je dienst met de overdracht van het dagteam en kent de bewoners bij naam. Je helpt bij de avondzorg, zorgt voor een rustige overgang naar de nacht en bent het aanspreekpunt voor familie die nog even langskomt.",
        "Inschaling: [FWG-schaal uit het functieprofiel].",
        "Contracturen: [in te vullen door HR].",
      ],
      bronnen: ["Functieprofiel verzorgende IG", "Jullie schrijfwijzer"],
    },
    persoonsgegevens: false,
    gegevensKop: "Geen persoonsgegevens",
    gegevens: "Alleen het functieprofiel en jullie schrijfwijzer gaan erin.",
    oordeel: "De recruiter of HR-adviseur, samen met de teamleider",
    rol: "de recruiter",
    medewerker: "Leest de tekst na met de teamleider, vult inschaling en uren in en zet de vacature online.",
    grens: "Het voorwerk schrijft de tekst. Kandidaten selecteren doet het bewust niet.",
  },
  {
    slug: "onboarding",
    titel: "Onboardingpakket",
    pill: "Onboarding",
    kort: "Inwerkschema en documenten per functie",
    binnen: {
      van: "Bericht van de planning",
      tekst: "Op de eerste van de maand starten twee nieuwe helpenden op locatie Noord. Kun je hun inwerkpakket klaarzetten?",
    },
    stappen: [
      "Functie en locatie herkend: helpende, locatie Noord",
      "Inwerkschema samengesteld uit jullie vaste onderdelen voor deze functie",
      "Documenten verzameld: personeelshandboek, protocollen voor de eerste week en het rooster",
      "Welkomstmail en een checklist voor de werkbegeleider opgesteld",
    ],
    concept: {
      titel: "Klaargezet inwerkpakket",
      regels: [
        "Welkomstmail voor beide nieuwe collega’s, met hun eerste werkdag en wie hen opvangt: [naam van de werkbegeleider].",
        "Inwerkschema voor de eerste twee weken, per dag wat ze leren en met wie.",
        "Documentenset: personeelshandboek, [protocollen voor de eerste week] en het rooster.",
        "Checklist voor de werkbegeleider, met wat er na de eerste week afgevinkt is.",
      ],
      bronnen: ["Jullie inwerkprogramma per functie", "Personeelshandboek"],
    },
    persoonsgegevens: true,
    gegevensKop: "Beperkt persoonsgegevens",
    gegevens: "Alleen naam en startdatum. Draait in jullie eigen omgeving.",
    oordeel: "De HR-adviseur, samen met de werkbegeleider op de afdeling",
    rol: "de HR-adviseur",
    medewerker: "Kijkt of het schema past bij de afdeling, vult de werkbegeleider in en verstuurt de welkomstmail.",
  },
  {
    slug: "big-herregistratie",
    titel: "BIG-herregistratie en diploma’s",
    pill: "BIG-herregistratie",
    kort: "Registraties en diploma’s op tijd signaleren",
    binnen: {
      van: "Maandelijkse controle uit jullie personeelssysteem",
      tekst: "Overzicht van de BIG-registraties en diploma’s van alle zorgmedewerkers, bijgewerkt tot vandaag.",
    },
    stappen: [
      "Registratiegegevens gelezen in jullie afgeschermde omgeving",
      "Gemarkeerd wie binnen [jullie signaaltermijn] moet herregistreren",
      "Per medewerker een herinnering opgesteld met wat er nodig is",
      "Overzicht voor HR en de leidinggevenden klaargezet",
    ],
    concept: {
      titel: "Overzicht deze maand",
      regels: [
        "Medewerker B, verpleegkundige. Registratie loopt af binnen [jullie signaaltermijn]. Herinnering staat klaar.",
        "Medewerker C, verpleegkundige. Herregistratie aangevraagd, nog geen bevestiging. Navragen.",
        "Medewerker D, verzorgende IG. Diploma ontbreekt in het dossier. Opvragen.",
      ],
      bronnen: ["Personeelssysteem, registraties en diploma’s"],
    },
    persoonsgegevens: true,
    gegevensKop: "Wel persoonsgegevens",
    gegevens: "Draait daarom volledig afgeschermd in jullie eigen omgeving.",
    oordeel: "De HR-adviseur. De medewerker blijft zelf verantwoordelijk voor de herregistratie",
    rol: "de HR-adviseur",
    medewerker: "Controleert het overzicht, verstuurt de herinneringen en zet de opvolging in de agenda.",
  },
];
