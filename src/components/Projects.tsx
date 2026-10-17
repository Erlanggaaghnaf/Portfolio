
"use client";

import { motion, useReducedMotion } from "framer-motion";
import SpotlightCard from "@/components/SpotlightCard";

type Project = {
  number: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  status: string;
  repository: string;
  demo?: string;
  featured?: boolean;
};

const projects: Project[] = [
  {
    number: "01",
    title: "ReShare",
    category: "Web Application",
    description:
      "Aplikasi donasi barang layak pakai yang membantu pengguna menemukan dan membagikan barang melalui platform digital. Mencakup autentikasi, katalog donasi, pengelolaan akun, dan integrasi database.",
    tags: ["PHP", "MySQL", "Tailwind CSS"],
    status: "Live Website",
    repository: "https://github.com/Erlanggaaghnaf/reshare",
    demo: "https://reshare.my.id",
    featured: true,
  },
  {
    number: "02",
    title: "Website Desa Padangan",
    category: "Civic Technology",
    description:
      "Website informasi desa yang memusatkan profil, berita, dan galeri dalam satu platform, dilengkapi fitur pengaduan serta pengelolaan status pengaduan untuk admin.",
    tags: ["PHP", "MySQL", "Tailwind CSS"],
    status: "Live Website",
    repository: "https://github.com/Erlanggaaghnaf/desa-padangan",
    demo: "https://desapadangan.site/",
    featured: true,
  },
  {
    number: "03",
    title: "Smart Pond IoT",
    category: "Internet of Things",
    description:
      "Simulasi pemantauan kualitas air kolam menggunakan sensor suhu dan simulasi pH. Sistem menampilkan kondisi air serta mengendalikan indikator, buzzer, pompa, dan aerator berdasarkan ambang batas.",
    tags: ["Arduino Mega", "C++", "Wokwi"],
    status: "Simulation",
    repository: "https://github.com/Erlanggaaghnaf/smart-pond-iot",
    demo: "https://wokwi.com/projects/476795099737101313",
  },
  {
    number: "04",
    title: "RSA Cryptography",
    category: "Academic Project",
    description:
      "Implementasi algoritma kriptografi RSA untuk mempelajari pembangkitan pasangan kunci, enkripsi, dan dekripsi menggunakan operasi matematika modular.",
    tags: ["Python", "Cryptography", "Algorithms"],
    status: "Learning Project",
    repository:
      "https://github.com/Erlanggaaghnaf/Algoritma-Kriptografi-Asimetris-RSA",
  },
];

const statusStyles: Record<string, string> = {
  "Live Website":
    "border-[#4B75FF]/25 bg-[#4B75FF]/[0.08] text-[#AFC1FF]",
  Simulation:
    "border-white/10 bg-white/[0.04] text-white/65",
  "Team Project":
    "border-white/10 bg-white/[0.04] text-white/65",
  "Learning Project":
    "border-white/10 bg-white/[0.04] text-white/65",
};

function ExternalArrow() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
    >
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export default function Projects() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="skills-projects"
      aria-labelledby="projects-heading"
      className="relative scroll-mt-28 space-y-8 pt-8 sm:space-y-10 sm:pt-12"
    >
      {/* Section header */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{
          duration: reduceMotion ? 0 : 0.45,
          ease: "easeOut",
        }}
        className="h-full min-w-0 flex max-w-3xl flex-col items-start gap-5"
      >
        <div className="inline-flex items-center gap-2.5 rounded-full border border-[#4B75FF]/25 bg-[#4B75FF]/[0.07] px-3.5 py-2">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full bg-[#6B8CFF]"
          />
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#B4C4FF]">
            03 / Selected Work
          </span>
        </div>

        <div className="space-y-4">
          <h2
            id="projects-heading"
            className="text-3xl font-semibold leading-[1.1] tracking-[-0.045em] text-white sm:text-4xl lg:text-5xl"
          >
            Ideas into{" "}
            <span className="text-white/45">working solutions.</span>
          </h2>

          <p className="max-w-2xl text-sm leading-7 text-[#A1A7B4] sm:text-base sm:leading-8">
            Kumpulan proyek yang saya kerjakan untuk mengeksplorasi
            pengembangan web, pemecahan masalah, dan penerapan teknologi
            melalui proyek akademik maupun kolaboratif.
          </p>
        </div>

        <a
          href="https://github.com/Erlanggaaghnaf"
          target="_blank"
          rel="noopener noreferrer"
          className="group/link inline-flex min-h-10 items-center gap-2 text-sm text-white/60 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8EA5FF] focus-visible:ring-offset-4 focus-visible:ring-offset-[#0A0A0A]"
        >
          Jelajahi GitHub
          <ExternalArrow />
        </a>
      </motion.div>

      {/* Project grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {projects.map((project, index) => (
          <motion.div
            key={project.number}
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.08 }}
            transition={{
              duration: reduceMotion ? 0 : 0.4,
              delay: reduceMotion ? 0 : index * 0.06,
              ease: "easeOut",
            }}
            className="h-full min-w-0"
          >
            <SpotlightCard
              className={`group flex h-full flex-col rounded-2xl border p-5 transition-colors duration-300 sm:p-6 ${
                project.featured
                  ? "border-[#4B75FF]/20 bg-[#101521] hover:border-[#4B75FF]/40"
                  : "border-white/[0.09] bg-[#10141C] hover:border-white/[0.17]"
              }`}
            >
              {/* Card header */}
              <div className="flex items-start justify-between gap-3">
                <span className="font-mono text-[10px] tracking-[0.12em] text-white/30">
                  PROJECT / {project.number}
                </span>

                <span
                  className={`shrink-0 rounded-full border px-2.5 py-1 font-mono text-[9px] tracking-wide ${
                    statusStyles[project.status] ??
                    "border-white/10 bg-white/[0.04] text-white/60"
                  }`}
                >
                  {project.status}
                </span>
              </div>

              {/* Project information */}
              <div className="mt-7 flex-1">
                <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#8EA5FF]">
                  {project.category}
                </p>

                <h3 className="mt-3 text-xl font-semibold leading-snug tracking-[-0.025em] text-white transition-colors duration-200 group-hover:text-[#B4C4FF]">
                  {project.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-white/55">
                  {project.description}
                </p>
              </div>

              {/* Technology tags */}
              <div className="mt-6 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-white/[0.07] bg-white/[0.025] px-2 py-1 font-mono text-[10px] text-white/55"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-white/[0.08] pt-4">
                <a
                  href={project.repository}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Lihat source code ${project.title} di GitHub`}
                  className="group/link inline-flex min-h-9 items-center gap-2 text-xs font-medium text-white/75 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8EA5FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#10141C]"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 6v-3.9a3.4 3.4 0 0 0-.9-2.6c3-.3 6.1-1.5 6.1-6.7a5.2 5.2 0 0 0-1.4-3.6 4.8 4.8 0 0 0-.1-3.6s-1.1-.3-3.7 1.4a12.8 12.8 0 0 0-6.7 0C3.7 1.3 2.6 1.6 2.6 1.6a4.8 4.8 0 0 0-.1 3.6 5.2 5.2 0 0 0-1.4 3.6c0 5.2 3.1 6.4 6.1 6.7a3.4 3.4 0 0 0-.9 2.6V22" />
                  </svg>
                  Source code
                  <ExternalArrow />
                </a>

                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Buka demo ${project.title}`}
                    className="group/link inline-flex min-h-9 items-center gap-2 text-xs font-medium text-[#AFC1FF] transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8EA5FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#10141C]"
                  >
                    Live preview
                    <ExternalArrow />
                  </a>
                )}
              </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>

      {/* Closing note */}
      <div className="flex flex-col gap-3 border-t border-white/[0.08] pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-6 text-white/40">
          Setiap proyek adalah bagian dari proses belajar dan pengembangan.
        </p>

        <a
          href="https://github.com/Erlanggaaghnaf?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="group/link inline-flex min-h-9 items-center gap-2 text-xs text-white/60 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8EA5FF]"
        >
          Lihat repositori lainnya
          <ExternalArrow />
        </a>
      </div>
    </section>
  );
}
