
"use client";

import { motion, useReducedMotion } from "framer-motion";
import SpotlightCard from "@/components/SpotlightCard";

const competencies = [
  {
    number: "01",
    title: "Frontend Development",
    description:
      "Membangun antarmuka web yang responsif, terstruktur, dan nyaman digunakan.",
    technologies: ["Next.js", "React", "TypeScript"],
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <rect x="3" y="4" width="18" height="13" rx="2" />
        <path d="M8 21h8M12 17v4M7 9l2 2-2 2M12 13h4" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "AI & Computer Vision",
    description:
      "Mengeksplorasi kecerdasan buatan dan pengolahan citra melalui eksperimen serta proyek.",
    technologies: ["PyTorch", "OpenCV", "YOLO"],
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <path d="M12 3v3M5.6 5.6l2.1 2.1M3 12h3M5.6 18.4l2.1-2.1M12 18v3M18.4 18.4l-2.1-2.1M18 12h3M18.4 5.6l-2.1 2.1" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1.5" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Systems & Infrastructure",
    description:
      "Mempelajari deployment aplikasi, integrasi layanan, dan fondasi sistem yang andal.",
    technologies: ["Docker", "CI/CD", "Cloud"],
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <rect x="4" y="3" width="16" height="7" rx="2" />
        <rect x="4" y="14" width="16" height="7" rx="2" />
        <path d="M8 6.5h.01M8 17.5h.01M12 10v4" />
      </svg>
    ),
  },
];

const workflow = [
  {
    number: "01",
    title: "Research & Plan",
    description:
      "Memahami masalah, merumuskan kebutuhan, dan menyusun rencana implementasi.",
  },
  {
    number: "02",
    title: "Build & Iterate",
    description:
      "Membangun solusi secara bertahap, menguji pendekatan, dan memperbaiki hasil.",
  },
  {
    number: "03",
    title: "Test & Deploy",
    description:
      "Memeriksa fungsi, menyempurnakan pengalaman pengguna, dan menyiapkan deployment.",
  },
];

const cardClass =
  "h-full rounded-2xl border border-white/[0.09] bg-[#10141C] shadow-[0_12px_40px_rgba(0,0,0,0.16)] transition-colors duration-300 hover:border-white/[0.16]";

export default function About() {
  const reduceMotion = useReducedMotion();

  const reveal = {
    initial: reduceMotion ? false : { opacity: 0, y: 14 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.12 },
    transition: {
      duration: reduceMotion ? 0 : 0.45,
      ease: "easeOut" as const,
    },
  };

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative scroll-mt-28 space-y-8 pt-8 sm:space-y-10 sm:pt-12"
    >
      {/* Section introduction */}
      <motion.div
        {...reveal}
        className="flex max-w-3xl flex-col items-start gap-5"
      >
        <div className="inline-flex items-center gap-2.5 rounded-full border border-[#4B75FF]/25 bg-[#4B75FF]/[0.07] px-3.5 py-2">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full bg-[#6B8CFF]"
          />
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#B4C4FF]">
            02 / About & Expertise
          </span>
        </div>

        <div className="space-y-4">
          <h2
            id="about-heading"
            className="max-w-3xl text-3xl font-semibold leading-[1.1] tracking-[-0.045em] text-white sm:text-4xl lg:text-5xl"
          >
            Driven by curiosity.
            <br />
            <span className="text-white/45">
              Built through experimentation.
            </span>
          </h2>

          <p className="max-w-2xl text-sm leading-7 text-[#A1A7B4] sm:text-base sm:leading-8">
            Mahasiswa S1 Teknik Informatika UNESA yang tertarik pada
            pengembangan aplikasi web dan eksplorasi kecerdasan buatan
            melalui proyek nyata, proses belajar, dan eksperimen.
          </p>
        </div>
      </motion.div>

      {/* Bento grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {/* Workflow */}
        <motion.div
          {...reveal}
          className="min-w-0 lg:col-span-2"
        >
          <SpotlightCard
            className={`${cardClass} flex flex-col p-5 sm:p-7 lg:p-8`}
          >
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#8EA5FF]">
                How I Work
              </span>
              <span className="font-mono text-[10px] text-white/35">
                01 — 03
              </span>
            </div>

            <div className="mt-6 space-y-3">
              <h3 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                From problem to product.
              </h3>
              <p className="max-w-xl text-sm leading-7 text-white/55">
                Pendekatan bertahap untuk memahami kebutuhan, membangun
                solusi, dan menyempurnakan hasil berdasarkan pengujian.
              </p>
            </div>

            <div className="mt-7 grid grid-cols-1 gap-3 border-t border-white/[0.08] pt-5 sm:grid-cols-3">
              {workflow.map((item) => (
                <div
                  key={item.number}
                  className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-colors duration-200 hover:bg-white/[0.04]"
                >
                  <span className="font-mono text-[10px] text-[#8EA5FF]">
                    {item.number}
                  </span>
                  <h4 className="mt-3 text-sm font-medium text-white">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-xs leading-6 text-white/45">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </SpotlightCard>
        </motion.div>

        {/* Academic and project statistics */}
        <motion.div
          {...reveal}
          transition={{
            duration: reduceMotion ? 0 : 0.45,
            delay: reduceMotion ? 0 : 0.08,
            ease: "easeOut",
          }}
          className="min-w-0"
        >
          <SpotlightCard
            className={`${cardClass} flex flex-col p-5 sm:p-7`}
          >
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/45">
                Academic Track
              </span>
              <span className="rounded-full border border-white/10 px-2 py-1 font-mono text-[9px] text-white/45">
                PROFILE
              </span>
            </div>

            <h3 className="mt-5 text-lg font-medium text-white">
              Progress & Practice
            </h3>

            <div className="mt-7 space-y-6">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-white/40">
                  GPA
                </p>
                <p className="mt-1 text-4xl font-semibold tracking-[-0.05em] text-white">
                  3.8
                  <span className="ml-1 text-base font-normal tracking-normal text-white/35">
                    / 4.00
                  </span>
                </p>
                <p className="mt-2 text-xs text-white/45">
                  Akademik S1 Teknik Informatika
                </p>
              </div>

              <div className="h-px bg-white/[0.08]" />

              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-white/40">
                  Projects
                </p>
                <p className="mt-1 text-4xl font-semibold tracking-[-0.05em] text-white">
                  9<span className="text-[#8EA5FF]">+</span>
                </p>
                <p className="mt-2 text-xs leading-5 text-white/45">
                  Web development and technical experiments
                </p>
              </div>
            </div>

            <div className="mt-auto flex items-center gap-2 border-t border-white/[0.08] pt-5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#6B8CFF]" />
              <span className="text-xs text-white/45">
                Informatika · UNESA
              </span>
            </div>
          </SpotlightCard>
        </motion.div>

        {/* Competency cards */}
        {competencies.map((item, index) => (
          <motion.div
            key={item.number}
            {...reveal}
            transition={{
              duration: reduceMotion ? 0 : 0.45,
              delay: reduceMotion ? 0 : index * 0.06,
              ease: "easeOut",
            }}
            className="min-w-0"
          >
            <SpotlightCard
              className={`${cardClass} group flex flex-col p-5 sm:p-6`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#4B75FF]/20 bg-[#4B75FF]/[0.08] text-[#8EA5FF] transition-colors duration-200 group-hover:border-[#4B75FF]/35 group-hover:bg-[#4B75FF]/[0.13]">
                  {item.icon}
                </div>
                <span className="font-mono text-[10px] text-white/25">
                  {item.number}
                </span>
              </div>

              <div className="mt-6 flex-1">
                <h3 className="text-base font-semibold tracking-tight text-white transition-colors duration-200 group-hover:text-[#B4C4FF]">
                  {item.title}
                </h3>
                <p className="mt-3 text-xs leading-6 text-white/50">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-2 border-t border-white/[0.08] pt-4">
                {item.technologies.map((technology) => (
                  <span
                    key={technology}
                    className="rounded-md border border-white/[0.07] bg-white/[0.025] px-2 py-1 font-mono text-[10px] text-white/55"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
