"use client";

import { motion, useReducedMotion } from "framer-motion";
import SpotlightCard from "@/components/SpotlightCard";

const codeLines = [
  { number: "01", content: "const developer = {" },
  { number: "02", content: '  name: "Erlangga",' },
  { number: "03", content: '  field: "Informatika",' },
  { number: "04", content: '  focus: ["Web", "AI"],' },
  { number: "05", content: "};" },
];

export default function Hero() {
  const reduceMotion = useReducedMotion();

  const animationDuration = reduceMotion ? 0 : 0.55;

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative grid scroll-mt-28 grid-cols-1 items-center gap-10 pb-10 pt-12 sm:gap-12 sm:pt-20 lg:grid-cols-12 lg:gap-12 lg:pb-20 lg:pt-24"
    >
      {/* Introduction */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: animationDuration,
          ease: "easeOut",
        }}
        className="flex min-w-0 flex-col items-start gap-7 lg:col-span-7"
      >
        <div className="inline-flex items-center gap-2.5 rounded-full border border-[#4B75FF]/25 bg-[#4B75FF]/[0.07] px-3.5 py-2">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full bg-[#6B8CFF]"
          />
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#B4C4FF]">
            Personal Portfolio
          </span>
        </div>

        <div className="space-y-5">
          <p className="font-mono text-xs tracking-wide text-white/45">
            Halo, saya Erlangga.
          </p>

          <h1
            id="hero-heading"
            className="max-w-3xl text-[2.65rem] font-semibold leading-[1.06] tracking-[-0.055em] text-white sm:text-6xl lg:text-[4.5rem] lg:leading-[1.04]"
          >
            Membangun produk digital dengan{" "}
            <span className="text-[#6B8CFF]">
              tujuan yang jelas.
            </span>
          </h1>

          <p className="max-w-xl text-sm leading-7 text-[#A1A7B4] sm:text-base sm:leading-8">
            Mahasiswa S1 Teknik Informatika UNESA yang tertarik pada
            pengembangan aplikasi web dan eksplorasi kecerdasan buatan
            melalui proyek nyata.
          </p>
        </div>

        {/* Calls to action */}
        <div className="flex w-full flex-col gap-3 pt-1 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center">
          <a
            href="#skills-projects"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#4B75FF] px-6 text-sm font-semibold text-white transition-[background-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:bg-[#5D80FF] hover:shadow-[0_8px_28px_rgba(75,117,255,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8EA5FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A] active:translate-y-0"
          >
            Lihat Proyek
            <span aria-hidden="true">↗</span>
          </a>

          <a
            href="/cv-erlangga.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.025] px-6 text-sm font-medium text-white/80 transition-[background-color,border-color,color] duration-200 hover:border-white/30 hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8EA5FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]"
          >
            Lihat CV
            <span aria-hidden="true">↗</span>
          </a>

          <a
            href="/cv-erlangga.pdf"
            download="CV_Erlangga_Aghna_Fatah.pdf"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-4 text-sm text-white/50 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8EA5FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]"
          >
            Download CV
            <span aria-hidden="true">↓</span>
          </a>
        </div>

        {/* Personal note */}
        <div className="mt-1 flex items-start gap-3 border-t border-white/10 pt-5">
          <span
            aria-hidden="true"
            className="mt-0.5 h-8 w-[2px] shrink-0 rounded-full bg-[#4B75FF]"
          />
          <p className="max-w-sm text-xs leading-6 text-white/45">
            Fokus pada proses belajar, eksperimen, dan membangun solusi
            yang berguna.
          </p>
        </div>
      </motion.div>

      {/* Developer profile card */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: animationDuration,
          delay: reduceMotion ? 0 : 0.12,
          ease: "easeOut",
        }}
        className="min-w-0 lg:col-span-5"
      >
        <SpotlightCard className="relative overflow-hidden rounded-2xl border border-white/[0.09] bg-[#10141C] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.25)] sm:p-7">
          {/* Decorative light */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#4B75FF]/[0.12] blur-3xl"
          />

          {/* Window header */}
          <div className="relative flex items-center justify-between border-b border-white/[0.09] pb-4">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#4B75FF]" />
            </div>

            <span className="font-mono text-[10px] tracking-wide text-white/40">
              ABOUT_ME.ts
            </span>
          </div>

          {/* Code content */}
          <div className="relative space-y-5 py-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#829BFF]">
              {"// A short introduction"}
            </p>

            <div
              aria-label="Ringkasan profil developer dalam format kode"
              className="space-y-3 overflow-x-auto pb-1"
            >
              {codeLines.map((line) => (
                <div
                  key={line.number}
                  className="flex min-w-max gap-5 font-mono text-xs sm:text-sm"
                >
                  <span
                    aria-hidden="true"
                    className="w-5 shrink-0 select-none text-right text-white/20"
                  >
                    {line.number}
                  </span>

                  <code
                    className={`whitespace-pre ${
                      line.content.includes("const")
                        ? "text-[#B4C4FF]"
                        : "text-white/75"
                    }`}
                  >
                    {line.content}
                  </code>
                </div>
              ))}
            </div>
          </div>

          {/* Card footer */}
          <div className="relative flex items-center justify-between gap-3 border-t border-white/[0.09] pt-4">
            <span className="font-mono text-[10px] tracking-wide text-white/35">
              LEARNING BY BUILDING
            </span>

            <span
              aria-label="Aksen visual"
              className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#6B8CFF]"
            />
          </div>
        </SpotlightCard>
      </motion.div>
    </section>
  );
}
