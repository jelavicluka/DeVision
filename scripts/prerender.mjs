import { readFile, writeFile } from 'node:fs/promises';
import { createServer } from 'vite';
import { getPageMeta, pages, renderSeoTags, SITE_URL } from '../src/seo.js';

const template = await readFile('dist/index.html', 'utf8');
if (!template.includes('<div id="root"></div>')) {
  throw new Error('Prerender requires a fresh Vite build. Run npm run build.');
}
const manifest = JSON.parse(await readFile('dist/.vite/manifest.json', 'utf8'));
const css = [...new Set(Object.values(manifest).flatMap((entry) => entry.css || []))];
const server = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  ssr: {
    noExternal: ['react-router-dom', 'react-router'],
    resolve: { conditions: ['module', 'import', 'development'] },
  },
});
try {
  const { render } = await server.ssrLoadModule('/scripts/prerender-entry.jsx');
  for (const path of [...Object.keys(pages), '/404']) {
    let body = await render(path);
    for (const [source, entry] of Object.entries(manifest)) {
      if (entry.file && !source.startsWith('_')) body = body.replaceAll(`/${source}`, `/${entry.file}`);
    }
    if (body.includes('/src/assets/')) throw new Error(`Unresolved asset in ${path}`);
    const meta = getPageMeta(path);
    const html = template
      .replace(/<!--seo:start-->[\s\S]*?<!--seo:end-->/, `<!--seo:start-->\n    ${renderSeoTags(meta)}\n    <!--seo:end-->`)
      .replace('<div id="root"></div>', () => `<div id="root">${body}</div>`)
      .replace('</head>', `${css.filter((file) => !template.includes(`/${file}`)).map((file) => `<link rel="stylesheet" href="/${file}" />`).join('\n    ')}\n  </head>`);
    await writeFile(path === '/' ? 'dist/index.html' : `dist${path}.html`, html);
  }
  await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${Object.keys(pages).map((path) => `  <url><loc>${SITE_URL}${path}</loc></url>`).join('\n')}\n</urlset>\n`);
  await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
  console.log('Prerendered 4 pages + 404, metadata, sitemap and robots.txt.');
} finally {
  await server.close();
}
