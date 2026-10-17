
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Timeline from "@/components/Timeline";
import GitHubActivity from "@/components/GitHubActivity";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center overflow-clip bg-[#0B0D12] text-[#F4F5F7]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[640px] bg-[radial-gradient(ellipse_at_70%_0%,rgba(75,117,255,0.14),transparent_60%)]" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1240px] flex-col gap-20 px-5 pb-16 sm:gap-28 sm:px-8 lg:px-12">
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <Timeline />
        <GitHubActivity />
        <Contact />
      </div>

      <div className="relative z-10 w-full">
        <Footer />
      </div>
    </main>
  );
}
