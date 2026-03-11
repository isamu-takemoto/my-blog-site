import 'piccolore';
import { k as decodeKey } from './chunks/astro/server_DZHA5fpG.mjs';
import 'clsx';
import './chunks/astro-designed-error-pages_hmrJAnaG.mjs';
import 'es-module-lexer';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/noop-middleware_DDpaSrHl.mjs';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/takemotoisamu/Desktop/dev/my-blog-site/","cacheDir":"file:///Users/takemotoisamu/Desktop/dev/my-blog-site/node_modules/.astro/","outDir":"file:///Users/takemotoisamu/Desktop/dev/my-blog-site/dist/","srcDir":"file:///Users/takemotoisamu/Desktop/dev/my-blog-site/src/","publicDir":"file:///Users/takemotoisamu/Desktop/dev/my-blog-site/public/","buildClientDir":"file:///Users/takemotoisamu/Desktop/dev/my-blog-site/dist/client/","buildServerDir":"file:///Users/takemotoisamu/Desktop/dev/my-blog-site/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"about/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"blog/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/blog","isIndex":true,"type":"page","pattern":"^\\/blog\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/blog/index.astro","pathname":"/blog","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"rss.xml","links":[],"scripts":[],"styles":[],"routeData":{"route":"/rss.xml","isIndex":false,"type":"endpoint","pattern":"^\\/rss\\.xml\\/?$","segments":[[{"content":"rss.xml","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/rss.xml.js","pathname":"/rss.xml","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"tags/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/tags","isIndex":true,"type":"page","pattern":"^\\/tags\\/?$","segments":[[{"content":"tags","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/tags/index.astro","pathname":"/tags","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/api/keystatic/[...params]","pattern":"^\\/api\\/keystatic(?:\\/(.*?))?\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"keystatic","dynamic":false,"spread":false}],[{"content":"...params","dynamic":true,"spread":true}]],"params":["...params"],"component":"node_modules/@keystatic/astro/internal/keystatic-api.js","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","isIndex":false,"route":"/keystatic/[...params]","pattern":"^\\/keystatic(?:\\/(.*?))?\\/?$","segments":[[{"content":"keystatic","dynamic":false,"spread":false}],[{"content":"...params","dynamic":true,"spread":true}]],"params":["...params"],"component":"node_modules/@keystatic/astro/internal/keystatic-astro-page.astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}}],"site":"https://takeisa.dev","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/takemotoisamu/Desktop/dev/my-blog-site/src/pages/blog/index.astro",{"propagation":"in-tree","containsHead":true}],["/Users/takemotoisamu/Desktop/dev/my-blog-site/src/pages/blog/[...slug].astro",{"propagation":"in-tree","containsHead":true}],["/Users/takemotoisamu/Desktop/dev/my-blog-site/src/pages/[...page].astro",{"propagation":"in-tree","containsHead":true}],["/Users/takemotoisamu/Desktop/dev/my-blog-site/src/pages/about.astro",{"propagation":"none","containsHead":true}],["/Users/takemotoisamu/Desktop/dev/my-blog-site/src/pages/tags/[tag].astro",{"propagation":"in-tree","containsHead":true}],["/Users/takemotoisamu/Desktop/dev/my-blog-site/src/pages/tags/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/[...page]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/blog/[...slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/blog/index@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/takemotoisamu/Desktop/dev/my-blog-site/src/pages/rss.xml.js",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/rss.xml@_@js",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/tags/[tag]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/tags/index@_@astro",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000astro-internal:middleware":"_astro-internal_middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/about@_@astro":"pages/about.astro.mjs","\u0000@astro-page:node_modules/@keystatic/astro/internal/keystatic-api@_@js":"pages/api/keystatic/_---params_.astro.mjs","\u0000@astro-page:src/pages/blog/index@_@astro":"pages/blog.astro.mjs","\u0000@astro-page:src/pages/blog/[...slug]@_@astro":"pages/blog/_---slug_.astro.mjs","\u0000@astro-page:node_modules/@keystatic/astro/internal/keystatic-astro-page@_@astro":"pages/keystatic/_---params_.astro.mjs","\u0000@astro-page:src/pages/rss.xml@_@js":"pages/rss.xml.astro.mjs","\u0000@astro-page:src/pages/tags/[tag]@_@astro":"pages/tags/_tag_.astro.mjs","\u0000@astro-page:src/pages/tags/index@_@astro":"pages/tags.astro.mjs","\u0000@astro-page:src/pages/[...page]@_@astro":"pages/_---page_.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_Cfy4risa.mjs","/Users/takemotoisamu/Desktop/dev/my-blog-site/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_1taevYNg.mjs","/Users/takemotoisamu/Desktop/dev/my-blog-site/.astro/content-assets.mjs":"chunks/content-assets_DleWbedO.mjs","/Users/takemotoisamu/Desktop/dev/my-blog-site/.astro/content-modules.mjs":"chunks/content-modules_BxswmDj3.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_Bj974IxO.mjs","/Users/takemotoisamu/Desktop/dev/my-blog-site/src/content/blog/2026-03-01-astro-getting-started.mdx?astroPropagatedAssets":"chunks/2026-03-01-astro-getting-started_B4VQw7i0.mjs","/Users/takemotoisamu/Desktop/dev/my-blog-site/src/content/blog/2026-03-01-astro-getting-started.mdx":"chunks/2026-03-01-astro-getting-started_DWB3jSm0.mjs","/Users/takemotoisamu/Desktop/dev/my-blog-site/node_modules/@keystatic/astro/internal/keystatic-page.js":"_astro/keystatic-page.2nYGXyPJ.js","@astrojs/react/client.js":"_astro/client.BJGBxOWp.js","/Users/takemotoisamu/Desktop/dev/my-blog-site/src/components/CustomCursor.astro?astro&type=script&index=0&lang.ts":"_astro/CustomCursor.astro_astro_type_script_index_0_lang.BMkNAPMD.js","/Users/takemotoisamu/Desktop/dev/my-blog-site/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts":"_astro/ClientRouter.astro_astro_type_script_index_0_lang.CDGfc0hd.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/takemotoisamu/Desktop/dev/my-blog-site/src/components/CustomCursor.astro?astro&type=script&index=0&lang.ts","function h(){const t=document.getElementById(\"trail-canvas\");if(!t)return;const n=t.getContext(\"2d\");t.width=window.innerWidth,t.height=window.innerHeight,window.addEventListener(\"resize\",()=>{t.width=window.innerWidth,t.height=window.innerHeight});const a=[],o=[\"#f97316\",\"#fb923c\",\"#fdba74\"];window.addEventListener(\"mousemove\",i=>{a.push({x:i.clientX,y:i.clientY,size:Math.random()*5+3,alpha:.7,color:o[Math.floor(Math.random()*o.length)]})});function l(){n.clearRect(0,0,t.width,t.height);for(let i=a.length-1;i>=0;i--){const e=a[i];if(e.alpha-=.03,e.size*=.95,e.alpha<=0){a.splice(i,1);continue}n.globalAlpha=e.alpha,n.fillStyle=e.color,n.beginPath(),n.arc(e.x,e.y,e.size,0,Math.PI*2),n.fill()}n.globalAlpha=1,requestAnimationFrame(l)}l()}h();document.addEventListener(\"astro:page-load\",h);"]],"assets":["/_astro/blog-placeholder-1.Bx0Zcyzv.jpg","/avatar.jpg","/favicon.ico","/favicon.jpg","/favicon.png","/favicon.svg","/_astro/ClientRouter.astro_astro_type_script_index_0_lang.CDGfc0hd.js","/_astro/client.BJGBxOWp.js","/_astro/index.BbrLBU_f.js","/_astro/keystatic-page.2nYGXyPJ.js","/fonts/atkinson-bold.woff","/fonts/atkinson-regular.woff","/about/index.html","/blog/index.html","/rss.xml","/tags/index.html"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"actionBodySizeLimit":1048576,"serverIslandNameMap":[],"key":"VltXL87wUNqi5k+Y2M7RIZjJKuqECJXJfc9x9YHpxRU="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
