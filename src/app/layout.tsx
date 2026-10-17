
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Erlangga Aghna Fatah — Portfolio",
  description:
    "Portofolio Erlangga Aghna Fatah, mahasiswa Teknik Informatika yang mengeksplorasi pengembangan web dan kecerdasan buatan.",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      translate="no"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[#0B0D12] text-[#F4F5F7] selection:bg-[#4B75FF]/35 selection:text-white">
        {children}
        <Toaster
          position="bottom-right"
          theme="dark"
          richColors
        />
      </body>
    </html>
  );
}
