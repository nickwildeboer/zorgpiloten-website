import type { ReactNode } from "react";

/**
 * Keuzetegel op basis van een echte radioknop: pijltjestoetsen, Tab en schermlezers werken zonder extra code.
 * Zet een groep tegels in een <fieldset> met een <legend>.
 */
export function KeuzeTegel({
  naam,
  waarde,
  gekozen,
  onKies,
  titel,
  toelichting,
  compact = false,
}: {
  naam: string;
  waarde: string;
  gekozen: boolean;
  onKies: (waarde: string) => void;
  titel: ReactNode;
  toelichting?: ReactNode;
  compact?: boolean;
}) {
  return (
    <label
      className={`group relative flex cursor-pointer items-start gap-3 rounded-kaart border bg-wolk transition-colors ${
        compact ? "px-4 py-3" : "px-4 py-4"
      } ${gekozen ? "border-spar" : "border-lijn hover:border-lijn-sterk"} has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-framboos-ink`}
    >
      <input
        type="radio"
        name={naam}
        value={waarde}
        checked={gekozen}
        onChange={() => onKies(waarde)}
        className="sr-only"
      />
      <span
        aria-hidden="true"
        className={`mt-[5px] grid h-4 w-4 flex-none place-items-center rounded-full border-2 ${gekozen ? "border-spar" : "border-lijn-sterk"}`}
      >
        {gekozen && <span className="h-2 w-2 rounded-full bg-spar" />}
      </span>
      <span className="min-w-0">
        <span className={`block text-[16px] leading-snug ${gekozen ? "font-medium text-tekst" : "text-tekst"}`}>{titel}</span>
        {toelichting && <span className="mt-1 block text-sm text-tekst-zacht">{toelichting}</span>}
      </span>
    </label>
  );
}
