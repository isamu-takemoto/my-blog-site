import { defineMiddleware } from 'astro:middleware';

const PROTECTED_PREFIXES = ['/keystatic', '/api/keystatic'];

export const onRequest = defineMiddleware((context, next) => {
  const url = new URL(context.request.url);
  const isProtected = PROTECTED_PREFIXES.some((prefix) => url.pathname.startsWith(prefix));

  if (!isProtected) {
    return next();
  }

  const expectedUser = import.meta.env.CMS_USER ?? 'admin';
  const expectedPass = import.meta.env.CMS_PASSWORD;

  if (!expectedPass) {
    // CMS_PASSWORD 未設定の場合はアクセス拒否（本番で環境変数を強制）
    return new Response('CMS_PASSWORD environment variable is not set.', { status: 503 });
  }

  const authHeader = context.request.headers.get('Authorization');
  if (authHeader?.startsWith('Basic ')) {
    const decoded = atob(authHeader.slice(6));
    const [user, ...passParts] = decoded.split(':');
    const pass = passParts.join(':');
    if (user === expectedUser && pass === expectedPass) {
      return next();
    }
  }

  return new Response('Unauthorized', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Keystatic CMS"',
    },
  });
});
