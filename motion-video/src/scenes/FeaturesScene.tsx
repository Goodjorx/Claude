import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  accentColor: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  accentColor,
  delay,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardSpring = spring({
    frame: frame - delay,
    fps,
    config: { damping: 80, stiffness: 100 },
  });

  const translateY = interpolate(cardSpring, [0, 1], [80, 0]);
  const opacity = interpolate(cardSpring, [0, 1], [0, 1]);

  return (
    <div
      style={{
        transform: `translateY(${translateY}px)`,
        opacity,
        background: "rgba(255,255,255,0.04)",
        border: `1px solid rgba(255,255,255,0.08)`,
        borderRadius: 24,
        padding: "48px 40px",
        width: 480,
        backdropFilter: "blur(12px)",
        boxShadow: `0 0 60px ${accentColor}22`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Accent gradient top border */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
          borderRadius: "24px 24px 0 0",
        }}
      />

      {/* Icon circle */}
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: 20,
          background: `${accentColor}22`,
          border: `1.5px solid ${accentColor}55`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 28,
          fontSize: 36,
        }}
      >
        {icon}
      </div>

      <div
        style={{
          fontSize: 30,
          fontWeight: 700,
          color: "white",
          marginBottom: 14,
          letterSpacing: -0.5,
        }}
      >
        {title}
      </div>

      <div
        style={{
          fontSize: 20,
          color: "rgba(255,255,255,0.55)",
          lineHeight: 1.6,
          fontWeight: 400,
        }}
      >
        {description}
      </div>
    </div>
  );
};

export const FeaturesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 80, stiffness: 100 } });
  const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);
  const titleY = interpolate(titleSpring, [0, 1], [-30, 0]);

  const features: FeatureCardProps[] = [
    {
      icon: "🧠",
      title: "Train on Your Data",
      description:
        "Upload PDFs, link URLs, or paste your knowledge base. Nubion learns your business instantly.",
      accentColor: "#6366f1",
      delay: 10,
    },
    {
      icon: "⚡",
      title: "No Code Required",
      description:
        "Anyone can build a powerful AI chatbot. Zero programming knowledge. Ready in minutes.",
      accentColor: "#8b5cf6",
      delay: 20,
    },
    {
      icon: "🔄",
      title: "24/7 Automation",
      description:
        "Handle FAQs, capture leads, and delight customers — automatically, around the clock.",
      accentColor: "#a78bfa",
      delay: 30,
    },
  ];

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(160deg, #0a0a1a 0%, #1a1040 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        gap: 60,
      }}
    >
      {/* Background grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(99,102,241,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.05) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Section title */}
      <div
        style={{
          transform: `translateY(${titleY}px)`,
          opacity: titleOpacity,
          textAlign: "center",
          zIndex: 1,
        }}
      >
        <span
          style={{
            fontSize: 48,
            fontWeight: 800,
            color: "white",
            letterSpacing: -1.5,
          }}
        >
          Everything your business needs
        </span>
      </div>

      {/* Feature cards row */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 32,
          zIndex: 1,
        }}
      >
        {features.map((f) => (
          <FeatureCard key={f.title} {...f} />
        ))}
      </div>
    </AbsoluteFill>
  );
};
