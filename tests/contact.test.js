import test, { afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { onRequest } from '../functions/api/contact.js';

const originalFetch = globalThis.fetch;
afterEach(() => { globalThis.fetch = originalFetch; });

const env = {
  RESEND_API_KEY: 'resend-private-fixture',
  CONTACT_FROM_EMAIL: 'DeVision web <web@upiti.devision.hr>',
  TURNSTILE_SITE_KEY: 'public-test-key',
  TURNSTILE_SECRET_KEY: 'test-secret',
};
const valid = {
  name: 'Test Korisnik',
  email: 'klijent@example.com',
  company: 'Primjer',
  service: 'web-seo',
  message: 'Trebamo novu web-stranicu za tvrtku.',
  consent: true,
  website: '',
  turnstileToken: 'test-token',
};
function request(body = valid, headers = {}, method = 'POST') {
  return new Request('https://devision.hr/api/contact', {
    method,
    headers: {
      Origin: 'https://devision.hr',
      'Content-Type': 'application/json',
      'Idempotency-Key': '12345678-1234-4234-8234-123456789abc',
      ...headers,
    },
    ...(method === 'POST' ? { body: JSON.stringify(body) } : {}),
  });
}
function mockProviders({ verified = true, hostname = 'devision.hr', action = 'contact', status = 200 } = {}) {
  const calls = [];
  globalThis.fetch = async (url, options) => {
    calls.push({ url, options });
    return url.includes('siteverify')
      ? Response.json({ success: verified, hostname, action })
      : Response.json(status === 200 ? { id: 'email-receipt' } : { message: 'provider detail' }, { status });
  };
  return calls;
}

test('returns only the public widget key in configuration', async () => {
  const result = await onRequest({ request: request(undefined, {}, 'GET'), env });
  const data = await result.json();
  assert.equal(data.siteKey, env.TURNSTILE_SITE_KEY);
  assert.equal(result.headers.get('Cache-Control'), 'no-store');
  assert.equal(JSON.stringify(data).includes('test-secret'), false);
  assert.equal(JSON.stringify(data).includes(env.RESEND_API_KEY), false);
});

test('valid enquiry is verified and sent to the fixed recipient with reply-to and deduplication', async () => {
  const calls = mockProviders();
  const result = await onRequest({ request: request({ ...valid, to: 'attacker@example.com' }), env });
  assert.equal(result.status, 200);
  assert.equal(calls.length, 2);
  assert.equal(calls[1].url, 'https://api.resend.com/emails');
  const email = JSON.parse(calls[1].options.body);
  assert.deepEqual(email.to, ['deni@devision.hr']);
  assert.equal(email.reply_to, valid.email);
  assert.equal(email.from, env.CONTACT_FROM_EMAIL);
  assert.match(email.text, /Web i SEO/);
  assert.match(email.text, /Trebamo novu web-stranicu/);
  assert.equal(email.html, undefined);
  assert.equal(calls[1].options.headers['Idempotency-Key'], 'contact/12345678-1234-4234-8234-123456789abc');
});

test('invalid input, consent, service and header injection are rejected before provider calls', async () => {
  const calls = mockProviders();
  for (const changes of [
    { name: 'x' }, { name: 'Ime\nBcc: netko' }, { email: 'invalid' },
    { message: 'kratko' }, { message: 'x'.repeat(6001) },
    { service: '__proto__' }, { consent: 'true' }, { company: 'x'.repeat(161) },
  ]) {
    const result = await onRequest({ request: request({ ...valid, ...changes }), env });
    assert.equal(result.status, 400);
    assert.ok(Object.keys((await result.json()).errors).length);
  }
  assert.equal(calls.length, 0);
});

test('bots, cross-origin requests, wrong content type and oversized requests are blocked', async () => {
  const calls = mockProviders();
  assert.equal((await onRequest({ request: request({ ...valid, website: 'spam' }), env })).status, 400);
  assert.equal((await onRequest({ request: request(valid, { Origin: 'https://other.example' }), env })).status, 403);
  assert.equal((await onRequest({ request: request(valid, { 'Content-Type': 'text/plain' }), env })).status, 415);
  assert.equal((await onRequest({ request: request({ message: 'x'.repeat(40000) }), env })).status, 413);
  assert.equal(calls.length, 0);
});

test('malformed JSON, null payload and unsupported methods fail safely', async () => {
  const malformed = new Request('https://devision.hr/api/contact', {
    method: 'POST', headers: { Origin: 'https://devision.hr', 'Content-Type': 'application/json' }, body: '{',
  });
  assert.equal((await onRequest({ request: malformed, env })).status, 400);
  assert.equal((await onRequest({ request: request(null), env })).status, 400);
  assert.equal((await onRequest({ request: request(undefined, {}, 'DELETE'), env })).status, 405);
});

test('missing configuration or verification never sends email', async () => {
  const calls = mockProviders();
  assert.equal((await onRequest({ request: request(), env: {} })).status, 503);
  assert.equal((await onRequest({ request: request({ ...valid, turnstileToken: '' }), env })).status, 400);
  assert.equal((await onRequest({ request: request(valid, { 'Idempotency-Key': '' }), env })).status, 400);
  assert.equal(calls.length, 0);
});

test('invalid, wrong-host and wrong-action Turnstile responses cannot reach Resend', async () => {
  for (const config of [{ verified: false }, { hostname: 'other.example' }, { action: 'other' }]) {
    const calls = mockProviders(config);
    const result = await onRequest({ request: request(), env });
    assert.equal(result.status, 400);
    assert.equal(calls.length, 1);
  }
});

test('provider rejection, rate limits and network failures do not report success or expose details', async () => {
  for (const status of [403, 429, 500]) {
    mockProviders({ status });
    const result = await onRequest({ request: request(), env });
    assert.equal(result.status, status === 429 ? 429 : 502);
    assert.equal(JSON.stringify(await result.json()).includes('provider detail'), false);
  }
  globalThis.fetch = async () => { throw new Error('private provider details'); };
  const result = await onRequest({ request: request(), env });
  assert.equal(result.status, 502);
  assert.equal(JSON.stringify(await result.json()).includes('private provider'), false);
});
