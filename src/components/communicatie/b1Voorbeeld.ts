/* De fictieve voorbeeldbrief, gedeeld door de hero en de B1-demo op /communicatie. */

export type Zin = {
  origineel: string;
  b1: string;
  /** Feiten die letterlijk in beide versies staan. */
  feiten: string[];
};

/*
 * Fictieve voorbeeldbrief van een fictief ziekenhuis. Geen echte namen.
 * De medische feiten staan in beide versies letterlijk hetzelfde.
 * Wat het origineel niet zegt, voegt de B1-versie ook niet toe. Dat staat bij de controlepunten.
 */
export const alineas: Zin[][] = [
  [
    {
      origineel: "Hierbij ontvangt u informatie omtrent de voorbereiding op de coloscopie welke bij u zal worden verricht op [datum] om [tijd].",
      b1: "U krijgt een onderzoek van uw darm. Dit heet een coloscopie. Het onderzoek is op [datum] om [tijd].",
      feiten: ["coloscopie", "[datum] om [tijd]"],
    },
  ],
  [
    {
      origineel: "Teneinde een adequate visualisatie van het darmslijmvlies te bewerkstelligen, dient de darm volledig gereinigd te zijn.",
      b1: "Uw darm moet helemaal schoon zijn. Alleen dan kan de arts de binnenkant van uw darm goed zien.",
      feiten: [],
    },
    {
      origineel: "Gedurende drie dagen voorafgaand aan het onderzoek dient u een vezelarm dieet aan te houden.",
      b1: "Eet de drie dagen voor het onderzoek vezelarm.",
      feiten: ["drie dagen", "vezelarm"],
    },
    {
      origineel: "De avond voorafgaand aan het onderzoek neemt u [naam van het laxeermiddel] in conform het schema in de bijlage.",
      b1: "De avond voor het onderzoek neemt u [naam van het laxeermiddel] in. Volg daarbij het schema in de bijlage.",
      feiten: ["[naam van het laxeermiddel]", "het schema in de bijlage"],
    },
  ],
  [
    {
      origineel: "Indien u anticoagulantia gebruikt, dient u tijdig contact op te nemen met de polikliniek.",
      b1: "Gebruikt u bloedverdunners? Bel dan op tijd de polikliniek.",
      feiten: ["polikliniek"],
    },
  ],
  [
    {
      origineel: "Na sedatie is het u niet toegestaan zelfstandig een motorvoertuig te besturen. Wij adviseren u derhalve een begeleider mee te nemen.",
      b1: "Krijgt u een roesje? Dan mag u daarna niet zelf autorijden. Neem daarom iemand mee die u naar huis brengt.",
      feiten: [],
    },
  ],
  [
    {
      origineel: "Voor vragen kunt u zich wenden tot de polikliniek Maag-, Darm- en Leverziekten via [telefoonnummer].",
      b1: "Hebt u vragen? Bel dan de polikliniek Maag-, Darm- en Leverziekten via [telefoonnummer].",
      feiten: ["polikliniek Maag-, Darm- en Leverziekten", "[telefoonnummer]"],
    },
  ],
];

export const woordenlijst = [
  ["anticoagulantia", "bloedverdunners"],
  ["sedatie", "roesje"],
  ["motorvoertuig besturen", "autorijden"],
  ["conform", "volg daarbij"],
];

export const controlepunten = [
  "Datum, tijd, middel en telefoonnummer staan er letterlijk in.",
  "‘Op tijd’ is geen termijn. Vraag de afdeling om een aantal dagen.",
  "Een verpleegkundige van de afdeling leest mee.",
];
