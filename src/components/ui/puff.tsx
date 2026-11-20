import type { CSSProperties } from "react";

/**
 * Splits a line into letters that fill up one after another on load and give a little under the
 * cursor, as if stuffed. Pure CSS (see .puff); `start` continues the stagger from the previous line.
 */
export function Puff({ text, start = 0 }: { text: string; start?: number }) {
  let index = start;
  return (
    <span aria-hidden className="whitespace-nowrap">
      {text.split(" ").map((word, w) => (
        <span key={w}>
          {w > 0 && " "}
          {Array.from(word).map((char, c) => (
            <span key={c} className="puff" style={{ "--i": index++ } as CSSProperties}>
              {char}
            </span>
          ))}
        </span>
      ))}
    </span>
  );
}
