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

/** Primair = koraal (één per vlak), secundair = dun omlijnd, tekst = onderstreepte link. */
export function Knop({ href, onClick, variant = "primair", className = "", children, type = "button" }: KnopProps) {
  const basis =
    "inline-flex items-center gap-2 whitespace-nowrap rounded-full text-[15px] font-medium transition-colors duration-200 focus-visible:outline-2 disabled:opacity-50";
  const stijl = {
    primair: "bg-koraal text-nachtblauw font-semibold px-6 py-3 hover:bg-[var(--koraal-hover)]",
    secundair: "border border-nachtblauw/30 text-nachtblauw font-semibold px-6 py-[11px] hover:border-nachtblauw",
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

/** De rustige tweede actie: tekst met een pijl die bij hover een stap vooruit zet. */
export function PijlLink({ href, children, opNacht = false, className = "" }: { href: string; children: ReactNode; opNacht?: boolean; className?: string }) {
  return (
    <Link href={href} className={`zp-pijl ${className}`} data-op={opNacht ? "nacht" : undefined}>
      {children}
      <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
        <path d="M2.5 8h10M8.5 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Link>
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>;
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
    <section id={id} className={`py-20 sm:py-28 ${bg} ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

/** Kort label boven een titel. */
export function Bovenkop({ children, opNacht = false }: { children: ReactNode; opNacht?: boolean }) {
  return (
    <p className="zp-eyebrow" data-op={opNacht ? "nacht" : undefined}>
      {children}
    </p>
  );
}

export function SectieKop({ bovenkop, titel, intro, className = "" }: { bovenkop?: string; titel: string; intro?: ReactNode; className?: string }) {
  return (
    <div className={`max-w-2xl ${className}`}>
      {bovenkop && <Bovenkop>{bovenkop}</Bovenkop>}
      <h2 className={`${bovenkop ? "mt-4" : ""} text-[32px] leading-[1.1] sm:text-[42px]`}>{titel}</h2>
      {intro && <div className="mt-5 text-[18px] leading-[1.6] text-tekst-2">{intro}</div>}
    </div>
  );
}

/** De afsluitende band op elke pagina: één kop, één zin, één knop. */
export function AfsluitBand({ kop, tekst, knop, href, children }: { kop: string; tekst: string; knop: string; href: string; children?: ReactNode }) {
  return (
    <section className="bg-hemel-zacht py-20 sm:py-24">
      <Container>
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-16">
          <div className="max-w-2xl">
            {children}
            <h2 className="text-[32px] leading-[1.1] sm:text-[42px]">{kop}</h2>
            <p className="mt-4 max-w-xl text-[18px] leading-[1.6] text-nachtblauw">{tekst}</p>
          </div>
          <Knop href={href} className="self-start md:self-auto">
            {knop}
          </Knop>
        </div>
      </Container>
    </section>
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
