"use client";

import { useRef, type CSSProperties, type KeyboardEvent } from "react";
import styles from "./home.module.css";

export type SegmentOptie<T extends string> = { waarde: T; titel: string; sub?: string };

/**
 * Segmentkeuze met een schuivende spar-indicator. Twee opties naast elkaar,
 * met stapel=true onder elkaar op smalle schermen. Bedienbaar met pijltjestoetsen.
 */
export function Segment<T extends string>({
  opties,
  waarde,
  onChange,
  label,
  stapel = false,
}: {
  opties: SegmentOptie<T>[];
  waarde: T;
  onChange: (w: T) => void;
  label: string;
  stapel?: boolean;
}) {
  const knoppen = useRef<(HTMLButtonElement | null)[]>([]);
  const index = Math.max(
    0,
    opties.findIndex((o) => o.waarde === waarde),
  );

  function opToets(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    const vooruit = e.key === "ArrowRight" || e.key === "ArrowDown";
    const terug = e.key === "ArrowLeft" || e.key === "ArrowUp";
    if (!vooruit && !terug) return;
    e.preventDefault();
    const volgende = (i + (vooruit ? 1 : -1) + opties.length) % opties.length;
    onChange(opties[volgende].waarde);
    knoppen.current[volgende]?.focus();
  }

  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={`${styles.segment} ${stapel ? styles.segmentStapel : ""}`}
      style={{ "--i": index } as CSSProperties}
    >
      <span className={styles.segmentIndicator} aria-hidden="true" />
      {opties.map((o, i) => {
        const actief = i === index;
        return (
          <button
            key={o.waarde}
            ref={(el) => {
              knoppen.current[i] = el;
            }}
            type="button"
            role="radio"
            aria-checked={actief}
            tabIndex={actief ? 0 : -1}
            onClick={() => onChange(o.waarde)}
            onKeyDown={(e) => opToets(e, i)}
            className={styles.segmentOptie}
          >
            {o.sub && <span className={styles.segmentSub}>{o.sub}</span>}
            <span>{o.titel}</span>
          </button>
        );
      })}
    </div>
  );
}
