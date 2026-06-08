# 🚀 Deployment Guide - Dogma Wine Bar Site

## Quick Deploy to Netlify (Recommended)

### Step 1: Connect GitHub to Netlify
1. Go to [netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Choose GitHub, authorize, select `somm-dogma/dogma-wine-bar-site`

### Step 2: Configure Build
Netlify should auto-detect the build settings:
- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Node version:** 24.16.0 (set in netlify.toml)

### Step 3: Deploy
- Click "Deploy site"
- Wait for build to complete (~2-3 min)
- You'll get a temporary URL like: `https://[random-name].netlify.app`

### Step 4: Test Everything
- ✓ Homepage loads
- ✓ All navigation links work
- ✓ Forms submit (check Netlify form submissions)
- ✓ Responsive on mobile
- ✓ Images load correctly

### Step 5: Connect Custom Domain (After Sign-off)
1. Go to Site Settings → Domain Management
2. Add custom domain: `dogmawinebar.com`
3. Update DNS records at your domain registrar
4. SSL certificate auto-generates (free)

---

## Alternative: Deploy via CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to your account
netlify login

# Deploy
netlify deploy --prod --dir=dist
```

---

## Environment Variables (if needed later)
Add in Netlify Site Settings → Build & Deploy → Environment

Currently no env vars needed, but you can add:
- Analytics IDs
- API keys
- Contact form webhook URLs

---

## Form Submissions
Contact form is set up for Netlify Forms:
- Netlify captures submissions automatically
- View at Site Settings → Forms
- You can configure email notifications

---

## Rollback if Issues
1. Go to Deployments
2. Click on previous version
3. Click "Publish deploy"

---

## Domain Cutover Checklist
- [ ] Test site on temp URL (all pages, forms, links)
- [ ] Get client sign-off
- [ ] Update DNS records
- [ ] Monitor for 24 hours
- [ ] Keep old Tilda site as backup for 30 days

---

**Current Status:** Ready for deployment ✓
**GitHub:** https://github.com/somm-dogma/dogma-wine-bar-site
**Build:** 7 pages, fully responsive
**Form:** Netlify Forms integration ready
