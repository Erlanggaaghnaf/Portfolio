'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 5000;

function getStringField(formData: FormData, fieldName: string): string | null {
  const value = formData.get(fieldName);
  return typeof value === 'string' ? value.trim() : null;
}

function isValidEmail(email: string): boolean {
  if (email.length > MAX_EMAIL_LENGTH) return false;

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function sendEmail(formData: FormData) {
  const name = getStringField(formData, 'name');
  const email = getStringField(formData, 'email');
  const message = getStringField(formData, 'message');

  if (
    !name ||
    !email ||
    !message ||
    name.length > MAX_NAME_LENGTH ||
    !isValidEmail(email) ||
    message.length > MAX_MESSAGE_LENGTH
  ) {
    return {
      success: false as const,
      error: 'Periksa kembali nama, alamat email, dan pesan Anda.',
    };
  }

  try {
    const result = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: ['erlanggafatah6@gmail.com'],
      subject: `Pesan Baru dari Portfolio: ${name}`,
      replyTo: email,
      text: `Nama: ${name}\nEmail: ${email}\n\nPesan:\n${message}`,
    });

    if (result.error || !result.data?.id) {
      console.error('Resend gagal mengirim pesan kontak.');
      return {
        success: false as const,
        error: 'Pesan gagal dikirim. Silakan coba beberapa saat lagi.',
      };
    }

    return { success: true as const };
  } catch {
    console.error('Terjadi kesalahan saat mengirim pesan kontak.');
    return {
      success: false as const,
      error: 'Pesan gagal dikirim. Silakan coba beberapa saat lagi.',
    };
  }
}
