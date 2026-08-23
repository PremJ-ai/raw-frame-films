import { useEffect, useRef, useState } from "react";
import { useScrollScrub } from "../hooks/useScrollScrub";
import cameraImage from "../assets/hero/cameraimg.jpg";
import cameraSequenceOne from "../assets/hero/camera-sequence-01.png";
import cameraSequenceTwo from "../assets/hero/camera-sequence-02.png";
import cameraSequenceThree from "../assets/hero/camera-sequence-03.png";

const cameraImages = [
  cameraImage,
  cameraSequenceOne,
  cameraSequenceTwo,
  cameraSequenceThree,
];
const cameraLoop = [0, 1, 2, 3, 2, 1];

export default function HeroCameraBackground() {
  const [activeFrame, setActiveFrame] = useState(0);
  const activeBackground = cameraLoop[activeFrame];
  const scrollProgress = useScrollScrub();
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    prefersReducedMotion.current = mediaQuery.matches;

    const handler = (e: MediaQueryListEvent) => {
      prefersReducedMotion.current = e.matches;
    };
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion.current) return;
    const timer = window.setInterval(() => {
      setActiveFrame((current) => (current + 1) % cameraLoop.length);
    }, 2600);
    return () => window.clearInterval(timer);
  }, [prefersReducedMotion.current]);

  const cameraOpacity = 1 - scrollProgress * 0.8;
  const cameraBlur = scrollProgress * 12;
  const mergeOpacity = scrollProgress * 0.6;

  return (
    <div className="hero-bg-layers" aria-hidden="true">
      <div className="hero-bg-base" />
      <div
        className="hero-bg-camera"
        style={{
          opacity: cameraOpacity,
          filter: "blur(" + cameraBlur + "px)",
        } as React.CSSProperties}
      >
        {cameraImages.map((image, index) => (
          <img
            key={image}
            src={image}
            alt=""
            className={"hero-background-image " + (index === activeBackground ? "hero-background-image--active" : "")}
            style={{ mixBlendMode: "screen" } as React.CSSProperties}
          />
        ))}
      </div>
      <div
        className="hero-bg-merge"
        style={{ opacity: mergeOpacity } as React.CSSProperties}
      />
      <div className="hero-grid" />
      <div className="hero-particles" aria-hidden="true" />
    </div>
  );
}
