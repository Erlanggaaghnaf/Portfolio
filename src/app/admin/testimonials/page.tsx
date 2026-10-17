'use client';

import { useCallback, useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

type Testimonial = {
  id: string;
  name: string;
  role: string;
  message: string;
  is_approved: boolean;
};

const ADMIN_USER_ID =
  process.env.NEXT_PUBLIC_SUPABASE_ADMIN_USER_ID?.trim();

type AlertMessageProps = {
  variant: 'error' | 'success';
  message: string;
  onClose: () => void;
};

function AlertMessage({
  variant,
  message,
  onClose,
}: AlertMessageProps) {
  const isError = variant === 'error';

  return (
    <div
      role={isError ? 'alert' : 'status'}
      aria-live={isError ? 'assertive' : 'polite'}
      className={`flex items-start gap-3 rounded-2xl border p-4 ${
        isError
          ? 'border-rose-400/20 bg-rose-400/[0.06] text-rose-100'
          : 'border-emerald-400/20 bg-emerald-400/[0.06] text-emerald-100'
      }`}
    >
      <span
        aria-hidden="true"
        className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${
          isError
            ? 'bg-rose-400/10 text-rose-300'
            : 'bg-emerald-400/10 text-emerald-300'
        }`}
      >
        {isError ? (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-5 w-5"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 8v5m0 3h.01" strokeLinecap="round" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-5 w-5"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <circle cx="12" cy="12" r="9" />
            <path
              d="m8 12 2.5 2.5L16.5 9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>

      <div className="min-w-0 flex-1 pt-1">
        <p className="text-sm font-semibold">
          {isError ? 'Ada kendala' : 'Berhasil'}
        </p>
        <p className="mt-1 break-words text-sm leading-6 text-white/65">
          {message}
        </p>
      </div>

      <button
        type="button"
        onClick={onClose}
        aria-label="Tutup notifikasi"
        className="rounded-lg p-1.5 text-white/45 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-4 w-4"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}

function Spinner() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 animate-spin"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeOpacity="0.25"
        strokeWidth="3"
      />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function AdminTestimonialsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [deleteTarget, setDeleteTarget] =
    useState<Testimonial | null>(null);

  const isAdmin = Boolean(
    user && ADMIN_USER_ID && user.id === ADMIN_USER_ID
  );

  const fetchTestimonials = useCallback(async () => {
    if (!ADMIN_USER_ID) {
      setTestimonials([]);
      setErrorMessage(
        'ID admin belum dikonfigurasi di environment variables.'
      );
      setLoading(false);
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('id, name, role, message, is_approved')
        .order('id', { ascending: false });

      if (error) {
        setTestimonials([]);
        setErrorMessage(
          'Tidak dapat memuat testimonial. Periksa sesi login dan koneksi.'
        );
        return;
      }

      setTestimonials((data ?? []) as Testimonial[]);
    } catch {
      setTestimonials([]);
      setErrorMessage(
        'Terjadi kesalahan saat memuat testimonial. Silakan coba lagi.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // Periksa sesi yang tersimpan dan muat data jika sesi milik admin.
  useEffect(() => {
    let active = true;

    const applySessionUser = (sessionUser: User | null) => {
      if (!active) return;

      if (
        sessionUser &&
        ADMIN_USER_ID &&
        sessionUser.id === ADMIN_USER_ID
      ) {
        setUser(sessionUser);
      } else {
        setUser(null);
        setTestimonials([]);
      }
    };

    const checkSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();

        if (!active) return;

        if (error) {
          setErrorMessage(
            'Gagal memeriksa sesi login. Silakan masuk kembali.'
          );
        }

        const sessionUser = data.session?.user ?? null;
        applySessionUser(sessionUser);

        if (
          sessionUser &&
          ADMIN_USER_ID &&
          sessionUser.id === ADMIN_USER_ID
        ) {
          await fetchTestimonials();
        } else {
          setLoading(false);
        }
      } catch {
        if (active) {
          setUser(null);
          setTestimonials([]);
          setLoading(false);
          setErrorMessage(
            'Gagal memeriksa sesi login. Periksa koneksi internet.'
          );
        }
      }
    };

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      applySessionUser(session?.user ?? null);
    });

    void checkSession();

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [fetchTestimonials]);

  // Tutup dialog konfirmasi dengan tombol Escape.
  useEffect(() => {
    if (!deleteTarget) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && busyId === null) {
        setDeleteTarget(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [deleteTarget, busyId]);

  const handleLogin = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setLoading(true);

    try {
      const { data, error } =
        await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

      setPassword('');

      if (
        error ||
        !data.user ||
        !ADMIN_USER_ID ||
        data.user.id !== ADMIN_USER_ID
      ) {
        await supabase.auth.signOut();
        setUser(null);
        setTestimonials([]);
        setErrorMessage(
          'Login gagal atau akun tidak memiliki akses admin.'
        );
        return;
      }

      setUser(data.user);

      // Ambil data setelah login admin berhasil.
      await fetchTestimonials();

      setSuccessMessage(
        'Login berhasil. Selamat datang di halaman admin.'
      );
    } catch {
      setPassword('');
      setErrorMessage(
        'Login gagal karena masalah koneksi. Silakan coba lagi.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        setErrorMessage('Gagal keluar. Silakan coba lagi.');
        return;
      }

      setUser(null);
      setTestimonials([]);
      setDeleteTarget(null);
      setEmail('');
      setPassword('');
    } catch {
      setErrorMessage(
        'Gagal keluar karena masalah koneksi. Silakan coba lagi.'
      );
    } finally {
      setLoading(false);
    }
  };

  const toggleApprove = async (item: Testimonial) => {
    if (!isAdmin || busyId !== null) return;

    setBusyId(item.id);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const { error } = await supabase
        .from('testimonials')
        .update({ is_approved: !item.is_approved })
        .eq('id', item.id);

      if (error) {
        setErrorMessage(
          'Gagal mengubah status testimonial. Silakan coba lagi.'
        );
        return;
      }

      await fetchTestimonials();

      setSuccessMessage(
        item.is_approved
          ? 'Persetujuan testimonial berhasil dibatalkan.'
          : 'Testimonial berhasil disetujui.'
      );
    } catch {
      setErrorMessage(
        'Terjadi kesalahan saat mengubah status testimonial.'
      );
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!isAdmin || busyId !== null) return;

    setBusyId(id);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);

      if (error) {
        setDeleteTarget(null);
        setErrorMessage(
          'Gagal menghapus testimonial. Silakan coba lagi.'
        );
        return;
      }

      setTestimonials((current) =>
        current.filter((item) => item.id !== id)
      );
      setDeleteTarget(null);
      setSuccessMessage('Testimonial berhasil dihapus.');
    } catch {
      setDeleteTarget(null);
      setErrorMessage(
        'Terjadi kesalahan saat menghapus testimonial.'
      );
    } finally {
      setBusyId(null);
    }
  };

  const totalTestimonials = testimonials.length;
  const pendingTestimonials = testimonials.filter(
    (item) => !item.is_approved
  ).length;
  const approvedTestimonials = testimonials.filter(
    (item) => item.is_approved
  ).length;

  if (loading && !user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0B0B0A] px-4 text-white">
        <div className="flex items-center gap-3 text-sm text-[#A5A39E]">
          <Spinner />
          Memeriksa sesi...
        </div>
      </main>
    );
  }

  if (!isAdmin) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0B0B0A] px-4 py-10 text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-blue-500/[0.08] blur-3xl"
        />

        <form
          onSubmit={handleLogin}
          className="relative w-full max-w-md space-y-7 rounded-3xl border border-white/[0.12] bg-[#111110] p-6 shadow-2xl shadow-black/20 sm:p-9"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-400/[0.08] text-blue-300">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-5 w-5"
                stroke="currentColor"
                strokeWidth="1.6"
                aria-hidden="true"
              >
                <rect
                  x="4"
                  y="10"
                  width="16"
                  height="11"
                  rx="2"
                />
                <path
                  d="M8 10V7a4 4 0 0 1 8 0v3"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-blue-300">
                Restricted access
              </p>
              <p className="mt-1 text-xs text-[#96948E]">
                Portfolio workspace
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl font-semibold tracking-[-0.04em] text-[#F5F3EE]">
              Admin Login
            </h1>
            <p className="text-sm leading-6 text-[#A5A39E]">
              Masuk untuk mengelola testimonial dan menentukan
              ulasan yang ditampilkan di portfolio.
            </p>
          </div>

          {!ADMIN_USER_ID && (
            <p
              className="rounded-xl border border-amber-400/20 bg-amber-400/[0.06] p-3 text-sm text-amber-200"
              role="alert"
            >
              Konfigurasi NEXT_PUBLIC_SUPABASE_ADMIN_USER_ID
              belum diatur.
            </p>
          )}

          {errorMessage && (
            <AlertMessage
              variant="error"
              message={errorMessage}
              onClose={() => setErrorMessage('')}
            />
          )}

          {successMessage && (
            <AlertMessage
              variant="success"
              message={successMessage}
              onClose={() => setSuccessMessage('')}
            />
          )}

          <div className="space-y-5">
            <label className="block space-y-2.5 text-sm">
              <span className="font-medium text-[#E5E3DD]">
                Email admin
              </span>
              <input
                type="email"
                autoComplete="username"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="admin@example.com"
                className="min-h-12 w-full rounded-xl border border-white/[0.12] bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 hover:border-white/20 focus:border-blue-400/70 focus:ring-4 focus:ring-blue-400/[0.08]"
              />
            </label>

            <label className="block space-y-2.5 text-sm">
              <span className="font-medium text-[#E5E3DD]">
                Kata sandi
              </span>

              <span className="relative block">
                <input
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  placeholder="Masukkan kata sandi"
                  className="min-h-12 w-full rounded-xl border border-white/[0.12] bg-black/20 px-4 py-3 pr-20 text-sm text-white outline-none transition placeholder:text-white/25 hover:border-white/20 focus:border-blue-400/70 focus:ring-4 focus:ring-blue-400/[0.08]"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((visible) => !visible)
                  }
                  aria-label={
                    showPassword
                      ? 'Sembunyikan kata sandi'
                      : 'Tampilkan kata sandi'
                  }
                  aria-pressed={showPassword}
                  className="absolute inset-y-0 right-2 inline-flex items-center rounded-lg px-2 text-xs text-[#A5A39E] transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70"
                >
                  {showPassword ? 'Sembunyikan' : 'Lihat'}
                </button>
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading || !ADMIN_USER_ID}
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-400/25 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <>
                <Spinner />
                Memproses...
              </>
            ) : (
              <>
                Masuk ke dashboard
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-4 w-4"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  aria-hidden="true"
                >
                  <path
                    d="M5 12h14m-6-6 6 6-6 6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </>
            )}
          </button>

          <p className="border-t border-white/[0.08] pt-5 text-center text-xs leading-5 text-[#77756F]">
            Halaman khusus pengelolaan portfolio.
          </p>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0B0B0A] px-4 py-7 text-[#E5E3DD] sm:px-8 sm:py-10">
      <div className="mx-auto max-w-6xl space-y-8 sm:space-y-10">
        <header className="flex flex-col justify-between gap-6 border-b border-white/[0.12] pb-8 sm:flex-row sm:items-end">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-400" />
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-blue-300">
                Admin workspace
              </p>
            </div>

            <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#F5F3EE] sm:text-4xl">
              Kelola Testimonial
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-[#A5A39E]">
              Tinjau masukan yang masuk, kelola persetujuan,
              dan tentukan testimonial yang layak ditampilkan
              di portfolio.
            </p>
          </div>

          <button
            type="button"
            onClick={() => void handleLogout()}
            disabled={loading || busyId !== null}
            className="inline-flex min-h-10 items-center justify-center gap-2 self-start rounded-xl border border-white/[0.14] px-4 py-2.5 text-sm font-medium text-[#D7D5CF] transition-colors hover:border-white/25 hover:bg-white/[0.05] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70 disabled:cursor-not-allowed disabled:opacity-50 sm:self-auto"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-4 w-4"
              stroke="currentColor"
              strokeWidth="1.7"
              aria-hidden="true"
            >
              <path
                d="M10 17l5-5-5-5m5 5H3m9-9h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Keluar
          </button>
        </header>

        <div className="space-y-3" aria-live="polite">
          {errorMessage && (
            <AlertMessage
              variant="error"
              message={errorMessage}
              onClose={() => setErrorMessage('')}
            />
          )}

          {successMessage && (
            <AlertMessage
              variant="success"
              message={successMessage}
              onClose={() => setSuccessMessage('')}
            />
          )}
        </div>

        <section
          aria-label="Ringkasan testimonial"
          className="grid grid-cols-1 gap-3 sm:grid-cols-3"
        >
          {[
            {
              label: 'Total masuk',
              value: totalTestimonials,
              note: 'Seluruh testimonial',
              accent: 'text-[#F5F3EE]',
            },
            {
              label: 'Menunggu',
              value: pendingTestimonials,
              note: 'Perlu ditinjau',
              accent: 'text-amber-300',
            },
            {
              label: 'Dipublikasikan',
              value: approvedTestimonials,
              note: 'Sudah disetujui',
              accent: 'text-blue-300',
            },
          ].map((stat) => (
            <article
              key={stat.label}
              className="rounded-2xl border border-white/[0.10] bg-white/[0.025] p-5 transition-colors hover:border-white/[0.17] sm:p-6"
            >
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#96948E]">
                {stat.label}
              </p>

              <p
                className={`mt-4 text-3xl font-semibold tracking-[-0.04em] ${stat.accent}`}
              >
                {loading ? '—' : stat.value}
              </p>

              <p className="mt-2 text-xs text-[#96948E]">
                {stat.note}
              </p>
            </article>
          ))}
        </section>

        <section className="space-y-5">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-lg font-semibold tracking-tight text-[#F5F3EE]">
                Daftar testimonial
              </h2>
              <p className="mt-1.5 text-sm text-[#96948E]">
                Kelola ulasan sebelum ditampilkan secara publik.
              </p>
            </div>

            <button
              type="button"
              onClick={() => void fetchTestimonials()}
              disabled={loading || busyId !== null}
              className="inline-flex min-h-10 items-center justify-center gap-2 self-start rounded-xl border border-white/[0.12] px-3.5 py-2 text-sm font-medium text-[#D7D5CF] transition-colors hover:border-white/25 hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70 disabled:cursor-not-allowed disabled:opacity-50 sm:self-auto"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`}
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden="true"
              >
                <path
                  d="M20 7v5h-5M4 17v-5h5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5.6 9a7 7 0 0 1 11.8-2L20 12M4 12l2.6 5a7 7 0 0 0 11.8-2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {loading ? 'Memuat...' : 'Muat ulang'}
            </button>
          </div>

          {loading ? (
            <div className="flex min-h-48 flex-col items-center justify-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.015] px-6 py-12 text-center">
              <Spinner />
              <p className="text-sm text-[#96948E]">
                Memuat data testimonial...
              </p>
            </div>
          ) : testimonials.length === 0 ? (
            <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-white/[0.13] bg-white/[0.015] px-6 py-12 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.10] bg-white/[0.03] text-[#96948E]">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-6 w-6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <path
                    d="M7 4h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 9h6m-6 4h6m-6 4h3"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <h3 className="mt-4 text-base font-medium text-[#E5E3DD]">
                Belum ada testimonial
              </h3>

              <p className="mt-2 max-w-sm text-sm leading-6 text-[#96948E]">
                Testimonial yang dikirim pengunjung akan muncul
                di sini untuk ditinjau.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {testimonials.map((item, index) => (
                <article
                  key={item.id}
                  className="group flex flex-col gap-6 rounded-2xl border border-white/[0.10] bg-[#111110] p-5 transition-colors duration-200 hover:border-white/[0.18] sm:p-6 lg:flex-row lg:items-start lg:justify-between"
                >
                  <div className="min-w-0 flex-1 space-y-4">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="mr-1 text-xs tabular-nums text-[#77756F]">
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      <h3 className="break-words font-semibold text-[#F5F3EE]">
                        {item.name}
                      </h3>

                      <span className="max-w-full break-words rounded-lg border border-white/[0.10] bg-white/[0.025] px-2.5 py-1 text-xs text-[#A5A39E]">
                        {item.role}
                      </span>

                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${
                          item.is_approved
                            ? 'border-blue-400/20 bg-blue-400/[0.07] text-blue-300'
                            : 'border-amber-400/20 bg-amber-400/[0.06] text-amber-300'
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            item.is_approved
                              ? 'bg-blue-300'
                              : 'bg-amber-300'
                          }`}
                        />
                        {item.is_approved
                          ? 'Dipublikasikan'
                          : 'Menunggu tinjauan'}
                      </span>
                    </div>

                    <p className="max-w-3xl whitespace-pre-wrap break-words text-sm leading-7 text-[#C5C2BB]">
                      “{item.message}”
                    </p>
                  </div>

                  <div className="flex w-full flex-col gap-2 border-t border-white/[0.08] pt-4 sm:flex-row sm:flex-wrap sm:justify-end lg:w-auto lg:shrink-0 lg:border-0 lg:pt-0">
                    <button
                      type="button"
                      onClick={() => void toggleApprove(item)}
                      disabled={busyId !== null || loading}
                      className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70 disabled:cursor-not-allowed disabled:opacity-50 ${
                        item.is_approved
                          ? 'border-amber-400/20 bg-amber-400/[0.06] text-amber-300 hover:bg-amber-400/[0.12]'
                          : 'border-blue-400/25 bg-blue-400/[0.08] text-blue-300 hover:bg-blue-400/[0.15]'
                      }`}
                    >
                      {busyId === item.id ? (
                        <>
                          <Spinner />
                          Memproses...
                        </>
                      ) : item.is_approved ? (
                        'Batalkan persetujuan'
                      ) : (
                        'Setujui testimonial'
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeleteTarget(item)}
                      disabled={busyId !== null || loading}
                      className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-rose-400/20 bg-rose-400/[0.04] px-3.5 py-2 text-xs font-medium text-rose-300 transition-colors hover:border-rose-400/35 hover:bg-rose-400/[0.10] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400/70 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="h-3.5 w-3.5"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        aria-hidden="true"
                      >
                        <path
                          d="M4 7h16M10 11v6m4-6v6M6 7l1 13h10l1-13M9 7V4h6v3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Hapus
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>

      {deleteTarget && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4 py-6 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (
              event.target === event.currentTarget &&
              busyId === null
            ) {
              setDeleteTarget(null);
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-testimonial-title"
            aria-describedby="delete-testimonial-description"
            className="w-full max-w-md rounded-3xl border border-white/[0.12] bg-[#141413] p-6 shadow-2xl shadow-black/40 sm:p-7"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-rose-400/15 bg-rose-400/[0.07] text-rose-300">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-6 w-6"
                stroke="currentColor"
                strokeWidth="1.7"
                aria-hidden="true"
              >
                <path
                  d="M4 7h16M10 11v6m4-6v6M6 7l1 13h10l1-13M9 7V4h6v3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <p className="mt-5 text-xs font-medium uppercase tracking-[0.16em] text-rose-300">
              Konfirmasi tindakan
            </p>

            <h2
              id="delete-testimonial-title"
              className="mt-2 text-xl font-semibold tracking-tight text-[#F5F3EE]"
            >
              Hapus testimonial?
            </h2>

            <p
              id="delete-testimonial-description"
              className="mt-3 text-sm leading-6 text-[#A5A39E]"
            >
              Testimonial dari{' '}
              <span className="font-medium text-white">
                {deleteTarget.name}
              </span>{' '}
              akan dihapus permanen. Tindakan ini tidak dapat
              dibatalkan.
            </p>

            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                disabled={busyId !== null}
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/[0.12] px-4 py-2.5 text-sm font-medium text-[#D7D5CF] transition-colors hover:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Batal
              </button>

              <button
                type="button"
                onClick={() => void handleDelete(deleteTarget.id)}
                disabled={busyId !== null}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-rose-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-rose-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#141413] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {busyId === deleteTarget.id ? (
                  <>
                    <Spinner />
                    Menghapus...
                  </>
                ) : (
                  'Ya, hapus testimonial'
                )}
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}