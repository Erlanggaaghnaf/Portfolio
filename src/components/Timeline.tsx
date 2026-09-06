'use client';

import { motion } from 'framer-motion';
import SpotlightCard from '@/components/SpotlightCard';

export default function Timeline() {
  const academicItems = [
    {
      period: "2023 — Sekarang",
      title: "S1 Teknik Informatika",
      institution: "Universitas Negeri Surabaya (UNESA)",
      description: "Fokus mendalami arsitektur perangkat lunak, sistem terdistribusi, serta kecerdasan buatan (AI) & Computer Vision. Memegang IPK aktif 3.8 / 4.00.",
      tag: "Akademik Utama",
      badgeColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
    },
    {
      period: "2024 — 2025",
      title: "Deep Learning & Computer Vision Research",
      institution: "Independent Research & Projects",
      description: "Mengembangkan model deteksi berbasis PyTorch & OpenCV, termasuk sistem segmentasi citra medis dan optimasi latensi edge inference.",
      tag: "Riset & AI",
      badgeColor: "text-blue-400 bg-blue-500/10 border-blue-500/20"
    },
    {
      period: "2023 — 2024",
      title: "Modern Web Engineering & Fullstack",
      institution: "Self-Directed Mastery",
      description: "Menguasai ekosistem Next.js App Router, TypeScript, Tailwind CSS, serta integrasi serverless architecture dan sistem pengiriman email skala produksi.",
      tag: "Sertifikasi & Otodidak",
      badgeColor: "text-purple-400 bg-purple-500/10 border-purple-500/20"
    }
  ];

  const certificationsList = [
    {
      name: "Machine Learning & Deep Learning Specialization",
      issuer: "Authorized Tech Academy",
      year: "2025",
      code: "CERT-ML-2025-EA"
    },
    {
      name: "Advanced Next.js & React System Architecture",
      issuer: "Frontend Masters / Professional",
      year: "2024",
      code: "CERT-WEB-902-EA"
    },
    {
      name: "Cloud Deployment & Docker Microservices",
      issuer: "DevOps Fundamentals",
      year: "2024",
      code: "CERT-DEV-301-EA"
    }
  ];

  return (
    <section id="timeline" className="relative pt-6 sm:pt-10 pb-12 scroll-mt-28 space-y-10">
      
      {/* Section Header */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="gpu-accelerated flex flex-col items-start text-left space-y-4 max-w-3xl"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-medium tracking-wide text-purple-400">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse"></span>
          <span>04 / ACADEMIC TRACK • Timeline &amp; Certifications</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
          Milestones of Learning, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#E5E5E5] to-white/50">
            Validated by Practice.
          </span>
        </h2>
        <p className="text-sm sm:text-base text-white/60 leading-relaxed max-w-2xl">
          Jejak perjalanan pendidikan formal di UNESA serta sertifikasi profesional di bidang rekayasa web dan kecerdasan buatan.
        </p>
      </motion.div>

      {/* Grid Utama: Academic Timeline & Certifications */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Kolom Kiri: Lini Masa Akademik (Lebih Luas) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="text-xs font-mono text-white/50 uppercase tracking-wider pl-2">Academic &amp; Research Timeline</div>
          
          <div className="space-y-4">
            {academicItems.map((item, index) => (
              <SpotlightCard key={index} className="p-6 sm:p-7 group hover:border-white/25 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.1 }}
                  transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
                  className="gpu-accelerated space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                      {item.period}
                    </span>
                    <span className={`text-[11px] font-mono px-2.5 py-0.5 rounded-md border ${item.badgeColor}`}>
                      {item.tag}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-emerald-300 transition-colors">
                      {item.title}
                    </h3>
                    <div className="text-xs font-mono text-white/50">{item.institution}</div>
                  </div>

                  <p className="text-xs sm:text-sm text-white/60 leading-relaxed pt-1">
                    {item.description}
                  </p>
                </motion.div>
              </SpotlightCard>
            ))}
          </div>
        </div>

        {/* Kolom Kanan: Daftar Sertifikasi Profesional */}
        <div className="lg:col-span-5 space-y-6">
          <div className="text-xs font-mono text-white/50 uppercase tracking-wider pl-2">Professional Certifications</div>

          <SpotlightCard className="p-6 sm:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
              className="gpu-accelerated space-y-6"
            >
              <div className="space-y-1 border-b border-white/10 pb-4">
                <h3 className="text-lg font-bold text-white tracking-tight">Credentials &amp; Badges</h3>
                <p className="text-xs text-white/50">Sertifikat resmi keahlian teknis industri.</p>
              </div>

              <div className="space-y-4">
                {certificationsList.map((cert, certIdx) => (
                  <div key={certIdx} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2 hover:border-white/15 transition-all">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-semibold text-white leading-snug">{cert.name}</h4>
                      <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded shrink-0">
                        {cert.year}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-white/40 pt-1 border-t border-white/5">
                      <span>{cert.issuer}</span>
                      <span className="text-white/60">{cert.code}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></div>
                  <p className="text-xs text-white/70 leading-relaxed">
                    Terus memperbarui kompetensi seiring perkembangan teknologi arsitektur web dan kecerdasan buatan.
                  </p>
                </div>
              </div>

            </motion.div>
          </SpotlightCard>
        </div>

      </div>
    </section>
  );
}