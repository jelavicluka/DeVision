import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { getPageMeta, getStructuredData, pages, renderSeoTags } from '../src/seo.js';

test('routes have unique Croatian titles/descriptions and canonical URLs without tracking queries', () => {
  const titles = new Set();
  const descriptions = new Set();
  for (const path of Object.keys(pages)) {
    const meta = getPageMeta(path);
    titles.add(meta.title);
    descriptions.add(meta.description);
    assert.equal(meta.url, `https://devision.hr${path}`);
    assert.equal(meta.robots, 'index, follow');
    assert.equal(getPageMeta(path.toUpperCase() + (path === '/' ? '' : '/')).url, meta.url);
    const data = getStructuredData(meta);
    assert.equal(data[0].address.addressCountry, 'HR');
    assert.equal(data[0].legalName, 'DEVISION 1 d.o.o. za usluge');
    assert.equal(data[0].taxID, '90298379158');
    assert.equal(data[1].inLanguage, 'hr-HR');
  }
  assert.equal(titles.size, 4);
  assert.equal(descriptions.size, 4);
  assert.equal(getPageMeta('/does-not-exist').robots, 'noindex, follow');
});

test('share metadata includes absolute image, Croatian locale and escapes HTML', () => {
  const tags = renderSeoTags(getPageMeta('/contact'));
  assert.match(tags, /property="og:image" content="https:\/\/devision.hr\/og-image.jpg"/);
  assert.match(tags, /property="og:locale" content="hr_HR"/);
  assert.match(tags, /name="twitter:card" content="summary_large_image"/);
  const escaped = renderSeoTags({ ...getPageMeta('/'), title: '<script>"&' });
  assert.match(escaped, /&lt;script&gt;&quot;&amp;/);
  assert.equal(escaped.includes('<script>'), false);
});

test('production HTML contains content and per-page metadata before JavaScript runs', async () => {
  const checks = [
    ['index.html', '/', 'WE MAKE BRANDS'],
    ['services.html', '/services', 'Društvene mreže i sadržaj'],
    ['contact.html', '/contact', 'Razgovarajmo.'],
    ['privatnost.html', '/privatnost', 'Put Brodarice 6'],
    ['404.html', '/404', 'Dobra ideja.'],
  ];
  for (const [file, path, content] of checks) {
    const html = await readFile(`dist/${file}`, 'utf8');
    assert.ok(html.includes(content), file);
    assert.equal((html.match(/<title>/g) || []).length, 1, file);
    assert.equal((html.match(/name="description"/g) || []).length, 1, file);
    assert.ok(html.includes(`content="${getPageMeta(path).robots}"`), file);
    assert.ok(html.includes(`href="${getPageMeta(path).url}"`), file);
    assert.equal(html.includes('/src/assets/'), false, file);
    assert.equal(html.includes('<div id="root"></div>'), false, file);
    assert.equal(html.includes('hidden id="S:'), false, 'content must be visible without Suspense scripts');
    const structured = html.match(/id="structured-data">([\s\S]*?)<\/script>/)[1];
    assert.equal(JSON.parse(structured)[0].name, 'DeVision');
  }
  const home = await readFile('dist/index.html', 'utf8');
  assert.equal(/<video[^>]+src=/.test(home), false, 'responsive video selection is left to the browser app');
  const sitemap = await readFile('dist/sitemap.xml', 'utf8');
  assert.equal((sitemap.match(/<loc>/g) || []).length, 4);
  assert.equal(sitemap.includes('/404'), false);
  assert.match(await readFile('dist/robots.txt', 'utf8'), /Sitemap: https:\/\/devision.hr\/sitemap.xml/);
  const image = await readFile('dist/og-image.jpg');
  assert.equal(image[0], 0xff);
  assert.equal(image[1], 0xd8);
});
