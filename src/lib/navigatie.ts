export const navigatie = [
  { href: "/diensten", label: "Wat wij doen" },
  { href: "/aanpak", label: "Aanpak" },
  { href: "/veiligheid", label: "Veiligheid" },
  { href: "/over-ons", label: "Over ons" },
] as const;

/** Voorbeelden uit de praktijk: de twee afdelingspagina's met de demo's. */
export const voorbeelden = [
  { href: "/hr", label: "HR & P&O" },
  { href: "/communicatie", label: "Communicatie" },
] as const;

/**
 * De kennismaking op één plek. De duur volgt het Cal.com-event waar de knop naartoe gaat:
 * maak je in Cal.com een event van een andere lengte, pas dan hier calLink en minuten samen aan.
 */
export const kennismaking = {
  minuten: 30,
  calLink: "nick-wildeboer/30min",
  knop: "Plan een kennismaking",
} as const;

/** Link naar de pagina waar de bezoeker de kennismaking samenstelt en inplant, optioneel met afdeling en onderwerp vooringevuld. */
export function kennismakingHref(afdeling?: "hr" | "communicatie" | "bestuur" | "anders", taak?: string) {
  const params = new URLSearchParams();
  if (afdeling) params.set("afdeling", afdeling);
  if (taak) params.set("taak", taak);
  const q = params.toString();
  return `/kennismaking${q ? `?${q}` : ""}`;
}

/** Zet [MINUTEN] in een tekst om naar de duur van de kennismaking. */
export function metMinuten(tekst: string) {
  return tekst.replaceAll("[MINUTEN]", String(kennismaking.minuten));
}
