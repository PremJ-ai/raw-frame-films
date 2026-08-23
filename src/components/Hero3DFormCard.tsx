import { useFrame } from "@react-three/fiber";
import { Html, Box } from "@react-three/drei";
import { useRef } from "react";
import type { Mesh } from "three";
import Hero3DFormFields from "./Hero3DFormFields";

interface Hero3DFormCardProps {
  scrollProgress: number;
  onSubmit: (data: { name: string; number: string; message: string }) => void;
}

export default function Hero3DFormCard({ scrollProgress, onSubmit }: Hero3DFormCardProps) {
  const cardRef = useRef<Mesh>(null!);
  const prefersReducedMotion = useRef(false);

  useFrame((state, _delta) => {
    if (prefersReducedMotion.current) return;
    const t = state.clock.getElapsedTime();
    if (cardRef.current) {
      cardRef.current.rotation.y = Math.sin(t * 0.3) * 0.08;
      cardRef.current.rotation.x = Math.cos(t * 0.2) * 0.05;
      cardRef.current.position.y = Math.sin(t * 0.4) * 0.08;
    }
  });

  useFrame(() => {
    if (!cardRef.current) return;
    const targetRotationY = scrollProgress * 0.5;
    const targetScale = 1 + scrollProgress * 0.05;
    const targetZ = scrollProgress * 0.3;
    cardRef.current.rotation.y += (targetRotationY - cardRef.current.rotation.y) * 0.1;
    cardRef.current.scale.x += (targetScale - cardRef.current.scale.x) * 0.1;
    cardRef.current.scale.y += (targetScale - cardRef.current.scale.y) * 0.1;
    cardRef.current.scale.z += (targetScale - cardRef.current.scale.z) * 0.1;
    cardRef.current.position.z += (targetZ - cardRef.current.position.z) * 0.1;
  });

  return (
    <group ref={cardRef}>
      <Box args={[3.2, 4, 0.4]}>
        <meshPhysicalMaterial
          transmission={0.15}
          thickness={0.4}
          roughness={0.1}
          metalness={0.05}
          clearcoat={1}
          clearcoatRoughness={0.1}
          ior={1.5}
          color="#0a0f1a"
          opacity={0.9}
          transparent
        />
      </Box>
      <Box args={[3.22, 4.02, 0.42]}>
        <meshBasicMaterial color="#6366f1" opacity={0.3} transparent />
      </Box>
      <Html
        transform={false}
        zIndexRange={[10, 10]}
        fullscreen
        wrapperClass="hero-3d-form-html"
      >
        <Hero3DFormFields onSubmit={onSubmit} />
      </Html>
    </group>
  );
}
