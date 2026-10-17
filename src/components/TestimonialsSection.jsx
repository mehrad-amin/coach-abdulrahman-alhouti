// src/components/TestimonialsSection.jsx
"use client";

import React, { useState, useRef } from "react";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  Quote,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { SPOTLIGHT_REVIEWS, PAGE_CONTENT } from "@/constants/fitnessData";

function RatingStars({ count = 5 }) {
  return (
    <div className="flex items-center gap-1">
      {[...Array(count)].map((_, i) => (
        <Star
          key={i}
          className="h-3.5 w-3.5 fill-fitness-primary text-fitness-primary drop-shadow-[0_0_6px_rgba(0,210,255,0.35)]"
        />
      ))}
    </div>
  );
}

export default function TestimonialsSection({ lang = "ar" }) {
  const reviews = SPOTLIGHT_REVIEWS[lang] || SPOTLIGHT_REVIEWS.ar;
  const t =
    PAGE_CONTENT?.testimonials?.[lang] || PAGE_CONTENT?.testimonials?.ar;
  const isRtl = lang === "ar";

  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef(null);
  const cardRefs = useRef([]);
  const isProgrammaticScroll = useRef(false);
  const scrollTimeout = useRef(null);

  const total = reviews.length;

  const scrollToCard = (index) => {
    const targetCard = cardRefs.current[index];
    if (targetCard) {
      isProgrammaticScroll.current = true;
      setActiveIndex(index);

      targetCard.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });

      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 500);
    }
  };

  const handleNext = () => {
    const nextIdx = (activeIndex + 1) % total;
    scrollToCard(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = activeIndex === 0 ? total - 1 : activeIndex - 1;
    scrollToCard(prevIdx);
  };

  const handleScroll = () => {
    if (isProgrammaticScroll.current || !scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const containerCenter =
      container.getBoundingClientRect().left + container.offsetWidth / 2;

    let closestIndex = activeIndex;
    let minDistance = Infinity;

    cardRefs.current.forEach((card, idx) => {
      if (!card) return;
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const distance = Math.abs(containerCenter - cardCenter);

      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = idx;
      }
    });

    if (closestIndex !== activeIndex) {
      setActiveIndex(closestIndex);
    }
  };

  return (
    <section
      id="testimonials"
      className="relative w-full overflow-hidden bg-[#0c1012] py-14 md:py-24 border-t border-zinc-800/80"
    >
      {/* هاله نور ملایم پس‌زمینه هماهنگ با تم */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fitness-primary/5 blur-[140px]"
      />

      {/* هدر سکشن */}
      <div className="mx-auto max-w-6xl px-6 mb-8 text-center md:mb-12">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-fitness-primary/30 bg-fitness-primary/10 px-3.5 py-1 text-xs font-bold text-fitness-primary mb-2.5 shadow-[0_0_15px_rgba(0,210,255,0.15)]">
          <Sparkles className="h-3.5 w-3.5" />
          {t?.badge || "آراء وتجارب المتدربين"}
        </span>
        <h2 className="text-2xl font-black tracking-tight md:text-4xl text-white">
          {t?.title || "قصص نجاح واقعية وإشراف مباشر"}
        </h2>
        <p className="mt-2 text-xs md:text-sm text-zinc-400 max-w-lg mx-auto leading-relaxed">
          {t?.subtitle ||
            "تجارب متدربين خاضوا مسار التطوير الرياضي والتأهيلي مع الكابتن عبدالرحمن الحوطي"}
        </p>
      </div>

      {/* اسلایدر نظرات */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex w-full items-center gap-4 sm:gap-6 overflow-x-auto py-6 px-[10vw] sm:px-[18vw] md:px-[22vw] scroll-smooth no-scrollbar"
        style={{
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {reviews.map((review, index) => {
          const isActive = index === activeIndex;

          return (
            <div
              key={review.id || index}
              ref={(el) => (cardRefs.current[index] = el)}
              onClick={() => scrollToCard(index)}
              style={{
                scrollSnapAlign: "center",
                WebkitBackfaceVisibility: "hidden",
                transform: isActive ? "scale(1)" : "scale(0.93)",
                opacity: isActive ? 1 : 0.45,
              }}
              className="shrink-0 cursor-pointer select-none transition-all duration-300 ease-out will-change-transform w-[82vw] sm:w-[480px] md:w-[560px] text-start"
            >
              <div
                className={`relative flex flex-col justify-between rounded-3xl border p-5 sm:p-7 md:p-8 backdrop-blur-xl transition-all duration-300 ${
                  isActive
                    ? "border-fitness-primary/60 bg-gradient-to-b from-zinc-900/80 via-zinc-950 to-[#0b0e11] shadow-[0_12px_35px_rgba(0,210,255,0.15)]"
                    : "border-zinc-800/90 bg-gradient-to-b from-zinc-950/90 to-[#0b0e11] hover:border-zinc-700"
                }`}
              >
                {/* ردیف بالا: ستاره‌ها و بج هدف */}
                <div className="flex items-center justify-between gap-2 border-b border-zinc-800/80 pb-4">
                  <RatingStars count={review.rating || 5} />
                  <span
                    className={`rounded-full px-3 py-0.5 text-[11px] font-bold ${
                      isActive
                        ? "border border-fitness-primary/40 bg-fitness-primary/10 text-fitness-primary"
                        : "border border-zinc-800 bg-zinc-900 text-zinc-400"
                    }`}
                  >
                    {review.tag}
                  </span>
                </div>

                {/* آمار عددی تغییر وزن یا بازتوانی */}
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="font-mono text-2xl font-black text-fitness-primary drop-shadow-[0_0_12px_rgba(0,210,255,0.3)] sm:text-3xl">
                    {review.statNumber}
                  </span>
                  <span className="text-xs font-semibold text-zinc-400">
                    {review.statLabel}
                  </span>
                </div>

                {/* متن دیدگاه */}
                <div className="relative my-4">
                  <Quote className="pointer-events-none absolute -top-2.5 -start-2 -z-0 h-6 w-6 text-zinc-800 opacity-50" />
                  <p className="relative z-10 line-clamp-4 text-xs leading-relaxed text-zinc-300 sm:line-clamp-none sm:text-sm">
                    &ldquo;{review.quote}&rdquo;
                  </p>
                </div>

                {/* ردیف پایین: نام و هدف آموزشی */}
                <div className="flex items-center justify-between border-t border-zinc-800/80 pt-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 font-mono text-xs font-black text-fitness-primary">
                      {review.clientName?.charAt(0) || "م"}
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-white sm:text-base">
                        {review.clientName}
                      </h4>
                      <p className="text-[11px] text-zinc-400">
                        {review.role || review.program}
                      </p>
                    </div>
                  </div>

                  {review.duration && (
                    <span className="inline-flex items-center gap-1 rounded-lg border border-zinc-800 bg-zinc-900 px-2.5 py-1 text-[11px] font-medium text-zinc-300">
                      <ShieldCheck className="h-3 w-3 text-fitness-primary" />
                      {review.duration}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* کنترل دکمه‌ها و شمارنده اسلایدها */}
      <div className="mx-auto max-w-6xl px-6 mt-6 flex items-center justify-between">
        {/* شمارنده اسلاید فعال */}
        <div className="flex items-center gap-1.5 font-mono text-xs sm:text-sm">
          <span className="font-bold text-fitness-primary">
            {String(activeIndex + 1).padStart(2, "0")}
          </span>
          <span className="text-zinc-600">/</span>
          <span className="text-zinc-400">
            {String(total).padStart(2, "0")}
          </span>
        </div>

        {/* دکمه‌های ناوبری */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous Testimonial"
            className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-950 text-white transition-all hover:border-fitness-primary hover:text-fitness-primary active:scale-95 cursor-pointer shadow-md"
          >
            {isRtl ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next Testimonial"
            className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-950 text-white transition-all hover:border-fitness-primary hover:text-fitness-primary active:scale-95 cursor-pointer shadow-md"
          >
            {isRtl ? (
              <ChevronLeft className="h-5 w-5" />
            ) : (
              <ChevronRight className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
