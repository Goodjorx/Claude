import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";
import { NubionRobotIcon } from "../NubionLogo";

// Animated particle dot
const Particle: React.FC<{
  x: number;
  y: number;
  delay: number;
  size: number;
  opacity: number;
}> = ({ x, y, delay, size, opacity }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 80, stiffness: 40, mass: 1 },
  });
  const alpha = interpolate(progress, [0, 1], [0, opacity], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        borderRadius: "50%",
        background: "rgba(99,102,241,0.8)",
        opacity: alpha,
        boxShadow: `0 0 ${size * 3}px rgba(99,102,241,0.5)`,
      }}
    />
  );
};

export const HeroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Brand name scale + fade
  const logoSpring = spring({ frame, fps, config: { damping: 70, stiffness: 120 } });
  const logoScale = interpolate(logoSpring, [0, 1], [0.6, 1]);
  const logoOpacity = interpolate(logoSpring, [0, 1], [0, 1]);

  // "AI Chatbot Platform" subtitle slides up
  const subtitleProgress = spring({
    frame: frame - 18,
    fps,
    config: { damping: 80, stiffness: 100 },
  });
  const subtitleY = interpolate(subtitleProgress, [0, 1], [40, 0]);
  const subtitleOpacity = interpolate(subtitleProgress, [0, 1], [0, 1]);

  // Tagline fades in last
  const taglineOpacity = interpolate(
    frame,
    [40, 65],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.quad) }
  );

  // Glowing ring pulse
  const ringScale = interpolate(
    frame % 90,
    [0, 45, 90],
    [0.9, 1.05, 0.9],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const particles = [
    { x: 10, y: 20, delay: 5, size: 6, opacity: 0.7 },
    { x: 85, y: 15, delay: 10, size: 4, opacity: 0.5 },
    { x: 92, y: 70, delay: 15, size: 8, opacity: 0.6 },
    { x: 5, y: 75, delay: 8, size: 5, opacity: 0.4 },
    { x: 50, y: 5, delay: 12, size: 4, opacity: 0.5 },
    { x: 20, y: 90, delay: 20, size: 6, opacity: 0.6 },
    { x: 75, y: 88, delay: 7, size: 5, opacity: 0.45 },
  ];

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0a0a1a 0%, #0f0c29 50%, #302b63 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Grid lines background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(99,102,241,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.07) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${ringScale})`,
        }}
      />

      {/* Particles */}
      {particles.map((p, i) => (
        <Particle key={i} {...p} />
      ))}

      {/* Logo / Brand name */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 24,
          transform: `scale(${logoScale})`,
          opacity: logoOpacity,
          marginBottom: 24,
        }}
      >
        {/* Nubion robot icon on dark pill — matches uploaded logo */}
        <div
          style={{
            padding: "16px 20px",
            borderRadius: 24,
            background: "#1e1b4b",
            display: "flex",
            alignItems: "center",
            gap: 16,
            boxShadow: "0 0 40px rgba(45,232,180,0.2), 0 0 80px rgba(99,102,241,0.2)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <NubionRobotIcon size={72} />
          <span
            style={{
              fontSize: 80,
              fontWeight: 700,
              color: "white",
              letterSpacing: -2,
            }}
          >
            Nubion
          </span>
        </div>
      </div>

      {/* Subtitle */}
      <div
        style={{
          transform: `translateY(${subtitleY}px)`,
          opacity: subtitleOpacity,
          marginBottom: 20,
        }}
      >
        <span
          style={{
            fontSize: 30,
            fontWeight: 500,
            color: "#a5b4fc",
            letterSpacing: 6,
            textTransform: "uppercase",
          }}
        >
          Plataforma de Agentes IA
        </span>
      </div>

      {/* Tagline */}
      <div style={{ opacity: taglineOpacity }}>
        <span
          style={{
            fontSize: 20,
            color: "rgba(255,255,255,0.45)",
            fontWeight: 400,
            letterSpacing: 1,
          }}
        >
          IA accesible para cada negocio
        </span>
      </div>
    </AbsoluteFill>
  );
};
