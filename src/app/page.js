// src/app/page.jsx
"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import FitnessCalculator from "@/components/FitnessCalculator";
import BookingForm from "@/components/BookingForm";
import ContactSection from "@/components/ContactSection";
import HeroSection from "@/components/HeroSection";
import MethodologySection from "@/components/MethodologySection";
import PricingSection from "@/components/PricingSection";
import FaqSection from "@/components/FaqSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import TransformationsCarousel from "@/components/TransformationsCarousel";
import BiomechanicsScanner from "@/components/BiomechanicsScanner";
import UnifiedFloatingDock from "@/components/UnifiedFloatingDock";

import {
  SERVICES,
  TRANSFORMATIONS,
  PRICING_PLANS,
  FAQS,
  PAGE_CONTENT,
} from "@/constants/fitnessData";
import PreBookingRequirements from "@/components/PreBookingRequirements";

const CURRENT_YEAR = new Date().getFullYear();

export default function FitnessLandingPage() {
  const [lang, setLang] = useState("ar");

  // همگام‌سازی ویژگی‌های سند (dir و lang) با تغییر زبان
  useEffect(() => {
    const isRtl = lang === "ar";
    document.documentElement.setAttribute("dir", isRtl ? "rtl" : "ltr");
    document.documentElement.setAttribute("lang", lang);
  }, [lang]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === "ar" ? "en" : "ar"));
  };

  const pageText = PAGE_CONTENT[lang] || PAGE_CONTENT.ar;

  return (
    <main className="flex flex-col items-center justify-between selection:bg-fitness-primary selection:text-black bg-[#0c1012] min-h-screen text-white relative">
      {/* ۰. نوبار حاوی دکمه سوئیچ زبان */}
      <Navbar lang={lang} onToggleLang={toggleLanguage} />

      {/* ۱. هیرو سکشن */}
      <HeroSection lang={lang} />

      {/* ۲. سرویس‌ها و متدولوژی علمی مربی */}
      <div id="methodology" className="w-full">
        <MethodologySection
          services={SERVICES[lang] || SERVICES.ar}
          lang={lang}
        />
      </div>

      {/* ۳. قبل و بعد شاگردان */}
      <TransformationsCarousel lang={lang} />

      {/* ۴. نظرات و بازخورد شاگردان */}
      <TestimonialsSection lang={lang} />

      {/* ۵. اسکنر بیومکانیک سه‌بعدی */}
      <div id="biomechanics" className="w-full">
        <BiomechanicsScanner lang={lang} />
      </div>

      {/* ۶. ماشین‌حساب BMR / TDEE */}
      <section
        id="calculator"
        className="w-full border-t border-zinc-800 py-16 md:py-20"
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <FitnessCalculator lang={lang} />
        </div>
      </section>

      {/* ۷. تعرفه‌ها و پکیج‌ها */}
      <div id="pricing" className="w-full">
        <PricingSection
          plans={PRICING_PLANS[lang] || PRICING_PLANS.ar}
          lang={lang}
        />
      </div>

      {/* ۸. سوالات متداول */}
      <div id="faq" className="w-full">
        <FaqSection faqs={FAQS[lang] || FAQS.ar} lang={lang} />
      </div>

      {/* ۹. راه‌های ارتباطی */}
      <ContactSection lang={lang} />

      {/* سکشن توضیحات و الزامات مربی */}
      <PreBookingRequirements lang={lang} />

      {/* ۱۰. فرم نهایی ثبت‌نام */}
      <section
        id="booking"
        className="w-full border-t border-zinc-800 py-16 md:py-20"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-black md:text-3xl text-white">
              {pageText.booking?.title || "ابدأ خطتك الرياضية الخاصة"}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-zinc-400">
              {pageText.booking?.subtitle ||
                "احجز استشارتك وبرنامجك التدريبي والتأهيلي المخصص"}
            </p>
          </div>
          <BookingForm lang={lang} />
        </div>
      </section>

      {/* ۱۱. فوتر */}
      <footer className="w-full border-t border-zinc-800 bg-zinc-950 py-8 text-center text-xs text-zinc-400">
        <div className="mx-auto max-w-6xl px-6">
          <p>
            © {CURRENT_YEAR}{" "}
            {pageText.footer?.rights ||
              "جميع الحقوق محفوظة للكابتن عبدالرحمن الحوطي"}
          </p>
          <p className="mt-2 font-mono text-[11px] text-fitness-primary">
            {pageText.footer?.developedBy || "Evidence-Based Athletic Coaching"}
          </p>
        </div>
      </footer>

      {/* ۱۲. نوار شیشه‌ای شناور تجمیعی (نمایش در سراسر صفحه و محو شدن خودکار در #booking) */}
      <UnifiedFloatingDock lang={lang} />
    </main>
  );
}
