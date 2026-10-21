import Link from "next/link";
import type { ReactNode } from "react";

type KnopProps = {
  href?: string;
  onClick?: () => void;
  variant?: "primair" | "secundair" | "tekst";
  className?: string;
  children: ReactNode;
  type?: "button" | "submit";
};

/** Primair = framboos (één per vlak), secundair = spar omlijnd, tekst = link met pijl. */
export function Knop({ href, onClick, variant = "primair", className = "", children, type = "button" }: KnopProps) {
  const basis =
    "inline-flex items-center gap-2 whitespace-nowrap rounded-full text-[15px] font-medium transition-colors focus-visible:outline-2 disabled:opacity-50";
  const stijl = {
    primair: "bg-koraal text-nachtblauw font-semibold px-5 py-2.5 hover:bg-zandgeel",
    secundair: "border-2 border-nachtblauw text-nachtblauw font-semibold px-5 py-2 hover:bg-hemel-zacht",
    tekst: "text-hemel-diep underline underline-offset-4 hover:text-nachtblauw",
  }[variant];
  const cls = `${basis} ${stijl} ${className}`;
  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cls}>
      {children}
    </button>
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-6xl px-4 sm:px-6 ${className}`}>{children}</div>;
}

/** Sectie met ruime verticale ruimte. toon="salie" geeft een rustig vlak. */
export function Sectie({
  children,
  toon = "base",
  className = "",
  id,
}: {
  children: ReactNode;
  toon?: "base" | "salie" | "wolk";
  className?: string;
  id?: string;
}) {
  const bg = { base: "", salie: "bg-salie", wolk: "bg-wolk" }[toon];
  return (
    <section id={id} className={`py-16 sm:py-24 ${bg} ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

/** Kleine kop boven een titel, in gewone schrijfwijze. */
export function Bovenkop({ children }: { children: ReactNode }) {
  return <p className="zp-eyebrow">{children}</p>;
}

export function SectieKop({ bovenkop, titel, intro, className = "" }: { bovenkop?: string; titel: string; intro?: ReactNode; className?: string }) {
  return (
    <div className={`max-w-2xl ${className}`}>
      {bovenkop && <Bovenkop>{bovenkop}</Bovenkop>}
      <h2 className="mt-3 text-[34px] sm:text-[44px]">{titel}</h2>
      {intro && <div className="mt-4 text-lg text-tekst-2">{intro}</div>}
    </div>
  );
}

export function Kaart({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-kaart border border-lijn bg-wolk shadow-kaart ${className}`}>{children}</div>;
}

/** Pill in gewone schrijfwijze. */
export function Pill({ children, toon = "salie" }: { children: ReactNode; toon?: "salie" | "framboos" | "wolk" }) {
  const stijl = {
    salie: "bg-salie text-tekst",
    framboos: "bg-framboos-zacht text-framboos-ink",
    wolk: "bg-wolk text-tekst border border-lijn",
  }[toon];
  return <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${stijl}`}>{children}</span>;
}

/** Segmentschakelaar: een rij knoppen waarvan er één actief is. */
export function Schakelaar<T extends string>({
  opties,
  waarde,
  onChange,
  label,
  className = "",
}: {
  opties: { waarde: T; label: string }[];
  waarde: T;
  onChange: (w: T) => void;
  label: string;
  className?: string;
}) {
  return (
    <div role="radiogroup" aria-label={label} className={`inline-flex flex-wrap gap-1 rounded-full border border-lijn bg-wolk p-1 ${className}`}>
      {opties.map((o) => {
        const actief = o.waarde === waarde;
        return (
          <button
            key={o.waarde}
            type="button"
            role="radio"
            aria-checked={actief}
            onClick={() => onChange(o.waarde)}
            className={`rounded-full px-4 py-2 text-[15px] transition-colors ${actief ? "bg-spar text-white font-medium" : "text-tekst-2 hover:text-tekst hover:bg-salie"}`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
