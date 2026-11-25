# Zorgpiloten website (zorgpiloten.nl)

Website van Zorgpiloten, het bureau van Hugo van den Berk en Nick Wildeboer: Copilot en AI in de zorg. Next.js 16 (App Router), Tailwind v4, TypeScript.

## Wat de site zegt
- Zorgpiloten zorgt dat Copilot in zorginstellingen echt gebruikt wordt (propositie van Hugo, 24 november 2026, Nick akkoord op 25 november). Vaste regel: AI neemt routinewerk over, de professional beslist.
- Lezer: het afdelingshoofd van een ondersteunende afdeling, te beginnen bij communicatie. Bestuur en directie lezen mee.
- De route: Ontdekken (gratis webinar, een van de ingangen), Instap (inspiratiesessie of teamtraining), Agent-pakket, Abonnement. Apart: SharePoint op orde.
- De belofte gaat over Copilot. Agents bouwen we in de eigen omgeving van de instelling, in wat het best en veiligst werkt.
- De voordeur is de kennismaking (`/kennismaking`, duur en Cal.com-link in `src/lib/navigatie.ts`). De aanmeldlink van de webinar staat daar ook (`webinar.aanmeldLink`).
- Eigen aanpak in vijf stappen (Luisteren, Koers kiezen, Bouwen, Oefenen, Borgen). Digital Lemon staat alleen in de bio van Hugo.

## Pagina's
`/` home, `/diensten` (de route in vier stappen: Ontdekken, Instap, Agent-pakket, Abonnement, plus het aparte SharePoint-traject), `/aanpak`, `/veiligheid`, `/over-ons`, `/kennismaking`. `/hr` en `/communicatie` zijn voorbeelden met demo's en staan niet in het hoofdmenu. `/taakgesprek` en `/werkwijze` verwijzen door (`next.config.ts`).

## Tekst
- Alle tekst van de nieuwe pagina's staat in `src/content/site.ts`. ChatGPT schrijft de copy (skill `chatgpt-tekst`), Claude zet opdracht en feiten klaar en zet de tekst woord voor woord terug.
- Eis van Nick: simpel en duidelijk, iedereen begrijpt het en de waarde is direct duidelijk.
- Je-vorm (besluit 25 november 2026, patiëntenbrieven in de voorbeelden houden u), kort, zonder gedachtestreepjes, puntkomma's of uitroeptekens. Koppen in zinsvorm.

## Grenzen
- Geen prijzen op de site.
- Geen klantnamen, cases, cijfers of bespaargaranties tot de eerste trajecten gemeten zijn. Alleen de eigen achtergrond van Hugo en Nick.
- Echte mensen alleen op echte foto's (Nick, Hugo). Sfeerbeelden zonder herkenbare gezichten, prompts in `beeld-prompts/`.
- Live zetten en het domein regelt Nick, na akkoord van Hugo. Werk op een branch en merge pas na Nicks ja.

## Ontwerp
- Merk: Horizon, zie `BRAND.md`. Tokens in `src/styles/tokens.css`, logo's in `public/logo/horizon/`.
- Rustig en professioneel: creme grond, nachtblauw als anker, haarlijnen in plaats van kaarten, één koraal knop per scherm met nachtblauwe tekst, tweede actie als tekstlink met pijl. Geen losse vormen, collages of rekenhulpen op de hoofdpagina's.
- Eén bewegend moment: het beeld bij de visie op home (`.zp-opkomst`).

## Bouwstenen
`src/components/ui.tsx` (Knop, PijlLink, Container, Sectie, SectieKop, AfsluitBand), `src/components/Foto.tsx`, `src/components/over-ons/Profielen.tsx`, `src/components/over-ons/Gespreksvoorbereider.tsx` (de planner op `/kennismaking`, onderwerpen in `taken.ts`).

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
