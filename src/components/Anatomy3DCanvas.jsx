// src/components/Anatomy3DCanvas.jsx
"use client";

import React, { Suspense, useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

// مختصات استاندارد سه‌بعدی متناسب با ارتفاع ۲.۶ واحدی مدل مانکن
const ANATOMY_ANCHORS = [
  { id: "neck", pos: [0, 0.95, 0.12] },
  { id: "chest", pos: [0, 0.58, 0.18] },
  { id: "core", pos: [0, 0.28, 0.18] },
  { id: "lumbar", pos: [0, 0.18, -0.15] },
  { id: "shoulder", pos: [0.38, 0.72, 0.08] },
  { id: "shoulder", pos: [-0.38, 0.72, 0.08] },
  { id: "elbow", pos: [0.46, 0.35, 0.05] },
  { id: "elbow", pos: [-0.46, 0.35, 0.05] },
  { id: "wrist", pos: [0.52, -0.08, 0.04] },
  { id: "wrist", pos: [-0.52, -0.08, 0.04] },
  { id: "knee", pos: [0.18, -0.46, 0.16] },
  { id: "knee", pos: [-0.18, -0.46, 0.16] },
  { id: "hamstring", pos: [0.18, -0.26, -0.16] },
  { id: "hamstring", pos: [-0.18, -0.26, -0.16] },
];

function MuscleGlowBeacon({ position, normal }) {
  const ringRef = useRef(null);
  const lightRef = useRef(null);

  const finalPos = useMemo(() => {
    if (!position) return [0, 0, 0];
    const n = normal
      ? new THREE.Vector3(...normal).normalize().multiplyScalar(0.02)
      : new THREE.Vector3(0, 0, 0.02);
    return [position[0] + n.x, position[1] + n.y, position[2] + n.z];
  }, [position, normal]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 4;
    if (ringRef.current) {
      const scale = 1 + (Math.sin(t) + 1) * 0.45;
      ringRef.current.scale.set(scale, scale, scale);
      const mat = ringRef.current.material;
      if (mat) {
        mat.opacity = 0.9 - ((Math.sin(t) + 1) / 2) * 0.65;
      }
    }
    if (lightRef.current) {
      lightRef.current.intensity = 3.0 + Math.sin(t) * 1.5;
    }
  });

  return (
    <group position={finalPos}>
      <pointLight
        ref={lightRef}
        color="#22c55e"
        intensity={3.8}
        distance={0.9}
        decay={2}
      />
      <mesh>
        <sphereGeometry args={[0.034, 16, 16]} />
        <meshStandardMaterial
          color="#ccff00"
          emissive="#22c55e"
          emissiveIntensity={4}
          roughness={0.1}
          toneMapped={false}
        />
      </mesh>
      <mesh ref={ringRef}>
        <sphereGeometry args={[0.056, 16, 16]} />
        <meshBasicMaterial
          color="#ccff00"
          transparent
          opacity={0.8}
          wireframe
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

function OrientationAwareCameraController({
  targetViewSide,
  onTransitionComplete,
}) {
  const targetAngleRef = useRef(null);
  const isAnimatingRef = useRef(false);
  const controls = useThree((state) => state.controls);

  useEffect(() => {
    if (!targetViewSide) {
      isAnimatingRef.current = false;
      targetAngleRef.current = null;
      return;
    }

    targetAngleRef.current = targetViewSide === "back" ? Math.PI : 0;
    isAnimatingRef.current = true;
  }, [targetViewSide]);

  useFrame((state) => {
    if (!isAnimatingRef.current || targetAngleRef.current === null) return;

    const cam = state.camera;
    const currentAngle = Math.atan2(cam.position.x, cam.position.z);
    const radius = Math.sqrt(
      cam.position.x * cam.position.x + cam.position.z * cam.position.z,
    );
    const y = cam.position.y;

    let diff = targetAngleRef.current - currentAngle;
    while (diff > Math.PI) diff -= 2 * Math.PI;
    while (diff < -Math.PI) diff += 2 * Math.PI;

    if (Math.abs(diff) < 0.03) {
      const finalAngle = targetAngleRef.current;
      cam.position.x = radius * Math.sin(finalAngle);
      cam.position.z = radius * Math.cos(finalAngle);
      cam.position.y = y;
      isAnimatingRef.current = false;
      targetAngleRef.current = null;
      if (controls) controls.update();
      if (onTransitionComplete) onTransitionComplete();
    } else {
      const step = diff * 0.1;
      const newAngle = currentAngle + step;
      cam.position.x = radius * Math.sin(newAngle);
      cam.position.z = radius * Math.cos(newAngle);
      cam.position.y = y;
      if (controls) controls.update();
    }
  });

  useEffect(() => {
    if (!controls) return;
    const handleUserStart = () => {
      isAnimatingRef.current = false;
      targetAngleRef.current = null;
      if (onTransitionComplete) onTransitionComplete();
    };
    controls.addEventListener("start", handleUserStart);
    return () => controls.removeEventListener("start", handleUserStart);
  }, [controls, onTransitionComplete]);

  return null;
}

function MuscleModel({ onBodyClick }) {
  const { scene } = useGLTF("/male-v1.glb");

  const { model, modelPosition, modelScale } = useMemo(() => {
    const cloned = scene.clone(true);
    const box = new THREE.Box3().setFromObject(cloned);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);

    const targetHeight = 2.6;
    const factor = maxDim > 0 ? targetHeight / maxDim : 1;

    cloned.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color("#9ca3af"),
          roughness: 0.32,
          metalness: 0.22,
        });
      }
    });

    return {
      model: cloned,
      modelPosition: [
        -center.x * factor,
        -center.y * factor,
        -center.z * factor,
      ],
      modelScale: factor,
    };
  }, [scene]);

  const handlePointerDown = (e) => {
    e.stopPropagation();
    const p = e.point;
    const normal = e.face ? e.face.normal : new THREE.Vector3(0, 0, 1);

    let closestZone = "knee";
    let minDistance = Infinity;

    for (const anchor of ANATOMY_ANCHORS) {
      const dx = p.x - anchor.pos[0];
      const dy = p.y - anchor.pos[1];
      const dz = p.z - anchor.pos[2];
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

      if (dist < minDistance) {
        minDistance = dist;
        closestZone = anchor.id;
      }
    }

    if (onBodyClick) {
      onBodyClick({
        point: [p.x, p.y, p.z],
        normal: [normal.x, normal.y, normal.z],
        zoneId: closestZone,
      });
    }
  };

  return (
    <group position={modelPosition} scale={modelScale}>
      <primitive object={model} onPointerDown={handlePointerDown} />
    </group>
  );
}

export default function Anatomy3DCanvas({
  activeHit,
  targetViewSide,
  onBodyClick,
  onTransitionComplete,
  lang = "ar",
}) {
  const isRtl = lang === "ar";

  return (
    <div className="relative w-full h-[520px] sm:h-[580px] bg-gradient-to-b from-[#0c1012] via-zinc-950 to-black rounded-3xl overflow-hidden cursor-crosshair border border-zinc-800 shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_0_40px_rgba(34,197,94,0.05)] select-none">
      <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:20px_20px] opacity-25 pointer-events-none" />

      {/* هدر تعاملی اصلاح‌شده بدون ادعای پزشکی */}
      <div className="absolute top-4 inset-x-0 flex justify-center pointer-events-none z-10 px-4">
        <span className="bg-zinc-900/95 backdrop-blur-md border border-fitness-primary/40 text-zinc-100 text-xs font-bold px-4 py-1.5 rounded-full shadow-[0_0_20px_rgba(34,197,94,0.2)] flex items-center gap-2 text-center">
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-fitness-primary opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-fitness-primary" />
          </span>
          <span>
            {isRtl
              ? "المس المفصل المطلوب لتثبيت أولوية التقييم في ملفك"
              : "Click any joint to flag your assessment priority"}
          </span>
        </span>
      </div>

      <Canvas
        camera={{ position: [0, 0, 3.8], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{
          powerPreference: "high-performance",
          antialias: true,
          alpha: true,
          depth: true,
        }}
        performance={{ min: 0.5 }}
        className="touch-none"
      >
        <ambientLight intensity={1.5} />
        <directionalLight
          position={[0, 4, 4.5]}
          intensity={2.2}
          color="#ffffff"
        />
        <directionalLight
          position={[4, 2, 2]}
          intensity={1.4}
          color="#f8fafc"
        />
        <directionalLight
          position={[-4, 2, -2]}
          intensity={1.2}
          color="#22c55e"
        />
        <pointLight position={[0, -2, 2.8]} intensity={1.0} color="#cbd5e1" />

        <Suspense fallback={null}>
          <MuscleModel onBodyClick={onBodyClick} />

          {activeHit && activeHit.point && (
            <MuscleGlowBeacon
              position={activeHit.point}
              normal={activeHit.normal}
            />
          )}

          <OrientationAwareCameraController
            targetViewSide={targetViewSide}
            onTransitionComplete={onTransitionComplete}
          />
        </Suspense>

        <OrbitControls
          target={[0, 0, 0]}
          enablePan={false}
          enableDamping={true}
          dampingFactor={0.06}
          minDistance={1.8}
          maxDistance={5.5}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.7}
          rotateSpeed={0.85}
        />
      </Canvas>
    </div>
  );
}

useGLTF.preload("/male-v1.glb");
