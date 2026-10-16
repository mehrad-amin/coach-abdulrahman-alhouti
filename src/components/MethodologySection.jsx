// src/components/MethodologySection.jsx
"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import {
  Dumbbell,
  HeartPulse,
  Trophy,
  CheckCircle2,
  Sparkles,
  Award,
} from "lucide-react";
import {
  SERVICES,
  PAGE_CONTENT,
  COACH_CREDENTIALS,
} from "@/constants/fitnessData";

// آیکون‌های وکتوری مدرن برای ستون‌های تخصصی
function ServiceIcon({ id }) {
  if (id === 1 || id === "vip") {
    return (
      <div className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-fitness-primary/40 bg-zinc-900/90 shadow-[0_0_15px_rgba(34,197,94,0.25)]">
        <Dumbbell className="h-5 w-5 text-fitness-primary" />
      </div>
    );
  }

  if (id === 2 || id === "cut") {
    return (
      <div className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-500/30 bg-zinc-900/90 shadow-[0_0_12px_rgba(16,185,129,0.15)]">
        <HeartPulse className="h-5 w-5 text-emerald-400" />
      </div>
    );
  }

  return (
    <div className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-amber-500/30 bg-zinc-900/90 shadow-[0_0_12px_rgba(245,158,11,0.15)]">
      <Trophy className="h-5 w-5 text-amber-400" />
    </div>
  );
}

export default function MethodologySection({ services, lang = "ar" }) {
  const currentServices = services || SERVICES[lang] || SERVICES.ar;
  const t = PAGE_CONTENT[lang]?.methodology || PAGE_CONTENT.ar.methodology;
  const coachCreds = COACH_CREDENTIALS[lang] || COACH_CREDENTIALS.ar;
  const coachImages = COACH_CREDENTIALS?.images || {};
  const isRtl = lang === "ar";

  const [activeIndex, setActiveIndex] = useState(0);
  const [gymImageError, setGymImageError] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const goToNextCard = () => {
    setActiveIndex((prev) => (prev + 1) % currentServices.length);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = Math.abs(touchStartX.current - touchEndX.current);
    if (diff > 30) {
      goToNextCard();
    }
  };

  return (
    <section
      id="methodology"
      className="relative w-full py-14 md:py-24 overflow-hidden bg-[#0c1012]"
    >
      {/* هاله نور پس‌زمینه */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fitness-primary/10 blur-[130px]" />

      <div className="mx-auto max-w-6xl px-6">
        {/* هدر سکشن */}
        <div className="mb-10 text-center md:mb-14">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-fitness-primary/30 bg-fitness-primary/10 px-3.5 py-1 text-xs font-bold text-fitness-primary mb-2.5">
            <Sparkles className="h-3.5 w-3.5" />
            {t.badge}
          </span>
          <h2 className="text-2xl font-black tracking-tight md:text-4xl text-white">
            {t.title}
          </h2>
          <p className="mt-2 text-xs text-fitness-muted md:text-sm max-w-2xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* بخش معرفی مربی و عکس باشگاهی */}
        <div className="mb-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-3xl border border-zinc-800 bg-zinc-950/80 p-6 md:p-8 backdrop-blur-xl shadow-2xl">
          {/* عکس باشگاهی مربی - فول کاور و کامل */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative h-[420px] sm:h-[450px] w-full max-w-[300px] sm:max-w-[330px] overflow-hidden rounded-2xl border-2 border-fitness-primary/50 bg-zinc-950 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
              {!gymImageError ? (
                <Image
                  src={coachImages.gym || "/images/coach/gym.jpg"}
                  alt="Capt. Abdulrahman Al-Houti"
                  fill
                  sizes="(max-width: 768px) 300px, 330px"
                  onError={() => setGymImageError(true)}
                  className="object-cover object-center transition-transform duration-700 hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xs text-fitness-muted">
                  الكابتن عبدالرحمن الحوطي
                </div>
              )}
              {/* گرادینت تیره ملایم در پایین قاب برای خوانایی نشان */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 right-4 left-4 text-center">
                <span className="inline-block rounded-lg bg-black/85 px-3 py-1 text-xs font-bold text-fitness-primary border border-fitness-primary/40 backdrop-blur-md">
                  {coachCreds.academicTitle}
                </span>
              </div>
            </div>
          </div>

          {/* متن‌ها و سوابق افتخار مربی */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
              {coachCreds.fullName}
            </h3>
            <p className="text-xs sm:text-sm text-fitness-primary font-semibold mb-4">
              {coachCreds.specialization}
            </p>

            {/* لیست نکات برجسته رزومه */}
            <ul className="space-y-2.5 mb-6">
              {coachCreds.highlights.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300"
                >
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-fitness-primary shadow-[0_0_8px_#ccff00]" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>

            {/* مناصب و سوابق کلیدی با آیکون وکتوری */}
            <div className="border-t border-zinc-800/80 pt-4">
              <h4 className="flex items-center gap-1.5 text-xs font-bold text-zinc-400 mb-3 tracking-wider uppercase">
                <Award className="h-4 w-4 text-fitness-primary" />
                <span>
                  {isRtl
                    ? "أبرز المناصب والسوابق الرياضية"
                    : "Key Positions & Milestones"}
                </span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {coachCreds.positions.slice(0, 4).map((pos, idx) => (
                  <div
                    key={idx}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-800 bg-zinc-900/90 px-3 py-1.5 text-[11px] text-zinc-200"
                  >
                    <span className="font-mono text-fitness-primary font-bold">
                      {pos.period}
                    </span>
                    <span className="text-zinc-500">|</span>
                    <span className="font-medium">{pos.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ۱. نمای موبایل: ۳D Carousel با متن کاملاً شفاف و بدون تاری */}
        <div
          className="relative block md:hidden w-full select-none cursor-pointer"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onClick={goToNextCard}
        >
          <div
            className="relative mx-auto h-[255px] w-full max-w-[320px]"
            style={{ perspective: "1000px" }}
          >
            {currentServices.map((s, index) => {
              const count = currentServices.length;
              let diff = (index - activeIndex) % count;
              if (diff < -Math.floor(count / 2)) diff += count;
              if (diff > Math.floor(count / 2)) diff -= count;

              const isActive = diff === 0;
              const isVIP =
                s.badge?.includes("الأكثر طلباً") ||
                s.badge?.includes("Most Popular") ||
                s.id === "vip" ||
                index === 0;

              let transformStyle = "";
              let zIndex = 10 - Math.abs(diff);
              let opacity = 1;

              const dirFactor = isRtl ? 1 : -1;

              if (isActive) {
                // کارت فعال بدون هیچ تاری، شارپ و واضح
                transformStyle = "translateX(0px) scale(1)";
                opacity = 1;
              } else if (diff === 1) {
                transformStyle = `translateX(${-36 * dirFactor}px) scale(0.93)`;
                opacity = 0.7;
              } else if (diff === -1) {
                transformStyle = `translateX(${36 * dirFactor}px) scale(0.93)`;
                opacity = 0.7;
              } else {
                transformStyle = `translateX(${diff * 50 * dirFactor}px) scale(0.85)`;
                opacity = 0;
              }

              return (
                <div
                  key={s.id || index}
                  style={{
                    transform: transformStyle,
                    zIndex,
                    opacity,
                    transition: "all 0.35s ease-out",
                    willChange: "transform, opacity",
                  }}
                  className={`absolute inset-0 flex flex-col justify-between rounded-2xl border p-5 text-start bg-zinc-950 ${
                    isVIP
                      ? "border-fitness-primary/60 bg-gradient-to-b from-zinc-900 to-black shadow-[0_4px_25px_rgba(34,197,94,0.2)]"
                      : "border-zinc-800 bg-zinc-950 shadow-md"
                  }`}
                >
                  <div>
                    <div className="flex w-full items-center justify-between">
                      <ServiceIcon id={s.id || index + 1} />
                      <span
                        className={`inline-block rounded-md px-2.5 py-0.5 text-[10px] font-bold ${
                          isVIP
                            ? "border border-fitness-primary/50 bg-fitness-primary/20 text-fitness-primary"
                            : "border border-zinc-700 bg-zinc-900 text-zinc-400"
                        }`}
                      >
                        {s.badge}
                      </span>
                    </div>

                    <h3 className="mt-3.5 text-base font-black text-white">
                      {s.title}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-zinc-300 line-clamp-3">
                      {s.desc}
                    </p>
                  </div>

                  {/* تگ اصالت تخصصی به جای دکمه انتخاب پلن */}
                  <div className="flex items-center gap-1.5 border-t border-zinc-800/80 pt-2.5 text-[11px] font-medium text-fitness-primary">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                    <span>
                      {isRtl
                        ? "منهج تدريبي وتأهيلي معتمد"
                        : "Certified Training Protocol"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* نشانگر نقطه‌ای SVG */}
          <div className="mt-4 flex justify-center items-center gap-1.5">
            {currentServices.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex(idx);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeIndex === idx
                    ? "w-6 bg-fitness-primary shadow-[0_0_8px_rgba(34,197,94,0.6)]"
                    : "w-1.5 bg-zinc-700"
                }`}
                aria-label={`${t.cardAria} ${idx + 1}`}
              />
            ))}
          </div>

          <p className="mt-2 text-center text-[10px] text-zinc-400">
            {t.swipeHint}
          </p>
        </div>

        {/* ۲. نمای دسکتاپ: کارت‌های ویژگی صرفاً توضیحی */}
        <div className="hidden md:grid md:grid-cols-3 gap-6">
          {currentServices.map((s, index) => {
            const isVIP =
              s.badge?.includes("الأكثر طلباً") ||
              s.badge?.includes("Most Popular") ||
              s.id === "vip" ||
              index === 0;

            return (
              <div
                key={s.id || index}
                className={`group relative flex flex-col justify-between rounded-3xl border p-6 transition-all duration-300 hover:-translate-y-1.5 text-start ${
                  isVIP
                    ? "border-fitness-primary/50 bg-gradient-to-b from-zinc-900 to-black shadow-[0_10px_35px_rgba(34,197,94,0.12)] hover:border-fitness-primary"
                    : "border-zinc-800 bg-zinc-950 hover:border-zinc-700"
                }`}
              >
                <div>
                  <div className="flex w-full items-center justify-between">
                    <ServiceIcon id={s.id || index + 1} />
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${
                        isVIP
                          ? "border border-fitness-primary/40 bg-fitness-primary/15 text-fitness-primary shadow-[0_0_10px_rgba(34,197,94,0.2)]"
                          : "border border-zinc-800 bg-zinc-900 text-zinc-400"
                      }`}
                    >
                      {s.badge}
                    </span>
                  </div>

                  <h3 className="mt-4 text-xl font-black text-white group-hover:text-fitness-primary transition-colors">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    {s.desc}
                  </p>
                </div>

                {/* تگ تایید اصالت علمی متدولوژی */}
                <div className="mt-6 flex items-center gap-2 border-t border-zinc-800/80 pt-4 text-xs font-medium text-zinc-400 group-hover:text-fitness-primary transition-colors">
                  <CheckCircle2 className="h-4 w-4 text-fitness-primary shrink-0" />
                  <span>
                    {isRtl
                      ? "مبني على أحدث معايير الميكانيكا الحيوية"
                      : "Engineered on Evidence-Based Biomechanics"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
