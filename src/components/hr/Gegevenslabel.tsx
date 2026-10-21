/** Gegevenslabel: in één oogopslag of er persoonsgegevens in een taak gaan, en wie het laatste woord heeft. */
export function Gegevenslabel({ persoonsgegevens, gegevens, oordeel }: { persoonsgegevens: boolean; gegevens: string; oordeel: string }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Gegevenslabel">
      <li
        className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-medium ${
          persoonsgegevens ? "bg-nachtblauw text-creme" : "bg-hemel-zacht text-nachtblauw"
        }`}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 18 18"
          fill="none"
          stroke={persoonsgegevens ? "var(--hemelblauw)" : "var(--hemel-diep)"}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="shrink-0"
        >
          {persoonsgegevens ? (
            <>
              <rect x="3.5" y="8" width="11" height="7.5" rx="2" />
              <path d="M6 8V5.8a3 3 0 0 1 6 0V8" />
            </>
          ) : (
            <>
              <path d="M5 2.5h5.5L14 6v9.5H5z" />
              <path d="M10.5 2.5V6H14" />
            </>
          )}
        </svg>
        {gegevens}
      </li>
      <li className="inline-flex items-center gap-2 rounded-full border border-lijn bg-wolk px-3.5 py-1.5 text-sm text-nachtblauw">
        <svg width="16" height="16" viewBox="0 0 18 18" fill="none" stroke="var(--hemel-diep)" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true" className="shrink-0">
          <circle cx="9" cy="6" r="3" />
          <path d="M3.5 15.5c.8-3 2.9-4.5 5.5-4.5s4.7 1.5 5.5 4.5" />
        </svg>
        <span>
          Laatste woord: <span className="font-medium">{oordeel}</span>
        </span>
      </li>
    </ul>
  );
}
