"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navigatie, taakgesprekHref } from "@/lib/navigatie";
import { Knop } from "./ui";

export function Topbar() {
  const pad = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pad]);

  return (
    <header
      className="sticky top-0 z-40 border-b border-lijn"
      style={{ backgroundColor: "rgba(255, 248, 239, 0.84)", backdropFilter: "blur(14px) saturate(1.4)", WebkitBackdropFilter: "blur(14px) saturate(1.4)" }}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center" aria-label="Zorgpiloten, naar home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo/horizon/zorgpiloten-logo-kleur.svg" alt="Zorgpiloten" className="h-8 w-auto" />
        </Link>

        <nav aria-label="Hoofdmenu" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {navigatie.map((item) => {
              const actief = item.href === "/" ? pad === "/" : pad.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={actief ? "page" : undefined}
                    className={`whitespace-nowrap rounded-full px-3 py-2 text-[15px] transition-colors ${
                      actief ? "bg-salie text-tekst font-medium" : "text-tekst-2 hover:text-tekst hover:bg-salie/60"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Knop href={taakgesprekHref()} className="hidden sm:inline-flex">
            Plan een taakgesprek
          </Knop>
          <button
            type="button"
            className="xl:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-lijn-sterk bg-wolk text-tekst"
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

      {open && (
        <nav id="mobiel-menu" aria-label="Mobiel menu" className="xl:hidden border-t border-lijn bg-base px-4 pb-5 pt-2">
          <ul className="flex flex-col">
            {navigatie.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="block rounded-lg px-2 py-3 text-tekst hover:bg-salie">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Knop href={taakgesprekHref()} className="mt-3 w-full justify-center">
            Plan een taakgesprek
          </Knop>
        </nav>
      )}
    </header>
  );
}
