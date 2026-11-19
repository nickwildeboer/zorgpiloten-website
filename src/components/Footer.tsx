import Link from "next/link";
import { kennismaking, kennismakingHref, navigatie, voorbeelden } from "@/lib/navigatie";
import { footer } from "@/content/site";

export function Footer() {
  const kop = "text-[13px] font-semibold";
  return (
    <footer className="bg-nachtblauw text-[15px]" style={{ color: "var(--on-ink-soft)" }}>
      <div className="mx-auto grid max-w-6xl gap-x-12 gap-y-12 px-5 py-16 sm:px-8 md:grid-cols-12">
        <div className="md:col-span-5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo/horizon/zorgpiloten-logo-negatief.svg" alt="Zorgpiloten" className="h-8 w-auto" />
          <p className="mt-6 max-w-sm text-[16px] leading-[1.6]">{footer.tagline}</p>
          <Link href={kennismakingHref()} className="zp-pijl mt-7" data-op="nacht">
            {kennismaking.knop}
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M2.5 8h10M8.5 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
        <nav aria-label="Footer" className="md:col-span-3 md:col-start-7">
          <p className={kop} style={{ color: "var(--on-ink-muted)" }}>Zorgpiloten</p>
          <ul className="mt-4 space-y-2.5">
            {navigatie.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="underline-offset-4 hover:underline" style={{ color: "var(--on-ink)" }}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Voorbeelden" className="md:col-span-3">
          <p className={kop} style={{ color: "var(--on-ink-muted)" }}>Voorbeelden</p>
          <ul className="mt-4 space-y-2.5">
            {voorbeelden.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="underline-offset-4 hover:underline" style={{ color: "var(--on-ink)" }}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t" style={{ borderColor: "var(--white-15)" }}>
        <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-2 px-5 py-5 text-sm sm:px-8" style={{ color: "var(--on-ink-muted)" }}>
          <span>© 2026 Zorgpiloten</span>
          <span>Hugo van den Berk en Nick Wildeboer</span>
        </div>
      </div>
    </footer>
  );
}
