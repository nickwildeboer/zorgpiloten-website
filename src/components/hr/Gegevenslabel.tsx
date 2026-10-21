/** Label dat laat zien of er persoonsgegevens in een taak gaan, en wie eigenaar blijft van het oordeel. */
export function Gegevenslabel({
  persoonsgegevens,
  kop,
  tekst,
  oordeel,
}: {
  persoonsgegevens: boolean;
  kop: string;
  tekst: string;
  oordeel: string;
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      <div className={`flex gap-3 rounded-kaart px-4 py-3 ${persoonsgegevens ? "bg-nachtblauw" : "bg-hemel-zacht"}`}>
        <span aria-hidden="true" className="mt-0.5 shrink-0" style={{ color: persoonsgegevens ? "var(--hemelblauw)" : "var(--hemel-diep)" }}>
          {persoonsgegevens ? (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6">
              <rect x="3.5" y="8" width="11" height="7.5" rx="2" />
              <path d="M6 8V5.8a3 3 0 0 1 6 0V8" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M5 2.5h5.5L14 6v9.5H5z" />
              <path d="M10.5 2.5V6H14M7.5 9.5h4M7.5 12h4" />
            </svg>
          )}
        </span>
        <div>
          <p className={`font-medium ${persoonsgegevens ? "text-creme" : "text-nachtblauw"}`}>{kop}</p>
          <p className="text-[15px] leading-snug" style={persoonsgegevens ? { color: "var(--on-ink-soft)" } : undefined}>
            {tekst}
          </p>
        </div>
      </div>
      <div className="flex gap-3 rounded-kaart border border-lijn bg-wolk px-4 py-3">
        <span aria-hidden="true" className="mt-0.5 shrink-0 text-hemel-diep">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6">
            <circle cx="9" cy="6" r="3" />
            <path d="M3.5 15.5c.8-3 2.9-4.5 5.5-4.5s4.7 1.5 5.5 4.5" />
          </svg>
        </span>
        <div>
          <p className="font-medium text-nachtblauw">Oordeel blijft bij</p>
          <p className="text-[15px] leading-snug">{oordeel}</p>
        </div>
      </div>
    </div>
  );
}
