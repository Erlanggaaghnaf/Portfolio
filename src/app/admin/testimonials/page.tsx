'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Inisialisasi klien Supabase (menggunakan variabel publik environment Vercel)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Testimonial {
  id: string | number;
  name: string;
  role: string;
  message: string;
  is_approved: boolean;
  created_at?: string;
}

export default function AdminTestimonialsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(false);

  // Password default sederhana untuk admin (bisa Anda ubah di sini)
  const ADMIN_PASSWORD = 'erlanggaadmin123';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      fetchTestimonials();
    } else {
      alert('Password salah!');
    }
  };

  const fetchTestimonials = async () => {
    setLoading(true);
    // Sesuaikan nama tabel jika tabel Anda bernama 'feedback' atau 'testimonials'
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('id', { ascending: false });

    if (error) {
      console.error('Gagal memuat data:', error.message);
    } else {
      setTestimonials(data || []);
    }
    setLoading(false);
  };

  // Fungsi untuk mengubah status Approve / Unapprove
  const toggleApprove = async (id: string | number, currentStatus: boolean) => {
    const { error } = await supabase
      .from('testimonials')
      .update({ is_approved: !currentStatus })
      .eq('id', id);

    if (error) {
      alert('Gagal mengubah status: ' + error.message);
    } else {
      setTestimonials(
        testimonials.map((item) =>
          item.id === id ? { ...item, is_approved: !currentStatus } : item
        )
      );
    }
  };

  // Fungsi untuk menghapus feedback
  const handleDelete = async (id: string | number) => {
    if (!confirm('Yakin ingin menghapus feedback ini?')) return;

    const { error } = await supabase
      .from('testimonials')
      .delete()
      .eq('id', id);

    if (error) {
      alert('Gagal menghapus: ' + error.message);
    } else {
      setTestimonials(testimonials.filter((item) => item.id !== id));
    }
  };

  // Tampilan jika belum login
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl w-full max-w-md shadow-xl">
          <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
          <div className="mb-4">
            <label className="block text-sm text-zinc-400 mb-2">Password Admin</label>
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="Masukkan password..."
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2 rounded-lg transition"
          >
            Masuk Dasbor
          </button>
        </form>
      </div>
    );
  }

  // Tampilan utama dasbor admin setelah login
  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Kelola Testimonial & Feedback</h1>
            <p className="text-zinc-400 text-sm mt-1">Setujui feedback yang layak tampil atau hapus ulasan yang tidak diinginkan.</p>
          </div>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-lg text-sm transition"
          >
            Keluar (Logout)
          </button>
        </div>

        {loading ? (
          <p className="text-zinc-400 text-center py-12">Memuat data feedback...</p>
        ) : testimonials.length === 0 ? (
          <p className="text-zinc-400 text-center py-12">Belum ada feedback yang masuk.</p>
        ) : (
          <div className="grid gap-4">
            {testimonials.map((item) => (
              <div
                key={item.id}
                className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
              >
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <span className="text-xs bg-zinc-800 text-zinc-300 px-2.5 py-1 rounded-full">
                      {item.role || 'Pengunjung'}
                    </span>
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                        item.is_approved
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          : 'bg-amber-950 text-amber-400 border border-amber-800'
                      }`}
                    >
                      {item.is_approved ? 'Disetujui (Tayang)' : 'Pending'}
                    </span>
                  </div>
                  <p className="text-zinc-300 italic pt-1">&ldquo;{item.message}&rdquo;</p>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto justify-end pt-4 md:pt-0 border-t md:border-t-0 border-zinc-800">
                  <button
                    onClick={() => toggleApprove(item.id, item.is_approved)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                      item.is_approved
                        ? 'bg-amber-600/20 text-amber-400 hover:bg-amber-600/30 border border-amber-600/50'
                        : 'bg-emerald-600 text-white hover:bg-emerald-500'
                    }`}
                  >
                    {item.is_approved ? 'Batalkan (Unapprove)' : 'Approve'}
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-600/50 px-4 py-2 rounded-lg text-sm font-medium transition"
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