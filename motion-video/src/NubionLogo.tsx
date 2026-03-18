import React from "react";

// SVG recreation of the Nubion robot logo mark
export const NubionRobotIcon: React.FC<{ size?: number }> = ({ size = 64 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Antenna dot */}
    <circle cx="32" cy="6" r="4" fill="white" />
    {/* Antenna stem */}
    <rect x="30" y="9" width="4" height="8" rx="2" fill="white" />
    {/* Head / body */}
    <rect x="12" y="17" width="40" height="34" rx="10" fill="white" />
    {/* Left eye */}
    <rect x="19" y="27" width="10" height="9" rx="3" fill="#1e1b4b" />
    {/* Right eye */}
    <rect x="35" y="27" width="10" height="9" rx="3" fill="#1e1b4b" />
    {/* Mouth */}
    <rect x="22" y="41" width="20" height="4" rx="2" fill="#1e1b4b" />
  </svg>
);

// Full logo bar: icon + "Nubion" text (matches the uploaded dark banner)
export const NubionLogoBanner: React.FC<{
  iconSize?: number;
  fontSize?: number;
  color?: string;
}> = ({ iconSize = 48, fontSize = 48, color = "white" }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
    <NubionRobotIcon size={iconSize} />
    <span
      style={{
        fontSize,
        fontWeight: 700,
        color,
        letterSpacing: -1,
        fontFamily: "sans-serif",
      }}
    >
      Nubion
    </span>
  </div>
);
