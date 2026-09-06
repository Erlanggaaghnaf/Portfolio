'use client';

import { motion } from 'framer-motion';
import { useTransition } from 'react';
import { toast } from 'sonner';
import { sendEmail } from '@/app/actions';

export default function Contact() {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElement = e.currentTarget;
    const formData = new FormData(formElement);

    const toastId = toast.loading('Mengirim pesan ke server...');

    startTransition(async () => {
      const result = await sendEmail(formData);
      if (result.success) {
        toast.success('Pesan berhasil terkirim! Terima kasih telah menghubungi.', { id: toastId });
        formElement.reset();
      } else {
        toast.error('Gagal mengirim pesan. Silakan coba beberapa saat lagi.', { id: toastId });
      }
    });
  };

  return (
    <section id="contact" className="relative pt-6 sm:pt-10 pb-10 sm:pb-12 scroll-mt-28 space-y-12">
      <div className="absolute -top-10 left-1/4 w-96 h-96 bg-white/[0.03] rounded-full blur-3xl pointer-events-none -z-10"></div>
      
      {/* Section Header */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="gpu-accelerated flex flex-col items-start text-left space-y-4 max-w-3xl"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/15 backdrop-blur-md text-xs font-medium text-white/90 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>04 / GET IN TOUCH • Collaboration &amp; Inquiries</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
          Let&apos;s Build Something <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#E5E5E5] to-white/50">
            Exceptional Together.
          </span>
        </h2>
        <p className="text-sm sm:text-base text-white/60 leading-relaxed max-w-2xl">
          Tertarik berdiskusi seputar AI research, web engineering, atau peluang kolaborasi? Kirimkan pesan atau hubungi langsung.
        </p>
      </motion.div>

      {/* Grid Contact */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Box: Info & Socials */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
          className="gpu-accelerated lg:col-span-5 flex flex-col justify-between space-y-6 bg-neutral-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
        >
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Ready for New Opportunities
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">Direct Connect</h3>
            <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
              Terbuka untuk kolaborasi riset, pengembangan aplikasi skala produksi, atau diskusi teknologi AI/Web masa depan.
            </p>
            
            <div className="pt-2 space-y-3">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-mono text-white/40 uppercase">Primary Email</div>
                  <div className="text-xs sm:text-sm text-white font-medium">erlanggafatah6@gmail.com</div>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="pt-2 space-y-2">
              <div className="text-[11px] font-mono text-white/40 uppercase tracking-wider">Social Networks</div>
              <div className="grid grid-cols-2 gap-2.5">
                
                {/* GitHub */}
                <a 
                  href="https://github.com/Erlanggaaghnaf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-xs font-mono text-white/80 hover:text-white group"
                >
                  <svg className="w-4 h-4 fill-current text-white/70 group-hover:text-emerald-400 transition-colors" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  <span>GitHub</span>
                </a>

                {/* LinkedIn */}
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-xs font-mono text-white/80 hover:text-white group"
                >
                  <svg className="w-4 h-4 fill-current text-white/70 group-hover:text-blue-400 transition-colors" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  <span>LinkedIn</span>
                </a>

                {/* WhatsApp */}
                <a 
                  href="https://whatsapp.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-xs font-mono text-white/80 hover:text-white group"
                >
                  <svg className="w-4 h-4 fill-current text-white/70 group-hover:text-emerald-400 transition-colors" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                  <span>WhatsApp</span>
                </a>

                {/* Instagram */}
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-xs font-mono text-white/80 hover:text-white group"
                >
                  <svg className="w-4 h-4 fill-current text-white/70 group-hover:text-pink-400 transition-colors" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span>Instagram</span>
                </a>

              </div>
            </div>

          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/50">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Surabaya, Indonesia
            </span>
            <span className="font-mono text-[11px] text-white/40">UTC+07 • WIB</span>
          </div>
        </motion.div>

        {/* Right Box: Form */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
          className="gpu-accelerated lg:col-span-7 bg-neutral-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex flex-col justify-between"
        >
          <div className="space-y-2 mb-6">
            <span className="text-xs font-mono uppercase tracking-wider text-white/50">Send Inquiries</span>
            <h3 className="text-xl font-bold text-white tracking-tight">Leave a Message</h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-white/60 mb-2 uppercase tracking-wider">Nama Lengkap</label>
                <input type="text" name="name" required placeholder="Erlangga" className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/40" />
              </div>
              <div>
                <label className="block text-xs font-mono text-white/60 mb-2 uppercase tracking-wider">Email</label>
                <input type="email" name="email" required placeholder="example@gmail.com" className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/40" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-mono text-white/60 mb-2 uppercase tracking-wider">Pesan</label>
              <textarea name="message" required rows={4} placeholder="Kirimkan pesan Anda di sini..." className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/40 resize-none"></textarea>
            </div>
            <div className="pt-2 flex items-center justify-between gap-4">
              <span className="text-[11px] text-white/40 font-mono">Data terlindungi secara privat.</span>
              <button type="submit" disabled={isPending} className="px-7 py-3.5 rounded-full bg-[#E5E5E5] text-black font-semibold text-sm hover:bg-white transition-all shadow-[0_0_24px_rgba(255,255,255,0.2)] disabled:opacity-50">
                {isPending ? 'Mengirim...' : 'Kirim Pesan'}
              </button>
            </div>
          </form>
        </motion.div>

      </div>
    </section>
  );
}