'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useState, useEffect } from 'react';
import SpotlightCard from '@/components/SpotlightCard';

const codeLines = [
  "const engineer = {",
  "  name: 'Erlangga',",
  "  institution: 'UNESA S1 Informatics',",
  "  focus: ['Full-Stack', 'Deep Learning'],",
  "  available: true",
  "};"
];

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const [displayedText, setDisplayedText] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion) {
      return;
    }

    if (currentLineIndex < codeLines.length) {
      const targetLine = codeLines[currentLineIndex];
      if (currentCharIndex <= targetLine.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(prev => {
            const updated = [...prev];
            updated[currentLineIndex] = targetLine.substring(0, currentCharIndex);
            return updated;
          });
          setCurrentCharIndex(prev => prev + 1);
        }, 40);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setCurrentLineIndex(prev => prev + 1);
          setCurrentCharIndex(0);
        }, 300);
        return () => clearTimeout(timeout);
      }
    } else {
      const resetTimeout = setTimeout(() => {
        setDisplayedText([]);
        setCurrentLineIndex(0);
        setCurrentCharIndex(0);
      }, 3500);
      return () => clearTimeout(resetTimeout);
    }
  }, [currentLineIndex, currentCharIndex, shouldReduceMotion]);

  const visibleCodeLines = shouldReduceMotion ? codeLines : displayedText;

  return (
    <section id="home" className="relative pt-4 sm:pt-8 pb-12 sm:pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="lg:col-span-7 flex flex-col items-start text-left space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-xs font-medium text-white/80">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span>Available for Research &amp; Projects</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12]">
            Hi, I&apos;m Erlangga — <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#E5E5E5] to-white/50">
              I build web &amp; AI solutions
            </span>
          </h1>

          <div className="space-y-2 max-w-xl">
            <p className="text-base sm:text-lg text-white/80 font-medium">
              Mahasiswa S1 Teknik Informatika UNESA.
            </p>
            <p className="text-sm sm:text-base text-white/50">
              Passionate in merging modern web engineering with machine learning architectures. Crafting performant, accessible digital systems.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3.5 pt-3 w-full sm:w-auto">
            <a 
              href="/cv-erlangga.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto text-center px-6 py-3 rounded-full bg-[#E5E5E5] text-black font-semibold text-sm hover:bg-white hover:scale-105 active:scale-95 transition-all shadow-[0_0_24px_rgba(255,255,255,0.2)] flex items-center justify-center gap-2"
            >
              <span>Lihat CV</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
            </a>
            
            <a 
              href="/cv-erlangga.pdf" 
              download="CV_Erlangga_Aghna_Fatah.pdf"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-neutral-900/60 border border-white/10 text-[#E5E5E5] font-medium text-sm hover:bg-white/10 hover:border-white/20 hover:text-white transition-all backdrop-blur-md"
            >
              <span>Download CV</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
              </svg>
            </a>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="lg:col-span-5 w-full flex justify-center"
        >
          <SpotlightCard className="w-full max-w-md p-5 sm:p-6 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
              </div>
              <span className="text-[11px] font-mono text-white/50">erlangga.tsx</span>
            </div>
            
            <div className="font-mono text-xs leading-relaxed space-y-1.5 text-white/80 min-h-[120px]">
              {visibleCodeLines.map((line, idx) => (
                <div key={`${idx}-${line}`} className="whitespace-pre">
                  {idx === 0 ? (
                    <>
                      <span className="text-purple-400">const </span>
                      <span className="text-blue-300">engineer </span>
                      {line.slice("const engineer".length)}
                    </>
                  ) : (
                    line
                  )}
                </div>
              ))}
              {!shouldReduceMotion && (
                <span className="ml-1 inline-block h-3.5 w-2 animate-pulse bg-emerald-400" />
              )}
            </div>
          </SpotlightCard>
        </motion.div>

      </div>
    </section>
  );
}