import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import {
  Environment,
  Float,
  MeshReflectorMaterial,
  OrbitControls,
} from "@react-three/drei";
import * as THREE from "three";

function CameraModel() {
  const cameraGroup = useRef<THREE.Group | null>(null);
  const scrollOffset = useRef(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      scrollOffset.current = THREE.MathUtils.clamp(
        scrollOffset.current + event.deltaY * 0.002,
        -1.2,
        1.2,
      );
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  useFrame((state) => {
    if (!cameraGroup.current) return;
    const t = state.clock.getElapsedTime();
    const targetScale = isHovered ? 1.08 : 1;
    cameraGroup.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.08,
    );
    cameraGroup.current.rotation.y = THREE.MathUtils.lerp(
      cameraGroup.current.rotation.y,
      Math.sin(t / 2) * 0.3 + scrollOffset.current * 0.45,
      0.08,
    );
    cameraGroup.current.rotation.x = Math.cos(t / 2) * 0.1;
    cameraGroup.current.position.y = THREE.MathUtils.lerp(
      cameraGroup.current.position.y,
      scrollOffset.current * 0.35,
      0.06,
    );
    scrollOffset.current *= 0.985;
  });

  return (
    <group
      ref={cameraGroup}
      onPointerOver={(event) => {
        event.stopPropagation();
        setIsHovered(true);
        document.body.style.cursor = "grab";
      }}
      onPointerOut={() => {
        setIsHovered(false);
        document.body.style.cursor = "default";
      }}
    >
      <mesh castShadow receiveShadow>
        <boxGeometry args={[3, 2, 1.2]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.6} metalness={0.2} />
      </mesh>
      <mesh position={[1.3, -0.1, 0.3]} castShadow>
        <boxGeometry args={[0.7, 1.8, 1.2]} />
        <meshStandardMaterial color="#111111" roughness={0.9} metalness={0.1} />
      </mesh>
      <mesh position={[0.8, 1.1, 0]} castShadow>
        <cylinderGeometry args={[0.35, 0.35, 0.25, 32]} />
        <meshStandardMaterial color="#2b2b2b" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[0, -0.1, 1]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.9, 0.9, 1.4, 32]} />
        <meshStandardMaterial color="#141414" roughness={0.4} metalness={0.5} />
      </mesh>
      <mesh position={[0, -0.1, 1.2]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.92, 0.92, 0.6, 32]} />
        <meshStandardMaterial color="#0d0d0d" roughness={0.9} />
      </mesh>
      <mesh position={[0, -0.1, 1.71]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.8, 0.8, 0.05, 32]} />
        <meshPhysicalMaterial
          color="#6f9bb5"
          transmission={0.72}
          thickness={0.18}
          transparent
          roughness={0.08}
          ior={1.5}
          reflectivity={1}
          clearcoat={1}
          clearcoatRoughness={0.04}
          iridescence={0.35}
          iridescenceIOR={1.4}
        />
      </mesh>
      <mesh position={[0, -0.1, 1.75]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.63, 0.78, 64]} />
        <meshBasicMaterial
          color="#bde7ff"
          transparent
          opacity={isHovered ? 0.7 : 0.3}
        />
      </mesh>
    </group>
  );
}

export default function CameraScene() {
  return (
    <>
      <ambientLight intensity={0.15} />
      <directionalLight position={[2, 5, 2]} intensity={2.5} castShadow />
      <spotLight
        position={[0, 2, 6]}
        angle={0.4}
        penumbra={1}
        intensity={1.8}
        color="#e6f0ff"
      />
      <Environment preset="studio" environmentIntensity={0.8} />
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <CameraModel />
      </Float>
      <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={512}
          mirror={0.4}
          mixBlur={0.8}
          mixStrength={1.5}
          roughness={0.6}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#050505"
          metalness={0.5}
        />
      </mesh>
      <OrbitControls enableZoom enablePan={false} maxPolarAngle={Math.PI / 2} />
    </>
  );
}
