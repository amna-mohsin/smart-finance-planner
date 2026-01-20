# Deployment Guide

## Vercel Deployment (Recommended)

### Prerequisites
- GitHub account with the repository pushed
- Vercel account (free tier available)

### Steps

1. **Push to GitHub** (if not already done)
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Select your `smart-finance-planner` repository
   - Click "Import"

3. **Configure Project**
   - Framework: Vite (auto-detected)
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install --legacy-peer-deps`
   - Environment Variables: (none required for basic setup)

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Visit your live URL

### Build Configuration
The following files ensure proper Vercel deployment:
- `vercel.json` - Vercel-specific configuration
- `.vercelignore` - Files to exclude from deployment
- `.npmrc` - NPM configuration with legacy-peer-deps
- `vite.config.js` - Vite build optimization

## Troubleshooting

### Build Fails with "terser not found"
**Fixed** by adding `.npmrc` with `legacy-peer-deps=true`

### Lucide-react peer dependency warning
This is expected as lucide-react v0.294.0 supports React 16-18, but the app uses React 19. The app works fine due to React 19's backward compatibility. This is handled by the `.npmrc` configuration.

### Large chunk size warnings
The vite.config.js includes chunk optimization:
- `react-vendor` chunk: React + React Router
- `recharts` chunk: Charts library
- Main bundle: Application code

This keeps chunks under 500KB after gzip, improving load times.

## Local Development

```bash
# Install dependencies with legacy peer deps
npm install --legacy-peer-deps

# Start development server (port 5174)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Environment Variables

Currently, no environment variables are required. The app stores all data in localStorage.

For future API integration, add to `.env.local`:
```
VITE_API_URL=https://your-api.com
```

## Performance Optimization

The build is optimized for:
- ✅ Code splitting (3 chunks)
- ✅ Tree shaking
- ✅ CSS minification
- ✅ JS minification with Terser
- ✅ Gzip compression

### Bundle Sizes (Gzipped)
- HTML: 0.34 kB
- CSS: 32.94 kB
- React Vendor: 16.08 kB
- Recharts: 106.16 kB
- Main JS: 65.46 kB
- **Total: ~220 kB**

## Hosting Alternatives

### Netlify
```bash
npm run build
# Connect dist folder to Netlify
```

### GitHub Pages
```bash
npm run build
# Deploy dist folder to gh-pages branch
```

### Self-Hosted
```bash
npm run build
# Serve dist folder with your web server
# Example: `python -m http.server` or nginx
```

## Domain Configuration

After deployment, configure custom domain in Vercel:
1. Go to Project Settings
2. Click "Domains"
3. Add your domain
4. Configure DNS settings according to Vercel instructions

## SSL Certificate

Vercel automatically provides free SSL certificates via Let's Encrypt.

## Monitoring & Analytics

Vercel provides:
- Build logs and history
- Deployment statistics
- Function logs (if using serverless functions)
- Real-time traffic analytics

---

**Happy Deploying! 🚀**
