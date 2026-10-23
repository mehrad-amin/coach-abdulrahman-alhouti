// src/components/BiomechanicsScanner.jsx
"use client";

import React, {
  useState,
  useRef,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  ShieldCheck,
  Sparkles,
  ChevronDown,
  CheckCircle2,
  Check,
  ClipboardList,
  Video,
  FileText,
  UserCheck,
} from "lucide-react";

const Anatomy3DCanvas = dynamic(() => import("./Anatomy3DCanvas"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[360px] sm:h-[480px] lg:h-[540px] bg-zinc-950 border border-zinc-800 rounded-3xl animate-pulse flex flex-col items-center justify-center gap-3 text-zinc-500 font-bold text-xs sm:text-sm">
      <span className="h-6 w-6 animate-spin rounded-full border-2 border-fitness-primary border-t-transparent" />
      <span>جاري تهيئة الماسح الحركي والمحرك ثلاثي الأبعاد...</span>
    </div>
  ),
});

export const CLINICAL_ZONES = {
  neck: {
    id: "neck",
    nameEn: "Cervical & Upper Spine Priority",
    nameAr: "منطقة العنق وأعلى العمود الفقري",
    shortNameAr: "الرقبة والعنق",
    shortNameEn: "Neck & Spine",
    viewSide: "front",
    defaultPoint: [0, 0.95, 0.12],
    badgeAr: "أولوية الفحص: تركيز ومراجعة خاصة",
    badgeEn: "Assessment Priority: Targeted Focus",
    overviewAr:
      "تحديد منطقة الرقبة كأولوية في ملفك. سواء كنت مبتدئاً تعاني من إجهاد الجلوس المكتبي أو رياضياً يشعر بعدم ارتياح أثناء الرفعات، يتم فحص المحاذاة الشاملة للفقرات وتأثيرها على الحركة.",
    overviewEn:
      "Flagged as an evaluation priority. Whether you are a beginner with desk-work tension or an experienced lifter feeling strain under load, overall spinal alignment is reviewed.",
    focusAreasAr: [
      "مراجعة وضعية الرأس وأعلى الظهر خلال الحياة اليومية وتحت الأوزان",
      "تقييم مرونة وثبات عضلات الكتفين العلوية المتصلة بالرقبة",
      "مراعاة التاريخ الصحي واستبعاد أي أسباب إجهاد غير عضلية",
    ],
    focusAreasEn: [
      "Head and upper torso alignment during daily routine and lifting sets",
      "Mobility and endurance of the upper shoulder and neck stabilizers",
      "Reviewing past discomfort history and lifestyle stress factors",
    ],
    assessmentMethods: {
      inPersonAr:
        "فحص حضوري (داخل النادي): اختبارات المدى الحركي للعنق، واستقامة الأكتاف، وتصحيح التكنيك المباشر تحت الأوزان.",
      inPersonEn:
        "In-Gym Assessment: Range of motion screening, posture analysis, and direct real-time technique supervision.",
      onlineVideoAr:
        "فحص أونلاين (عن بُعد): تحليل ويديوي لزوايا الرأس والعنق أثناء التمارين الأساسية ومراجعة استبيان نمط الحياة.",
      onlineVideoEn:
        "Remote Video Audit: Multi-angle video analysis of neck posture during lifts alongside a detailed lifestyle intake.",
      medicalClearingAr:
        "التقارير الطبية والمخبرية: مراجعة أي فحوصات سابقة أو توصيات طبية لضمان ملاءمة البرنامج تماماً لسلامتك.",
      medicalClearingEn:
        "Medical Records Review: Reviewing any existing medical notes or diagnostics to guarantee total safety.",
    },
    philosophyAr:
      "لا توجد وصفات جاهزة أو تمارين ثابتة؛ يحدد الكابتن عبدالرحمن التعديلات المناسبة للمسار الحركي والبدائل الآمنة بعد الجلسة الاستكشافية الأولى.",
    philosophyEn:
      "No generic templates. Coach Al-Houti designs specific exercise variations and joint-friendly setups only after your initial consultation.",
  },
  shoulder: {
    id: "shoulder",
    nameEn: "Shoulder Complex & Rotator Cuff",
    nameAr: "مفصل الكتف والمحيط العضلي",
    shortNameAr: "مفصل الكتف",
    shortNameEn: "Shoulder Joint",
    viewSide: "front",
    defaultPoint: [0.38, 0.72, 0.08],
    badgeAr: "أولوية الفحص: تركيز ومراجعة خاصة",
    badgeEn: "Assessment Priority: Targeted Focus",
    overviewAr:
      "تحديد مفصل الكتف كأولوية للمراجعة. الكتف مفصل مركب وحساس؛ قد يعود الانزعاج لقلة الإحماء، أو عدم توازن زوايا التمرين، أو إجهاد أوتار الكفة المدورة.",
    overviewEn:
      "Flagged as a joint of interest. As a highly mobile joint, discomfort can stem from warm-up quality, lifting angles, or muscular balance.",
    focusAreasAr: [
      "فحص مسار حركة لوحي الكتف وتناسقها مع حركة الذراعين",
      "مراجعة زوايا الدفع والسحب واختيار القبضة الأكثر راحة لمفصلك",
      "الاطلاع على أي قيود قديمة ناتجة عن إصابات سابقة أو مجهود مهني",
    ],
    focusAreasEn: [
      "Scapular rhythm coordination and arm movement tracking",
      "Pressing and pulling angles to find the safest grip width",
      "Factoring in occupational strain or past athletic injuries",
    ],
    assessmentMethods: {
      inPersonAr:
        "فحص حضوري (داخل النادي): اختبار مرونة وثبات مفصل الكتف عملياً ومراقبة التوازن العضلي أثناء التمرين.",
      inPersonEn:
        "In-Gym Assessment: Practical range-of-motion and stability tests, assessing muscular symmetry under load.",
      onlineVideoAr:
        "فحص أونلاين (عن بُعد): تصوير التكنيك في تمارين الضغط والسحب لتحليل زاوية الكوع ومسار لوح الكتف.",
      onlineVideoEn:
        "Remote Video Audit: Video review of pushing and pulling sets to inspect elbow drift and scapular stability.",
      medicalClearingAr:
        "التقارير الطبية والمخبرية: فحص تقارير الأشعة أو تشخيصات الأوتار السابقة إن وجدت لمواءمة الأحمال.",
      medicalClearingEn:
        "Medical Records Review: Assessing ultrasound or MRI history to program appropriate training volume.",
    },
    philosophyAr:
      "يتم استبدال الحركات المسببة للألم ببدائل مريحة للمفصل وتدرج محسوب في الأوزان، بناءً على التقييم الخاص بك.",
    philosophyEn:
      "Irritating angles are swapped for joint-friendly alternatives with measured progressive loading tailored to you.",
  },
  chest: {
    id: "chest",
    nameEn: "Pectoral & Thoracic Cage",
    nameAr: "المنطقة الصدرية والقفص الصدري",
    shortNameAr: "الصدر والأضلاع",
    shortNameEn: "Chest & Ribs",
    viewSide: "front",
    defaultPoint: [0, 0.58, 0.18],
    badgeAr: "نطاق الفحص: فحص حركي شامل",
    badgeEn: "Assessment Priority: Kinetic Screening",
    overviewAr:
      "مراجعة حركة الصدر والأضلاع. تيبس القفص الصدري أو عدم انتظام التنفس تحت الأحمال قد ينعكس على راحة الأكتاف وأسفل الظهر.",
    overviewEn:
      "Screening the chest and ribcage mobility. Thoracic tightness or improper breathing under load directly affects shoulders and back health.",
    focusAreasAr: [
      "مدى تمدد القفص الصدري ومرونة عضلات الصدر أثناء التمارين",
      "التوافق بين التنفس السليم وثبات الجذع أثناء المجهود البدني",
      "التأكد من عدم وجود إجهاد في المفاصل الضلعية أو الأوتار السطحية",
    ],
    focusAreasEn: [
      "Thoracic expansion and pectoral tissue flexibility during full ranges",
      "Synergy between diaphragmatic breathing and trunk rigidity",
      "Ruling out rib joint irritation or superficial tendon strain",
    ],
    assessmentMethods: {
      inPersonAr:
        "فحص حضوري (داخل النادي): معاينة مرونة التمدد الصدري وتعديل مسار البار والأجهزة ليناسب بنيتك الجسمانية.",
      inPersonEn:
        "In-Gym Assessment: Evaluating thoracic mobility and tailoring bar path and machine ergonomics to your anatomy.",
      onlineVideoAr:
        "فحص أونلاين (عن بُعد): تدقيق مقاطع الفيديو لتمارين الصدر للتأكد من زوايا النزول والتحكم في الوزن.",
      onlineVideoEn:
        "Remote Video Audit: Checking execution videos on chest presses to verify descent depth and control.",
      medicalClearingAr:
        "التقارير الطبية والمخبرية: التحقق من خلو الحالة من أي التهابات ضلعية قديمة أو إجهاد غضروفي.",
      medicalClearingEn:
        "Medical Records Review: Verifying that symptoms are not related to past costochondritis or rib trauma.",
    },
    philosophyAr:
      "الهدف هو تحقيق أقصى استفادة عضلية بأعلى درجات الراحة للمفاصل والأربطة وفق خطة خاصة بك تماماً.",
    philosophyEn:
      "Targeting muscle growth while maintaining total joint comfort through an individually tailored split.",
  },
  elbow: {
    id: "elbow",
    nameEn: "Elbow & Forearm Chain",
    nameAr: "مفصل المرفق والساعد",
    shortNameAr: "المرفق والساعد",
    shortNameEn: "Elbow Joint",
    viewSide: "front",
    defaultPoint: [0.46, 0.35, 0.05],
    badgeAr: "أولوية الفحص: تركيز ومراجعة خاصة",
    badgeEn: "Assessment Priority: Targeted Focus",
    overviewAr:
      "فحص أوتار المرفق وقوة القبضة. انزعاج الكوع غالباً ما يكون رد فعل لشد زائد في الساعد أو استخدام مقاسات قبضة غير ملائمة.",
    overviewEn:
      "Assessing elbow tendons and grip forces. Discomfort is frequently a reaction to forearm overactivity or suboptimal bar grips.",
    focusAreasAr: [
      "توزيع ضغط الأوزان على مفاصل الساعد والكوع أثناء السحب والدفع",
      "تأثير الأعمال اليومية والمهام المكتبية على إجهاد أوتار المرفق",
      "مرونة دوران الساعد لتحقيق راحة طبيعية للمفصل بدون التواء",
    ],
    focusAreasEn: [
      "Load distribution over forearm and elbow joints during pulling/pressing",
      "Impact of daily computer or manual work on tendon load capacity",
      "Forearm rotational flexibility to avoid unnatural joint torque",
    ],
    assessmentMethods: {
      inPersonAr:
        "فحص حضوري (داخل النادي): اختبار قوة القبضة، مراجعة مسار حركة الكوع، وتجربة مقابض مختلفة مريحة للمفصل.",
      inPersonEn:
        "In-Gym Assessment: Grip strength screen, elbow path check, and testing ergonomic grip attachments.",
      onlineVideoAr:
        "فحص أونلاين (عن بُعد): فحص مسار الذراعين في الفيديوهات والتأكد من عدم التواء الكوع أثناء التكرارات الأخيرة.",
      onlineVideoEn:
        "Remote Video Audit: Video review of arm alignment during sets to spot excessive elbow flare or rotation.",
      medicalClearingAr:
        "التقارير الطبية والمخبرية: مراجعة أي تشخيص بالتهاب أوتار متكرر لتعديل الحجم التدريبي بالشكل المناسب.",
      medicalClearingEn:
        "Medical Records Review: Reviewing persistent tendonitis history to balance training volume.",
    },
    philosophyAr:
      "يتم تكييف الأوزان والتكرارات واستخدام زوايا حركية مرنة تتيح للعضلات التطور دون إجهاد أوتار المفصل.",
    philosophyEn:
      "Loads, rep ranges, and ergonomic grips are calibrated so muscles develop without stressing connective tissue.",
  },
  wrist: {
    id: "wrist",
    nameEn: "Wrist Joint & Grip Stability",
    nameAr: "مفصل المعصم ومحور القبضة",
    shortNameAr: "المعصم والرسغ",
    shortNameEn: "Wrist Joint",
    viewSide: "front",
    defaultPoint: [0.52, -0.08, 0.04],
    badgeAr: "نطاق الفحص: فحص حركي شامل",
    badgeEn: "Assessment Priority: Kinetic Screening",
    overviewAr:
      "مراجعة استقامة الرسغ وتحمل الضغط المحوري. ثبات المعصم يحمي الأوتار الدقيقة ويمنع تسرب القوة في مختلف الحركات.",
    overviewEn:
      "Evaluating wrist alignment and axial tolerance. Strong wrist stacking protects small tendons and optimizes power transfer.",
    focusAreasAr: [
      "استقامة عظام اليد مع الساعد تحت الأوزان وتفادي انكسار المعصم",
      "مدى امتداد المفصل المطلوب لمختلف التمارين بحسب مرونتك الفردية",
      "تأثير استخدام لوحة المفاتيح أو الأجهزة الذكية على توتر الرسغ",
    ],
    focusAreasEn: [
      "Neutral bone stacking under loaded barbells to avoid hyperextension",
      "Wrist extension flexibility tailored to your individual anatomy",
      "Everyday strain from keyboard and mobile device usage",
    ],
    assessmentMethods: {
      inPersonAr:
        "فحص حضوري (داخل النادي): تدريب عملي على محاذاة القبضة وتحديد أفضل وضعية لمفصل اليد على الأوزان.",
      inPersonEn:
        "In-Gym Assessment: Hands-on grip setup coaching and finding the optimal hand position on bars and dumbbells.",
      onlineVideoAr:
        "فحص أونلاين (عن بُعد): تحليل ويديوي لمظهر المعصم واستقامته في تمارين الضغط والسكوات الأمامي.",
      onlineVideoEn:
        "Remote Video Audit: Video check of wrist stacking during presses and squats to prevent backward bending.",
      medicalClearingAr:
        "التقارير الطبية والمخبرية: مراجعة أي إصابات قديمة في أربطة الرسغ لضمان دعم المفصل بالأدوات المناسبة.",
      medicalClearingEn:
        "Medical Records Review: Checking past sprains or carpal symptoms to recommend appropriate joint support.",
    },
    philosophyAr:
      "يتم ضبط وضعيات المسك والأوزان بما يضمن استقرار المفصل وراحته التامة طوال فترة البرنامج التدريبي.",
    philosophyEn:
      "Grip positioning and loaded patterns are optimized for structural integrity and absolute joint comfort.",
  },
  core: {
    id: "core",
    nameEn: "Core & Abdominal Stability",
    nameAr: "عضلات الجذع والوسط",
    shortNameAr: "عضلات الكور",
    shortNameEn: "Core & Abs",
    viewSide: "front",
    defaultPoint: [0, 0.28, 0.18],
    badgeAr: "أولوية الفحص: تركيز ومراجعة خاصة",
    badgeEn: "Assessment Priority: Targeted Focus",
    overviewAr:
      "فحص ثبات الجذع والتنفس الحجابي. قوة الكور ليست مجرد عضلات بطن بارزة، بل هي درع الحماية لعمودك الفقري وقاعدتك لرفع الأوزان بثقة.",
    overviewEn:
      "Screening core bracing and diaphragmatic control. True core strength is your spine's shield and foundation for confident lifting.",
    focusAreasAr: [
      "القدرة على شد عضلات البطن العمیقة والتنفس بثبات تحت الأحمال",
      "توازن القوة بين عضلات البطن الأمامية وعضلات أسفل الظهر",
      "مراعاة العمليات الجراحية السابقة أو فترات الانقطاع الطويلة عن التمرين",
    ],
    focusAreasEn: [
      "Coordinating deep abdominal bracing with breathing during exertion",
      "Strength balance between anterior core and posterior spinal muscles",
      "Factoring in previous surgeries or long periods of physical detraining",
    ],
    assessmentMethods: {
      inPersonAr:
        "فحص حضوري (داخل النادي): اختبارات ثبات الجذع بدون حركة وتطبيق أساليب الشد والتنفس الصحيحة ميدانياً.",
      inPersonEn:
        "In-Gym Assessment: Static endurance tests and direct coaching on proper bracing and abdominal pressure.",
      onlineVideoAr:
        "فحص أونلاين (عن بُعد): مراجعة الفيديوهات للتأكد من عدم تقوس الظهر أو ارتخاء البطن أثناء رفع الأوزان.",
      onlineVideoEn:
        "Remote Video Audit: Video analysis to verify that trunk integrity is held without excessive arching.",
      medicalClearingAr:
        "التقارير الطبية والمخبرية: مراجعة أي ملاحظات طبية حول الفتاق أو الانفصال العضلي لاختيار تمارين آمنة.",
      medicalClearingEn:
        "Medical Records Review: Reviewing any hernia or diastasis recti notes to select non-stressful variations.",
    },
    philosophyAr:
      "نبني ثبات الجذع خطوة بخطوة من خلال تمارين مناسبة لمستواك الحالي، لحماية ظهرك وزيادة قوتك بأمان.",
    philosophyEn:
      "We build core integrity step-by-step through appropriate progressions that safeguard your spine and build power safely.",
  },
  lumbar: {
    id: "lumbar",
    nameEn: "Lower Back & Lumbo-Pelvic Chain",
    nameAr: "الفقرات القطنية وأسفل الظهر",
    shortNameAr: "أسفل الظهر",
    shortNameEn: "Lower Back",
    viewSide: "back",
    defaultPoint: [0, 0.18, -0.15],
    badgeAr: "أولوية الفحص: تركيز ومراجعة خاصة",
    badgeEn: "Assessment Priority: Targeted Focus",
    overviewAr:
      "تحديد أسفل الظهر كمنطقة اهتمام رئيسية. آلام أسفل الظهر قد لا تكون مشكلة في الظهر نفسه، بل ناتجة عن خمول عضلات الورك، أو ساعات الجلوس، أو أسلوب الرفع.",
    overviewEn:
      "Flagged as a key priority. Lower back discomfort is often driven by hip stiffness, glute inactivity, or general movement habits.",
    focusAreasAr: [
      "سلاسة حركة مفصل الورك وعزلها عن انحناء فقرات أسفل الظهر",
      "تأثير نمط الحياة اليومي وفترات الجلوس أو الوقوف الطويلة",
      "مراجعة التاريخ الصحي للفقرات لتجنب أي وضعيات تشكل ضغطاً غير مناسب",
    ],
    focusAreasEn: [
      "Hip hinge mechanics and separating hip motion from lumbar flexion",
      "Evaluating sedentary habits, posture, and occupational demands",
      "Reviewing spinal history to avoid uncomfortable compressive positions",
    ],
    assessmentMethods: {
      inPersonAr:
        "فحص حضوري (داخل النادي): تقييم مرونة الورك، واختبار وضعيات الجذع المريحة، وتدقيق تكنيك الديدلفت والسكوات.",
      inPersonEn:
        "In-Gym Assessment: Hip mobility assessment, comfortable spine position testing, and hands-on deadlift/squat setup.",
      onlineVideoAr:
        "فحص أونلاين (عن بُعد): تحليل دقيق لارتداد الحوض وزاوية الظهر من المنظر الجانبي بالفيديو البطيء.",
      onlineVideoEn:
        "Remote Video Audit: Slow-motion sagittal video audit assessing pelvic stability and spinal neutrality.",
      medicalClearingAr:
        "التقارير الطبية والمخبرية: مراجعة تقارير الرنين (MRI) السابقة لفقرات الظهر لضمان التوافق التام مع التوصيات الطبية.",
      medicalClearingEn:
        "Medical Records Review: Reviewing previous lumbar MRI reports to align training strictly with medical advice.",
    },
    philosophyAr:
      "البرنامج يصمم لحماية عمودك الفقري أولاً؛ نختار التمارين التي تبني العضلات دون تسليط أحمال ضاغطة على الفقرات.",
    philosophyEn:
      "Your spine comes first. Exercises are selected to stimulate muscular adaptation without spinal compression.",
  },
  knee: {
    id: "knee",
    nameEn: "Knee Joint & Movement Path",
    nameAr: "مفصل الركبة ومسار الحركة",
    shortNameAr: "مفصل الركبة",
    shortNameEn: "Knee Joint",
    viewSide: "front",
    defaultPoint: [0.18, -0.46, 0.16],
    badgeAr: "أولوية الفحص: تركيز ومراجعة خاصة",
    badgeEn: "Assessment Priority: Targeted Focus",
    overviewAr:
      "تحديد مفصل الركبة كأولوية للمراجعة. سواء كان الانزعاج بسيطاً مع صعود الدرج أو يظهر مع الأوزان، الركبة تقع بين مفصلين (الورك والكاحل) ويتأثر مسارها بحركتهما وبنمط تغذيتك ومستوى نشاطك.",
    overviewEn:
      "Flagged as an assessment priority. Whether feeling mild discomfort on stairs or under heavy squats, knee tracking is influenced by hip and ankle dynamics, as well as general recovery.",
    focusAreasAr: [
      "مراقبة استقامة الركبة مع أصابع القدم أثناء الصعود والنزول",
      "مرونة مفصل الكاحل وثبات عضلات الحوض والورك الجانبية",
      "الاطلاع على الجوانب العامة كالراحة والتغذية وتاريخ أي إصابات قديمة",
    ],
    focusAreasEn: [
      "Tracking knee-over-toe trajectory during squatting and lunging motions",
      "Ankle joint mobility and lateral hip stabilizing strength",
      "Reviewing general recovery, nutritional lifestyle, and prior injury history",
    ],
    assessmentMethods: {
      inPersonAr:
        "فحص حضوري (داخل النادي): اختبارات مرونة الكاحل وثبات الحوض، ومراقبة مسار الركبة العملي وتعديل زوايا القدمين.",
      inPersonEn:
        "In-Gym Assessment: Ankle mobility check, hip stability screen, and real-time stance width and toe angle calibration.",
      onlineVideoAr:
        "فحص أونلاين (عن بُعد): تصوير فيديو أمامي وجانبي لتمارين الأرجل لتحليل استقامة الركبتين وتوزيع الوزن.",
      onlineVideoEn:
        "Remote Video Audit: Frontal and side video analysis of leg patterns to evaluate knee tracking and load balance.",
      medicalClearingAr:
        "التقارير الطبية والمخبرية: مراجعة أي تقارير حول الأربطة أو الغضاريف أو تحاليل المعادن والفيتامينات ذات الصلة.",
      medicalClearingEn:
        "Medical Records Review: Reviewing any ligament, cartilage, or relevant nutritional/mineral lab work.",
    },
    philosophyAr:
      "لا توجد تمارين إجبارية؛ يختار الكابتن عبدالرحمن زوايا بديلة مريحة للمفصل لتقوية العضلات المحيطة بالركبة بأمان واطمئنان.",
    philosophyEn:
      "No exercise is mandatory. Coach Al-Houti selects joint-friendly variations to strengthen surrounding muscles safely.",
  },
  hamstring: {
    id: "hamstring",
    nameEn: "Hamstring & Posterior Chain",
    nameAr: "العضلات الخلفية ومسار التمدد",
    shortNameAr: "العضلات الخلفية",
    shortNameEn: "Hamstrings",
    viewSide: "back",
    defaultPoint: [-0.18, -0.26, -0.16],
    badgeAr: "نطاق الفحص: فحص حركي شامل",
    badgeEn: "Assessment Priority: Kinetic Screening",
    overviewAr:
      "فحص مرونة وقوة العضلات الخلفية. قد يعود الشعور بالشد المتكرر لضعف في التحكم بالنزول، أو لعدم التوازن مع العضلة الأمامية، أو لطبيعة الجلوس الطويل.",
    overviewEn:
      "Assessing posterior chain tension and capacity. Recurring tightness often stems from eccentric fatigue, anterior/posterior balance, or sitting posture.",
    focusAreasAr: [
      "المرونة الحركية للعضلات الخلفية والقدرة على التحكم في النزول البطيء",
      "توازن القوة بين عضلات الفخذ الأمامية والخلفية لدعم راحة المفاصل",
      "التأكد من التفرقة بين الشد العضلي العادي وإجهاد المسار العصبي",
    ],
    focusAreasEn: [
      "Dynamic hamstring flexibility and slow eccentric control during hinging",
      "Strength balance between quadriceps and hamstrings for joint support",
      "Differentiating ordinary muscular tightness from neural sensitivity",
    ],
    assessmentMethods: {
      inPersonAr:
        "فحص حضوري (داخل النادي): اختبار مدى تمدد الساقين والتحكم في حركة ثني الورك مع إعطاء توجيهات فورية للمسار.",
      inPersonEn:
        "In-Gym Assessment: Active leg flexibility tests and hip hinge movement cues under direct coach observation.",
      onlineVideoAr:
        "فحص أونلاين (عن بُعد): تصوير فيديو جانبي لتحليل مدى نزول الأوزان وسرعة التحكم في تمارين الأرجل الخلفية.",
      onlineVideoEn:
        "Remote Video Audit: Lateral video analysis tracking hinge depth and tempo during posterior chain exercises.",
      medicalClearingAr:
        "التقارير الطبية والمخبرية: مراجعة سوابق الشد أو التمزقات العضلية لتحديد مدى وسرعة التدرج بالحمل التدريبي.",
      medicalClearingEn:
        "Medical Records Review: Checking past strain history to set an appropriate progressive overload pace.",
    },
    philosophyAr:
      "يتم ضبط المدى الحركي والأوزان بنمط تدريجي مريح يمنحك المرونة والقوة دون تعريض الأوتار للإجهاد.",
    philosophyEn:
      "Movement ranges and loads are calibrated progressively to build flexibility and resilient strength without strain.",
  },
};

export default function BiomechanicsScanner({ lang = "ar" }) {
  const isRtl = lang === "ar";
  const [selectedZoneId, setSelectedZoneId] = useState("knee");
  const [targetViewSide, setTargetViewSide] = useState(null);
  const [justUpdated, setJustUpdated] = useState(false);
  const [isAttachedToDock, setIsAttachedToDock] = useState(false);
  const resultCardRef = useRef(null);

  const [activeHit, setActiveHit] = useState({
    point: CLINICAL_ZONES.knee.defaultPoint,
    normal: [0, 0, 1],
    zoneId: "knee",
  });

  // چک کردن سشن استوریج در لود اولیه بدون ست کردن مقدار پیش‌فرض
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("user_biomechanics_audit");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.zoneId && CLINICAL_ZONES[parsed.zoneId]) {
          setSelectedZoneId(parsed.zoneId);
          setIsAttachedToDock(true);
        }
      }
    } catch (_) {}
  }, []);

  const activeZone = useMemo(
    () => CLINICAL_ZONES[selectedZoneId] || CLINICAL_ZONES.knee,
    [selectedZoneId],
  );

  // تابع سینک دیتا: کوکی حذف شده تا دیتا در سشن‌های بعدی نشت نکند
  const syncAuditData = useCallback(
    (zone) => {
      if (typeof window === "undefined" || !zone) return;

      const auditPayload = {
        zoneId: zone.id,
        nameAr: zone.nameAr,
        nameEn: zone.nameEn,
        name: lang === "ar" ? zone.nameAr : zone.nameEn,
        shortName: lang === "ar" ? zone.shortNameAr : zone.shortNameEn,
        badgeAr: zone.badgeAr,
        badgeEn: zone.badgeEn,
        screeningFocus: lang === "ar" ? zone.badgeAr : zone.badgeEn,
        riskReduction: lang === "ar" ? zone.badgeAr : zone.badgeEn,
        overviewAr: zone.overviewAr,
        overviewEn: zone.overviewEn,
        overview: lang === "ar" ? zone.overviewAr : zone.overviewEn,
        philosophyAr: zone.philosophyAr,
        philosophyEn: zone.philosophyEn,
        philosophy: lang === "ar" ? zone.philosophyAr : zone.philosophyEn,
        focusAreas: lang === "ar" ? zone.focusAreasAr : zone.focusAreasEn,
        assessmentMethods: {
          inPerson:
            lang === "ar"
              ? zone.assessmentMethods.inPersonAr
              : zone.assessmentMethods.inPersonEn,
          onlineVideo:
            lang === "ar"
              ? zone.assessmentMethods.onlineVideoAr
              : zone.assessmentMethods.onlineVideoEn,
          medicalClearing:
            lang === "ar"
              ? zone.assessmentMethods.medicalClearingAr
              : zone.assessmentMethods.medicalClearingEn,
        },
        lang: lang,
        timestamp: new Date().toISOString(),
      };

      try {
        sessionStorage.setItem(
          "user_biomechanics_audit",
          JSON.stringify(auditPayload),
        );

        // پاکسازی کامل کوکی‌های قدیمی
        document.cookie = "user_biomechanics_audit=; path=/; max-age=0";

        window.dispatchEvent(
          new CustomEvent("biomechanics_audit_updated", {
            detail: auditPayload,
          }),
        );
      } catch (e) {
        console.error("Storage error:", e);
      }
    },
    [lang],
  );

  // تابع حذف کامل پیوست
  const removeAuditData = useCallback(() => {
    try {
      sessionStorage.removeItem("user_biomechanics_audit");
      document.cookie = "user_biomechanics_audit=; path=/; max-age=0";
      window.dispatchEvent(
        new CustomEvent("biomechanics_audit_updated", { detail: null }),
      );
    } catch (e) {
      console.error("Storage error:", e);
    }
  }, []);

  const triggerFeedback = useCallback(() => {
    setJustUpdated(true);
    setTimeout(() => setJustUpdated(false), 2400);
  }, []);

  const handleBodyClick = useCallback(
    (hit) => {
      setActiveHit(hit);
      setSelectedZoneId(hit.zoneId);
      setTargetViewSide(null);
      setIsAttachedToDock(true);
      const zone = CLINICAL_ZONES[hit.zoneId] || CLINICAL_ZONES.knee;
      syncAuditData(zone);
      triggerFeedback();
    },
    [syncAuditData, triggerFeedback],
  );

  const handlePresetSelect = useCallback(
    (zoneId) => {
      const zone = CLINICAL_ZONES[zoneId];
      if (!zone) return;

      setSelectedZoneId(zoneId);
      setActiveHit({
        point: zone.defaultPoint,
        normal: [0, 0, 1],
        zoneId,
      });
      setTargetViewSide(zone.viewSide);
      setIsAttachedToDock(true);
      syncAuditData(zone);
      triggerFeedback();
    },
    [syncAuditData, triggerFeedback],
  );

  // با کلیک مجدد دکمه، در صورت پیوست بودن، لغو می‌شود
  const handleConfirmZone = () => {
    if (isAttachedToDock) {
      removeAuditData();
      setIsAttachedToDock(false);
    } else {
      syncAuditData(activeZone);
      setIsAttachedToDock(true);
      triggerFeedback();
    }
  };

  const scrollToResultsMobile = () => {
    if (resultCardRef.current) {
      resultCardRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const activeZoneTitle = isRtl ? activeZone.nameAr : activeZone.nameEn;
  const shortZoneTitle = isRtl
    ? activeZone.shortNameAr
    : activeZone.shortNameEn;

  return (
    <section
      id="biomechanics"
      className="relative w-full py-14 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#0c1012] text-white select-none overflow-hidden border-t border-zinc-800"
    >
      <div className="pointer-events-none absolute top-1/3 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fitness-primary/10 blur-[150px]" />

      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-fitness-primary/10 text-fitness-primary text-xs font-black tracking-wide mb-3 border border-fitness-primary/30 shadow-[0_0_15px_rgba(34,197,94,0.15)]">
            <Activity className="w-4 h-4 text-fitness-primary animate-pulse" />
            <span>
              {isRtl
                ? "تحديد أولويات المراجعة والتقييم الحركي"
                : "Intake Screening & Movement Priority"}
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-3">
            {isRtl
              ? "اختر المنطقة التي تود التركيز عليها مع الكابتن"
              : "Select Your Joint or Movement Focus Area"}
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-zinc-400 font-medium leading-relaxed max-w-2xl mx-auto">
            {isRtl
              ? "سواء كنت في بداية مشوارك الرياضي أو تتدرب بانتظام؛ حدد المفصل الذي ترغب في مراجعته بعناية، ليضعه الكابتن عبدالرحمن الحوطي كأولوية في جلستك الاستكشافية وتفصيل خطتك."
              : "Whether you are a beginner starting fresh or an active lifter; highlight the area you want Coach Al-Houti to prioritize during your intake assessment."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          <div className="lg:col-span-5 bg-zinc-950/90 border border-zinc-800 rounded-3xl p-3 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative">
            <AnimatePresence>
              {justUpdated && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  className="absolute top-6 inset-x-4 sm:inset-x-8 z-30 flex justify-center pointer-events-none"
                >
                  <div className="bg-zinc-900/95 text-white backdrop-blur-md px-4 py-2 rounded-2xl shadow-2xl flex items-center gap-2 border border-fitness-primary/50">
                    <span className="w-2.5 h-2.5 rounded-full bg-fitness-primary animate-ping" />
                    <span className="text-xs font-black">
                      {isRtl
                        ? `تم التحديد: ${shortZoneTitle}`
                        : `Selected: ${shortZoneTitle}`}
                    </span>
                    <span className="text-[10px] text-fitness-primary font-mono font-bold bg-fitness-primary/15 border border-fitness-primary/30 px-2 py-0.5 rounded-md">
                      {isRtl ? activeZone.badgeAr : activeZone.badgeEn}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="w-full h-[350px] sm:h-[450px] lg:h-[530px] rounded-2xl overflow-hidden relative">
              <Anatomy3DCanvas
                activeHit={activeHit}
                targetViewSide={targetViewSide}
                onBodyClick={handleBodyClick}
                onTransitionComplete={() => setTargetViewSide(null)}
                lang={lang}
              />
            </div>

            <div className="mt-3 sm:mt-4">
              <div className="flex items-center justify-between mb-2 px-1">
                <span className="text-[11px] font-bold text-zinc-400">
                  {isRtl
                    ? "اختر المفصل لتثبيته في ملفك:"
                    : "Select Area to Flag in Profile:"}
                </span>
                <button
                  type="button"
                  onClick={scrollToResultsMobile}
                  className="lg:hidden text-[11px] font-bold text-fitness-primary flex items-center gap-1 hover:underline cursor-pointer"
                >
                  <span>
                    {isRtl
                      ? "عرض تفاصيل المراجعة بالأسفل"
                      : "View Details Below"}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                {Object.values(CLINICAL_ZONES).map((z) => {
                  const isSelected =
                    selectedZoneId === z.id && isAttachedToDock;
                  return (
                    <button
                      key={z.id}
                      type="button"
                      onClick={() => handlePresetSelect(z.id)}
                      className={`px-2 py-2 sm:py-2.5 rounded-xl text-[11px] sm:text-xs font-bold truncate transition-all cursor-pointer ${
                        isSelected
                          ? "bg-fitness-primary text-fitness-bg font-black shadow-[0_0_15px_var(--color-fitness-primary)/40] scale-102"
                          : "bg-fitness-surface/80 text-fitness-muted hover:bg-fitness-surface-light hover:text-fitness-text border border-fitness-border/80"
                      }`}
                    >
                      {isRtl ? z.shortNameAr : z.shortNameEn}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div
            ref={resultCardRef}
            className="lg:col-span-7 space-y-4 sm:space-y-5"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeZone.id + lang}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="bg-zinc-950/90 border border-zinc-800 rounded-3xl p-5 sm:p-7 lg:p-8 shadow-2xl backdrop-blur-xl space-y-4 sm:space-y-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-2.5 pb-3 sm:pb-4 border-b border-zinc-800/80">
                  <div>
                    <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-fitness-primary font-mono">
                      {isRtl
                        ? activeZone.viewSide === "front"
                          ? "المنظر الأمامي"
                          : "المنظر الخلفي"
                        : activeZone.viewSide === "front"
                          ? "Anterior View"
                          : "Posterior View"}
                    </span>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white mt-0.5">
                      {activeZoneTitle}
                    </h3>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-fitness-primary/10 border border-fitness-primary/30 text-fitness-primary text-xs font-black font-mono shadow-[0_0_12px_rgba(34,197,94,0.2)]">
                    <ShieldCheck className="w-4 h-4 text-fitness-primary shrink-0" />
                    <span>
                      {isRtl ? activeZone.badgeAr : activeZone.badgeEn}
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800 space-y-2">
                  <p className="text-xs sm:text-sm text-zinc-300 font-medium leading-relaxed">
                    {isRtl ? activeZone.overviewAr : activeZone.overviewEn}
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/90 space-y-3">
                  <div className="flex items-center gap-2 text-fitness-primary">
                    <ClipboardList className="w-4 h-4 sm:w-5 sm:h-5 text-fitness-primary shrink-0" />
                    <h4 className="text-xs sm:text-sm font-black tracking-wide">
                      {isRtl
                        ? "محاور المراجعة في جلستك التقييمية:"
                        : "Key Focal Points in Your Assessment:"}
                    </h4>
                  </div>

                  <ul className="space-y-2 pt-1 border-t border-zinc-800/80">
                    {(isRtl
                      ? activeZone.focusAreasAr
                      : activeZone.focusAreasEn
                    ).map((point, idx) => (
                      <li
                        key={idx}
                        className="text-xs text-zinc-300 flex items-start gap-2.5 font-medium"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-fitness-primary shrink-0 mt-1.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800/90 space-y-3">
                  <div className="flex items-center gap-2 text-white">
                    <UserCheck className="w-4 h-4 text-fitness-primary shrink-0" />
                    <h4 className="text-xs sm:text-sm font-black">
                      {isRtl
                        ? "كيف تتم المراجعة الدقيقة مع الكابتن عبدالرحمن؟"
                        : "How Does Coach Al-Houti Assess This Area?"}
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-[11px] sm:text-xs">
                    <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-1">
                      <div className="flex items-center gap-1.5 font-bold text-fitness-primary">
                        <Activity className="w-3.5 h-3.5" />
                        <span>
                          {isRtl ? "حضوري (داخل النادي)" : "In-Gym Coaching"}
                        </span>
                      </div>
                      <p className="text-zinc-400 leading-relaxed text-[11px]">
                        {isRtl
                          ? activeZone.assessmentMethods.inPersonAr
                          : activeZone.assessmentMethods.inPersonEn}
                      </p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-1">
                      <div className="flex items-center gap-1.5 font-bold text-sky-400">
                        <Video className="w-3.5 h-3.5" />
                        <span>
                          {isRtl ? "أونلاين (عن بُعد)" : "Online Coaching"}
                        </span>
                      </div>
                      <p className="text-zinc-400 leading-relaxed text-[11px]">
                        {isRtl
                          ? activeZone.assessmentMethods.onlineVideoAr
                          : activeZone.assessmentMethods.onlineVideoEn}
                      </p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-1">
                      <div className="flex items-center gap-1.5 font-bold text-amber-400">
                        <FileText className="w-3.5 h-3.5" />
                        <span>
                          {isRtl
                            ? "سجلات وفحوصات سابقة"
                            : "Health & Lab History"}
                        </span>
                      </div>
                      <p className="text-zinc-400 leading-relaxed text-[11px]">
                        {isRtl
                          ? activeZone.assessmentMethods.medicalClearingAr
                          : activeZone.assessmentMethods.medicalClearingEn}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-zinc-900/80 via-zinc-950 to-black border border-fitness-primary/30 text-white space-y-3 shadow-[inset_0_0_30px_rgba(0,210,255,0.08)]">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs sm:text-sm font-bold text-fitness-primary flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-fitness-primary shrink-0" />
                      <span>
                        {isRtl
                          ? "منهجية تفصيل الخطة التدريبية:"
                          : "Customized Programming Principle:"}
                      </span>
                    </span>

                    <span className="text-[10px] sm:text-[11px] bg-fitness-primary/10 border border-fitness-primary/30 px-2.5 py-1 rounded-lg font-mono text-fitness-primary font-bold whitespace-nowrap shrink-0">
                      {isRtl ? "بروتوكول مخصص بالكامل" : "Bespoke Protocol"}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                    {isRtl ? activeZone.philosophyAr : activeZone.philosophyEn}
                  </p>
                </div>

                {/* دکمه الصاق / لغو الصاق */}
                <button
                  type="button"
                  onClick={handleConfirmZone}
                  className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-xs font-black transition-all sm:py-4 sm:text-sm active:scale-[0.98] ${
                    isAttachedToDock
                      ? "bg-fitness-text text-fitness-bg shadow-[0_0_25px_rgba(255,255,255,0.35)]"
                      : "bg-gradient-to-r from-fitness-primary via-fitness-primary-hover to-fitness-accent text-fitness-bg shadow-[0_0_20px_var(--color-fitness-primary)/30] hover:shadow-[0_0_30px_var(--color-fitness-primary)/50]"
                  }`}
                >
                  {isAttachedToDock ? (
                    <>
                      <Check className="h-4 w-4 stroke-[3] text-fitness-bg" />
                      <span>
                        {isRtl
                          ? `تم تثبيت مراجعة (${shortZoneTitle}) في ملفك (انقر للإلغاء) ✓`
                          : `(${shortZoneTitle}) Priority Pinned (Click to Unpin) ✓`}
                      </span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-fitness-bg" />
                      <span>
                        {isRtl
                          ? `اعتماد مراجعة (${shortZoneTitle}) كأولوية في ملفك`
                          : `Pin (${shortZoneTitle}) Priority to Profile`}
                      </span>
                    </>
                  )}
                </button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
