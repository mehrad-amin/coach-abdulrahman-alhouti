// src/components/ContactSection.jsx
"use client";

import React, { useRef, useState } from "react";
import {
  Phone,
  MessageSquare,
  MapPin,
  ExternalLink,
  Clock,
  Sparkles,
} from "lucide-react";
import { CONTACT_INFO } from "@/constants/fitnessData";

const CONTACT_UI_TEXT = {
  ar: {
    badge: "قنوات التواصل المباشر",
    title: "معلومات التواصل ومقر التدريب",
    subtitle:
      "للاستشارات الخاصة، فحص التناسق العضلي، وحجز باقات التدريب الميداني والأونلاين",
    card1: {
      title: "الاتصال والاستشارة الهاتفية",
      desc: "للتواصل المباشر والإجابة على الاستفسارات الفنية قبل الاشتراك:",
      hoursLabel: "ساعات الاستجابة والتواصل الرسمي:",
    },
    card2: {
      title: "المحادثة وحسابات التواصل",
      desc: "التواصل الفوري، إرسال مقاطع التكنيك، والمتابعة عبر المنصات الرسمية:",
      whatsappTitle: "واتساب المباشر",
      instagramTitle: "إنستغرام الرسمي",
      xTitle: "منصة إكس (تويتر)",
      note: "استجابة مباشرة مع الكابتن عبدالرحمن خلال ساعات العمل الرسمية",
    },
    card3: {
      status: "المقر متاح ونشط في الكويت",
      title: "مقر التدريب والتأهيل الميداني",
      googleMaps: "Google Maps",
      appleMaps: "Apple Maps",
    },
  },
  en: {
    badge: "Direct Contact Channels",
    title: "Get in Touch & Training Facility",
    subtitle:
      "For private consultations, kinetic chain assessments, and VIP coaching sessions",
    card1: {
      title: "Direct Phone & Consultations",
      desc: "For pre-onboarding inquiries and personal coaching reservations:",
      hoursLabel: "Official Response & Coaching Hours:",
    },
    card2: {
      title: "Instant Chat & Social Channels",
      desc: "Immediate chat, technique video reviews, and official updates:",
      whatsappTitle: "Direct WhatsApp",
      instagramTitle: "Official Instagram",
      xTitle: "X (Twitter) Profile",
      note: "Prompt response directly by Capt. Abdulrahman during business hours",
    },
    card3: {
      status: "Active Facility in Kuwait",
      title: "Training Facility & In-Gym Location",
      googleMaps: "Google Maps",
      appleMaps: "Apple Maps",
    },
  },
};

// آیکون‌های وکتوری رسمی شبکه‌های اجتماعی
function WhatsAppIcon({ className = "h-4 w-4" }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  );
}

function InstagramIcon({ className = "h-4 w-4" }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function XIcon({ className = "h-4 w-4" }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function Contact3DCard({ children, className = "" }) {
  const cardRef = useRef(null);
  const [coords, setCoords] = useState({ x: 50, y: 50 });
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isInteracting, setIsInteracting] = useState(false);

  const handlePointerMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setCoords({
      x: Math.round((x / rect.width) * 100),
      y: Math.round((y / rect.height) * 100),
    });

    const rotateX = (y / rect.height - 0.5) * -10;
    const rotateY = (x / rect.width - 0.5) * 10;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handlePointerLeave = () => {
    setIsInteracting(false);
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onPointerDown={() => setIsInteracting(true)}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerCancel={handlePointerLeave}
      style={{
        transform: isInteracting
          ? `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) translateY(-4px)`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)",
        transition: isInteracting
          ? "none"
          : "transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1)",
      }}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-zinc-800 bg-gradient-to-b from-zinc-950/90 to-[#0a0d0c] p-6 sm:p-7 shadow-[0_15px_35px_rgba(0,0,0,0.6)] transition-all hover:border-fitness-primary/50 [transform-style:preserve-3d] ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-active:opacity-100"
        style={{
          background: `radial-gradient(350px circle at ${coords.x}% ${coords.y}%, rgba(34, 197, 94, 0.15), transparent 80%)`,
        }}
      />
      <div className="relative z-10 flex h-full flex-col justify-between [transform:translateZ(20px)]">
        {children}
      </div>
    </div>
  );
}

export default function ContactSection({ lang = "ar" }) {
  const isRtl = lang === "ar";
  const ui = CONTACT_UI_TEXT[lang] || CONTACT_UI_TEXT.ar;

  const currentAddress =
    typeof CONTACT_INFO.address === "object"
      ? CONTACT_INFO.address[lang] || CONTACT_INFO.address.ar
      : CONTACT_INFO.address;

  const currentWorkingHours =
    typeof CONTACT_INFO.workingHours === "object"
      ? CONTACT_INFO.workingHours[lang] || CONTACT_INFO.workingHours.ar
      : CONTACT_INFO.workingHours;

  const cleanPhone = (
    CONTACT_INFO.whatsappNumber || CONTACT_INFO.phone
  )?.replace(/[^0-9]/g, "");
  const whatsappUrl = `https://wa.me/${cleanPhone}`;

  return (
    <section
      id="contact"
      className="relative w-full border-t border-zinc-800/80 py-16 md:py-24 overflow-hidden bg-[#0c1012]"
    >
      <div className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fitness-primary/5 blur-[150px]" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* هیدور بخش */}
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-fitness-primary/30 bg-fitness-primary/10 px-4 py-1.5 text-xs font-bold text-fitness-primary mb-3 shadow-[0_0_15px_rgba(34,197,94,0.15)]">
            <Sparkles className="h-3.5 w-3.5 text-fitness-primary" />
            <span>{ui.badge}</span>
          </span>
          <h2 className="text-2xl font-black tracking-tight text-white md:text-4xl">
            {ui.title}
          </h2>
          <p className="mt-3 text-xs text-zinc-400 md:text-sm max-w-xl mx-auto leading-relaxed">
            {ui.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 items-stretch">
          {/* کارت ۱: تماس مستقیم و ساعات کاری */}
          <Contact3DCard>
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-fitness-primary/30 bg-fitness-primary/10 text-fitness-primary shadow-[0_0_15px_rgba(34,197,94,0.2)]">
                <Phone className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-black text-white">
                {ui.card1.title}
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">
                {ui.card1.desc}
              </p>

              <div className="mt-5">
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  dir="ltr"
                  className="inline-flex items-center gap-2.5 rounded-xl border border-fitness-primary/40 bg-zinc-950/80 px-4 py-2.5 font-mono text-base font-black tracking-wider text-fitness-primary shadow-inner transition-all hover:bg-fitness-primary hover:text-black cursor-pointer"
                >
                  <Phone className="h-4 w-4" />
                  <span>{CONTACT_INFO.displayPhone}</span>
                </a>
              </div>
            </div>

            <div className="mt-6 border-t border-zinc-800/80 pt-4">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-zinc-400">
                <Clock className="h-3.5 w-3.5 text-fitness-primary" />
                <span>{ui.card1.hoursLabel}</span>
              </div>
              <p className="mt-1 text-xs font-bold text-zinc-200">
                {currentWorkingHours}
              </p>
            </div>
          </Contact3DCard>

          {/* کارت ۲: شبکه‌های اجتماعی رسمی (واتساپ، اینستاگرام، ایکس) */}
          <Contact3DCard>
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-fitness-primary/30 bg-fitness-primary/10 text-fitness-primary shadow-[0_0_15px_rgba(34,197,94,0.2)]">
                <MessageSquare className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-black text-white">
                {ui.card2.title}
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">
                {ui.card2.desc}
              </p>

              <div className="mt-5 space-y-2">
                {/* واتساپ */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/item flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950/70 p-2.5 transition-all hover:border-fitness-primary hover:bg-fitness-primary/10 cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="rounded-lg bg-fitness-primary/15 p-1.5 text-fitness-primary">
                      <WhatsAppIcon className="h-4 w-4" />
                    </div>
                    <span className="text-xs font-bold text-zinc-200 group-hover/item:text-white">
                      {ui.card2.whatsappTitle}
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-zinc-500 group-hover/item:text-fitness-primary flex items-center gap-1">
                    <span>{CONTACT_INFO.displayPhone}</span>
                    <ExternalLink className="h-3 w-3" />
                  </span>
                </a>

                {/* اینستاگرام */}
                <a
                  href={CONTACT_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/item flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950/70 p-2.5 transition-all hover:border-fitness-primary hover:bg-fitness-primary/10 cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="rounded-lg bg-fitness-primary/15 p-1.5 text-fitness-primary">
                      <InstagramIcon className="h-4 w-4" />
                    </div>
                    <span className="text-xs font-bold text-zinc-200 group-hover/item:text-white">
                      {ui.card2.instagramTitle}
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-zinc-500 group-hover/item:text-fitness-primary flex items-center gap-1">
                    <span>@{CONTACT_INFO.instagramUsername}</span>
                    <ExternalLink className="h-3 w-3" />
                  </span>
                </a>

                {/* شبکه ایکس (توییتر) */}
                <a
                  href={CONTACT_INFO.xUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/item flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950/70 p-2.5 transition-all hover:border-fitness-primary hover:bg-fitness-primary/10 cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="rounded-lg bg-fitness-primary/15 p-1.5 text-fitness-primary">
                      <XIcon className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-xs font-bold text-zinc-200 group-hover/item:text-white">
                      {ui.card2.xTitle}
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-zinc-500 group-hover/item:text-fitness-primary flex items-center gap-1">
                    <span>@{CONTACT_INFO.xUsername}</span>
                    <ExternalLink className="h-3 w-3" />
                  </span>
                </a>
              </div>
            </div>

            <div className="mt-5 border-t border-zinc-800/80 pt-3 text-[11px] text-zinc-500">
              {ui.card2.note}
            </div>
          </Contact3DCard>

          {/* کارت ۳: موقعیت مکانی و مقرهای باشگاهی */}
          <Contact3DCard>
            <div>
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-fitness-primary/30 bg-fitness-primary/10 text-fitness-primary shadow-[0_0_15px_rgba(34,197,94,0.2)]">
                  <MapPin className="h-5 w-5" />
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {ui.card3.status}
                </span>
              </div>

              <h3 className="mt-5 text-lg font-black text-white">
                {ui.card3.title}
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">
                {currentAddress}
              </p>
            </div>

            <div className="mt-6">
              <div className="flex items-center gap-2.5 border-t border-zinc-800/80 pt-4">
                <a
                  href={CONTACT_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 rounded-xl border border-zinc-800 bg-zinc-950/80 py-3 text-center text-xs font-black text-zinc-200 transition-all hover:border-fitness-primary hover:bg-fitness-primary hover:text-black cursor-pointer shadow-sm"
                >
                  {ui.card3.googleMaps}
                </a>
                <a
                  href={CONTACT_INFO.appleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 rounded-xl border border-zinc-800 bg-zinc-950/80 py-3 text-center text-xs font-black text-zinc-200 transition-all hover:border-fitness-primary hover:bg-fitness-primary hover:text-black cursor-pointer shadow-sm"
                >
                  {ui.card3.appleMaps}
                </a>
              </div>
            </div>
          </Contact3DCard>
        </div>
      </div>
    </section>
  );
}
