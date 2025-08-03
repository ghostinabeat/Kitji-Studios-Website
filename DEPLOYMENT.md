# Deployment Guide - Kitji Studios Website

## 🚀 Publishing to GitHub

This guide covers publishing the Kitji Studios website to the GitHub repository at: `https://github.com/ghostinabeat/Kitji-Studios-Website`

## 📋 Pre-Deployment Checklist

### ✅ Repository Setup
- [ ] Clone or initialize the GitHub repository
- [ ] Ensure all project files are committed
- [ ] Create proper branch structure (main/develop)

### ✅ Environment Configuration
- [ ] Set up environment variables in `.env.example`
- [ ] Configure RESEND_API_KEY for email functionality
- [ ] Verify database connections (optional)

### ✅ Build Verification
- [ ] Run `npm run build` to verify production build
- [ ] Test the application in production mode
- [ ] Verify all routes and animations work correctly

## 🔧 Local Development Setup

```bash
# Clone the repository
git clone https://github.com/ghostinabeat/Kitji-Studios-Website.git
cd Kitji-Studios-Website

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env and add your RESEND_API_KEY

# Start development server
npm run dev
```

## 🌐 Deployment Options

### Option 1: Replit Deployment
1. Click the "Deploy" button in Replit
2. Configure environment variables in Replit secrets
3. Your site will be available at `[your-repl-name].replit.app`

### Option 2: Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Option 3: Netlify Deployment
1. Connect GitHub repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Set environment variables in Netlify settings

### Option 4: Traditional VPS/Server
1. Clone repository on server
2. Install Node.js 18+
3. Run `npm install && npm run build`
4. Start with `npm start`
5. Use PM2 or similar for process management

## 🔒 Environment Variables

Required environment variables for production:

```bash
RESEND_API_KEY=your_resend_api_key_here
NODE_ENV=production
PORT=5000
```

Optional (for database features):
```bash
DATABASE_URL=your_postgresql_connection_string
```

## 📦 Build Process

The project uses Vite for frontend building and esbuild for backend bundling:

```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm start

# Type checking
npm run check
```

## 🔍 Pre-Push Commands

Before pushing to GitHub, run these commands to ensure everything works:

```bash
# Type check
npm run check

# Build for production
npm run build

# Test the production build
npm start
```

## 📁 Repository Structure

Ensure these files are included in your GitHub repository:

```
✅ Core Application Files
├── client/                 # Frontend React application
├── server/                 # Backend Express.js application
├── shared/                 # Shared types and schemas
├── docs/                   # Project documentation

✅ Configuration Files
├── package.json            # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── tailwind.config.ts     # Tailwind CSS configuration
├── vite.config.ts         # Vite build configuration
├── drizzle.config.ts      # Database configuration

✅ Documentation
├── README.md              # Project overview and setup
├── CONTRIBUTING.md        # Contribution guidelines
├── LICENSE               # MIT License
├── DEPLOYMENT.md         # This deployment guide
├── .env.example          # Environment variables template

✅ Git Configuration
├── .gitignore            # Git ignore rules
└── .replit              # Replit configuration (optional)
```

## 🚨 Important Notes

1. **Never commit sensitive data**: Use `.env.example` for templates, keep actual `.env` files local
2. **Test before deploying**: Always run the build process locally first
3. **Environment variables**: Set up RESEND_API_KEY for email functionality
4. **Dependencies**: All dependencies are included in package.json and will be installed automatically

## 📞 Support

For deployment issues or questions:
- Check the project README.md
- Review the docs/ directory for detailed documentation
- Open an issue on the GitHub repository