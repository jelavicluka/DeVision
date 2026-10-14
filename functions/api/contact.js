const services = {
  'social-content': 'Društvene mreže i sadržaj',
  'digital-marketing': 'Digitalni marketing i oglašavanje',
  branding: 'Brending i strategija',
  'media-design': 'Dizajn i medijsko oglašavanje',
  'web-seo': 'Web i SEO',
  events: 'Eventi i aktivacije',
  other: 'Nešto drugo',
};

const respond = (status, message, extra = {}) => Response.json(
  { message, ...extra },
  { status, headers: { 'Cache-Control': 'no-store' } }
);

async function readBody(request) {
  if (!request.body) throw new Error('empty');
  const reader = request.body.getReader();
  const chunks = [];
  let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > 32768) {
      await reader.cancel();
      throw new Error('large');
    }
    chunks.push(value);
  }
  return JSON.parse(await new Blob(chunks).text());
}

export async function onRequest({ request, env }) {
  if (request.method === 'GET') {
    return respond(200, '', { siteKey: env.TURNSTILE_SITE_KEY || '' });
  }
  if (request.method !== 'POST') {
    return new Response(null, { status: 405, headers: { Allow: 'GET, POST' } });
  }
  const url = new URL(request.url);
  if (request.headers.get('Origin') !== url.origin) {
    return respond(403, 'Slanje s ove adrese nije dopušteno.');
  }
  if (!request.headers.get('Content-Type')?.includes('application/json')) {
    return respond(415, 'Neispravan format upita.');
  }

  let body;
  try {
    body = await readBody(request);
  } catch (error) {
    return respond(error.message === 'large' ? 413 : 400, 'Upit nije ispravan ili je prevelik.');
  }
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return respond(400, 'Neispravan upit.');
  }
  // Hidden field catches simple bots before any provider request is made.
  if (body.website) return respond(400, 'Upit nije moguće poslati.');

  const field = (name) => typeof body[name] === 'string' ? body[name].trim() : '';
  const name = field('name');
  const email = field('email');
  const company = field('company');
  const service = field('service');
  const message = field('message');
  const errors = {};
  if (name.length < 2 || name.length > 120 || /[\r\n]/.test(name)) errors.name = 'Upišite ime i prezime (2–120 znakova).';
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Upišite ispravnu e-mail adresu.';
  if (company.length > 160) errors.company = 'Naziv tvrtke može sadržavati najviše 160 znakova.';
  if (!Object.hasOwn(services, service)) errors.service = 'Odaberite uslugu koja vas zanima.';
  if (message.length < 10 || message.length > 6000) errors.message = 'Poruka treba sadržavati 10–6000 znakova.';
  if (body.consent !== true) errors.consent = 'Potvrdite da ste upoznati s obavijesti o privatnosti.';
  if (Object.keys(errors).length) return respond(400, 'Provjerite označena polja.', { errors });

  if (!env.RESEND_API_KEY || !env.CONTACT_FROM_EMAIL || !env.TURNSTILE_SECRET_KEY || !env.TURNSTILE_SITE_KEY) {
    return respond(503, 'Slanje trenutačno nije dostupno. Javite nam se na deni@devision.hr.');
  }
  const token = field('turnstileToken');
  if (!token || token.length > 2048) return respond(400, 'Potvrdite zaštitu od neželjenih poruka.');
  const submissionId = request.headers.get('Idempotency-Key');
  if (!submissionId || !/^[0-9a-f-]{36}$/i.test(submissionId)) return respond(400, 'Osvježite stranicu i pokušajte ponovno.');

  try {
    const verification = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret: env.TURNSTILE_SECRET_KEY,
        response: token,
        remoteip: request.headers.get('CF-Connecting-IP') || undefined,
      }),
      signal: AbortSignal.timeout(10000),
    });
    const result = await verification.json();
    if (!verification.ok || !result.success || result.hostname !== url.hostname || result.action !== 'contact') {
      return respond(400, 'Provjera zaštite nije uspjela. Pokušajte ponovno.');
    }

    const sent = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
        'Idempotency-Key': `contact/${submissionId}`,
      },
      body: JSON.stringify({
        from: env.CONTACT_FROM_EMAIL,
        to: ['deni@devision.hr'],
        reply_to: email,
        subject: `Novi upit s weba – ${name}`,
        text: [
          'Novi projektni upit s web-stranice DeVision',
          '',
          `Ime i prezime: ${name}`,
          `E-mail: ${email}`,
          `Tvrtka ili brend: ${company || 'Nije navedeno'}`,
          `Usluga: ${services[service]}`,
          '',
          'Poruka:',
          message,
          '',
          'Pošiljatelj je potvrdio upoznatost s obavijesti o privatnosti i obradom podataka za odgovor na upit.',
        ].join('\n'),
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!sent.ok) {
      return respond(sent.status === 429 ? 429 : 502, 'Slanje nije uspjelo. Pokušajte kasnije ili pišite na deni@devision.hr.');
    }
    const receipt = await sent.json();
    if (!receipt.id) throw new Error('missing receipt');
    return respond(200, 'Hvala! Vaš je upit poslan. Javit ćemo vam se uskoro.');
  } catch {
    return respond(502, 'Slanje nije moguće potvrditi. Pokušajte ponovno ili pišite na deni@devision.hr.');
  }
}
