
"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import SpotlightCard from "@/components/SpotlightCard";

const education = [
  {
    id: "high-school",
    period: "2021 — 2024",
    title: "Sekolah Menengah Atas",
    institution: "SMAN 2 Trenggalek",
    description:
      "Menyelesaikan pendidikan menengah atas sebagai fondasi untuk melanjutkan perjalanan akademik di bidang teknologi.",
    type: "Pendidikan Menengah",
    scoreLabel: "Nilai akhir",
    score: "90",
    logo: "/logo/sman2-trenggalek.jpg",
    logoAlt: "Logo SMAN 2 Trenggalek",
    fallback: "SMADA",
  },
  {
    id: "university",
    period: "2024 — Sekarang",
    title: "S1 Teknik Informatika",
    institution: "Universitas Negeri Surabaya",
    description:
      "Mendalami pengembangan perangkat lunak dan teknologi informasi melalui perkuliahan, eksplorasi mandiri, serta pengerjaan proyek akademik.",
    type: "Pendidikan Tinggi",
    scoreLabel: "IPK saat ini",
    score: "3.8",
    scoreSuffix: "/ 4.00",
    logo: "/logo/unesa.png",
    logoAlt: "Logo Universitas Negeri Surabaya",
    fallback: "UNESA",
  },
];

function InstitutionLogo({
  src,
  alt,
  fallback,
}: {
  src: string;
  alt: string;
  fallback: string;
}) {
  return (
    <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] sm:h-14 sm:w-14">
      <span
        aria-hidden="true"
        className="font-mono text-[10px] font-semibold tracking-tight text-[#B4C4FF]"
      >
        {fallback}
      </span>

      <Image
        src={src}
        alt={alt}
        fill
        sizes="56px"
        onError={(event) => {
          event.currentTarget.style.display = "none";
        }}
        className="bg-white object-contain p-1.5"
      />
    </div>
  );
}

export default function Timeline() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="timeline"
      aria-labelledby="timeline-heading"
      className="relative scroll-mt-28 space-y-10 py-10 sm:space-y-12 sm:py-14"
    >
      {/* Section heading */}
      <motion.header
        initial={reduceMotion ? false : { opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: reduceMotion ? 0 : 0.45,
          ease: "easeOut",
        }}
        className="max-w-3xl space-y-5"
      >
        <div className="inline-flex items-center gap-2.5 rounded-full border border-[#4B75FF]/25 bg-[#4B75FF]/[0.07] px-3.5 py-2">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full bg-[#8EA5FF]"
          />
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#B4C4FF]">
            04 / Education
          </span>
        </div>

        <div className="space-y-4">
          <h2
            id="timeline-heading"
            className="text-3xl font-semibold leading-[1.1] tracking-[-0.045em] text-white sm:text-4xl lg:text-5xl"
          >
            The journey{" "}
            <span className="text-white/40">so far.</span>
          </h2>

          <p className="max-w-xl text-sm leading-7 text-[#A1A7B4] sm:text-base sm:leading-8">
            Perjalanan pendidikan yang membentuk fondasi pengetahuan,
            pola pikir, dan ketertarikan saya terhadap teknologi.
          </p>
        </div>
      </motion.header>

      {/* Alternating timeline */}
      <div className="relative">
        {/* Central line on desktop; left-side line on mobile */}
        <div
          aria-hidden="true"
          className="absolute bottom-6 left-[11px] top-6 w-px bg-gradient-to-b from-[#8EA5FF]/80 via-[#4B75FF]/35 to-transparent lg:left-1/2 lg:-translate-x-1/2"
        />

        <div className="space-y-7 lg:space-y-12">
          {education.map((item, index) => {
            const isLeft = index % 2 === 0;

            return (
              <motion.article
                key={item.id}
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.45,
                  delay: reduceMotion ? 0 : index * 0.08,
                  ease: "easeOut",
                }}
                className="relative grid grid-cols-[24px_minmax(0,1fr)] items-center gap-x-3 lg:grid-cols-[minmax(0,1fr)_40px_minmax(0,1fr)] lg:gap-x-5"
              >
                {/* Timeline marker */}
                <div className="relative z-10 col-start-1 row-start-1 flex justify-center lg:col-start-2">
                  <span className="flex h-3 w-3 items-center justify-center rounded-full border border-[#8EA5FF] bg-[#0A0A0A] shadow-[0_0_14px_rgba(75,117,255,0.3)]">
                    <span className="h-1 w-1 rounded-full bg-[#8EA5FF]" />
                  </span>
                </div>

                {/* Education card: alternate sides on desktop */}
                <div
                  className={`col-start-2 row-start-1 min-w-0 ${
                    isLeft
                      ? "lg:col-start-1 lg:row-start-1"
                      : "lg:col-start-3 lg:row-start-1"
                  }`}
                >
                  <SpotlightCard className="group rounded-2xl border-white/[0.09] bg-[#10141C]/95 p-5 transition-colors duration-300 hover:border-[#4B75FF]/30 sm:p-6">
                    <div className="space-y-5">
                      {/* Period and type */}
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="font-mono text-[10px] tracking-[0.12em] text-[#B4C4FF]">
                          {item.period}
                        </span>

                        <span className="rounded-full border border-white/[0.08] px-2.5 py-1 text-[9px] text-white/45">
                          {item.type}
                        </span>
                      </div>

                      {/* Institution logo and name */}
                      <div className="flex items-center gap-3.5">
                        <InstitutionLogo
                          src={item.logo}
                          alt={item.logoAlt}
                          fallback={item.fallback}
                        />

                        <div className="min-w-0 space-y-1">
                          <h3 className="text-base font-semibold leading-snug tracking-[-0.025em] text-white transition-colors duration-200 group-hover:text-[#B4C4FF] sm:text-lg">
                            {item.title}
                          </h3>

                          <p className="text-xs leading-5 text-white/50 sm:text-sm">
                            {item.institution}
                          </p>
                        </div>
                      </div>

                      <p className="text-sm leading-7 text-white/60">
                        {item.description}
                      </p>

                      {/* Academic result */}
                      <div className="flex items-center justify-between gap-3 border-t border-white/[0.08] pt-4">
                        <span className="text-xs text-white/40">
                          {item.scoreLabel}
                        </span>

                        <span className="font-mono text-sm font-medium tabular-nums text-[#B4C4FF]">
                          {item.score}
                          {item.scoreSuffix && (
                            <span className="ml-1 text-[10px] font-normal text-white/40">
                              {item.scoreSuffix}
                            </span>
                          )}
                        </span>
                      </div>
                    </div>
                  </SpotlightCard>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/[0.08] pt-5">
        <p className="text-xs leading-6 text-white/40">
          Still learning. Still building. Always moving forward.
        </p>
      </footer>
    </section>
  );
}
