# Frontend Deployment Guide - lekha.ai

This guide covers deploying the lekha.ai frontend to various static hosting platforms.

## 🚀 Quick Deployment Options

### 1. Netlify (Recommended)

#### Option A: Drag & Drop
1. Visit [netlify.com](https://netlify.com)
2. Drag the entire frontend folder to the deploy area
3. Your site will be live instantly!

#### Option B: Git Integration
1. Connect your GitHub repository
2. Set build settings:
   - Build command: `echo "No build needed"`
   - Publish directory: `.` (root)
3. Deploy automatically on every push

### 2. Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Or connect via GitHub:
1. Visit [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Deploy with default settings

### 3. GitHub Pages

1. Go to repository settings
2. Navigate to "Pages" section
3. Select source: "Deploy from a branch"
4. Choose branch: `main`
5. Folder: `/ (root)`
6. Save and wait for deployment

Your site will be available at:
`https://jay192005.github.io/agreement-front-end-/`

### 4. Firebase Hosting

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login and initialize
firebase login
firebase init hosting

# Deploy
firebase deploy
```

### 5. AWS S3 + CloudFront

```bash
# Create S3 bucket
aws s3 mb s3://lekha-ai-frontend

# Upload files
aws s3 sync . s3://lekha-ai-frontend --delete

# Enable static website hosting
aws s3 website s3://lekha-ai-frontend --index-document index.html
```

## 🔧 Configuration for Production

### API Endpoint Configuration

Before deploying, update the API endpoints in your JavaScript files:

```javascript
// In script.js, analyzer.js, history.js
// Change from:
const API_BASE_URL = 'http://localhost:5000';

// To your production backend URL:
const API_BASE_URL = 'https://your-backend-domain.com';
```

### Environment-Specific Configuration

Create different versions for different environments:

```javascript
// config.js
const config = {
  development: {
    API_BASE_URL: 'http://localhost:5000'
  },
  production: {
    API_BASE_URL: 'https://api.lekha.ai'
  }
};

const currentConfig = config[window.location.hostname === 'localhost' ? 'development' : 'production'];
```

## 🌐 Custom Domain Setup

### Netlify Custom Domain
1. Go to Site settings > Domain management
2. Add custom domain
3. Configure DNS records as instructed

### Vercel Custom Domain
1. Go to Project settings > Domains
2. Add your domain
3. Configure DNS records

### GitHub Pages Custom Domain
1. Add `CNAME` file with your domain
2. Configure DNS records:
   ```
   CNAME: your-domain.com -> jay192005.github.io
   ```

## 🔒 Security Configuration

### HTTPS Setup
All modern hosting platforms provide HTTPS by default. Ensure:
- Force HTTPS redirects are enabled
- HSTS headers are configured
- Mixed content warnings are resolved

### Content Security Policy
Add CSP headers for enhanced security:

```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  connect-src 'self' https://your-api-domain.com;
">
```

### CORS Configuration
Ensure your backend API allows requests from your frontend domain:

```python
# In your Flask backend
CORS(app, origins=[
    "https://your-frontend-domain.com",
    "https://lekha-ai.netlify.app"  # Example
])
```

## 📊 Performance Optimization

### File Optimization
```bash
# Minify CSS (optional)
npm install -g clean-css-cli
cleancss -o style.min.css style.css

# Minify JavaScript (optional)
npm install -g uglify-js
uglifyjs script.js -o script.min.js
```

### Caching Headers
Configure caching for static assets:

```
# Netlify (_headers file)
/*
  Cache-Control: public, max-age=31536000

/*.html
  Cache-Control: public, max-age=0, must-revalidate

/*.css
  Cache-Control: public, max-age=31536000

/*.js
  Cache-Control: public, max-age=31536000
```

## 🧪 Testing Deployment

### Pre-deployment Checklist
- [ ] All API endpoints updated for production
- [ ] HTTPS enforced
- [ ] Custom domain configured (if applicable)
- [ ] CORS configured on backend
- [ ] Error pages configured
- [ ] Analytics tracking added (if needed)

### Post-deployment Testing
1. **Functionality Testing**
   - User registration/login
   - File upload
   - Document analysis
   - History viewing

2. **Performance Testing**
   - Page load speed
   - Mobile responsiveness
   - Cross-browser compatibility

3. **Security Testing**
   - HTTPS enforcement
   - Content Security Policy
   - No mixed content warnings

## 📱 Mobile Optimization

### Progressive Web App (PWA)
Add PWA capabilities:

```html
<!-- In index.html -->
<link rel="manifest" href="manifest.json">
<meta name="theme-color" content="#2c3e50">
```

```json
// manifest.json
{
  "name": "lekha.ai - Rent Agreement Analyzer",
  "short_name": "lekha.ai",
  "description": "AI-powered rent agreement analysis",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#2c3e50",
  "icons": [
    {
      "src": "icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}
```

## 🔍 Monitoring & Analytics

### Google Analytics
```html
<!-- Add to all HTML files -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Error Monitoring
Consider adding error tracking:
- Sentry for JavaScript error tracking
- LogRocket for user session recording
- Hotjar for user behavior analytics

## 🚨 Troubleshooting

### Common Issues

1. **API Calls Failing**
   - Check CORS configuration
   - Verify API endpoint URLs
   - Check network connectivity

2. **Files Not Loading**
   - Verify file paths are correct
   - Check for case sensitivity issues
   - Ensure all files are uploaded

3. **Mobile Issues**
   - Test viewport meta tag
   - Check responsive CSS
   - Verify touch interactions

### Debug Tools
- Browser Developer Tools
- Lighthouse for performance auditing
- WebPageTest for detailed analysis

## 📞 Support

For deployment issues:
- Check the troubleshooting section above
- Review hosting platform documentation
- Create an issue on GitHub
- Contact support team

---

**Happy Deploying! 🚀**

Your lekha.ai frontend is now ready to serve users worldwide!