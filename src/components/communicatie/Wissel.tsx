"use client";

/** Rustige keuzeschakelaar in de vorm van de tabs in het werkblad: de actieve keuze wit op een creme baan. */
export function Wissel<T extends string>({
  opties,
  waarde,
  onChange,
  label,
}: {
  opties: { waarde: T; label: string }[];
  waarde: T;
  onChange: (w: T) => void;
  label: string;
}) {
  return (
    <div role="radiogroup" aria-label={label} className="inline-flex max-w-full flex-wrap gap-1 rounded-[22px] bg-creme p-1">
      {opties.map((o) => {
        const actief = o.waarde === waarde;
        return (
          <button
            key={o.waarde}
            type="button"
            role="radio"
            aria-checked={actief}
            onClick={() => onChange(o.waarde)}
            className={`min-h-10 rounded-full px-4 py-2 text-[14px] font-semibold transition-colors ${
              actief ? "bg-wolk text-nachtblauw shadow-[inset_0_0_0_1px_var(--lijn-koel)]" : "text-nachtblauw-zacht hover:bg-wolk/60 hover:text-nachtblauw"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
