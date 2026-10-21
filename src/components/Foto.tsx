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
}: {
  src: string;
  alt: string;
  className?: string;
  ratio?: string;
  priority?: boolean;
  sizes?: string;
  positie?: string;
}) {
  const bestaat = existsSync(join(process.cwd(), "public", src));
  return (
    <div
      className={`relative overflow-hidden rounded-[var(--radius-lg)] bg-hemel-zacht ${className}`}
      style={{ aspectRatio: ratio }}
    >
      {bestaat ? (
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" style={{ objectPosition: positie }} />
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
