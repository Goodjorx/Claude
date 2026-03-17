import React from "react";
import { AbsoluteFill, Series } from "remotion";
import { HeroScene } from "./scenes/HeroScene";
import { TaglineScene } from "./scenes/TaglineScene";
import { FeaturesScene } from "./scenes/FeaturesScene";
import { DeployScene } from "./scenes/DeployScene";
import { CtaScene } from "./scenes/CtaScene";

// 15 seconds total @ 30fps = 450 frames
// Scene breakdown:
//   0–90   (3s)  — Hero: Brand reveal
//  90–180  (3s)  — Tagline: "30 seconds" hook
// 180–300  (4s)  — Features: 3 cards
// 300–390  (3s)  — Deploy: platforms
// 390–450  (2s)  — CTA

export const NubionVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#0a0a1a", fontFamily: "sans-serif" }}>
      <Series>
        <Series.Sequence durationInFrames={90}>
          <HeroScene />
        </Series.Sequence>

        <Series.Sequence durationInFrames={90}>
          <TaglineScene />
        </Series.Sequence>

        <Series.Sequence durationInFrames={120}>
          <FeaturesScene />
        </Series.Sequence>

        <Series.Sequence durationInFrames={90}>
          <DeployScene />
        </Series.Sequence>

        <Series.Sequence durationInFrames={60}>
          <CtaScene />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
