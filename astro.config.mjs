// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.dogmawinebar.com',
  integrations: [
    sitemap({
      filter: (page) =>
        ![
          "https://www.dogmawinebar.com/booking-confirmed/",
          "https://www.dogmawinebar.com/obrigado/",
          "https://www.dogmawinebar.com/404/",
        ].includes(page),
    }),
  ],
});
