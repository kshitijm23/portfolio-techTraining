import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Lightformer, Environment } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

type InteractiveGroupProps = {
  children: React.ReactNode;
  position: [number, number, number];
  rotation?: [number, number, number];
  speed?: number;
};

function InteractiveGroup({ children, position, rotation = [0, 0, 0], speed = 1 }: InteractiveGroupProps) {
  const group = useRef<THREE.Group>(null);
  const [active, setActive] = useState(false);
  const [hovered, setHovered] = useState(false);

  useFrame((_, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    if (!group.current) return;
    group.current.rotation.y += delta * (active ? 2.2 : 0.08) * speed;
    const targetScale = hovered ? 1.08 : 1;
    group.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 1 - Math.exp(-7 * delta));
  });

  return (
    <Float speed={1.1 * speed} rotationIntensity={0.15} floatIntensity={0.55}>
      <group
        ref={group}
        position={position}
        rotation={rotation}
        onClick={(event) => {
          event.stopPropagation();
          setActive((value) => !value);
        }}
        onPointerEnter={(event) => {
          event.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerLeave={() => {
          setHovered(false);
          document.body.style.cursor = "default";
        }}
      >
        {children}
      </group>
    </Float>
  );
}

function CodeWindow() {
  return (
    <InteractiveGroup position={[3.25, 1.8, -1]} rotation={[-0.15, -0.45, 0.08]} speed={0.8}>
      <mesh castShadow>
        <boxGeometry args={[3.1, 2.05, 0.16]} />
        <meshStandardMaterial color="#102d34" metalness={0.35} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.78, 0.1]}>
        <boxGeometry args={[2.78, 0.14, 0.05]} />
        <meshStandardMaterial color="#efaa43" emissive="#efaa43" emissiveIntensity={0.7} />
      </mesh>
      {[-0.3, -0.62, -0.94].map((y, index) => (
        <mesh key={y} position={[-0.45 + index * 0.12, y, 0.12]}>
          <boxGeometry args={[1.55 - index * 0.18, 0.1, 0.04]} />
          <meshStandardMaterial color={index === 1 ? "#5ed3c6" : "#d4e5df"} emissive={index === 1 ? "#247c76" : "#476963"} emissiveIntensity={0.5} />
        </mesh>
      ))}
      {[-1.1, -0.82, -0.54].map((x) => (
        <mesh key={x} position={[x, 0.76, 0.2]}>
          <sphereGeometry args={[0.055, 16, 16]} />
          <meshStandardMaterial color="#f7d38c" emissive="#efaa43" emissiveIntensity={1} />
        </mesh>
      ))}
    </InteractiveGroup>
  );
}

function TrainingBoard() {
  return (
    <InteractiveGroup position={[-3.45, -2.1, -1.3]} rotation={[0.08, 0.45, -0.08]} speed={0.65}>
      <mesh castShadow>
        <boxGeometry args={[2.7, 1.75, 0.14]} />
        <meshStandardMaterial color="#153c39" roughness={0.5} />
      </mesh>
      {[0.46, 0.08, -0.3].map((y, index) => (
        <group key={y} position={[0, y, 0.12]}>
          <mesh position={[-0.92, 0, 0]}>
            <circleGeometry args={[0.09, 20]} />
            <meshStandardMaterial color={index === 0 ? "#efaa43" : "#5ed3c6"} emissiveIntensity={0.4} emissive={index === 0 ? "#efaa43" : "#247c76"} />
          </mesh>
          <mesh position={[0.12, 0, 0]}>
            <boxGeometry args={[1.65, 0.08, 0.035]} />
            <meshStandardMaterial color="#d4e5df" />
          </mesh>
        </group>
      ))}
      <mesh position={[0, -1.03, 0]}>
        <boxGeometry args={[0.12, 0.75, 0.12]} />
        <meshStandardMaterial color="#7c9892" metalness={0.45} />
      </mesh>
      <mesh position={[0, -1.42, 0]}>
        <boxGeometry args={[1.25, 0.1, 0.3]} />
        <meshStandardMaterial color="#7c9892" metalness={0.45} />
      </mesh>
    </InteractiveGroup>
  );
}

function NetworkOrb() {
  const group = useRef<THREE.Group>(null);
  const points = [
    [0, 0, 0], [0.85, 0.48, 0.12], [-0.76, 0.62, -0.08], [0.55, -0.72, 0.2], [-0.72, -0.58, 0],
  ] as [number, number, number][];

  useFrame((_, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    if (group.current) group.current.rotation.z += delta * 0.06;
  });

  return (
    <InteractiveGroup position={[3.35, -3.4, -1.5]} rotation={[0.2, -0.2, 0]} speed={0.9}>
      <group ref={group}>
        {points.map((point, index) => (
          <mesh key={index} position={point}>
            <icosahedronGeometry args={[index === 0 ? 0.3 : 0.18, 1]} />
            <meshStandardMaterial color={index === 0 ? "#efaa43" : "#5ed3c6"} metalness={0.35} roughness={0.3} emissive={index === 0 ? "#8f5213" : "#185d57"} emissiveIntensity={0.6} />
          </mesh>
        ))}
        {points.slice(1).map((point, index) => {
          const direction = new THREE.Vector3(...point);
          const length = direction.length();
          const midpoint = direction.clone().multiplyScalar(0.5);
          return (
            <mesh key={`line-${index}`} position={midpoint} quaternion={new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.clone().normalize())}>
              <cylinderGeometry args={[0.018, 0.018, length, 8]} />
              <meshStandardMaterial color="#78958f" emissive="#294c48" emissiveIntensity={0.4} />
            </mesh>
          );
        })}
      </group>
    </InteractiveGroup>
  );
}

function Scene() {
  const rig = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame((_, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    if (!rig.current) return;
    rig.current.rotation.y = THREE.MathUtils.damp(rig.current.rotation.y, pointer.x * 0.08, 3, delta);
    rig.current.rotation.x = THREE.MathUtils.damp(rig.current.rotation.x, -pointer.y * 0.04, 3, delta);
  });

  return (
    <>
      <fog attach="fog" args={["#071311", 9, 22]} />
      <ambientLight intensity={0.65} />
      <directionalLight position={[4, 7, 5]} intensity={2.2} color="#ffe0a1" />
      <pointLight position={[-6, -1, 2]} intensity={15} distance={11} color="#35b8a8" />
      <Environment resolution={64}>
        <Lightformer intensity={2.4} color="#f2ad48" position={[0, 6, -2]} scale={[10, 2, 1]} />
        <Lightformer intensity={1.6} color="#57cbbb" position={[-6, 1, 0]} rotation-y={Math.PI / 2} scale={[8, 2, 1]} />
      </Environment>
      <group ref={rig}>
        <CodeWindow />
        <TrainingBoard />
        <NetworkOrb />
      </group>
    </>
  );
}

export function TechBackdrop() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="tech-backdrop" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 10], fov: 48 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}