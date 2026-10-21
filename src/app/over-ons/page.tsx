import type { Metadata } from "next";
import { Container, Knop, Sectie, SectieKop } from "@/components/ui";
import { Profielen } from "@/components/over-ons/Profielen";
import { Gespreksvoorbereider } from "@/components/over-ons/Gespreksvoorbereider";

export const metadata: Metadata = {
  title: "Over ons en taakgesprek plannen",
  description:
    "Hugo van den Berk, MSc en Nick Wildeboer, MSc. Bestuurservaring uit het ziekenhuis, gekoppeld aan zorg-ICT en bouwkracht. Stel in drie klikken je taakgesprek van 45 minuten samen.",
};

export default function OverOnsPagina() {
  return (
    <>
      <section className="pb-14 pt-14 sm:pb-20 sm:pt-20">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-[36px] sm:text-[54px]">Bestuurservaring uit het ziekenhuis, gekoppeld aan zorg-ICT en bouwkracht.</h1>
            <p className="mt-5 max-w-2xl text-lg text-tekst-2">
              Twee academisch opgeleide specialisten uit de zorg zelf. Geen IT-jongens die de zorg niet snappen, en geen veranderaars die na
              een praatje vertrekken zonder dat er iets werkt.
            </p>
            <Knop href="#taakgesprek" className="mt-8">
              Stel je taakgesprek samen
            </Knop>
          </div>
        </Container>
      </section>

      <Sectie toon="salie" id="wie">
        <SectieKop
          titel="Wie er aan tafel zit"
          intro="Per kwalificatie zie je waar die vandaan komt en wat je zorgorganisatie eraan heeft."
        />
        <div className="mt-10">
          <Profielen />
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 md:gap-8">
          <p className="border-t-2 border-spar pt-4 text-[17px] text-tekst">
            Hugo zorgt dat het team meegaat, weet wat wel en niet mag en zich eigenaar voelt van de nieuwe manier van werken.
          </p>
          <p className="border-t-2 border-spar pt-4 text-[17px] text-tekst">
            Nick zorgt dat er op maandag echt iets klaarstaat, veilig ingericht in jullie eigen omgeving.
          </p>
        </div>
      </Sectie>

      <Sectie id="taakgesprek" className="scroll-mt-16">
        <SectieKop
          titel="Stel in drie klikken je taakgesprek samen"
          intro="Kies je afdeling, de taak en hoeveel tijd erin zit. Op de gesprekskaart verschijnt meteen de agenda voor jullie gesprek van 45 minuten met Hugo en Nick."
        />
        <div className="mt-10">
          <Gespreksvoorbereider />
        </div>
      </Sectie>
    </>
  );
}
