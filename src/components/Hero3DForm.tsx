import { Canvas } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import Hero3DFormCard from "./Hero3DFormCard";

interface Hero3DFormProps {
  scrollProgress: number;
}

export default function Hero3DForm({ scrollProgress }: Hero3DFormProps) {
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (data: { name: string; number: string; message: string }) => {
    console.log("Hero 3D Form submitted:", data);
  };

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="hero-3d-form-canvas" ref={canvasRef}>
      {mounted && (
        <Canvas
          camera={{ position: [0, 0, 3], fov: 35 }}
          shadows
          gl={{ alpha: true, antialias: true, preserveDrawingBuffer: false }}
          style={{ width: "100%", height: "100%", display: "block" }}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[2, 3, 4]} intensity={0.8} castShadow />
          <pointLight position={[-2, 2, 3]} intensity={0.4} color="#6366f1" />
          <pointLight position={[2, -1, 2]} intensity={0.3} color="#ec4899" />
          <Hero3DFormCard scrollProgress={scrollProgress} onSubmit={handleSubmit} />
        </Canvas>
      )}
      {!mounted && (
        <div className="hero-3d-form-loading" aria-hidden="true">
          <div className="hero-3d-form-spinner" />
        </div>
      )}
    </div>
  );
}
