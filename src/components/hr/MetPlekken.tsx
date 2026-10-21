import { Fragment } from "react";

/**
 * Toont tekst waarin [vierkante haken] een plaatshouder markeren.
 * Een plaatshouder wordt een rustig saliegroen invulveld, zodat zichtbaar is
 * wat de organisatie zelf invult of welke bron uit de eigen documenten komt.
 */
export function MetPlekken({ tekst }: { tekst: string }) {
  const delen = tekst.split(/(\[[^\]]+\])/g);
  return (
    <>
      {delen.map((deel, i) =>
        deel.startsWith("[") && deel.endsWith("]") ? (
          <span key={i} className="rounded-md bg-hemel-zacht px-1.5 py-0.5 text-[0.94em] text-nachtblauw [box-decoration-break:clone]">
            <span className="sr-only">plaatshouder: </span>
            {deel.slice(1, -1)}
          </span>
        ) : (
          <Fragment key={i}>{deel}</Fragment>
        ),
      )}
    </>
  );
}
