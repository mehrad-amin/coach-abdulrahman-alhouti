// src/components/UnifiedFloatingDock.jsx
"use client";

import React, { useState, useEffect } from "react";
import {
  Activity,
  Flame,
  ShieldCheck,
  ArrowDown,
  X,
  Sparkles,
} from "lucide-react";

export default function UnifiedFloatingDock({ lang = "ar" }) {
  const isRtl = lang === "ar";

  const [biomechanics, setBiomechanics] = useState(null);
  const [calcData, setCalcData] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isNearBooking, setIsNearBooking] = useState(false);

  // لود اولیه از سشن
  useEffect(() => {
    try {
      const bio = sessionStorage.getItem("user_biomechanics_audit");
      if (bio) setBiomechanics(JSON.parse(bio));

      const calc = sessionStorage.getItem("user_fitness_data");
      if (calc) setCalcData(JSON.parse(calc));

      const plan = sessionStorage.getItem("user_selected_plan");
      if (plan) setSelectedPlan(JSON.parse(plan));
    } catch (e) {
      console.error(e);
    }

    const handleBioUpdate = (e) => setBiomechanics(e.detail || null);
    const handleCalcUpdate = (e) => setCalcData(e.detail || null);
    const handlePlanUpdate = (e) => setSelectedPlan(e.detail || null);

    window.addEventListener("biomechanics_audit_updated", handleBioUpdate);
    window.addEventListener("fitness_calc_updated", handleCalcUpdate);
    window.addEventListener("plan_selected", handlePlanUpdate);
    window.addEventListener("fitness_plan_selected", handlePlanUpdate);

    return () => {
      window.removeEventListener("biomechanics_audit_updated", handleBioUpdate);
      window.removeEventListener("fitness_calc_updated", handleCalcUpdate);
      window.removeEventListener("plan_selected", handlePlanUpdate);
      window.removeEventListener("fitness_plan_selected", handlePlanUpdate);
    };
  }, []);

  // ناظر اسکرول: مخفی‌سازی هنگام رسیدن به فرم #booking
  useEffect(() => {
    const bookingEl = document.getElementById("booking");
    if (!bookingEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsNearBooking(entry.isIntersecting);
      },
      { threshold: 0.1 },
    );

    observer.observe(bookingEl);
    return () => observer.disconnect();
  }, []);

  // در صورتی که کاربر هنوز هیچ تعاملی نداشته، چیزی رندر نمی‌شود
  const hasItems = Boolean(biomechanics || calcData || selectedPlan);
  // اگر کاربر هنوز هیچ گزینه‌ای را انتخاب نکرده یا به فرم رسیده، اصلاً رندر نشود:
  if (!hasItems || isNearBooking) {
    return null;
  }

  const scrollToBooking = () => {
    const el = document.getElementById("booking");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const bioDisplayName = isRtl
    ? biomechanics?.nameAr?.split(" ")[0] +
      " " +
      (biomechanics?.nameAr?.split(" ")[1] || "")
    : biomechanics?.nameEn?.split(" ")[0] || "";

  const planDisplayName =
    selectedPlan?.title?.split(" ")[0] +
    " " +
    (selectedPlan?.title?.split(" ")[1] || "");

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      className={`fixed bottom-[calc(0.75rem+env(safe-area-inset-bottom,0px))] sm:bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-1rem)] max-w-xl md:max-w-2xl z-50 transition-all duration-300 ease-out ${
        isNearBooking
          ? "opacity-0 translate-y-12 pointer-events-none"
          : "opacity-100 translate-y-0 pointer-events-auto"
      }`}
    >
      <div className="w-full rounded-2xl sm:rounded-3xl border border-fitness-primary/40 bg-zinc-950/95 backdrop-blur-2xl p-2.5 sm:p-3 shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_35px_rgba(34,197,94,0.2)]">
        <div className="flex items-center justify-between gap-2 sm:gap-3">
          {/* بخش بج‌ها: اسکرول شیک و بدون برهم‌ریختگی در تمام گوشی‌ها */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-0.5 min-w-0 flex-1">
            {/* ۱. بج آناتومی */}
            {biomechanics && (
              <div className="inline-flex items-center gap-1.5 shrink-0 rounded-xl bg-fitness-primary/10 border border-fitness-primary/30 px-2.5 py-1.5 text-white">
                <Activity className="w-3.5 h-3.5 text-fitness-primary animate-pulse shrink-0" />
                <span className="text-[11px] font-black truncate max-w-[100px] sm:max-w-[130px]">
                  {bioDisplayName}
                </span>
                <span className="text-[9px] font-mono text-fitness-primary font-bold bg-fitness-primary/15 px-1 rounded">
                  -{biomechanics.riskReduction}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    sessionStorage.removeItem("user_biomechanics_audit");
                    setBiomechanics(null);
                  }}
                  className="p-0.5 text-zinc-500 hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}

            {/* ۲. بج ماشین حساب */}
            {calcData && (
              <div className="inline-flex items-center gap-1.5 shrink-0 rounded-xl bg-zinc-900 border border-zinc-800 px-2.5 py-1.5 text-white">
                <Flame className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                <span className="text-[11px] font-mono font-black text-white">
                  {calcData.result?.targetCalories || calcData.result?.calories}
                </span>
                <span className="text-[9px] text-zinc-400 font-mono">KCAL</span>
                <button
                  type="button"
                  onClick={() => {
                    sessionStorage.removeItem("user_fitness_data");
                    setCalcData(null);
                  }}
                  className="p-0.5 text-zinc-500 hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}

            {/* ۳. بج باقه قیمتی */}
            {selectedPlan && (
              <div className="inline-flex items-center gap-1.5 shrink-0 rounded-xl bg-fitness-primary/15 border border-fitness-primary/40 px-2.5 py-1.5 text-white">
                <ShieldCheck className="w-3.5 h-3.5 text-fitness-primary shrink-0" />
                <span className="text-[11px] font-black truncate max-w-[90px] sm:max-w-[120px]">
                  {planDisplayName}
                </span>
                <span className="text-[10px] font-mono font-bold text-fitness-primary">
                  {selectedPlan.price}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    sessionStorage.removeItem("user_selected_plan");
                    setSelectedPlan(null);
                  }}
                  className="p-0.5 text-zinc-500 hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>

          {/* دکمه انتقال سریع به فرم ثبت‌نام در انتهای داک */}
          <button
            type="button"
            onClick={scrollToBooking}
            className="shrink-0 flex items-center justify-center gap-1.5 cursor-pointer rounded-xl bg-fitness-primary px-3 sm:px-4 py-2 text-[11px] sm:text-xs font-black text-black shadow-[0_0_15px_rgba(34,197,94,0.35)] transition-all hover:bg-emerald-400 active:scale-95 whitespace-nowrap"
          >
            <span>{isRtl ? "إتمام الحجز" : "Checkout"}</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </button>
        </div>
      </div>
    </div>
  );
}
