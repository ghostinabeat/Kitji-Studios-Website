# Architecture Documentation

## 🏗 System Architecture Overview

The Kitji Studios website is built as a modern full-stack web application with a clear separation between frontend and backend concerns. The architecture follows industry best practices for scalability, maintainability, and performance.

### High-Level Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│                 │    │                 │    │                 │
│   Frontend      │    │   Backend       │    │   External      │
│   (React SPA)   │◄──►│   (Express.js)  │◄──►│   Services      │
│                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
    ┌────▼────┐             ┌────▼────┐             ┌────▼────┐
    │ Client  │             │ Server  │             │ Resend  │
    │ Routing │             │ Storage │             │ Email   │
    │ State   │             │ API     │             │ Service │
    │ UI      │             │ Routes  │             │         │
    └─────────┘             └─────────┘             └─────────┘
```

## 🗂 Project Structure

### Monorepo Organization
```
kitji-studios/
├── client/                 # Frontend application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/         # Page-level components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utilities and configurations
│   │   └── types/         # Frontend-specific types
│   └── index.html         # HTML entry point
├── server/                # Backend application
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API route handlers
│   ├── storage.ts        # Data storage abstraction
│   ├── email.ts          # Email service integration
│   └── vite.ts           # Dev server integration
├── shared/               # Shared code between frontend/backend
│   └── schema.ts         # Zod schemas and types
└── docs/                # Documentation
```

### Design Rationale

**Monorepo Benefits:**
- Code sharing between frontend and backend
- Consistent TypeScript types across the stack
- Simplified dependency management
- Single repository for easier development workflow

**Clear Boundaries:**
- Frontend handles UI, routing, and client state
- Backend manages API, storage, and external services
- Shared schemas ensure type safety across boundaries

## 🎨 Frontend Architecture

### Component Architecture

```
Components Hierarchy:
├── App.tsx                 # Root application component
├── pages/                  # Route-level components
│   ├── home.tsx           # Homepage with hero and sections
│   ├── about.tsx          # About page
│   ├── services.tsx       # Services overview
│   ├── products.tsx       # Product showcase
│   ├── team.tsx           # Team member profiles
│   ├── work.tsx           # Project portfolio
│   └── not-found.tsx      # 404 error page
├── components/            # Reusable UI components
│   ├── ui/               # Basic UI primitives
│   ├── layout/           # Layout components
│   └── features/         # Feature-specific components
└── hooks/                # Custom React hooks
```

### State Management Strategy

**Client State (React Hooks):**
- Form state with React Hook Form
- UI state (modals, dropdowns, animations)
- Local component state

**Server State (TanStack Query):**
- API data fetching and caching
- Background updates and invalidation
- Optimistic updates for better UX

**Theme State (Context):**
- Dark theme management
- Responsive breakpoint handling

### Routing Architecture

**Client-Side Routing (Wouter):**
```typescript
// App.tsx routing structure
<Route path="/" component={HomePage} />
<Route path="/about" component={AboutPage} />
<Route path="/services" component={ServicesPage} />
<Route path="/products" component={ProductsPage} />
<Route path="/team" component={TeamPage} />
<Route path="/work" component={WorkPage} />
<Route path="*" component={NotFoundPage} />
```

**Route Organization:**
- Each page is a separate component
- Shared layouts for consistent navigation
- Lazy loading for performance optimization

### Styling Architecture

**Design System Foundation:**
```css
/* CSS Custom Properties */
:root {
  --primary: 213 94% 68%;      /* Blue accent */
  --background: 224 71% 4%;     /* Dark background */
  --foreground: 213 31% 91%;    /* Light text */
  --card: 224 71% 4%;          /* Card backgrounds */
  --border: 216 34% 17%;       /* Border colors */
}
```

**Component Styling Strategy:**
- Tailwind CSS utility classes for rapid development
- Custom CSS properties for theme consistency
- shadcn/ui components for complex UI patterns
- Responsive design with mobile-first approach

## 🖥 Backend Architecture

### Server Structure

```
Express.js Application:
├── index.ts              # Server setup and middleware
├── routes.ts             # API route definitions
├── storage.ts            # Data storage interface
├── email.ts              # Email service integration
└── vite.ts               # Development server integration
```

### API Design

**RESTful Endpoints:**
```typescript
// Contact form submission
POST /api/contact
Content-Type: application/json
{
  "name": "string",
  "email": "string",
  "subject": "string",
  "message": "string",
  "budget": "string",
  "timeline": "string"
}

// Health check
GET /api/health
Response: { "status": "ok", "timestamp": "ISO string" }
```

**Error Handling:**
- Consistent error response format
- Validation error details
- HTTP status codes following conventions

### Data Storage Strategy

**Current Implementation (In-Memory):**
```typescript
interface IStorage {
  // Contact submissions
  saveContact(data: ContactData): Promise<void>;
  getContacts(): Promise<ContactData[]>;
  
  // Future expansion ready
  // saveProject(data: ProjectData): Promise<void>;
  // getProjects(): Promise<ProjectData[]>;
}
```

**Future Database Integration:**
- PostgreSQL with Drizzle ORM
- Type-safe database operations
- Migration system for schema changes
- Connection pooling for performance

### Email Service Integration

**Resend Integration:**
```typescript
// Email service abstraction
export async function sendContactEmail(data: ContactFormData) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  
  return await resend.emails.send({
    from: 'noreply@kitjistudios.com',
    to: 'contact@kitjistudios.com',
    subject: `New Contact: ${data.subject}`,
    html: generateEmailTemplate(data)
  });
}
```

**Email Template System:**
- HTML email templates
- Dynamic content injection
- Responsive email design
- Plain text fallbacks

## 🔄 Data Flow Architecture

### Contact Form Flow

```
1. User fills contact form
   ↓
2. Frontend validates with Zod schema
   ↓
3. Form submission to /api/contact
   ↓
4. Backend validates request body
   ↓
5. Save to storage (in-memory/database)
   ↓
6. Send email via Resend
   ↓
7. Return success response
   ↓
8. Frontend shows success message
```

### Animation System Flow

```
1. Page loads with initial state
   ↓
2. Scroll event listeners attached
   ↓
3. Intersection Observer detects elements
   ↓
4. Framer Motion triggers animations
   ↓
5. CSS transforms applied smoothly
   ↓
6. Animation states updated in React
```

## 🛡 Security Architecture

### Frontend Security
- XSS prevention through React's built-in escaping
- Content Security Policy headers
- HTTPS enforcement in production
- Input validation with Zod schemas

### Backend Security
- Request rate limiting
- CORS configuration
- Input sanitization
- Environment variable protection
- Session security

### Data Protection
- Email addresses encrypted in storage
- No sensitive data in client-side code
- Secure API key management
- GDPR-compliant data handling

## 📊 Performance Architecture

### Frontend Optimization
- Code splitting with dynamic imports
- Image optimization and lazy loading
- CSS purging in production builds
- Bundle size analysis and optimization

### Backend Optimization
- Response compression (gzip/brotli)
- Static asset caching
- Database connection pooling (future)
- API response caching strategies

### Animation Performance
- GPU-accelerated CSS transforms
- RequestAnimationFrame for smooth animations
- Intersection Observer for efficient scroll detection
- Reduced motion support for accessibility

## 🚀 Deployment Architecture

### Build Process
```
Development:
npm run dev → Vite dev server + Express server

Production:
npm run build → 
  ├── Frontend: Vite build → dist/public/
  └── Backend: esbuild → dist/index.js
```

### Environment Configuration
```
Development:
- Hot module replacement
- Source maps enabled
- Debug logging
- In-memory storage

Production:
- Minified assets
- Compressed responses
- Error logging
- Database storage
```

### Hosting Strategy
- **Frontend**: Static hosting (Vercel, Netlify)
- **Backend**: Node.js hosting (Vercel Functions, AWS Lambda)
- **Database**: PostgreSQL (Neon, Supabase, AWS RDS)
- **Email**: Resend service
- **CDN**: Static asset distribution

## 🔧 Development Tools

### Build Tools
- **Vite**: Fast development server and build tool
- **esbuild**: Fast TypeScript compilation for backend
- **TypeScript**: Type safety across the stack
- **Tailwind CSS**: Utility-first styling

### Development Experience
- Hot module replacement for instant feedback
- TypeScript error checking
- ESLint for code quality
- Prettier for code formatting

### Testing Strategy (Future)
```
Unit Tests:
├── Component testing with React Testing Library
├── API route testing with Supertest
├── Utility function testing with Jest
└── Schema validation testing with Zod

Integration Tests:
├── End-to-end testing with Playwright
├── API integration testing
└── Email service testing

Performance Tests:
├── Lighthouse CI for performance metrics
├── Bundle size analysis
└── Animation performance testing
```

## 📈 Scalability Considerations

### Frontend Scalability
- Component library for consistent UI
- State management scaling with Redux Toolkit (if needed)
- Micro-frontend architecture potential
- Progressive Web App features

### Backend Scalability
- Horizontal scaling with load balancers
- Database read replicas
- Caching layers (Redis)
- Background job processing

### Data Scalability
- Database indexing strategies
- Data archiving policies
- CDN for static assets
- Edge computing for global performance

This architecture provides a solid foundation for the Kitji Studios website while maintaining flexibility for future enhancements and scaling requirements.