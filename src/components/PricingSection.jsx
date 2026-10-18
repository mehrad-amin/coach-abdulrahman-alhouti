// src/components/PricingSection.jsx
"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { GraduationCap, Sparkles, Check } from "lucide-react";
import { PRICING_PLANS } from "@/constants/fitnessData";

const PRICING_UI_TEXT = {
  ar: {
    badge: "استثمار في صحتك وبنائك البدني",
    title: "باقات التدريب والاشتراكات المعتمدة",
    subtitle:
      "اختر مستوى المتابعة المناسب لأهدافك من الباقات الرسمية للكابتن عبدالرحمن",
    studentDiscountDesc:
      "أسعار تفضيلية وعروض حصرية للطلبة عند إرفاق ما يثبت القيد الدراسي.",
    popularBadge: "الخيار الأكثر ترشيحاً",
    selectedTag: "محدد",
    selectBtn: "اختيار هذه الباقة",
    selectedBtn: "تم اختيار الباقة ✓",
    inGymBadge: "خدمة ميدانية حصرية في الكويت",
    inGymDesc:
      "تدريب شخصي عملي ومباشر مع الكابتن عبدالرحمن داخل النادي لتصحيح التكنيك والمسار الحركي لحظياً مع خطة تغذية متكاملة ورعاية خاصة لحالات التأهيل والرياضيين.",
    inGymCta: "حجز باقة التدريب الحضوري",
  },
  en: {
    badge: "Invest in Your Health & Performance",
    title: "Official Coaching Plans & Rates",
    subtitle:
      "Select the accountability tier matching your lifestyle and fitness goals",
    studentDiscountDesc:
      "Special tiered rates and offers available for verified students.",
    popularBadge: "Most Recommended",
    selectedTag: "Selected",
    selectBtn: "Select This Plan",
    selectedBtn: "Plan Selected ✓",
    inGymBadge: "Exclusive In-Person Coaching (Kuwait)",
    inGymDesc:
      "Direct 1-on-1 hands-on coaching with Capt. Abdulrahman inside the gym to correct movement mechanics and lifting technique in real-time, coupled with a comprehensive nutrition plan.",
    inGymCta: "Book In-Gym Coaching",
  },
};

function PricingCard({ plan, ui, isSelected, onSelect, lang }) {
  const cardRef = useRef(null);
  const [coords, setCoords] = useState({ x: 50, y: 50 });
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isInteracting, setIsInteracting] = useState(false);

  const handlePointerMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setCoords({
      x: Math.round((x / rect.width) * 100),
      y: Math.round((y / rect.height) * 100),
    });

    const rotateX = (y / rect.height - 0.5) * -7;
    const rotateY = (x / rect.width - 0.5) * 7;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handlePointerLeave = () => {
    setIsInteracting(false);
    setRotate({ x: 0, y: 0 });
  };

  // دریافت زیرنویس داینامیک از شیت یا تفکیک هوشمند
  const isOnlineTier = plan.id === "online_full";
  const subtitle = plan.subtitle
    ? plan.subtitle
    : isOnlineTier
      ? lang === "ar"
        ? "خطة المتابعة الشاملة والتجهيز البدني"
        : "Comprehensive Coaching & Prep Tier"
      : null;

  return (
    <div
      ref={cardRef}
      onPointerDown={() => setIsInteracting(true)}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerCancel={handlePointerLeave}
      style={{
        transform: isInteracting
          ? `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) translateY(-6px)`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)",
        transition: isInteracting
          ? "none"
          : "transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1)",
      }}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-[2.2rem] border p-6 sm:p-8 [transform-style:preserve-3d] transition-colors duration-300 ${
        isSelected
          ? "border-fitness-primary bg-gradient-to-b from-zinc-900/90 via-zinc-950 to-black shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_50px_rgba(0,210,255,0.25)] ring-2 ring-fitness-primary/50"
          : plan.isPopular
            ? "border-fitness-primary/60 bg-gradient-to-b from-zinc-900/60 via-zinc-950 to-[#0b0e11] shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_35px_rgba(0,210,255,0.15)]"
            : "border-zinc-800/90 bg-gradient-to-b from-zinc-950/90 to-[#0b0e11] shadow-[0_15px_35px_rgba(0,0,0,0.6)] hover:border-zinc-700"
      }`}
    >
      <div
        className="pointer-events-none absolute -inset-px rounded-[2.2rem] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(450px circle at ${coords.x}% ${coords.y}%, rgba(0, 210, 255, 0.12), transparent 80%)`,
        }}
      />

      {(plan.isPopular || isSelected) && (
        <div className="pointer-events-none absolute -top-16 -end-16 h-40 w-40 rounded-full bg-fitness-primary/10 blur-3xl" />
      )}

      <div className="min-h-[30px] flex items-center justify-between [transform:translateZ(30px)]">
        {plan.isPopular ? (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-fitness-primary/50 bg-fitness-primary/15 px-3 py-1 text-xs font-black text-fitness-primary shadow-[0_0_15px_rgba(0,210,255,0.2)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-fitness-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-fitness-primary" />
            </span>
            <span>{ui.popularBadge}</span>
          </span>
        ) : (
          <div />
        )}

        {isSelected && (
          <span className="inline-flex items-center gap-1 rounded-full bg-fitness-primary text-black font-black text-[11px] px-2.5 py-0.5">
            <Check className="w-3 h-3 stroke-[3]" />
            <span>{ui.selectedTag}</span>
          </span>
        )}
      </div>

      <div className="relative z-10 [transform:translateZ(20px)] mt-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg sm:text-xl font-black text-white leading-snug">
            {plan.title}
          </h3>
          <span className="shrink-0 rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-[11px] font-semibold text-zinc-300">
            {plan.duration}
          </span>
        </div>

        <div className="mt-5 flex flex-col items-baseline">
          <p className="text-3xl sm:text-4xl font-black tracking-tight text-fitness-primary drop-shadow-[0_0_15px_rgba(0,210,255,0.35)] font-mono">
            {plan.price}
          </p>
          {subtitle && (
            <span className="mt-1 text-xs font-bold text-zinc-400">
              {subtitle}
            </span>
          )}
        </div>

        <ul className="mt-6 space-y-3 border-t border-zinc-800/80 pt-5">
          {plan.features.map((feat, index) => (
            <li
              key={index}
              className="flex items-start gap-2.5 text-xs sm:text-[13px] leading-relaxed text-zinc-300"
            >
              <div className="rounded-md border border-fitness-primary/40 bg-fitness-primary/10 p-1 mt-0.5 shrink-0 text-fitness-primary">
                <Check className="w-3 h-3 stroke-[2.5]" />
              </div>
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="relative z-10 mt-7 [transform:translateZ(25px)]">
        <button
          type="button"
          onClick={() => onSelect(plan)}
          className={`w-full cursor-pointer rounded-2xl py-3.5 text-center text-xs sm:text-sm font-black transition-all active:scale-[0.98] ${
            isSelected
              ? "bg-white text-black shadow-[0_0_25px_rgba(255,255,255,0.4)]"
              : plan.isPopular
                ? "bg-fitness-primary text-black shadow-[0_0_25px_rgba(0,210,255,0.35)] hover:shadow-[0_0_35px_rgba(0,210,255,0.5)] hover:bg-fitness-primary-hover"
                : "border border-zinc-800 bg-zinc-900/90 text-zinc-200 hover:border-fitness-primary hover:text-white"
          }`}
        >
          {isSelected ? ui.selectedBtn : ui.selectBtn}
        </button>
      </div>
    </div>
  );
}

export default function PricingSection({ plans, lang = "ar" }) {
  const ui = PRICING_UI_TEXT[lang] || PRICING_UI_TEXT.ar;

  const [livePlans, setLivePlans] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);

  // واکشی لحظه‌ای و مستقیم از روت API با دور زدن کش مرورگر
  useEffect(() => {
    let isMounted = true;
    async function fetchFromSheet() {
      try {
        const cacheBuster = `t=${Date.now()}`;
        const res = await fetch(`/api/pricing?${cacheBuster}`, {
          cache: "no-store",
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
        });

        if (!res.ok) {
          console.warn(`[Pricing] Route returned status ${res.status}`);
          return;
        }

        const data = await res.json();

        if (data?.plans && isMounted) {
          console.log(
            "[Pricing] Live data loaded from sheets successfully:",
            data.plans,
          );
          setLivePlans(data.plans);
        } else {
          console.warn(
            "[Pricing] Unexpected payload structure from /api/pricing:",
            data,
          );
        }
      } catch (err) {
        console.error("[Pricing] Live pricing fetch error:", err);
      }
    }

    fetchFromSheet();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("user_selected_plan");
      if (stored) {
        setSelectedPlan(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    }

    const handleExternalPlanChange = (e) => {
      setSelectedPlan(e.detail || null);
    };

    window.addEventListener("plan_selected", handleExternalPlanChange);
    window.addEventListener("fitness_plan_selected", handleExternalPlanChange);

    return () => {
      window.removeEventListener("plan_selected", handleExternalPlanChange);
      window.removeEventListener(
        "fitness_plan_selected",
        handleExternalPlanChange,
      );
    };
  }, []);

  const rawPlans =
    livePlans?.[lang] ||
    (plans && plans.length > 0
      ? plans
      : PRICING_PLANS[lang] || PRICING_PLANS.ar);

  // تفکیک پلن‌های آنلاین و پلن حضوری باشگاه
  const onlinePlans = rawPlans.filter(
    (p) => p.id !== "in_gym_vip" && p.id !== "nutrition_only",
  );
  const inGymPlan = rawPlans.find((p) => p.id === "in_gym_vip");

  const handleSelectPlan = useCallback(
    (plan) => {
      setSelectedPlan(plan);

      const payload = {
        id: plan.id,
        title: plan.title,
        price: plan.price,
        duration: plan.duration,
        lang: lang,
        timestamp: new Date().toISOString(),
      };

      try {
        sessionStorage.setItem("user_selected_plan", JSON.stringify(payload));
        const encoded = encodeURIComponent(JSON.stringify(payload));
        document.cookie = `user_selected_plan=${encoded}; path=/; max-age=604800; SameSite=Lax`;

        window.dispatchEvent(
          new CustomEvent("plan_selected", { detail: payload }),
        );
        window.dispatchEvent(
          new CustomEvent("fitness_plan_selected", { detail: payload }),
        );
      } catch (err) {
        console.error("Storage error:", err);
      }
    },
    [lang],
  );

  return (
    <section
      id="pricing"
      className="relative w-full border-t border-zinc-800/80 py-16 md:py-24 overflow-hidden bg-[#0c1012]"
    >
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -z-10 h-[500px] w-[500px] rounded-full bg-fitness-primary/5 blur-[160px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <span className="inline-block rounded-full border border-fitness-primary/30 bg-fitness-primary/10 px-4 py-1.5 text-xs font-bold text-fitness-primary mb-3 shadow-[0_0_15px_rgba(0,210,255,0.15)]">
            {ui.badge}
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            {ui.title}
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-zinc-400">{ui.subtitle}</p>

          <div className="mt-5 inline-flex items-center gap-2.5 rounded-2xl border border-fitness-primary/40 bg-fitness-primary/10 px-4 py-2 text-xs font-bold text-fitness-primary shadow-[0_0_20px_rgba(0,210,255,0.15)]">
            <GraduationCap className="h-4 w-4 shrink-0 text-fitness-primary" />
            <span>{ui.studentDiscountDesc}</span>
          </div>
        </div>

        {/* کارت‌های آنلاین */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto items-stretch">
          {onlinePlans.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              ui={ui}
              lang={lang}
              isSelected={selectedPlan?.id === plan.id}
              onSelect={handleSelectPlan}
            />
          ))}
        </div>

        {/* کارت بنتو تمرین حضوری */}
        {inGymPlan && (
          <div className="mt-10 max-w-4xl mx-auto rounded-[2.2rem] border border-zinc-800 bg-gradient-to-r from-zinc-950 via-[#0e1215] to-zinc-950 p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden">
            <div className="pointer-events-none absolute -end-20 -bottom-20 h-64 w-64 rounded-full bg-fitness-primary/10 blur-3xl" />

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
              <div className="max-w-2xl space-y-3">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-fitness-primary/40 bg-fitness-primary/10 px-3 py-1 text-xs font-black text-fitness-primary font-mono">
                    <Sparkles className="w-3.5 h-3.5 text-fitness-primary" />
                    <span>{ui.inGymBadge}</span>
                  </span>
                  <span className="text-xs text-zinc-400 font-bold bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full font-mono">
                    {inGymPlan.duration}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white">
                  {inGymPlan.title}
                </h3>

                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {ui.inGymDesc}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                  {inGymPlan.features.slice(0, 4).map((feat, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-xs text-zinc-300"
                    >
                      <Check className="w-3.5 h-3.5 text-fitness-primary shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-start lg:items-end justify-center shrink-0 border-t lg:border-t-0 lg:border-s border-zinc-800/80 pt-5 lg:pt-0 lg:ps-8 gap-3">
                <span className="text-3xl sm:text-4xl font-black text-fitness-primary font-mono drop-shadow-[0_0_15px_rgba(0,210,255,0.3)]">
                  {inGymPlan.price}
                </span>
                <button
                  type="button"
                  onClick={() => handleSelectPlan(inGymPlan)}
                  className={`cursor-pointer px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-black transition-all shadow-lg active:scale-95 ${
                    selectedPlan?.id === inGymPlan.id
                      ? "bg-white text-black shadow-[0_0_25px_rgba(255,255,255,0.4)]"
                      : "bg-fitness-primary text-black hover:bg-fitness-primary-hover shadow-[0_0_20px_rgba(0,210,255,0.3)]"
                  }`}
                >
                  {selectedPlan?.id === inGymPlan.id
                    ? ui.selectedBtn
                    : ui.inGymCta}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
