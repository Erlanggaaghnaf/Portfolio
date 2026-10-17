"use client";

import React, { useRef, useState } from "react";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export default function SpotlightCard({
  children,
  className = "",
  ...props
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;

    const rect = divRef.current.getBoundingClientRect();

    divRef.current.style.setProperty(
      "--spotlight-x",
      `${e.clientX - rect.left}px`,
    );

    divRef.current.style.setProperty(
      "--spotlight-y",
      `${e.clientY - rect.top}px`,
    );
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`group/spotlight relative h-full overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/50 backdrop-blur-xl ${className}`}
      {...props}
    >
      {/* Efek cahaya mengikuti posisi kursor */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
        style={{
          opacity,
          background:
            "radial-gradient(500px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), rgba(142, 165, 255, 0.12), transparent 60%)",
        }}
      />

      {/* Konten kartu */}
      <div className="relative z-20 flex h-full flex-col">
        {children}
      </div>
    </div>
  );
}