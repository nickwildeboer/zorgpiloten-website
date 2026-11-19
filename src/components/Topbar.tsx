"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { kennismaking, kennismakingHref, navigatie } from "@/lib/navigatie";
import { Knop } from "./ui";

export function Topbar() {
  const pad = usePathname();
  const [open, setOpen] = useState(false);
  const [vorigPad, setVorigPad] = useState(pad);
  // Menu sluiten bij een andere pagina, afgeleid tijdens het renderen in plaats van in een effect.
  if (pad !== vorigPad) {
    setVorigPad(pad);
    setOpen(false);
  }

  return (
    <header
      className="sticky top-0 z-40 border-b border-lijn/70"
      style={{ backgroundColor: "rgba(255, 248, 239, 0.9)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
    >
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between gap-6 px-5 sm:px-8">
        <Link href="/" className="flex shrink-0 items-center" aria-label="Zorgpiloten, naar home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo/horizon/zorgpiloten-logo-kleur.svg" alt="Zorgpiloten" className="h-8 w-auto" />
        </Link>

        <div className="flex items-center gap-8">
          <nav aria-label="Hoofdmenu" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {navigatie.map((item) => {
                const actief = pad.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={actief ? "page" : undefined}
                      className={`whitespace-nowrap text-[15px] transition-colors ${actief ? "font-semibold text-nachtblauw" : "text-tekst-2 hover:text-nachtblauw"}`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Knop href={kennismakingHref()} className="!px-5 !py-2.5 max-sm:hidden">
              {kennismaking.knop}
            </Knop>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-lijn-sterk bg-wolk text-tekst lg:hidden"
              aria-expanded={open}
              aria-controls="mobiel-menu"
              aria-label={open ? "Menu sluiten" : "Menu openen"}
              onClick={() => setOpen((o) => !o)}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                {open ? (
                  <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                ) : (
                  <path d="M2 5h14M2 9h14M2 13h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {open && (
        <nav id="mobiel-menu" aria-label="Mobiel menu" className="border-t border-lijn bg-base px-5 pb-6 pt-2 lg:hidden">
          <ul className="flex flex-col">
            {navigatie.map((item) => (
              <li key={item.href} className="border-b border-lijn/70">
                <Link href={item.href} className="block py-4 text-[17px] text-tekst">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Knop href={kennismakingHref()} className="mt-5 w-full justify-center">
            {kennismaking.knop}
          </Knop>
        </nav>
      )}
    </header>
  );
}
