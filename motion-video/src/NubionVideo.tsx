import React from "react";
import { AbsoluteFill, Series } from "remotion";
import { HeroScene } from "./scenes/HeroScene";
import { LandingScene } from "./scenes/LandingScene";
import { DashboardScene } from "./scenes/DashboardScene";
import { ConfigScene } from "./scenes/ConfigScene";
import { TestingScene } from "./scenes/TestingScene";
import { DeployScene } from "./scenes/DeployScene";
import { CtaScene } from "./scenes/CtaScene";

// 29 seconds total @ 30fps = 870 frames
// Scene breakdown:
//   0–90    (3s)  — Hero: Brand reveal — Nubion
//  90–210   (4s)  — Landing: "Crea tu Agente IA en menos de 30 segundos"
// 210–300   (3s)  — Dashboard: Panel con agentes IA
// 300–420   (4s)  — Config: Configuración del agente
// 420–630   (7s)  — Testing: Probar Agente IA en vivo (escena principal)
// 630–720   (3s)  — Deploy: Web, WhatsApp, Telegram
// 720–870   (5s)  — CTA: Comienza gratis

export const NubionVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#0a0a1a", fontFamily: "sans-serif" }}>
      <Series>
        <Series.Sequence durationInFrames={90}>
          <HeroScene />
        </Series.Sequence>

        <Series.Sequence durationInFrames={120}>
          <LandingScene />
        </Series.Sequence>

        <Series.Sequence durationInFrames={90}>
          <DashboardScene />
        </Series.Sequence>

        <Series.Sequence durationInFrames={120}>
          <ConfigScene />
        </Series.Sequence>

        <Series.Sequence durationInFrames={210}>
          <TestingScene />
        </Series.Sequence>

        <Series.Sequence durationInFrames={90}>
          <DeployScene />
        </Series.Sequence>

        <Series.Sequence durationInFrames={150}>
          <CtaScene />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
