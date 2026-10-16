// src/components/HeroSection.jsx
"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import Image from "next/image";
import * as THREE from "three";
import { HERO_CONTENT, COACH_CREDENTIALS } from "@/constants/fitnessData";

// متریال‌های متالیک روشن با رفلکس بالا و بهینه‌شده برای سرعت
const brightMetalMat = new THREE.MeshStandardMaterial({
  color: "#3f3f46",
  metalness: 0.85,
  roughness: 0.2,
});

const neonGlowMat = new THREE.MeshStandardMaterial({
  color: "#22c55e",
  emissive: "#22c55e",
  emissiveIntensity: 1.5,
  metalness: 0.1,
  roughness: 0.2,
});

const metallicAccentMat = new THREE.MeshStandardMaterial({
  color: "#a1a1aa",
  metalness: 0.95,
  roughness: 0.15,
});

// ۱. کتل‌بل سه‌بعدی
function CrispKettlebell(props) {
  return (
    <group {...props}>
      <mesh material={brightMetalMat}>
        <sphereGeometry args={[0.5, 14, 14]} />
      </mesh>
      <mesh material={neonGlowMat}>
        <torusGeometry args={[0.52, 0.03, 8, 18]} />
      </mesh>
      <mesh material={metallicAccentMat} position={[0, 0.48, 0]}>
        <torusGeometry args={[0.26, 0.07, 8, 14]} />
      </mesh>
    </group>
  );
}

// ۲. دیسک وزنه سه‌بعدی
function CrispWeightPlate(props) {
  return (
    <group {...props}>
      <mesh material={brightMetalMat} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.85, 0.85, 0.16, 18]} />
      </mesh>
      <mesh material={neonGlowMat} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.86, 0.035, 8, 18]} />
      </mesh>
      <mesh material={metallicAccentMat} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.24, 0.04, 8, 14]} />
      </mesh>
    </group>
  );
}

// ۳. شیکر ورزشی سه‌بعدی
function CrispShaker(props) {
  return (
    <group {...props}>
      <mesh material={metallicAccentMat} position={[0, -0.1, 0]}>
        <cylinderGeometry args={[0.28, 0.22, 0.85, 14]} />
      </mesh>
      <mesh material={neonGlowMat} position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.29, 0.29, 0.04, 14]} />
      </mesh>
      <mesh material={brightMetalMat} position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.18, 14]} />
      </mesh>
    </group>
  );
}

// ۴. دمبل سه‌بعدی
function CrispDumbbell(props) {
  return (
    <group {...props}>
      <mesh material={metallicAccentMat} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.08, 0.08, 1.2, 10]} />
      </mesh>
      <mesh
        material={brightMetalMat}
        position={[-0.52, 0, 0]}
        rotation={[0, 0, Math.PI / 2]}
      >
        <cylinderGeometry args={[0.36, 0.36, 0.18, 14]} />
      </mesh>
      <mesh
        material={neonGlowMat}
        position={[-0.52, 0, 0]}
        rotation={[0, 0, Math.PI / 2]}
      >
        <torusGeometry args={[0.37, 0.02, 8, 14]} />
      </mesh>
      <mesh
        material={brightMetalMat}
        position={[0.52, 0, 0]}
        rotation={[0, 0, Math.PI / 2]}
      >
        <cylinderGeometry args={[0.36, 0.36, 0.18, 14]} />
      </mesh>
      <mesh
        material={neonGlowMat}
        position={[0.52, 0, 0]}
        rotation={[0, 0, Math.PI / 2]}
      >
        <torusGeometry args={[0.37, 0.02, 8, 14]} />
      </mesh>
    </group>
  );
}

// ۵. تابع کمکی خالص برای تولید مقادیر تصادفی ذرات
const generateDustData = (count) => {
  const pos = new Float32Array(count * 3);
  const spd = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 10;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 4;
    spd[i] = 0.2 + Math.random() * 0.3;
  }
  return [pos, spd];
};

function AmbientEnergyDust({ count = 22 }) {
  const pointsRef = useRef(null);

  const [positions, speeds] = useMemo(() => {
    return generateDustData(count);
  }, [count]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    const arr = pointsRef.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += speeds[i] * delta;
      if (arr[i * 3 + 1] > 4) arr[i * 3 + 1] = -4;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#4ade80"
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function ResponsiveElements() {
  const { viewport } = useThree();
  const isMobile = viewport.width < 5.5;

  const platePos = isMobile
    ? [viewport.width * 0.35, 2.6, -0.6]
    : [3.2, 1.4, -0.5];
  const kettlebellPos = isMobile
    ? [-viewport.width * 0.35, 2.4, -0.4]
    : [-3.2, 1.3, -0.3];
  const shakerPos = isMobile
    ? [viewport.width * 0.35, -2.6, -0.3]
    : [3.0, -1.5, -0.2];
  const dumbbellPos = isMobile
    ? [-viewport.width * 0.35, -2.5, -0.5]
    : [-2.8, -1.4, -0.4];

  const elemScale = isMobile ? 0.52 : 0.85;

  return (
    <>
      <AmbientEnergyDust count={isMobile ? 15 : 25} />

      <Float speed={2.0} rotationIntensity={0.4} floatIntensity={0.6}>
        <CrispWeightPlate
          position={platePos}
          rotation={[0.4, 0.4, 0.2]}
          scale={elemScale}
        />
      </Float>

      <Float speed={2.2} rotationIntensity={0.4} floatIntensity={0.7}>
        <CrispKettlebell
          position={kettlebellPos}
          rotation={[-0.3, 0.5, 0.1]}
          scale={elemScale}
        />
      </Float>

      <Float speed={1.9} rotationIntensity={0.4} floatIntensity={0.7}>
        <CrispShaker
          position={shakerPos}
          rotation={[0.2, -0.3, -0.2]}
          scale={elemScale}
        />
      </Float>

      <Float speed={2.4} rotationIntensity={0.5} floatIntensity={0.6}>
        <CrispDumbbell
          position={dumbbellPos}
          rotation={[0.5, -0.4, 0.3]}
          scale={elemScale * 0.9}
        />
      </Float>
    </>
  );
}

function SceneCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
        stencil: false,
      }}
    >
      <ambientLight intensity={1.8} />
      <directionalLight position={[6, 8, 5]} intensity={3.5} color="#ffffff" />
      <directionalLight
        position={[-6, -4, -2]}
        intensity={1.5}
        color="#22c55e"
      />
      <pointLight
        position={[0, 0, 3]}
        intensity={4.0}
        color="#22c55e"
        distance={12}
      />
      <ResponsiveElements />
    </Canvas>
  );
}

// کامپوننت انیمیشن شمارنده بدون خطای رندر
function AnimatedCounter({ value }) {
  const [displayValue, setDisplayValue] = useState(() => {
    const numericMatch = value.match(/\d+/);
    if (!numericMatch) return value;
    return (
      "0" +
      (value.includes("%")
        ? "%"
        : value.includes("عاماً")
          ? " عاماً"
          : value.includes("رياضات")
            ? " رياضات"
            : "")
    );
  });

  useEffect(() => {
    const numericMatch = value.match(/\d+/);
    if (!numericMatch) {
      setDisplayValue(value);
      return;
    }

    const targetNumber = parseInt(numericMatch[0], 10);
    const prefix = value.startsWith("+") ? "+" : "";
    const suffix = value.includes("%")
      ? "%"
      : value.includes("عاماً")
        ? " عاماً"
        : value.includes("رياضات")
          ? " رياضات"
          : "";

    let start = 0;
    // افزایش مدت زمان به 800 میلی‌ثانیه برای روانی و قابلیت دیدن کامل انیمیشن
    const duration = 800;
    const stepTime = 25; // فاصله زمانی بین هر فریم به‌روزرسانی
    const totalSteps = duration / stepTime;
    const increment = Math.max(Math.ceil(targetNumber / totalSteps), 1);

    const timer = setInterval(() => {
      start += increment;
      if (start >= targetNumber) {
        start = targetNumber;
        clearInterval(timer);
        setDisplayValue(value);
      } else {
        setDisplayValue(`${prefix}${start}${suffix}`);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{displayValue}</span>;
}

export default function HeroSection({ lang = "ar" }) {
  const content = HERO_CONTENT[lang] || HERO_CONTENT.ar;
  const coachImages = COACH_CREDENTIALS?.images || {};
  const [imageError, setImageError] = useState(false);

  return (
    <section className="relative min-h-[85vh] w-full overflow-hidden border-b border-zinc-800 bg-[#0c1012] flex items-center justify-center py-10">
      {/* کانوِس ۳ بعدی */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <SceneCanvas />
      </div>

      {/* هاله نور پس‌زمینه */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-fitness-primary/10 blur-[100px]" />

      <div className="relative z-20 mx-auto w-full max-w-4xl px-4 sm:px-6 py-8 text-center">
        {/* قاب عکس رسمی مربی با next/image */}
        <div className="mx-auto mb-5 flex justify-center">
          <div className="group relative h-22 w-22 sm:h-30 sm:w-30 overflow-hidden rounded-2xl border-2 border-fitness-primary/60 bg-zinc-950 shadow-[0_0_25px_rgba(34,197,94,0.25)] transition-transform duration-300 hover:scale-105">
            {!imageError ? (
              <Image
                src={coachImages.formal || "/images/coach/formal.jpg"}
                alt="Capt. Abdulrahman Al-Houti"
                fill
                sizes="(max-width: 640px) 88px, 120px"
                priority
                onError={() => setImageError(true)}
                className="object-cover object-top transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-zinc-900 text-xs font-bold text-fitness-primary">
                الحوطي
              </div>
            )}
            <div className="absolute inset-0 bg-linear-to-t from-[#0c1012]/80 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

        {/* بج تخصصی */}
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-fitness-primary/50 bg-black/75 px-3 py-1 shadow-[0_0_20px_rgba(34,197,94,0.2)] backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-fitness-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-fitness-primary" />
          </span>
          <span className="font-mono text-[10px] sm:text-[11px] font-bold text-fitness-primary">
            {content.badge}
          </span>
        </div>

        <h1 className="text-2xl font-black leading-[1.3] tracking-tight text-white sm:text-4xl lg:text-5xl drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
          {content.headlinePrimary} <br />
          <span className="mt-1.5 inline-block bg-linear-to-r from-fitness-primary via-emerald-300 to-white bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(34,197,94,0.4)]">
            {content.headlineHighlight}
          </span>
        </h1>

        <p className="mx-auto mt-3.5 max-w-xl text-xs sm:text-sm leading-relaxed text-zinc-300 drop-shadow-md">
          {content.description}
        </p>

        {/* دکمه‌های اقدام (CTA) */}
        <div className="mt-6 flex flex-col items-center justify-center gap-2.5 sm:flex-row">
          <a
            href="#booking"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-fitness-primary px-7 py-3 text-center text-xs sm:text-sm font-black text-black shadow-[0_0_25px_rgba(34,197,94,0.4)] transition-all hover:bg-fitness-primary-hover active:scale-[0.98]"
          >
            <span>{content.ctaPrimary}</span>
            <span className="text-xs transition-transform duration-200 rtl:rotate-180">
              →
            </span>
          </a>

          <a
            href="#calculator"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-950/90 px-5 py-3 text-center text-xs font-bold text-zinc-100 shadow-md backdrop-blur-md transition-all hover:border-fitness-primary hover:text-white"
          >
            <span>{content.ctaSecondary}</span>
          </a>
        </div>

        {/* بخش آمار و ارقام */}
        <div className="mx-auto mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 border-t border-zinc-800/80 pt-5">
          {content.stats.map((stat, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-zinc-800 bg-zinc-950/90 px-4 py-2.5 sm:px-5 sm:py-3 backdrop-blur-md shadow-lg transition-all hover:border-fitness-primary/50 text-center"
            >
              <p
                className={`font-mono text-base sm:text-xl font-black ${
                  idx === 1 ? "text-fitness-primary" : "text-white"
                }`}
              >
                <AnimatedCounter value={stat.value} />
              </p>
              <span className="mt-0.5 block text-[10px] sm:text-[11px] font-medium text-zinc-400">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
