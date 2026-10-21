/**
 * Horizon-beeldtaal uit het merk: de koersbocht met pijl en de zandgele route
 * naar het koraal doel, de zon (halve cirkel) en wolken (brede pillen).
 * Puur decoratief: aria-hidden. Kleuren uit de tokens.
 */
export function Koersbocht({ className = "", route = true }: { className?: string; route?: boolean }) {
  return (
    <svg viewBox="24 12 440 264" className={className} aria-hidden="true">
      <path
        fill="var(--hemelblauw)"
        d="M32 88 A32 32 0 0 1 64 56 H80 A32 32 0 0 1 112 88 V176 A24 24 0 0 0 136 200 C200 200 256 186 292 150 L344 160 C330 220 296 272 232 272 H64 A32 32 0 0 1 32 240 Z"
      />
      <path fill="var(--nachtblauw)" stroke="var(--nachtblauw)" strokeWidth={12} strokeLinejoin="round" d="M208 72 L436 20 L364 180 L338 108 Z" />
      {route && (
        <>
          {[
            [392, 172],
            [413, 178],
            [430, 190],
            [440, 206],
            [446, 228],
          ].map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={4} fill="var(--zandgeel)" />
          ))}
          <circle cx={446} cy={254} r={12} fill="var(--koraal)" />
        </>
      )}
    </svg>
  );
}

/** Halve zon op de horizon. */
export function Zon({ className = "", kleur = "var(--zandgeel)" }: { className?: string; kleur?: string }) {
  return (
    <svg viewBox="0 0 200 100" className={className} aria-hidden="true">
      <path d="M0 100 A100 100 0 0 1 200 100 Z" fill={kleur} />
    </svg>
  );
}

/** Een wolk als brede pil. */
export function Wolk({ className = "", kleur = "var(--hemel-zacht)" }: { className?: string; kleur?: string }) {
  return <span aria-hidden="true" className={`block rounded-full ${className}`} style={{ background: kleur }} />;
}

/** Een horizontale band met zon en wolken, voor sectie-overgangen en hero's. */
export function HorizonBand({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`relative h-24 overflow-hidden ${className}`}>
      <Wolk className="absolute left-[8%] top-6 h-6 w-40" />
      <Wolk className="absolute right-[12%] top-2 h-5 w-28" kleur="var(--wolk)" />
      <Zon className="absolute bottom-0 left-1/2 h-16 w-32 -translate-x-1/2" />
      <span className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: "var(--lijn)" }} />
    </div>
  );
}
