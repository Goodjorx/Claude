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

// Simulates a sidebar nav item
const NavItem: React.FC<{ label: string; icon: string; active?: boolean }> = ({
  label,
  icon,
  active,
}) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "12px 16px",
      borderRadius: 8,
      background: active ? "rgba(45,232,180,0.15)" : "transparent",
      border: active ? "1px solid rgba(45,232,180,0.3)" : "1px solid transparent",
      color: active ? "#2de8b4" : "rgba(255,255,255,0.55)",
      fontSize: 15,
      fontWeight: active ? 600 : 400,
      cursor: "pointer",
    }}
  >
    <span style={{ fontSize: 18 }}>{icon}</span>
    {label}
  </div>
);

// Agent card
const AgentCard: React.FC<{
  name: string;
  tag: string;
  updated: string;
  delay: number;
}> = ({ name, tag, updated, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const s = spring({ frame: frame - delay, fps, config: { damping: 80, stiffness: 100 } });
  const y = interpolate(s, [0, 1], [40, 0]);
  const opacity = interpolate(s, [0, 1], [0, 1]);

  return (
    <div
      style={{
        transform: `translateY(${y}px)`,
        opacity,
        background: "white",
        borderRadius: 16,
        padding: "28px 24px",
        border: "1px solid rgba(0,0,0,0.08)",
        width: 220,
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      {/* Agent icon */}
      <div style={{ width: 52, height: 52, background: "#1e1b4b", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <NubionRobotIcon size={32} />
      </div>
      <div>
        <div style={{ fontSize: 18, fontWeight: 700, color: "#1e1b4b" }}>{name}</div>
        <div style={{ fontSize: 13, color: "#888", marginTop: 4 }}>{updated}</div>
      </div>
      <div
        style={{
          background: "#f1f0f5",
          borderRadius: 8,
          padding: "6px 12px",
          fontSize: 13,
          color: "#666",
          fontWeight: 500,
          alignSelf: "flex-start",
        }}
      >
        {tag}
      </div>
    </div>
  );
};

// Stat card for the sidebar
const StatCard: React.FC<{ label: string; value: string; sub: string }> = ({
  label,
  value,
  sub,
}) => (
  <div
    style={{
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 12,
      padding: "12px 14px",
    }}
  >
    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>
      {label}
    </div>
    <div style={{ fontSize: 18, fontWeight: 700, color: "white" }}>{value}</div>
    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{sub}</div>
  </div>
);

export const DashboardScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Whole panel slides up
  const panelSpring = spring({ frame, fps, config: { damping: 80, stiffness: 80 } });
  const panelY = interpolate(panelSpring, [0, 1], [60, 0]);
  const panelOpacity = interpolate(panelSpring, [0, 1], [0, 1]);

  // "Your AI Agents" section header
  const sectionSpring = spring({ frame: frame - 20, fps, config: { damping: 80, stiffness: 100 } });
  const sectionOpacity = interpolate(sectionSpring, [0, 1], [0, 1]);
  const sectionY = interpolate(sectionSpring, [0, 1], [20, 0]);

  // Background label fade
  const bgLabelOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0a0a1a 0%, #13111e 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        gap: 24,
      }}
    >
      {/* Background grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(45,232,180,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(45,232,180,0.04) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Section label */}
      <div style={{ opacity: bgLabelOpacity, textAlign: "center", zIndex: 1 }}>
        <span
          style={{
            fontSize: 16,
            fontWeight: 600,
            color: "#2de8b4",
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          Tu Panel
        </span>
      </div>

      {/* Main dashboard panel */}
      <div
        style={{
          transform: `translateY(${panelY}px)`,
          opacity: panelOpacity,
          display: "flex",
          borderRadius: 20,
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 40px 100px rgba(0,0,0,0.6), 0 0 60px rgba(45,232,180,0.06)",
          width: 1400,
          height: 620,
          zIndex: 1,
        }}
      >
        {/* Left sidebar */}
        <div
          style={{
            width: 240,
            background: "#13111e",
            borderRight: "1px solid rgba(255,255,255,0.06)",
            padding: "24px 16px",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          {/* Brand */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 8px 20px 8px" }}>
            <NubionRobotIcon size={28} />
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "white" }}>Nubion</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>Crea tus propios Agentes</div>
            </div>
          </div>

          <NavItem label="Inicio" icon="🏠" active />
          <NavItem label="Entrenamiento" icon="🤖" />
          <NavItem label="Integraciones" icon="🔗" />
          <NavItem label="Conecta" icon="🔌" />
          <NavItem label="Configuración" icon="⚙️" />

          {/* Spacer */}
          <div style={{ flex: 1 }} />

          {/* Stats */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <StatCard label="Chat" value="999.9M" sub="Palabras restantes" />
            <StatCard label="Agentes IA" value="997" sub="Restantes" />
          </div>

          {/* Upgrade button */}
          <div
            style={{
              marginTop: 12,
              padding: "12px",
              borderRadius: 10,
              background: "#2de8b4",
              textAlign: "center",
              fontSize: 14,
              fontWeight: 700,
              color: "#0a0a1a",
            }}
          >
            ⚡ Upgrade
          </div>
        </div>

        {/* Main content */}
        <div style={{ flex: 1, background: "#f8f9fb", padding: "32px", display: "flex", flexDirection: "column", gap: 28 }}>
          {/* Top bar */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 28, fontWeight: 800, color: "#1e1b4b" }}>Panel Principal</span>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#e2e0ed", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>
              👤
            </div>
          </div>

          {/* Create agent banner */}
          <div
            style={{
              background: "white",
              borderRadius: 16,
              padding: "24px 28px",
              border: "1px solid rgba(0,0,0,0.06)",
              boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
            }}
          >
            <div style={{ fontSize: 20, fontWeight: 700, color: "#1e1b4b", marginBottom: 8 }}>
              Crear un Nuevo Agente IA
            </div>
            <div style={{ fontSize: 15, color: "#666", marginBottom: 16 }}>
              Consulta nuestra documentación detallada para aprender a formatear tus datos y crear el Agente IA perfecto.
            </div>
            <div
              style={{
                display: "inline-block",
                padding: "10px 24px",
                borderRadius: 8,
                background: "#2de8b4",
                fontSize: 15,
                fontWeight: 700,
                color: "#0a0a1a",
              }}
            >
              Crear Agente IA
            </div>
          </div>

          {/* Your AI Agents */}
          <div
            style={{
              transform: `translateY(${sectionY}px)`,
              opacity: sectionOpacity,
            }}
          >
            <div style={{ fontSize: 20, fontWeight: 700, color: "#1e1b4b", marginBottom: 20 }}>
              Tus Agentes IA
            </div>
            <div style={{ display: "flex", gap: 20 }}>
              <AgentCard
                name="Clinica CenteIA"
                tag="General Agente IA"
                updated="Actualizado hace 34 días"
                delay={35}
              />
              <AgentCard
                name="Nikebot"
                tag="General Agente IA"
                updated="Actualizado hoy"
                delay={48}
              />
              {/* "Add new" placeholder */}
              {(() => {
                const s = spring({ frame: frame - 60, fps, config: { damping: 80, stiffness: 100 } });
                const y = interpolate(s, [0, 1], [40, 0]);
                const op = interpolate(s, [0, 1], [0, 1]);
                return (
                  <div
                    style={{
                      transform: `translateY(${y}px)`,
                      opacity: op,
                      width: 220,
                      borderRadius: 16,
                      border: "2px dashed rgba(45,232,180,0.4)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 10,
                      padding: "28px 24px",
                      background: "rgba(45,232,180,0.04)",
                    }}
                  >
                    <div style={{ fontSize: 32, color: "#2de8b4" }}>+</div>
                    <div style={{ fontSize: 14, color: "#2de8b4", fontWeight: 600, textAlign: "center" }}>
                      Crear Nuevo Agente
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
