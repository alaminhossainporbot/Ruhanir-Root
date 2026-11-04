interface Env {
  ASSETS: {
    fetch: (request: Request) => Promise<Response>;
  };
  SITE_ENV?: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const host = url.hostname.toLowerCase();

    // 1. Fetch static assets from the Next.js export (out directory)
    const response = await env.ASSETS.fetch(request);

    // 2. Determine environment and robots tag
    const isNonProduction =
      host.endsWith('.workers.dev') ||
      host.endsWith('.pages.dev') ||
      host.includes('workbookbd.com') ||
      host === 'localhost' ||
      host === '127.0.0.1' ||
      (env.SITE_ENV && env.SITE_ENV !== 'production');

    const headers = new Headers(response.headers);

    if (isNonProduction) {
      headers.set('X-Robots-Tag', 'noindex, nofollow');
    }

    // 3. Performance & Caching headers
    const pathname = url.pathname;
    if (pathname.startsWith('/_next/static/') || pathname.startsWith('/fonts/')) {
      headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    } else if (response.headers.get('content-type')?.includes('text/html')) {
      headers.set('Cache-Control', 'public, max-age=0, must-revalidate');
    }

    // 4. Security Headers
    headers.set('X-Content-Type-Options', 'nosniff');
    headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    headers.set('X-Frame-Options', 'DENY');

    if (url.protocol === 'https:' && host === 'ruhanir.com') {
      headers.set(
        'Strict-Transport-Security',
        'max-age=31536000; includeSubDomains; preload'
      );
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};
