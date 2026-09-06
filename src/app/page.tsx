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
    <main className="min-h-screen bg-[#0A0A0A] text-[#E5E5E5] flex flex-col items-center selection:bg-white/20 selection:text-white">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24 pb-20">
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <Timeline />
        <GitHubActivity />
        <Contact />
      </div>
      <Footer />
    </main>
  );
}