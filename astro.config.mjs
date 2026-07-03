// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://dogmawinebar.com',
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
