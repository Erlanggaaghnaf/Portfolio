'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // 1. Tambahkan menu Feedback dan perbarui link dengan prefix "/"
  const navLinks = [
    { name: 'Home', href: '/#home' },
    { name: 'About', href: '/#about' },
    { name: 'Projects', href: '/#skills-projects' },
    { name: 'Academic Track', href: '/#timeline' },
    { name: 'Testimonials', href: '/testimonials' },
    { name: 'Contact', href: '/#contact' },
    { name: 'Feedback', href: '/feedback' }, // <-- Menu baru
  ];

  return (
    <header className="sticky top-6 z-50 w-full flex justify-center px-4">
      <nav className="w-full max-w-4xl bg-neutral-900/60 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex items-center justify-between">
        
        {/* Logo / Inisial */}
        <Link 
          href="/#home" 
          className="text-sm font-mono font-bold tracking-wider text-white bg-white/5 border border-white/10 px-3 py-1.5 rounded-full hover:bg-white/10 transition-all"
        >
          EA
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-1 font-mono text-xs text-white/70">
          {navLinks.map((link, idx) => (
            <Link 
              key={idx}
              href={link.href}
              className="px-4 py-2 rounded-full hover:bg-white/5 hover:text-white transition-all"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Status Indikator */}
        <div className="hidden md:flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Available</span>
          </span>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white/80 hover:text-white p-2 focus:outline-none"
          aria-label="Toggle Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-20 left-4 right-4 bg-neutral-900/95 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-2xl flex flex-col space-y-4 md:hidden z-50"
          >
            {navLinks.map((link, idx) => (
              <Link 
                key={idx}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-sm font-mono text-white/80 hover:text-white hover:bg-white/5 px-4 py-3 rounded-2xl transition-all"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-2 border-t border-white/10 flex items-center justify-between px-2">
              <span className="text-xs font-mono text-white/50">Status</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Available for Hire</span>
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}