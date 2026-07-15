"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";

export function CobeGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 1000,
      height: 1000,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.98, 0.45, 0.08], // Orange land dots
      markerColor: [1, 1, 1], // White markers
      glowColor: [0.98, 0.45, 0.08], // Orange aura
      markers: [
        // Example marker: Ahmedabad, India
        { location: [23.0225, 72.5714], size: 0.1 },
      ],
      onRender: (state: Record<string, any>) => {
        // Called on every animation frame.
        // `state` will be an empty object, return updated params.
        state.phi = phi;
        phi += 0.003;
      },
    } as any);

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 800,
        aspectRatio: 1,
        margin: "auto",
        position: "relative",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          contain: "layout paint size",
        }}
      />
    </div>
  );
}
