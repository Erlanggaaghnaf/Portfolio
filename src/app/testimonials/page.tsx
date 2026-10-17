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
  is_approved: boolean;
};

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const loadTestimonials = async () => {
      try {
        const { data, error } = await supabase
          .from('testimonials')
          .select('*')
          .eq('is_approved', true)
          .order('id', { ascending: false });

        if (error) throw error;

        if (!cancelled) {
          setTestimonials(data ?? []);
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void loadTestimonials();

    const channel = supabase
      .channel('public:testimonials')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'testimonials',
        },
        () => {
          void loadTestimonials();
        }
      )
      .subscribe();

    return () => {
      cancelled = true;
      void supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0A0A0A] text-[#E5E5E5]">
      <Navbar />

      <main className="mx-auto flex max-w-6xl flex-col items-center space-y-12 px-4 pb-20 pt-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex w-full max-w-3xl flex-col items-start space-y-4 text-left"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-medium tracking-wide text-emerald-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            <span>Community Wall • Reviews</span>
          </div>

          <h1 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            What People Say
            <br />
            <span className="bg-gradient-to-r from-white via-[#E5E5E5] to-white/50 bg-clip-text text-transparent">
              About Collaborating With Me.
            </span>
          </h1>

          <p className="text-sm text-white/60 sm:text-base">
            Kumpulan ulasan, kesan, dan pesan profesional dari kolega, klien,
            serta rekan sesama pengembang.
          </p>
        </motion.div>

        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            Array.from({ length: 3 }, (_, index) => (
              <div
                key={index}
                className="h-48 animate-pulse rounded-3xl border border-white/5 bg-white/[0.02]"
              />
            ))
          ) : testimonials.length === 0 ? (
            <div className="col-span-full py-16 text-center font-mono text-sm text-white/40">
              Belum ada ulasan yang disetujui saat ini.
            </div>
          ) : (
            testimonials.map((item) => (
              <SpotlightCard
                key={item.id}
                className="flex flex-col justify-between rounded-3xl border border-white/10 bg-neutral-900/60 p-6 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
              >
                <div className="flex h-full flex-col justify-between space-y-4">
                  <p className="text-sm italic leading-relaxed text-white sm:text-base">
                    &ldquo;{item.message}&rdquo;
                  </p>

                  <div className="flex items-center gap-3 border-t border-white/10 pt-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-emerald-400/20 to-blue-500/20 font-mono text-sm text-white">
                      {item.name
                        ? item.name.charAt(0).toUpperCase()
                        : 'U'}
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-white">
                        {item.name}
                      </h4>
                      <p className="font-mono text-[11px] text-white/60">
                        {item.role}
                      </p>
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
