import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import { Wolk, Zon } from "./Horizon";

/**
 * Foto met afgeronde hoeken (radius-lg). Bestaat het bestand in public/ nog niet
 * (bijvoorbeeld een foto van Hugo die nog moet komen), dan tonen we een rustige
 * Horizon-plaatsvervanger in plaats van een kapot beeld.
 * Alleen in server components gebruiken (leest het bestandssysteem bij het bouwen).
 */
export function Foto({
  src,
  alt,
  className = "",
  ratio = "4/3",
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  positie = "center",
  duotoon = false,
}: {
  src: string;
  alt: string;
  className?: string;
  ratio?: string;
  priority?: boolean;
  sizes?: string;
  positie?: string;
  /** Merkduotoon (nachtblauw naar creme). Vraagt <DuotoonFilter /> één keer op de pagina. */
  duotoon?: boolean;
}) {
  const bestaat = existsSync(join(process.cwd(), "public", src));
  return (
    <div
      className={`relative overflow-hidden rounded-[var(--radius-lg)] bg-hemel-zacht ${className}`}
      style={{ aspectRatio: ratio }}
    >
      {bestaat ? (
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={`object-cover ${duotoon ? "zp-duotoon" : ""}`} style={{ objectPosition: positie }} />
      ) : (
        <div className="absolute inset-0" role="img" aria-label={alt}>
          <Wolk className="absolute left-[12%] top-[22%] h-[9%] w-[38%]" kleur="var(--wolk)" />
          <Wolk className="absolute right-[10%] top-[38%] h-[7%] w-[26%]" kleur="var(--wolk)" />
          <Zon className="absolute bottom-0 left-1/2 w-[46%] -translate-x-1/2" />
        </div>
      )}
    </div>
  );
}

/**
 * Het SVG-filter voor de merkduotoon: eerst grijswaarden, dan van nachtblauw (#1B2A4A) via een
 * zacht grijsblauw naar creme (#FFF8EF). Eén keer per pagina plaatsen; .zp-duotoon in globals.css verwijst ernaar.
 */
export function DuotoonFilter() {
  return (
    <svg aria-hidden="true" focusable="false" width="0" height="0" className="absolute h-0 w-0 overflow-hidden">
      <filter id="zp-duotoon" colorInterpolationFilters="sRGB">
        <feColorMatrix type="matrix" values="0.2126 0.7152 0.0722 0 0  0.2126 0.7152 0.0722 0 0  0.2126 0.7152 0.0722 0 0  0 0 0 1 0" />
        <feComponentTransfer>
          <feFuncR type="table" tableValues="0.106 0.45 0.82 1" />
          <feFuncG type="table" tableValues="0.165 0.49 0.82 0.973" />
          <feFuncB type="table" tableValues="0.290 0.58 0.84 0.937" />
        </feComponentTransfer>
      </filter>
    </svg>
  );
}
