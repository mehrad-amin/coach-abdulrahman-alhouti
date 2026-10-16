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
      phone,
      goal,
      experience,
      notes,
      selectedPlan,
      planPrice,
      planDuration,
      locale = "ar",
    } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { success: false, error: "الاسم ورقم الهاتف مطلوبان لإتمام الحجز." },
        { status: 400 },
      );
    }

    const fileId = generateFileId();
    const isEn = locale === "en";

    // ۱. اطلاعات باقه و قیمت
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

    // ۲. اطلاعات فحص بیومکانیک (آناتومی سه‌بعدی)
    let bioData = body.biomechanics;
    if (!bioData) {
      const cookieBio = cookieStore.get("user_biomechanics_audit");
      if (cookieBio?.value) {
        try {
          bioData = JSON.parse(decodeURIComponent(cookieBio.value));
        } catch (_) {}
      }
    }

    const bioZone = isEn
      ? bioData?.nameEn || bioData?.name || "None Selected"
      : bioData?.nameAr || bioData?.name || "سليم (بدون شكوى)";

    // اولویت ارزیابی حرکتی
    const bioPriority =
      bioData?.priority ||
      bioData?.riskReduction ||
      (isEn ? "Standard Assessment" : "تقييم عام");

    // ۳. اطلاعات بیومتریک و محاسبات کالری
    const calcStats = body.calculatedStats;
    const weight = calcStats?.weight || "-";
    const height = calcStats?.height || "-";
    const age = calcStats?.age || "-";
    const gender =
      calcStats?.gender === "female"
        ? isEn
          ? "Female"
          : "أنثى"
        : isEn
          ? "Male"
          : "ذكر";

    const rawCalories =
      calcStats?.result?.targetCalories ||
      calcStats?.result?.calories ||
      calcStats?.result?.tdee ||
      null;

    const targetCaloriesStr = rawCalories ? `${rawCalories} kcal` : "-";

    const estWeight = calcStats?.result?.projection?.estimatedWeight;
    const delta = calcStats?.result?.projection?.expectedDelta;
    let target12wStr = "-";
    if (estWeight && estWeight !== "-") {
      target12wStr =
        delta && delta !== "-" ? `${estWeight} (${delta})` : estWeight;
    }

    const nutritionType =
      calcStats?.nutrition === "coached"
        ? isEn
          ? "Precision Macro Plan"
          : "خطة مخصصة ومحسوبة الغرامات"
        : isEn
          ? "Standard Home Cooking"
          : "أكل منزلي عام";

    const supplementsType =
      calcStats?.supplements === "essential"
        ? isEn
          ? "Performance Stack"
          : "مكملات أساسية (واي + كرياتين)"
        : isEn
          ? "Natural Whole Foods Only"
          : "أغذية طبيعية فقط";

    // تفکیک خالص ماکروها بدون کاراکتر اضافه
    const calNumber = Number(rawCalories);
    let macrosStr = "-";
    if (!isNaN(calNumber) && calNumber > 0) {
      const p = Math.round((calNumber * 0.3) / 4);
      const c = Math.round((calNumber * 0.45) / 4);
      const f = Math.round((calNumber * 0.25) / 9);
      macrosStr = `P: ${p}g | C: ${c}g | F: ${f}g`;
    }

    const cleanUserPhone = phone ? phone.replace(/[^0-9]/g, "") : "";

    // ۴. ارسال به Google Apps Script
    if (!GOOGLE_SHEETS_URL) {
      throw new Error("GOOGLE_SHEETS_BOOKING_URL is missing in .env.local");
    }

    const sheetPayload = {
      fileId,
      name,
      phone: cleanUserPhone || phone,
      plan: finalTitle,
      planPrice: finalPrice || "-",
      planDuration: finalDuration
        ? String(finalDuration).replace(/[()]/g, "").trim()
        : "-",
      goal: goal || "-",
      experience: experience || "-",
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
    // ارسال اعلان فوری به تلگرام مربی
    await sendTelegramLeadAlert({
      fileId,
      name,
      phone,
      plan: finalTitle,
      price: finalPrice || "-",
      targetKcal: targetCaloriesStr,
      bioZone,
      macros: macrosStr,
    });

    return NextResponse.json({
      success: true,
      fileId,
      coachPhone: process.env.COACH_WHATSAPP_PHONE || "96599000000",
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
async function sendTelegramLeadAlert({
  fileId,
  name,
  phone,
  plan,
  price,
  targetKcal,
  bioZone,
  macros,
}) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const coachChatId = process.env.COACH_TELEGRAM_CHAT_ID;

  if (!botToken || !coachChatId) return;

  const cleanPhone = String(phone).replace(/[^\d]/g, "");

  const messageText =
    `🔔 *مشترك جديد عبر الموقع* (#${fileId})\n\n` +
    `👤 *الاسم:* ${name}\n` +
    `📞 *الهاتف:* \`${phone}\`\n` +
    `💎 *الباقة:* ${plan} (${price})\n` +
    `🎯 *السعرات:* ${targetKcal}\n` +
    `🛡️ *فحص المفاصل:* ${bioZone}\n` +
    `🥗 *الماكروز:* \`${macros}\`\n\n` +
    `⚡️ اضغط أدناه للتواصل عبر واتساب:`;

  try {
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: coachChatId,
        text: messageText,
        parse_mode: "Markdown",
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "💬 فتح محادثة WhatsApp مباشرة",
                url: `https://wa.me/${cleanPhone}`,
              },
            ],
          ],
        },
      }),
    });
  } catch (error) {
    console.error("Failed to send telegram notification:", error);
  }
}
