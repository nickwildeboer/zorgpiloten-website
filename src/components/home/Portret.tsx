import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";

/**
 * Klein rond portret. Bestaat het bestand nog niet (Hugo's foto's komen later),
 * dan tonen we de initialen op hemel-zacht. Alleen in server components.
 */
export function Portret({
  src,
  naam,
  initialen,
  grootte = 52,
  rand = "creme",
}: {
  src: string;
  naam: string;
  initialen: string;
  grootte?: number;
  /** Kleur van de dunne rand, gelijk aan het vlak eronder. */
  rand?: "creme" | "hemel-zacht";
}) {
  const bestaat = existsSync(join(process.cwd(), "public", src));
  const ring = rand === "creme" ? "ring-creme" : "ring-hemel-zacht";
  return (
    <span
      className={`relative block flex-none overflow-hidden rounded-full ring-[3px] ${ring} ${bestaat ? "bg-hemel-zacht" : "bg-wolk"}`}
      style={{ width: grootte, height: grootte }}
    >
      {bestaat ? (
        <Image src={src} alt={naam} fill sizes={`${grootte * 2}px`} className="object-cover" style={{ objectPosition: "50% 25%" }} />
      ) : (
        <span role="img" aria-label={naam} className="grid h-full w-full place-items-center text-[14px] font-semibold text-nachtblauw">
          {initialen}
        </span>
      )}
    </span>
  );
}
