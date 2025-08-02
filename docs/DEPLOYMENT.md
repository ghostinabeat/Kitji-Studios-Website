# Deployment Guide

## 🚀 Deployment Overview

This guide covers deploying the Kitji Studios website to various hosting platforms. The application is designed to work seamlessly with modern hosting services that support Node.js applications.

## 🏗 Build Process

### Production Build
```bash
# Install dependencies
npm install

# Build frontend and backend
npm run build

# Output:
# - dist/public/    # Frontend static files
# - dist/index.js   # Backend server bundle
```

### Build Configuration
The build process uses:
- **Frontend**: Vite for optimized React build
- **Backend**: esbuild for fast TypeScript compilation
- **Assets**: Static files optimized and minified
- **TypeScript**: Compiled to ES modules for Node.js

---

## ☁️ Vercel Deployment (Recommended)

### Automatic Deployment
1. **Connect Repository**
   - Push code to GitHub
   - Connect repository to Vercel
   - Automatic deployments on push to main

2. **Configuration**
   Create `vercel.json`:
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "server/index.ts",
         "use": "@vercel/node"
       },
       {
         "src": "package.json",
         "use": "@vercel/static-build",
         "config": {
           "distDir": "dist/public"
         }
       }
     ],
     "routes": [
       {
         "src": "/api/(.*)",
         "dest": "/server/index.ts"
       },
       {
         "src": "/(.*)",
         "dest": "/dist/public/$1"
       }
     ]
   }
   ```

3. **Environment Variables**
   Set in Vercel dashboard:
   ```env
   RESEND_API_KEY=your_production_api_key
   NODE_ENV=production
   ```

### Manual Deployment
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Set environment variables
vercel env add RESEND_API_KEY
```

---

## 🌐 Netlify Deployment

### Netlify Configuration
Create `netlify.toml`:
```toml
[build]
  publish = "dist/public"
  command = "npm run build"
  functions = "dist/functions"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/api/:splat"
  status = 200

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Netlify Functions Setup
Create `src/functions/api.ts`:
```typescript
import { Handler } from '@netlify/functions';
import express from 'express';
import serverless from 'serverless-http';
import { app } from '../../server/index.js';

const handler: Handler = serverless(app);
export { handler };
```

---

## 🐳 Docker Deployment

### Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Build application
RUN npm run build

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:5000/api/health || exit 1

# Start application
CMD ["npm", "start"]
```

### Docker Compose
```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - RESEND_API_KEY=${RESEND_API_KEY}
    restart: unless-stopped
    
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - app
    restart: unless-stopped
```

### Building and Running
```bash
# Build image
docker build -t kitji-studios .

# Run container
docker run -p 5000:5000 \
  -e RESEND_API_KEY=your_api_key \
  kitji-studios
```

---

## ☁️ AWS Deployment

### AWS Lambda + API Gateway
1. **Install AWS SAM CLI**
2. **Create SAM Template** (`template.yaml`):
   ```yaml
   AWSTemplateFormatVersion: '2010-09-09'
   Transform: AWS::Serverless-2016-10-31
   
   Resources:
     KitjiStudiosApi:
       Type: AWS::Serverless::Function
       Properties:
         CodeUri: dist/
         Handler: index.handler
         Runtime: nodejs18.x
         Environment:
           Variables:
             RESEND_API_KEY: !Ref ResendApiKey
         Events:
           Api:
             Type: Api
             Properties:
               Path: /{proxy+}
               Method: ANY
   
   Parameters:
     ResendApiKey:
       Type: String
       NoEcho: true
   ```

3. **Deploy**:
   ```bash
   sam build
   sam deploy --guided
   ```

### AWS EC2 Deployment
1. **Launch EC2 Instance** (Ubuntu 20.04 LTS)
2. **Install Dependencies**:
   ```bash
   sudo apt update
   sudo apt install nodejs npm nginx
   ```

3. **Deploy Application**:
   ```bash
   # Clone repository
   git clone https://github.com/kitji-studios/website.git
   cd website
   
   # Install and build
   npm install
   npm run build
   
   # Install PM2 for process management
   npm install -g pm2
   
   # Start application
   pm2 start dist/index.js --name "kitji-studios"
   pm2 startup
   pm2 save
   ```

4. **Configure Nginx**:
   ```nginx
   server {
       listen 80;
       server_name kitjistudios.com www.kitjistudios.com;
       
       location /api {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
       
       location / {
           root /var/www/kitji-studios/dist/public;
           try_files $uri $uri/ /index.html;
       }
   }
   ```

---

## 🗄 Database Deployment

### PostgreSQL Setup
If using database features:

1. **Development** (Local):
   ```bash
   # Install PostgreSQL
   brew install postgresql  # macOS
   sudo apt install postgresql  # Ubuntu
   
   # Create database
   createdb kitji_studios
   
   # Set environment variable
   DATABASE_URL=postgresql://username:password@localhost:5432/kitji_studios
   ```

2. **Production** (Neon/Supabase):
   ```bash
   # Get connection string from provider
   DATABASE_URL=postgresql://username:password@host:5432/database
   
   # Run migrations
   npm run db:push
   ```

### Database Migration
```bash
# Generate migration
npx drizzle-kit generate:pg

# Apply migration
npx drizzle-kit push:pg
```

---

## 🔧 Environment Configuration

### Environment Variables by Stage

**Development**:
```env
NODE_ENV=development
RESEND_API_KEY=test_api_key
DATABASE_URL=postgresql://localhost:5432/kitji_dev
```

**Staging**:
```env
NODE_ENV=staging
RESEND_API_KEY=staging_api_key
DATABASE_URL=postgresql://staging-host:5432/kitji_staging
```

**Production**:
```env
NODE_ENV=production
RESEND_API_KEY=production_api_key
DATABASE_URL=postgresql://production-host:5432/kitji_production
```

### Secrets Management
- **Vercel**: Use Vercel dashboard
- **Netlify**: Use Netlify environment variables
- **AWS**: Use AWS Systems Manager Parameter Store
- **Docker**: Use Docker secrets or environment files

---

## 🔍 Health Checks

### Application Health
The application provides health check endpoints:
```bash
# Check API health
curl https://kitjistudios.com/api/health

# Expected response:
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Monitoring Setup
1. **Uptime Monitoring**:
   - UptimeRobot
   - Pingdom
   - StatusPage

2. **Error Tracking**:
   - Sentry
   - LogRocket
   - Rollbar

3. **Performance Monitoring**:
   - New Relic
   - DataDog
   - Application Insights

---

## 🚀 CI/CD Pipeline

### GitHub Actions
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run check
      - run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: vercel/action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

### Deployment Checklist
- [ ] Environment variables configured
- [ ] DNS records pointing to deployment
- [ ] SSL certificate installed
- [ ] Health checks passing
- [ ] Error monitoring configured
- [ ] Performance monitoring active
- [ ] Backup strategy implemented

---

## 🔒 Security Considerations

### Production Security
1. **HTTPS Enforcement**:
   ```javascript
   app.use((req, res, next) => {
     if (req.header('x-forwarded-proto') !== 'https') {
       res.redirect(`https://${req.header('host')}${req.url}`);
     } else {
       next();
     }
   });
   ```

2. **Security Headers**:
   ```javascript
   app.use(helmet({
     contentSecurityPolicy: {
       directives: {
         defaultSrc: ["'self'"],
         styleSrc: ["'self'", "'unsafe-inline'"],
         scriptSrc: ["'self'"],
         imgSrc: ["'self'", "data:", "https:"],
       },
     },
   }));
   ```

3. **Rate Limiting**:
   ```javascript
   const rateLimit = require('express-rate-limit');
   app.use('/api/', rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 100 // limit each IP to 100 requests per windowMs
   }));
   ```

### API Security
- Input validation with Zod
- CORS configuration
- Request sanitization
- Error message sanitization

---

## 🐛 Troubleshooting

### Common Issues

**Build Failures**:
```bash
# Clear cache and rebuild
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Environment Variables Not Loading**:
```bash
# Check environment variable names
echo $RESEND_API_KEY

# Verify .env file location
ls -la .env*
```

**Port Conflicts**:
```bash
# Check what's using port 5000
lsof -i :5000

# Kill process
kill -9 $(lsof -t -i :5000)
```

**Database Connection Issues**:
```bash
# Test database connection
psql $DATABASE_URL

# Check connection string format
echo $DATABASE_URL
```

### Logs and Debugging
```bash
# View application logs
pm2 logs kitji-studios

# View system logs
sudo journalctl -u nginx

# Monitor in real-time
tail -f /var/log/nginx/access.log
```

This deployment guide provides comprehensive instructions for deploying the Kitji Studios website to various hosting platforms and environments.