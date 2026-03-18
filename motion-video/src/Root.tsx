import React from "react";
import { Composition } from "remotion";
import { NubionVideo } from "./NubionVideo";

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="NubionVideo"
        component={NubionVideo}
        durationInFrames={450} // 15 seconds at 30fps
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
