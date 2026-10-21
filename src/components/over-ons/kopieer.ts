/** Kopieert platte tekst naar het klembord, met een fallback voor oudere browsers en onveilige contexten. */
export async function kopieerTekst(tekst: string): Promise<boolean> {
  try {
    if (typeof navigator !== "undefined" && navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(tekst);
      return true;
    }
  } catch {
    // val terug op de oude route hieronder
  }
  try {
    const veld = document.createElement("textarea");
    veld.value = tekst;
    veld.setAttribute("readonly", "");
    veld.style.position = "fixed";
    veld.style.top = "-1000px";
    veld.style.opacity = "0";
    document.body.appendChild(veld);
    veld.select();
    veld.setSelectionRange(0, tekst.length);
    const gelukt = document.execCommand("copy");
    document.body.removeChild(veld);
    return gelukt;
  } catch {
    return false;
  }
}
