
"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

const navLinks = [
  { name: "Home", href: "/#home" },
  { name: "About", href: "/#about" },
  { name: "Projects", href: "/#skills-projects" },
  { name: "Academic Track", href: "/#timeline" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "Contact", href: "/#contact" },
  { name: "Feedback", href: "/feedback" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-3 z-50 flex w-full justify-center pt-3 sm:top-4 sm:pt-4">
      <nav
        aria-label="Navigasi utama"
        className="flex w-full max-w-6xl items-center justify-between gap-3 rounded-2xl border border-white/[0.09] bg-[#0D111A]/90 px-3 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.28)] backdrop-blur-2xl transition-colors duration-300 sm:rounded-full sm:px-5"
      >
        {/* Brand */}
        <Link
          href="/#home"
          aria-label="Erlangga Aghna Fatah - beranda"
          onClick={closeMenu}
          className="group inline-flex min-w-0 shrink-0 items-center gap-2.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6B8CFF] focus-visible:ring-offset-4 focus-visible:ring-offset-[#0A0A0A]"
        >
          <span className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/15 bg-[#4B75FF] text-xs font-bold tracking-tight text-white shadow-[0_4px_18px_rgba(75,117,255,0.18)] transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-[1.03]">
            EA
            <span
              aria-hidden="true"
              className="absolute -right-2 -top-2 h-5 w-5 rounded-full border border-white/20 bg-white/15"
            />
          </span>

          <span className="hidden min-w-0 sm:block">
            <span className="block truncate text-sm font-semibold tracking-[-0.035em] text-white">
              Erlangga Aghna Fatah
            </span>
            <span className="mt-0.5 block font-mono text-[9px] uppercase tracking-[0.16em] text-white/40">
              Developer Portfolio
            </span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-0.5 xl:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="group relative whitespace-nowrap rounded-full px-2.5 py-2 text-[11px] font-medium text-white/55 transition-colors duration-200 hover:bg-white/[0.04] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6B8CFF] 2xl:px-3 2xl:text-xs"
            >
              {link.name}
              <span
                aria-hidden="true"
                className="absolute inset-x-3 bottom-1 h-px origin-left scale-x-0 bg-[#6B8CFF] transition-transform duration-200 group-hover:scale-x-100"
              />
            </Link>
          ))}
        </div>

        {/* Subtle technical label */}
        <div className="hidden shrink-0 items-center gap-2 rounded-full border border-[#4B75FF]/20 bg-[#4B75FF]/[0.07] px-3 py-2 xl:flex">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full bg-[#6B8CFF]"
          />
          <span className="font-mono text-[10px] tracking-wide text-[#AFC1FF]">
            PORTFOLIO
          </span>
        </div>

        {/* Mobile / tablet menu button */}
        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-label={isOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.025] text-white/75 transition-colors hover:border-[#6B8CFF]/40 hover:bg-[#4B75FF]/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6B8CFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A] xl:hidden"
        >
          <svg
            aria-hidden="true"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.6}
                d="M6 6l12 12M18 6L6 18"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.6}
                d="M4 7h16M4 12h16M4 17h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile / tablet dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{
              opacity: 0,
              y: shouldReduceMotion ? 0 : -8,
            }}
            animate={{ opacity: 1, y: 0 }}
            exit={{
              opacity: 0,
              y: shouldReduceMotion ? 0 : -8,
            }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.18,
              ease: "easeOut",
            }}
            className="absolute left-3 right-3 top-[calc(100%+0.5rem)] max-h-[min(70vh,28rem)] overflow-y-auto rounded-2xl border border-white/10 bg-[#0D111A]/[0.98] p-3 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:left-5 sm:right-5 xl:hidden"
          >
            <div className="mb-2 flex items-center justify-between border-b border-white/[0.07] px-3 pb-3 pt-1">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">
                Navigation
              </span>
              <span className="font-mono text-[10px] text-[#AFC1FF]/70">
                EA / 01
              </span>
            </div>

            <div className="flex flex-col gap-1">
              {navLinks.map((link, index) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={closeMenu}
                  className="group flex items-center justify-between rounded-xl px-4 py-3 text-sm text-white/65 transition-colors duration-200 hover:bg-[#4B75FF]/[0.09] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#6B8CFF]"
                >
                  <span>{link.name}</span>
                  <span className="font-mono text-[10px] text-white/25 transition-colors group-hover:text-[#AFC1FF]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </Link>
              ))}
            </div>

            <div className="mt-2 flex items-center gap-2 border-t border-white/[0.07] px-4 pt-3">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-[#6B8CFF]"
              />
              <span className="font-mono text-[10px] uppercase tracking-wider text-white/40">
                Personal portfolio
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
