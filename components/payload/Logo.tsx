"use client";

import React from "react";

export default function Logo() {
  return (
    <div className="flex items-center gap-3 py-2">
      {/* T | S Logo */}
      <div className="flex items-center gap-2">
        <span
          style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: "1.5rem",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            color: "#f1f1f1",
          }}
        >
          T
        </span>
        <span
          style={{
            width: "1px",
            height: "24px",
            background: "#2a2a36",
          }}
        />
        <span
          style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: "1.5rem",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            color: "#f1f1f1",
          }}
        >
          S
        </span>
      </div>

      {/* Admin label */}
      <span
        style={{
          fontFamily: '"Inter", sans-serif',
          fontSize: "0.625rem",
          fontWeight: 500,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "#6b5b95",
          padding: "2px 6px",
          border: "1px solid #2a2a36",
        }}
      >
        Admin
      </span>
    </div>
  );
}
