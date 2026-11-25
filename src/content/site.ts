/**
 * Alle tekst van de site op één plek. ChatGPT schreef de copy (opdracht en feiten van Claude).
 * Stand 25 november 2026: de propositie van Hugo (Copilot echt gebruiken, de route in vier stappen) en de je-vorm.
 * Wijzig tekst hier en niet in de pagina's. [MINUTEN] wordt de duur van de kennismaking uit src/lib/navigatie.ts.
 */

/** Vaste gegevens van de oprichters: foto, uitsnede en achtergrond. */
export const mensen = {
  hugo: {
    naam: "Hugo van den Berk, MSc",
    portret: "/fotos/hugo-portret.jpg",
    positie: "50% 28%",
    kort: [
      "Directeur Marketing & Communicatie en MT-lid, Catharina Ziekenhuis (2010 tot 2025)",
      "MSc Organisatie- en veranderkunde, Sioo",
      "Certified Management Consultant (CMC)",
    ],
    achtergrond: [
      { titel: "Directeur Marketing & Communicatie en MT-lid", context: "Catharina Ziekenhuis Eindhoven, 15,5 jaar (2010 tot 2025)" },
      { titel: "MSc Organisatie- en veranderkunde", context: "Sioo" },
      { titel: "Certified Management Consultant (CMC)", context: "Ooa" },
      { titel: "NIMA C (Marketing Director)", context: "" },
      { titel: "Leiderschapsopleiding", context: "de Baak" },
      { titel: "Oprichter van Digital Lemon", context: "AI-trainingen en keynotes" },
    ],
  },
  nick: {
    naam: "Nick Wildeboer, MSc",
    portret: "/fotos/nick-portret-nick.jpg",
    positie: "50% 18%",
    kort: [
      "MSc Strategische Innovatie, digitalisering en AI",
      "Management in de Zorg",
      "Zorg-ICT bij onder meer het Amsterdam UMC en met Nedap ONS",
    ],
    achtergrond: [
      { titel: "MSc Strategische Innovatie", context: "Specialisatie digitalisering en AI" },
      { titel: "Management in de Zorg", context: "" },
      { titel: "Zorg-ICT-, ECD- en ERP-implementaties", context: "Onder meer bij het Amsterdam UMC en met Nedap ONS" },
      { titel: "PRINCE2", context: "Projectmanagement" },
      { titel: "Bouwt zelf agents en automatiseringen", context: "" },
    ],
  },
} as const;

/** De vijf onderdelen van de route in vaste volgorde, met hun anker op /diensten. */
export const dienstSlugs = ["webinar", "inspiratiesessie", "teamtraining", "agentpakket", "abonnement"] as const;

/** Welke onderdelen onder welke van de vier stappen vallen (Ontdekken, Instap, Agent-pakket, Abonnement). */
export const pijlerIndeling = [[0], [1, 2], [3], [4]] as const;

/** Het onderwerp dat in de planner klaarstaat als iemand vanaf een onderdeel doorklikt. */
export const plannerOnderwerp: Record<(typeof dienstSlugs)[number], string | undefined> = {
  webinar: undefined,
  inspiratiesessie: "inspiratiesessie",
  teamtraining: "teamtraining",
  agentpakket: "agentpakket",
  abonnement: undefined,
};

export const home = {
  "meta": {
    "titel": "Zorgpiloten | Copilot in het dagelijkse werk",
    "beschrijving": "Wij helpen ondersteunende afdelingen in de zorg om Copilot veilig en dagelijks te gebruiken. We beginnen bij het werk van jouw team."
  },
  "hero": {
    "kop": "De piloot zit klaar, maar niemand vliegt",
    "knop": "Plan een kennismaking",
    "tweedeLink": "Bekijk de route"
  },
  "oprichtersKort": {
    "hugo": "15,5 jaar directeur Marketing & Communicatie, lid van het managementteam bij het Catharina Ziekenhuis.",
    "nick": "Begeleidde grote ICT-implementaties in de zorg en bouwt zelf agents en automatiseringen."
  },
  "herkenning": {
    "kop": "Herken je dit op jouw afdeling?",
    "situaties": [
      "Je betaalt voor licenties die niets opleveren.",
      "Medewerkers weten niet hoe Copilot hun werk kan ondersteunen.",
      "Collega's werken met gratis AI-tools.",
      "Copilot vindt weinig door rommelige informatie op SharePoint."
    ]
  },
  "doen": {
    "kop": "Zo gaat jouw team Copilot gebruiken",
    "pijlers": [
      {
        "naam": "Ontdekken",
        "zin": "Volg de gratis webinar of bespreek jouw vraag in een kennismaking."
      },
      {
        "naam": "Instap",
        "zin": "Kies een inspiratiesessie of laat je team oefenen met Microsoft 365 Copilot."
      },
      {
        "naam": "Agent-pakket",
        "zin": "We richten de agents in jouw omgeving in en leren je team ermee werken."
      },
      {
        "naam": "Abonnement",
        "zin": "We werken je agents bij en helpen je met nieuwe functies en informatie op SharePoint."
      }
    ],
    "diensten": [
      {
        "naam": "Gratis webinar"
      },
      {
        "naam": "Inspiratiesessie"
      },
      {
        "naam": "Teamtraining Copilot"
      },
      {
        "naam": "Agent-pakket voor je afdeling"
      },
      {
        "naam": "Abonnement"
      }
    ],
    "link": "Bekijk de hele route"
  },
  "aanpak": {
    "bovenkop": "Onze aanpak",
    "kop": "Van één toepassing naar dagelijks gebruik",
    "intro": "Je begint met één toepassing die je team in het eigen werk test. Samen meten we wat die oplevert en bepalen we of uitbreiding zin heeft.",
    "stappen": [
      {
        "naam": "Luisteren",
        "zin": "We bekijken met je team hoe het werk gaat en waar AI kan helpen."
      },
      {
        "naam": "Koers kiezen",
        "zin": "We kiezen wat genoeg oplevert, haalbaar is en veilig kan."
      },
      {
        "naam": "Bouwen",
        "zin": "We maken één toepassing die je team direct kan testen."
      },
      {
        "naam": "Oefenen",
        "zin": "Je team oefent in het eigen werk en wij verbeteren de toepassing op basis van ervaringen."
      },
      {
        "naam": "Borgen",
        "zin": "We leggen vast wie waarvoor verantwoordelijk is, zodat het team zelf verder kan."
      }
    ],
    "link": "Bekijk onze aanpak"
  },
  "wie": {
    "bovenkop": "Wie wij zijn",
    "kop": "Wij kennen de zorg van binnenuit",
    "intro": "Wij kennen het werk in een zorgorganisatie vanuit het managementteam én vanuit de invoering van zorgsystemen. Die ervaring helpt ons met bestuurders en medewerkers te bepalen wat haalbaar is.",
    "hugoRol": "Begeleidt bestuur en teams",
    "hugo": "Hugo was 15,5 jaar directeur Marketing & Communicatie en lid van het managementteam van het Catharina Ziekenhuis in Eindhoven. Bij Zorgpiloten voert hij het gesprek met bestuur en afdeling. Hij geeft training en helpt het team om de nieuwe werkwijze zelf op te pakken.",
    "nickRol": "Bouwt veilige AI-toepassingen",
    "nick": "Nick begeleidde grote ICT-implementaties in de zorg, onder meer bij het Amsterdam UMC. Hij bouwt zelf agents en automatiseringen. Bij Zorgpiloten onderzoekt hij hoe een taak nu gaat, rekent hij uit wat die kost en richt hij de oplossing veilig in.",
    "link": "Meer over ons"
  },
  "cta": {
    "kop": "Waar wil je beginnen?",
    "tekst": "Maak online kennis met Hugo en Nick. In [MINUTEN] minuten bespreken we waar Copilot jouw team kan helpen.",
    "knop": "Plan een kennismaking"
  }
} as const;

/** Tekst en voorbeelden voor de beeldgedragen homepage: de regel per stap, de werkregel en het werkblad in de hero. */
export const homeBeeld = {
  "hero": {
    "zin": "Wij zorgen dat ondersteunende afdelingen in zorginstellingen Copilot veilig gebruiken in hun dagelijkse werk.",
    "mensen": "Hugo van den Berk en Nick Wildeboer"
  },
  "pijlerRegels": [
    "Ontdek wat Copilot kan voor jouw afdeling",
    "Begin met taken uit je eigen werk",
    "Zet agents in voor vaste taken",
    "Houd Copilot bruikbaar voor je team"
  ],
  "beslist": {
    "kop": "De mens stuurt",
    "regel": "AI neemt routinewerk over. De professional controleert, beslist en tekent af.",
    "foto": "Hugo van den Berk geeft een training aan een team bij het whiteboard",
    "rollen": [
      {
        "wie": "De assistent",
        "wat": "zoekt, ordent, zet klaar"
      },
      {
        "wie": "Je medewerker",
        "wat": "controleert, beslist, tekent af"
      }
    ]
  },
  "nadruk": {
    "hugo": "15,5 jaar",
    "nick": "bouwt zelf agents en automatiseringen."
  },
  "werkblad": {
    "label": "Voorbeeld: een agent doet het voorwerk, de professional tekent af",
    "tabsLabel": "Voorbeelden",
    "pauzeer": "Pauzeer",
    "speelAf": "Speel af",
    "concept": "Concept",
    "afgetekend": "Afgetekend",
    "voorbeelden": [
      {
        "tab": "Patiëntenbrief",
        "titel": "Voorbereiding darmonderzoek",
        "meta": "Taalniveau B1",
        "aftekenaar": "De professional",
        "regels": [
          {
            "soort": "tekst",
            "origineel": "Teneinde een adequate visualisatie van het darmslijmvlies te bewerkstelligen, dient de darm volledig gereinigd te zijn.",
            "tekst": "Uw darm moet helemaal schoon zijn. Alleen dan kan de arts de binnenkant van uw darm goed zien."
          },
          {
            "soort": "tekst",
            "origineel": "Gedurende drie dagen voorafgaand aan het onderzoek dient u een vezelarm dieet aan te houden.",
            "tekst": "Eet de drie dagen voor het onderzoek vezelarm."
          },
          {
            "soort": "tekst",
            "origineel": "Indien u anticoagulantia gebruikt, dient u tijdig contact op te nemen met de polikliniek.",
            "tekst": "Gebruikt u bloedverdunners? Bel dan op tijd de polikliniek."
          }
        ]
      },
      {
        "tab": "Verzuimdossier",
        "titel": "Verzuimdossier",
        "meta": "Plan van aanpak",
        "aftekenaar": "Nalezen, aanpassen en doorzetten",
        "regels": [
          {
            "soort": "stap",
            "tekst": "Termijnen in de verzuimlijst nagaan"
          },
          {
            "soort": "stap",
            "tekst": "Probleemanalyse van de bedrijfsarts zoeken"
          },
          {
            "soort": "stap",
            "tekst": "Verslagen uit mail en dossier verzamelen"
          },
          {
            "soort": "stap",
            "tekst": "Plan van aanpak uitschrijven"
          },
          {
            "soort": "stap",
            "tekst": "Dossier op volledigheid controleren"
          },
          {
            "soort": "resultaat",
            "tekst": "Plan van aanpak in concept, elke zin met bron."
          }
        ]
      }
    ]
  }
} as const;

export const diensten = {
  "meta": {
    "titel": "Zo gaat jouw team Copilot gebruiken",
    "beschrijving": "Bekijk hoe jouw afdeling met Copilot aan de slag gaat. Begin met een webinar, kennismaking of inspiratiesessie en werk toe naar dagelijks gebruik."
  },
  "hero": {
    "kop": "Zo wordt Copilot onderdeel van je werk",
    "intro": "We helpen je team om binnen een paar maanden veilig en dagelijks met Copilot te werken aan taken die ertoe doen."
  },
  "pijlers": [
    {
      "naam": "Ontdekken",
      "intro": "Volg de gratis webinar of plan een kennismaking. Je ontdekt waar Copilot bij kan helpen en bespreekt waar jouw afdeling vastloopt."
    },
    {
      "naam": "Instap",
      "intro": "Met een inspiratiesessie ziet je team waar Copilot bij kan helpen. In de training oefenen medewerkers veilig met Microsoft 365 Copilot aan taken uit hun eigen werk."
    },
    {
      "naam": "Agent-pakket",
      "intro": "Een agent is een digitale assistent die een vaste taak voorbereidt. We stemmen bestaande agents af op het werk van jouw afdeling, richten ze in jouw omgeving in en trainen je team."
    },
    {
      "naam": "Abonnement",
      "intro": "Copilot verandert. We houden je agents actueel, helpen je nieuwe functies te gebruiken en houden de informatie op SharePoint op orde."
    }
  ],
  "lijst": [
    {
      "dienst": "Gratis webinar",
      "belofte": "Je ontdekt wat Copilot voor jouw afdeling kan doen en waar je nu vastloopt.",
      "krijgt": [
        "Voorbeelden van taken waarbij Copilot kan helpen.",
        "Uitleg over veilig werken met Copilot.",
        "Ruimte voor vragen die je vooraf kunt insturen."
      ],
      "voorWie": "Voor afdelingshoofden, managers en medewerkers die zelf vastlopen met Copilot.",
      "vorm": "Live en online op dinsdag 1 december 2026 en dinsdag 12 januari 2027, beide dagen van 12.00 tot 13.00 uur."
    },
    {
      "dienst": "Inspiratiesessie",
      "belofte": "Je team ziet wat Copilot bij het eigen werk kan doen en waar je kunt beginnen.",
      "krijgt": [
        "Herkenbare taken uit het werk van jouw afdeling.",
        "Voorbeelden van wat Copilot bij die taken kan doen.",
        "Een beeld van waar jouw team kan beginnen."
      ],
      "voorWie": "Voor teams in de zorg die willen ontdekken wat Copilot kan.",
      "vorm": "Een sessie voor je afdeling, ook op een teamdag of congres."
    },
    {
      "dienst": "Teamtraining Copilot",
      "belofte": "Je team leert veilig werken met Microsoft 365 Copilot en oefent meteen met eigen taken.",
      "krijgt": [
        "Oefenen met Microsoft 365 Copilot.",
        "Opdrachten uit het dagelijkse werk van je team.",
        "Uitleg over veilig werken met Copilot."
      ],
      "voorWie": "Voor afdelingen in de zorg die Copilot willen gebruiken bij hun dagelijkse werk.",
      "vorm": "Een dagdeel of een dag oefenen met Microsoft 365 Copilot."
    },
    {
      "dienst": "Agent-pakket voor je afdeling",
      "belofte": "Je team krijgt direct inzetbare agents die vaste taken voorbereiden in de eigen omgeving van je instelling.",
      "krijgt": [
        "Agents voor bijvoorbeeld crisiscommunicatie, persvoorlichting of het verslag van een bestuursvergadering.",
        "Inrichting afgestemd op het werk van jouw afdeling.",
        "Training voor je team om met de agents te werken."
      ],
      "voorWie": "Voor afdelingen die Copilot dagelijks willen gebruiken bij vaste taken.",
      "vorm": "Direct inzetbare agents, afgestemd op jouw afdeling, met training voor je team."
    },
    {
      "dienst": "Abonnement",
      "belofte": "Je team kan met Copilot blijven werken als de functies veranderen.",
      "krijgt": [
        "Agents die we actueel houden.",
        "Hulp bij het gebruik van nieuwe Copilot-functies.",
        "Ondersteuning om informatie op SharePoint op orde te houden."
      ],
      "voorWie": "Voor afdelingen die al met Copilot werken en willen bijblijven.",
      "vorm": "Doorlopende ondersteuning bij je agents, nieuwe Copilot-functies en informatie op SharePoint."
    }
  ],
  "webinarKnop": "Meld je gratis aan",
  "sharepoint": {
    "kop": "Breng je informatie op SharePoint op orde",
    "tekst": "Copilot geeft bruikbare antwoorden als het de juiste informatie vindt. In een apart traject ordenen we je informatie op SharePoint, brengen we documenten op dezelfde manier onder en kijken we wat er ontbreekt.",
    "punten": [
      "Een vaste indeling voor je documenten.",
      "Inzicht in welke informatie nog ontbreekt.",
      "Bruikbare antwoorden van Copilot."
    ]
  },
  "voorbeelden": {
    "kop": "Waar kan Copilot je team bij helpen?",
    "intro": "Bekijk welk voorwerk agents kunnen doen voor communicatie en HR.",
    "communicatie": "Een agent doet het voorwerk voor folders en brieven op B1, intranetberichten en crisiscommunicatie.",
    "hr": "Een agent bereidt antwoorden op cao-vragen voor en doet voorwerk bij verzuim, werving en inwerken.",
    "linktekst": "Bekijk de voorbeelden"
  },
  "cta": {
    "kop": "Welke taak wil je aanpakken?",
    "tekst": "Bespreek jouw vraag of taak online met Hugo en Nick. In [MINUTEN] minuten bekijken we samen waar je kunt beginnen.",
    "knop": "Plan een kennismaking"
  }
} as const;

export const aanpak = {
  "meta": {
    "titel": "Onze aanpak voor AI in de zorg",
    "beschrijving": "Begin met één toepassing, test die met je team en meet wat AI oplevert. We maken afspraken over veilig gebruik en wie beslist."
  },
  "hero": {
    "bovenkop": "Onze aanpak",
    "kop": "Maak AI onderdeel van het dagelijkse werk",
    "intro": "Je begint met één toepassing die je team direct in het eigen werk kan testen. Samen kiezen we waar AI iets toevoegt, meten we wat het oplevert en leggen we vast hoe het team er veilig mee blijft werken."
  },
  "stappen": [
    {
      "stap": "Luisteren",
      "kop": "Zie waar AI je team kan helpen",
      "tekst": "We bekijken samen hoe het werk verloopt, waar medewerkers tegenaan lopen en welke gewoonten een rol spelen. We zorgen dat iedereen begrijpt wat AI kan en waar de grenzen liggen. Zo wordt duidelijk waar het team in de praktijk iets aan heeft.",
      "opbrengst": "Een helder beeld van de taken waarbij AI je team kan helpen."
    },
    {
      "stap": "Koers kiezen",
      "kop": "Kies een toepassing die haalbaar is",
      "tekst": "Samen wegen we wat elk idee kan opleveren, of het uitvoerbaar is en welke risico’s het heeft. Je weet daarna wat we oppakken, wat we laten liggen en waarom.",
      "opbrengst": "Een onderbouwde keuze voor de eerste toepassing."
    },
    {
      "stap": "Bouwen",
      "kop": "Test één toepassing in je eigen werk",
      "tekst": "We meten eerst wat de taak nu kost. Daarna bouwen we in jullie eigen omgeving één toepassing die het team meteen kan testen. Vooraf spreken we af welke gegevens daarvoor gebruikt mogen worden.",
      "opbrengst": "Een eerste toepassing die het team direct kan testen."
    },
    {
      "stap": "Oefenen",
      "kop": "Leer wat werkt in de praktijk",
      "tekst": "Je team oefent met de toepassing in het eigen werk. Wij trainen, begeleiden en passen aan wat nog niet goed werkt. Samen meten we wat de toepassing oplevert. Als het team er in de praktijk baat bij heeft, breiden we het gebruik uit.",
      "opbrengst": "Inzicht in wat de toepassing oplevert en wat nodig is om uit te breiden."
    },
    {
      "stap": "Borgen",
      "kop": "Zorg dat je team zelf verder kan",
      "tekst": "Samen leggen we vast hoe AI in het gewone werk past en wie waarvoor verantwoordelijk is. Leidinggevenden helpen het team om die afspraken toe te passen. Daarbij besteden we aandacht aan AI-geletterdheid, zoals bedoeld in de Europese AI-verordening.",
      "opbrengst": "Een vaste werkwijze die je organisatie zelf kan voortzetten."
    }
  ],
  "rollen": {
    "kop": "Wie helpt je team waarmee?",
    "hugo": "Hugo bespreekt de keuzes met bestuur en afdeling, geeft training en helpt het team de nieuwe werkwijze zelf op te pakken.",
    "nick": "Nick onderzoekt hoe het werk gaat, rekent uit wat de taak kost en bouwt de toepassing veilig in jullie omgeving."
  },
  "principes": {
    "bovenkop": "Onze werkafspraken",
    "kop": "Je houdt grip op de toepassing",
    "principes": [
      {
        "titel": "De mens beslist",
        "tekst": "De professional controleert, beslist en tekent af. Wij bouwen geen AI die meebeslist over triage, diagnose of behandeladvies voor een individuele patiënt."
      },
      {
        "titel": "Klein beginnen",
        "tekst": "Je team test eerst één toepassing in het eigen werk. Als die waarde heeft, kijken we samen waar uitbreiding zinvol is."
      },
      {
        "titel": "Meten voordat we uitbreiden",
        "tekst": "We beloven vooraf geen besparing. We meten samen wat een taak vóór en na de invoering kost."
      },
      {
        "titel": "Veilig en uitlegbaar",
        "tekst": "We leggen vast welke gegevens AI mag gebruiken. Jullie functionaris gegevensbescherming krijgt een kader om akkoord te kunnen geven."
      }
    ],
    "veiligheidLink": "Lees hoe wij veilig werken"
  },
  "cta": {
    "kop": "Bepaal met welke taak je begint",
    "tekst": "In [MINUTEN] minuten maken Hugo en Nick samen met jou één taak concreet. We bespreken wat AI kan voorbereiden en waar de professional beslist.",
    "knop": "Plan een kennismaking"
  }
} as const;

export const over = {
  "meta": {
    "titel": "Over ons",
    "beschrijving": "Wij zijn Hugo van den Berk en Nick Wildeboer. Met Zorgpiloten helpen we ondersteunende afdelingen in de zorg om Copilot dagelijks te gebruiken."
  },
  "hero": {
    "kop": "Wij kennen de zorg van binnen",
    "intro": "Wij zijn Hugo van den Berk en Nick Wildeboer. Hugo was 15,5 jaar directeur Marketing & Communicatie bij het Catharina Ziekenhuis. Nick begeleidde ICT-implementaties in de zorg en bouwt agents. Samen helpen we zorginstellingen Copilot dagelijks te gebruiken."
  },
  "verhaal": {
    "kop": "Copilot hoort thuis in het dagelijkse werk",
    "tekst": [
      "Uitrollen is geen adoptie. Pas als medewerkers Copilot bij hun eigen taken gebruiken, verandert hun werk. Niets doen is ook een risico. Collega's gebruiken intussen gratis AI-tools, soms met werkdocumenten. Daarom helpen we teams om veilig aan de slag te gaan.",
      "Van copiloot naar piloot. Daar komt onze naam vandaan. Copilot is de assistent naast je die routinewerk overneemt. Jij bepaalt wat Copilot voorbereidt en controleert wat eruit komt.",
      "We beginnen bij het werk van je afdeling. We kijken mee waar het vastloopt en richten agents die we eerder bouwden in voor jouw instelling. Dat doen we voor ondersteunende afdelingen in ziekenhuizen, de VVT, de GGZ en de eerstelijn. Vanuit Eindhoven en Groningen."
    ]
  },
  "hugo": {
    "rol": "Begeleidt bestuur en teams",
    "kern": "Hugo helpt bestuurders en teams om keuzes over AI om te zetten in een werkwijze die medewerkers zelf kunnen voortzetten.",
    "verhaal": "Hugo was 15,5 jaar directeur Marketing & Communicatie en lid van het managementteam van het topklinische Catharina Ziekenhuis in Eindhoven (2010 tot 2025). Hij zag hoe professionals onder druk stonden en tijd verloren aan administratie en herhaling. Volgens hem lag dat vaak aan de manier waarop het werk was ingericht. Hij heeft ruim twintig jaar ervaring in managementrollen, heeft een MSc in Organisatie- en veranderkunde (Sioo), is Certified Management Consultant (CMC) en heeft NIMA C (Marketing Director). Hij volgde een leiderschapsopleiding bij de Baak. Als oprichter van Digital Lemon geeft hij AI-trainingen en keynotes.",
    "belofte": "Hugo traint je team en helpt het zelf verder."
  },
  "nick": {
    "rol": "Bouwt veilige AI-toepassingen",
    "kern": "Nick brengt in kaart wat een taak nu kost en bouwt een toepassing die je team veilig kan gebruiken.",
    "verhaal": "Nick begeleidde grote ICT-implementaties in de zorg, waaronder de invoering van ECD- en ERP-systemen. Hij werkte onder meer bij het Amsterdam UMC en met Nedap ONS. Hij heeft een MSc in Strategische Innovatie, met een focus op digitalisering en AI, en een achtergrond in Management in de Zorg en PRINCE2. Bij Zorgpiloten bouwt hij zelf agents en automatiseringen. Hij richt ze veilig in, in de eigen omgeving van de organisatie.",
    "belofte": "Nick bouwt en test de toepassing met je team."
  },
  "cta": {
    "kop": "Bespreek je vraag met Hugo en Nick",
    "tekst": "In [MINUTEN] minuten maken we samen één vraag of taak concreet. Als die buiten ons werk valt, zeggen we dat eerlijk.",
    "knop": "Plan een kennismaking"
  }
} as const;

export const kennismakingPagina = {
  "meta": {
    "titel": "Plan een kennismaking",
    "beschrijving": "Bespreek in [MINUTEN] minuten online één vraag of taak met Hugo en Nick. Kies direct een moment in de agenda."
  },
  "hero": {
    "bovenkop": "Kennismaking",
    "kop": "Maak samen één vraag of taak concreet",
    "intro": "In [MINUTEN] minuten maak je online met Hugo en Nick één vraag of taak concreet. Je plant het gesprek direct in de agenda. Als je vraag buiten ons werk valt, zeggen we dat eerlijk.",
    "stappen": [
      "Kies een onderwerp",
      "Schat hoeveel tijd het nu kost",
      "Kies een moment in de agenda"
    ]
  }
} as const;

export const footer = {
  "tagline": "Wij helpen ondersteunende afdelingen in de zorg om Copilot veilig en dagelijks te gebruiken."
} as const;

export const planner = {
  "stap1": "Kies je afdeling",
  "stap2": "Kies je onderwerp",
  "stap2Leeg": "Kies eerst je afdeling. Dan zie je de onderwerpen.",
  "eigenLabel": "Beschrijf je vraag of taak",
  "eigenVoorbeeld": "Bijvoorbeeld afspraken maken over het gebruik van AI",
  "stap3": "Hoeveel tijd kost de taak?",
  "stap3Uitleg": "Per week, voor de hele afdeling samen.",
  "stap3Overslaan": "Gaat je vraag niet over een taak? Sla deze stap over.",
  "kaartTitel": "Je kennismaking",
  "kaartDuur": "[MINUTEN] minuten met Hugo en Nick",
  "kaartAfdeling": "Afdeling",
  "kaartOnderwerp": "Onderwerp",
  "kaartTijd": "Tijd per week",
  "kaartLeeg": "Nog niet ingevuld",
  "kaartAgenda": "Wat we bespreken",
  "agendaStartAfdeling": "Kennismaken en bespreken wat er speelt bij [AFDELING]",
  "agendaStart": "Kennismaken en bespreken wat er speelt",
  "agendaSessie1": "Wat je al met AI doet en welke vragen je hebt",
  "agendaSessie2": "Wat je wilt bereiken en waar AI veilig kan helpen",
  "agendaTaak1": "Hoe [ONDERWERP] nu gaat, wie wat doet, hoe vaak en in welk systeem",
  "agendaTaakKosten": "We schatten wat de taak nu kost en wat AI kan voorbereiden",
  "agendaTaakSchatten": "We schatten samen hoeveel tijd de taak per week kost",
  "agendaTaakKlein": "Bij 2 tot 4 uur per week bespreken we welke stap past",
  "agendaTaakUren": "We bespreken je schatting van [UREN] per week en wat AI kan voorbereiden",
  "agendaVeilig": "Welke gegevens AI mag gebruiken en wie meekijkt, zoals jullie FG of ICT",
  "agendaVervolg": "Of er een vervolgstap past bij je vraag",
  "drempel": "Onder 4 uur per week raden we een apart automatiseringstraject af. Kies een grotere taak of begin met een teamtraining.",
  "geplandTitel": "Je kennismaking staat gepland",
  "geplandTekst": "Je krijgt de uitnodiging en je gesprekskaart per mail.",
  "knopAgenda": "Kies een moment in de agenda",
  "knopKopieer": "Kopieer de kaart voor intern overleg",
  "meldingGekopieerd": "Kaart gekopieerd. Plak de tekst in een mail of document.",
  "meldingKopierenMislukt": "Kopiëren is niet gelukt. Selecteer de tekst op de kaart en kopieer die.",
  "meldingAgendaOpen": "De agenda staat open. Kies een moment dat je past.",
  "meldingAgendaTabblad": "De agenda opent in een nieuw tabblad.",
  "meldingTerugval": "Opent er niets? Open de agenda in een nieuw tabblad.",
  "foutEigen": "Beschrijf je eigen vraag of taak in stap 2.",
  "foutKeuze": "Kies eerst een afdeling en een onderwerp.",
  "tekstversieKop": "Kennismaking met Hugo en Nick ([MINUTEN] minuten)",
  "onderwerpen": [
    {
      "slug": "inspiratiesessie",
      "label": "Inspiratiesessie",
      "kort": "Ontdek waar Copilot je team kan helpen"
    },
    {
      "slug": "teamtraining",
      "label": "Teamtraining Copilot",
      "kort": "Oefen veilig met Copilot op je eigen taken"
    },
    {
      "slug": "agentpakket",
      "label": "Agent-pakket voor je afdeling",
      "kort": "Laat agents vaste taken voorbereiden"
    },
    {
      "slug": "sharepoint",
      "label": "SharePoint op orde",
      "kort": "Maak je informatie beter vindbaar voor Copilot"
    },
    {
      "slug": "eigen",
      "label": "Eigen vraag of taak",
      "kort": "Bespreek waar je met Copilot wilt beginnen"
    }
  ]
} as const;
