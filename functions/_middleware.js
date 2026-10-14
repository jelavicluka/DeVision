// Preserve Pages' SPA routing while returning a real 404 for unknown HTML pages.
export async function onRequest(context) {
  const response = await context.next();
  const { request } = context;
  const pathname = new URL(request.url).pathname;
  const knownPage = /^\/(?:services\/?|contact\/?|privatnost\/?)?$/i.test(pathname);
  if (!knownPage && ['GET', 'HEAD'].includes(request.method)
    && response.headers.get('Content-Type')?.includes('text/html')) {
    const headers = new Headers(response.headers);
    headers.set('X-Robots-Tag', 'noindex');
    headers.set('Cache-Control', 'no-store');
    return new Response(response.body, { status: 404, headers });
  }
  return response;
}
