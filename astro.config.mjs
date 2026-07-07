// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://dogmawinebar.com',
  // Pin the dev/preview port so it matches .claude/launch.json ("dogma-dev")
  // and the CLAUDE.md docs. Without this, Astro falls back to its default 4321.
  server: { port: 4330 },
  integrations: [
    sitemap({
      filter: (page) =>
        ![
          "https://dogmawinebar.com/booking-confirmed/",
          "https://dogmawinebar.com/case-confirmed/",
          "https://dogmawinebar.com/obrigado/",
          "https://dogmawinebar.com/404/",
        ].includes(page),
    }),
  ],
});
