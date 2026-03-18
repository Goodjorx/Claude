import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";

// Animated chat message bubble
const ChatBubble: React.FC<{
  text: string;
  fromUser: boolean;
  delay: number;
  maxWidth?: number;
}> = ({ text, fromUser, delay, maxWidth = 280 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const s = spring({ frame: frame - delay, fps, config: { damping: 80, stiffness: 100 } });
  const y = interpolate(s, [0, 1], [20, 0]);
  const opacity = interpolate(s, [0, 1], [0, 1]);

  return (
    <div
      style={{
        transform: `translateY(${y}px)`,
        opacity,
        alignSelf: fromUser ? "flex-end" : "flex-start",
        maxWidth,
        background: fromUser ? "#2de8b4" : "rgba(255,255,255,0.08)",
        border: fromUser ? "none" : "1px solid rgba(255,255,255,0.12)",
        borderRadius: fromUser ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
        padding: "12px 18px",
        fontSize: 15,
        color: fromUser ? "#0a0a1a" : "rgba(255,255,255,0.85)",
        fontWeight: fromUser ? 600 : 400,
        lineHeight: 1.4,
      }}
    >
      {text}
    </div>
  );
};

// Animated stat badge that flies in
const StatBadge: React.FC<{
  icon: string;
  label: string;
  delay: number;
  fromY: number;
}> = ({ icon, label, delay, fromY }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const s = spring({ frame: frame - delay, fps, config: { damping: 75, stiffness: 110 } });
  const y = interpolate(s, [0, 1], [fromY, 0]);
  const opacity = interpolate(s, [0, 1], [0, 1]);

  return (
    <div
      style={{
        transform: `translateY(${y}px)`,
        opacity,
        display: "flex",
        alignItems: "center",
        gap: 10,
        background: "rgba(255,255,255,0.07)",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: 12,
        padding: "10px 18px",
        fontSize: 15,
        color: "white",
        fontWeight: 500,
        whiteSpace: "nowrap",
      }}
    >
      <span style={{ fontSize: 18 }}>{icon}</span>
      {label}
    </div>
  );
};

export const LandingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Left side text animations
  const headLine1Spring = spring({ frame, fps, config: { damping: 80, stiffness: 90 } });
  const h1X = interpolate(headLine1Spring, [0, 1], [-100, 0]);
  const h1Opacity = interpolate(headLine1Spring, [0, 1], [0, 1]);

  const headLine2Spring = spring({ frame: frame - 10, fps, config: { damping: 80, stiffness: 90 } });
  const h2X = interpolate(headLine2Spring, [0, 1], [-100, 0]);
  const h2Opacity = interpolate(headLine2Spring, [0, 1], [0, 1]);

  const headLine3Spring = spring({ frame: frame - 20, fps, config: { damping: 80, stiffness: 90 } });
  const h3X = interpolate(headLine3Spring, [0, 1], [-100, 0]);
  const h3Opacity = interpolate(headLine3Spring, [0, 1], [0, 1]);

  const subOpacity = interpolate(frame, [35, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  const btnSpring = spring({ frame: frame - 45, fps, config: { damping: 70, stiffness: 120 } });
  const btnScale = interpolate(btnSpring, [0, 0.8, 1], [0.6, 1.05, 1]);
  const btnOpacity = interpolate(btnSpring, [0, 1], [0, 1]);

  // Right side: chat widget
  const widgetSpring = spring({ frame: frame - 15, fps, config: { damping: 80, stiffness: 80 } });
  const widgetX = interpolate(widgetSpring, [0, 1], [120, 0]);
  const widgetOpacity = interpolate(widgetSpring, [0, 1], [0, 1]);

  // Pulsing CTA button glow
  const btnGlow = interpolate(frame % 40, [0, 20, 40], [0.7, 1.0, 0.7], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Decorative orbs
  const orb1Scale = interpolate(frame % 80, [0, 40, 80], [1, 1.08, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #13111e 0%, #1c1640 50%, #110e2a 100%)",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        overflow: "hidden",
        padding: "0 80px",
      }}
    >
      {/* Background grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(99,102,241,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.06) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Decorative orbs */}
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)",
          top: "10%",
          right: "5%",
          transform: `scale(${orb1Scale})`,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(45,232,180,0.12) 0%, transparent 70%)",
          bottom: "5%",
          left: "30%",
        }}
      />

      {/* LEFT: Headline */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 4,
          zIndex: 1,
          paddingRight: 40,
        }}
      >
        {/* Line 1: "Create your" */}
        <div style={{ transform: `translateX(${h1X}px)`, opacity: h1Opacity }}>
          <span style={{ fontSize: 78, fontWeight: 900, color: "white", letterSpacing: -3, lineHeight: 1.05 }}>
            Create your
          </span>
        </div>

        {/* Line 2: "AI Agent" — green accent */}
        <div style={{ transform: `translateX(${h2X}px)`, opacity: h2Opacity }}>
          <span
            style={{
              fontSize: 78,
              fontWeight: 900,
              letterSpacing: -3,
              lineHeight: 1.05,
              background: "linear-gradient(90deg, #2de8b4, #5eead4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            AI Agent
          </span>
          <span style={{ fontSize: 78, fontWeight: 900, color: "white", letterSpacing: -3, lineHeight: 1.05 }}>
            {" "}always
          </span>
        </div>

        {/* Line 3: "in less than 30 seconds" */}
        <div style={{ transform: `translateX(${h3X}px)`, opacity: h3Opacity, marginTop: 4 }}>
          <span style={{ fontSize: 60, fontWeight: 800, color: "rgba(255,255,255,0.75)", letterSpacing: -2, lineHeight: 1.1 }}>
            in less than{" "}
          </span>
          <span
            style={{
              fontSize: 60,
              fontWeight: 900,
              letterSpacing: -2,
              lineHeight: 1.1,
              background: "linear-gradient(90deg, #2de8b4, #a78bfa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            30 seconds
          </span>
        </div>

        {/* Subtitle */}
        <div style={{ opacity: subOpacity, marginTop: 20 }}>
          <p style={{ fontSize: 22, color: "rgba(255,255,255,0.5)", margin: 0, fontWeight: 400, lineHeight: 1.5 }}>
            No code required · For Web, WhatsApp and Telegram
          </p>
        </div>

        {/* CTA Button */}
        <div
          style={{
            marginTop: 32,
            transform: `scale(${btnScale})`,
            opacity: btnOpacity,
            display: "inline-block",
            alignSelf: "flex-start",
          }}
        >
          <div
            style={{
              padding: "18px 40px",
              borderRadius: 12,
              background: "#2de8b4",
              boxShadow: `0 0 ${30 * btnGlow}px rgba(45,232,180,0.6), 0 0 ${60 * btnGlow}px rgba(45,232,180,0.25)`,
              fontSize: 22,
              fontWeight: 700,
              color: "#0a0a1a",
              letterSpacing: -0.3,
            }}
          >
            Create your AI Agent in 30s →
          </div>
        </div>
      </div>

      {/* RIGHT: Chat widget mockup */}
      <div
        style={{
          width: 520,
          transform: `translateX(${widgetX}px)`,
          opacity: widgetOpacity,
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        {/* Stat badges row */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <StatBadge icon="💬" label="Mensajes respondidos" delay={25} fromY={-20} />
          <StatBadge icon="📦" label="Pedidos gestionados" delay={32} fromY={-20} />
          <StatBadge icon="👥" label="Nuevos clientes" delay={39} fromY={-20} />
        </div>

        {/* Chat window */}
        <div
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 20,
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 60px rgba(45,232,180,0.08)",
          }}
        >
          {/* Chat header */}
          <div
            style={{
              background: "#2de8b4",
              padding: "14px 20px",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "#0a0a1a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
              }}
            >
              🤖
            </div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#0a0a1a" }}>Asistente IA</div>
              <div style={{ fontSize: 12, color: "rgba(0,0,0,0.6)" }}>● En línea</div>
            </div>
          </div>

          {/* Chat messages */}
          <div
            style={{
              padding: "20px 16px",
              display: "flex",
              flexDirection: "column",
              gap: 12,
              minHeight: 180,
            }}
          >
            <ChatBubble
              text="¿Cuáles son sus horarios de atención?"
              fromUser
              delay={40}
            />
            <ChatBubble
              text="¡Hola! Nuestros horarios son de lunes a viernes de 9:00 a 18:00 Hs."
              fromUser={false}
              delay={60}
              maxWidth={300}
            />
          </div>

          {/* Input bar */}
          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.08)",
              padding: "12px 16px",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <div
              style={{
                flex: 1,
                background: "rgba(255,255,255,0.06)",
                borderRadius: 8,
                padding: "10px 14px",
                fontSize: 14,
                color: "rgba(255,255,255,0.3)",
              }}
            >
              Escribe tu mensaje...
            </div>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: "#2de8b4",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
                color: "#0a0a1a",
              }}
            >
              →
            </div>
          </div>
        </div>

        {/* Bottom stat icons */}
        <div style={{ display: "flex", justifyContent: "center", gap: 24 }}>
          {[
            { icon: "📊", label: "Consultas\npor canal" },
            { icon: "📈", label: "Embudo\nDe Chats" },
            { icon: "✅", label: "Pedidos\nConfirmados" },
          ].map(({ icon, label }, i) => {
            const s = spring({ frame: frame - (70 + i * 8), fps, config: { damping: 80, stiffness: 100 } });
            const y = interpolate(s, [0, 1], [20, 0]);
            const op = interpolate(s, [0, 1], [0, 1]);
            return (
              <div
                key={label}
                style={{
                  transform: `translateY(${y}px)`,
                  opacity: op,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 16,
                    background: "rgba(45,232,180,0.1)",
                    border: "1px solid rgba(45,232,180,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 24,
                  }}
                >
                  {icon}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "rgba(255,255,255,0.5)",
                    textAlign: "center",
                    lineHeight: 1.3,
                    whiteSpace: "pre-line",
                  }}
                >
                  {label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
