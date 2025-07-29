# Overview

This is a full-stack web application for Kitji Studios, a software development company. The application is built as a modern single-page application (SPA) using React for the frontend and Express.js for the backend, with a PostgreSQL database for data persistence. The application serves as a company portfolio website with contact form functionality.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes (July 29, 2025)

### Logo and Brand Identity
- Redesigned logo with animated spider web pattern representing Anansi spirit and network connectivity
- Created professional SVG logo with gradient background and tech-inspired animations
- Updated navigation and footer to use new logo component consistently

### Homepage Restructuring 
- Moved company history and "About Kitji Studios" content to dedicated /about page
- Restructured homepage to prioritize services closer to landing view
- Enhanced hero section with enterprise-focused messaging and trust indicators
- Added quick service preview cards in hero section for immediate value communication

### Service Presentation Improvements
- Completely redesigned Services section to focus on business solutions rather than technologies
- Added comprehensive service descriptions with key features and target industries
- Created new Platforms section showcasing Utell and Pelas proprietary solutions
- Included detailed case studies and client testimonials with real project examples

### Industry-Standard Design Updates
- Replaced generic backgrounds with tech-inspired grid patterns and professional color schemes
- Added enterprise-grade visual elements and industry-appropriate imagery
- Implemented comprehensive contact form with project scoping and budget selection
- Enhanced overall design to reflect enterprise software development standards

### Content Strategy Changes
- Focused on value propositions and business benefits rather than technical features
- Added social proof elements and trust indicators throughout
- Positioned services as enterprise solutions for banking, insurance, and government sectors
- Created clear lead generation paths with multiple CTAs guiding users to contact form

## System Architecture

The application follows a monorepo structure with clear separation between client-side and server-side code:

- **Frontend**: React SPA with TypeScript, built with Vite
- **Backend**: Express.js REST API with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **UI Framework**: shadcn/ui components with Tailwind CSS
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for client-side routing

## Key Components

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS custom properties for theming
- **Forms**: React Hook Form with Zod validation
- **HTTP Client**: Native fetch API with custom wrapper for API requests
- **Routing**: Wouter for lightweight client-side routing

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (currently using Neon serverless)
- **Storage**: In-memory storage implementation with interface for future database integration
- **API Design**: RESTful endpoints with proper error handling
- **Development**: Hot reload with tsx for TypeScript execution

### Database Schema
The application defines two main entities:
- **Users**: Basic user management with username/password
- **Contact Submissions**: Store contact form submissions with fields for name, email, company, project type, and message

### UI/UX Design
- **Design System**: Custom theme based on shadcn/ui with neutral color palette
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Accessibility**: Built on Radix UI primitives for accessible components
- **User Feedback**: Toast notifications for form submissions and user actions

## Data Flow

1. **Client Requests**: React components use TanStack Query to manage API requests
2. **API Layer**: Express.js routes handle HTTP requests and responses
3. **Data Validation**: Zod schemas validate both client and server-side data
4. **Storage Layer**: Abstract storage interface allows switching between in-memory and database storage
5. **Response Handling**: Structured error responses with appropriate HTTP status codes

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL serverless driver for database connectivity
- **drizzle-orm**: Type-safe ORM for database operations
- **@tanstack/react-query**: Server state management and caching
- **@hookform/resolvers**: Form validation integration
- **zod**: Schema validation for type safety

### UI Dependencies
- **@radix-ui/***: Comprehensive set of accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Type-safe component variants
- **lucide-react**: Icon library

### Development Dependencies
- **tsx**: TypeScript execution for development
- **esbuild**: Fast JavaScript bundler for production builds
- **@replit/vite-plugin-***: Replit-specific development tools

## Deployment Strategy

### Development Environment
- **Local Development**: Vite dev server with hot module replacement
- **Database**: Environment variable configuration for database URL
- **Build Process**: Separate build steps for client and server code

### Production Build
- **Client Build**: Vite builds React application to static assets
- **Server Build**: esbuild bundles Express server for Node.js runtime
- **Database Migrations**: Drizzle Kit handles schema migrations
- **Environment Variables**: DATABASE_URL required for database connectivity

### Architecture Decisions

**Monorepo Structure**: Chosen to maintain code sharing between client and server while keeping clear boundaries. The shared directory contains common types and schemas used by both frontend and backend.

**In-Memory Storage with Interface**: Implemented to allow rapid development and testing while providing a clear migration path to database storage. The IStorage interface ensures consistent API regardless of storage implementation.

**Drizzle ORM**: Selected for its TypeScript-first approach and excellent type safety. Provides schema-driven development with automatic type generation.

**shadcn/ui Component System**: Chosen for its flexibility and accessibility. Components are owned by the project rather than being external dependencies, allowing for customization while maintaining design consistency.

**TanStack Query**: Implemented for its powerful caching capabilities and optimistic updates. Reduces server load and improves user experience through intelligent data fetching.

**Zod Validation**: Used throughout the application for runtime type checking and validation. Ensures data integrity at API boundaries and provides excellent developer experience with TypeScript integration.