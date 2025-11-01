# 🚀 TrackMySpend Deployment Guide

This guide covers how to deploy TrackMySpend to various platforms.

## 📋 Pre-deployment Checklist

### 1. Environment Setup
- [ ] Set up MongoDB Atlas database
- [ ] Configure environment variables
- [ ] Test local setup
- [ ] Build frontend for production

### 2. Security Checklist
- [ ] Change JWT secret in production
- [ ] Set strong MongoDB credentials
- [ ] Enable CORS for production domains only
- [ ] Set NODE_ENV=production

## 🌐 Deployment Options

### Option 1: Vercel (Frontend) + Railway/Render (Backend)

#### Frontend (Vercel)
1. Push code to GitHub
2. Connect your GitHub repo to Vercel
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Add environment variable: `VITE_API_URL=your-backend-url`

#### Backend (Railway)
1. Connect your GitHub repo to Railway
2. Set root directory to `backend`
3. Add environment variables:
   ```
   MONGO_URI=your-mongodb-connection-string
   JWT_SECRET=your-secure-jwt-secret
   NODE_ENV=production
   PORT=5000
   ```

### Option 2: Netlify (Frontend) + Heroku (Backend)

#### Frontend (Netlify)
1. Build command: `npm run build`
2. Publish directory: `dist`
3. Environment variables:
   ```
   VITE_API_URL=your-backend-url
   ```

#### Backend (Heroku)
1. Create `Procfile` in backend directory:
   ```
   web: node server.js
   ```
2. Set environment variables in Heroku dashboard
3. Deploy from GitHub

### Option 3: VPS/DigitalOcean (Full Stack)

#### Server Setup
```bash
# Install Node.js and PM2
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install -g pm2

# Clone repository
git clone https://github.com/your-username/TrackMySpend.git
cd TrackMySpend

# Install dependencies
npm install
cd backend && npm install && cd ..

# Build frontend
npm run build

# Start with PM2
pm2 start backend/server.js --name "trackmyspend-api"
pm2 start --name "trackmyspend-web" npm -- run preview
pm2 startup
pm2 save
```

## 📧 Environment Variables

### Backend (.env)
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/trackmyspend?retryWrites=true&w=majority
JWT_SECRET=your-super-secure-jwt-secret-at-least-32-characters-long
NODE_ENV=production
PORT=5000
```

### Frontend (.env)
```env
VITE_API_URL=https://your-backend-domain.com
```

## 🔧 Production Optimizations

### Backend
- Enable gzip compression
- Rate limiting
- Request logging
- Error handling middleware
- Health check endpoint

### Frontend
- Code splitting
- Image optimization
- PWA configuration
- CDN for static assets

## 🔍 Monitoring & Maintenance

### Logs
- Set up centralized logging (Sentry, LogRocket)
- Monitor API response times
- Track user analytics

### Database
- Regular backups
- Performance monitoring
- Index optimization

### Security
- Regular dependency updates
- Security headers
- SSL certificates

## 📊 Database Setup (MongoDB Atlas)

1. Create MongoDB Atlas account
2. Create new cluster
3. Add IP address to whitelist (0.0.0.0/0 for development)
4. Create database user
5. Get connection string
6. Update MONGO_URI in environment variables

## 🔄 CI/CD Pipeline (GitHub Actions)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: |
        npm install
        cd backend && npm install
        
    - name: Build frontend
      run: npm run build
      
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 📞 Support

For deployment issues:
1. Check environment variables
2. Verify database connection
3. Check server logs
4. Test API endpoints manually
5. Verify CORS settings

## 🎯 Quick Deploy Commands

### Development (both frontend and backend)
```bash
npm run dev:full
```

### Production Build
```bash
npm run build
npm run start:full
```

### Backend Only
```bash
cd backend
npm run dev    # Development
npm start      # Production
```