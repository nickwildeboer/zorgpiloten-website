import Link from "next/link";
import { Foto } from "@/components/Foto";
import { taakgesprekHref } from "@/lib/navigatie";
import styles from "./home.module.css";

type Afdeling = "hr" | "communicatie";

const deuren: {
  afdeling: Afdeling;
  href: string;
  titel: string;
  kort: string;
  foto: { src: string; alt: string; positie: string };
  taken: { slug: string; label: string }[];
}[] = [
  {
    afdeling: "hr",
    href: "/hr",
    titel: "HR & P&O",
    kort: "Cao-vragen, verzuim, werving en inwerken.",
    foto: { src: "/fotos/sfeer/hr-werkplek.jpg", alt: "Een HR-medewerker bladert door een dossiermap aan een bureau", positie: "40% 60%" },
    taken: [
      { slug: "cao-loket", label: "Cao-loket" },
      { slug: "verzuim-poortwachter", label: "Verzuim en Poortwachter" },
      { slug: "vacatureteksten", label: "Vacatureteksten" },
      { slug: "onboarding", label: "Onboarding" },
      { slug: "big-herregistratie", label: "BIG-herregistratie" },
    ],
  },
  {
    afdeling: "communicatie",
    href: "/communicatie",
    titel: "Communicatie",
    kort: "Heldere taal voor patiënten, cliënten en collega's.",
    foto: { src: "/fotos/sfeer/communicatie-drukproef.jpg", alt: "Een communicatiemedewerker corrigeert een drukproef met potlood", positie: "35% 60%" },
    taken: [
      { slug: "patientenfolders-b1", label: "Patiëntenfolders op B1" },
      { slug: "intranet-nieuwsbrief", label: "Intranet en nieuwsbrief" },
      { slug: "arbeidsmarktcommunicatie", label: "Arbeidsmarktcommunicatie" },
      { slug: "website-faq", label: "Website en FAQ" },
      { slug: "crisiscommunicatie", label: "Crisiscommunicatie" },
    ],
  },
];

function Pijl({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Afdelingsdeuren() {
  return (
    <div className="grid gap-5 md:grid-cols-2 md:gap-6">
      {deuren.map((d) => (
        <article key={d.href} className={styles.deur}>
          <Foto
            src={d.foto.src}
            alt={d.foto.alt}
            ratio="16/10"
            positie={d.foto.positie}
            sizes="(min-width: 768px) 560px, 100vw"
            className={styles.deurFoto}
          />

          <div className="px-5 pb-5 pt-5 sm:px-7 sm:pb-7">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-[26px] sm:text-[30px]">
                <Link href={d.href} className={styles.deurLink}>
                  {d.titel}
                </Link>
              </h3>
              <span className={styles.deurPijl}>
                <Pijl />
              </span>
            </div>
            <p className="mt-1 text-[16px]">{d.kort}</p>

            <p className="zp-eyebrow mt-5" id={`taken-${d.afdeling}`}>
              Plan direct een gesprek over
            </p>
            <ul className="relative z-[2] mt-2.5 flex flex-wrap gap-2" aria-labelledby={`taken-${d.afdeling}`}>
              {d.taken.map((t) => (
                <li key={t.slug}>
                  <Link href={taakgesprekHref(d.afdeling, t.slug)} className={styles.taakChip}>
                    {t.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </div>
  );
}
