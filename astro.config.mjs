import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://farcinema.com',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
});
