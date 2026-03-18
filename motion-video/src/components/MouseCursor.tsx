import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from "remotion";

interface ClickPoint {
  frame: number; // frame at which click fires
  x: number;
  y: number;
}

interface MouseCursorProps {
  // Starting position
  startX: number;
  startY: number;
  // Waypoints the cursor travels through: [{frame, x, y}]
  waypoints: ClickPoint[];
  // Overall entrance delay
  enterDelay?: number;
}

// Ripple effect at a specific click moment
const Ripple: React.FC<{ x: number; y: number; triggerFrame: number }> = ({
  x,
  y,
  triggerFrame,
}) => {
  const frame = useCurrentFrame();
  const elapsed = frame - triggerFrame;

  if (elapsed < 0 || elapsed > 30) return null;

  const progress = elapsed / 30;
  const radius = interpolate(progress, [0, 1], [0, 56], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const opacity = interpolate(progress, [0, 0.3, 1], [0.7, 0.5, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: x - radius,
        top: y - radius,
        width: radius * 2,
        height: radius * 2,
        borderRadius: "50%",
        border: "2.5px solid rgba(45,232,180,0.9)",
        opacity,
        pointerEvents: "none",
        zIndex: 999,
      }}
    />
  );
};

export const MouseCursor: React.FC<MouseCursorProps> = ({
  startX,
  startY,
  waypoints,
  enterDelay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Cursor entrance fade
  const enterProgress = spring({
    frame: frame - enterDelay,
    fps,
    config: { damping: 80, stiffness: 120 },
  });
  const cursorOpacity = interpolate(enterProgress, [0, 1], [0, 1]);

  // Calculate current position by interpolating between waypoints
  const allPoints = [
    { frame: enterDelay, x: startX, y: startY },
    ...waypoints,
  ];

  let curX = startX;
  let curY = startY;

  for (let i = 0; i < allPoints.length - 1; i++) {
    const from = allPoints[i];
    const to = allPoints[i + 1];
    if (frame >= from.frame && frame <= to.frame) {
      const t = interpolate(frame, [from.frame, to.frame], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.inOut(Easing.cubic),
      });
      curX = interpolate(t, [0, 1], [from.x, to.x]);
      curY = interpolate(t, [0, 1], [from.y, to.y]);
      break;
    }
    // Past the last waypoint — stay at final position
    if (i === allPoints.length - 2 && frame > to.frame) {
      curX = to.x;
      curY = to.y;
    }
  }

  // Click shrink on the cursor arrow itself
  const clickScales = waypoints.map((wp) => {
    const elapsed = frame - wp.frame;
    if (elapsed < 0 || elapsed > 12) return 1;
    return interpolate(elapsed, [0, 6, 12], [0.75, 0.85, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  });
  const cursorScale = Math.min(...clickScales);

  return (
    <>
      {/* Ripple effects at each click */}
      {waypoints.map((wp, i) => (
        <Ripple key={i} x={wp.x} y={wp.y} triggerFrame={wp.frame} />
      ))}

      {/* Cursor arrow */}
      <div
        style={{
          position: "absolute",
          left: curX,
          top: curY,
          opacity: cursorOpacity,
          transform: `scale(${cursorScale})`,
          transformOrigin: "top left",
          pointerEvents: "none",
          zIndex: 1000,
          filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.5))",
        }}
      >
        <svg
          width="28"
          height="34"
          viewBox="0 0 28 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 2L2 26L8.5 19.5L13.5 30L17 28.5L12 18L21 18L2 2Z"
            fill="white"
            stroke="#1e1b4b"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </>
  );
};
