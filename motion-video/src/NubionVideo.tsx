import React from "react";
import { AbsoluteFill, Series } from "remotion";
import { HeroScene } from "./scenes/HeroScene";
import { LandingScene } from "./scenes/LandingScene";
import { DashboardScene } from "./scenes/DashboardScene";
import { ConfigScene } from "./scenes/ConfigScene";
import { TestingScene } from "./scenes/TestingScene";
import { StatsScene } from "./scenes/StatsScene";
import { DeployScene } from "./scenes/DeployScene";
import { CtaScene } from "./scenes/CtaScene";

// 28 seconds total @ 30fps = 840 frames
// Scene breakdown:
//   0–75    (2.5s)  — Hero: Brand reveal
//  75–180   (3.5s)  — Landing: "Crea tu Agente IA en menos de 30 segundos"
// 180–270   (3s)    — Dashboard: Panel con agentes
// 270–375   (3.5s)  — Config: Configuración + cursor hace click en "Probar"
// 375–555   (6s)    — Testing: Chat en vivo con cursor + typing indicator
// 555–645   (3s)    — Stats: Resultados reales — 85%, 3×, 98%, 24/7
// 645–720   (2.5s)  — Deploy: Web, WhatsApp, Telegram
// 720–840   (4s)    — CTA: Comienza gratis

export const NubionVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#0a0a1a", fontFamily: "sans-serif" }}>
      <Series>
        <Series.Sequence durationInFrames={75}>
          <HeroScene />
        </Series.Sequence>

        <Series.Sequence durationInFrames={105}>
          <LandingScene />
        </Series.Sequence>

        <Series.Sequence durationInFrames={90}>
          <DashboardScene />
        </Series.Sequence>

        <Series.Sequence durationInFrames={105}>
          <ConfigScene />
        </Series.Sequence>

        <Series.Sequence durationInFrames={180}>
          <TestingScene />
        </Series.Sequence>

        <Series.Sequence durationInFrames={90}>
          <StatsScene />
        </Series.Sequence>

        <Series.Sequence durationInFrames={75}>
          <DeployScene />
        </Series.Sequence>

        <Series.Sequence durationInFrames={120}>
          <CtaScene />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
