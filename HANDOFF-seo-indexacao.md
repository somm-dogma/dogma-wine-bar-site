# Handoff for review — Dogma SEO / indexation fix

**Context:** Astro + Netlify site, `dogmawinebar.com`. Goal was to resolve Google Search
Console "Why pages aren't indexed" errors (31× 404 on legacy `/shop/*`, inconsistent
canonical, stale sitemap). Executed a 3-task brief. **Shipped to `main` (commit `89e691b`)
and deployed. All 11 acceptance checks pass live.** Please double-check the reasoning and,
if you want, re-run the `curl` block at the bottom yourself.

---

## What changed (7 files, commit `89e691b`)

### Task 1 — Canonical host → NON-WWW (`https://dogmawinebar.com`)
Every canonical touchpoint flipped from `www.` to non-www:
- `astro.config.mjs` `site` (feeds sitemap + is source of truth)
- `src/data/site.ts` `url` → this is what `Base.astro` uses to build
  `<link rel="canonical">` and `og:url` on every page
- `src/pages/master-of-port.astro` JSON-LD (`worksFor.url`, `url`)
- `public/llms.txt`, `public/robots.txt` (Sitemap line)
- 301 `www → non-www` (path-preserving) added in `netlify.toml`

### Task 2 — Legacy `/shop/*` → 410 Gone
- Copied an on-brand `public/410.html` (noindex, wine/gold palette).
- `netlify.toml`: `/shop/*` **and** bare `/shop` → `410`.
- **Did NOT** mass-301 `/shop/*` to `/signature-cases` (brief forbids it — an old
  individual product ≠ the Signature Cases page; Google treats that as soft-404).
  Couldn't confirm an old shop *index* existed, so everything is 410 (brief's safe default).

### Task 3 — Sitemap + robots
- Sitemap integration already existed; now emits non-www URLs only, no `/shop/`.
- Extra (beyond brief): excluded `case-confirmed/` from the sitemap — it's `noindex`,
  the sibling of the already-excluded `booking-confirmed/`, and was leaking in.

---

## Two deliberate deviations from the brief — please sanity-check these

1. **Redirects live in `netlify.toml`, not `public/_redirects`.**
   Reason: the existing `netlify.toml` has a catch-all `/* → /404.html` (404), and
   **Netlify evaluates `netlify.toml` rules before `_redirects`**. A `_redirects` shop
   rule would be shadowed by that catch-all and return 404 instead of 410. So the 410
   rules go in `netlify.toml`, ordered *before* the catch-all. The brief explicitly
   allowed "juntar às regras existentes". → *Is the ordering/precedence claim correct?*

2. **410 is served via `netlify.toml` redirect, not an Edge Function.**
   The brief said to verify Netlify honors 410 this way and fall back to an Edge Function
   if not. It does honor it — verified live (`/shop/1-2` returns `HTTP/2 410` with the
   branded body). So no Edge Function. → *Agree this is fine?*

---

## Key diff (redirects + config)

```toml
# netlify.toml — added BEFORE the existing "/api/*" rewrites and the catch-all /* → 404
[[redirects]]
from = "https://www.dogmawinebar.com/*"
to = "https://dogmawinebar.com/:splat"
status = 301
force = true

[[redirects]]
from = "/shop/*"
to = "/410.html"
status = 410
force = true

[[redirects]]
from = "/shop"
to = "/410.html"
status = 410
force = true
```

```diff
# astro.config.mjs
-  site: 'https://www.dogmawinebar.com',
+  site: 'https://dogmawinebar.com',
   sitemap filter now also excludes ".../case-confirmed/"

# src/data/site.ts
-  url: "https://www.dogmawinebar.com",
+  url: "https://dogmawinebar.com",
```

---

## Live verification (production, post-deploy) — all ✅

| Check | Expected | Result |
|---|---|---|
| `www/` status + location | 301 → `https://dogmawinebar.com/` | ✅ |
| `non-www/` status | 200 | ✅ |
| homepage `<link rel=canonical>` | non-www | ✅ |
| `/shop/1-2`, `/shop/1-1`, `/shop` | 410 | ✅ (branded body) |
| `www/shop/1-2` | 301 preserves path | ✅ |
| genuine unknown path (`/does-not-exist`) | 404 (NOT 410) | ✅ |
| `sitemap-index.xml` | 200 | ✅ |
| `www.` count in `sitemap-0.xml` | 0 | ✅ |
| `/shop/` count in `sitemap-0.xml` | 0 | ✅ |
| `robots.txt` Sitemap line | non-www | ✅ |

### Re-run it yourself
```bash
curl -sI https://www.dogmawinebar.com/            | grep -iE "HTTP/|location"   # 301 → non-www
curl -sI https://dogmawinebar.com/                | grep -i "HTTP/"             # 200
curl -s  https://dogmawinebar.com/                | grep -i 'rel="canonical"'   # non-www
curl -sI https://dogmawinebar.com/shop/1-2        | grep -i "HTTP/"             # 410
curl -sI https://dogmawinebar.com/shop/1-1        | grep -i "HTTP/"             # 410
curl -sI https://dogmawinebar.com/does-not-exist  | grep -i "HTTP/"             # 404 (not 410)
curl -sI https://dogmawinebar.com/sitemap-index.xml | grep -i "HTTP/"           # 200
curl -s  https://dogmawinebar.com/sitemap-0.xml   | grep -c "www.dogmawinebar.com"  # 0
curl -s  https://dogmawinebar.com/sitemap-0.xml   | grep -c "/shop/"            # 0
curl -s  https://dogmawinebar.com/robots.txt      | grep -i sitemap            # non-www
```

---

## Open items (manual, outside code)
1. **Netlify panel:** confirm Domain management → Primary domain = `dogmawinebar.com`
   (non-www). The code 301 already works, this is belt-and-suspenders.
2. **Search Console:** resubmit `https://dogmawinebar.com/sitemap-index.xml` and click
   "Validate fix" on the 404 report so Google reprocesses `/shop/*` as 410.

## Questions for the reviewer
- Is the `netlify.toml`-before-`_redirects` precedence claim accurate for current Netlify?
- Any risk in bare `/shop` → 410 (vs leaving it to 404)? We have no evidence an index existed.
- Anything else still emitting `www.` anywhere that we missed?
