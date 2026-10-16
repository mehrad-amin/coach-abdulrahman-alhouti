// src/components/FaqSection.jsx
"use client";

import React, { useState } from "react";
import {
  Plus,
  ArrowLeft,
  ArrowRight,
  MessageCircle,
  HelpCircle,
} from "lucide-react";
import { FAQS } from "@/constants/fitnessData";

const FAQ_UI_TEXT = {
  ar: {
    badge: "إجابات واضحة ومنهجية علمية",
    title: "الأسئلة الشائعة والاستشارات المعتمدة",
    subtitle:
      "إجابات الكابتن عبدالرحمن الحوطي على أبرز استفسارات المتدربين حول التكنيك، التغذية، والتحول البدني المستدام",
    askMoreTitle: "لديك سؤال خاص أو استفسار لم تجد إجابته هنا؟",
    askMoreDesc:
      "تواصل مباشرة مع الكابتن عبدالرحمن عبر واتساب لطرح حالتك والحصول على توجيه دقيق.",
    whatsappBtn: "تحدث مع الكابتن عبر واتساب",
    whatsappMessage:
      "مرحباً كابتن عبدالرحمن، لدي استفسار رياضي بخصوص التمارين والتغذية.",
  },
  en: {
    badge: "Clear & Evidence-Based Answers",
    title: "Frequently Asked Questions & Coaching Insights",
    subtitle:
      "Capt. Abdulrahman Al-Houti's direct answers on technique, metabolic plateaus, and sustainable body transformation",
    askMoreTitle: "Have a specific question not covered here?",
    askMoreDesc:
      "Connect directly with Capt. Abdulrahman on WhatsApp for immediate guidance on your case.",
    whatsappBtn: "Chat with Coach on WhatsApp",
    whatsappMessage:
      "Hello Capt. Abdulrahman, I have an inquiry regarding training and nutrition.",
  },
};

export default function FaqSection({
  faqs,
  lang = "ar",
  coachWhatsapp = process.env.NEXT_PUBLIC_COACH_WHATSAPP_PHONE || "96562222832",
}) {
  const isRtl = lang === "ar";
  const ui = FAQ_UI_TEXT[lang] || FAQ_UI_TEXT.ar;

  const activeFaqs = faqs && faqs.length > 0 ? faqs : FAQS[lang] || FAQS.ar;

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (idx) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  const cleanPhone = coachWhatsapp.replace(/[^0-9]/g, "");
  const whatsappDirectUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    ui.whatsappMessage,
  )}`;

  return (
    <section
      id="faq"
      className="relative w-full border-t border-zinc-800/80 py-16 md:py-24 overflow-hidden bg-[#0c1012]"
    >
      <div className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fitness-primary/5 blur-[140px]" />

      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        {/* هیدور بخش */}
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-fitness-primary/30 bg-fitness-primary/10 px-4 py-1.5 text-xs font-bold text-fitness-primary mb-3 shadow-[0_0_15px_rgba(34,197,94,0.15)]">
            <HelpCircle className="h-3.5 w-3.5 text-fitness-primary" />
            <span>{ui.badge}</span>
          </span>
          <h2 className="text-2xl font-black tracking-tight text-white md:text-4xl">
            {ui.title}
          </h2>
          <p className="mt-3 text-xs text-zinc-400 md:text-sm max-w-xl mx-auto leading-relaxed">
            {ui.subtitle}
          </p>
        </div>

        {/* لیست آکاردئونی سوالات با آیکون‌های وکتوری Lucide */}
        <div className="space-y-4">
          {activeFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            const formattedIdx = String(idx + 1).padStart(2, "0");

            return (
              <div
                key={idx}
                className={`relative overflow-hidden rounded-2xl border bg-gradient-to-b from-zinc-950/95 via-zinc-950/80 to-[#0a0d0c] p-5 shadow-[0_10px_25px_rgba(0,0,0,0.5)] transition-all duration-300 ${
                  isOpen
                    ? "border-fitness-primary/60 shadow-[0_12px_35px_rgba(34,197,94,0.12)] scale-[1.01]"
                    : "border-zinc-800/90 hover:border-zinc-700"
                }`}
              >
                {/* خط نئونی بالای کارت */}
                <div
                  className={`pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-fitness-primary/80 to-transparent transition-opacity duration-300 ${
                    isOpen ? "opacity-100" : "opacity-0"
                  }`}
                />

                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="flex w-full cursor-pointer select-none items-center justify-between gap-4 text-start"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3.5">
                    <span
                      className={`font-mono text-xs font-black transition-colors ${
                        isOpen ? "text-fitness-primary" : "text-zinc-500"
                      }`}
                    >
                      {formattedIdx}
                    </span>
                    <span
                      className={`text-sm font-black transition-colors md:text-base leading-snug ${
                        isOpen ? "text-fitness-primary" : "text-zinc-100"
                      }`}
                    >
                      {faq.question}
                    </span>
                  </div>

                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 ${
                      isOpen
                        ? "rotate-45 border-fitness-primary/50 bg-fitness-primary/15 text-fitness-primary shadow-[0_0_12px_rgba(34,197,94,0.3)]"
                        : "border-zinc-800 bg-zinc-900/80 text-zinc-400"
                    }`}
                  >
                    <Plus className="h-4 w-4" />
                  </div>
                </button>

                <div
                  className={`grid transition-[grid-template-rows] duration-150 ease-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100 mt-4"
                      : "grid-rows-[0fr] opacity-0 mt-0"
                  }`}
                >
                  <div className="overflow-hidden border-s-2 border-fitness-primary/40 ps-4 pt-1">
                    <p className="text-xs sm:text-sm leading-relaxed text-zinc-300 font-normal">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* کارت ارتباط مستقیم واتساپ با آیکون‌های وکتوری ArrowLeft و ArrowRight */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-zinc-800/80 bg-zinc-950/70 p-5 text-center sm:flex-row sm:text-start shadow-xl">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-fitness-primary/10 border border-fitness-primary/30 text-fitness-primary">
              <MessageCircle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-zinc-200">
                {ui.askMoreTitle}
              </p>
              <p className="mt-0.5 text-[11px] text-zinc-500">
                {ui.askMoreDesc}
              </p>
            </div>
          </div>

          <a
            href={whatsappDirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex shrink-0 items-center gap-2 rounded-xl border border-fitness-primary/40 bg-fitness-primary/10 px-4 py-2.5 text-xs font-bold text-fitness-primary transition-colors hover:bg-fitness-primary hover:text-black cursor-pointer shadow-[0_0_15px_rgba(34,197,94,0.15)] active:scale-95"
          >
            <span>{ui.whatsappBtn}</span>
            {isRtl ? (
              <ArrowLeft className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:-translate-x-1" />
            ) : (
              <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
            )}
          </a>
        </div>
      </div>
    </section>
  );
}
