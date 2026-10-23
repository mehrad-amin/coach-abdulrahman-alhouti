// src/app/api/booking/route.js
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const GOOGLE_SHEETS_URL =
  process.env.GOOGLE_SHEETS_BOOKING_URL ||
  process.env.GOOGLE_SHEETS_PRICING_URL;

function generateFileId() {
  const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
  const timePart = Date.now().toString().slice(-3);
  return `FIT-${randomPart}${timePart}`;
}

export async function POST(req) {
  try {
    const body = await req.json();
    const cookieStore = await cookies();

    const {
      name,
      email,
      phone,
      goal,
      experience,
      trainingDays,
      notes,
      selectedPlan,
      planPrice,
      planDuration,
      locale = "ar",
    } = body;

    const isEn = locale === "en";

    // ۱. اعتبارسنجی اطلاعات تماس پایه
    if (!name || !phone || !email) {
      return NextResponse.json(
        {
          success: false,
          error: isEn
            ? "Full name, email address, and WhatsApp phone number are required."
            : "الاسم والبريد الإلكتروني ورقم الهاتف مطلوبان لإتمام الحجز.",
        },
        { status: 400 },
      );
    }

    // ۲. اعتبارسنجی اجباری بودن ماشین‌حساب
    const calcStats = body.calculatedStats;
    if (!calcStats || !calcStats.weight || !calcStats.result) {
      return NextResponse.json(
        {
          success: false,
          error: isEn
            ? "Biometric calculator data (weight, height, and goal) is mandatory to generate your plan."
            : "بيانات الحاسبة البدنية (الوزن، الطول، والهدف الأيضي) إلزامية لتحديد خطتك التدريبية بدقة.",
        },
        { status: 400 },
      );
    }

    const fileId = generateFileId();

    // ۳. فرمت‌بندی روزهای تمرین
    const formattedTrainingDays = trainingDays
      ? `${trainingDays} ${isEn ? "Days / Week" : "أيام أسبوعياً"}`
      : isEn
        ? "4 Days / Week"
        : "٤ أيام أسبوعياً";

    // ۴. اطلاعات باقه و قیمت
    let finalPrice = planPrice || body.selectedPlan?.price;
    let finalDuration = planDuration || body.selectedPlan?.duration;
    let finalTitle =
      typeof selectedPlan === "string"
        ? selectedPlan
        : selectedPlan?.title || (isEn ? "Coaching Plan" : "باقة التدريب");

    if (!finalPrice || finalPrice === "-") {
      const cookiePlan = cookieStore.get("user_selected_plan");
      if (cookiePlan?.value) {
        try {
          const parsedPlan = JSON.parse(decodeURIComponent(cookiePlan.value));
          finalPrice = parsedPlan.price || finalPrice;
          finalDuration = parsedPlan.duration || finalDuration;
          finalTitle = parsedPlan.title || finalTitle;
        } catch (_) {}
      }
    }

    // ۵. اطلاعات فحص بیومکانیک (بدون کوکی سرور)
    const bioData = body.biomechanics;
    const bioZone = bioData
      ? (isEn
          ? bioData?.nameEn || bioData?.name
          : bioData?.nameAr || bioData?.name) || "-"
      : "-";

    const bioPriority = bioData
      ? bioData?.priority ||
        bioData?.screeningFocus ||
        bioData?.riskReduction ||
        "-"
      : "-";

    // ۶. اطلاعات بیومتریک و محاسبات کالری
    const weight = calcStats.weight || "-";
    const height = calcStats.height || "-";
    const age = calcStats.age || "-";
    const gender =
      calcStats.gender === "female"
        ? isEn
          ? "Female"
          : "أنثى"
        : isEn
          ? "Male"
          : "ذكر";

    const rawCalories =
      calcStats.result?.targetCalories ||
      calcStats.result?.calories ||
      calcStats.result?.tdee ||
      null;

    const targetCaloriesStr = rawCalories ? `${rawCalories} kcal` : "-";

    const estWeight = calcStats.result?.projection?.estimatedWeight;
    const delta = calcStats.result?.projection?.expectedDelta;
    let target12wStr = "-";
    if (estWeight && estWeight !== "-") {
      target12wStr =
        delta && delta !== "-" ? `${estWeight} (${delta})` : estWeight;
    }

    const nutritionType =
      calcStats.nutrition === "coached"
        ? isEn
          ? "Precision Macro Plan"
          : "خطة مخصصة ومحسوبة الغرامات"
        : isEn
          ? "Standard Home Cooking"
          : "أكل منزلي عام";

    const supplementsType =
      calcStats.supplements === "essential"
        ? isEn
          ? "Performance Stack"
          : "مكملات أساسية (واي + كرياتين)"
        : isEn
          ? "Natural Whole Foods Only"
          : "أغذية طبيعية فقط";

    const calNumber = Number(rawCalories);
    let macrosStr = "-";
    if (!isNaN(calNumber) && calNumber > 0) {
      const p = Math.round((calNumber * 0.3) / 4);
      const c = Math.round((calNumber * 0.45) / 4);
      const f = Math.round((calNumber * 0.25) / 9);
      macrosStr = `P: ${p}g | C: ${c}g | F: ${f}g`;
    }

    const cleanUserPhone = phone ? phone.replace(/[^0-9]/g, "") : "";

    if (!GOOGLE_SHEETS_URL) {
      throw new Error("GOOGLE_SHEETS_BOOKING_URL is missing in .env.local");
    }

    const sheetPayload = {
      fileId,
      name,
      email: email.trim(),
      phone: cleanUserPhone || phone,
      plan: finalTitle,
      planPrice: finalPrice || "-",
      planDuration: finalDuration
        ? String(finalDuration).replace(/[()]/g, "").trim()
        : "-",
      goal: goal || "-",
      experience: experience || "-",
      trainingDays: formattedTrainingDays,
      notes: notes || "-",
      locale,
      biomechanics: {
        zone: bioZone,
        priority: bioPriority,
      },
      biometrics: {
        weight: weight !== "-" ? `${weight} kg` : "-",
        height: height !== "-" ? `${height} cm` : "-",
        age,
        gender,
        targetCalories: targetCaloriesStr,
        target12Weeks: target12wStr,
        nutritionType,
        supplementsType,
        macros: macrosStr,
      },
    };

    const sheetResponse = await fetch(GOOGLE_SHEETS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sheetPayload),
      redirect: "follow",
    });

    if (!sheetResponse.ok) {
      throw new Error(`Google Apps Script error: ${sheetResponse.status}`);
    }

    return NextResponse.json({
      success: true,
      fileId,
      coachPhone: process.env.NEXT_PUBLIC_COACH_WHATSAPP_PHONE || "96562222832",
      message: "Lead recorded in Google Sheets successfully!",
    });
  } catch (error) {
    console.error("Booking API Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "فشل في تسجيل البيانات." },
      { status: 500 },
    );
  }
}
