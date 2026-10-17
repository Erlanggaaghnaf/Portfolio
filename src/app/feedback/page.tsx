'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';

export default function FeedbackPage() {
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get('name') ?? '');
    const role = String(formData.get('role') ?? '');
    const message = String(formData.get('message') ?? '');

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, role, message }),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.error || 'Feedback gagal dikirim.');
        return;
      }

      toast.success(
        'Terima kasih! Feedback berhasil dikirim dan menunggu moderasi.'
      );

      form.reset();
    } catch {
      toast.error('Tidak dapat menghubungi server. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#E5E5E5] relative">
      <Navbar />

      <main className="flex flex-col items-center justify-center px-4 pt-24 pb-12 sm:pt-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-xl bg-neutral-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.5)] space-y-6"
        >
          <div className="space-y-2 text-left">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">Community Feedback</span>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Deskripsikan Saya</h1>
            <p className="text-xs sm:text-sm text-white/60">
              Bagikan kesan, ulasan, atau deskripsi profesional mengenai kolaborasi atau interaksi Anda dengan saya.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-white/60 mb-2 uppercase tracking-wider">Nama Anda</label>
              <input type="text" name="name" required placeholder="John Doe" className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/40" />
            </div>

            <div>
              <label className="block text-xs font-mono text-white/60 mb-2 uppercase tracking-wider">Peran / Profesi / Instansi</label>
              <input type="text" name="role" required placeholder="Software Engineer / Kolega" className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/40" />
            </div>

            <div>
              <label className="block text-xs font-mono text-white/60 mb-2 uppercase tracking-wider">Deskripsi / Kesan</label>
              <textarea name="message" required rows={4} placeholder="Tuliskan deskripsi atau testimoni tentang Erlangga..." className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/40 resize-none"></textarea>
            </div>

            <button type="submit" disabled={loading} className="w-full py-4 rounded-full bg-[#E5E5E5] text-black font-semibold text-sm hover:bg-white transition-all disabled:opacity-50">
              {loading ? 'Mengirim...' : 'Kirim Deskripsi'}
            </button>
          </form>
        </motion.div>
      </main>
    </div>
  );
}
