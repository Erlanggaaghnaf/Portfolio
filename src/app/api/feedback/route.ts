
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';

export const runtime = 'nodejs';

const MAX_BODY_BYTES = 8 * 1024;
const RATE_LIMIT_REQUESTS = 5;
const RATE_LIMIT_WINDOW = '10 m';

function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

function getClientIp(request: Request): string {
  // Header ini biasanya disediakan oleh reverse proxy hosting.
  const realIp = request.headers.get('x-real-ip')?.trim();

  if (realIp) return realIp;

  const forwardedFor = request.headers.get('x-forwarded-for');

  if (forwardedFor) {
    const firstIp = forwardedFor.split(',')[0]?.trim();
    if (firstIp) return firstIp;
  }

  return 'unknown';
}

async function readLimitedBody(
  request: Request
): Promise<string | null> {
  if (!request.body) return '';

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      totalBytes += value.byteLength;

      if (totalBytes > MAX_BODY_BYTES) {
        await reader.cancel();
        return null;
      }

      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }

  const body = new Uint8Array(totalBytes);
  let offset = 0;

  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }

  return new TextDecoder('utf-8', { fatal: true }).decode(body);
}

export async function POST(request: Request) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (
    !supabaseUrl ||
    !serviceRoleKey ||
    !redisUrl ||
    !redisToken
  ) {
    console.error('Konfigurasi server feedback belum lengkap.');
    return jsonError('Layanan sedang mengalami gangguan.', 500);
  }

  // Validasi origin untuk endpoint yang hanya dipakai oleh website.
  const origin = request.headers.get('origin');

  if (!origin) {
    return jsonError('Origin permintaan wajib disertakan.', 403);
  }

  try {
    if (new URL(origin).origin !== new URL(request.url).origin) {
      return jsonError('Origin permintaan tidak diizinkan.', 403);
    }
  } catch {
    return jsonError('Origin permintaan tidak valid.', 403);
  }

  const contentType = request.headers.get('content-type') ?? '';

  if (!contentType.toLowerCase().includes('application/json')) {
    return jsonError('Content-Type harus application/json.', 415);
  }

  const contentLength = request.headers.get('content-length');

  if (contentLength !== null) {
    const length = Number(contentLength);

    if (
      !Number.isSafeInteger(length) ||
      length < 0 ||
      length > MAX_BODY_BYTES
    ) {
      return jsonError('Ukuran data terlalu besar.', 413);
    }
  }

  // Batasi frekuensi pengiriman berdasarkan alamat IP.
  const redis = new Redis({
    url: redisUrl,
    token: redisToken,
  });

  const limiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(
      RATE_LIMIT_REQUESTS,
      RATE_LIMIT_WINDOW
    ),
    prefix: 'portfolio:feedback',
  });

  try {
    const ip = getClientIp(request);
    const { success, reset } = await limiter.limit(ip);

    if (!success) {
      const retryAfter = Math.max(
        1,
        Math.ceil((reset - Date.now()) / 1000)
      );

      return NextResponse.json(
        { error: 'Terlalu banyak pengiriman. Coba lagi nanti.' },
        {
          status: 429,
          headers: { 'Retry-After': String(retryAfter) },
        }
      );
    }
  } catch (error) {
    // Gagal membatasi request berarti pengiriman ditolak.
    console.error('Rate limiting feedback gagal:', error);
    return jsonError('Layanan sedang mengalami gangguan.', 503);
  }

  let rawBody: string;

  try {
    const result = await readLimitedBody(request);

    if (result === null) {
      return jsonError('Ukuran data terlalu besar.', 413);
    }

    rawBody = result;
  } catch {
    return jsonError('Format data tidak valid.', 400);
  }

  let body: unknown;

  try {
    body = JSON.parse(rawBody);
  } catch {
    return jsonError('Format JSON tidak valid.', 400);
  }

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return jsonError('Data tidak valid.', 400);
  }

  const data = body as Record<string, unknown>;
  const name = typeof data.name === 'string' ? data.name.trim() : '';
  const role = typeof data.role === 'string' ? data.role.trim() : '';
  const message =
    typeof data.message === 'string' ? data.message.trim() : '';

  if (
    name.length < 1 ||
    name.length > 100 ||
    role.length < 1 ||
    role.length > 100 ||
    message.length < 1 ||
    message.length > 2000
  ) {
    return jsonError(
      'Nama dan peran harus 1–100 karakter, pesan 1–2000 karakter.',
      400
    );
  }

  try {
    // Service-role key hanya digunakan di server.
    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    });

    const { error: databaseError } = await supabase
      .from('testimonials')
      .insert({
        name,
        role,
        message,
        is_approved: false,
      });

    if (databaseError) {
      console.error('Gagal menyimpan feedback:', databaseError.message);
      return jsonError(
        'Feedback gagal disimpan. Silakan coba lagi.',
        500
      );
    }

    // Notifikasi Telegram tidak boleh menggagalkan penyimpanan feedback.
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (botToken && chatId) {
      try {
        const telegramText = [
          '🔔 Feedback baru masuk di portfolio!',
          '',
          `Nama: ${name}`,
          `Peran: ${role}`,
          `Pesan: ${message}`,
          '',
          'Silakan buka dashboard admin untuk moderasi.',
        ].join('\n');

        const telegramResponse = await fetch(
          `https://api.telegram.org/bot${botToken}/sendMessage`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: chatId,
              text: telegramText,
            }),
            signal: AbortSignal.timeout(8000),
            cache: 'no-store',
          }
        );

        if (!telegramResponse.ok) {
          console.error(
            'Telegram gagal mengirim notifikasi:',
            telegramResponse.status
          );
        }
      } catch (error) {
        console.error('Notifikasi Telegram gagal:', error);
      }
    }

    return NextResponse.json(
      { message: 'Feedback berhasil dikirim dan menunggu moderasi.' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Permintaan feedback gagal diproses:', error);
    return jsonError('Terjadi gangguan pada layanan.', 500);
  }
}
