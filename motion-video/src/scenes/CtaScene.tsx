import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";

export const CtaScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Whole scene fade-in
  const sceneOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  // Logo mark bounces in
  const logoSpring = spring({ frame, fps, config: { damping: 60, stiffness: 140 } });
  const logoScale = interpolate(logoSpring, [0, 0.7, 1], [0, 1.1, 1]);

  // Heading slides up
  const headingSpring = spring({ frame: frame - 8, fps, config: { damping: 80, stiffness: 100 } });
  const headingY = interpolate(headingSpring, [0, 1], [50, 0]);
  const headingOpacity = interpolate(headingSpring, [0, 1], [0, 1]);

  // CTA button scales in
  const btnSpring = spring({ frame: frame - 18, fps, config: { damping: 70, stiffness: 120 } });
  const btnScale = interpolate(btnSpring, [0, 0.8, 1], [0.6, 1.05, 1]);
  const btnOpacity = interpolate(btnSpring, [0, 1], [0, 1]);

  // URL fades in last
  const urlOpacity = interpolate(frame, [35, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  // Pulsing glow on button
  const btnGlow = interpolate(
    frame % 30,
    [0, 15, 30],
    [0.6, 1.0, 0.6],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        opacity: sceneOpacity,
        gap: 36,
      }}
    >
      {/* Background grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(99,102,241,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.08) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Big ambient glow */}
      <div
        style={{
          position: "absolute",
          width: 900,
          height: 900,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 65%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Logo */}
      <div
        style={{
          transform: `scale(${logoScale})`,
          display: "flex",
          alignItems: "center",
          gap: 16,
          zIndex: 1,
        }}
      >
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 18,
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 30px rgba(99,102,241,0.6)",
          }}
        >
          <span style={{ fontSize: 42, fontWeight: 900, color: "white" }}>N</span>
        </div>
        <span style={{ fontSize: 64, fontWeight: 800, color: "white", letterSpacing: -2 }}>
          Nubion
        </span>
      </div>

      {/* Heading */}
      <div
        style={{
          transform: `translateY(${headingY}px)`,
          opacity: headingOpacity,
          textAlign: "center",
          zIndex: 1,
        }}
      >
        <div
          style={{ fontSize: 52, fontWeight: 800, color: "white", letterSpacing: -1.5, marginBottom: 10 }}
        >
          Ready to transform your customer service?
        </div>
        <div
          style={{ fontSize: 24, color: "rgba(255,255,255,0.5)", fontWeight: 400 }}
        >
          Join thousands of businesses already using AI
        </div>
      </div>

      {/* CTA Button */}
      <div
        style={{
          transform: `scale(${btnScale})`,
          opacity: btnOpacity,
          zIndex: 1,
        }}
      >
        <div
          style={{
            padding: "22px 60px",
            borderRadius: 16,
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            boxShadow: `0 0 ${40 * btnGlow}px rgba(99,102,241,0.7), 0 0 ${80 * btnGlow}px rgba(99,102,241,0.3)`,
            fontSize: 28,
            fontWeight: 700,
            color: "white",
            letterSpacing: -0.5,
          }}
        >
          Get started free →
        </div>
      </div>

      {/* URL */}
      <div style={{ opacity: urlOpacity, zIndex: 1 }}>
        <span
          style={{
            fontSize: 22,
            color: "#a5b4fc",
            letterSpacing: 2,
            fontWeight: 500,
          }}
        >
          nubionai.com
        </span>
      </div>
    </AbsoluteFill>
  );
};
