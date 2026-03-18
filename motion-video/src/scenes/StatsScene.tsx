import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";

interface StatCardProps {
  emoji: string;
  value: string;
  label: string;
  sublabel: string;
  accentColor: string;
  delay: number;
}

// Animated number counter
const CountUp: React.FC<{ from: number; to: number; suffix: string; delay: number; fontSize: number; color: string }> = ({
  from,
  to,
  suffix,
  delay,
  fontSize,
  color,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = interpolate(frame - delay, [0, fps * 1.2], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const current = Math.round(interpolate(progress, [0, 1], [from, to]));

  return (
    <span style={{ fontSize, fontWeight: 900, color, letterSpacing: -2 }}>
      {current}{suffix}
    </span>
  );
};

const StatCard: React.FC<StatCardProps> = ({
  emoji,
  value,
  label,
  sublabel,
  accentColor,
  delay,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const s = spring({ frame: frame - delay, fps, config: { damping: 70, stiffness: 100 } });
  const y = interpolate(s, [0, 1], [60, 0]);
  const opacity = interpolate(s, [0, 1], [0, 1]);
  const scale = interpolate(s, [0, 0.7, 1], [0.85, 1.03, 1]);

  // Parse value for counter: "85%" -> from=0, to=85, suffix="%"
  // "3×" -> from=1, to=3, suffix="×"
  // "98%" -> from=0, to=98, suffix="%"
  // "24/7" -> static
  const isStatic = value === "24/7";
  let numFrom = 0;
  let numTo = 0;
  let suffix = "";
  if (!isStatic) {
    if (value.includes("×")) {
      numFrom = 1;
      numTo = parseInt(value);
      suffix = "×";
    } else if (value.includes("%")) {
      numFrom = 0;
      numTo = parseInt(value);
      suffix = "%";
    }
  }

  return (
    <div
      style={{
        transform: `translateY(${y}px) scale(${scale})`,
        opacity,
        background: "rgba(255,255,255,0.04)",
        border: `1px solid ${accentColor}33`,
        borderRadius: 24,
        padding: "36px 32px",
        width: 340,
        display: "flex",
        flexDirection: "column",
        gap: 16,
        position: "relative",
        overflow: "hidden",
        boxShadow: `0 0 60px ${accentColor}18`,
      }}
    >
      {/* Top accent line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
        }}
      />

      {/* Emoji icon */}
      <div
        style={{
          width: 60,
          height: 60,
          borderRadius: 16,
          background: `${accentColor}18`,
          border: `1.5px solid ${accentColor}44`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 28,
        }}
      >
        {emoji}
      </div>

      {/* Big number */}
      <div>
        {isStatic ? (
          <span style={{ fontSize: 64, fontWeight: 900, color: accentColor, letterSpacing: -2 }}>
            {value}
          </span>
        ) : (
          <CountUp
            from={numFrom}
            to={numTo}
            suffix={suffix}
            delay={delay}
            fontSize={64}
            color={accentColor}
          />
        )}
      </div>

      {/* Labels */}
      <div>
        <div style={{ fontSize: 20, fontWeight: 700, color: "white", marginBottom: 6 }}>
          {label}
        </div>
        <div style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", lineHeight: 1.4 }}>
          {sublabel}
        </div>
      </div>
    </div>
  );
};

export const StatsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 80, stiffness: 100 } });
  const titleY = interpolate(titleSpring, [0, 1], [-30, 0]);
  const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);

  const subOpacity = interpolate(frame, [15, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  const stats: StatCardProps[] = [
    {
      emoji: "⏱",
      value: "85%",
      label: "Menos tiempo de respuesta",
      sublabel: "Los clientes reciben respuesta instantánea, 24/7",
      accentColor: "#2de8b4",
      delay: 8,
    },
    {
      emoji: "💰",
      value: "3×",
      label: "Más conversiones",
      sublabel: "El agente convierte consultas en ventas automáticamente",
      accentColor: "#6366f1",
      delay: 20,
    },
    {
      emoji: "⭐",
      value: "98%",
      label: "Satisfacción del cliente",
      sublabel: "Respuestas precisas y consistentes en cada interacción",
      accentColor: "#f59e0b",
      delay: 32,
    },
    {
      emoji: "🤖",
      value: "24/7",
      label: "Sin intervención humana",
      sublabel: "Automatiza consultas, pedidos y soporte sin parar",
      accentColor: "#a78bfa",
      delay: 44,
    },
  ];

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(160deg, #0a0a1a 0%, #0f0c29 50%, #1a1040 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        gap: 52,
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

      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Title */}
      <div
        style={{
          transform: `translateY(${titleY}px)`,
          opacity: titleOpacity,
          textAlign: "center",
          zIndex: 1,
        }}
      >
        <div style={{ fontSize: 46, fontWeight: 800, color: "white", letterSpacing: -1.5, marginBottom: 8 }}>
          Resultados reales. Impacto inmediato.
        </div>
        <div style={{ opacity: subOpacity, fontSize: 21, color: "rgba(255,255,255,0.45)" }}>
          Negocios que usan Nubion reportan mejoras desde el primer día
        </div>
      </div>

      {/* Stats grid */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 24,
          zIndex: 1,
        }}
      >
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>
    </AbsoluteFill>
  );
};
