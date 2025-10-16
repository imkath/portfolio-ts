"use client";

import { useState } from "react";
import type { Credit, CreditRole } from "@/src/types";

// Fixed order for credits display
const ROLE_ORDER: CreditRole[] = [
  "photography",
  "hair",
  "styling",
  "art",
  "model",
  "production",
  "director",
  "dop",
  "brand",
  "publication",
];

const roleLabels: Record<CreditRole, string> = {
  photography: "Fotografía",
  hair: "Cabello",
  styling: "Styling",
  art: "Dirección de Arte",
  model: "Modelo",
  production: "Producción",
  director: "Director",
  dop: "Director de Fotografía",
  brand: "Marca",
  publication: "Publicación",
};

interface CreditsProps {
  credits: Credit[];
}

export function Credits({ credits }: CreditsProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  // Sort credits according to fixed order
  const sortedCredits = [...credits].sort((a, b) => {
    const indexA = ROLE_ORDER.indexOf(a.role);
    const indexB = ROLE_ORDER.indexOf(b.role);
    return indexA - indexB;
  });

  // Generate full credits text for tooltip
  const fullCreditsText = sortedCredits
    .map((credit) => `${roleLabels[credit.role]}: ${credit.name}`)
    .join(" · ");

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-text-dim">
        Créditos
      </h3>
      <div className="relative">
        <div
          className="group relative"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onFocus={() => setShowTooltip(true)}
          onBlur={() => setShowTooltip(false)}
          tabIndex={0}
        >
          <div
            className="credits line-clamp-2 cursor-help"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {sortedCredits.map((credit, index) => (
              <span key={index}>
                <span
                  className="uppercase tracking-wider"
                  style={{ fontSize: "0.95em" }}
                >
                  {roleLabels[credit.role]}
                </span>
                : {credit.name}
                {index < sortedCredits.length - 1 && " · "}
              </span>
            ))}
          </div>

          {/* Tooltip */}
          {showTooltip && sortedCredits.length > 0 && (
            <div
              className="absolute bottom-full left-0 z-50 mb-2 max-w-md rounded-lg border border-line bg-surface p-3 shadow-lg"
              role="tooltip"
            >
              <div className="credits space-y-1">
                {sortedCredits.map((credit, index) => (
                  <p key={index}>
                    <span
                      className="uppercase tracking-wider"
                      style={{ fontSize: "0.95em" }}
                    >
                      {roleLabels[credit.role]}
                    </span>
                    : {credit.name}
                  </p>
                ))}
              </div>
              {/* Tooltip arrow */}
              <div
                className="absolute left-4 top-full h-0 w-0"
                style={{
                  borderLeft: "6px solid transparent",
                  borderRight: "6px solid transparent",
                  borderTop: "6px solid var(--line)",
                }}
              />
            </div>
          )}
        </div>

        {/* Screen reader full text */}
        <div className="sr-only">{fullCreditsText}</div>
      </div>
    </div>
  );
}

// Export for testing
export { ROLE_ORDER, roleLabels };
