import assert from 'node:assert/strict';
import test from 'node:test';
import {
  CONTACT_RATE_LIMIT,
  processContactForm,
} from '../src/lib/contact-action-core.ts';

const validEntries = {
  name: 'Erlangga',
  email: 'student@example.com',
  message: 'Halo, saya ingin berdiskusi.',
};

function makeFormData(entries = validEntries) {
  const formData = new FormData();
  for (const [key, value] of Object.entries(entries)) {
    formData.set(key, value);
  }
  return formData;
}

function makeDependencies(overrides = {}) {
  const calls = { limiter: 0, email: 0 };
  const dependencies = {
    async getClientIp() {
      return '203.0.113.10';
    },
    async isRateLimited() {
      calls.limiter += 1;
      return false;
    },
    async sendEmail() {
      calls.email += 1;
      return { data: { id: 'email-test-id' }, error: null };
    },
    ...overrides,
  };

  return { calls, dependencies };
}

test('input tidak valid ditolak sebelum limiter dan Resend', async () => {
  const { calls, dependencies } = makeDependencies();
  const result = await processContactForm(
    makeFormData({ ...validEntries, email: 'bukan-email' }),
    dependencies
  );

  assert.deepEqual(result, { success: false, reason: 'invalid_input' });
  assert.equal(calls.limiter, 0);
  assert.equal(calls.email, 0);
});

test('permintaan valid yang lolos limiter dapat mencapai Resend mock', async () => {
  const { calls, dependencies } = makeDependencies();
  const result = await processContactForm(makeFormData(), dependencies);

  assert.deepEqual(result, { success: true });
  assert.equal(calls.limiter, 1);
  assert.equal(calls.email, 1);
});

test('permintaan yang melewati batas tidak memanggil Resend', async () => {
  const { calls, dependencies } = makeDependencies({
    async isRateLimited() {
      calls.limiter += 1;
      return true;
    },
  });
  const result = await processContactForm(makeFormData(), dependencies);

  assert.deepEqual(result, { success: false, reason: 'rate_limited' });
  assert.equal(calls.email, 0);
});

test('kegagalan Upstash ditolak dan tidak memanggil Resend', async () => {
  const { calls, dependencies } = makeDependencies({
    async isRateLimited() {
      throw new Error('internal detail must not escape');
    },
  });
  const result = await processContactForm(makeFormData(), dependencies);

  assert.deepEqual(result, {
    success: false,
    reason: 'rate_limit_unavailable',
  });
  assert.equal(calls.email, 0);
});

test('IP tepercaya yang tidak tersedia ditolak sebelum limiter dan Resend', async () => {
  const { calls, dependencies } = makeDependencies({
    async getClientIp() {
      return null;
    },
  });
  const result = await processContactForm(makeFormData(), dependencies);

  assert.deepEqual(result, {
    success: false,
    reason: 'rate_limit_unavailable',
  });
  assert.equal(calls.limiter, 0);
  assert.equal(calls.email, 0);
});

test('respons error Resend tidak dianggap sukses', async () => {
  const { calls, dependencies } = makeDependencies({
    async sendEmail() {
      calls.email += 1;
      return { data: null, error: { message: 'provider detail' } };
    },
  });
  const result = await processContactForm(makeFormData(), dependencies);

  assert.deepEqual(result, { success: false, reason: 'send_failed' });
});

test('respons tanpa ID email tidak dianggap sukses', async () => {
  const { dependencies } = makeDependencies({
    async sendEmail() {
      return { data: {}, error: null };
    },
  });
  const result = await processContactForm(makeFormData(), dependencies);

  assert.deepEqual(result, { success: false, reason: 'send_failed' });
});

test('exception Resend ditangani tanpa membocorkan detail', async () => {
  const { dependencies } = makeDependencies({
    async sendEmail() {
      throw new Error('private provider detail');
    },
  });
  const result = await processContactForm(makeFormData(), dependencies);

  assert.deepEqual(result, { success: false, reason: 'send_failed' });
});

test('kontrak hasil hanya berisi status aman untuk UI', async () => {
  const { dependencies } = makeDependencies({
    async sendEmail() {
      return { data: { id: 'private-id' }, error: null };
    },
  });
  const result = await processContactForm(makeFormData(), dependencies);

  assert.deepEqual(result, { success: true });
  assert.equal('data' in result, false);
});

test('kuota kontak memakai namespace dan limit terpisah dari feedback', () => {
  assert.deepEqual(CONTACT_RATE_LIMIT, {
    requests: 3,
    window: '10 m',
    prefix: 'portfolio:contact',
  });
  assert.notEqual(CONTACT_RATE_LIMIT.prefix, 'portfolio:feedback');
});
