import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";

export const TaglineScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // "Create your AI chatbot" slides in from left
  const line1Spring = spring({ frame, fps, config: { damping: 80, stiffness: 90 } });
  const line1X = interpolate(line1Spring, [0, 1], [-200, 0]);
  const line1Opacity = interpolate(line1Spring, [0, 1], [0, 1]);

  // "in less than" fades in slightly after
  const line2Spring = spring({ frame: frame - 12, fps, config: { damping: 80, stiffness: 90 } });
  const line2Opacity = interpolate(line2Spring, [0, 1], [0, 1]);

  // "30 seconds" counter
  const countSpring = spring({
    frame: frame - 20,
    fps,
    config: { damping: 60, stiffness: 80 },
  });
  const countScale = interpolate(countSpring, [0, 0.7, 1], [0.3, 1.15, 1]);
  const countOpacity = interpolate(countSpring, [0, 1], [0, 1]);

  // pulse glow on "30"
  const glow = interpolate(
    frame % 30,
    [0, 15, 30],
    [0.5, 1, 0.5],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Supporting text fades in last
  const supportOpacity = interpolate(
    frame,
    [50, 75],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.quad) }
  );

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0f0c29 0%, #302b63 60%, #24243e 100%)",
        display: "flex",
        flexDirection: "column",
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
            "linear-gradient(rgba(139,92,246,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.06) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          zIndex: 1,
        }}
      >
        {/* Line 1 */}
        <div
          style={{
            transform: `translateX(${line1X}px)`,
            opacity: line1Opacity,
          }}
        >
          <span
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: "white",
              letterSpacing: -2,
            }}
          >
            Create your AI chatbot
          </span>
        </div>

        {/* Line 2: "in less than" */}
        <div style={{ opacity: line2Opacity }}>
          <span
            style={{
              fontSize: 52,
              fontWeight: 400,
              color: "#c4b5fd",
              letterSpacing: -1,
            }}
          >
            in less than
          </span>
        </div>

        {/* "30 seconds" — big highlight */}
        <div
          style={{
            transform: `scale(${countScale})`,
            opacity: countOpacity,
            marginTop: 8,
          }}
        >
          <span
            style={{
              fontSize: 160,
              fontWeight: 900,
              letterSpacing: -6,
              background: "linear-gradient(90deg, #818cf8, #a78bfa, #c084fc)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "none",
              filter: `drop-shadow(0 0 ${60 * glow}px rgba(129,140,248,0.8))`,
              display: "inline-block",
            }}
          >
            30 seconds
          </span>
        </div>

        {/* Supporting copy */}
        <div style={{ opacity: supportOpacity, marginTop: 16 }}>
          <span
            style={{
              fontSize: 24,
              color: "rgba(255,255,255,0.5)",
              fontWeight: 400,
              textAlign: "center",
              letterSpacing: 0.5,
            }}
          >
            No coding required · No technical knowledge needed
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
