import { Foto } from "@/components/Foto";
import { Koersbocht, Wolk, Zon } from "@/components/Horizon";

/**
 * Het merkmoment van de home: Nick in een training, Hugo ervoor, en de koersbocht
 * met de zandgele route naar het koraal doel op de creme grond eronder.
 */
export function HeroCollage() {
  return (
    <div className="relative mx-auto aspect-[6/5] w-full max-w-[640px]">
      <Zon className="absolute left-[3%] top-[16%] w-[28%]" />
      <Wolk className="absolute left-[0%] top-[30%] h-[3.2%] w-[20%]" kleur="var(--hemel-zacht)" />
      <Wolk className="absolute left-[9%] top-[36%] h-[2.4%] w-[12%]" kleur="var(--hemelblauw)" />

      <figure className="absolute right-0 top-0 w-[78%]">
        <Foto
          src="/fotos/nick-hero-presentatie.jpg"
          alt="Nick Wildeboer geeft een training aan een groep"
          ratio="4/3"
          positie="62% 30%"
          priority
          sizes="(min-width: 1024px) 480px, 78vw"
        />
        <figcaption className="absolute right-3 top-3 rounded-full bg-wolk/95 px-3 py-1 text-[13px] font-medium text-nachtblauw sm:right-4 sm:top-4">
          Nick
        </figcaption>
      </figure>

      <figure className="absolute bottom-0 left-0 w-[44%] rounded-[calc(var(--radius-lg)+6px)] bg-creme p-[6px]">
        <Foto
          src="/fotos/hugo-training.jpg"
          alt="Hugo van den Berk tijdens een training"
          ratio="4/5"
          sizes="(min-width: 1024px) 280px, 44vw"
        />
        <figcaption className="absolute bottom-4 left-4 rounded-full bg-wolk/95 px-3 py-1 text-[13px] font-medium text-nachtblauw">
          Hugo
        </figcaption>
      </figure>

      <Koersbocht className="absolute bottom-[-1%] right-[1%] w-[46%]" />
    </div>
  );
}
