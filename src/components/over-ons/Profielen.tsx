import { Foto } from "@/components/Foto";
import { Zon } from "@/components/Horizon";

type Kwalificatie = { titel: string; context: string; waarom: string };
type Beeld = { src: string; alt: string; positie?: string };
type ProfielData = {
  id: string;
  naam: string;
  rol: string;
  kern: string;
  belofte: string;
  portret: Beeld;
  werk: [Beeld, Beeld];
  kwalificaties: Kwalificatie[];
};

export const profielen: Record<"hugo" | "nick", ProfielData> = {
  hugo: {
    id: "hugo",
    naam: "Hugo van den Berk, MSc",
    rol: "Verandering, training en communicatie",
    kern: "Meer dan twintig jaar in complexe organisaties. Spreekt de taal van bestuur en werkvloer.",
    belofte: "Zorgt dat het team meegaat en zich eigenaar voelt.",
    portret: { src: "/fotos/hugo-portret.jpg", alt: "Portret van Hugo van den Berk", positie: "50% 40%" },
    werk: [
      { src: "/fotos/hugo-training.jpg", alt: "Hugo van den Berk geeft een training aan een team bij het whiteboard", positie: "70% 35%" },
      { src: "/fotos/hugo-keynote.jpg", alt: "Hugo van den Berk spreekt op een podium", positie: "50% 30%" },
    ],
    kwalificaties: [
      {
        titel: "Directeur Marketing & Communicatie en MT-lid",
        context: "Catharina Ziekenhuis Eindhoven, 15,5 jaar (2010 tot 2025)",
        waarom: "Kent bestuurskamer, medische staf en werkvloer van binnenuit.",
      },
      { titel: "MSc Organisatie- en veranderkunde", context: "Sioo", waarom: "Weet waarom verandering slaagt of vastloopt op cultuur." },
      { titel: "Certified Management Consultant (CMC)", context: "Ooa", waarom: "Een getoetste titel. Advieswerk als vak." },
      { titel: "NIMA C (Marketing Director)", context: "", waarom: "Marketing en communicatie op directieniveau." },
      { titel: "Leadership", context: "de Baak", waarom: "Leiderschap vanuit de mens, ook voor een digitale assistent." },
      { titel: "Oprichter van Digital Lemon", context: "", waarom: "Geeft AI-trainingen en keynotes en bouwt zelf n8n-workflows." },
    ],
  },
  nick: {
    id: "nick",
    naam: "Nick Wildeboer, MSc",
    rol: "Proces, techniek en veilige inrichting",
    kern: "Maakt van afdelingswerk een veilige opstelling die echt draait.",
    belofte: "Zorgt dat er op maandag echt iets klaarstaat.",
    portret: { src: "/fotos/nick-portret-nick.jpg", alt: "Portret van Nick Wildeboer", positie: "50% 20%" },
    werk: [
      { src: "/fotos/nick-workshop-presentatie-2026.jpg", alt: "Nick Wildeboer geeft een workshop voor een groep", positie: "70% 40%" },
      { src: "/fotos/nick-workshop-locatie-2.jpg", alt: "Nick Wildeboer licht een opdracht toe tijdens een training op locatie", positie: "45% 40%" },
    ],
    kwalificaties: [
      { titel: "MSc Strategische Innovatie", context: "Specialisatie digitalisering en AI", waarom: "Ziet hoe digitale vernieuwing landt in een organisatie." },
      { titel: "Management in de Zorg", context: "", waarom: "Weet hoe het werk op een afdeling loopt." },
      {
        titel: "Zorg-ICT-, ECD- en ERP-implementaties",
        context: "Onder meer bij het Amsterdam UMC en met Nedap ONS",
        waarom: "Wat hij bouwt, past bij wat er al staat.",
      },
      { titel: "PRINCE2", context: "Projectmanagement", waarom: "Helder begin, vaste besluitmomenten, nette overdracht." },
      { titel: "Hands-on bouwer in n8n en Claude", context: "", waarom: "Bouwt zelf. Geen advies dat in een la verdwijnt." },
    ],
  },
};

/** Groot profiel: fotocollage aan de ene kant, naam en kwalificaties aan de andere. */
export function Profiel({ wie, spiegel = false }: { wie: "hugo" | "nick"; spiegel?: boolean }) {
  const p = profielen[wie];
  return (
    <article id={p.id} className="scroll-mt-16" aria-labelledby={`profiel-${p.id}`}>
      <div className={`grid items-start gap-10 lg:grid-cols-2 lg:gap-16 ${spiegel ? "lg:[&>*:first-child]:order-2" : ""}`}>
        {/* Fotocollage */}
        <div className="relative">
          <Zon className={`absolute -top-8 h-20 w-40 sm:h-24 sm:w-48 ${spiegel ? "-left-4" : "-right-4"}`} />
          <div className="relative grid grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] gap-3 sm:gap-4">
            <Foto
              src={p.portret.src}
              alt={p.portret.alt}
              ratio="4/5"
              sizes="(min-width: 1024px) 300px, 55vw"
              positie={p.portret.positie}
              className="row-span-2"
            />
            {p.werk.map((b) => (
              <Foto key={b.src} src={b.src} alt={b.alt} ratio="4/3" sizes="(min-width: 1024px) 240px, 45vw" positie={b.positie} className="self-stretch" />
            ))}
          </div>
        </div>

        {/* Tekst en kwalificaties */}
        <div>
          <p className="zp-eyebrow">{p.rol}</p>
          <h2 id={`profiel-${p.id}`} className="mt-3 text-[34px] sm:text-[44px]">
            {p.naam}
          </h2>
          <p className="mt-3 text-lg text-nachtblauw">{p.kern}</p>
          <p className="mt-4 inline-flex rounded-full bg-hemel-zacht px-4 py-2 text-[15px] font-semibold text-nachtblauw">{p.belofte}</p>

          <dl className="mt-8 divide-y divide-lijn border-y border-lijn">
            {p.kwalificaties.map((k) => (
              <div key={k.titel} className="grid gap-1 py-3.5 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] sm:gap-6">
                <dt className="min-w-0">
                  <span className="block font-semibold leading-snug text-nachtblauw">{k.titel}</span>
                  {k.context && <span className="block text-sm leading-snug">{k.context}</span>}
                </dt>
                <dd className="text-[15px] leading-snug text-nachtblauw sm:pt-0.5">
                  <span className="sr-only">Waarom het telt: </span>
                  {k.waarom}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </article>
  );
}
