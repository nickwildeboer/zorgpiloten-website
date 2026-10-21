export const navigatie = [
  { href: "/", label: "Home" },
  { href: "/hr", label: "HR & P&O" },
  { href: "/communicatie", label: "Communicatie" },
  { href: "/werkwijze", label: "Hoe wij werken" },
  { href: "/veiligheid", label: "Veiligheid & FG" },
  { href: "/over-ons", label: "Over ons" },
] as const;

/** Link naar de gespreksvoorbereider op /over-ons, optioneel met afdeling en taak vooringevuld. */
export function taakgesprekHref(afdeling?: "hr" | "communicatie" | "bestuur", taak?: string) {
  const params = new URLSearchParams();
  if (afdeling) params.set("afdeling", afdeling);
  if (taak) params.set("taak", taak);
  const q = params.toString();
  return `/over-ons${q ? `?${q}` : ""}#taakgesprek`;
}
