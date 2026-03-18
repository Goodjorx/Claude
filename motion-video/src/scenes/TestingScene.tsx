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

// Animated chat message bubble
const ChatBubble: React.FC<{
  text: string;
  fromUser: boolean;
  delay: number;
}> = ({ text, fromUser, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const s = spring({ frame: frame - delay, fps, config: { damping: 75, stiffness: 90 } });
  const y = interpolate(s, [0, 1], [24, 0]);
  const opacity = interpolate(s, [0, 1], [0, 1]);
  const scale = interpolate(s, [0, 0.7, 1], [0.92, 1.02, 1]);

  return (
    <div
      style={{
        transform: `translateY(${y}px) scale(${scale})`,
        opacity,
        alignSelf: fromUser ? "flex-end" : "flex-start",
        maxWidth: "75%",
        background: fromUser ? "#5c7be0" : "rgba(255,255,255,0.95)",
        borderRadius: fromUser ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
        padding: "14px 18px",
        fontSize: 16,
        color: fromUser ? "white" : "#1e1b4b",
        fontWeight: fromUser ? 500 : 400,
        lineHeight: 1.5,
        boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
      }}
    >
      {text}
    </div>
  );
};

// Typing indicator (three dots)
const TypingIndicator: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const s = spring({ frame: frame - delay, fps, config: { damping: 80, stiffness: 100 } });
  const opacity = interpolate(s, [0, 1], [0, 1]);
  const y = interpolate(s, [0, 1], [12, 0]);

  const dot1 = interpolate((frame - delay) % 30, [0, 10, 20, 30], [0.3, 1, 0.3, 0.3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const dot2 = interpolate((frame - delay) % 30, [5, 15, 25, 30], [0.3, 1, 0.3, 0.3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const dot3 = interpolate((frame - delay) % 30, [10, 20, 30, 35], [0.3, 1, 0.3, 0.3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        transform: `translateY(${y}px)`,
        opacity,
        alignSelf: "flex-start",
        background: "rgba(255,255,255,0.95)",
        borderRadius: "18px 18px 18px 4px",
        padding: "14px 20px",
        display: "flex",
        gap: 6,
        alignItems: "center",
        boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
      }}
    >
      {[dot1, dot2, dot3].map((d, i) => (
        <div
          key={i}
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#6366f1",
            opacity: d,
          }}
        />
      ))}
    </div>
  );
};

export const TestingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Blurred background fades in
  const bgOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  // Modal slides up and fades in
  const modalSpring = spring({ frame: frame - 5, fps, config: { damping: 75, stiffness: 90 } });
  const modalY = interpolate(modalSpring, [0, 1], [80, 0]);
  const modalOpacity = interpolate(modalSpring, [0, 1], [0, 1]);
  const modalScale = interpolate(modalSpring, [0, 0.7, 1], [0.93, 1.02, 1]);

  // Label "Probando el agente en tiempo real" fades in
  const labelOpacity = interpolate(frame, [8, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  // Show typing indicator between message 2 and message 3
  const showTyping = frame > 85 && frame < 130;
  const showBotReply = frame > 128;

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
            "linear-gradient(rgba(99,102,241,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.05) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Ambient glow behind modal */}
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          opacity: bgOpacity,
        }}
      />

      {/* Top label */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: "50%",
          transform: "translateX(-50%)",
          opacity: labelOpacity,
          zIndex: 2,
        }}
      >
        <span
          style={{
            fontSize: 18,
            fontWeight: 600,
            color: "#2de8b4",
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          ▶ Probando el agente en tiempo real
        </span>
      </div>

      {/* Chat modal */}
      <div
        style={{
          transform: `translateY(${modalY}px) scale(${modalScale})`,
          opacity: modalOpacity,
          width: 520,
          borderRadius: 24,
          overflow: "hidden",
          boxShadow: "0 40px 100px rgba(0,0,0,0.7), 0 0 60px rgba(99,102,241,0.25)",
          zIndex: 1,
          background: "#f0f2f8",
        }}
      >
        {/* Modal header bar */}
        <div
          style={{
            background: "#4a6fe8",
            padding: "24px 28px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
          }}
        >
          {/* Bot avatar */}
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: "#1e1b4b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 0 4px rgba(255,255,255,0.15)",
            }}
          >
            <NubionRobotIcon size={40} />
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: "white" }}>Clinica CenteIA</div>
            <div style={{ fontSize: 14, color: "rgba(255,255,255,0.75)", marginTop: 4 }}>
              Soy tu asistente personal para cualquier duda
            </div>
          </div>
        </div>

        {/* Chat messages area */}
        <div
          style={{
            padding: "24px 20px",
            display: "flex",
            flexDirection: "column",
            gap: 14,
            minHeight: 280,
            background: "#f0f2f8",
          }}
        >
          {/* Bot greeting */}
          <ChatBubble
            text="¡Hola! ¿En qué puedo ayudarte?"
            fromUser={false}
            delay={20}
          />

          {/* User question */}
          <ChatBubble
            text="¿Qué servicios ofrecéis?"
            fromUser
            delay={60}
          />

          {/* Typing indicator */}
          {showTyping && <TypingIndicator delay={85} />}

          {/* Bot full response */}
          {showBotReply && (
            <ChatBubble
              text="Ofrecemos servicios de información sanitaria general y orientación para nuestros pacientes. ¿En qué más te puedo ayudar?"
              fromUser={false}
              delay={128}
            />
          )}
        </div>

        {/* Input bar */}
        <div
          style={{
            borderTop: "1px solid rgba(0,0,0,0.08)",
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
            gap: 12,
            background: "white",
          }}
        >
          <div
            style={{
              flex: 1,
              background: "#f4f5f9",
              border: "1.5px solid #6366f1",
              borderRadius: 12,
              padding: "12px 16px",
              fontSize: 15,
              color: "#aaa",
            }}
          >
            Consúltame tus dudas..
          </div>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: "#4a6fe8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              color: "white",
              flexShrink: 0,
            }}
          >
            →
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
