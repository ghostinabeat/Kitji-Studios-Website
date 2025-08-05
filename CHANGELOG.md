# Changelog

All notable changes to the Kitji Studios website will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2024-01-15 - Hybrid Architecture Release

### Added
- **ASP.NET Core Backend**: Complete replacement of Express.js with C# backend
- **Entity Framework Integration**: In-memory database with production-ready SQL Server/PostgreSQL support
- **Professional Email Templates**: HTML email templates with company branding
- **Enhanced API Documentation**: Comprehensive OpenAPI/Swagger documentation
- **FluentValidation**: Enterprise-grade server-side validation
- **Structured Logging**: Serilog integration with JSON output
- **Health Check Endpoints**: API monitoring and diagnostics
- **CORS Configuration**: Proper cross-origin setup for React frontend
- **Comprehensive Documentation**: Architecture diagrams and workflow documentation

### Changed
- **API Integration**: Enhanced React HTTP client with ASP.NET Core support
- **Error Handling**: Improved error responses and user feedback
- **Validation**: Synchronized validation between React frontend and ASP.NET backend
- **Email Service**: Upgraded to SendGrid .NET SDK with Resend compatibility
- **Project Structure**: Added Server.NET directory for C# backend
- **Type Safety**: Full TypeScript interfaces matching C# DTOs

### Improved
- **Performance**: Optimized database queries and response caching
- **Security**: Enhanced input validation and SQL injection prevention
- **Maintainability**: Clean architecture with dependency injection
- **Developer Experience**: Better error messages and debugging tools

### Technical Details
- React 18 + TypeScript frontend (unchanged)
- ASP.NET Core 8.0 + Entity Framework Core backend (new)
- SendGrid email integration with professional templates
- Comprehensive workflow diagrams and component documentation
- Production-ready configuration with environment variable support

## [1.0.0] - 2024-01-01 - Initial React Release

### Added
- **React Frontend**: Modern React 18 application with TypeScript
- **Dark Theme Design**: Professional black/blue color scheme throughout
- **Responsive Layout**: Mobile-first approach with Tailwind CSS
- **Smooth Animations**: Scroll-based transitions using Framer Motion
- **Contact Form**: Functional contact form with client-side validation
- **Multi-Page Structure**: Home, About, and Not Found pages
- **Navigation System**: Responsive navigation with mobile hamburger menu
- **Interactive Elements**: Clickable hero tiles and hover effects
- **Express.js Backend**: Node.js server with TypeScript
- **Email Integration**: Resend email service for contact form submissions
- **Form Validation**: Zod schema validation with React Hook Form
- **State Management**: TanStack Query for server state management

### Technical Stack
- Frontend: React 18, TypeScript, Vite, TailwindCSS, Framer Motion
- Backend: Express.js, TypeScript, Zod validation
- UI Components: shadcn/ui with Radix UI primitives
- Routing: Wouter for client-side navigation
- Email: Resend service integration
- Build: Vite with optimized production builds

### Features
- **Hero Section**: Animated hero with interactive service tiles
- **Contact Form**: Real-time validation with success/error feedback
- **Accessibility**: ARIA labels and keyboard navigation support
- **SEO Ready**: Proper meta tags and semantic HTML structure
- **Performance**: Optimized bundles and lazy loading
- **Development**: Hot module replacement and TypeScript checking

---

## Version History Summary

- **v2.0.0**: Hybrid Architecture (React + ASP.NET Core)
- **v1.0.0**: Initial Release (React + Express.js)

## Migration Guide

### From v1.x to v2.x

The frontend remains unchanged, but the backend has been completely rewritten in C#:

1. **Environment Variables**: Update `.env` file with new ASP.NET Core configuration
2. **API Endpoints**: All endpoints remain the same (`/api/contact`, etc.)
3. **Email Configuration**: Now supports both SendGrid and Resend
4. **Database**: Switch from in-memory storage to Entity Framework
5. **Development**: Run both React dev server and ASP.NET Core API

### Breaking Changes
- None for frontend React components
- Backend Express.js server replaced with ASP.NET Core
- Environment variable names updated for consistency

### New Features Available
- Professional email templates
- Enhanced error handling and validation
- Comprehensive API documentation
- Health check endpoints
- Structured logging and monitoring
- Production-ready database support

For detailed migration instructions, see [README.md](README.md#development-setup).