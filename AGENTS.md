# Zorgpiloten website (zorgpiloten.nl)

Website van Zorgpiloten, de samenwerking van Hugo van den Berk en Nick Wildeboer. Next.js 16 (App Router), Tailwind v4, TypeScript.

## Bronnen
- Outline en besluiten: `~/Documents/Claude/Projects/Business Developer/03-frontend/landingspaginas/drafts/zorgpiloten-website-outline.md`
- Merk: Horizon, zie `BRAND.md` in deze repo (bron: Nicks Design System-artifact). Tokens in `src/styles/tokens.css`, logo's in `public/logo/horizon/`.
- Taken per afdeling: `~/Documents/Claude/Projects/Business Developer/10-werkruimte/projecten/zorgstaf-hugo.md`

## Grenzen
- Geen prijzen of pakketnamen op de site. De voordeur is het taakgesprek van 45 minuten.
- Geen verzonnen klantcases, cijfers of bespaargaranties. Een rekenvoorbeeld heet een voorbeeld.
- Copy in de u-vorm (merkregel voor proposities), kort, zonder gedachtestreepjes, puntkomma's of uitroeptekens. Eyebrows als label in hoofdletters volgens het merk, nooit monospace.
- Koraal is het enige accent (primaire knop, één highlight per scherm), tekst op koraal altijd nachtblauw. Geen vliegtuigjes, cockpits, robots of stockdokters.
- Echte mensen alleen op echte foto's (Nick, Hugo). Sfeerbeelden zonder herkenbare gezichten, prompts in `beeld-prompts/`.
- Live zetten en het domein regelt Nick. Commit naar `main`, stage gericht.

## Bouwstenen
`src/components/ui.tsx` (Knop, Container, Sectie, SectieKop, Kaart, Pill, Schakelaar), `src/components/Koerslijn.tsx`, `src/lib/navigatie.ts` (taakgesprekHref), `src/components/Foto.tsx` (foto met Horizon-plaatsvervanger als het bestand nog ontbreekt), `src/components/Horizon.tsx` (Koersbocht, Zon, Wolk, HorizonBand).
