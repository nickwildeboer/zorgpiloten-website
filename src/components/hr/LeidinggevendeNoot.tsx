import { Container } from "@/components/ui";
import { Icoon } from "@/components/home/Iconen";
import { Portret } from "@/components/home/Portret";
import { hrPagina } from "@/content/paginas";
import { mensen } from "@/content/site";
import { TaakIcoon } from "./TaakIconen";

const parallel = [
  { thema: "Kaders", collega: "Weet wat ze zelf beslist", assistent: "Weet wat hij nooit zelf verstuurt" },
  { thema: "Proeftijd", collega: "Een ervaren collega leest mee", assistent: "Twee collega’s controleren elk voorwerk" },
  { thema: "Regie", collega: "Een leidinggevende is aanspreekbaar", assistent: "Eén eigenaar stuurt bij of zet stil" },
];

const kolommen = "grid grid-cols-2 gap-x-6 sm:grid-cols-[7.5rem_minmax(0,1fr)_minmax(0,1fr)]";

/** De noot van Hugo, vanuit de veranderkunde: een nieuwe collega naast een digitale assistent. */
export function LeidinggevendeNoot() {
  const { noot } = hrPagina;
  return (
    <section className="py-20 sm:py-28" aria-labelledby="noot-kop">
      <Container>
        <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <div>
            <h2 id="noot-kop" className="text-[32px] leading-[1.1] sm:text-[42px]">
              {noot.kop}
            </h2>
            <p className="mt-5 max-w-[30rem] text-[18px] leading-[1.6] text-nachtblauw">{noot.zin}</p>
            <div className="mt-8 flex items-center gap-4">
              <Portret src={mensen.hugo.portret} naam={mensen.hugo.naam} initialen="HB" grootte={56} rand="wit" />
              <p className="text-[15px] leading-snug text-nachtblauw-zacht">
                <span className="block font-semibold text-nachtblauw">{mensen.hugo.naam}</span>
                Organisatie- en veranderkunde (Sioo)
              </p>
            </div>
          </div>

          <div className="lg:pt-2">
            <div aria-hidden="true" className={`${kolommen} pb-4 text-[15px] font-semibold text-nachtblauw`}>
              <span className="max-sm:hidden" />
              <span className="flex items-center gap-2.5">
                <TaakIcoon naam="persoon" grootte={20} />
                Nieuwe collega
              </span>
              <span className="flex items-center gap-2.5">
                <Icoon naam="assistent" grootte={20} />
                Digitale assistent
              </span>
            </div>
            <dl className="border-b border-lijn-koel">
              {parallel.map((r) => (
                <div key={r.thema} className={`${kolommen} gap-y-2 border-t border-lijn-koel py-5`}>
                  <dt className="col-span-2 font-display text-[18px] font-semibold text-nachtblauw sm:col-span-1">{r.thema}</dt>
                  <dd className="text-[16px] leading-snug text-nachtblauw-zacht">
                    <span className="sr-only">Nieuwe collega: </span>
                    {r.collega}
                  </dd>
                  <dd className="text-[16px] leading-snug text-nachtblauw">
                    <span className="sr-only">Digitale assistent: </span>
                    {r.assistent}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Container>
    </section>
  );
}
