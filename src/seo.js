export const SITE_URL = 'https://devision.hr';
export const SHARE_IMAGE = `${SITE_URL}/og-image.jpg`;
export const pages = {
  '/': {
    title: 'DeVision',
    shareTitle: 'DeVision | Marketinška agencija',
    description: 'DeVision je marketinška agencija iz Splita. Društvene mreže, digitalno oglašavanje, brending, web i eventi za brendove koje je nemoguće ignorirati.',
  },
  '/services': {
    title: 'Marketinške usluge: sadržaj, oglašavanje i web | DeVision',
    description: 'Vođenje društvenih mreža, foto i video produkcija, digitalno oglašavanje, brending, web i SEO te organizacija evenata. Upoznajte usluge DeVisiona.',
  },
  '/contact': {
    title: 'Kontakt i upiti za suradnju | DeVision Split',
    description: 'Imate ideju ili projekt? Javite se DeVisionu putem obrasca, na deni@devision.hr ili +385 99 604 7635. Razgovarajmo o vašem brendu.',
  },
  '/privatnost': {
    title: 'Obavijest o privatnosti | DeVision',
    description: 'Saznajte kako DeVision obrađuje podatke posjetitelja i kontaktne upite, koliko ih čuva te kako možete ostvariti svoja prava.',
  },
};

export function getPageMeta(pathname) {
  const path = pathname.toLowerCase().replace(/\/+$/, '') || '/';
  const page = pages[path];
  return page ? { ...page, path, url: `${SITE_URL}${path}`, robots: 'index, follow' } : {
    title: 'Stranica nije pronađena | DeVision',
    description: 'Ova stranica nije pronađena. Posjetite početnu stranicu DeVisiona ili nam se javite za suradnju.',
    path, url: `${SITE_URL}${path}`, robots: 'noindex, follow',
  };
}

export const businessData = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${SITE_URL}/#business`,
  name: 'DeVision',
  legalName: 'DEVISION, obrt za usluge, vl. Deni Vuleta',
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/brand-logo.png`,
  image: SHARE_IMAGE,
  description: pages['/'].description,
  email: 'deni@devision.hr',
  telephone: '+385996047635',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Tijardovićeva 2',
    postalCode: '21000',
    addressLocality: 'Split',
    addressCountry: 'HR',
  },
  areaServed: { '@type': 'Country', name: 'Hrvatska' },
};

export function getStructuredData(meta) {
  return [businessData, {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': meta.url,
    url: meta.url,
    name: meta.title,
    description: meta.description,
    inLanguage: 'hr-HR',
    about: { '@id': businessData['@id'] },
  }];
}

const escapeHtml = (value) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

export function renderSeoTags(meta) {
  const properties = {
    'og:type': 'website',
    'og:site_name': 'DeVision',
    'og:locale': 'hr_HR',
    'og:title': meta.shareTitle || meta.title,
    'og:description': meta.description,
    'og:url': meta.url,
    'og:image': SHARE_IMAGE,
    'og:image:secure_url': SHARE_IMAGE,
    'og:image:type': 'image/jpeg',
    'og:image:width': '1200',
    'og:image:height': '630',
    'og:image:alt': 'DeVision Marketing Agency — strategija, kreativnost i rezultati.',
  };
  const names = {
    description: meta.description,
    robots: meta.robots,
    'twitter:card': 'summary_large_image',
    'twitter:title': meta.shareTitle || meta.title,
    'twitter:description': meta.description,
    'twitter:image': SHARE_IMAGE,
    'twitter:image:alt': properties['og:image:alt'],
  };
  return [
    `<title>${escapeHtml(meta.title)}</title>`,
    `<link rel="canonical" href="${escapeHtml(meta.url)}" />`,
    ...Object.entries(names).map(([name, content]) => `<meta name="${name}" content="${escapeHtml(content)}" />`),
    ...Object.entries(properties).map(([property, content]) => `<meta property="${property}" content="${escapeHtml(content)}" />`),
    `<script type="application/ld+json" id="structured-data">${JSON.stringify(getStructuredData(meta)).replaceAll('<', '\\u003c')}</script>`,
  ].join('\n    ');
}
