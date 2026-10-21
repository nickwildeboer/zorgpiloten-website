import { Knop } from "@/components/ui";

/** Sparrengroene band onder een taakdemo die de gekozen taak meeneemt naar het taakgesprek. */
export function TaakCta({ taakTitel, href }: { taakTitel: string; href: string }) {
  return (
    <div className="mt-10 flex flex-col gap-6 rounded-paneel bg-nachtblauw px-6 py-8 sm:px-10 md:flex-row md:items-center md:justify-between">
      <div className="max-w-xl">
        <p className="text-[15px]" style={{ color: "var(--hemelblauw)" }}>
          Je bekijkt nu
        </p>
        <p className="mt-1 font-display text-[24px] font-bold leading-tight tracking-[-0.015em] text-creme">{taakTitel}</p>
        <p className="mt-3" style={{ color: "var(--on-ink-soft)" }}>
          In een taakgesprek van 45 minuten rekenen we deze taak samen door met jullie eigen cijfers. Daarna weet je of hij de moeite waard is om aan te pakken.
        </p>
      </div>
      <Knop href={href} className="self-start md:self-auto">
        Reken deze taak samen door
      </Knop>
    </div>
  );
}
