# GitHub Pages Deployment Guide

## ✅ Configuration Complete

Your project is now correctly configured for GitHub Pages with custom domain deployment.

## 📋 What Was Fixed

### 1. **Vite Base Path**
- **Before**: `base: "/Portfolio"` ❌ (for github.io/Portfolio URLs)
- **After**: `base: "/"` ✅ (for custom domain www.suraj-tamang.com.np)

### 2. **GitHub Actions Deployment**
- Created `.github/workflows/deploy.yml`
- Auto-deploys on every push to `main`
- Only deploys the `dist` folder (no source files)

### 3. **SPA Routing Support**
- Added `404.html` for deep route handling
- Added routing script to `index.html`
- Deep links will work on refresh

### 4. **CNAME for Custom Domain**
- CNAME file moved to `public/` folder
- Auto-copied to `dist/` during build

---

## 🚀 Deployment Steps

### **Step 1: Enable GitHub Pages with GitHub Actions**

1. Go to your GitHub repository: `https://github.com/tamangsura/Portfolio`
2. Click **Settings** → **Pages** (left sidebar)
3. Under **Build and deployment**:
   - **Source**: Select **GitHub Actions** (NOT "Deploy from a branch")
4. Keep **Custom domain** set to: `www.suraj-tamang.com.np`
5. ✅ Check **Enforce HTTPS**

### **Step 2: Commit and Push Changes**

```bash
git add .
git commit -m "fix: configure GitHub Pages deployment with correct base path"
git push origin main
```

### **Step 3: Monitor Deployment**

1. Go to **Actions** tab in your repository
2. Watch the "Deploy to GitHub Pages" workflow run
3. Wait for green checkmark (✅) - usually takes 1-2 minutes
4. Your site will be live at: `https://www.suraj-tamang.com.np`

---

## ✅ Verification Checklist

After deployment, test your site:

### **1. Open Developer Tools (F12) → Network Tab**

Test these URLs:
- `https://www.suraj-tamang.com.np/`
- `https://www.suraj-tamang.com.np/about` (or any route)

#### ✅ Verify:
- [ ] **JS files** (`/assets/index-*.js`):
  - Status: `200 OK`
  - Content-Type: `application/javascript` or `text/javascript`
  - ⚠️ **NOT** `text/html` or `application/octet-stream`

- [ ] **CSS files** (`/assets/index-*.css`):
  - Status: `200 OK`
  - Content-Type: `text/css`
  - ⚠️ **NOT** `text/html`

- [ ] **No 404 errors** for assets
- [ ] **No `.tsx` or `/src/` files** in Network tab

### **2. Console Tab**
- [ ] No errors about "MIME type mismatch"
- [ ] No errors about "Failed to load module script"
- [ ] No white screen

### **3. Routing Test**
- [ ] Navigate to a route (e.g., `/about`)
- [ ] Press **Ctrl+R** (hard refresh)
- [ ] Page should load correctly (NOT 404)

---

## 🔧 Troubleshooting

### **Issue: Still seeing `/Portfolio/assets/*` paths**
**Fix**: Make sure you rebuilt after changing `vite.config.ts`:
```bash
npm run build
git add dist
git commit -m "rebuild with correct base path"
git push
```

### **Issue: "GitHub Actions" not available in Pages settings**
**Fix**: 
1. Go to **Settings** → **Actions** → **General**
2. Scroll to **Workflow permissions**
3. Select **Read and write permissions**
4. ✅ Check **Allow GitHub Actions to create and approve pull requests**
5. Click **Save**
6. Return to **Settings** → **Pages** and select **GitHub Actions**

### **Issue: Custom domain shows "404 not found"**
**Fix**:
1. Check DNS settings for `www.suraj-tamang.com.np`:
   - Should have a `CNAME` record pointing to `tamangsura.github.io`
2. Wait up to 48 hours for DNS propagation
3. Verify CNAME file in `dist/` contains: `www.suraj-tamang.com.np`

### **Issue: Routes return 404 on refresh**
**Fix**: Ensure `404.html` is in `dist/` folder (already configured)

---

## 📁 Files Modified

- ✅ `vite.config.ts` - Changed `base` to `/`
- ✅ `.github/workflows/deploy.yml` - Created GitHub Actions workflow
- ✅ `index.html` - Added SPA routing script
- ✅ `public/404.html` - Created SPA fallback
- ✅ `public/CNAME` - Copied for build process

---

## 🎯 How It Works

### **Build Process:**
1. `npm run build` compiles React/TypeScript to vanilla JS
2. Output goes to `dist/` folder:
   - `dist/index.html`
   - `dist/assets/index-[hash].js`
   - `dist/assets/index-[hash].css`
   - `dist/CNAME`
   - `dist/404.html`

### **Deployment Process:**
1. Push to `main` branch triggers GitHub Actions
2. GitHub Actions:
   - Installs dependencies (`npm ci`)
   - Builds project (`npm run build`)
   - Uploads **only** `dist/` folder to GitHub Pages
   - Deploys to your custom domain

### **Why It Works Now:**
- ✅ `base: "/"` → Assets load from `www.suraj-tamang.com.np/assets/*`
- ✅ Only `dist/` deployed → No source files served
- ✅ Correct MIME types → Browser accepts JS/CSS
- ✅ 404.html → Deep routes work on refresh

---

## 🚫 Common Mistakes (Avoided)

❌ **Using `base: "/Portfolio"` with custom domain**
   - This would create paths like `www.suraj-tamang.com.np/Portfolio/assets/*`
   - Custom domains serve from root, not from `/Portfolio/`

❌ **Deploying from `main` branch root**
   - Would serve source files instead of compiled `dist/`
   - Browser can't execute `.tsx` files

❌ **Using `gh-pages` package with GitHub Actions**
   - Unnecessary - GitHub Actions handles deployment
   - Can cause conflicts

---

## 📚 Alternative: Manual Deployment (Not Recommended)

If you prefer manual deployment instead of GitHub Actions:

```bash
# Build the project
npm run build

# Deploy using gh-pages (already installed)
npm run deploy
```

Then in **Settings** → **Pages**:
- **Source**: Deploy from branch
- **Branch**: `gh-pages`
- **Folder**: `/` (root)

⚠️ **Note**: GitHub Actions (recommended) is more reliable and automatic.

---

## ✅ Summary

Your site will now:
- ✅ Load correctly on `www.suraj-tamang.com.np`
- ✅ Serve JS as `application/javascript` (not HTML)
- ✅ Serve CSS as `text/css` (not HTML)
- ✅ Work on hard refresh for all routes
- ✅ Auto-deploy on every push to `main`
- ✅ Zero MIME type errors
- ✅ Zero white screen issues

**Next step**: Push your changes and watch the Actions deployment! 🚀

