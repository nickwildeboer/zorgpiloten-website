import type { ReactNode } from "react";

/**
 * Keuzetegel op basis van een echte radioknop: pijltjestoetsen, Tab en schermlezers werken zonder extra code.
 * Zet een groep tegels in een <fieldset> met een <legend>. Met icoon krijgt de tegel een rond icoonvlak.
 */
export function KeuzeTegel({
  naam,
  waarde,
  gekozen,
  onKies,
  titel,
  toelichting,
  icoon,
  compact = false,
}: {
  naam: string;
  waarde: string;
  gekozen: boolean;
  onKies: (waarde: string) => void;
  titel: ReactNode;
  toelichting?: ReactNode;
  icoon?: ReactNode;
  compact?: boolean;
}) {
  return (
    <label
      className={`group relative flex min-h-[48px] cursor-pointer items-start gap-3 rounded-kaart border transition-colors ${compact ? "px-4 py-3" : "px-4 py-4"} ${
        gekozen ? "border-nachtblauw bg-hemel-zacht" : "border-lijn bg-wolk hover:border-lijn-sterk hover:bg-creme"
      } has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-hemel-diep`}
    >
      <input type="radio" name={naam} value={waarde} checked={gekozen} onChange={() => onKies(waarde)} className="sr-only" />
      {icoon ? (
        <span
          aria-hidden="true"
          className={`grid h-10 w-10 flex-none place-items-center rounded-full transition-colors ${gekozen ? "bg-nachtblauw text-creme" : "bg-hemel-zacht text-hemel-diep"}`}
        >
          {icoon}
        </span>
      ) : (
        <span
          aria-hidden="true"
          className={`mt-[5px] grid h-4 w-4 flex-none place-items-center rounded-full border-2 ${gekozen ? "border-nachtblauw" : "border-lijn-sterk"}`}
        >
          {gekozen && <span className="h-2 w-2 rounded-full bg-nachtblauw" />}
        </span>
      )}
      <span className={`min-w-0 ${icoon ? "self-center" : ""}`}>
        <span className={`block text-[16px] leading-snug text-nachtblauw ${gekozen ? "font-semibold" : ""}`}>{titel}</span>
        {toelichting && <span className="mt-0.5 block text-sm leading-snug text-nachtblauw-zacht">{toelichting}</span>}
      </span>
    </label>
  );
}
