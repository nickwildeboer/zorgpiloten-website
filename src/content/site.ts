/**
 * Alle tekst van de site op één plek. ChatGPT schreef de copy (opdracht en feiten van Claude, 19 november 2026).
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

/** De zeven diensten in vaste volgorde, met hun anker op /diensten. */
export const dienstSlugs = ["keynote", "koerssessie", "teamtraining", "masterclass", "kansenoverzicht", "taakstart", "proeftuin"] as const;

/** Welke diensten onder welke van de vier pijlers vallen (Inspireren, Trainen, Helpen, Bouwen). */
export const pijlerIndeling = [[0, 1], [2, 3], [4], [5, 6]] as const;

/** Het onderwerp dat in de planner klaarstaat als iemand vanaf een dienst doorklikt. */
export const plannerOnderwerp: Record<(typeof dienstSlugs)[number], string | undefined> = {
  keynote: "keynote",
  koerssessie: "koerssessie",
  teamtraining: "teamtraining",
  masterclass: "masterclass",
  kansenoverzicht: "kansenoverzicht",
  taakstart: undefined,
  proeftuin: undefined,
};

export const home = {
  "meta": {
    "titel": "Zorgpiloten | Copilot en AI in de zorg",
    "beschrijving": "Zorgpiloten helpt zorgorganisaties veilig werken met Copilot en AI. Wij inspireren, trainen, helpen u kiezen en bouwen in uw eigen omgeving."
  },
  "hero": {
    "bovenkop": "AI-bureau voor de zorg",
    "kop": "Laat AI vliegen, houd zelf de koers.",
    "tekst": "Wij brengen Copilot en AI in het dagelijkse werk van de zorg. We komen zelf uit de zorg en helpen u kiezen waar u begint. Wij inspireren, trainen en bouwen agents die in uw omgeving werken.",
    "knop": "Plan een kennismaking",
    "tweedeLink": "Bekijk onze diensten"
  },
  "oprichtersKort": {
    "hugo": "15,5 jaar directeur Marketing & Communicatie, lid van het managementteam bij het Catharina Ziekenhuis.",
    "nick": "Begeleidde grote ICT-implementaties in de zorg en bouwt zelf agents en automatiseringen."
  },
  "visie": {
    "bovenkop": "Onze visie",
    "kop": "Meer tijd voor werk dat aandacht vraagt",
    "tekst": [
      "Als AI routinewerk voorbereidt, houden professionals meer tijd over voor werk dat hun aandacht vraagt.",
      "Wij beginnen bij de mensen die het werk doen. Zij weten welke taken veel tijd kosten en wat er nodig is om ze goed uit te voeren.",
      "Copilot krijgt pas waarde als medewerkers er in hun eigen werk iets aan hebben. Daarom oefenen we met taken die vandaag op tafel liggen.",
      "AI doet het voorwerk. De professional controleert, beslist en tekent af.",
      "We beginnen met één toepassing. Samen meten we wat die oplevert voordat we verder bouwen.",
      "Medewerkers moeten kunnen uitleggen wat AI doet en welke gegevens het gebruikt. Daar maken we vooraf afspraken over."
    ]
  },
  "herkenning": {
    "kop": "Waar loopt het AI-gebruik vast?",
    "situaties": [
      {
        "situatie": "Copilot staat aan maar bijna niemand gebruikt het.",
        "eronder": "Medewerkers weten nog niet bij welke taken Copilot kan helpen."
      },
      {
        "situatie": "Collega's plakken teksten in hun eigen ChatGPT.",
        "eronder": "Afspraken over welke gegevens in AI mogen, ontbreken of zijn onduidelijk."
      },
      {
        "situatie": "Het AI-beleid ligt er, maar het werk verandert niet.",
        "eronder": "Teams hebben tijd en begeleiding nodig om de afspraken toe te passen."
      }
    ]
  },
  "doen": {
    "bovenkop": "Wat wij doen",
    "kop": "Van eerste vraag tot werkende agent",
    "intro": "U kunt bij ons terecht voor een eerste verkenning, een training of een oplossing. Een agent is een digitale assistent die een vaste taak zelfstandig voorbereidt.",
    "pijlers": [
      {
        "naam": "Inspireren",
        "zin": "U ontdekt bij welke zorgtaken AI kan helpen en bespreekt samen waar u wilt beginnen."
      },
      {
        "naam": "Trainen",
        "zin": "Uw team leert veilig werken met Copilot en AI aan de hand van eigen taken."
      },
      {
        "naam": "Helpen",
        "zin": "U ziet welke taak geschikt is voor AI en welke afspraken nog nodig zijn."
      },
      {
        "naam": "Bouwen",
        "zin": "We bouwen een agent of automatisering in uw eigen omgeving en testen die met het team."
      }
    ],
    "diensten": [
      {
        "naam": "Keynote of inspiratiesessie",
        "regel": "Ontdek met herkenbare voorbeelden wat AI kan betekenen voor het werk in de zorg."
      },
      {
        "naam": "Koerssessie voor directie en MT",
        "regel": "Kies waar AI iets toevoegt en leg vast welke stappen u zet."
      },
      {
        "naam": "Teamtraining Copilot en AI",
        "regel": "Oefen veilig met Copilot en AI aan taken uit uw eigen werk."
      },
      {
        "naam": "Masterclass: bouw uw eigen assistent",
        "regel": "Bouw in één dag een assistent voor een dagelijkse taak."
      },
      {
        "naam": "AI-kansenoverzicht met veiligheidsscan",
        "regel": "Zie waar AI kan helpen en welke afspraken over gegevens nog ontbreken."
      },
      {
        "naam": "De Taakstart",
        "regel": "Test in vier weken wat AI bij één taak op uw afdeling oplevert."
      },
      {
        "naam": "De proeftuin",
        "regel": "Ontdek in acht weken of medewerkers de toepassing in één zorgpad echt gebruiken."
      }
    ],
    "link": "Bekijk alle diensten"
  },
  "aanpak": {
    "bovenkop": "Onze aanpak",
    "kop": "Van één toepassing naar dagelijks gebruik",
    "intro": "U begint met één toepassing die uw team in het eigen werk test. Samen meten we wat die oplevert en bepalen we of uitbreiding zin heeft.",
    "stappen": [
      {
        "naam": "Luisteren",
        "zin": "We bekijken met uw team hoe het werk gaat en waar AI kan helpen."
      },
      {
        "naam": "Koers kiezen",
        "zin": "We kiezen wat genoeg oplevert, haalbaar is en veilig kan."
      },
      {
        "naam": "Bouwen",
        "zin": "We maken één toepassing die uw team direct kan testen."
      },
      {
        "naam": "Oefenen",
        "zin": "Uw team oefent in het eigen werk en wij verbeteren de toepassing op basis van ervaringen."
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
  "waarom": {
    "bovenkop": "Waarom Zorgpiloten",
    "kop": "AI die past bij uw werk",
    "redenen": [
      {
        "titel": "Uit de zorg zelf",
        "tekst": "Wij kennen de zorg vanuit het bestuur en de invoering van zorgsystemen. We weten wat een verandering vraagt van de mensen die ermee werken."
      },
      {
        "titel": "Van licentie naar werkwijze",
        "tekst": "Uw team oefent met Copilot aan eigen taken. Zo wordt duidelijk wanneer het helpt en hoe u het veilig gebruikt."
      },
      {
        "titel": "De professional beslist",
        "tekst": "AI doet het voorwerk. De professional controleert het resultaat, beslist zelf en tekent af."
      },
      {
        "titel": "Trainen en bouwen bij elkaar",
        "tekst": "Wij leren uw team werken met AI en bouwen de toepassing. Wat medewerkers tijdens het oefenen tegenkomen, nemen we mee in de bouw."
      }
    ]
  },
  "cta": {
    "kop": "Maak één vraag over AI concreet",
    "tekst": "In [MINUTEN] minuten maken Hugo en Nick samen met u één vraag of taak concreet. U kiest direct een moment in de agenda.",
    "knop": "Plan een kennismaking"
  }
} as const;

/**
 * Tekst voor de beeldgedragen homepage (prototypes 1, 2 en 5, gekozen door Nick op 19 november 2026).
 * Woordelijk overgenomen uit de prototypes; niets nieuws geschreven.
 */
export const homeBeeld = {
  hero: {
    zin: "Wij helpen zorgteams werken met Copilot en AI.",
    mensen: "Hugo van den Berk en Nick Wildeboer",
  },
  /** De korte regel per pijler, in de volgorde van home.doen.pijlers. */
  pijlerRegels: [
    "Ontdek wat AI kan betekenen voor de zorg",
    "Leer veilig werken met Copilot en AI",
    "Ontdek waar u veilig met AI kunt beginnen",
    "Test in vier weken wat AI bij één taak op uw afdeling oplevert.",
  ],
  beslist: {
    kop: "De professional beslist",
    regel: "AI doet het voorwerk. De professional controleert, beslist en tekent af.",
    foto: "Hugo van den Berk geeft een training aan een team bij het whiteboard",
    rollen: [
      { wie: "De assistent", wat: "zoekt, ordent, zet klaar" },
      { wie: "Uw medewerker", wat: "controleert, beslist, tekent af" },
    ],
  },
  /** Het deel van home.oprichtersKort dat zwaarder gezet wordt. */
  nadruk: {
    hugo: "15,5 jaar",
    nick: "bouwt zelf agents en automatiseringen.",
  },
  werkblad: {
    label: "Voorbeeld: een agent doet het voorwerk, de professional tekent af",
    tabsLabel: "Voorbeelden",
    pauzeer: "Pauzeer",
    speelAf: "Speel af",
    concept: "Concept",
    afgetekend: "Afgetekend",
    voorbeelden: [
      {
        tab: "Patiëntenbrief",
        titel: "Voorbereiding darmonderzoek",
        meta: "Taalniveau B1",
        aftekenaar: "De professional",
        regels: [
          {
            soort: "tekst",
            origineel: "Teneinde een adequate visualisatie van het darmslijmvlies te bewerkstelligen, dient de darm volledig gereinigd te zijn.",
            tekst: "Uw darm moet helemaal schoon zijn. Alleen dan kan de arts de binnenkant van uw darm goed zien.",
          },
          {
            soort: "tekst",
            origineel: "Gedurende drie dagen voorafgaand aan het onderzoek dient u een vezelarm dieet aan te houden.",
            tekst: "Eet de drie dagen voor het onderzoek vezelarm.",
          },
          {
            soort: "tekst",
            origineel: "Indien u anticoagulantia gebruikt, dient u tijdig contact op te nemen met de polikliniek.",
            tekst: "Gebruikt u bloedverdunners? Bel dan op tijd de polikliniek.",
          },
        ],
      },
      {
        tab: "Verzuimdossier",
        titel: "Verzuimdossier",
        meta: "Plan van aanpak",
        aftekenaar: "Nalezen, aanpassen en doorzetten",
        regels: [
          { soort: "stap", tekst: "Termijnen in de verzuimlijst nagaan" },
          { soort: "stap", tekst: "Probleemanalyse van de bedrijfsarts zoeken" },
          { soort: "stap", tekst: "Verslagen uit mail en dossier verzamelen" },
          { soort: "stap", tekst: "Plan van aanpak uitschrijven" },
          { soort: "stap", tekst: "Dossier op volledigheid controleren" },
          { soort: "resultaat", tekst: "Plan van aanpak in concept, elke zin met bron." },
        ],
      },
    ],
  },
} as const;

export const diensten = {
  "meta": {
    "titel": "Copilot en AI voor de zorg",
    "beschrijving": "Van AI-inspiratiesessie en Copilot-training tot advies en een werkende agent. Bekijk wat Zorgpiloten voor uw zorgteam kan doen."
  },
  "hero": {
    "bovenkop": "Wat wij doen",
    "kop": "Zet Copilot en AI in voor uw dagelijkse werk",
    "intro": "U kunt bij ons terecht voor een eerste verkenning, een training met Microsoft 365 Copilot of een toepassing die we in uw eigen omgeving bouwen. We helpen u kiezen wat past bij het werk van uw team."
  },
  "pijlers": [
    {
      "naam": "Inspireren",
      "intro": "U krijgt zicht op wat AI betekent voor uw werk. Met voorbeelden uit de zorg ontstaat een gesprek over waar u AI wel en bewust niet wilt inzetten."
    },
    {
      "naam": "Trainen",
      "intro": "Uw team oefent veilig met Copilot en AI aan taken uit het eigen werk. Wat medewerkers leren, kunnen ze direct toepassen."
    },
    {
      "naam": "Helpen",
      "intro": "U krijgt op papier welke taken geschikt zijn voor AI, wat medewerkers zelf blijven doen en welke afspraken over gegevens nog nodig zijn."
    },
    {
      "naam": "Bouwen",
      "intro": "We bouwen in uw eigen omgeving. Per taak kiezen we de techniek die het best en het veiligst werkt. Die keuze staat los van een vaste leverancier."
    }
  ],
  "lijst": [
    {
      "dienst": "Keynote of inspiratiesessie",
      "voorWie": "Bestuur, MT, zorgteams en bezoekers van zorgcongressen.",
      "belofte": "U krijgt zicht op wat AI voor de zorg betekent en voorbeelden waarover u met elkaar in gesprek kunt.",
      "krijgt": [
        "Een helder beeld van AI-ontwikkelingen die de zorg raken.",
        "Herkenbare voorbeelden van AI in het dagelijkse zorgwerk.",
        "Begrippen die helpen om samen over AI te praten."
      ],
      "vorm": "Keynote of inspiratiesessie, ook voor een teamdag of zorgcongres."
    },
    {
      "dienst": "Koerssessie voor directie en MT",
      "voorWie": "Directie en MT die keuzes willen maken over AI.",
      "belofte": "U kiest waar AI iets kan toevoegen aan belangrijke processen en krijgt een stappenplan waarmee u verder kunt.",
      "krijgt": [
        "Uitleg over wat AI-ontwikkelingen betekenen voor uw belangrijkste processen.",
        "Keuzes over waar u AI inzet en waar de grens ligt.",
        "Een stappenplan waarop u kunt sturen."
      ],
      "vorm": "Strategische werksessie."
    },
    {
      "dienst": "Teamtraining Copilot en AI",
      "voorWie": "Zorgteams en stafafdelingen die veilig met Copilot willen werken.",
      "belofte": "Uw team leert veilig werken met Copilot en AI en past het geleerde direct toe op eigen taken.",
      "krijgt": [
        "Oefeningen met Copilot en AI aan uw eigen taken.",
        "Uitleg over veilig omgaan met gegevens.",
        "Voorbeelden die uw team direct in het werk kan gebruiken."
      ],
      "vorm": "Een dagdeel of een dag, voor maximaal 15 mensen."
    },
    {
      "dienst": "Masterclass: bouw uw eigen assistent",
      "voorWie": "Medewerkers die zelf een assistent willen bouwen.",
      "belofte": "U bouwt zelf een assistent die een taak uit uw dagelijkse werk voorbereidt.",
      "krijgt": [
        "Een eigen taak als uitgangspunt voor de assistent.",
        "Oefening in het bouwen van een assistent voor uw werk.",
        "Een zelfgebouwde assistent voor die taak."
      ],
      "vorm": "Eén dag, met een taak uit het eigen werk."
    },
    {
      "dienst": "AI-kansenoverzicht met veiligheidsscan",
      "voorWie": "Afdelingen die willen weten waar ze veilig kunnen beginnen.",
      "belofte": "U krijgt op papier bij welke taak u kunt beginnen met AI en welke taken u beter laat liggen.",
      "krijgt": [
        "Per taak de kosten en het werk voor AI en medewerkers.",
        "Overzicht van huidig AI-gebruik, gebruikte gegevens en ontbrekende afspraken.",
        "Eén uur veiligheidstraining en een advies in één zin."
      ],
      "vorm": "Een halve ochtend meelopen op de afdeling en één uur veiligheidstraining."
    },
    {
      "dienst": "De Taakstart",
      "voorWie": "Afdelingen die AI willen testen met één duidelijke taak.",
      "belofte": "In vier weken test u een agent of automatisering die één taak voorbereidt, waarna de medewerker controleert en aftekent.",
      "krijgt": [
        "Een agent of automatisering voor één taak op uw afdeling.",
        "Een meting voor en na de start.",
        "Een kader voor veilig gebruik van gegevens."
      ],
      "vorm": "Vier weken op één afdeling, met twee werksessies met het team."
    },
    {
      "dienst": "De proeftuin",
      "voorWie": "Teams die AI willen testen in één zorgpad.",
      "belofte": "Na acht weken weet u of medewerkers de toepassing echt gebruiken in hun werk en of het zin heeft om door te bouwen.",
      "krijgt": [
        "Een toepassing voor één zorgpad.",
        "Inzicht in het gebruik tijdens het dagelijkse werk.",
        "Een keuze over verder bouwen op basis van het gebruik."
      ],
      "vorm": "Acht weken rond één zorgpad, met 5 tot 10 testers."
    }
  ],
  "voorbeelden": {
    "kop": "Bekijk welke taken u kunt aanpakken",
    "intro": "Bekijk waar AI het voorwerk kan doen voor uw HR- of communicatieteam.",
    "hr": "AI kan antwoorden op cao-vragen voorbereiden en helpen bij verzuim, werving en inwerken.",
    "communicatie": "AI kan teksten voorbereiden voor patiëntenfolders op B1, intranet en crisiscommunicatie.",
    "linktekst": "Bekijk voorbeelden"
  },
  "cta": {
    "kop": "Ontdek welke eerste stap bij u past",
    "tekst": "Neem één vraag of taak mee. In [MINUTEN] minuten bekijken Hugo en Nick samen met u wat een passende eerste stap is.",
    "knop": "Plan een kennismaking"
  }
} as const;

export const aanpak = {
  "meta": {
    "titel": "Onze aanpak voor AI in de zorg",
    "beschrijving": "Begin met één toepassing, test die met uw team en meet wat AI oplevert. We maken afspraken over veilig gebruik en wie beslist."
  },
  "hero": {
    "bovenkop": "Onze aanpak",
    "kop": "Maak AI onderdeel van het dagelijkse werk",
    "intro": "U begint met één toepassing die uw team direct in het eigen werk kan testen. Samen kiezen we waar AI iets toevoegt, meten we wat het oplevert en leggen we vast hoe het team er veilig mee blijft werken."
  },
  "stappen": [
    {
      "stap": "Luisteren",
      "kop": "Zie waar AI uw team kan helpen",
      "tekst": "We bekijken samen hoe het werk verloopt, waar medewerkers tegenaan lopen en welke gewoonten een rol spelen. We zorgen dat iedereen begrijpt wat AI kan en waar de grenzen liggen. Zo wordt duidelijk waar het team in de praktijk iets aan heeft.",
      "opbrengst": "Een helder beeld van de taken waarbij AI uw team kan helpen."
    },
    {
      "stap": "Koers kiezen",
      "kop": "Kies een toepassing die haalbaar is",
      "tekst": "Samen wegen we wat elk idee kan opleveren, of het uitvoerbaar is en welke risico’s het heeft. U weet daarna wat we oppakken, wat we laten liggen en waarom.",
      "opbrengst": "Een onderbouwde keuze voor de eerste toepassing."
    },
    {
      "stap": "Bouwen",
      "kop": "Test één toepassing in uw eigen werk",
      "tekst": "We meten eerst wat de taak nu kost. Daarna bouwen we in uw eigen omgeving één toepassing die het team meteen kan testen. Vooraf spreken we af welke gegevens daarvoor gebruikt mogen worden.",
      "opbrengst": "Een eerste toepassing die het team direct kan testen."
    },
    {
      "stap": "Oefenen",
      "kop": "Leer wat werkt in de praktijk",
      "tekst": "Uw team oefent met de toepassing in het eigen werk. Wij trainen, begeleiden en passen aan wat nog niet goed werkt. Samen meten we wat de toepassing oplevert. Als het team er in de praktijk baat bij heeft, breiden we het gebruik uit.",
      "opbrengst": "Inzicht in wat de toepassing oplevert en wat nodig is om uit te breiden."
    },
    {
      "stap": "Borgen",
      "kop": "Zorg dat uw team zelf verder kan",
      "tekst": "Samen leggen we vast hoe AI in het gewone werk past en wie waarvoor verantwoordelijk is. Leidinggevenden helpen het team om die afspraken toe te passen. Daarbij besteden we aandacht aan AI-geletterdheid, zoals bedoeld in de Europese AI-verordening.",
      "opbrengst": "Een vaste werkwijze die uw organisatie zelf kan voortzetten."
    }
  ],
  "rollen": {
    "kop": "Wie helpt uw team waarmee?",
    "hugo": "Hugo bespreekt de keuzes met bestuur en afdeling, geeft training en helpt het team de nieuwe werkwijze zelf op te pakken.",
    "nick": "Nick onderzoekt hoe het werk gaat, rekent uit wat de taak kost en bouwt de toepassing veilig in uw omgeving."
  },
  "principes": {
    "bovenkop": "Onze werkafspraken",
    "kop": "U houdt grip op de toepassing",
    "principes": [
      {
        "titel": "De mens beslist",
        "tekst": "De professional controleert, beslist en tekent af. Wij bouwen geen AI die meebeslist over triage, diagnose of behandeladvies voor een individuele patiënt."
      },
      {
        "titel": "Klein beginnen",
        "tekst": "Uw team test eerst één toepassing in het eigen werk. Als die waarde heeft, kijken we samen waar uitbreiding zinvol is."
      },
      {
        "titel": "Meten voordat we uitbreiden",
        "tekst": "We beloven vooraf geen besparing. We meten samen wat een taak vóór en na de invoering kost."
      },
      {
        "titel": "Veilig en uitlegbaar",
        "tekst": "We leggen vast welke gegevens AI mag gebruiken. Uw functionaris gegevensbescherming krijgt een kader om akkoord te kunnen geven."
      }
    ],
    "veiligheidLink": "Lees hoe wij veilig werken"
  },
  "cta": {
    "kop": "Bepaal met welke taak u begint",
    "tekst": "In [MINUTEN] minuten maken Hugo en Nick samen met u één taak concreet. We bespreken wat AI kan voorbereiden en waar de professional beslist.",
    "knop": "Plan een kennismaking"
  }
} as const;

export const over = {
  "meta": {
    "titel": "Over ons",
    "beschrijving": "Maak kennis met Hugo van den Berk en Nick Wildeboer. Vanuit hun ervaring in de zorg helpen ze teams veilig werken met Copilot en AI."
  },
  "hero": {
    "bovenkop": "Over ons",
    "kop": "Ervaring met uw werk, van bestuur tot ICT",
    "intro": "Wij zijn Hugo van den Berk en Nick Wildeboer. Bij Zorgpiloten combineren we ervaring in het ziekenhuis en in zorg-ICT. We helpen u kiezen waar AI iets toevoegt, trainen uw team en bouwen de toepassing."
  },
  "verhaal": {
    "bovenkop": "Ons verhaal",
    "kop": "Meer ruimte voor het werk van professionals",
    "tekst": [
      "Wij zijn Zorgpiloten begonnen om Copilot en AI meer in de zorg te brengen, met trainingen en automatiseringen. We kennen de druk op professionals en zien hoeveel tijd opgaat aan administratie en herhaling. Daar kan AI een deel van het werk voorbereiden.",
      "Een piloot laat veel routinewerk over aan de automatische piloot en vertrouwt op eigen kennis en ervaring als het erop aankomt. Daar komt onze naam vandaan. Ook in de zorg doet AI het voorwerk en blijft de professional verantwoordelijk voor de beslissing.",
      "Medewerkers weten zelf waar het werk vastloopt. Daarom beginnen we samen met één taak, oefenen we in het dagelijkse werk en meten we wat het oplevert. We bouwen pas verder als de toepassing in de praktijk waarde heeft."
    ]
  },
  "hugo": {
    "rol": "Begeleidt bestuur en teams",
    "kern": "Hugo helpt bestuurders en teams om keuzes over AI om te zetten in een werkwijze die medewerkers zelf kunnen voortzetten.",
    "verhaal": "Hugo was 15,5 jaar directeur Marketing & Communicatie en lid van het managementteam van het topklinische Catharina Ziekenhuis in Eindhoven (2010 tot 2025). Hij zag hoe professionals onder druk stonden en tijd verloren aan administratie en herhaling. Volgens hem lag dat vaak aan de manier waarop het werk was ingericht. Hij heeft ruim twintig jaar ervaring in managementrollen, heeft een MSc in Organisatie- en veranderkunde (Sioo), is Certified Management Consultant (CMC) en heeft NIMA C (Marketing Director). Hij volgde een leiderschapsopleiding bij de Baak. Als oprichter van Digital Lemon geeft hij AI-trainingen en keynotes.",
    "belofte": "Hugo traint uw team en helpt het zelf verder."
  },
  "nick": {
    "rol": "Bouwt veilige AI-toepassingen",
    "kern": "Nick brengt in kaart wat een taak nu kost en bouwt een toepassing die uw team veilig kan gebruiken.",
    "verhaal": "Nick begeleidde grote ICT-implementaties in de zorg, waaronder de invoering van ECD- en ERP-systemen. Hij werkte onder meer bij het Amsterdam UMC en met Nedap ONS. Hij heeft een MSc in Strategische Innovatie, met een focus op digitalisering en AI, en een achtergrond in Management in de Zorg en PRINCE2. Bij Zorgpiloten bouwt hij zelf agents en automatiseringen. Hij richt ze veilig in, in de eigen omgeving van de organisatie.",
    "belofte": "Nick bouwt en test de toepassing met uw team."
  },
  "cta": {
    "kop": "Bespreek uw vraag met Hugo en Nick",
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
    "intro": "In [MINUTEN] minuten maakt u online met Hugo en Nick één vraag of taak concreet. U plant het gesprek direct in de agenda. Als uw vraag buiten ons werk valt, zeggen we dat eerlijk.",
    "stappen": [
      "Kies een onderwerp",
      "Schat hoeveel tijd het nu kost",
      "Kies een moment in de agenda"
    ]
  }
} as const;

export const footer = {
  "tagline": "Wij helpen zorgteams werken met Copilot en AI. Wij trainen en bouwen. De professional beslist."
} as const;

export const planner = {
  "stap1": "Kies uw afdeling",
  "stap2": "Kies uw onderwerp",
  "stap2Leeg": "Kies eerst uw afdeling. Dan ziet u de onderwerpen.",
  "eigenLabel": "Beschrijf uw vraag of taak",
  "eigenVoorbeeld": "Bijvoorbeeld afspraken maken over het gebruik van AI",
  "stap3": "Hoeveel tijd kost de taak?",
  "stap3Uitleg": "Per week, voor de hele afdeling samen.",
  "stap3Overslaan": "Gaat uw vraag niet over een taak? Sla deze stap over.",
  "kaartTitel": "Uw kennismaking",
  "kaartDuur": "[MINUTEN] minuten met Hugo en Nick",
  "kaartAfdeling": "Afdeling",
  "kaartOnderwerp": "Onderwerp",
  "kaartTijd": "Tijd per week",
  "kaartLeeg": "Nog niet ingevuld",
  "kaartAgenda": "Wat we bespreken",
  "agendaStartAfdeling": "Kennismaken en bespreken wat er speelt bij [AFDELING]",
  "agendaStart": "Kennismaken en bespreken wat er speelt",
  "agendaSessie1": "Wat u al met AI doet en welke vragen u heeft",
  "agendaSessie2": "Wat u wilt bereiken en waar AI veilig kan helpen",
  "agendaTaak1": "Hoe [ONDERWERP] nu gaat, wie wat doet, hoe vaak en in welk systeem",
  "agendaTaakKosten": "We schatten wat de taak nu kost en wat AI kan voorbereiden",
  "agendaTaakSchatten": "We schatten samen hoeveel tijd de taak per week kost",
  "agendaTaakKlein": "Bij 2 tot 4 uur per week bespreken we welke stap past",
  "agendaTaakUren": "We bespreken uw schatting van [UREN] per week en wat AI kan voorbereiden",
  "agendaVeilig": "Welke gegevens AI mag gebruiken en wie meekijkt, zoals uw FG of ICT",
  "agendaVervolg": "Of er een vervolgstap past bij uw vraag",
  "drempel": "Onder 4 uur per week raden we een apart automatiseringstraject af. Kies een grotere taak of begin met een teamtraining.",
  "geplandTitel": "Uw kennismaking staat gepland",
  "geplandTekst": "U krijgt de uitnodiging en uw gesprekskaart per mail.",
  "knopAgenda": "Kies een moment in de agenda",
  "knopKopieer": "Kopieer de kaart voor intern overleg",
  "meldingGekopieerd": "Kaart gekopieerd. Plak de tekst in een mail of document.",
  "meldingKopierenMislukt": "Kopiëren is niet gelukt. Selecteer de tekst op de kaart en kopieer die.",
  "meldingAgendaOpen": "De agenda staat open. Kies een moment dat u past.",
  "meldingAgendaTabblad": "De agenda opent in een nieuw tabblad.",
  "meldingTerugval": "Opent er niets? Open de agenda in een nieuw tabblad.",
  "foutEigen": "Beschrijf uw eigen vraag of taak in stap 2.",
  "foutKeuze": "Kies eerst een afdeling en een onderwerp.",
  "tekstversieKop": "Kennismaking met Hugo en Nick ([MINUTEN] minuten)",
  "onderwerpen": [
    {
      "slug": "keynote",
      "label": "Keynote of inspiratiesessie",
      "kort": "Ontdek wat AI kan betekenen voor de zorg"
    },
    {
      "slug": "koerssessie",
      "label": "Koerssessie voor directie en MT",
      "kort": "Kies waar u AI wilt inzetten"
    },
    {
      "slug": "teamtraining",
      "label": "Teamtraining Copilot en AI",
      "kort": "Leer veilig werken met Copilot en AI"
    },
    {
      "slug": "masterclass",
      "label": "Masterclass: bouw uw eigen assistent",
      "kort": "Bouw een assistent voor uw dagelijkse werk"
    },
    {
      "slug": "kansenoverzicht",
      "label": "AI-kansenoverzicht met veiligheidsscan",
      "kort": "Ontdek waar u veilig met AI kunt beginnen"
    },
    {
      "slug": "eigen",
      "label": "Eigen vraag of taak",
      "kort": "Bespreek wat er speelt op uw afdeling"
    }
  ]
} as const;
