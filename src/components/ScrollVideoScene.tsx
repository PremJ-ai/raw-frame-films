import { useEffect, useRef, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { useScrollScrub } from "../hooks/useScrollScrub";

type ScrollVideoSceneProps = {
  videoSrc: string;
  children: ReactNode;
};

export default function ScrollVideoScene({
  videoSrc,
  children,
}: ScrollVideoSceneProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progress = useScrollScrub();

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !Number.isFinite(video.duration)) return;

    video.currentTime = progress * video.duration;
  }, [progress]);

  return (
    <main className="scroll-video-scene">
      <video
        ref={videoRef}
        className="scroll-video-scene__video"
        src={videoSrc}
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        onLoadedMetadata={(event) => {
          event.currentTarget.currentTime =
            progress * event.currentTarget.duration;
        }}
      />
      <div className="scroll-video-scene__canvas">
        <Canvas
          camera={{ position: [0, 1, 5], fov: 45 }}
          shadows
          gl={{ alpha: true }}
        >
          {children}
        </Canvas>
      </div>
    </main>
  );
}
