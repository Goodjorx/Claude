import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";

interface PlatformBadgeProps {
  label: string;
  emoji: string;
  color: string;
  delay: number;
  fromX: number;
}

const PlatformBadge: React.FC<PlatformBadgeProps> = ({
  label,
  emoji,
  color,
  delay,
  fromX,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const s = spring({ frame: frame - delay, fps, config: { damping: 75, stiffness: 110 } });
  const x = interpolate(s, [0, 1], [fromX, 0]);
  const opacity = interpolate(s, [0, 1], [0, 1]);
  const scale = interpolate(s, [0, 0.8, 1], [0.7, 1.06, 1]);

  return (
    <div
      style={{
        transform: `translateX(${x}px) scale(${scale})`,
        opacity,
        display: "flex",
        alignItems: "center",
        gap: 16,
        background: "rgba(255,255,255,0.05)",
        border: `1.5px solid ${color}44`,
        borderRadius: 20,
        padding: "24px 40px",
        boxShadow: `0 0 40px ${color}33`,
        minWidth: 260,
      }}
    >
      <span style={{ fontSize: 44 }}>{emoji}</span>
      <div>
        <div style={{ fontSize: 28, fontWeight: 700, color: "white" }}>{label}</div>
        <div style={{ fontSize: 16, color: "rgba(255,255,255,0.45)", marginTop: 2 }}>
          Despliega aquí
        </div>
      </div>
    </div>
  );
};

export const DeployScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 80, stiffness: 100 } });
  const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);
  const titleY = interpolate(titleSpring, [0, 1], [40, 0]);

  const subOpacity = interpolate(
    frame,
    [20, 45],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.quad) }
  );

  const platforms: PlatformBadgeProps[] = [
    { label: "Sitio Web", emoji: "🌐", color: "#6366f1", delay: 15, fromX: -120 },
    { label: "WhatsApp", emoji: "💬", color: "#22c55e", delay: 25, fromX: 0 },
    { label: "Telegram", emoji: "✈️", color: "#3b82f6", delay: 35, fromX: 120 },
  ];

  // Animated connector line
  const lineProgress = interpolate(frame, [10, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0a0a1a 0%, #0d1b2a 60%, #0f2027 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        gap: 64,
      }}
    >
      {/* Background grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(59,130,246,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.05) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)",
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
        <div
          style={{ fontSize: 52, fontWeight: 800, color: "white", letterSpacing: -1.5, marginBottom: 12 }}
        >
          Despliega donde están tus clientes
        </div>
        <div style={{ opacity: subOpacity, fontSize: 24, color: "rgba(255,255,255,0.45)" }}>
          Un agente · Múltiples plataformas · Configuración inmediata
        </div>
      </div>

      {/* Platforms */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 32,
          alignItems: "center",
          zIndex: 1,
          position: "relative",
        }}
      >
        {/* Connecting line behind badges */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            height: 2,
            width: `${lineProgress * 100}%`,
            background: "linear-gradient(90deg, #6366f1, #22c55e, #3b82f6)",
            transform: "translateY(-50%)",
            borderRadius: 2,
            opacity: 0.4,
          }}
        />
        {platforms.map((p) => (
          <PlatformBadge key={p.label} {...p} />
        ))}
      </div>
    </AbsoluteFill>
  );
};
