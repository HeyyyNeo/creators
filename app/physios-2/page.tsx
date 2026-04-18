"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

const services = [
  "Orthopedic Physiotherapy",
  "Sports Injury Rehabilitation",
  "Neurological Physiotherapy",
  "Post-Surgical Recovery",
  "Geriatric Physiotherapy",
  "Manual Therapy & Dry Needling",
  "Pain Management",
  "Balance & Vestibular Rehab",
];

export default function DrMaryaPhysio() {
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-slate-50 overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="text-2xl font-bold text-sky-600">Dr. K S Marya</div>
            <div className="text-sm text-slate-500">Max Healthcare</div>
          </div>
          <button
            onClick={() =>
              alert(
                "Appointment request initiated! Our team will contact you shortly."
              )
            }
            className="px-8 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-full font-medium transition-all active:scale-95"
          >
            Book Appointment
          </button>
        </div>
      </nav>

      {/* Hero Section with Revolving Services */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-transparent to-slate-900/70 z-10" />

        {/* Background subtle effects */}
        <div className="absolute inset-0 bg-[radial-gradient(#0ea5e9_0.8px,transparent_1px)] bg-[length:40px_40px] opacity-10" />

        <div className="relative z-20 text-center px-6 max-w-5xl mx-auto">
          {/* Centered Doctor Image */}
          <div className="relative mx-auto w-[380px] h-[380px] mb-12">
            <div className="absolute inset-0 bg-gradient-to-br from-sky-400 to-blue-600 rounded-full blur-3xl opacity-30 animate-pulse" />

            <div className="relative w-full h-full rounded-full overflow-hidden border-8 border-white shadow-2xl">
              <Image
                src="/doctor.jpg" // ← Replace with your actual image path (or use external URL)
                alt="Dr. K S Marya"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* MAX Healthcare Logo on image */}
            <div className="absolute -bottom-3 -right-3 bg-white rounded-2xl shadow-lg px-6 py-2 flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                M
              </div>
              <div>
                <div className="font-semibold text-sm">MAX Healthcare</div>
                <div className="text-[10px] text-slate-500 -mt-1">
                  Official Partner
                </div>
              </div>
            </div>
          </div>

          {/* Name & Title */}
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-4 tracking-tight">
            Dr. K S Marya
          </h1>
          <p className="text-2xl text-sky-100 mb-16">
            Senior Physiotherapist &amp; Rehabilitation Specialist
          </p>

          {/* Revolving Services Circle */}
          <div className="relative mx-auto w-[620px] h-[620px] mb-20">
            {services.map((service, index) => {
              const angle = index * (360 / services.length) - 90;
              const radius = 280;
              const x = Math.cos((angle * Math.PI) / 180) * radius;
              const y = Math.sin((angle * Math.PI) / 180) * radius;

              return (
                <div
                  key={index}
                  className="absolute transition-all duration-700 ease-out hover:scale-110"
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    transform: `translate(-50%, -50%)`,
                  }}
                  onMouseEnter={() => setHoveredService(index)}
                  onMouseLeave={() => setHoveredService(null)}
                >
                  <div
                    className={`bg-white/95 backdrop-blur-md px-8 py-4 rounded-2xl shadow-xl border border-sky-100 cursor-pointer transition-all duration-300 text-center w-52
                      ${
                        hoveredService === index
                          ? "scale-110 shadow-2xl border-sky-400 -translate-y-3"
                          : ""
                      }`}
                  >
                    <div className="font-semibold text-slate-800 text-lg leading-tight">
                      {service}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Center Glow Ring */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] border border-sky-400/30 rounded-full animate-[spin_40s_linear_infinite]" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] border border-sky-300/20 rounded-full animate-[spin_60s_linear_infinite_reverse]" />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-6 justify-center">
            <button
              onClick={() =>
                alert(
                  "✅ Consultation booked successfully!\nDr. Marya’s team will reach out within 2 hours."
                )
              }
              className="group px-12 py-5 bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white text-xl font-semibold rounded-2xl transition-all active:scale-95 shadow-xl flex items-center gap-3"
            >
              Book Appointment Now
              <span className="group-hover:rotate-12 transition-transform">
                →
              </span>
            </button>

            <button
              className="px-12 py-5 border-2 border-white/80 hover:border-white text-white text-xl font-medium rounded-2xl transition-all active:scale-95 backdrop-blur-sm"
              onClick={() => window.scrollTo({ top: 800, behavior: "smooth" })}
            >
              Explore All Services
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/70 flex flex-col items-center gap-2 animate-bounce">
          <div className="text-sm tracking-widest">SCROLL TO EXPLORE</div>
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/50 to-transparent" />
        </div>
      </section>

      {/* More Sections can be added below */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-8 text-center">
          <h2 className="text-5xl font-bold text-slate-800 mb-6">
            Advanced Physiotherapy Care
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Personalized rehabilitation programs with state-of-the-art equipment
            at Max Healthcare.
          </p>
        </div>
      </section>
    </div>
  );
}
