'use client';

import { motion } from 'framer-motion';
import SpotlightCard from '@/components/SpotlightCard';

export default function About() {
  return (
    <section id="about" className="relative pt-6 sm:pt-10 scroll-mt-28 space-y-10">
      {/* Section Header */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="gpu-accelerated flex flex-col items-start text-left space-y-4 max-w-3xl"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-medium tracking-wide text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>02 / SERVICES &amp; ABOUT • Workflow &amp; Competencies</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
          Driven by Curiosity, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#E5E5E5] to-white/50">
            Engineered with Precision.
          </span>
        </h2>
        <p className="text-sm sm:text-base text-white/60 leading-relaxed max-w-2xl">
          Mahasiswa S1 Teknik Informatika UNESA menggabungkan arsitektur web modern performa tinggi dengan kecerdasan buatan untuk menghasilkan solusi digital yang efisien, skalabel, dan bernilai guna tinggi.
        </p>
      </motion.div>

      {/* Bento Grid Layout dengan SpotlightCard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Card 1: Methodology Workflow */}
        <SpotlightCard className="lg:col-span-2 p-6 sm:p-8 flex flex-col justify-between group hover:border-white/20 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="gpu-accelerated space-y-3 h-full flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">Methodology</span>
                <span className="text-xs text-white/40 font-mono">End-to-End Delivery</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Systematic Engineering Workflow</h3>
              <p className="text-sm text-white/60 max-w-xl">
                Mendekati setiap masalah dengan metodologi riset komprehensif, arsitektur kode modular, dan pipeline otomatis yang dirancang untuk stabilitas jangka panjang.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 mt-6 border-t border-white/10">
              <div className="p-4 rounded-2xl bg-white/3 border border-white/5 space-y-2">
                <span className="text-xs font-mono font-bold text-emerald-400">01</span>
                <h4 className="text-sm font-semibold text-white">Research &amp; Plan</h4>
                <p className="text-xs text-white/50 leading-relaxed">Problem formulation &amp; system specifications.</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/3 border border-white/5 space-y-2">
                <span className="text-xs font-mono font-bold text-blue-400">02</span>
                <h4 className="text-sm font-semibold text-white">Build &amp; Code</h4>
                <p className="text-xs text-white/50 leading-relaxed">Next.js &amp; PyTorch clean implementation.</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/3 border border-white/5 space-y-2">
                <span className="text-xs font-mono font-bold text-yellow-400">03</span>
                <h4 className="text-sm font-semibold text-white">Optimize &amp; Deploy</h4>
                <p className="text-xs text-white/50 leading-relaxed">Edge latency tuning &amp; automated test.</p>
              </div>
            </div>
          </motion.div>
        </SpotlightCard>

        {/* Card 2: Performance Metrics */}
        <SpotlightCard className="lg:col-span-1 p-6 sm:p-8 flex flex-col justify-between group hover:border-white/20 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
            className="gpu-accelerated space-y-6 h-full flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-white/50">Academic Track</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Verified</span>
              </div>
              <h3 className="text-lg font-semibold text-white">Performance Metrics</h3>
            </div>

            <div className="space-y-5 py-2">
              <div className="space-y-1">
                <div className="flex items-baseline justify-between">
                  <span className="text-4xl font-bold tracking-tight text-white">3.8<span className="text-lg text-white/40 font-normal">/4.00</span></span>
                  <span className="text-xs text-emerald-400 font-mono">GPA</span>
                </div>
                <p className="text-xs text-white/50">Akademik S1 TI UNESA</p>
              </div>
              <div className="h-[1px] bg-white/10 w-full"></div>
              <div className="space-y-1">
                <div className="flex items-baseline justify-between">
                  <span className="text-4xl font-bold tracking-tight text-white">9+<span className="text-lg text-white/40 font-normal"> Projects</span></span>
                  <span className="text-xs text-blue-400 font-mono">Deployed</span>
                </div>
                <p className="text-xs text-white/50">Deep Learning &amp; Web Architectures</p>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
              <span>Status Aktif</span>
              <span className="text-white font-medium flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Semester Genap
              </span>
            </div>
          </motion.div>
        </SpotlightCard>

        {/* Competency Card: Frontend */}
        <SpotlightCard className="p-6 flex flex-col justify-between group hover:border-white/20 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
            className="gpu-accelerated space-y-4 h-full flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors">Frontend Development</h3>
              <p className="text-xs text-white/60 leading-relaxed">Building fluid, ultra-responsive interfaces inspired by Apple minimalist design.</p>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/10">
              <span className="px-2 py-0.5 rounded-md bg-white/5 text-[11px] font-mono text-white/70">Next.js</span>
              <span className="px-2 py-0.5 rounded-md bg-white/5 text-[11px] font-mono text-white/70">React</span>
              <span className="px-2 py-0.5 rounded-md bg-white/5 text-[11px] font-mono text-white/70">TypeScript</span>
            </div>
          </motion.div>
        </SpotlightCard>

        {/* Competency Card: AI */}
        <SpotlightCard className="p-6 flex flex-col justify-between group hover:border-white/20 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
            className="gpu-accelerated space-y-4 h-full flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white group-hover:text-emerald-300 transition-colors">AI &amp; Computer Vision</h3>
              <p className="text-xs text-white/60 leading-relaxed">Developing convolutional vision models and custom neural networks with PyTorch.</p>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/10">
              <span className="px-2 py-0.5 rounded-md bg-white/5 text-[11px] font-mono text-white/70">PyTorch</span>
              <span className="px-2 py-0.5 rounded-md bg-white/5 text-[11px] font-mono text-white/70">OpenCV</span>
              <span className="px-2 py-0.5 rounded-md bg-white/5 text-[11px] font-mono text-white/70">YOLO</span>
            </div>
          </motion.div>
        </SpotlightCard>

        {/* Competency Card: Systems */}
        <SpotlightCard className="p-6 flex flex-col justify-between group hover:border-white/20 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.4, delay: 0.25, ease: "easeOut" }}
            className="gpu-accelerated space-y-4 h-full flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white group-hover:text-sky-300 transition-colors">Systems &amp; Infrastructure</h3>
              <p className="text-xs text-white/60 leading-relaxed">Deploying containerized microservices and orchestrating low-latency inference APIs.</p>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/10">
              <span className="px-2 py-0.5 rounded-md bg-white/5 text-[11px] font-mono text-white/70">Docker</span>
              <span className="px-2 py-0.5 rounded-md bg-white/5 text-[11px] font-mono text-white/70">CI/CD</span>
              <span className="px-2 py-0.5 rounded-md bg-white/5 text-[11px] font-mono text-white/70">Cloud VM</span>
            </div>
          </motion.div>
        </SpotlightCard>

      </div>
    </section>
  );
}