// src/components/TransformationsCarousel.jsx
"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import BeforeAfterSlider from "./BeforeAfterSlider";
import { TRANSFORMATIONS, PAGE_CONTENT } from "@/constants/fitnessData";

export default function TransformationsCarousel({ lang = "ar" }) {
  const items = TRANSFORMATIONS[lang] || TRANSFORMATIONS.ar;
  const t =
    PAGE_CONTENT[lang]?.transformations || PAGE_CONTENT.ar.transformations;
  const [currentIndex, setCurrentIndex] = useState(0);

  const total = items.length;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const currentItem = items[currentIndex];

  return (
    <section
      id="transformations"
      className="relative w-full border-t border-zinc-800 bg-[#0c1012] py-14 md:py-20 overflow-hidden"
    >
      {/* هاله نور پس‌زمینه */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fitness-primary/10 blur-[140px]" />

      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        {/* عنوان و تیتر سکشن */}
        <div className="mb-8 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-fitness-primary/30 bg-fitness-primary/10 px-3.5 py-1 text-xs font-bold text-fitness-primary mb-2.5">
            <Sparkles className="h-3.5 w-3.5" />
            {t.badge || "نتائج وإنجازات المتدربين"}
          </span>
          <h2 className="text-2xl font-black md:text-3xl text-white">
            {t.title}
          </h2>
          <p className="mt-2 text-xs md:text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* کارت نمایش تصویر تحول */}
        <div className="relative mx-auto flex max-w-[460px] flex-col items-center">
          <div
            key={currentItem?.id || currentIndex}
            className="w-full transition-opacity duration-300"
          >
            <BeforeAfterSlider item={currentItem} lang={lang} />
          </div>

          {/* نوار جابجایی و کنترل اسلایدر */}
          <div className="mt-6 flex w-full items-center justify-between px-2">
            {/* دکمه اسلاید قبلی (در RTL در سمت راست قرار می‌گیرد و فلش آن به راست اشاره می‌کند) */}
            <button
              onClick={handlePrev}
              type="button"
              aria-label="Previous Transformation"
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-950 text-white transition-all hover:border-fitness-primary hover:text-fitness-primary hover:shadow-[0_0_15px_rgba(34,197,94,0.3)] active:scale-90 cursor-pointer"
            >
              {lang === "ar" ? (
                <ChevronRight className="h-5 w-5" />
              ) : (
                <ChevronLeft className="h-5 w-5" />
              )}
            </button>

            {/* شمارنده و نوار وضعیت */}
            <div className="flex flex-col items-center gap-2">
              <span className="font-mono text-xs font-black tracking-widest text-fitness-primary">
                {String(currentIndex + 1).padStart(2, "0")}{" "}
                <span className="text-zinc-600">/</span>{" "}
                {String(total).padStart(2, "0")}
              </span>

              {/* نوار پیشرفت */}
              <div className="h-1.5 w-32 sm:w-40 overflow-hidden rounded-full bg-zinc-800">
                <div
                  className="h-full bg-fitness-primary transition-all duration-300 shadow-[0_0_8px_rgba(34,197,94,0.8)]"
                  style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
                />
              </div>
            </div>

            {/* دکمه اسلاید بعدی (در RTL در سمت چپ قرار می‌گیرد و فلش آن به چپ اشاره می‌کند) */}
            <button
              onClick={handleNext}
              type="button"
              aria-label="Next Transformation"
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-950 text-white transition-all hover:border-fitness-primary hover:text-fitness-primary hover:shadow-[0_0_15px_rgba(34,197,94,0.3)] active:scale-90 cursor-pointer"
            >
              {lang === "ar" ? (
                <ChevronLeft className="h-5 w-5" />
              ) : (
                <ChevronRight className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
