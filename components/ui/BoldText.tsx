import { Fragment } from "react";

/**
 * Renders a string with **bold** segments as <strong>. Minimal — just
 * enough to let dictionary copy emphasize a phrase without needing a
 * markdown renderer for this project's scale.
 */
export function BoldText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);

  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="font-semibold text-brand-dark">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}
