# Zorgpiloten, designsysteem Horizon

Bron: het Design System-artifact "Zorgpiloten" van Nick (claude.ai). Logo's staan in public/logo/horizon/, tokens in src/styles/tokens.css. Bestandsnamen van logo's hieronder komen overeen met die map.


Zorgpiloten helpt zorgorganisaties AI in te zetten als copilot. Het verhaal achter de naam: een piloot laat zo'n 90% van de vlucht over aan de automatische piloot en leunt op het belangrijkste moment op eigen kennis en ervaring. Zo werkt AI in de zorg ook: de techniek neemt het routinewerk over, de professional houdt de koers. De richting heet **Horizon**: optimistisch en creatief als een zonsopkomst boven de wolken, met nachtblauw als betrouwbaar anker voor bestuurders en IT.

## Toon en tekst

- Schrijf in het Nederlands, helder en warm. Spreek de lezer aan met **u** in proposities, offertes en bestuurlijke stukken; **je** mag op social media en in de community.
- Zinnen kort, actief en concreet. Liever "Uw teams winnen 6 uur per week terug" dan "Er kan efficiencywinst gerealiseerd worden".
- Gebruik de luchtvaartmetafoor met mate: koers, copilot, opstijgen, landen. Maximaal een metafoor per alinea, nooit als grap.
- Benadruk altijd de mens: AI ondersteunt, de professional beslist. Vermijd hype ("revolutionair", "game changer") en angst.
- Koppen in zinsvorm (alleen de eerste letter hoofdletter). Eyebrows in `label`, in hoofdletters.
- Geen emoji in zakelijke uitingen. Geen gedachtestreepjes; gebruik een dubbele punt of een nieuwe zin.

Voorbeeldregels: "Laat AI vliegen, houd zelf de koers." · "90% automatisch, 100% in controle." · "Uw copilot in de zorg."

## Kleur

- Grond is altijd `creme`; verhoogde vlakken (kaarten, formulieren) zijn `wolk` met `lijn` als rand of `shadow-zacht`.
- Tekst in `nachtblauw`, secundair in `nachtblauw-zacht`. Links en blauwe tekst in `hemel-diep`, nooit in `hemelblauw`.
- `hemelblauw` is de merkkleur uit het logo, voor vlakken, illustraties en horizon-vormen. Nooit als tekstkleur. Grote merkvlakken mogen ook `nachtblauw` zijn met `creme` tekst.
- `koraal` is het accent: de primaire knop en hooguit een highlight per scherm. Tekst op koraal is altijd `nachtblauw`, nooit wit.
- `zandgeel` is de zon: ondersteunend in illustraties, markeringen en getinte vlakken. `hemel-zacht` en `koraal-zacht` zijn tints voor tags en uitgelichte blokken.
- Verhouding als vuistregel: 60% `creme`/`wolk`, 25% `nachtblauw` en `hemelblauw`, 10% `zandgeel` en tints, 5% `koraal`.
- Alle tekstparen halen minimaal 4.5:1. De focusring is 2px solid `hemel-diep` met 2px offset (minimaal 3:1 op elk vlak).

## Typografie

- Koppen in **Bricolage Grotesque** (`display`, `h1`, `h2`, `h3`): expressief, licht eigenzinnig. Tekst in **DM Sans** (`intro`, `body`, `small`, `label`).
- Beide fonts staan op Google Fonts: `https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=DM+Sans:opsz,wght@9..40,400..700&display=swap`.
- `display` hooguit een keer per pagina of slide. Lopende tekst altijd `body`, maximaal 70 tekens per regel.

## Vorm, ruimte en beeld

- Rond en zacht: knoppen en tags `radius-pill`, kaarten `radius-md`, grote vlakken `radius-lg`. Geen scherpe hoeken.
- Ruimte via de schaal `space-1` tot `space-6`; kaarten krijgen `space-4` padding, secties `space-6` afstand. Veel witruimte.
- Beeldtaal: de horizon. Halve cirkels (zon), brede pillen (wolken) en horizontale banden in de merkkleuren. Vlak, zonder verlopen die de tokens niet kennen.
- Fotografie: echte zorgprofessionals aan het werk, warm licht, rustige achtergrond. Geen stockfoto's van robots, blauwe hersenen of zwevende code.
- Een schaduw: `shadow-zacht`, alleen voor zwevende kaarten.

## Iconografie

- Nog geen eigen iconenset. Gebruik voorlopig Lucide (outline, 1.75px lijn, afgeronde uiteinden) in `nachtblauw` of `hemel-diep`, op 20 of 24px.
- Geen emoji als decoratie.

## Logo

- Het logo heet **De koers bepalen**: een `hemelblauw` koersbocht (het werk dat AI overneemt) en een `nachtblauw` navigatiepijl (de professional die de richting bepaalt). Naast het beeldmerk staat het woordmerk "Zorgpiloten" in Schibsted Grotesk 600, omgezet naar vormen.
- Gebruik altijd de bestanden uit de groep Logos; typ het woordmerk nooit zelf na en teken het beeldmerk niet opnieuw.
- `zorgpiloten-logo-kleur.svg` op `creme` en `wolk`. `zorgpiloten-logo-negatief.svg` (pijl en woord in `creme`) op `nachtblauw`. `zorgpiloten-logo-nachtblauw.svg` en `zorgpiloten-logo-wit.svg` voor eenkleurig drukwerk en op foto's.
- `zorgpiloten-beeldmerk-kleur.svg` alleen als het woord elders al staat (social avatar, slidehoek, favicon). `zorgpiloten-app-icoon.svg` is het beeldmerk negatief op een `nachtblauw` vlak.
- Vrije ruimte rondom: minstens de hoogte van de pijl. Minimale breedte van het volledige logo: 120px op scherm, 30mm in druk; daaronder alleen het beeldmerk.
- Niet doen: kleuren wisselen, `koraal` in het logo, schaduw of verloop toevoegen, het logo draaien of uitrekken, het kleurlogo op `hemelblauw` zetten.

## Componenten

- `Button`: primair (koraal) voor de belangrijkste actie, secundair (nachtblauw omlijnd) voor de rest, tekstknop voor kleine acties.
- `Card`: wolk-kaart voor diensten, cases en inzichten.
- `Tag`: kleine pill-labels voor categorie en status.
- Klassen staan in `components/bundle.css`, prefix `zp-`.

## Toepassingen

- Elke uiting hoort bij een van de toepassingen in de groep Toepassingen: `Briefpapier`, `Offerte`, `Factuur`, `Presentatie`, `Website`, `Emailhandtekening` en `LinkedIn`. Volg de regels in hun eigen beschrijving.
- Documenten (brief, offerte, factuur) delen een opbouw: logo linksboven, gegevens rechtsboven, koppen in Bricolage Grotesque, tekst in DM Sans 10 pt, voetregel boven een `lijn`-haarlijn. Verstuur ze altijd als PDF.
- Grote merkmomenten (offertevoorblad, titel- en afsluitslide, website-hero, LinkedIn-banner) tonen de koersbocht met pijl, eventueel met de `zandgeel` route naar het `koraal` doel. Binnenpagina's en gewone slides blijven rustig.
- Kies per vlak een vaste combinatie: `creme` of `wolk` met `nachtblauw` tekst, `nachtblauw` met `creme` tekst, `hemelblauw` of `hemel-zacht` met `nachtblauw` tekst.
- Nummering: offertes ZP-jaar-volgnummer, facturen ZP-F-jaar-volgnummer.
- Tekst tussen [haken] in de voorbeelden is een plaatshouder; bedragen, cijfers en quotes zijn voorbeelden.
