# Zorgpiloten website (zorgpiloten.nl)

Website van Zorgpiloten, de samenwerking van Hugo van den Berk en Nick Wildeboer. Next.js 16 (App Router), Tailwind v4, TypeScript.

## Bronnen
- Outline en besluiten: `~/Documents/Claude/Projects/Business Developer/03-frontend/landingspaginas/drafts/zorgpiloten-website-outline.md`
- Merk: `~/Documents/Claude/Projects/Business Developer/02-brand/zorgpiloten/` (brand-book.md, tokens.css, logo/). `src/styles/tokens.css` is een kopie, werk hem bij als het merk verandert.
- Taken per afdeling: `~/Documents/Claude/Projects/Business Developer/10-werkruimte/projecten/zorgstaf-hugo.md`

## Grenzen
- Geen prijzen of pakketnamen op de site. De voordeur is het taakgesprek van 45 minuten.
- Geen verzonnen klantcases, cijfers of bespaargaranties. Een rekenvoorbeeld heet een voorbeeld.
- Copy in de je-vorm, zonder gedachtestreepjes, puntkomma's of uitroeptekens. Labels in gewone schrijfwijze, nooit hoofdletters met brede spatiëring, nooit monospace.
- Eén framboos accent per vlak. Geen vliegtuigjes, cockpits, robots of stockdokters.
- Live zetten en het domein regelt Nick. Commit naar `main`, stage gericht.

## Bouwstenen
`src/components/ui.tsx` (Knop, Container, Sectie, SectieKop, Kaart, Pill, Schakelaar), `src/components/Koerslijn.tsx`, `src/lib/navigatie.ts` (taakgesprekHref voor een vooringevulde gespreksvoorbereider).
