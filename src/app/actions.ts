'use server';

import { isIP } from 'node:net';
import { headers } from 'next/headers';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { Resend } from 'resend';
import {
  CONTACT_RATE_LIMIT,
  processContactForm,
} from '../lib/contact-action-core';

let contactLimiter: Ratelimit | undefined;

function getContactLimiter(): Ratelimit {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    throw new Error('Contact rate limiter is not configured.');
  }

  if (!contactLimiter) {
    contactLimiter = new Ratelimit({
      redis: new Redis({ url, token }),
      limiter: Ratelimit.slidingWindow(
        CONTACT_RATE_LIMIT.requests,
        CONTACT_RATE_LIMIT.window
      ),
      prefix: CONTACT_RATE_LIMIT.prefix,
    });
  }

  return contactLimiter;
}

async function getTrustedClientIp(): Promise<string | null> {
  const requestHeaders = await headers();
  const forwardedIp = requestHeaders
    .get('x-vercel-forwarded-for')
    ?.trim();

  // Vercel documents this as the requester's public IP. Reject missing,
  // malformed, or multi-hop values instead of trusting arbitrary headers.
  if (!forwardedIp || forwardedIp.includes(',') || isIP(forwardedIp) === 0) {
    return null;
  }

  return forwardedIp;
}

export async function sendEmail(formData: FormData) {
  return processContactForm(formData, {
    getClientIp: getTrustedClientIp,
    async isRateLimited(ip) {
      const { success } = await getContactLimiter().limit(ip);
      return !success;
    },
    async sendEmail({ name, email, message }) {
      const apiKey = process.env.RESEND_API_KEY;
      if (!apiKey) throw new Error('Email provider is not configured.');

      const resend = new Resend(apiKey);
      return resend.emails.send({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: ['erlanggafatah6@gmail.com'],
        subject: `Pesan Baru dari Portfolio: ${name}`,
        replyTo: email,
        text: `Nama: ${name}\nEmail: ${email}\n\nPesan:\n${message}`,
      });
    },
  });
}
