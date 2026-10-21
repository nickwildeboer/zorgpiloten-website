import Link from "next/link";
import styles from "./home.module.css";

const deuren = [
  {
    href: "/hr",
    titel: "HR & P&O",
    ondertitel: "Vaste processen, verandering en adoptie",
    rust: "Cao-vragen, verzuimtermijnen en wervingsteksten komen elke week terug. AI helpt hier alleen als de procesbouw en het meenemen van het team samen opgaan.",
    tijdvreters: [
      "Cao-vragen over ORT, verlof en FWG-inschaling",
      "Verzuimdossiers en de termijnen van Poortwachter",
      "Vacatureteksten uit het functieprofiel",
      "Onboardingpakket per functie",
      "BIG-herregistratie en diploma's bewaken",
    ],
    linkLabel: "Bekijk HR & P&O",
  },
  {
    href: "/communicatie",
    titel: "Communicatie",
    ondertitel: "Heldere taal voor patiënten, cliënten en collega's",
    rust: "Van medisch en beleidsmatig jargon naar taal die iedereen begrijpt. Hugo kent dit werk uit 15 jaar als directeur Marketing & Communicatie in het ziekenhuis.",
    tijdvreters: [
      "Patiëntenfolders en brieven op B1-niveau",
      "Intranet en de medewerkersnieuwsbrief",
      "Arbeidsmarktcampagnes en wervingsteksten",
      "Website en veelgestelde vragen actueel houden",
      "Kernboodschap bij een crisis",
    ],
    linkLabel: "Bekijk Communicatie",
  },
];

export function Afdelingsdeuren() {
  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-6">
      {deuren.map((d) => (
        <article key={d.href} className={styles.deur}>
          <h3 className="text-[28px] sm:text-[34px]">
            <Link href={d.href} className={styles.deurLink}>
              {d.titel}
            </Link>
          </h3>
          <p className="mt-1 text-[16px] font-medium text-tekst-2">{d.ondertitel}</p>

          <div className={`${styles.wissel} mt-6 flex-1`}>
            <p className={`${styles.rust} max-w-md text-[17px] text-tekst-2`}>{d.rust}</p>
            <div className={styles.tijdvreters}>
              <p className="text-[15px] font-medium text-tekst">Waar de tijd nu in gaat</p>
              <ul className="mt-2 divide-y divide-lijn">
                {d.tijdvreters.map((t) => (
                  <li key={t} className="flex items-baseline gap-3 py-2 text-[15px] text-tekst-2">
                    <span aria-hidden="true" className="relative top-[-2px] h-1.5 w-1.5 flex-none rounded-full bg-spar-3" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-6 inline-flex items-center gap-2 text-[15px] font-medium text-tekst" aria-hidden="true">
            {d.linkLabel}
            <svg className={styles.pijl} width="16" height="16" viewBox="0 0 16 16">
              <path d="M3 8h9M8.5 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </p>
        </article>
      ))}
    </div>
  );
}
