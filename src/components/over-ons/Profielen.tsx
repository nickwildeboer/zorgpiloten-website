type Kwalificatie = { titel: string; context: string; waarom: string };
type Profiel = { naam: string; rol: string; kern: string; kwalificaties: Kwalificatie[] };

const profielen: Profiel[] = [
  {
    naam: "Hugo van den Berk, MSc",
    rol: "Verandering, training en communicatie",
    kern: "Meer dan twintig jaar ervaring in complexe organisaties. Hugo spreekt de taal van de bestuurskamer en van de werkvloer.",
    kwalificaties: [
      {
        titel: "Directeur Marketing & Communicatie en MT-lid",
        context: "Catharina Ziekenhuis Eindhoven, 15,5 jaar (2010 tot 2025)",
        waarom: "Kent de bestuurskamer, de medische staf en de communicatie- en HR-vloer van een ziekenhuis van binnenuit.",
      },
      {
        titel: "MSc Organisatie- en veranderkunde",
        context: "Sioo",
        waarom: "Weet waarom een verandering op een afdeling slaagt of vastloopt op cultuur en eigenaarschap. Dat geldt net zo goed voor AI.",
      },
      {
        titel: "Certified Management Consultant (CMC)",
        context: "Ooa",
        waarom: "Een getoetste titel voor organisatieadviseurs. Je werkt met iemand die advieswerk als vak beoefent.",
      },
      {
        titel: "NIMA C (Marketing Director)",
        context: "NIMA",
        waarom: "Marketing en communicatie op directieniveau. Van de arbeidsmarktcampagne tot de boodschap richting patiënten en medewerkers.",
      },
      {
        titel: "Leadership",
        context: "de Baak",
        waarom: "Leiderschap vanuit de mens. Dat is de basis voor de vraag wie de leidinggevende van een digitale assistent wordt.",
      },
      {
        titel: "Oprichter van Digital Lemon",
        context: "Eigen bedrijf",
        waarom: "Geeft praktische AI-trainingen en keynotes en bouwt zelf n8n-workflows. Hij traint je team vanuit wat de techniek echt kan.",
      },
    ],
  },
  {
    naam: "Nick Wildeboer, MSc",
    rol: "Proces, techniek en veilige inrichting",
    kern: "Nick vertaalt het werk op de afdeling naar een opstelling die veilig is ingericht, echt draait en waarin de medewerker het laatste woord houdt.",
    kwalificaties: [
      {
        titel: "MSc Strategische Innovatie",
        context: "Specialisatie digitalisering en AI",
        waarom: "Kijkt niet alleen naar wat een tool kan, maar naar hoe digitale vernieuwing landt in een organisatie.",
      },
      {
        titel: "Management in de Zorg",
        context: "Achtergrond",
        waarom: "Begrijpt hoe een zorgorganisatie in elkaar zit en hoe het werk op een afdeling loopt.",
      },
      {
        titel: "Zorg-ICT-, ECD- en ERP-implementaties",
        context: "Onder meer bij het Amsterdam UMC en met Nedap ONS",
        waarom: "Weet hoe systemen, rechten en processen in een zorginstelling in elkaar grijpen. Daardoor past wat hij bouwt bij wat er al staat.",
      },
      {
        titel: "PRINCE2",
        context: "Methode voor projectmanagement",
        waarom: "Een traject met een helder begin, duidelijke besluitmomenten en een nette overdracht.",
      },
      {
        titel: "Hands-on bouwer in n8n en Claude",
        context: "Procesautomatisering",
        waarom: "Bouwt zelf en richt processen veilig en werkend in. Geen advies dat in een la verdwijnt.",
      },
    ],
  },
];

export function Profielen() {
  return (
    <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
      {profielen.map((p, i) => (
        <article key={p.naam} className="flex flex-col rounded-paneel border border-lijn bg-wolk shadow-kaart" aria-labelledby={`profiel-${i}`}>
          <header className="border-b border-lijn px-5 pb-6 pt-7 sm:px-8">
            <h3 id={`profiel-${i}`} className="text-[28px] sm:text-[32px]">
              {p.naam}
            </h3>
            <p className="mt-1 text-[15px] font-medium text-tekst-2">{p.rol}</p>
            <p className="mt-4">{p.kern}</p>
          </header>
          <dl className="divide-y divide-lijn px-5 sm:px-8">
            {p.kwalificaties.map((k) => (
              <div key={k.titel} className="py-5">
                <dt>
                  <span className="block font-medium leading-snug text-tekst">{k.titel}</span>
                  <span className="mt-0.5 block text-sm text-tekst-zacht">{k.context}</span>
                </dt>
                <dd className="mt-2 text-[15px]">
                  <span className="sr-only">Waarom het telt: </span>
                  {k.waarom}
                </dd>
              </div>
            ))}
          </dl>
        </article>
      ))}
    </div>
  );
}
