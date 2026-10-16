// src/components/BeforeAfterSlider.jsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ShieldCheck } from "lucide-react";

export default function BeforeAfterSlider({ item, lang = "ar" }) {
  const [imageError, setImageError] = useState(false);
  const isRtl = lang === "ar";

  const t = {
    before: isRtl ? "قبل" : "Before",
    after: isRtl ? "بعد" : "After",
    verified: isRtl ? "نتيجة تدريبية معتمدة" : "Verified Transformation",
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-900 to-[#0c1012] p-3.5 sm:p-4 shadow-[0_20px_40px_rgba(0,0,0,0.8)] transition-all duration-300 hover:border-fitness-primary/50 w-full">
      {/* فریم عکس با نسبت ابعاد متناسب برای عکس‌های قبل و بعد جفتی */}
      <div className="relative aspect-square w-full select-none overflow-hidden rounded-2xl bg-zinc-950 border border-zinc-800/80">
        {!imageError ? (
          <Image
            src={item.img}
            alt={t.verified}
            fill
            sizes="(max-width: 768px) 92vw, 480px"
            priority
            onError={() => setImageError(true)}
            className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-zinc-500">
            {t.verified} #{item.id}
          </div>
        )}

        {/* برچسب شیشه‌ای سمت چپ (قبل) */}
        <div className="pointer-events-none absolute top-3.5 left-3.5 rounded-xl border border-white/10 bg-black/75 px-3 py-1 text-xs font-black text-zinc-300 shadow-lg backdrop-blur-md">
          {t.before}
        </div>

        {/* برچسب شیشه‌ای نئونی سمت راست (بعد) */}
        <div className="pointer-events-none absolute top-3.5 right-3.5 rounded-xl border border-fitness-primary/50 bg-fitness-primary px-3 py-1 text-xs font-black text-black shadow-[0_0_15px_rgba(34,197,94,0.4)] backdrop-blur-md">
          {t.after}
        </div>

        {/* خط نئونی ملایم در هاور */}
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-fitness-primary/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* نوار اعتبار پایین کارت */}
      <div className="mt-3.5 flex items-center justify-between px-1.5 py-1">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-fitness-primary" />
          <span className="text-xs font-bold text-zinc-300">
            {t.verified} #{item.id}
          </span>
        </div>
        <span className="rounded-lg border border-fitness-primary/30 bg-fitness-primary/10 px-2.5 py-0.5 font-mono text-[11px] font-bold text-fitness-primary">
          {item.tag || "100% طبيعي"}
        </span>
      </div>
    </div>
  );
}
