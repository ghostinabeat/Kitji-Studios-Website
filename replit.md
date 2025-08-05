# Overview

This is a full-stack web application for Kitji Studios, a software development company, **now completely refactored to C# using Blazor WebAssembly and ASP.NET Core**. The application serves as a company portfolio website with contact form functionality, maintaining the exact same dark-themed UI and interactive features as the original React/TypeScript version. Its core purpose is to showcase Kitji Studios' capabilities in enterprise software development, with a focus on their flagship products Utell and Pelas, and services like WhatsApp Business Integration.

## Project Status: Hybrid Architecture Complete ✅

The project has been successfully modernized using a hybrid architecture: **React TypeScript frontend + ASP.NET Core backend**, replacing the original Express.js backend while maintaining 100% identical UI and functionality:

### ✅ Hybrid Architecture Completed:
- **React Frontend**: Maintained original TypeScript components with enhanced API integration
- **ASP.NET Core Backend**: Complete API replacement with same endpoints and enhanced functionality
- **Contact Form**: Enhanced with FluentValidation, professional email templates via SendGrid/Resend
- **Seamless Integration**: React components communicate directly with ASP.NET Core API endpoints
- **Enhanced Error Handling**: Comprehensive validation and error responses from both frontend and backend
- **Type Safety**: Full TypeScript interfaces matching C# DTOs for end-to-end type safety
- **Entity Framework**: In-memory database with production-ready migration path to SQL Server/PostgreSQL
- **Service Architecture**: Clean architecture with interfaces, dependency injection, and proper separation
- **Professional Email Templates**: HTML emails with company branding for both notifications and confirmations

### 📚 Comprehensive Documentation:
- **README.md**: Detailed project overview, setup, and usage instructions
- **CONTRIBUTING.md**: Guidelines for contributors and development workflow
- **docs/ARCHITECTURE.md**: System architecture and technical decisions
- **docs/COMPONENTS.md**: Complete component library documentation
- **docs/API.md**: Comprehensive API documentation with examples
- **docs/DEPLOYMENT.md**: Deployment guides for multiple platforms
- **docs/STYLING.md**: Design system and styling guidelines
- **docs/DEVELOPMENT.md**: Development environment and best practices
- **LICENSE**: MIT license for open source use
- **.env.example**: Environment variables template
- **.gitignore**: Comprehensive exclusions for clean repository

### 🔧 Hybrid Technical Stack:
- **Frontend**: React 18 + TypeScript + Vite + TailwindCSS + Framer Motion (unchanged)
- **Backend**: ASP.NET Core 8.0 + Entity Framework Core + FluentValidation (new)
- **API Integration**: Enhanced HTTP client with ASP.NET Core support and comprehensive error handling
- **Email Service**: SendGrid .NET SDK with professional HTML templates (maintains Resend compatibility)
- **State Management**: TanStack Query for API state + React Hook Form for forms (unchanged)
- **Database**: Entity Framework Core with in-memory provider (production-ready for SQL Server/PostgreSQL)
- **Architecture**: Clean separation between React frontend and ASP.NET backend with proper API contracts
- **Documentation**: Comprehensive workflow diagrams and component interaction documentation

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

The application follows a monorepo structure, separating client-side and server-side code.

## UI/UX Design
- **Design System**: Custom theme based on shadcn/ui with a neutral color palette, featuring a comprehensive dark theme with a black/blue palette.
- **Visuals**: Animated spider web logo, tech-inspired grid patterns, professional color schemes, enterprise-grade visual elements, and industry-appropriate imagery.
- **Animations**: Scroll-based transition animations (fade effects, parallax scrolling, mouse-tracking parallax), loading animations for form submissions, and smooth transitions using Framer Motion for project galleries and testimonials.
- **Responsiveness**: Mobile-first approach with Tailwind breakpoints.
- **Accessibility**: Built on Radix UI primitives.
- **User Feedback**: Toast notifications, real-time form validation with animated icons and dynamic border colors.

## Technical Implementations
- **Frontend**: React 18 SPA with TypeScript, built with Vite, unchanged from original.
- **Backend**: ASP.NET Core 8.0 Web API with C#.NET 8.0, replacing Express.js completely.
- **Database**: Entity Framework Core with in-memory provider (ready for SQL Server/PostgreSQL).
- **UI Framework**: shadcn/ui components with TailwindCSS, maintained as original.
- **State Management**: TanStack Query for server state + React Hook Form for forms.
- **Routing**: Wouter for client-side routing, unchanged from original.
- **Forms**: React Hook Form with enhanced ASP.NET Core API integration and comprehensive validation.
- **API Communication**: Enhanced HTTP client with ASP.NET Core support, error handling, and type safety.
- **Email Integration**: SendGrid .NET SDK with professional HTML templates and Resend compatibility.
- **Storage**: Entity Framework Core with service pattern and clean architecture principles.

## Feature Specifications
- **Homepage**: Prioritizes services, features an enhanced hero section with enterprise messaging, quick service preview cards, and contact form.
- **Multi-page Structure**: Dedicated pages for `/about`, `/services`, `/products`, `/team`, and `/work`.
- **Contact Forms**: Comprehensive contact form with project scoping and budget selection, advanced real-time validation, and direct email integration.
- **Team Page**: Displays real team members with authentic specializations and roles.
- **Product Portfolio**: Showcases Kitji Studios' flagship products (Utell, Pelas, WhatsApp Business Integration) with authentic descriptions.
- **Service Presentation**: Focuses on business solutions with comprehensive descriptions, case studies, and client testimonials.
- **Project Showcase Gallery**: Interactive gallery with real-time category filtering, detailed project modals, and Framer Motion animations.
- **Testimonial Carousel**: Comprehensive carousel with authentic client success stories, auto-play, and detailed modals.

## System Design Choices
- **Hybrid Architecture**: React frontend with ASP.NET Core backend, combining frontend flexibility with backend robustness.
- **Entity Framework In-Memory**: Allows rapid development and testing with seamless migration path to SQL Server/PostgreSQL.
- **API-First Design**: Clean separation between frontend and backend through well-defined REST API contracts.
- **Enhanced HTTP Client**: Improved React-to-ASP.NET communication with comprehensive error handling and type safety.
- **Service-Oriented Architecture**: Proper dependency injection with interfaces for testability and maintainability.
- **FluentValidation**: Enterprise-grade validation matching React frontend validation for consistent user experience.
- **Professional Email Templates**: HTML email templates with company branding for enhanced user experience.

# External Dependencies

- **React Frontend Dependencies (Unchanged)**:
    - `@tanstack/react-query`: Server state management with enhanced ASP.NET integration.
    - `@hookform/resolvers`: Form validation integration with Zod schemas.
    - `zod`: Schema validation matching ASP.NET FluentValidation rules.
    - `@radix-ui/*`: Accessible UI primitives for consistent component behavior.
    - `tailwindcss`: Utility-first CSS framework for responsive design.
    - `framer-motion`: Animation library for smooth scroll-based transitions.
    - `lucide-react`: Icon library for consistent visual elements.
- **ASP.NET Core Backend Dependencies (New)**:
    - `Microsoft.EntityFrameworkCore`: ORM for database operations with LINQ support.
    - `Microsoft.EntityFrameworkCore.InMemory`: In-memory database provider for development.
    - `FluentValidation.AspNetCore`: Powerful validation framework with fluent API.
    - `SendGrid`: Enterprise-grade email delivery service (.NET SDK).
    - `Microsoft.AspNetCore.Cors`: Cross-origin resource sharing support for React frontend.
    - `Serilog.AspNetCore`: Structured logging with JSON output for monitoring.
- **Integration Layer**:
    - Enhanced HTTP client bridging React and ASP.NET Core with type safety.
    - Comprehensive error handling and validation across both frontend and backend.