# Overview

This is a full-stack web application for Kitji Studios, a software development company, **now completely refactored to C# using Blazor WebAssembly and ASP.NET Core**. The application serves as a company portfolio website with contact form functionality, maintaining the exact same dark-themed UI and interactive features as the original React/TypeScript version. Its core purpose is to showcase Kitji Studios' capabilities in enterprise software development, with a focus on their flagship products Utell and Pelas, and services like WhatsApp Business Integration.

## Project Status: C# Refactoring Complete ✅

The project has been successfully refactored from React/TypeScript + Express.js to C# using Blazor WebAssembly + ASP.NET Core while maintaining 100% identical UI and functionality:

### ✅ C# Refactoring Completed:
- **Blazor WebAssembly Frontend**: Identical dark theme implementation across all pages
- **ASP.NET Core Backend**: Complete API refactoring with same endpoints and functionality
- **Contact Form**: Fully functional with FluentValidation, same email integration via SendGrid/Resend
- **Scroll Animations**: JavaScript interop maintaining exact same animations as React version
- **Interactive Hero Tiles**: Same clickable service tiles with identical styling and behavior
- **Navigation**: Responsive Blazor component with mobile hamburger menu
- **Entity Framework**: In-memory database setup matching original storage interface
- **Responsive Design**: Maintained mobile-first approach with custom CSS (no Tailwind dependency)
- **Service Architecture**: Proper dependency injection and service pattern implementation
- **All Components**: Logo, Footer, ScrollAnimatedHero, Contact, About page - all recreated in Blazor

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

### 🔧 C# Technical Stack:
- **Frontend**: Blazor WebAssembly + C# + Custom CSS (matching Tailwind styling)
- **Backend**: ASP.NET Core 8.0 + Entity Framework Core + FluentValidation
- **Email Service**: SendGrid .NET SDK integration (maintains Resend API compatibility) 
- **State Management**: Blazor component state with service injection
- **Animations**: JavaScript interop for scroll-based animations (matching Framer Motion behavior)
- **Routing**: Blazor Router with same page structure
- **Database**: Entity Framework Core with in-memory provider (production-ready for SQL Server/PostgreSQL)
- **Architecture**: Clean architecture with interfaces, services, and proper dependency injection

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
- **Frontend**: Blazor WebAssembly SPA with C#.NET 8.0, server-side rendering capable.
- **Backend**: ASP.NET Core Web API with C#.NET 8.0.
- **Database**: Entity Framework Core with in-memory provider (ready for SQL Server/PostgreSQL).
- **UI Framework**: Custom CSS components matching shadcn/ui styling (no external CSS framework dependencies).
- **State Management**: Blazor component state with scoped service injection.
- **Routing**: Blazor Router with page-based routing system.
- **Forms**: Blazor EditForm with FluentValidation for robust validation.
- **API Communication**: HttpClient with System.Net.Http.Json for type-safe API calls.
- **Email Integration**: SendGrid .NET SDK with fallback compatibility for Resend API keys.
- **Storage**: Entity Framework Core with repository pattern and interface abstraction.

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
- **C# Solution Structure**: Clean separation between Client (Blazor WebAssembly), Server (ASP.NET Core), and Shared (Models/DTOs) projects.
- **Entity Framework In-Memory**: Allows rapid development and testing with seamless migration path to SQL Server/PostgreSQL.
- **Blazor WebAssembly**: Selected for C# full-stack development with client-side execution and strong typing.
- **Custom CSS Components**: Replicated shadcn/ui styling without external dependencies for maximum control and performance.
- **Service-Oriented Architecture**: Proper dependency injection with interfaces for testability and maintainability.
- **FluentValidation**: Enterprise-grade validation with expressive, maintainable validation rules and localization support.

# External Dependencies

- **C# Backend Dependencies**:
    - `Microsoft.EntityFrameworkCore`: ORM for database operations with LINQ support.
    - `Microsoft.EntityFrameworkCore.InMemory`: In-memory database provider for development.
    - `FluentValidation.AspNetCore`: Powerful validation framework with fluent API.
    - `SendGrid`: Enterprise-grade email delivery service (.NET SDK).
    - `Microsoft.AspNetCore.Cors`: Cross-origin resource sharing support.
- **C# Frontend Dependencies**:
    - `Microsoft.AspNetCore.Components.WebAssembly`: Blazor WebAssembly framework.
    - `System.Net.Http.Json`: Type-safe HTTP client with JSON serialization.
    - `Microsoft.AspNetCore.Components.Forms`: Enhanced form components and validation.
- **JavaScript Interop**:
    - Custom scroll animation library (no external dependencies).
    - Native browser APIs for smooth scrolling and DOM manipulation.