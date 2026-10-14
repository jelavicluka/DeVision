# DeVision

Responsive bilingual portfolio site built with React, React Router, and Vite.

## Local development

```bash
npm install
npm run dev
```

## Quality checks

```bash
npm run lint
npm run build
npm test
```

## Cloudflare Pages i kontaktni obrazac

Obrazac šalje `POST /api/contact`. Cloudflare Pages funkcija provjerava podatke i
Turnstile token, zatim šalje poruku preko Resenda na `deni@devision.hr`. Odgovor na
primljeni e-mail ide posjetitelju putem polja Reply-To. API ključ nikad ne ide u
preglednik. Bez konfiguracije slanje je onemogućeno uz poruku s izravnom adresom.

### Postavljanje za objavu

1. U Resendu otvoriti **Domains → Add domain** i dodati `upiti.devision.hr`.
   U DNS upravljanju domene dodati točno zapise koje prikaže Resend, zatim potvrditi
   domenu. Za slanje koristiti `DeVision web <web@upiti.devision.hr>`.
   Ne mijenjati MX zapise glavne domene za postojeći sandučić.
2. U Cloudflareu otvoriti **Turnstile → Add widget**, dodati produkcijske domene
   `devision.hr` i `www.devision.hr` te stvarnu `*.pages.dev` adresu projekta ako se
   i ona koristi za testiranje. Odabrati Managed način rada.
3. Napraviti **Pages** projekt povezan s Git repozitorijem. Build naredba je
   `npm run build`, izlazna mapa `dist`. Koristiti Node.js 22. Cloudflare automatski
   uključuje mapu `functions` iz korijena repozitorija. Običan drag-and-drop upload
   u web sučelju ne objavljuje Functions; koristiti Git integraciju ili Wrangler.
4. U postavkama projekta **Variables and Secrets** postaviti:

   | Naziv | Vrijednost | Vrsta |
   | --- | --- | --- |
   | `RESEND_API_KEY` | Novi Resend ključ s pravom slanja za odabranu domenu | Secret |
   | `CONTACT_FROM_EMAIL` | `DeVision web <web@upiti.devision.hr>` | Variable |
   | `TURNSTILE_SITE_KEY` | Javni ključ Turnstile widgeta | Variable |
   | `TURNSTILE_SECRET_KEY` | Tajni ključ Turnstile widgeta | Secret |

   Postaviti zasebno za Production i, prema potrebi, Preview. Nakon promjene
   ponovno objaviti projekt. Ne koristiti prefiks `VITE_` za tajne.
5. Povezati prilagođenu domenu. Ako se DNS upravljanje seli na Cloudflare, prvo
   prenijeti postojeće zapise za poštu (MX, SPF, DKIM i ostale potrebne zapise).
6. Poslati stvarni testni upit i potvrditi dostavu, Reply-To i prikaz pogreške.
   Lokalni testovi koriste zamjenske odgovore servisa i ne potvrđuju dostavu.

Ako je API ključ podijeljen u razgovoru, prije objave opozvati ga i napraviti novi.
Stvarne ključeve unositi izravno u Cloudflare, ne u izvorni kod ili Git.

### Lokalno pokretanje s funkcijama

Kopirati `.dev.vars.example` u `.dev.vars` i unijeti lokalne postavke. `.dev.vars`
je isključen iz Gita. Za provjeru slanja treba Resend domena i Turnstile widget
koji dopušta lokalni hostname; Cloudflareovi testni ključevi nisu za produkciju.

```bash
npm run dev:cloudflare
```

Otvoriti `http://localhost:8788`. Sam `npm run dev` ili `npm run preview` pokreće
samo frontend, bez slanja e-mailova. Za ručnu objavu putem terminala prijaviti se
naredbom `npx wrangler login`, zatim koristiti `npm run deploy:cloudflare`.

### Videozapisi za web

Stranica koristi komprimirane H.264 MP4 datoteke iz `src/assets/video`, s metapodacima
na početku datoteke za brže pokretanje. Desktop verzija je 1920 × 1080 / 30 fps,
vertikalna 576 × 1024 / 30 fps. Zvuk je uklonjen jer se video na stranici reproducira
bez zvuka. Obje datoteke su ispod Cloudflare limita od 25 MiB po datoteci.
Izvorni MP4 videozapisi u korijenu ostaju sačuvani i ne uključuju se u build.

## Privatnost i nepostojeće stranice

Obavijest o privatnosti je na `/privatnost`, dostupna u podnožju i uz kontaktni
obrazac. Sadrži podatke društva iz dostavljene poveznice Sudskog registra i potvrđeni rok
čuvanja neuspjelih poslovnih upita od 12 mjeseci nakon zadnje komunikacije.
Brisanje tih poruka treba provoditi u poslovnom sandučiću; stranica ga ne obavlja
automatski. Prije objave potvrditi aktualnost registriranih podataka i stvarne
postavke čuvanja tehničkih zapisa/sigurnosnih kopija kod pružatelja pošte i drugih
servisa. Promjene analitike, marketinških alata ili pružatelja usluga zahtijevaju
odgovarajuću izmjenu obavijesti i, gdje je primjenjivo, upravljanje privolama.

Nepostojeće putanje prikazuju React stranicu 404. Cloudflare middleware vraća
HTTP 404 i `X-Robots-Tag: noindex` za nepoznate HTML stranice; `/`, `/services`,
`/contact` i `/privatnost` ostaju dostupni pri izravnom otvaranju i osvježavanju.
Pri dodavanju novih ruta treba ažurirati i popis u `functions/_middleware.js`.
Build generira zaseban HTML za svaku postojeću rutu i `404.html` za nepostojeće
adrese. React i dalje preuzima interaktivnost i navigaciju u pregledniku.

## SEO i dijeljenje poveznica

`npm run build` izrađuje produkcijske resurse i unaprijed renderira sadržaj svih
četiriju stranica. Svaka dobiva zaseban naslov, opis, canonical, Open Graph i
Twitter metapodatke te JSON-LD o obrtu. Metapodaci su dostupni i bez JavaScripta;
pri navigaciji ih ažurira `PageMetadata`. Izvor je `src/seo.js`.

`public/og-image.jpg` je kartica za dijeljenje s postojećim logotipom (1200 × 630).
Predložak je `scripts/social-card.html`; `brand-logo.png` služi za strukturirane
podatke, a dodane su i ikone preglednika. Build generira `sitemap.xml` i `robots.txt`.
Produkcijska adresa u konfiguraciji je `https://devision.hr`.

Nakon objave provjeriti javnu dostupnost slike i metapodataka te prijaviti sitemap
u Google Search Console. WhatsApp i druge aplikacije mogu zadržati stari prikaz
u predmemoriji. Ako se primarna domena promijeni na `www`, uskladiti `SITE_URL` i
postaviti preusmjeravanje između varijanti domene u Cloudflareu.

Za SEO testove prvo pokrenuti `npm run build`, zatim `npm test`, jer provjeravaju
i stvarne produkcijske HTML datoteke. Za provjeru metapodataka koristiti build;
Vite razvojni poslužitelj sadrži samo početni predložak i klijentska ažuriranja.
