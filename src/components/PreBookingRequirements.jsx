// src/components/PreBookingRequirements.jsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  FlaskConical,
  Scale,
  Camera,
  Moon,
  Clock,
  Sparkles,
  Info,
  CheckCircle2,
  Copy,
  Check,
  ShieldAlert,
} from "lucide-react";

const REQUIREMENTS_DATA = {
  ar: {
    badge: "بروتوكول التجهيز والمتابعة الأكاديمية",
    title: "متطلبات ما بعد التسجيل لتصميم خطتك الخاصة",
    subtitle:
      "لضمان دقة الحسابات الغذائية واختيار الأحمال التدريبية المناسبة لسلامتك، ستقوم بإرسال هذه البيانات مباشرة للكابتن عبدالرحمن عبر واتساب بعد إتمام الحجز.",
    testsCard: {
      tag: "فحوصات مخبرية دورية",
      title: "فحوصات الدم الشاملة المطلوبة",
      desc: "تساعد في كشف كفاءة الأيض، الهرمونات، ومستويات الفيتامينات لتصميم جدول غذائي ومكملات بدون أي ضرر صحي.",
      copyBtn: "نسخ قائمة الفحوصات للمختبر",
      copiedBtn: "تم نسخ القائمة ✓",
      list: [
        { en: "Complete Blood Count", ar: "فحص صورة الدم الكاملة (CBC)" },
        { en: "Lipid Profile", ar: "ملف الدهون والكولسترول الشامل" },
        { en: "Liver Profile", ar: "وظائف وإنزيمات الكبد" },
        { en: "Kidney Profile", ar: "وظائف وكفاءة الكلى" },
        { en: "Thyroid Profile", ar: "فحص نشاط الغدة الدرقية" },
        { en: "Iron & Ferritin Profile", ar: "مخزون ونسبة الحديد بالدم" },
        { en: "Vitamin D", ar: "فيتامين د (Vitamin D)" },
        { en: "Vitamin B12", ar: "فيتامين ب12 (Vitamin B12)" },
        { en: "HbA1c", ar: "تحليل السكر التراكمي" },
      ],
    },
    weighCard: {
      tag: "معايير القياس المعتمدة",
      title: "شروط أخذ الوزن الصافي بدقة",
      desc: "يجب تسجيل الوزن الصباحي وتوثيق الرقم لاعتماده في معادلات حرق الدهون وبناء العضلات:",
      rules: [
        {
          icon: Moon,
          title: "بعد نوم كافٍ وعميق",
          detail: "الاستيقاظ بعد 9 ساعات من النوم على الأقل لتوازن الهرمونات.",
        },
        {
          icon: Clock,
          title: "بعد دورة المياه مباشرة",
          detail:
            "أخذ الوزن فوراً بعد دخول الحمام (أعزكم الله) وتفريغ المثانة.",
        },
        {
          icon: Scale,
          title: "على الريق تماماً",
          detail: "قبل تناول أي وجبة وقبل شرب الماء أو القهوة الصباحية.",
        },
      ],
    },
    photoCard: {
      tag: "التوثيق البصري للقوام",
      title: "بروتوكول التصوير من 4 زوايا",
      desc: "إرسال صور واضحة بنفس شروط الميزان لرصد استقامة العمود الفقري والكتلة العضلية ومستوى الدهون:",
      angles: [
        {
          title: "من الأمام",
          desc: "Front View - استقامة تامة والذراعين على الجانبين",
        },
        { title: "الجانب الأيمن", desc: "Right Profile - زاوية جانبية كاملة" },
        { title: "من الخلف", desc: "Back View - إظهار عضلات الظهر والأكتاف" },
        { title: "الجانب الأيسر", desc: "Left Profile - زاوية جانبية متناظرة" },
      ],
      tip: "تنبيه: يتم التصوير بإضاءة واضحة بدون فلاتر وبنفس التوقيت الصباحي للميزان.",
    },
    footerNote:
      "جميع التقارير والصور تُعامل بسرية وأمانة تامة ويتم الاطلاع عليها شخصياً من قبل الكابتن عبدالرحمن فقط لبناء خطتك.",
  },
  en: {
    badge: "Academic Onboarding & Protocol",
    title: "Post-Registration Requirements for Your Custom Plan",
    subtitle:
      "To ensure accurate biometric nutrition targets and injury-free load prescription, you will send these data points directly to Capt. Abdulrahman via WhatsApp after booking.",
    testsCard: {
      tag: "Diagnostic Lab Panels",
      title: "Required Blood Chemistry Panels",
      desc: "Crucial for analyzing metabolic efficiency, hormonal balance, and micronutrient deficiencies.",
      copyBtn: "Copy Lab Checklist",
      copiedBtn: "Copied to Clipboard ✓",
      list: [
        { en: "Complete Blood Count", ar: "Complete Blood Count (CBC)" },
        {
          en: "Lipid Profile",
          ar: "Lipid Profile (Cholesterol & Triglycerides)",
        },
        { en: "Liver Profile", ar: "Comprehensive Liver Function" },
        { en: "Kidney Profile", ar: "Kidney Function & Electrolytes" },
        { en: "Thyroid Profile", ar: "Thyroid Panel (TSH / Free Hormones)" },
        { en: "Iron & Ferritin Profile", ar: "Serum Iron & Ferritin Reserves" },
        { en: "Vitamin D", ar: "Vitamin D (25-Hydroxy)" },
        { en: "Vitamin B12", ar: "Vitamin B12 Level" },
        { en: "HbA1c", ar: "Glycated Hemoglobin (HbA1c)" },
      ],
    },
    weighCard: {
      tag: "Measurement Standards",
      title: "Fasted Weigh-In Conditions",
      desc: "Morning weight must be captured under strict baseline criteria for accurate TDEE calibration:",
      rules: [
        {
          icon: Moon,
          title: "Deep Sleep Baseline",
          detail: "Waking up after at least 9 hours of uninterrupted sleep.",
        },
        {
          icon: Clock,
          title: "Post-Restroom",
          detail: "Directly after morning restroom visit on an empty bladder.",
        },
        {
          icon: Scale,
          title: "Strictly Fasted",
          detail: "Before eating, drinking water, or having morning coffee.",
        },
      ],
    },
    photoCard: {
      tag: "Visual Posture Audit",
      title: "4-Angle Physique Assessment Protocol",
      desc: "High-resolution posture images taken under identical conditions to assess spinal alignment and symmetry:",
      angles: [
        {
          title: "Front View",
          desc: "Upright standing posture with relaxed arms",
        },
        {
          title: "Right Profile",
          desc: "90° side profile showing torso alignment",
        },
        { title: "Back View", desc: "Full posterior chain and lat symmetry" },
        { title: "Left Profile", desc: "90° contralateral side view" },
      ],
      tip: "Note: Capture in clear natural lighting with zero filters and uncompressed quality.",
    },
    footerNote:
      "All medical reports and physique photos are held strictly confidential and reviewed exclusively by Capt. Abdulrahman.",
  },
};

export default function PreBookingRequirements({ lang = "ar" }) {
  const isRtl = lang === "ar";
  const content = REQUIREMENTS_DATA[lang] || REQUIREMENTS_DATA.ar;
  const [copied, setCopied] = useState(false);

  const handleCopyTests = () => {
    const textList = content.testsCard.list
      .map((item, idx) => `${idx + 1}. ${item.en} (${item.ar})`)
      .join("\n");
    const fullText = `*فحوصات الدم المطلوبة - كابتن عبدالرحمن الحوطي*\n\n${textList}`;

    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      id="preparation-protocol"
      className="relative w-full border-t border-zinc-800/80 py-16 md:py-24 bg-[#0c1012] overflow-hidden"
    >
      {/* هاله مشکی و ملایم پس‌زمینه */}
      <div className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 -z-10 h-[500px] w-[500px] rounded-full bg-fitness-primary/5 blur-[160px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* هدر بخش: کاملاً مشکی با متون سفید/خاکستری و تنها بج آبی */}
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-fitness-primary/30 bg-fitness-primary/10 px-4 py-1.5 text-xs font-bold text-fitness-primary mb-3 shadow-[0_0_15px_rgba(0,210,255,0.15)]">
            <Sparkles className="w-3.5 h-3.5 text-fitness-primary" />
            <span>{content.badge}</span>
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            {content.title}
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-zinc-400 leading-relaxed">
            {content.subtitle}
          </p>
        </div>

        {/* چیدمان Bento Grid: تمام کارت‌ها با پس‌زمینه مشکی/زینک و بردرهای هماهنگ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-7 items-stretch">
          {/* کارت ۱: آزمایش‌های خون */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-[2.2rem] border border-zinc-800/90 bg-gradient-to-b from-zinc-950/90 to-[#0b0e11] p-6 sm:p-8 shadow-[0_15px_35px_rgba(0,0,0,0.6)] relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-fitness-primary/40 bg-fitness-primary/10 px-3 py-1 text-xs font-bold text-fitness-primary font-mono">
                  <FlaskConical className="w-3.5 h-3.5 text-fitness-primary" />
                  <span>{content.testsCard.tag}</span>
                </span>
                <span className="text-[11px] font-mono text-zinc-400 font-bold">
                  9 Key Biomarkers
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white">
                {content.testsCard.title}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed">
                {content.testsCard.desc}
              </p>

              {/* لیست آیتم‌ها در کادرهای مشکی زینک */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {content.testsCard.list.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 rounded-xl border border-zinc-800 bg-zinc-900/60 p-2.5 transition-colors hover:border-zinc-700"
                  >
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-zinc-800 text-fitness-primary text-[10px] font-mono font-bold">
                      {idx + 1}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-white truncate">
                        {item.en}
                      </p>
                      <p className="text-[10px] text-zinc-400 truncate">
                        {item.ar}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-zinc-800/80">
              <button
                type="button"
                onClick={handleCopyTests}
                className="w-full flex items-center justify-center gap-2 cursor-pointer rounded-xl border border-zinc-800 bg-zinc-900/80 py-3 px-4 text-xs font-bold text-zinc-200 transition-all hover:border-fitness-primary hover:text-white"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 stroke-[2.5] text-fitness-primary" />
                    <span className="text-fitness-primary">
                      {content.testsCard.copiedBtn}
                    </span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>{content.testsCard.copyBtn}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* کارت ۲: شروط وزن‌کشی ناشتا */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-[2.2rem] border border-zinc-800/90 bg-gradient-to-b from-zinc-950/90 to-[#0b0e11] p-6 sm:p-8 shadow-[0_15px_35px_rgba(0,0,0,0.6)] relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs font-bold text-zinc-300 font-mono">
                  <Scale className="w-3.5 h-3.5 text-fitness-primary" />
                  <span>{content.weighCard.tag}</span>
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white">
                {content.weighCard.title}
              </h3>
              <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                {content.weighCard.desc}
              </p>

              <div className="mt-6 space-y-3.5">
                {content.weighCard.rules.map((rule, idx) => {
                  const IconComponent = rule.icon;
                  return (
                    <div
                      key={idx}
                      className="flex items-start gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-3.5"
                    >
                      <div className="p-2 rounded-xl bg-zinc-800 border border-zinc-700/60 text-fitness-primary shrink-0 mt-0.5">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-black text-white">
                          {rule.title}
                        </h4>
                        <p className="mt-1 text-[11px] sm:text-xs text-zinc-400 leading-relaxed">
                          {rule.detail}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center gap-2">
              <Info className="w-4 h-4 text-fitness-primary shrink-0" />
              <span className="text-[11px] text-zinc-400">
                {isRtl
                  ? "توثيق الوزن بنفس الميزان أسبوعياً لمقارنة التقدم بدقة."
                  : "Use the identical scale weekly for consistent delta tracking."}
              </span>
            </div>
          </div>

          {/* کارت ۳: پروتکل عکاسی ۴ زاویه */}
          <div className="lg:col-span-12 rounded-[2.2rem] border border-zinc-800/90 bg-gradient-to-r from-zinc-950 via-[#0e1215] to-zinc-950 p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-fitness-primary/40 bg-fitness-primary/10 px-3 py-1 text-xs font-black text-fitness-primary font-mono">
                    <Camera className="w-3.5 h-3.5 text-fitness-primary" />
                    <span>{content.photoCard.tag}</span>
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white">
                  {content.photoCard.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {content.photoCard.desc}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {content.photoCard.angles.map((ang, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 rounded-xl border border-zinc-800 bg-zinc-900/60 p-3"
                    >
                      <CheckCircle2 className="w-4 h-4 text-fitness-primary shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-black text-white block">
                          {ang.title}
                        </span>
                        <span className="text-[11px] text-zinc-400">
                          {ang.desc}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-[11px] font-semibold text-zinc-400 flex items-center gap-1.5 pt-2">
                  <ShieldAlert className="w-3.5 h-3.5 text-fitness-primary shrink-0" />
                  <span>{content.photoCard.tip}</span>
                </p>
              </div>

              {/* قاب عکس نمونه مربی */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-[340px] sm:max-w-[380px] aspect-square rounded-2xl overflow-hidden border border-zinc-800 bg-black shadow-2xl group">
                  <Image
                    src="/images/16.jpg"
                    alt="Physique Assessment Guide - 4 Angles"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                    <span className="text-xs font-bold text-white/90 drop-shadow-md">
                      {isRtl
                        ? "النموذج القياسي المعتمد: الأمام، الخلف، والجانبين"
                        : "Approved Reference: Front, Back & Side Profiles"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* پیام پایانی */}
        <div className="mt-8 text-center max-w-2xl mx-auto">
          <p className="text-xs text-zinc-400 flex items-center justify-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-fitness-primary shrink-0" />
            <span>{content.footerNote}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
