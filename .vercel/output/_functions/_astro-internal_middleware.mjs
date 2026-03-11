import { d as defineMiddleware, s as sequence } from './chunks/index_Bel-rfDh.mjs';
import 'es-module-lexer';
import './chunks/astro-designed-error-pages_hmrJAnaG.mjs';
import 'piccolore';
import './chunks/astro/server_DZHA5fpG.mjs';
import 'clsx';

const PROTECTED_PREFIXES = ["/keystatic", "/api/keystatic"];
const onRequest$1 = defineMiddleware((context, next) => {
  const url = new URL(context.request.url);
  const isProtected = PROTECTED_PREFIXES.some((prefix) => url.pathname.startsWith(prefix));
  if (!isProtected) {
    return next();
  }
  const expectedUser = "admin";
  const expectedPass = "Take662121";
  const authHeader = context.request.headers.get("Authorization");
  if (authHeader?.startsWith("Basic ")) {
    const decoded = atob(authHeader.slice(6));
    const [user, ...passParts] = decoded.split(":");
    const pass = passParts.join(":");
    if (user === expectedUser && pass === expectedPass) {
      return next();
    }
  }
  return new Response("Unauthorized", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Keystatic CMS"'
    }
  });
});

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
