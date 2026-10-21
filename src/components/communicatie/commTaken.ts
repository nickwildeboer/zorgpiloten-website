import type { TabTaak } from "@/components/hr/TaakTabs";
import type { VoorNaData } from "./VoorNa";

export type CommSlug = "patientenfolders-b1" | "intranet-nieuwsbrief" | "arbeidsmarktcommunicatie" | "website-faq" | "crisiscommunicatie";

export type CommTaak = TabTaak<CommSlug> & {
  intro: string;
  tekentAf: string;
  gegevens: string;
  demo: "b1" | "crisis" | VoorNaData;
};

/* Bron: zorgstaf-hugo.md, sectie 6 (Communicatie). Alle voorbeelden zijn fictief. */
export const commTaken: CommTaak[] = [
  {
    slug: "patientenfolders-b1",
    titel: "Patiëntenfolders en brieven naar B1",
    pill: "Folders naar B1",
    kort: "Medische taal die iedereen begrijpt",
    intro:
      "Een voorbeeldbrief over de voorbereiding op een darmonderzoek. Zet de schakelaar om en zie welke zinnen herschreven worden. De medische feiten blijven letterlijk staan.",
    tekentAf: "De communicatieadviseur, met de afdeling voor de medische inhoud",
    gegevens: "Geen persoonsgegevens. Alleen de standaardbrief en jullie schrijfwijzer.",
    demo: "b1",
  },
  {
    slug: "intranet-nieuwsbrief",
    titel: "Intranet en medewerkersnieuwsbrief",
    pill: "Intranet en nieuwsbrief",
    kort: "Van losse mails naar één helder bericht",
    intro:
      "Een mail van facilitair, een stukje uit het OR-verslag en een appje van de bestuurder. Het voorwerk maakt er een nieuwsbrief van in jullie huisstijl.",
    tekentAf: "De communicatieadviseur",
    gegevens: "Geen persoonsgegevens. Alleen de aangeleverde berichten.",
    demo: {
      voor: [
        {
          label: "Mail van facilitair",
          tekst: "Vanaf [datum] gaat parkeerterrein P2 dicht ivm onderhoud, mensen moeten dan naar P4. Kan dit in de nieuwsbrief?",
        },
        {
          label: "Uit het verslag van de ondernemingsraad",
          tekst: "De OR heeft instemming verleend op het voorgenomen besluit inzake het herziene verlofbeleid. Ingangsdatum nader te bepalen.",
        },
        {
          label: "Appje van de bestuurder",
          tekst: "Wil graag het team van [afdeling] bedanken voor de drukke weken. Kun je daar iets mee?",
        },
      ],
      naTitel: "Concept nieuwsbrief deze week",
      na: [
        {
          label: "Parkeerterrein P2 tijdelijk dicht",
          tekst: "Vanaf [datum] is P2 dicht voor onderhoud. In die periode parkeer je op P4.",
        },
        {
          label: "Nieuw verlofbeleid goedgekeurd",
          tekst: "De ondernemingsraad heeft ingestemd met het nieuwe verlofbeleid. Wanneer het ingaat en wat er voor jou verandert, lees je hier zodra de datum bekend is.",
        },
        {
          label: "Dank aan [afdeling]",
          tekst: "[Ruimte voor de eigen woorden van de bestuurder]",
        },
      ],
      controle: "Checkt de ingangsdatum bij HR en vraagt de bestuurder om het bedankje in eigen woorden.",
    },
  },
  {
    slug: "arbeidsmarktcommunicatie",
    titel: "Arbeidsmarktcommunicatie",
    pill: "Arbeidsmarkt",
    kort: "Eén wervingsvraag, tekst per kanaal",
    intro:
      "Eén wervingsvraag, verschillende kanalen. Het voorwerk maakt een eerste versie per kanaal, in de toon van jullie werkgeversmerk.",
    tekentAf: "De communicatieadviseur arbeidsmarkt, samen met de recruiter",
    gegevens: "Geen persoonsgegevens. Alleen de vacature en jullie werkgeversmerk.",
    demo: {
      voor: [
        {
          label: "Vraag van de recruiter",
          tekst: "We hebben structureel nachtdiensten open in de wijkverpleging. Kunnen we hier een campagne voor maken?",
        },
        {
          label: "Uit het werkgeversmerk",
          tekst: "Kernwaarden: [jullie kernwaarden]. Toon: persoonlijk, nuchter, geen superlatieven.",
        },
        {
          label: "Doelgroep",
          tekst: "Verpleegkundigen die zelfstandig willen werken en de nacht niet erg vinden.",
        },
      ],
      naTitel: "Campagneset, eerste versie",
      na: [
        {
          label: "Kop voor de vacaturesite",
          tekst: "Nachtdienst in de wijk. Jij bent er als het stil is.",
        },
        {
          label: "Bericht voor sociale media",
          tekst: "In de nacht ben je in de wijk vaak de enige zorgverlener die langskomt. Dat vraagt zelfstandigheid, en het geeft veel terug. Herken je dat? [link naar de vacature]",
        },
        {
          label: "Tekst voor de schermen op de eigen locaties",
          tekst: "Ken jij iemand die de nacht in de wijk aankan? Tip haar of hem bij [contactpersoon werving].",
        },
      ],
      controle: "Toetst de toon aan jullie werkgeversmerk en checkt of elke belofte in de tekst klopt met de vacature.",
    },
  },
  {
    slug: "website-faq",
    titel: "Website- en FAQ-pagina’s",
    pill: "Website en FAQ",
    kort: "Actueel houden als de praktijk verandert",
    intro:
      "Er verandert iets in de praktijk. Het voorwerk past de vraag op de website aan en zoekt welke pagina’s nog het oude verhaal vertellen.",
    tekentAf: "De webredacteur",
    gegevens: "Geen persoonsgegevens. Alleen jullie eigen website en de interne mededeling.",
    demo: {
      voor: [
        {
          label: "Interne mededeling",
          tekst: "De bezoektijden op de verpleegafdelingen veranderen per [datum]. Nieuwe tijden: [nieuwe bezoektijden].",
        },
      ],
      naTitel: "Bijgewerkte vraag, klaar om na te kijken",
      na: [
        {
          label: "Wanneer kan ik op bezoek komen?",
          tekst: "Vanaf [datum] zijn de bezoektijden op de verpleegafdelingen [nieuwe bezoektijden].",
        },
      ],
      signaal: {
        titel: "Deze pagina’s noemen nog de oude tijden",
        items: ["Bezoek en verblijf", "Opgenomen worden op een verpleegafdeling", "Veelgestelde vragen over parkeren en bereikbaarheid"],
      },
      controle: "Kijkt de wijzigingen na en zet ze in één keer live.",
    },
  },
  {
    slug: "crisiscommunicatie",
    titel: "Kernboodschap bij crisis",
    pill: "Crisis",
    kort: "Zeven heldere zinnen, klaar om af te tekenen",
    intro:
      "Er gebeurt iets en iedereen wil tegelijk weten wat er aan de hand is. Het voorwerk zet een eerste concept klaar in zeven kernzinnen, uit de melding en jullie crisisprotocol. De adviseur en het MT tekenen af.",
    tekentAf: "De communicatieadviseur en het MT",
    gegevens: "Geen persoonsgegevens in de kernboodschap.",
    demo: "crisis",
  },
];
