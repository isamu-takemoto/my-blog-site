import { d as defineMiddleware, s as sequence } from './chunks/index_Bel-rfDh.mjs';
import 'es-module-lexer';
import './chunks/astro-designed-error-pages_hmrJAnaG.mjs';
import 'piccolore';
import './chunks/astro/server_DZHA5fpG.mjs';
import 'clsx';

const onRequest$1 = defineMiddleware((context, next) => {
  {
    return next();
  }
});

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
