# Overview

This is a full-stack web application for Kitji Studios, a software development company. The application serves as a company portfolio website with contact form functionality. Its core purpose is to showcase Kitji Studios' capabilities in enterprise software development, with a focus on their flagship products Utell and Pelas, and services like WhatsApp Business Integration. The site aims to attract banking, insurance, and government sector clients through a professional, enterprise-grade presentation and clear lead generation paths.

## Project Status: Documentation Complete

The project has been fully documented with industry-standard practices and is ready for GitHub repository deployment. All major functionalities are complete:

### ✅ Completed Features:
- **Dark Theme Implementation**: Consistent across all pages (Home, About, Services, Products, Team, Work)
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Scroll Animations**: Hero-style fade transitions using Framer Motion
- **Contact Form**: Complete with validation, email integration via Resend
- **Project Showcase**: Interactive filtering and detailed modals
- **Testimonial Carousel**: Auto-playing with client success stories
- **Navigation**: Responsive with mobile hamburger menu
- **All Page Content**: Enterprise-focused content for all 6 main pages

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

### 🔧 Technical Implementation:
- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS + shadcn/ui
- **Backend**: Express.js + TypeScript + Zod validation
- **Email Service**: Resend integration for contact form
- **State Management**: TanStack Query for server state
- **Animations**: Framer Motion for scroll-based transitions
- **Routing**: Wouter for client-side navigation
- **Database Ready**: Drizzle ORM configured for future PostgreSQL integration

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
- **Frontend**: React 18 SPA with TypeScript, built with Vite.
- **Backend**: Express.js REST API with TypeScript.
- **Database**: PostgreSQL with Drizzle ORM.
- **UI Framework**: shadcn/ui components with Tailwind CSS.
- **State Management**: TanStack Query for server state management.
- **Routing**: Wouter for client-side routing.
- **Forms**: React Hook Form with Zod validation.
- **API Communication**: Native fetch API with custom wrapper.
- **Email Integration**: Resend email service for contact form submissions.
- **Storage**: In-memory storage implementation with an interface for future database integration.

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
- **Monorepo**: Chosen for code sharing between client and server while maintaining clear boundaries.
- **In-Memory Storage with Interface**: Allows rapid development and testing with a clear migration path to database storage.
- **Drizzle ORM**: Selected for its TypeScript-first approach and type safety.
- **shadcn/ui**: Chosen for flexibility and accessibility, with components owned by the project.
- **TanStack Query**: Implemented for caching and optimistic updates to improve user experience and reduce server load.
- **Zod Validation**: Used for runtime type checking and validation across the application to ensure data integrity.

# External Dependencies

- **Database**:
    - `@neondatabase/serverless`: PostgreSQL serverless driver.
    - `drizzle-orm`: Type-safe ORM for database operations.
- **Frontend/UI**:
    - `@tanstack/react-query`: Server state management.
    - `@hookform/resolvers`: Form validation integration.
    - `zod`: Schema validation.
    - `@radix-ui/*`: Accessible UI primitives.
    - `tailwindcss`: Utility-first CSS framework.
    - `class-variance-authority`: Type-safe component variants.
    - `lucide-react`: Icon library.
- **Email Service**:
    - `Resend`: For enterprise-grade email delivery.