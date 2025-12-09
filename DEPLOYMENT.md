# 🚀 Deployment Checklist

## Pre-Deployment ✅

- [x] All images loading correctly
- [x] Resume download working
- [x] Social media links updated
- [x] Contact form linked to Google Form
- [x] Build completes successfully
- [x] No console errors
- [x] All sections displaying correctly
- [x] Responsive design verified

## Files Created for Deployment ✅

- [x] `public/_redirects` - Netlify routing configuration
- [x] `netlify.toml` - Netlify build and deployment settings
- [x] `vercel.json` - Vercel deployment configuration
- [x] `README.md` - Complete documentation

## Deployment Steps

### Option 1: Netlify (Recommended)

1. **Initialize Git Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Portfolio website"
   ```

2. **Create GitHub Repository**
   - Go to https://github.com/new
   - Repository name: `portfolio`
   - Make it public
   - Don't initialize with README (already exists)

3. **Push to GitHub**
   ```bash
   git remote add origin https://github.com/tamangsuraj/portfolio.git
   git branch -M main
   git push -u origin main
   ```

4. **Deploy on Netlify**
   - Sign up at https://netlify.com
   - Click "Add new site" → "Import an existing project"
   - Choose GitHub and authorize
   - Select your `portfolio` repository
   - Build settings (auto-detected from netlify.toml):
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Click "Deploy site"

5. **Add Custom Domain**
   - In Netlify dashboard, go to Site settings → Domain management
   - Click "Add custom domain"
   - Enter: `www.suraj-tamang.com.np`
   - Netlify will provide DNS records

6. **Update DNS at Your Domain Registrar**
   ```
   Type: CNAME
   Name: www
   Value: [your-site-name].netlify.app
   
   Type: A
   Name: @
   Value: 75.2.60.5
   ```

7. **Enable HTTPS**
   - Netlify automatically provisions SSL certificate
   - Wait 24-48 hours for DNS propagation

### Option 2: Vercel

1. Follow steps 1-3 from Netlify (Git setup)
2. Go to https://vercel.com
3. Click "Import Project"
4. Select your GitHub repository
5. Deploy (auto-detects settings from vercel.json)
6. Add custom domain in project settings

## Post-Deployment Verification

- [ ] Visit your deployed site
- [ ] Test all navigation links
- [ ] Test social media links
- [ ] Test "Let's Talk" button (Google Form)
- [ ] Test "Download CV" button
- [ ] Check mobile responsiveness
- [ ] Verify all images load
- [ ] Test on different browsers (Chrome, Firefox, Safari)
- [ ] Check page load speed
- [ ] Verify custom domain works

## Troubleshooting

### Build Fails
```bash
# Clear cache and reinstall
rm -rf node_modules dist
npm install
npm run build
```

### 404 on Page Refresh
- Ensure `_redirects` file exists in `public/` folder
- For Netlify: Check `netlify.toml` is in root
- For Vercel: Check `vercel.json` is in root

### Images Not Loading
- Verify images are in `public/` or `src/assets/`
- Check image paths in components
- Rebuild and redeploy

### Resume Not Downloading
- Ensure `Resume.pdf` exists in `public/` folder
- Check file name matches exactly (case-sensitive)

## Performance Optimization (Already Implemented)

- ✅ Vite build optimization
- ✅ Asset caching headers
- ✅ Image optimization
- ✅ Code splitting
- ✅ Lazy loading where applicable

## Security (Already Implemented)

- ✅ Security headers in netlify.toml
- ✅ XSS protection
- ✅ Content type sniffing prevention
- ✅ Frame options set
- ✅ HTTPS enforced (by hosting platform)

## Next Steps After Deployment

1. Monitor site performance with Lighthouse
2. Set up Google Analytics (optional)
3. Submit sitemap to Google Search Console
4. Share your portfolio on LinkedIn
5. Add portfolio link to GitHub profile

## Support

If you encounter any issues:
1. Check the browser console for errors
2. Review the build logs on Netlify/Vercel
3. Verify all configuration files are correct
4. Ensure DNS records are properly set

---

**Your portfolio is ready to deploy! 🎉**

Choose your preferred hosting platform and follow the steps above.
