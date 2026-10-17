// src/components/FitnessCalculator.jsx
"use client";

import React, {
  useState,
  useEffect,
  useId,
  useSyncExternalStore,
  useMemo,
  useRef,
} from "react";
import {
  Flame,
  Scale,
  Zap,
  RotateCcw,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Activity,
  User,
  Check,
} from "lucide-react";
import { PAGE_CONTENT } from "@/constants/fitnessData";

const CALCULATOR_EXTENDED_UI = {
  ar: {
    scannerBadge: "BIO-SCANNER 4.0 | المحرك الأيضي والفسيولوجي",
    resetBtn: "إعادة ضبط",
    calculateBtn: "تحليل المؤشرات وتوليد خارطة التحول الشخصية",
    recalculateBtn: "تحديث الحساب وخارطة المسار",
    calculatingText: "جاري تحليل الاستجابة الأيضية ومعدل تخليق الأنسجة...",
    resultsTitle: "تقرير الاستجابة الأيضية وخارطة التحول (12 أسبوعاً)",
    targetLabel: "الهدف اليومي المقترح من السعرات:",
    kcalUnit: "KCAL / DAY",
    bmrLabel: "معدل الأيض BMR:",
    tdeeLabel: "الاحتياج الفعلي TDEE:",

    nutritionSection: "منهجية التغذية المتبعة:",
    nutritionOptions: [
      {
        id: "home",
        label: "أكل منزلي عادي بدون وزن دقيق",
        desc: "خيارات صحية عامة بدون ميزان طعام أو تتبع دقيق للماكروز",
      },
      {
        id: "coached",
        label: "نظام غذائي علمي مخصص ومحسوب الغرامات",
        desc: "خطة مخصصة تماماً وفق القياسات لرفع كفاءة التمثيل الغذائي",
      },
    ],

    supplementsSection: "استخدام المكملات الغذائية الرياضية:",
    supplementOptions: [
      {
        id: "none",
        label: "الاعتماد على الأغذية الطبيعية فقط",
        desc: "تغذية طبيعية بالكامل دون أي مساحيق بروتين أو كرياتين",
      },
      {
        id: "essential",
        label: "مكملات أساسية (بروتين واي + كرياتين + أوميغا 3)",
        desc: "تسريع ريكفري العضلات، زيادة تخزين الجليكوجين وحماية الألياف",
      },
    ],

    sectionBadge: "المسار الزمني والتحول التقديري",
    sectionTitle: "خارطة التغير البدني المبرمجة بدقة",
    tabWeek4: "الأسبوع 4",
    tabWeek8: "الأسبوع 8",
    tabWeek12: "الأسبوع 12",
    targetWeightLabel: "الوزن التقديري المتوقع:",
    deltaLabel: "صافي التغير التراكمي:",
    compositionLabel: "جودة التغير البدني:",

    disclaimer:
      "تنبيه علمي احترافي: هذه الأرقام تقديرية ومبنية على مبادئ ميكانیکا الأيض وتوازن الطاقة؛ تختلف النتائج الفعلية بحسب الجينات، ساعات النوم، ومعدل النشاط الحركي اليومي (NEAT).",

    ctaPrefix: "اعتماد خطة الـ",
    ctaSuffix: "سعرة ومتابعة التصفح",
    ctaPinnedPrefix: "تم تثبيت خطة الـ",
    ctaPinnedSuffix: "سعرة في الشريط السفلي ✓",
  },
  en: {
    scannerBadge: "BIO-SCANNER 4.0 | Advanced Physiological Engine",
    resetBtn: "Reset",
    calculateBtn: "Analyze Biometrics & Generate Personalized Roadmap",
    recalculateBtn: "Update Dynamic Projections",
    calculatingText: "Analyzing metabolic response & tissue synthesis rate...",
    resultsTitle: "Metabolic Blueprint & 12-Week Transformation Forecast",
    targetLabel: "Recommended Daily Caloric Intake:",
    kcalUnit: "KCAL / DAY",
    bmrLabel: "Basal Metabolism BMR:",
    tdeeLabel: "Total Maintenance TDEE:",

    nutritionSection: "Nutritional Approach & Dietary Discipline:",
    nutritionOptions: [
      {
        id: "home",
        label: "Standard Home Cooking (Unweighed)",
        desc: "General whole foods without a digital food scale or precision macro tracking",
      },
      {
        id: "coached",
        label: "Precision Macro Protocol (Gram-Calculated)",
        desc: "Bespoke meal plan tailored to maximize metabolic efficiency",
      },
    ],

    supplementsSection: "Ergogenic & Supplement Support:",
    supplementOptions: [
      {
        id: "none",
        label: "Whole Foods Only (Zero Supplements)",
        desc: "Natural whole food intake without Whey, Creatine, or adaptogens",
      },
      {
        id: "essential",
        label: "Performance Stack (Whey + Creatine + Omega 3)",
        desc: "Faster intra-muscular glycogen saturation & rapid anti-catabolic recovery",
      },
    ],

    sectionBadge: "Physiological Forecast",
    sectionTitle: "Engineered Transformation Roadmap",
    tabWeek4: "Week 4",
    tabWeek8: "Week 8",
    tabWeek12: "Week 12",
    targetWeightLabel: "Projected Target Weight:",
    deltaLabel: "Net Projected Change:",
    compositionLabel: "Tissue Quality Breakdown:",

    disclaimer:
      "Scientific Disclaimer: Projected figures are biometric estimations rooted in metabolic kinetics. Actual physiological response varies based on individual genetics, sleep hygiene, and daily NEAT.",

    ctaPrefix: "Lock In",
    ctaSuffix: "KCAL Protocol & Continue",
    ctaPinnedPrefix: "Pinned",
    ctaPinnedSuffix: "KCAL Protocol to Bottom Bar ✓",
  },
};

const subscribeSessionStorage = (callback) => {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
};

const getSessionSnapshot = () => {
  if (typeof window === "undefined") return "";
  try {
    return sessionStorage.getItem("user_fitness_data") || "";
  } catch {
    return "";
  }
};

const getServerSnapshot = () => "";

export default function FitnessCalculator({ lang = "ar" }) {
  const isRtl = lang === "ar";
  const t = PAGE_CONTENT[lang]?.calculator || PAGE_CONTENT.ar.calculator;
  const ui = CALCULATOR_EXTENDED_UI[lang] || CALCULATOR_EXTENDED_UI.ar;
  const activityLevels = t.activityLevels;

  const resultsRef = useRef(null);

  const sessionRaw = useSyncExternalStore(
    subscribeSessionStorage,
    getSessionSnapshot,
    getServerSnapshot,
  );

  const parsedInitial = useMemo(() => {
    if (!sessionRaw) return null;
    try {
      return JSON.parse(sessionRaw);
    } catch {
      return null;
    }
  }, [sessionRaw]);

  // پارامترهای ورودی
  const [gender, setGender] = useState("male");
  const [weight, setWeight] = useState(82);
  const [height, setHeight] = useState(180);
  const [age, setAge] = useState(27);
  const [activityIdx, setActivityIdx] = useState(1);
  const [goal, setGoal] = useState("cut");
  const [nutrition, setNutrition] = useState("coached");
  const [supplements, setSupplements] = useState("essential");

  const [showResults, setShowResults] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState(12);
  const [isPinned, setIsPinned] = useState(false);

  const isHydratedFromStore = useRef(false);
  useEffect(() => {
    if (!isHydratedFromStore.current && parsedInitial) {
      isHydratedFromStore.current = true;
      if (parsedInitial.gender) setGender(parsedInitial.gender);
      if (parsedInitial.weight) setWeight(Number(parsedInitial.weight));
      if (parsedInitial.height) setHeight(Number(parsedInitial.height));
      if (parsedInitial.age) setAge(Number(parsedInitial.age));
      if (parsedInitial.nutrition) setNutrition(parsedInitial.nutrition);
      if (parsedInitial.supplements) setSupplements(parsedInitial.supplements);
      if (parsedInitial.result?.goalKey) setGoal(parsedInitial.result.goalKey);
      if (parsedInitial.activity) {
        const idx = activityLevels.findIndex(
          (a) => a.factor === String(parsedInitial.activity),
        );
        if (idx !== -1) setActivityIdx(idx);
      }
      if (parsedInitial.result) {
        setShowResults(true);
      }
    }
  }, [parsedInitial, activityLevels]);

  // محاسبات BMR و TDEE
  const bmrBase = 10 * weight + 6.25 * height - 5 * age;
  const bmr = Math.round(gender === "male" ? bmrBase + 5 : bmrBase - 161);
  const currentActivity = activityLevels[activityIdx] || activityLevels[1];
  const activityFactor = parseFloat(currentActivity.factor);
  const tdee = Math.round(bmr * activityFactor);

  const targetCaloriesDiff =
    goal === "cut"
      ? nutrition === "coached"
        ? 500
        : 350
      : goal === "bulk"
        ? nutrition === "coached"
          ? 380
          : 250
        : 0;

  const targets = {
    cut: Math.round(tdee - targetCaloriesDiff),
    maintain: tdee,
    bulk: Math.round(tdee + targetCaloriesDiff),
  };

  const activeTarget = targets[goal];

  const proteinRatio = goal === "bulk" ? 0.3 : 0.35;
  const protein = Math.round((activeTarget * proteinRatio) / 4);
  const carbs = Math.round((activeTarget * 0.4) / 4);
  const fats = Math.round((activeTarget * (1 - proteinRatio - 0.4)) / 9);

  // الگوریتم پویا بر اساس فعالیت، تغذیه و مکمل
  const projectionData = useMemo(() => {
    const exerciseEfficiency = (activityFactor - 1.0) / 0.725;
    const dietMultiplier = nutrition === "coached" ? 1.0 : 0.65;
    const suppBoost = supplements === "essential" ? 1.25 : 1.0;

    const calculateForWeek = (wk) => {
      if (goal === "cut") {
        const baseWeeklyLoss =
          weight * 0.0055 * (0.6 + exerciseEfficiency * 0.45) * dietMultiplier;
        const totalLoss =
          baseWeeklyLoss * wk * (supplements === "essential" ? 1.08 : 0.95);

        const minL = Math.max(0.8, totalLoss * 0.88).toFixed(1);
        const maxL = (totalLoss * 1.12).toFixed(1);

        const wMin = (weight - Number(maxL)).toFixed(1);
        const wMax = (weight - Number(minL)).toFixed(1);

        const composition =
          exerciseEfficiency > 0.6 && nutrition === "coached"
            ? lang === "ar"
              ? "خسارة دهون صافية 85% + الحفاظ التام على الألياف العضلية"
              : "85%+ Pure Adipose Reduction with Zero Lean Muscle Loss"
            : lang === "ar"
              ? "خسارة مختلطة من الدهون والسوائل مع احتمال هبوط بسيط في الكثافة"
              : "Mixed Fat & Water Loss with Slight Density Drop";

        return {
          weightRange: `${wMin} ~ ${wMax} kg`,
          delta: `-${minL} ~ -${maxL} kg`,
          composition,
        };
      } else if (goal === "bulk") {
        const muscleBuildRate =
          0.22 * exerciseEfficiency * dietMultiplier * suppBoost;
        const totalGain =
          muscleBuildRate * wk +
          (supplements === "essential" && wk >= 4 ? 0.8 : 0.2);

        const minG = Math.max(0.5, totalGain * 0.85).toFixed(1);
        const maxG = (totalGain * 1.15).toFixed(1);

        const wMin = (weight + Number(minG)).toFixed(1);
        const wMax = (weight + Number(maxG)).toFixed(1);

        const composition =
          exerciseEfficiency > 0.6 && supplements === "essential"
            ? lang === "ar"
              ? "بناء عضلات صافية ممتلئة بالجليكوجين مع أقل نسبة دهون"
              : "Dense, Glycogen-Saturated Lean Mass with Controlled Fat"
            : lang === "ar"
              ? "زيادة كتلة عامة؛ ينصح بزيادة شدة التمارين لضمان بنائها عضلات لا دهون"
              : "General Mass Gain; Recommended to increase lifting intensity";

        return {
          weightRange: `${wMin} ~ ${wMax} kg`,
          delta: `+${minG} ~ +${maxG} kg`,
          composition,
        };
      }

      return {
        weightRange: `${(weight - 0.4).toFixed(1)} ~ ${(weight + 0.4).toFixed(1)} kg`,
        delta: "±0.5 kg",
        composition:
          lang === "ar"
            ? "إعادة تشكيل القوام (حرق دهون تدريجي واكتساب كثافة عضلية متزامنة)"
            : "Simultaneous Body Recomposition (Subtle fat loss & density boost)",
      };
    };

    return {
      4: calculateForWeek(4),
      8: calculateForWeek(8),
      12: calculateForWeek(12),
    };
  }, [weight, goal, activityFactor, nutrition, supplements, lang]);

  const currentWeekMetrics = projectionData[selectedWeek];

  const handleCalculateClick = () => {
    setIsCalculating(true);
    setIsPinned(false);

    setTimeout(() => {
      setIsCalculating(false);
      setShowResults(true);

      const goalTitle = t.goals[goal] || goal;
      const calcResult = {
        tdee: activeTarget,
        targetCalories: activeTarget,
        calories: activeTarget,
        selectedGoalCalories: activeTarget,
        goal: goalTitle,
        goalKey: goal,
        maintenance: tdee,
        cutting: targets.cut,
        bulking: targets.bulk,
        bmr,
        nutritionType: nutrition,
        supplementsType: supplements,
        projection: {
          targetWeeks: 12,
          estimatedWeight: projectionData[12].weightRange,
          expectedDelta: projectionData[12].delta,
          composition: projectionData[12].composition,
        },
      };

      const payload = {
        gender,
        weight: String(weight),
        height: String(height),
        age: String(age),
        activity: currentActivity.factor,
        nutrition,
        supplements,
        goal: goalTitle,
        result: calcResult,
      };

      try {
        sessionStorage.setItem("user_fitness_data", JSON.stringify(payload));
        window.dispatchEvent(
          new CustomEvent("fitness_calc_updated", { detail: payload }),
        );
      } catch (err) {
        console.error("Storage dispatch error", err);
      }

      setTimeout(() => {
        resultsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }, 450);
  };

  const handleReset = () => {
    setGender("male");
    setWeight(80);
    setHeight(178);
    setAge(26);
    setActivityIdx(1);
    setGoal("cut");
    setNutrition("coached");
    setSupplements("essential");
    setSelectedWeek(12);
    setShowResults(false);
    setIsPinned(false);

    try {
      sessionStorage.removeItem("user_fitness_data");
      window.dispatchEvent(
        new CustomEvent("fitness_calc_updated", { detail: null }),
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handlePinAction = () => {
    setIsPinned(true);
    try {
      const stored = sessionStorage.getItem("user_fitness_data");
      if (stored) {
        window.dispatchEvent(
          new CustomEvent("fitness_calc_updated", {
            detail: JSON.parse(stored),
          }),
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const weightInputId = useId();
  const heightInputId = useId();
  const ageInputId = useId();

  return (
    <div className="relative mx-auto w-full max-w-xl overflow-hidden rounded-[2.5rem] border border-zinc-800 bg-[#0c1012] p-5 shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_50px_rgba(34,197,94,0.1)] md:p-8 text-start">
      <div className="pointer-events-none absolute -top-20 -end-20 h-56 w-56 rounded-full bg-fitness-primary/20 blur-[90px]" />
      <div className="pointer-events-none absolute -bottom-20 -start-20 h-56 w-56 rounded-full bg-emerald-700/15 blur-[90px]" />

      {/* سربرگ بیواسکنر همراه با دکمه ریست */}
      <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-fitness-primary opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-fitness-primary" />
          </span>
          <span className="font-mono text-[11px] font-bold tracking-widest text-fitness-primary">
            {ui.scannerBadge}
          </span>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900/80 px-2.5 py-1 text-[10px] font-medium text-zinc-400 transition-colors hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400"
          title={ui.resetBtn}
        >
          <RotateCcw className="h-3 w-3" />
          <span>{ui.resetBtn}</span>
        </button>
      </div>

      {/* ۱. فرم مشخصات ورودی */}
      <div className="mt-6 space-y-5">
        {/* جنسیت */}
        <div>
          <span className="mb-2 block text-[11px] font-semibold text-zinc-400">
            {t.profileSection}
          </span>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {
                setGender("male");
                setIsPinned(false);
              }}
              className={`flex cursor-pointer items-center justify-center gap-2 rounded-2xl border py-3 text-xs font-black transition-all ${
                gender === "male"
                  ? "border-fitness-primary bg-fitness-primary/10 text-fitness-primary shadow-[0_0_20px_rgba(34,197,94,0.2)]"
                  : "border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-zinc-700"
              }`}
            >
              <User className="h-4 w-4" />
              <span>{t.genderMale}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setGender("female");
                setIsPinned(false);
              }}
              className={`flex cursor-pointer items-center justify-center gap-2 rounded-2xl border py-3 text-xs font-black transition-all ${
                gender === "female"
                  ? "border-fitness-primary bg-fitness-primary/10 text-fitness-primary shadow-[0_0_20px_rgba(34,197,94,0.2)]"
                  : "border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-zinc-700"
              }`}
            >
              <User className="h-4 w-4" />
              <span>{t.genderFemale}</span>
            </button>
          </div>
        </div>

        {/* اسلایدر وزن */}
        <div className="rounded-2xl border border-zinc-800/80 bg-zinc-950/70 p-4">
          <div className="flex items-center justify-between">
            <label
              htmlFor={weightInputId}
              className="text-xs font-bold text-zinc-300"
            >
              {t.weightLabel}
            </label>
            <div className="flex items-baseline gap-1">
              <span className="font-mono text-2xl font-black text-fitness-primary">
                {weight}
              </span>
              <span className="text-[10px] text-zinc-500 font-mono">KG</span>
            </div>
          </div>
          <input
            id={weightInputId}
            type="range"
            min="35"
            max="220"
            step="1"
            value={weight}
            onChange={(e) => {
              setWeight(Number(e.target.value));
              setIsPinned(false);
            }}
            className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-lg bg-zinc-800 accent-fitness-primary"
          />
          <div className="mt-1 flex justify-between font-mono text-[9px] text-zinc-600">
            <span>35 kg</span>
            <span>125 kg</span>
            <span>220 kg</span>
          </div>
        </div>

        {/* اسلایدر قد */}
        <div className="rounded-2xl border border-zinc-800/80 bg-zinc-950/70 p-4">
          <div className="flex items-center justify-between">
            <label
              htmlFor={heightInputId}
              className="text-xs font-bold text-zinc-300"
            >
              {t.heightLabel}
            </label>
            <div className="flex items-baseline gap-1">
              <span className="font-mono text-2xl font-black text-white">
                {height}
              </span>
              <span className="text-[10px] text-zinc-500 font-mono">CM</span>
            </div>
          </div>
          <input
            id={heightInputId}
            type="range"
            min="120"
            max="225"
            step="1"
            value={height}
            onChange={(e) => {
              setHeight(Number(e.target.value));
              setIsPinned(false);
            }}
            className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-lg bg-zinc-800 accent-fitness-primary"
          />
          <div className="mt-1 flex justify-between font-mono text-[9px] text-zinc-600">
            <span>120 cm</span>
            <span>172 cm</span>
            <span>225 cm</span>
          </div>
        </div>

        {/* اسلایدر سن */}
        <div className="rounded-2xl border border-zinc-800/80 bg-zinc-950/70 p-4">
          <div className="flex items-center justify-between">
            <label
              htmlFor={ageInputId}
              className="text-xs font-bold text-zinc-300"
            >
              {t.ageLabel}
            </label>
            <div className="flex items-baseline gap-1">
              <span className="font-mono text-2xl font-black text-white">
                {age}
              </span>
              <span className="text-[10px] text-zinc-500">{t.yearsUnit}</span>
            </div>
          </div>
          <input
            id={ageInputId}
            type="range"
            min="12"
            max="90"
            step="1"
            value={age}
            onChange={(e) => {
              setAge(Number(e.target.value));
              setIsPinned(false);
            }}
            className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-lg bg-zinc-800 accent-fitness-primary"
          />
          <div className="mt-1 flex justify-between font-mono text-[9px] text-zinc-600">
            <span>12 {t.yearsUnit}</span>
            <span>50 {t.yearsUnit}</span>
            <span>90 {t.yearsUnit}</span>
          </div>
        </div>

        {/* سطح فعالیت ورزشی */}
        <div>
          <span className="mb-2 block text-[11px] font-semibold text-zinc-400">
            {t.activitySection}
          </span>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {activityLevels.map((lvl, idx) => (
              <button
                key={lvl.id}
                type="button"
                onClick={() => {
                  setActivityIdx(idx);
                  setIsPinned(false);
                }}
                className={`flex cursor-pointer flex-col items-center rounded-xl border p-2.5 transition-all ${
                  activityIdx === idx
                    ? "border-fitness-primary bg-fitness-primary/15 shadow-[0_0_15px_rgba(34,197,94,0.25)]"
                    : "border-zinc-800 bg-zinc-900/40 hover:border-zinc-700"
                }`}
              >
                <span
                  className={`text-[11px] font-bold ${
                    activityIdx === idx
                      ? "text-fitness-primary"
                      : "text-zinc-300"
                  }`}
                >
                  {lvl.label}
                </span>
                <span className="mt-0.5 text-[9px] text-zinc-500">
                  {lvl.desc}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* هدف ورزشی */}
        <div>
          <span className="mb-2 block text-[11px] font-semibold text-zinc-400">
            {lang === "ar"
              ? "الهدف التدريبي المنشود:"
              : "Primary Fitness Objective:"}
          </span>
          <div className="grid grid-cols-3 gap-2 rounded-2xl border border-fitness-border bg-fitness-surface/80 p-1.5">
            <button
              type="button"
              onClick={() => {
                setGoal("cut");
                setIsPinned(false);
              }}
              className={`flex cursor-pointer items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-bold transition-all ${
                goal === "cut"
                  ? "bg-fitness-primary text-fitness-bg shadow-[0_0_15px_var(--color-fitness-primary)/40]"
                  : "text-fitness-muted hover:text-fitness-text"
              }`}
            >
              <Flame className="h-4 w-4" />
              <span className="truncate">{t.goals.cut}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setGoal("maintain");
                setIsPinned(false);
              }}
              className={`flex cursor-pointer items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-bold transition-all ${
                goal === "maintain"
                  ? "bg-fitness-primary text-fitness-bg shadow-[0_0_15px_var(--color-fitness-primary)/40]"
                  : "text-fitness-muted hover:text-fitness-text"
              }`}
            >
              <Scale className="h-4 w-4" />
              <span className="truncate">{t.goals.maintain}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setGoal("bulk");
                setIsPinned(false);
              }}
              className={`flex cursor-pointer items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-bold transition-all ${
                goal === "bulk"
                  ? "bg-fitness-primary text-fitness-bg shadow-[0_0_15px_var(--color-fitness-primary)/40]"
                  : "text-fitness-muted hover:text-fitness-text"
              }`}
            >
              <Zap className="h-4 w-4" />
              <span className="truncate">{t.goals.bulk}</span>
            </button>
          </div>
        </div>

        {/* رویکرد تغذیه‌ای */}
        <div>
          <span className="mb-2 block text-[11px] font-semibold text-zinc-400">
            {ui.nutritionSection}
          </span>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {ui.nutritionOptions.map((opt) => {
              const isSelected = nutrition === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    setNutrition(opt.id);
                    setIsPinned(false);
                  }}
                  className={`flex cursor-pointer flex-col rounded-2xl border p-3.5 text-start transition-all ${
                    isSelected
                      ? "border-fitness-primary bg-fitness-primary/10 shadow-[0_0_15px_rgba(34,197,94,0.15)]"
                      : "border-zinc-800 bg-zinc-950/60 hover:border-zinc-700"
                  }`}
                >
                  <span
                    className={`text-xs font-bold ${
                      isSelected ? "text-fitness-primary" : "text-zinc-200"
                    }`}
                  >
                    {opt.label}
                  </span>
                  <span className="mt-1 text-[10px] leading-relaxed text-zinc-500">
                    {opt.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* مکمل‌های ورزشی */}
        <div>
          <span className="mb-2 block text-[11px] font-semibold text-zinc-400">
            {ui.supplementsSection}
          </span>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {ui.supplementOptions.map((sup) => {
              const isSelected = supplements === sup.id;
              return (
                <button
                  key={sup.id}
                  type="button"
                  onClick={() => {
                    setSupplements(sup.id);
                    setIsPinned(false);
                  }}
                  className={`flex cursor-pointer flex-col rounded-2xl border p-3.5 text-start transition-all ${
                    isSelected
                      ? "border-fitness-primary bg-fitness-primary/10 shadow-[0_0_15px_rgba(34,197,94,0.15)]"
                      : "border-zinc-800 bg-zinc-950/60 hover:border-zinc-700"
                  }`}
                >
                  <span
                    className={`text-xs font-bold ${
                      isSelected ? "text-fitness-primary" : "text-zinc-200"
                    }`}
                  >
                    {sup.label}
                  </span>
                  <span className="mt-1 text-[10px] leading-relaxed text-zinc-500">
                    {sup.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* دکمه اصلی تحلیل بیومتریک */}
      <div className="mt-8 border-t border-fitness-border/80 pt-6">
        <button
          type="button"
          onClick={handleCalculateClick}
          disabled={isCalculating}
          className="relative flex w-full cursor-pointer items-center justify-center gap-2.5 overflow-hidden rounded-2xl bg-gradient-to-r from-fitness-primary via-fitness-primary-hover to-fitness-accent py-4 text-center text-sm font-black text-fitness-bg shadow-[0_0_35px_var(--color-fitness-primary)/35] transition-all hover:shadow-[0_0_45px_var(--color-fitness-primary)/55] active:scale-[0.98] disabled:opacity-75"
        >
          {isCalculating ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-fitness-bg border-t-transparent" />
              <span>{ui.calculatingText}</span>
            </>
          ) : (
            <>
              <span>{showResults ? ui.recalculateBtn : ui.calculateBtn}</span>
              {isRtl ? (
                <ArrowLeft className="h-4 w-4" />
              ) : (
                <ArrowRight className="h-4 w-4" />
              )}
            </>
          )}
        </button>
      </div>

      {/* ۲. بخش نتایج و تایم‌لاین دگرگونی */}
      {showResults && (
        <div
          ref={resultsRef}
          className="mt-8 space-y-6 animate-in fade-in slide-in-from-top-4 duration-500"
        >
          <div className="relative flex items-center justify-center py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-fitness-primary/30" />
            </div>
            <span className="relative rounded-full border border-fitness-primary/40 bg-[#0c1012] px-4 py-1 text-[11px] font-black text-fitness-primary shadow-[0_0_15px_rgba(0,210,255,0.25)]">
              {ui.resultsTitle}
            </span>
          </div>

          {/* کالری و ماکروها */}
          <div className="relative overflow-hidden rounded-3xl border border-zinc-800/90 bg-gradient-to-b from-zinc-900/80 via-zinc-950 to-black p-6 shadow-[inset_0_0_30px_rgba(0,210,255,0.08)]">
            <div className="relative z-10 flex flex-col items-center justify-between gap-5 sm:flex-row">
              <div className="text-center sm:text-start">
                <span className="text-[11px] font-semibold text-zinc-400">
                  {ui.targetLabel}
                </span>
                <div className="mt-1 flex items-baseline justify-center gap-2 sm:justify-start">
                  <span className="font-mono text-5xl font-black tracking-tight text-white drop-shadow-[0_0_15px_rgba(0,210,255,0.35)]">
                    {activeTarget}
                  </span>
                  <span className="font-mono text-xs font-bold text-fitness-primary">
                    {ui.kcalUnit}
                  </span>
                </div>
                <div className="mt-1.5 flex items-center justify-center gap-3 text-[11px] text-zinc-400 sm:justify-start">
                  <span>
                    {ui.bmrLabel}{" "}
                    <strong className="text-zinc-200 font-mono">{bmr}</strong>
                  </span>
                  <span>•</span>
                  <span>
                    {ui.tdeeLabel}{" "}
                    <strong className="text-zinc-200 font-mono">{tdee}</strong>
                  </span>
                </div>
              </div>

              <div className="flex gap-2 rounded-2xl border border-zinc-800/80 bg-black/60 p-2.5 backdrop-blur-md">
                <div className="flex flex-col items-center px-2">
                  <span className="text-[9px] text-zinc-400">
                    {t.macros.protein}
                  </span>
                  <span className="font-mono text-xs font-black text-fitness-primary">
                    {protein}g
                  </span>
                </div>
                <div className="h-7 w-px bg-zinc-800" />
                <div className="flex flex-col items-center px-2">
                  <span className="text-[9px] text-zinc-400">
                    {t.macros.carbs}
                  </span>
                  <span className="font-mono text-xs font-black text-white">
                    {carbs}g
                  </span>
                </div>
                <div className="h-7 w-px bg-zinc-800" />
                <div className="flex flex-col items-center px-2">
                  <span className="text-[9px] text-zinc-400">
                    {t.macros.fats}
                  </span>
                  <span className="font-mono text-xs font-black text-white">
                    {fats}g
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* تایم‌لاین دگرگونی بدنی */}
          <div className="rounded-3xl border border-zinc-800/90 bg-gradient-to-b from-zinc-900/70 via-zinc-950 to-[#0b0e11] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800/80 pb-3">
              <div>
                <span className="inline-block text-[10px] font-bold tracking-wider text-fitness-primary uppercase">
                  {ui.sectionBadge}
                </span>
                <h4 className="text-sm font-black text-white">
                  {ui.sectionTitle}
                </h4>
              </div>

              <div className="flex gap-1.5 rounded-xl border border-zinc-800 bg-black/60 p-1">
                {[4, 8, 12].map((wk) => (
                  <button
                    key={wk}
                    type="button"
                    onClick={() => setSelectedWeek(wk)}
                    className={`cursor-pointer rounded-lg px-2.5 py-1 font-mono text-[11px] font-bold transition-all ${
                      selectedWeek === wk
                        ? "bg-fitness-primary text-black shadow-[0_0_12px_rgba(0,210,255,0.35)]"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    {wk === 4
                      ? ui.tabWeek4
                      : wk === 8
                        ? ui.tabWeek8
                        : ui.tabWeek12}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex flex-col gap-2 rounded-2xl border border-zinc-800/80 bg-black/50 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <span className="text-[10px] text-zinc-400">
                    {ui.targetWeightLabel}
                  </span>
                  <p className="font-mono text-xl font-black text-fitness-primary drop-shadow-[0_0_8px_rgba(0,210,255,0.3)]">
                    {currentWeekMetrics.weightRange}
                  </p>
                </div>
                <div className="sm:text-end">
                  <span className="text-[10px] text-zinc-400">
                    {ui.deltaLabel}
                  </span>
                  <p className="font-mono text-sm font-bold text-white">
                    {currentWeekMetrics.delta}
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-fitness-primary/30 bg-fitness-primary/5 p-3.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-fitness-primary">
                  {ui.compositionLabel}
                </span>
                <p className="mt-0.5 text-xs font-bold text-zinc-200">
                  {currentWeekMetrics.composition}
                </p>
              </div>

              <p className="text-[10px] leading-relaxed text-zinc-400">
                {ui.disclaimer}
              </p>
            </div>
          </div>

          {/* دکمه تثبیت در نوار شناور و ادامه وب‌گردی بدون پرش ناگهانی */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handlePinAction}
              className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl py-4 text-center font-black text-xs sm:text-sm transition-all shadow-lg active:scale-[0.98] ${
                isPinned
                  ? "bg-white text-black shadow-[0_0_25px_rgba(255,255,255,0.4)]"
                  : "bg-gradient-to-r from-fitness-primary via-fitness-primary-hover to-fitness-accent text-fitness-bg shadow-[0_0_30px_var(--color-fitness-primary)/35] hover:shadow-[0_0_40px_var(--color-fitness-primary)/50]"
              }`}
            >
              {isPinned ? (
                <>
                  <Check className="h-4 w-4 stroke-[3] text-black" />
                  <span>
                    {ui.ctaPinnedPrefix} {activeTarget} {ui.ctaPinnedSuffix}
                  </span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4 text-fitness-bg" />
                  <span>
                    {ui.ctaPrefix} {activeTarget} {ui.ctaSuffix}
                  </span>
                  {isRtl ? (
                    <ArrowLeft className="h-4 w-4" />
                  ) : (
                    <ArrowRight className="h-4 w-4" />
                  )}
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
