'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import SpotlightCard from '@/components/SpotlightCard';

type Testimonial = {
  id: string;
  name: string;
  role: string;
  message: string;
};

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
    async function fetchTestimonials() {
      try {
        const { data, error } = await supabase
          .from('testimonials')
          .select('*')
          .eq('is_approved', true);

        if (error) throw error;
        if (data) setTestimonials(data);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchTestimonials();
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#E5E5E5] relative">
      <Navbar />

      <main className="flex flex-col items-center px-4 pt-28 pb-20 max-w-6xl mx-auto space-y-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-start text-left space-y-4 w-full max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-medium tracking-wide text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Community Wall • Reviews</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            What People Say <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#E5E5E5] to-white/50">
              About Collaborating With Me.
            </span>
          </h1>
          <p className="text-sm sm:text-base text-white/60">
            Kumpulan ulasan, kesan, dan pesan profesional dari kolega, klien, serta rekan sesama pengembang.
          </p>
        </motion.div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            [...Array(3)].map((_, i) => (
              <div key={i} className="h-48 rounded-3xl bg-white/[0.02] border border-white/5 animate-pulse"></div>
            ))
          ) : testimonials.length === 0 ? (
            <div className="col-span-full py-16 text-center text-white/40 font-mono text-sm">
              Belum ada ulasan yang disetujui saat ini.
            </div>
          ) : (
            testimonials.map((item) => (
              <SpotlightCard key={item.id} className="p-6 flex flex-col justify-between group border border-white/10 bg-neutral-900/60 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
                <div className="space-y-4 h-full flex flex-col justify-between">
                  <p className="text-white text-sm sm:text-base leading-relaxed italic">
                    &ldquo;{item.message}&rdquo;
                  </p>
                  <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400/20 to-blue-500/20 border border-white/10 flex items-center justify-center text-white font-mono text-sm">
                      {item.name ? item.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">{item.name}</h4>
                      <p className="text-[11px] text-white/60 font-mono">{item.role}</p>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            ))
          )}
        </div>
      </main>
    </div>
  );
}