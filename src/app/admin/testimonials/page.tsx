'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

type Testimonial = {
  id: string;
  name: string;
  role: string;
  message: string;
  is_approved: boolean;
};

export default function AdminTestimonialsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(false);

  const ADMIN_PASSWORD = 'erlanggaadmin123';

  const fetchTestimonials = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('id', { ascending: false });

      if (error) throw error;
      if (data) setTestimonials(data);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const savedAuth = localStorage.getItem('admin_authenticated');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
      fetchTestimonials();
    }
  }, [fetchTestimonials]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('admin_authenticated', 'true');
      fetchTestimonials();
    } else {
      alert('Password salah!');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_authenticated');
  };

  const toggleApprove = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('testimonials')
        .update({ is_approved: !currentStatus })
        .eq('id', id);

      if (error) throw error;
      fetchTestimonials();
    } catch (error: unknown) {
      const err = error as Error;
      alert('Gagal mengubah status: ' + err.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus ulasan ini?')) return;
    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchTestimonials();
    } catch (error: unknown) {
      const err = error as Error;
      alert('Gagal menghapus: ' + err.message);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-4">
        <form onSubmit={handleLogin} className="bg-neutral-900 border border-white/10 p-8 rounded-2xl w-full max-w-sm space-y-4">
          <h2 className="text-xl font-bold text-white text-center">Admin Login</h2>
          <input
            type="password"
            placeholder="Masukkan password..."
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500"
          />
          <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-semibold py-2.5 rounded-lg text-sm transition">
            Masuk
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#E5E5E5] p-6 sm:p-10">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center border-b border-white/10 pb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Kelola Testimonial & Feedback</h1>
            <p className="text-sm text-white/60">Setujui feedback yang layak tampil atau hapus ulasan yang tidak diinginkan.</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-lg text-sm transition text-white"
          >
            Keluar (Logout)
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12 text-white/40 font-mono text-sm">Memuat data...</div>
        ) : testimonials.length === 0 ? (
          <div className="text-center py-12 text-white/40 font-mono text-sm">Belum ada testimonial masuk.</div>
        ) : (
          <div className="space-y-4">
            {testimonials.map((item) => (
              <div key={item.id} className="bg-neutral-900/60 border border-white/10 p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-white">{item.name}</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/60 font-mono">{item.role}</span>
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${item.is_approved ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
                      {item.is_approved ? 'Disetujui (Tayang)' : 'Pending'}
                    </span>
                  </div>
                  <p className="text-sm text-white/80 italic">&ldquo;{item.message}&rdquo;</p>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <button
                    onClick={() => toggleApprove(item.id, item.is_approved)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition ${item.is_approved ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20'}`}
                  >
                    {item.is_approved ? 'Batalkan (Unapprove)' : 'Approve'}
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}