# Suraj Tamang - Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and Vite, showcasing DevOps engineering expertise and cloud automation projects.

## 🚀 Features

- ✨ Modern UI with smooth animations (Framer Motion)
- 📱 Fully responsive design
- 🎨 Beautiful gradient effects and glassmorphism
- 📊 Project showcase with filtering
- 📝 Blog section
- 💼 Experience timeline
- 🛠️ Skills visualization
- 📧 Contact form integration
- ⚡ Fast performance with Vite

## 🛠️ Tech Stack

- **Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router DOM

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 Deployment

### Deploy to Netlify (Recommended)

1. **Push to GitHub**:
```bash
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/tamangsuraj/portfolio.git
git push -u origin main
```

2. **Deploy on Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository
   - Build settings are auto-detected from `netlify.toml`
   - Click "Deploy site"

3. **Add Custom Domain**:
   - Go to Site settings → Domain management
   - Add custom domain: `www.suraj-tamang.com.np`
   - Update DNS records at your domain registrar:
     ```
     Type: CNAME
     Name: www
     Value: [your-site].netlify.app
     ```

### Deploy to Vercel (Alternative)

1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Deploy (auto-detects Vite settings from `vercel.json`)
4. Add custom domain in project settings

## 📁 Project Structure

```
├── public/              # Static assets
│   ├── Resume.pdf      # Downloadable resume
│   └── _redirects      # Netlify routing config
├── src/
│   ├── assets/         # Images and media
│   ├── components/     # React components
│   │   ├── ui/        # Reusable UI components
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── PortfolioSection.tsx
│   │   └── ...
│   ├── App.tsx        # Main app component
│   └── main.tsx       # Entry point
├── netlify.toml       # Netlify configuration
├── vercel.json        # Vercel configuration
└── vite.config.ts     # Vite configuration
```

## 🔧 Configuration

### Environment Variables

No environment variables required for basic deployment.

### Build Configuration

- **Build Command**: `npm run build`
- **Publish Directory**: `dist`
- **Node Version**: 18+

## 📝 Customization

### Update Personal Information

1. **Social Links**: Edit `src/components/HeroSection.tsx` and `src/components/Footer.tsx`
2. **Projects**: Edit `src/components/PortfolioSection.tsx`
3. **Experience**: Edit `src/components/ExperienceSection.tsx`
4. **Skills**: Edit `src/components/SkillsSection.tsx`
5. **Resume**: Replace `public/Resume.pdf` with your resume

### Update Styling

- **Colors**: Edit `tailwind.config.ts`
- **Fonts**: Update Google Fonts link in `index.html`
- **Global Styles**: Edit `src/index.css`

## 🐛 Troubleshooting

### Build Errors

If you encounter build errors:
```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

### Routing Issues

The `_redirects` file ensures client-side routing works correctly on Netlify. For other platforms, check their respective configuration files.

## 📄 License

This project is open source and available for personal use.

## 👤 Author

**Suraj Tamang**
- GitHub: [@tamangsuraj](https://github.com/tamangsuraj)
- LinkedIn: [surajtamang10](https://www.linkedin.com/in/surajtamang10/)
- Website: [www.suraj-tamang.com.np](https://www.suraj-tamang.com.np)

## 🙏 Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Animations with [Framer Motion](https://www.framer.com/motion/)
