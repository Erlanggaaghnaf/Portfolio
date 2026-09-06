'use client';

import { motion } from 'framer-motion';
import SpotlightCard from '@/components/SpotlightCard';

export default function Projects() {
  const projectsList = [
    {
      title: "Realtime Face Mask Detector",
      category: "Computer Vision & Deep Learning",
      description: "Sistem deteksi masker wajah real-time menggunakan arsitektur Convolutional Neural Networks (CNN) dan OpenCV, dioptimalkan untuk latensi rendah pada edge device.",
      tags: ["Python", "PyTorch", "OpenCV", "CNN"],
      status: "Completed",
      link: "https://github.com/Erlanggaaghnaf"
    },
    {
      title: "Skin Color Segmentation Model",
      category: "Image Processing Research",
      description: "Implementasi algoritma pemrosesan citra digital untuk segmentasi warna kulit menggunakan ruang warna HSV/YCbCr guna keperluan analisis dermatologis awal.",
      tags: ["Python", "NumPy", "OpenCV", "Research"],
      status: "Active Research",
      link: "https://github.com/Erlanggaaghnaf"
    },
    {
      title: "Next.js High-Performance Portfolio",
      category: "Web Engineering",
      description: "Portofolio pribadi berbasis Next.js App Router dengan desain Apple Bento Grid, GPU acceleration, integrasi Resend API, dan live GitHub tracking.",
      tags: ["Next.js", "Tailwind CSS", "Framer Motion", "TypeScript"],
      status: "Production",
      link: "https://github.com/Erlanggaaghnaf"
    }
  ];

  return (
    <section id="skills-projects" className="relative pt-6 sm:pt-10 scroll-mt-28 space-y-10">
      
      {/* Section Header */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="gpu-accelerated flex flex-col items-start text-left space-y-4 max-w-3xl"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-medium tracking-wide text-blue-400">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
          <span>03 / PORTFOLIO &amp; WORKS • Featured Projects</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
          Crafted Code, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#E5E5E5] to-white/50">
            Deployed for Impact.
          </span>
        </h2>
        <p className="text-sm sm:text-base text-white/60 leading-relaxed max-w-2xl">
          Kumpulan proyek riset kecerdasan buatan, sistem visi komputer, dan rekayasa web modern skala produksi.
        </p>
      </motion.div>

      {/* Grid Projects dengan SpotlightCard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projectsList.map((project, index) => (
          <SpotlightCard key={index} className="p-6 sm:p-8 flex flex-col justify-between group hover:border-white/25 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
              className="gpu-accelerated flex flex-col justify-between h-full space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                    {project.status}
                  </span>
                  <span className="text-xs text-white/40 font-mono">{project.category}</span>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-emerald-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-white/10">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag, tagIdx) => (
                    <span key={tagIdx} className="px-2 py-0.5 rounded-md bg-white/5 text-[11px] font-mono text-white/70 border border-white/5">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-white/80 hover:text-white transition-colors group-hover:translate-x-1 duration-200"
                  >
                    <span>Explore Repository</span>
                    <span>↗</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </SpotlightCard>
        ))}
      </div>

    </section>
  );
}