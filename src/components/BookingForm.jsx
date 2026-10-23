// src/components/BookingForm.jsx
"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Activity,
  Flame,
  Sparkles,
  ShieldCheck,
  Check,
  X,
  User,
  Phone,
  Target,
  Dumbbell,
  FileText,
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Calendar,
  AlertCircle,
} from "lucide-react";
import { PRICING_PLANS } from "@/constants/fitnessData";

// لیست کشورهای عربی و پیش‌شماره‌ها با پیش‌فرض کویت
const ARAB_COUNTRIES = [
  { code: "+965", flag: "🇰🇼", nameAr: "الكويت", nameEn: "Kuwait" },
  { code: "+966", flag: "🇸🇦", nameAr: "السعودية", nameEn: "Saudi Arabia" },
  { code: "+971", flag: "🇦🇪", nameAr: "الإمارات", nameEn: "UAE" },
  { code: "+974", flag: "🇶🇦", nameAr: "قطر", nameEn: "Qatar" },
  { code: "+973", flag: "🇧🇭", nameAr: "البحرين", nameEn: "Bahrain" },
  { code: "+968", flag: "🇴🇲", nameAr: "عُمان", nameEn: "Oman" },
  { code: "+20", flag: "🇪🇬", nameAr: "مصر", nameEn: "Egypt" },
  { code: "+962", flag: "🇯🇴", nameAr: "الأردن", nameEn: "Jordan" },
  { code: "+964", flag: "🇮🇶", nameAr: "العراق", nameEn: "Iraq" },
];

const BOOKING_UI_TEXT = {
  ar: {
    sectionBadge: "الخطوة النهائية نحو أهدافك",
    sectionTitle: "استمارة التسجيل واعتماد الملف الفسيولوجي",
    sectionSubtitle:
      "تم ربط جميع بياناتك الحيوية وأولويات فحصك الحركي تلقائياً بهذه الاستمارة لتصل للكابتن عبدالرحمن كاملة بدقة.",

    // بج‌های بالای فرم
    badgesContainerTitle: "البيانات المسجلة تلقائياً من جولتك في الموقع:",
    badgeBiomechanicsTitle: "فحص السلسلة الحركية والمفاصل",
    badgeCalculatorTitle: "التحليل الأيضي والهدف البدني",
    badgePlanTitle: "الباقة المختارة",
    screeningFocusLabel: "أولوية الفحص:",
    targetKcalLabel: "السعرات المستهدفة:",
    forecastLabel: "الهدف بعد 12 أسبوعاً:",
    dismissBadge: "إلغاء الإرفاق",

    // بخش‌های فرم
    planSectionTitle: "تأكيد الباقة التدريبية",
    nameLabel: "الاسم الكامل",
    namePlaceholder: "مثال: عبدالمحسن المطيري",
    phoneLabel: "رقم الواتساب (للتواصل المباشر واستلام الخطة)",
    phonePlaceholder: "6222 2832",
    goalLabel: "الهدف الأساسي من الاشتراك",
    experienceLabel: "الخبرة في تمارين المقاومة والحديد",
    trainingDaysLabel: "كم يوماً تفضل التمرين أسبوعياً؟",
    trainingDaysUnit: "أيام",
    notesLabel: "الحالة الصحية، الإصابات، أو ملخص الفحوصات (اختياري)",
    notesPlaceholder:
      "اذكر أي إصابات مسبقة (ديسك، آلام مفاصل)، أمراض مزمنة، أو أبرز نتائج تحاليل الدم الأخيرة ليتم مراعاتها بدقة في جدولك...",

    submitLoading: "جاري ربط الملف وإرسال البيانات للأنظمة الفسيولوجية...",
    submitPrefix: "تأكيد حجز",
    submitSuffix: "والبدء مع الكابتن",
    defaultError: "حدث خطأ أثناء معالجة البيانات، يرجى المحاولة لاحقاً.",
    unexpectedError: "تعذر الاتصال بالخادم، يرجى إعادة المحاولة.",
    calcRequiredError:
      "يرجى إكمال بيانات الحاسبة البدنية أولاً ليتمكن الكابتن من تحديد خطتك بدقة.",
    goToCalcBtn: "الانتقال للحاسبة الآن",

    success: {
      title: "تم استلام ملفك الرياضي بنجاح!",
      confirmed: "الباقة المعتمدة:",
      desc: "تم تسجيل كافة بياناتك الحيوية وأولويات فحصك الحركي في قاعدة بيانات الكابتن عبدالرحمن. يمكنك بدء المحادثة وتأكيد اشتراكك الآن بلمسة واحدة عبر واتساب.",
      whatsappBtn: "فتح محادثة واتساب المباشرة مع الكابتن",
      newFormBtn: "تسجيل استمارة جديدة",
      fileIdLabel: "رقم الملف التدريبي:",
      waHello: "مرحباً كابتن عبدالرحمن 👋",
      waIm: "أنا",
      waRegistered: "أتممت التسجيل عبر موقعك الرسمي في باقة:",
      waBiometricsHeader: "📊 ملخص تقريري البدني والحركي:",
      waBioZone: "نقطة التركيز الحركي:",
      waBioFocus: "أولوية المراجعة:",
      waTargetCal: "السعرات المبرمجة:",
      waWeight: "الوزن الحالي:",
      waTrainingDays: "أيام التمرين المحددة:",
      waReady: "بانتظار مراجعتك واعتماد برنامجي المخصص للبدء معك إن شاء الله.",
    },

    goals: [
      { id: "cut", label: "خسارة الدهون والتنشيف العضلي الصافي" },
      { id: "bulk", label: "الضخامة والبناء العضلي بدون دهون زائدة" },
      { id: "maintain", label: "إعادة تشكيل القوام ورفع اللياقة والتحمل" },
      { id: "competition", label: "الإعداد الرياضي والتأهيل الميداني" },
    ],
    experienceLevels: [
      { id: "beginner", label: "مبتدئ (أقل من 6 أشهر)" },
      { id: "intermediate", label: "متوسط (1 إلى 3 سنوات)" },
      { id: "advanced", label: "متقدم (أكثر من 3 سنوات)" },
    ],
    trainingDaysOptions: [
      { id: "3", label: "٣ أيام", sub: "مناسب للمبتدئين" },
      { id: "4", label: "٤ أيام", sub: "توازن مثالي" },
      { id: "5", label: "٥ أيام", sub: "كثافة تدريبية" },
      { id: "6", label: "٦ أيام", sub: "رياضي متقدم" },
    ],
  },
  en: {
    sectionBadge: "Final Step",
    sectionTitle: "Application & Athletic Onboarding",
    sectionSubtitle:
      "All your dynamic assessments, movement screening priorities, and targets are synced and pinned to this form.",
    badgesContainerTitle: "Auto-Captured Metrics & Audits from Your Session:",
    badgeBiomechanicsTitle: "Kinetic Chain Screening (3D)",
    badgeCalculatorTitle: "Metabolic Blueprint",
    badgePlanTitle: "Selected Tier",
    screeningFocusLabel: "Screening Focus:",
    targetKcalLabel: "Target Calories:",
    forecastLabel: "12-Week Target:",
    dismissBadge: "Remove",

    planSectionTitle: "Confirm Coaching Plan",
    nameLabel: "Full Name",
    namePlaceholder: "e.g. David Miller",
    phoneLabel: "WhatsApp Phone (For Instant Onboarding)",
    phonePlaceholder: "6222 2832",
    goalLabel: "Primary Objective",
    experienceLabel: "Resistance Training Experience",
    trainingDaysLabel: "Preferred Workout Days Per Week",
    trainingDaysUnit: "Days",
    notesLabel: "Medical History, Injuries, or Lab Notes (Optional)",
    notesPlaceholder:
      "Mention any past injuries, chronic conditions, or key highlights from your recent lab tests...",

    submitLoading: "Encrypting file & synchronizing systems...",
    submitPrefix: "Confirm Enrollment in",
    submitSuffix: "and Start Now",
    defaultError: "Error submitting your assessment. Please try again.",
    unexpectedError: "Unexpected server error. Please try again.",
    calcRequiredError:
      "Please complete the Biometric Calculator above before submitting your registration.",
    goToCalcBtn: "Go to Calculator",

    success: {
      title: "Assessment Successfully Logged!",
      confirmed: "Confirmed Tier:",
      desc: "Your complete kinetic chain screening profile and metabolic roadmap have been delivered to Coach Abdulrahman's system.",
      whatsappBtn: "Open Instant WhatsApp Chat with Coach",
      newFormBtn: "Submit Another Request",
      fileIdLabel: "Client File ID:",
      waHello: "Hello Coach Abdulrahman 👋",
      waIm: "I am",
      waRegistered: "I completed my registration on your platform for:",
      waBiometricsHeader: "📊 My Physical Profile Summary:",
      waBioZone: "Biomechanical Focus:",
      waBioFocus: "Screening Priority:",
      waTargetCal: "Target Intake:",
      waWeight: "Current Weight:",
      waTrainingDays: "Target Training Days:",
      waReady: "Looking forward to receiving my customized program.",
    },

    goals: [
      { id: "cut", label: "Fat Loss & Muscle Definition (Cut)" },
      { id: "bulk", label: "Lean Muscle Hypertrophy (Bulk)" },
      { id: "maintain", label: "Recomposition & Athletic Fitness" },
      { id: "competition", label: "Sports Performance & Conditioning" },
    ],
    experienceLevels: [
      { id: "beginner", label: "Beginner (< 6 months)" },
      { id: "intermediate", label: "Intermediate (1–3 years)" },
      { id: "advanced", label: "Advanced (> 3 years)" },
    ],
    trainingDaysOptions: [
      { id: "3", label: "3 Days", sub: "Recovery Focused" },
      { id: "4", label: "4 Days", sub: "Balanced Split" },
      { id: "5", label: "5 Days", sub: "High Frequency" },
      { id: "6", label: "6 Days", sub: "Athletic Volume" },
    ],
  },
};

export default function BookingForm({ lang = "ar" }) {
  const isRtl = lang === "ar";
  const ui = BOOKING_UI_TEXT[lang] || BOOKING_UI_TEXT.ar;
  const availablePlans = PRICING_PLANS[lang] || PRICING_PLANS.ar;

  // ۱. پیش‌شماره کشور (پیش‌فرض کویت)
  const [countryCode, setCountryCode] = useState("+965");

  // ۲. استیت فرم پایه
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    selectedPlanId: availablePlans[1]?.id || "pro",
    goal: "cut",
    experience: "beginner",
    trainingDays: "4",
    notes: "",
  });

  // ۳. استیت‌های ذخیره‌شده از سکشن‌های دیگر
  const [calcData, setCalcData] = useState(null);
  const [biomechanicsData, setBiomechanicsData] = useState(null);
  const [selectedPlanMeta, setSelectedPlanMeta] = useState(null);

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: "",
    isCalcMissing: false,
  });
  const [resultMeta, setResultMeta] = useState({ coachPhone: "", fileId: "" });

  useEffect(() => {
    try {
      const storedCalc = sessionStorage.getItem("user_fitness_data");
      if (storedCalc) setCalcData(JSON.parse(storedCalc));

      const storedBio = sessionStorage.getItem("user_biomechanics_audit");
      if (storedBio) setBiomechanicsData(JSON.parse(storedBio));

      const storedPlan = sessionStorage.getItem("user_selected_plan");
      if (storedPlan) {
        const parsed = JSON.parse(storedPlan);
        setSelectedPlanMeta(parsed);
        if (parsed.id)
          setFormData((prev) => ({ ...prev, selectedPlanId: parsed.id }));
      }
    } catch (e) {
      console.warn("Storage sync error:", e);
    }

    const handleCalcUpdate = (e) => {
      if (e?.detail) {
        setCalcData(e.detail);
        setStatus((prev) => ({ ...prev, isCalcMissing: false, error: "" }));
        if (e.detail.result?.goalKey) {
          setFormData((prev) => ({ ...prev, goal: e.detail.result.goalKey }));
        }
      } else {
        setCalcData(null);
      }
    };

    const handleBioUpdate = (e) => {
      if (e?.detail) setBiomechanicsData(e.detail);
    };

    const handlePlanSelect = (e) => {
      const plan = e?.detail;
      if (plan) {
        setSelectedPlanMeta(plan);
        const planId = plan.id || plan.planId;
        if (planId) {
          setFormData((prev) => ({ ...prev, selectedPlanId: planId }));
        }
      }
    };

    window.addEventListener("fitness_calc_updated", handleCalcUpdate);
    window.addEventListener("biomechanics_audit_updated", handleBioUpdate);
    window.addEventListener("plan_selected", handlePlanSelect);
    window.addEventListener("fitness_plan_selected", handlePlanSelect);

    return () => {
      window.removeEventListener("fitness_calc_updated", handleCalcUpdate);
      window.removeEventListener("biomechanics_audit_updated", handleBioUpdate);
      window.removeEventListener("plan_selected", handlePlanSelect);
      window.removeEventListener("fitness_plan_selected", handlePlanSelect);
    };
  }, []);

  const handleRemoveBiomechanics = useCallback(() => {
    try {
      sessionStorage.removeItem("user_biomechanics_audit");
      document.cookie = "user_biomechanics_audit=; path=/; max-age=0";
    } catch (_) {}
    setBiomechanicsData(null);
  }, []);

  const handleRemoveCalculator = useCallback(() => {
    try {
      sessionStorage.removeItem("user_fitness_data");
    } catch (_) {}
    setCalcData(null);
  }, []);

  const handleRemovePlan = useCallback(() => {
    try {
      sessionStorage.removeItem("user_selected_plan");
      document.cookie = "user_selected_plan=; path=/; max-age=0";
    } catch (_) {}
    setSelectedPlanMeta(null);
  }, []);

  const currentPlan =
    availablePlans.find((p) => p.id === formData.selectedPlanId) ||
    availablePlans[1] ||
    availablePlans[0];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const scrollToCalculator = () => {
    const calcEl = document.getElementById("calculator");
    if (calcEl) {
      calcEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // سابمیت فرم
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({
      loading: true,
      success: false,
      error: "",
      isCalcMissing: false,
    });

    // ۱. بررسی داده‌های ماشین‌حساب
    let currentStats = calcData;
    if (!currentStats) {
      try {
        const stored = sessionStorage.getItem("user_fitness_data");
        if (stored) currentStats = JSON.parse(stored);
      } catch (err) {
        console.error(err);
      }
    }

    // اگر ماشین حساب خالی بود: تنها نمایش پیام هشدار در همین بخش بدون اسکرول خودکار
    if (!currentStats || !currentStats.result || !currentStats.weight) {
      setStatus({
        loading: false,
        success: false,
        error: ui.calcRequiredError,
        isCalcMissing: true,
      });
      return;
    }

    // ۲. دریافت دیتای بیومکانیک
    let currentBio = biomechanicsData;
    if (!currentBio) {
      try {
        const storedBio = sessionStorage.getItem("user_biomechanics_audit");
        if (storedBio) currentBio = JSON.parse(storedBio);
      } catch (_) {}
    }

    // ۳. متادیتا پلن انتخابی
    let currentStoredPlan = selectedPlanMeta;
    if (!currentStoredPlan) {
      try {
        const storedPlan = sessionStorage.getItem("user_selected_plan");
        if (storedPlan) currentStoredPlan = JSON.parse(storedPlan);
      } catch (_) {}
    }

    const finalPlanTitle = currentStoredPlan?.title || currentPlan.title;
    const finalPlanPrice = currentStoredPlan?.price || currentPlan.price || "-";
    const finalPlanDuration =
      currentStoredPlan?.duration || currentPlan.duration || "-";

    const currentGoalLabel =
      ui.goals.find((g) => g.id === formData.goal)?.label || formData.goal;
    const currentExpLabel =
      ui.experienceLevels.find((exp) => exp.id === formData.experience)
        ?.label || formData.experience;

    const cleanLocalPhone = formData.phone.trim().replace(/^0+/, "");
    const fullPhoneNumber = `${countryCode}${cleanLocalPhone}`;

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: fullPhoneNumber,
          selectedPlan: finalPlanTitle,
          planPrice: finalPlanPrice,
          planDuration: finalPlanDuration,
          goal: currentGoalLabel,
          goalKey: formData.goal,
          experience: currentExpLabel,
          trainingDays: formData.trainingDays,
          notes: formData.notes,
          calculatedStats: currentStats,
          biomechanics: currentBio || null,
          locale: lang,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || ui.defaultError);
      }

      setResultMeta({
        coachPhone:
          data.coachPhone || process.env.NEXT_PUBLIC_COACH_WHATSAPP_PHONE || "",
        fileId: data.fileId || "",
      });
      setStatus({
        loading: false,
        success: true,
        error: "",
        isCalcMissing: false,
      });
    } catch (err) {
      setStatus({
        loading: false,
        success: false,
        error: err.message || ui.unexpectedError,
        isCalcMissing: false,
      });
    }
  };

  // کارت موفقیت
  if (status.success) {
    const cleanCoachPhone = resultMeta.coachPhone
      .replace(/\+/g, "")
      .replace(/\s/g, "");

    const bioZoneName = isRtl
      ? biomechanicsData?.nameAr || biomechanicsData?.name
      : biomechanicsData?.nameEn || biomechanicsData?.name;

    const bioBadge = isRtl
      ? biomechanicsData?.badgeAr ||
        biomechanicsData?.screeningFocus ||
        biomechanicsData?.riskReduction
      : biomechanicsData?.badgeEn ||
        biomechanicsData?.screeningFocus ||
        biomechanicsData?.riskReduction;

    const bioText = biomechanicsData
      ? `\n${ui.success.waBioZone} *${bioZoneName}* (${bioBadge})`
      : "";

    const calText = calcData?.result?.targetCalories
      ? `\n${ui.success.waTargetCal} ${calcData.result.targetCalories} kcal`
      : "";

    const weightText = calcData?.weight
      ? `\n${ui.success.waWeight} ${calcData.weight} kg`
      : "";

    const trainingDaysText = formData.trainingDays
      ? `\n${ui.success.waTrainingDays} ${formData.trainingDays} ${ui.trainingDaysUnit}`
      : "";

    const waMessage = `${ui.success.waHello}\n${ui.success.waIm} *${formData.name}*، ${ui.success.waRegistered}\n📌 *${currentPlan.title}* (${currentPlan.duration})\n📋 ${ui.success.fileIdLabel} \`\`\`${resultMeta.fileId}\`\`\`\n\n${ui.success.waBiometricsHeader}${weightText}${calText}${trainingDaysText}${bioText}\n\n${ui.success.waReady}`;

    const waLink = cleanCoachPhone
      ? `https://wa.me/${cleanCoachPhone}?text=${encodeURIComponent(waMessage)}`
      : `https://wa.me/?text=${encodeURIComponent(waMessage)}`;

    return (
      <div className="relative overflow-hidden rounded-[2.5rem] border border-zinc-800 bg-gradient-to-b from-zinc-950 via-zinc-950 to-black p-8 text-center shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_50px_rgba(0,210,255,0.12)] md:p-12">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-fitness-primary/40 bg-zinc-900 text-fitness-primary shadow-[0_0_25px_rgba(0,210,255,0.25)]">
          <Check className="h-8 w-8 stroke-[3]" />
        </div>

        <span className="mt-5 inline-block font-mono text-xs font-bold text-fitness-primary">
          {ui.success.fileIdLabel} {resultMeta.fileId}
        </span>

        <h3 className="mt-2 text-2xl font-black text-white sm:text-3xl">
          {ui.success.title}
        </h3>

        <p className="mx-auto mt-2 text-sm font-bold text-fitness-primary">
          {ui.success.confirmed} {currentPlan.title} ({currentPlan.duration})
        </p>

        <p className="mx-auto mt-3 max-w-lg text-xs leading-relaxed text-zinc-400 sm:text-sm">
          {ui.success.desc}
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-fitness-primary via-fitness-primary-hover to-fitness-accent px-8 py-4 text-sm font-black text-black shadow-[0_0_30px_rgba(0,210,255,0.35)] transition-all hover:shadow-[0_0_40px_rgba(0,210,255,0.5)] active:scale-[0.98] sm:w-auto"
          >
            <span>{ui.success.whatsappBtn}</span>
            <ExternalLink className="h-4 w-4" />
          </a>

          <button
            type="button"
            onClick={() => {
              setFormData({
                name: "",
                phone: "",
                selectedPlanId: availablePlans[1]?.id || "pro",
                goal: "cut",
                experience: "beginner",
                trainingDays: "4",
                notes: "",
              });
              setCalcData(null);
              setBiomechanicsData(null);
              setSelectedPlanMeta(null);
              setStatus({
                loading: false,
                success: false,
                error: "",
                isCalcMissing: false,
              });
            }}
            className="w-full cursor-pointer rounded-2xl border border-zinc-800 bg-zinc-900/80 px-6 py-4 text-xs font-bold text-zinc-300 transition-colors hover:border-zinc-700 hover:text-white sm:w-auto"
          >
            {ui.success.newFormBtn}
          </button>
        </div>
      </div>
    );
  }

  const hasAnyBadge = Boolean(biomechanicsData || calcData || selectedPlanMeta);

  return (
    <div
      id="booking"
      className="relative overflow-hidden rounded-[2.5rem] border border-zinc-800 bg-gradient-to-b from-zinc-950/95 via-[#0c1012] to-black p-6 shadow-[0_25px_60px_rgba(0,0,0,0.85)] md:p-10"
    >
      <div className="pointer-events-none absolute -top-24 -start-24 h-72 w-72 rounded-full bg-fitness-primary/10 blur-[120px]" />

      {/* سربرگ فرم */}
      <div className="mb-8 border-b border-zinc-800/80 pb-6 text-start">
        <span className="inline-block rounded-full border border-fitness-primary/30 bg-fitness-primary/10 px-3 py-1 font-mono text-[11px] font-bold text-fitness-primary">
          {ui.sectionBadge}
        </span>
        <h2 className="mt-2 text-2xl sm:text-3xl font-black text-white tracking-tight">
          {ui.sectionTitle}
        </h2>
        <p className="mt-1.5 text-xs sm:text-sm text-zinc-400 font-medium leading-relaxed">
          {ui.sectionSubtitle}
        </p>
      </div>

      {/* بخش بج‌های زنده */}
      {hasAnyBadge && (
        <div className="mb-8 space-y-3 rounded-3xl border border-fitness-primary/30 bg-gradient-to-b from-zinc-900/80 via-zinc-950 to-black p-4 sm:p-5 shadow-[0_0_30px_rgba(0,210,255,0.08)]">
          <div className="flex items-center gap-2 text-xs font-bold text-fitness-primary">
            <Sparkles className="h-4 w-4" />
            <span>{ui.badgesContainerTitle}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
            {/* ۱. بج فحص بیومکانیک */}
            {biomechanicsData && (
              <div className="group relative flex flex-col justify-between rounded-2xl border border-fitness-primary/40 bg-black/60 p-3.5 backdrop-blur-md transition-all hover:border-fitness-primary">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-black text-fitness-primary font-mono">
                      <Activity className="h-3.5 w-3.5" />
                      <span>{ui.badgeBiomechanicsTitle}</span>
                    </span>
                    <button
                      type="button"
                      onClick={handleRemoveBiomechanics}
                      className="cursor-pointer rounded-lg p-1 text-zinc-500 hover:bg-zinc-800 hover:text-red-400"
                      title={ui.dismissBadge}
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <h4 className="mt-1.5 text-xs font-bold text-white">
                    {isRtl
                      ? biomechanicsData.nameAr || biomechanicsData.name
                      : biomechanicsData.nameEn || biomechanicsData.name}
                  </h4>

                  <p className="mt-1 line-clamp-2 text-[10px] text-zinc-400">
                    {isRtl
                      ? biomechanicsData.overviewAr ||
                        biomechanicsData.dysfunctionAr ||
                        biomechanicsData.overview
                      : biomechanicsData.overviewEn ||
                        biomechanicsData.dysfunctionEn ||
                        biomechanicsData.overview}
                  </p>
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-zinc-800/80 pt-2 text-[10px]">
                  <span className="text-zinc-500">
                    {ui.screeningFocusLabel}
                  </span>
                  <span className="font-mono font-bold text-fitness-primary truncate max-w-[65%] text-end">
                    {isRtl
                      ? biomechanicsData.badgeAr ||
                        biomechanicsData.screeningFocus ||
                        biomechanicsData.riskReduction
                      : biomechanicsData.badgeEn ||
                        biomechanicsData.screeningFocus ||
                        biomechanicsData.riskReduction}
                  </span>
                </div>
              </div>
            )}

            {/* ۲. بج ماشین‌حساب */}
            {calcData && (
              <div className="group relative flex flex-col justify-between rounded-2xl border border-fitness-primary/40 bg-black/60 p-3.5 backdrop-blur-md transition-all hover:border-fitness-primary">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-black text-fitness-primary font-mono">
                      <Flame className="h-3.5 w-3.5" />
                      <span>{ui.badgeCalculatorTitle}</span>
                    </span>
                    <button
                      type="button"
                      onClick={handleRemoveCalculator}
                      className="cursor-pointer rounded-lg p-1 text-zinc-500 hover:bg-zinc-800 hover:text-red-400"
                      title={ui.dismissBadge}
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <div className="mt-1.5 flex items-baseline gap-2">
                    <span className="font-mono text-xl font-black text-white">
                      {calcData.result?.targetCalories ||
                        calcData.result?.tdee ||
                        "-"}
                    </span>
                    <span className="font-mono text-[10px] text-fitness-primary">
                      KCAL
                    </span>
                    <span className="text-[11px] text-zinc-400 font-semibold ms-auto truncate">
                      {calcData.weight}kg • {calcData.height}cm
                    </span>
                  </div>
                  <p className="mt-1 text-[10px] text-zinc-400 truncate">
                    {calcData.result?.goal || calcData.goal}
                  </p>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-zinc-800/80 pt-2 text-[10px]">
                  <span className="text-zinc-500">{ui.forecastLabel}</span>
                  <span className="font-mono font-bold text-fitness-primary truncate">
                    {calcData.result?.projection?.estimatedWeight ||
                      "12 Wk Goal"}
                  </span>
                </div>
              </div>
            )}

            {/* ۳. بج پلن قیمتی */}
            {selectedPlanMeta && (
              <div className="group relative flex flex-col justify-between rounded-2xl border border-fitness-primary/40 bg-black/60 p-3.5 backdrop-blur-md transition-all hover:border-fitness-primary">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-black text-fitness-primary font-mono">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      <span>{ui.badgePlanTitle}</span>
                    </span>
                    <button
                      type="button"
                      onClick={handleRemovePlan}
                      className="cursor-pointer rounded-lg p-1 text-zinc-500 hover:bg-zinc-800 hover:text-red-400"
                      title={ui.dismissBadge}
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <h4 className="mt-1.5 text-xs font-bold text-white">
                    {selectedPlanMeta.title}
                  </h4>
                  <p className="mt-1 text-[10px] text-zinc-400">
                    {selectedPlanMeta.duration}
                  </p>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-zinc-800/80 pt-2 text-[10px]">
                  <span className="text-zinc-500">
                    {isRtl ? "القيمة:" : "Price:"}
                  </span>
                  <span className="font-mono text-xs font-black text-fitness-primary">
                    {selectedPlanMeta.price}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* فرم ثبت‌نام */}
      <form onSubmit={handleSubmit} className="space-y-6 text-start">
        {/* ۱. انتخاب باقه */}
        <div>
          <label className="mb-2.5 block text-xs font-bold text-white">
            {ui.planSectionTitle}{" "}
            <span className="text-fitness-primary">*</span>
          </label>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
            {availablePlans.map((plan) => {
              const isSelected = formData.selectedPlanId === plan.id;
              return (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      selectedPlanId: plan.id,
                    }))
                  }
                  className={`relative flex flex-col justify-between rounded-2xl border p-3.5 text-start transition-all cursor-pointer ${
                    isSelected
                      ? "border-fitness-primary bg-fitness-primary/10 shadow-[0_0_20px_rgba(0,210,255,0.2)] ring-1 ring-fitness-primary/60"
                      : "border-zinc-800 bg-zinc-950/60 hover:border-zinc-700"
                  }`}
                >
                  <div className="flex w-full items-center justify-between">
                    <span
                      className={`text-xs font-black ${
                        isSelected ? "text-fitness-primary" : "text-white"
                      }`}
                    >
                      {plan.title}
                    </span>
                    <span
                      className={`flex h-4 w-4 items-center justify-center rounded-full border transition-colors ${
                        isSelected
                          ? "border-fitness-primary bg-fitness-primary"
                          : "border-zinc-700"
                      }`}
                    >
                      {isSelected && (
                        <span className="h-1.5 w-1.5 rounded-full bg-black" />
                      )}
                    </span>
                  </div>
                  <div className="mt-2.5 flex items-baseline justify-between border-t border-zinc-800/80 pt-2 text-[11px]">
                    <span className="text-zinc-400">{plan.duration}</span>
                    <span className="font-mono font-bold text-white">
                      {plan.price}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ۲. نام و شماره تلفن همراه با پیش‌شماره */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="booking-name"
              className="mb-2 block text-xs font-medium text-zinc-300"
            >
              {ui.nameLabel} <span className="text-fitness-primary">*</span>
            </label>
            <div className="relative">
              <input
                id="booking-name"
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                placeholder={ui.namePlaceholder}
                className="w-full rounded-2xl border border-zinc-800 bg-zinc-950/80 p-3.5 text-sm text-white placeholder-zinc-600 outline-none transition-all focus:border-fitness-primary focus:ring-1 focus:ring-fitness-primary"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="booking-phone"
              className="mb-2 block text-xs font-medium text-zinc-300"
            >
              {ui.phoneLabel} <span className="text-fitness-primary">*</span>
            </label>
            <div className="relative flex rounded-2xl border border-zinc-800 bg-zinc-950/80 transition-all focus-within:border-fitness-primary focus-within:ring-1 focus-within:ring-fitness-primary">
              <div className="relative flex items-center border-e border-zinc-800 bg-zinc-900/60 rounded-s-2xl px-2.5">
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="cursor-pointer appearance-none bg-transparent pe-5 text-xs font-mono font-bold text-white outline-none"
                  dir="ltr"
                >
                  {ARAB_COUNTRIES.map((c) => (
                    <option
                      key={c.code}
                      value={c.code}
                      className="bg-zinc-900 text-white"
                    >
                      {c.flag} {c.code}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute end-2 text-[10px] text-zinc-500">
                  ▼
                </span>
              </div>

              <input
                id="booking-phone"
                type="tel"
                name="phone"
                required
                dir="ltr"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder={ui.phonePlaceholder}
                className="w-full bg-transparent p-3.5 font-mono text-sm text-white placeholder-zinc-600 outline-none"
              />
            </div>
          </div>
        </div>

        {/* ۳. هدف و سابقه تمرینی */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="booking-goal"
              className="mb-2 block text-xs font-medium text-zinc-300"
            >
              {ui.goalLabel}
            </label>
            <select
              id="booking-goal"
              name="goal"
              value={formData.goal}
              onChange={handleInputChange}
              className="w-full rounded-2xl border border-zinc-800 bg-zinc-950/80 p-3.5 text-sm text-white outline-none transition-colors focus:border-fitness-primary"
            >
              {ui.goals.map((g) => (
                <option
                  key={g.id}
                  value={g.id}
                  className="bg-zinc-900 text-white"
                >
                  {g.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <span className="mb-2 block text-xs font-medium text-zinc-300">
              {ui.experienceLabel}
            </span>
            <div className="grid grid-cols-3 gap-1.5">
              {ui.experienceLevels.map((exp) => (
                <button
                  key={exp.id}
                  type="button"
                  onClick={() =>
                    setFormData((p) => ({ ...p, experience: exp.id }))
                  }
                  className={`cursor-pointer rounded-xl border p-2.5 text-center text-[11px] font-bold transition-all ${
                    formData.experience === exp.id
                      ? "border-fitness-primary bg-fitness-primary/15 text-fitness-primary shadow-[0_0_12px_rgba(0,210,255,0.2)]"
                      : "border-zinc-800 bg-zinc-950/60 text-zinc-400 hover:border-zinc-700 hover:text-white"
                  }`}
                >
                  {exp.label.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ۴. فیلد روزهای تمرین در هفته */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-xs font-bold text-white flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-fitness-primary" />
              <span>{ui.trainingDaysLabel}</span>
            </label>
            <span className="font-mono text-xs font-black text-fitness-primary">
              {formData.trainingDays} {ui.trainingDaysUnit}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {ui.trainingDaysOptions.map((opt) => {
              const isSelected = formData.trainingDays === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, trainingDays: opt.id }))
                  }
                  className={`cursor-pointer flex flex-col items-center justify-center rounded-2xl border p-3 transition-all ${
                    isSelected
                      ? "border-fitness-primary bg-fitness-primary/15 text-fitness-primary shadow-[0_0_20px_rgba(0,210,255,0.25)] ring-1 ring-fitness-primary/60"
                      : "border-zinc-800 bg-zinc-950/70 text-zinc-300 hover:border-zinc-700"
                  }`}
                >
                  <span className="font-mono text-sm font-black">
                    {opt.label}
                  </span>
                  <span className="mt-0.5 text-[9px] text-zinc-500">
                    {opt.sub}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ۵. وضعیت سلامت و آسیب‌دیدگی‌ها */}
        <div>
          <label
            htmlFor="booking-notes"
            className="mb-2 block text-xs font-medium text-zinc-300"
          >
            {ui.notesLabel}
          </label>
          <textarea
            id="booking-notes"
            rows="4"
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            placeholder={ui.notesPlaceholder}
            className="w-full rounded-2xl border border-zinc-800 bg-zinc-950/80 p-3.5 text-sm text-white placeholder-zinc-600 outline-none transition-all focus:border-fitness-primary"
          />
        </div>

        {/* کادر هشدار و خطای تکمیل ماشین‌حساب (بدون اسکرول ناگهانی) */}
        {status.error && (
          <div
            className={`rounded-2xl border p-4 text-xs transition-all flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 ${
              status.isCalcMissing
                ? "border-amber-500/40 bg-amber-500/10 text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.15)]"
                : "border-rose-500/40 bg-rose-500/10 text-rose-300"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <span className="font-medium leading-relaxed">
                {status.error}
              </span>
            </div>
            {status.isCalcMissing && (
              <button
                type="button"
                onClick={scrollToCalculator}
                className="cursor-pointer shrink-0 rounded-xl bg-amber-400 px-3.5 py-2 text-[11px] font-black text-black transition-transform hover:scale-105 active:scale-95"
              >
                {ui.goToCalcBtn}
              </button>
            )}
          </div>
        )}

        {/* دکمه سابمیت */}
        <button
          type="submit"
          disabled={status.loading}
          className="relative flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-fitness-primary via-fitness-primary-hover to-fitness-accent py-4 text-center text-sm font-black text-black shadow-[0_0_35px_rgba(0,210,255,0.35)] transition-all hover:shadow-[0_0_45px_rgba(0,210,255,0.55)] active:scale-[0.98] disabled:opacity-50"
        >
          {status.loading ? (
            <div className="flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
              <span>{ui.submitLoading}</span>
            </div>
          ) : (
            <>
              <span>
                {ui.submitPrefix} {currentPlan.title} {ui.submitSuffix}
              </span>
              {isRtl ? (
                <ArrowLeft className="h-4 w-4" />
              ) : (
                <ArrowRight className="h-4 w-4" />
              )}
            </>
          )}
        </button>
      </form>
    </div>
  );
}
