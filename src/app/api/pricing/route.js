// src/app/api/pricing/route.js
import { NextResponse } from "next/server";
import { PRICING_PLANS } from "@/constants/fitnessData";

const SCRIPT_URL =
  process.env.GOOGLE_SHEETS_PRICING_URL ||
  "https://script.google.com/macros/s/AKfycbxm7-EMX6QQoD26_CWil22TrB4G9jvI60pGJdP-m8F3iv4RbHx1JAXazHRHpM4tEgyiDg/exec";

export async function GET() {
  try {
    const response = await fetch(SCRIPT_URL, {
      method: "GET",
      redirect: "follow", // جهت هندل کردن ریدایرکت‌های Google Apps Script
      next: { revalidate: 60 }, // به‌روزرسانی خودکار کش هر ۶۰ ثانیه یک‌بار
    });

    if (!response.ok) {
      throw new Error(`Google Apps Script responded with ${response.status}`);
    }

    const data = await response.json();

    if (!data?.plans?.ar || !data?.plans?.en) {
      throw new Error("Invalid payload structure from Google Sheets");
    }

    return NextResponse.json(data);
  } catch (error) {
    console.warn("Falling back to local PRICING_PLANS due to:", error.message);
    // بازگرداندن امن داده‌های محلی تا سایت هرگز خالی نماند
    return NextResponse.json({
      status: "fallback",
      plans: PRICING_PLANS,
    });
  }
}
