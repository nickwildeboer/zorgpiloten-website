import Link from "next/link";
import { navigatie, taakgesprekHref } from "@/lib/navigatie";

export function Footer() {
  return (
    <footer className="bg-spar text-[15px]" style={{ color: "var(--on-ink-soft)" }}>
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo/horizon/zorgpiloten-logo-negatief.svg" alt="Zorgpiloten" className="h-8 w-auto" />
          <p className="mt-4 max-w-xs">AI en automatisering voor HR en Communicatie in de zorg. Eén taak, één meting, een medewerker die het laatste woord heeft.</p>
        </div>
        <div>
          <p className="font-medium" style={{ color: "var(--on-ink)" }}>De oprichters</p>
          <ul className="mt-3 space-y-1">
            <li>Hugo van den Berk, MSc</li>
            <li>Nick Wildeboer, MSc</li>
          </ul>
          <Link href={taakgesprekHref()} className="mt-4 inline-block underline underline-offset-4" style={{ color: "var(--zandgeel)" }}>
            Plan een taakgesprek
          </Link>
        </div>
        <nav aria-label="Footer">
          <p className="font-medium" style={{ color: "var(--on-ink)" }}>Pagina&apos;s</p>
          <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1">
            {navigatie.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:underline underline-offset-4">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t" style={{ borderColor: "var(--white-15)" }}>
        <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-2 px-4 py-4 text-sm sm:px-6" style={{ color: "var(--on-ink-muted)" }}>
          <span>zorgpiloten.nl</span>
          <span>Hugo van den Berk en Nick Wildeboer</span>
        </div>
      </div>
    </footer>
  );
}
