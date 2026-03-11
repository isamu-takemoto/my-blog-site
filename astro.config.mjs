// @ts-check

import mdx from '@astrojs/mdx';
import node from '@astrojs/node';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import keystatic from '@keystatic/astro';
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://takeisa.dev',
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  integrations: [mdx(), sitemap(), react(), keystatic()],

  vite: {
    plugins: [tailwindcss()],
  },
});