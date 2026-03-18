import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { NubionRobotIcon } from "../NubionLogo";

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
      fontSize: 14,
      fontWeight: active ? 600 : 400,
    }}
  >
    <span style={{ fontSize: 16 }}>{icon}</span>
    {label}
  </div>
);

const FormField: React.FC<{
  label: string;
  hint: string;
  value: string;
  delay: number;
  multiline?: boolean;
}> = ({ label, hint, value, delay, multiline }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const s = spring({ frame: frame - delay, fps, config: { damping: 80, stiffness: 90 } });
  const y = interpolate(s, [0, 1], [20, 0]);
  const opacity = interpolate(s, [0, 1], [0, 1]);

  return (
    <div style={{ transform: `translateY(${y}px)`, opacity, marginBottom: 20 }}>
      <div style={{ fontSize: 15, fontWeight: 700, color: "#1e1b4b", marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 13, color: "#888", marginBottom: 8 }}>{hint}</div>
      <div
        style={{
          border: "1px solid #e0e0e8",
          borderRadius: 8,
          padding: multiline ? "14px 16px" : "12px 16px",
          fontSize: 15,
          color: value ? "#1e1b4b" : "#bbb",
          background: "white",
          minHeight: multiline ? 80 : "auto",
          lineHeight: 1.5,
        }}
      >
        {value || "Eres un asistente útil y servicial..."}
      </div>
    </div>
  );
};

export const ConfigScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const panelSpring = spring({ frame, fps, config: { damping: 80, stiffness: 80 } });
  const panelY = interpolate(panelSpring, [0, 1], [50, 0]);
  const panelOpacity = interpolate(panelSpring, [0, 1], [0, 1]);

  // Pulsing glow on the "Probar Agente IA" button
  const btnGlow = interpolate(frame % 40, [0, 20, 40], [0.6, 1.0, 0.6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const btnSpring = spring({ frame: frame - 25, fps, config: { damping: 70, stiffness: 120 } });
  const btnScale = interpolate(btnSpring, [0, 0.8, 1], [0.7, 1.05, 1]);
  const btnOpacity = interpolate(btnSpring, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0a0a1a 0%, #13111e 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
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

      {/* Main panel */}
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
          height: 660,
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
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 8px 20px 8px" }}>
            <NubionRobotIcon size={28} />
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "white" }}>Nubion</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>Crea tus propios Agentes</div>
            </div>
          </div>

          <NavItem label="Entrenamiento" icon="📡" />
          <NavItem label="Fuentes" icon="📄" />
          <NavItem label="Integraciones" icon="🔗" />
          <NavItem label="Conecta" icon="🔌" />
          <NavItem label="Configuración" icon="⚙️" active />
          <NavItem label="Bandeja de entrada" icon="💬" />
        </div>

        {/* Main content */}
        <div style={{ flex: 1, background: "#f8f9fb", padding: "32px 40px", overflowY: "hidden", position: "relative" }}>
          {/* Top bar */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
            <span style={{ fontSize: 26, fontWeight: 800, color: "#1e1b4b" }}>Configuración</span>
            <div
              style={{
                transform: `scale(${btnScale})`,
                opacity: btnOpacity,
              }}
            >
              <div
                style={{
                  padding: "12px 24px",
                  borderRadius: 10,
                  background: "#2de8b4",
                  boxShadow: `0 0 ${20 * btnGlow}px rgba(45,232,180,0.7), 0 0 ${40 * btnGlow}px rgba(45,232,180,0.3)`,
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#0a0a1a",
                  letterSpacing: -0.2,
                }}
              >
                ▶ Probar Agente IA
              </div>
            </div>
          </div>

          {/* Subtitle */}
          <div style={{ fontSize: 16, color: "#555", marginBottom: 24 }}>
            Configura tu Agente IA según tus necesidades
          </div>

          {/* Form fields */}
          <FormField
            label="Nombre del Agente IA"
            hint="Dale un nombre amigable a tu Agente IA. Solo para referencia interna."
            value="Clinica CenteIA"
            delay={15}
          />
          <FormField
            label="Descripción del Agente IA"
            hint="Descripción del Agente IA para referencias internas."
            value="Ayudo a los pacientes de Clinica CenteIA"
            delay={25}
          />
          <FormField
            label="Idioma del Agente IA"
            hint="Selecciona el idioma principal para las respuestas de tu Agente IA."
            value="Detección Automática"
            delay={35}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
