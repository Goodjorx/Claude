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
import { MouseCursor } from "../components/MouseCursor";

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

// Typing indicator
const TypingIndicator: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const s = spring({ frame: frame - delay, fps, config: { damping: 80, stiffness: 100 } });
  const opacity = interpolate(s, [0, 1], [0, 1]);
  const y = interpolate(s, [0, 1], [12, 0]);

  const makeDot = (offset: number) =>
    interpolate((frame - delay) % 36, [offset, offset + 12, offset + 24, 36], [0.3, 1, 0.3, 0.3], {
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
      {[0, 6, 12].map((offset, i) => (
        <div
          key={i}
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#6366f1",
            opacity: makeDot(offset),
          }}
        />
      ))}
    </div>
  );
};

export const TestingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Modal slides up
  const modalSpring = spring({ frame: frame - 5, fps, config: { damping: 75, stiffness: 90 } });
  const modalY = interpolate(modalSpring, [0, 1], [80, 0]);
  const modalOpacity = interpolate(modalSpring, [0, 1], [0, 1]);
  const modalScale = interpolate(modalSpring, [0, 0.7, 1], [0.93, 1.02, 1]);

  // "Probando" label
  const labelOpacity = interpolate(frame, [8, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  // Input field gets a focus highlight when cursor is nearby (frame 55+)
  const inputFocus = interpolate(frame, [55, 72], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Timeline:
  // frame 20 — bot greeting appears
  // frame 65 — user message appears (after cursor "types")
  // frame 75 — cursor moves to send, clicks
  // frame 85 — typing indicator
  // frame 118 — bot full reply
  const showTyping = frame > 85 && frame < 118;
  const showBotReply = frame >= 118;

  // Modal is centered: roughly x=700 left edge, width=520 → center x=960
  // Input field bottom: modal height ~540, bottom padding ~80, so input y ≈ 540+270-80 = ~730
  // Input field center y ≈ 850 in 1080 space (modal top ≈ 270)
  const MODAL_CENTER_X = 960;
  const INPUT_Y = 858;
  const SEND_BTN_X = MODAL_CENTER_X + 210; // right of input
  const SEND_BTN_Y = INPUT_Y;

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

      {/* Ambient glow */}
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
        }}
      />

      {/* Top label */}
      <div
        style={{
          position: "absolute",
          top: 52,
          left: "50%",
          transform: "translateX(-50%)",
          opacity: labelOpacity,
          zIndex: 2,
          whiteSpace: "nowrap",
        }}
      >
        <span
          style={{
            fontSize: 17,
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
        {/* Header */}
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

        {/* Messages */}
        <div
          style={{
            padding: "24px 20px",
            display: "flex",
            flexDirection: "column",
            gap: 14,
            minHeight: 260,
            background: "#f0f2f8",
          }}
        >
          <ChatBubble text="¡Hola! ¿En qué puedo ayudarte?" fromUser={false} delay={20} />
          <ChatBubble text="¿Qué servicios ofrecéis?" fromUser delay={65} />
          {showTyping && <TypingIndicator delay={85} />}
          {showBotReply && (
            <ChatBubble
              text="Ofrecemos información sanitaria general y orientación para nuestros pacientes. ¿En qué más puedo ayudarte?"
              fromUser={false}
              delay={118}
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
              border: `1.5px solid ${interpolate(inputFocus, [0, 1], [0, 1]) > 0.5 ? "#6366f1" : "#d0d0e0"}`,
              borderRadius: 12,
              padding: "12px 16px",
              fontSize: 15,
              color: "#aaa",
              boxShadow: inputFocus > 0.5 ? "0 0 0 3px rgba(99,102,241,0.15)" : "none",
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

      {/* Mouse cursor — clicks on input field area, then moves to send button */}
      <MouseCursor
        startX={MODAL_CENTER_X - 180}
        startY={750}
        enterDelay={48}
        waypoints={[
          { frame: 62, x: MODAL_CENTER_X - 60, y: INPUT_Y }, // hover input
          { frame: 75, x: SEND_BTN_X, y: SEND_BTN_Y },       // move to send
          { frame: 77, x: SEND_BTN_X, y: SEND_BTN_Y },       // click send
          { frame: 140, x: MODAL_CENTER_X - 60, y: INPUT_Y + 10 }, // drift back
        ]}
      />
    </AbsoluteFill>
  );
};
