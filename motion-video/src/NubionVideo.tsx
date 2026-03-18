import React from "react";
import { AbsoluteFill, Series } from "remotion";
import { HeroScene } from "./scenes/HeroScene";
import { LandingScene } from "./scenes/LandingScene";
import { DashboardScene } from "./scenes/DashboardScene";
import { FeaturesScene } from "./scenes/FeaturesScene";
import { DeployScene } from "./scenes/DeployScene";
import { CtaScene } from "./scenes/CtaScene";

// 24 seconds total @ 30fps = 720 frames
// Scene breakdown:
//   0–90    (3s)  — Hero: Brand reveal with real Nubion logo
//  90–240   (5s)  — Landing: "Create your AI Agent always" hero split
// 240–390   (5s)  — Dashboard: Real app UI showcase
// 390–510   (4s)  — Features: 3 feature cards
// 510–600   (3s)  — Deploy: Web / WhatsApp / Telegram platforms
// 600–720   (4s)  — CTA: Call to action + URL

export const NubionVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#0a0a1a", fontFamily: "sans-serif" }}>
      <Series>
        <Series.Sequence durationInFrames={90}>
          <HeroScene />
        </Series.Sequence>

        <Series.Sequence durationInFrames={150}>
          <LandingScene />
        </Series.Sequence>

        <Series.Sequence durationInFrames={150}>
          <DashboardScene />
        </Series.Sequence>

        <Series.Sequence durationInFrames={120}>
          <FeaturesScene />
        </Series.Sequence>

        <Series.Sequence durationInFrames={90}>
          <DeployScene />
        </Series.Sequence>

        <Series.Sequence durationInFrames={120}>
          <CtaScene />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
