import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import SplashCursor from "@/components/SplashCursor";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Erlangga Aghna Fatah — Portfolio",
  description: "Personal Portfolio and Developer Showcase",
  manifest: "/manifest.json", // <-- Tambahkan baris ini
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      translate="no"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0A0A0A] text-[#E5E5E5] selection:bg-white/20 selection:text-white">
        {/* Global Fluid Splash Cursor */}
        <SplashCursor
          DENSITY_DISSIPATION={3}
          VELOCITY_DISSIPATION={2}
          PRESSURE={0.1}
          CURL={3}
          SPLAT_RADIUS={0.18}
          SPLAT_FORCE={4000}
          COLOR_UPDATE_SPEED={7}
          SHADING
          RAINBOW_MODE={false}
          COLOR="#302c2c"
        />
        
        {children}
        <Toaster position="bottom-right" theme="dark" richColors />
      </body>
    </html>
  );
}