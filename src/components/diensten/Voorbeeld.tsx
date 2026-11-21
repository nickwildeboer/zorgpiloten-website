import { ExtraIcoon } from "@/components/aanpak/ExtraIconen";

/** Klein gebouwd voorbeeld uit de demo's, in plaats van een sfeerfoto. Rust op een creme vlak. */
export function VoorbeeldBeeld({ soort }: { soort: "hr" | "communicatie" }) {
  return (
    <div className="relative flex aspect-[16/10] flex-col justify-center overflow-hidden rounded-[var(--radius-lg)] bg-creme px-6 sm:px-10">
      <span aria-hidden="true" className="absolute -right-10 -top-10 aspect-square w-[160px] rounded-full bg-zandgeel opacity-60" />
      {soort === "hr" ? (
        <div className="relative">
          <p className="text-[13px] font-semibold text-nachtblauw-zacht">Cao-loket</p>
          <p className="ml-auto mt-4 max-w-[22rem] rounded-2xl rounded-br-md border border-lijn-koel bg-wolk px-5 py-4 text-[17px] leading-[1.4] text-nachtblauw sm:text-[18px]">
            Hoeveel ORT krijg ik voor de zondagdienst?
          </p>
        </div>
      ) : (
        <div className="relative">
          <p className="text-[13px] font-semibold text-nachtblauw-zacht">B1-versie</p>
          <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-2xl border border-lijn-koel bg-wolk px-5 py-4 font-display text-[22px] font-semibold text-nachtblauw sm:text-[26px]">
            <s className="font-medium text-nachtblauw-zacht decoration-2">sedatie</s>
            <ExtraIcoon naam="wissel" grootte={20} className="text-hemel-diep" />
            <span>roesje</span>
          </p>
        </div>
      )}
    </div>
  );
}
