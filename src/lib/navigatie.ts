export const navigatie = [
  { href: "/", label: "Home" },
  { href: "/hr", label: "HR & P&O" },
  { href: "/communicatie", label: "Communicatie" },
  { href: "/werkwijze", label: "Hoe wij werken" },
  { href: "/veiligheid", label: "Veiligheid & FG" },
  { href: "/over-ons", label: "Over ons" },
] as const;

/**
 * Het taakgesprek op één plek. De duur volgt het Cal.com-event waar de knop naartoe gaat:
 * maak je in Cal.com een event van een andere lengte, pas dan hier calLink en minuten samen aan.
 */
export const taakgesprek = {
  minuten: 30,
  calLink: "nick-wildeboer/30min",
} as const;

/** Link naar de pagina waar de bezoeker het taakgesprek samenstelt en inplant, optioneel met afdeling en taak vooringevuld. */
export function taakgesprekHref(afdeling?: "hr" | "communicatie" | "bestuur", taak?: string) {
  const params = new URLSearchParams();
  if (afdeling) params.set("afdeling", afdeling);
  if (taak) params.set("taak", taak);
  const q = params.toString();
  return `/taakgesprek${q ? `?${q}` : ""}`;
}
