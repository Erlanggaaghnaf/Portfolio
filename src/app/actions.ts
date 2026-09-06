'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;

  try {
    const data = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: ['erlanggafatah6@gmail.com'],
      subject: `Pesan Baru dari Portfolio: ${name}`,
      replyTo: email,
      text: `Nama: ${name}\nEmail: ${email}\n\nPesan:\n${message}`,
    });

    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
}