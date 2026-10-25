export const CONTACT_RATE_LIMIT = {
  requests: 3,
  window: '10 m',
  prefix: 'portfolio:contact',
} as const;

export type ContactActionResult =
  | { success: true }
  | {
      success: false;
      reason:
        | 'invalid_input'
        | 'rate_limited'
        | 'rate_limit_unavailable'
        | 'send_failed';
    };

type ContactFields = {
  name: string;
  email: string;
  message: string;
};

type ContactActionDependencies = {
  getClientIp: () => Promise<string | null>;
  isRateLimited: (ip: string) => Promise<boolean>;
  sendEmail: (fields: ContactFields) => Promise<unknown>;
};

function getValidatedFields(formData: FormData): ContactFields | null {
  if (!(formData instanceof FormData)) return null;

  const nameValue = formData.get('name');
  const emailValue = formData.get('email');
  const messageValue = formData.get('message');

  if (
    typeof nameValue !== 'string' ||
    typeof emailValue !== 'string' ||
    typeof messageValue !== 'string'
  ) {
    return null;
  }

  const name = nameValue.trim();
  const email = emailValue.trim();
  const message = messageValue.trim();

  if (
    name.length < 1 ||
    name.length > 100 ||
    email.length < 3 ||
    email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    message.length < 1 ||
    message.length > 5000
  ) {
    return null;
  }

  return { name, email, message };
}

function hasSuccessfulEmailId(response: unknown): boolean {
  if (!response || typeof response !== 'object') return false;

  const result = response as {
    data?: { id?: unknown } | null;
    error?: unknown;
  };

  return (
    !result.error &&
    typeof result.data?.id === 'string' &&
    result.data.id.length > 0
  );
}

export async function processContactForm(
  formData: FormData,
  dependencies: ContactActionDependencies
): Promise<ContactActionResult> {
  const fields = getValidatedFields(formData);
  if (!fields) return { success: false, reason: 'invalid_input' };

  let ip: string | null;

  try {
    ip = await dependencies.getClientIp();
  } catch {
    return { success: false, reason: 'rate_limit_unavailable' };
  }

  if (!ip) return { success: false, reason: 'rate_limit_unavailable' };

  try {
    if (await dependencies.isRateLimited(ip)) {
      return { success: false, reason: 'rate_limited' };
    }
  } catch {
    // Fail closed: an unavailable limiter must not permit an email send.
    return { success: false, reason: 'rate_limit_unavailable' };
  }

  try {
    const response = await dependencies.sendEmail(fields);
    if (!hasSuccessfulEmailId(response)) {
      return { success: false, reason: 'send_failed' };
    }

    return { success: true };
  } catch {
    return { success: false, reason: 'send_failed' };
  }
}
