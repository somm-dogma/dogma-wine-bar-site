// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { alternatesOf } from './src/i18n/routes.ts';

const SITE = 'https://dogmawinebar.com';

// https://astro.build/config
export default defineConfig({
  site: SITE,
  // Pin the dev/preview port so it matches .claude/launch.json ("dogma-dev")
  // and the CLAUDE.md docs. Without this, Astro falls back to its default 4321.
  server: { port: 4330 },
  integrations: [
    sitemap({
      filter: (page) =>
        ![
          "/booking-confirmed/", "/case-confirmed/", "/obrigado/", "/404/",
          "/pt/reserva-confirmada/", "/pt/encomenda-confirmada/", "/pt/mensagem-enviada/", "/pt/404/",
        ].includes(new URL(page).pathname),
      // hreflang pairs from the route map, so Google links each English
      // page to its Portuguese twin (translated slugs can't be inferred).
      serialize(item) {
        const twin = alternatesOf(new URL(item.url).pathname);
        if (twin) {
          item.links = [
            { lang: "en", url: new URL(twin.en, SITE).href },
            { lang: "pt-PT", url: new URL(twin.pt, SITE).href },
            { lang: "x-default", url: new URL(twin.en, SITE).href },
          ];
        }
        return item;
      },
    }),
  ],
});
