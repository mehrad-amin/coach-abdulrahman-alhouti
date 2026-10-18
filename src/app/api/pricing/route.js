// src/app/api/pricing/route.js
import { NextResponse } from "next/server";
import { PRICING_PLANS } from "@/constants/fitnessData";

// این دو خط اجباری هستند تا Next.js و کلادفلر هیچ‌گونه کش استاتیکی روی این روت نسازند
export const dynamic = "force-dynamic";
export const revalidate = 0;

const SCRIPT_URL =
  process.env.GOOGLE_SHEETS_PRICING_URL ||
  "https://script.google.com/macros/s/AKfycbxm7-EMX6QQoD26_CWil22TrB4G9jvI60pGJdP-m8F3iv4RbHx1JAXazHRHpM4tEgyiDg/exec";

export async function GET() {
  try {
    const response = await fetch(SCRIPT_URL, {
      method: "GET",
      redirect: "follow",
      cache: "no-store", // واکشی مستقیم و زنده در هر ثانیه بدون کش
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Google Apps Script responded with status ${response.status}`,
      );
    }

    const data = await response.json();

    // بررسی ساختار دیتای دریافتی
    if (!data?.plans?.ar && !data?.ar) {
      console.error(
        "Payload received from Google Sheets does not match expected structure:",
        data,
      );
      throw new Error("Invalid payload structure from Google Sheets");
    }

    // نرمال‌سازی در صورتی که دیتا داخل data.plans یا مستقیم روی data باشد
    const plansData = data.plans || data;

    return NextResponse.json(
      { success: true, plans: plansData },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      },
    );
  } catch (error) {
    console.error("Pricing API Error (Falling back to local):", error.message);

    // بازگرداندن داده‌های لوکال به همراه هدر no-store تا پس از رفع خطا سریعاً آپدیت شود
    return NextResponse.json(
      {
        status: "fallback",
        error: error.message,
        plans: PRICING_PLANS,
      },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      },
    );
  }
}
