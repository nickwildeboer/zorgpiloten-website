/* Alleen voor het kiezen tussen de vijf richtingen. Hoort niet bij het ontwerp en gaat niet mee naar de echte site. */
(() => {
  const namen = ["De copiloot aan het werk", "Twee mensen uit de zorg", "De koers", "Voor en na", "Aan het werk"];
  const nu = Number((location.pathname.match(/ontwerp\/(\d)/) || [])[1]);
  const balk = document.createElement("nav");
  balk.setAttribute("aria-label", "Kies een richting");
  balk.style.cssText =
    "position:fixed;right:16px;bottom:16px;z-index:9999;display:flex;align-items:center;gap:4px;padding:6px 6px 6px 14px;border-radius:999px;background:var(--color-night);color:var(--color-on-night);font:500 13px/1 var(--font-body);box-shadow:var(--shadow-card)";
  const label = document.createElement("span");
  label.textContent = nu ? `Richting ${nu}: ${namen[nu - 1]}` : "Richtingen";
  label.style.cssText = "margin-right:8px;white-space:nowrap";
  balk.append(label);
  const maak = (tekst, href, actief) => {
    const a = document.createElement("a");
    a.href = href;
    a.textContent = tekst;
    a.style.cssText = `display:grid;place-items:center;min-width:30px;height:30px;padding:0 9px;border-radius:999px;text-decoration:none;color:${actief ? "var(--color-ink)" : "var(--color-on-night)"};background:${actief ? "var(--color-sun)" : "transparent"}`;
    return a;
  };
  namen.forEach((_, i) => balk.append(maak(String(i + 1), `/ontwerp/${i + 1}/index.html`, i + 1 === nu)));
  balk.append(maak("Overzicht", "/ontwerp/index.html", false));
  if (matchMedia("(max-width: 40rem)").matches) label.textContent = nu ? `Richting ${nu}` : "";
  document.body.append(balk);
})();
