import { existsSync } from "node:fs";
import { join } from "node:path";
import { Foto } from "@/components/Foto";

/** Vaste portretten, zodat elke pagina dezelfde foto en uitsnede gebruikt. */
export const mensen = {
  hugo: { naam: "Hugo van den Berk", initialen: "HB", src: "/fotos/hugo-portret.jpg", positie: "50% 30%" },
  nick: { naam: "Nick Wildeboer", initialen: "NW", src: "/fotos/nick-portret-nick.jpg", positie: "50% 22%" },
} as const;

export type Mens = keyof typeof mensen;

/**
 * Klein rond portret. Gebruikt <Foto> als het bestand er is. Ontbreekt de foto nog
 * (Hugo), dan tonen we de initialen op hemel-zacht in plaats van een lege cirkel.
 * Alleen in server components gebruiken. Geef het resultaat als prop door aan client components.
 */
export function Portret({ wie, className = "h-12 w-12", tekstClass = "text-[15px]" }: { wie: Mens; className?: string; tekstClass?: string }) {
  const m = mensen[wie];
  const bestaat = existsSync(join(process.cwd(), "public", m.src));
  if (!bestaat) {
    return (
      <span
        role="img"
        aria-label={`Portret van ${m.naam}`}
        className={`grid flex-none place-items-center rounded-full bg-hemel-zacht font-display font-bold text-nachtblauw ring-2 ring-wolk ${tekstClass} ${className}`}
      >
        {m.initialen}
      </span>
    );
  }
  return (
    <Foto
      src={m.src}
      alt={`Portret van ${m.naam}`}
      ratio="1/1"
      sizes="96px"
      positie={m.positie}
      className={`flex-none rounded-full ring-2 ring-wolk ${className}`}
    />
  );
}
