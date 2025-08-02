# Development Guide

## 🛠 Development Environment Setup

This guide provides comprehensive information for setting up and working with the Kitji Studios website development environment.

## 📋 Prerequisites

### System Requirements
- **Node.js**: Version 18.0.0 or higher
- **npm**: Version 8.0.0 or higher (comes with Node.js)
- **Git**: For version control
- **Code Editor**: VS Code recommended with extensions

### Recommended VS Code Extensions
```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-typescript-next",
    "bradlc.vscode-tailwindcss",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "ms-vscode.vscode-json"
  ]
}
```

## 🚀 Initial Setup

### 1. Clone and Install
```bash
# Clone the repository
git clone https://github.com/kitji-studios/website.git
cd website

# Install dependencies
npm install

# Copy environment variables template
cp .env.example .env
```

### 2. Environment Configuration
Edit `.env` file with your values:
```env
# Required for email functionality
RESEND_API_KEY=your_resend_api_key_here

# Optional database (uses in-memory storage by default)
DATABASE_URL=postgresql://username:password@localhost:5432/kitji_db

# Development settings
NODE_ENV=development
PORT=5000
```

### 3. Start Development Server
```bash
# Start development server (both frontend and backend)
npm run dev

# Server will start on http://localhost:5000
```

## 🗂 Project Structure Deep Dive

### Frontend Architecture
```
client/
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # Basic UI components (buttons, cards, etc.)
│   │   ├── layout/         # Layout components (nav, footer)
│   │   └── features/       # Business logic components
│   ├── pages/              # Route-level page components
│   │   ├── home.tsx        # Homepage with hero and sections
│   │   ├── about.tsx       # About page
│   │   ├── services.tsx    # Services showcase
│   │   ├── products.tsx    # Product portfolio
│   │   ├── team.tsx        # Team member profiles
│   │   ├── work.tsx        # Project portfolio
│   │   └── not-found.tsx   # 404 error page
│   ├── hooks/              # Custom React hooks
│   │   ├── use-mobile.tsx  # Mobile detection hook
│   │   └── use-toast.ts    # Toast notification hook
│   ├── lib/                # Utility functions
│   │   ├── utils.ts        # General utilities (cn, etc.)
│   │   └── queryClient.ts  # TanStack Query configuration
│   ├── App.tsx             # Main application component
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global styles and theme
└── index.html              # HTML template
```

### Backend Architecture
```
server/
├── index.ts                # Express server setup
├── routes.ts               # API route handlers
├── storage.ts              # Data storage abstraction
├── email.ts                # Email service integration
└── vite.ts                 # Vite development server integration
```

### Shared Code
```
shared/
└── schema.ts               # Zod schemas and TypeScript types
```

## 🧩 Component Development

### Creating New Components

**1. Basic Component Template:**
```typescript
// client/src/components/ExampleComponent.tsx
import React from 'react';
import { cn } from '@/lib/utils';

interface ExampleComponentProps {
  className?: string;
  children?: React.ReactNode;
  // Add component-specific props
}

export default function ExampleComponent({ 
  className, 
  children,
  ...props 
}: ExampleComponentProps) {
  return (
    <div 
      className={cn(
        "base-classes-here",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
```

**2. Component with State:**
```typescript
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function StatefulComponent() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    // Side effects here
  }, []);

  const handleAction = async () => {
    setIsLoading(true);
    try {
      // Async operations
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="component-container">
      <Button 
        onClick={handleAction} 
        disabled={isLoading}
      >
        {isLoading ? 'Loading...' : 'Action'}
      </Button>
    </div>
  );
}
```

### Component Styling Guidelines

**Dark Theme Consistency:**
```typescript
// Always use dark theme classes
<div className="bg-white/5 backdrop-blur-sm border border-white/10">
  <h2 className="text-white">Heading</h2>
  <p className="text-gray-300">Body text</p>
  <span className="text-primary">Accent text</span>
</div>
```

**Responsive Design:**
```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
  {/* Responsive grid items */}
</div>
```

## 🔄 State Management

### Local State (React Hooks)
```typescript
// Simple state
const [isOpen, setIsOpen] = useState(false);

// Object state
const [form, setForm] = useState({
  name: '',
  email: '',
  message: ''
});

// Update object state
const updateForm = (field: string, value: string) => {
  setForm(prev => ({ ...prev, [field]: value }));
};
```

### Server State (TanStack Query)
```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Fetch data
const { data, isLoading, error } = useQuery({
  queryKey: ['/api/contacts'],
  queryFn: () => fetch('/api/contacts').then(res => res.json())
});

// Mutate data
const queryClient = useQueryClient();
const mutation = useMutation({
  mutationFn: (newContact) => 
    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newContact)
    }),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['/api/contacts'] });
  }
});
```

## 🎨 Styling Development

### Tailwind CSS Development
```bash
# Tailwind classes are automatically purged in production
# Use the full class name for proper detection

# Good:
className="bg-white/5 hover:bg-white/10"

# Avoid dynamic classes that might be purged:
className={`bg-${color}/5`}  # This might not work
```

### Custom CSS (when needed)
```css
/* client/src/index.css */
@layer components {
  .custom-component {
    @apply bg-white/5 backdrop-blur-sm border border-white/10;
    @apply rounded-2xl p-6 transition-all duration-300;
  }
}
```

### CSS Variables for Theming
```css
:root {
  --primary: 213 94% 68%;
  --background: 224 71% 4%;
  --card: 224 71% 4%;
}

.custom-style {
  background-color: hsl(var(--card));
  color: hsl(var(--foreground));
}
```

## 🛠 API Development

### Adding New API Routes
```typescript
// server/routes.ts
import { Router } from 'express';
import { z } from 'zod';

const router = Router();

// Input validation schema
const ExampleSchema = z.object({
  name: z.string().min(1),
  email: z.string().email()
});

// Route handler
router.post('/api/example', async (req, res) => {
  try {
    // Validate input
    const data = ExampleSchema.parse(req.body);
    
    // Process data
    const result = await processData(data);
    
    // Return response
    res.json({ success: true, data: result });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: error.errors
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

export default router;
```

### Storage Interface Development
```typescript
// server/storage.ts
interface IStorage {
  // Add new storage methods
  saveExample(data: ExampleData): Promise<void>;
  getExamples(): Promise<ExampleData[]>;
  getExampleById(id: string): Promise<ExampleData | null>;
  updateExample(id: string, data: Partial<ExampleData>): Promise<void>;
  deleteExample(id: string): Promise<void>;
}

class MemoryStorage implements IStorage {
  private examples: ExampleData[] = [];

  async saveExample(data: ExampleData): Promise<void> {
    this.examples.push({ ...data, id: generateId() });
  }

  async getExamples(): Promise<ExampleData[]> {
    return [...this.examples];
  }

  // Implement other methods...
}
```

## 🧪 Testing Strategies

### Unit Testing Setup (Future)
```typescript
// tests/components/ExampleComponent.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ExampleComponent from '@/components/ExampleComponent';

describe('ExampleComponent', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false }
    }
  });

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );

  it('renders correctly', () => {
    render(<ExampleComponent />, { wrapper: Wrapper });
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('handles user interactions', () => {
    const onAction = jest.fn();
    render(<ExampleComponent onAction={onAction} />, { wrapper: Wrapper });
    
    fireEvent.click(screen.getByRole('button'));
    expect(onAction).toHaveBeenCalled();
  });
});
```

### API Testing
```typescript
// tests/api/routes.test.ts
import request from 'supertest';
import { app } from '../../server/index';

describe('API Routes', () => {
  describe('POST /api/contact', () => {
    it('should accept valid contact form', async () => {
      const response = await request(app)
        .post('/api/contact')
        .send({
          name: 'John Doe',
          email: 'john@example.com',
          subject: 'Test',
          message: 'Test message',
          budget: '$10,000 - $25,000',
          timeline: '3-6 months'
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
    });

    it('should reject invalid email', async () => {
      const response = await request(app)
        .post('/api/contact')
        .send({
          name: 'John Doe',
          email: 'invalid-email',
          subject: 'Test',
          message: 'Test message',
          budget: '$10,000 - $25,000',
          timeline: '3-6 months'
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });
});
```

## 🔧 Development Tools

### TypeScript Configuration
The project uses strict TypeScript configuration:
```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noEmit": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "skipLibCheck": true,
    "esModuleInterop": true
  }
}
```

### ESLint Configuration (Future)
```json
// .eslintrc.json
{
  "extends": [
    "eslint:recommended",
    "@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended"
  ],
  "rules": {
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "prefer-const": "error"
  }
}
```

### Prettier Configuration
```json
// .prettierrc
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}
```

## 🐛 Debugging

### Frontend Debugging
```typescript
// React DevTools debugging
import React from 'react';

function DebugComponent({ data }: { data: any }) {
  // Use React DevTools to inspect props and state
  console.log('Component data:', data);
  
  return (
    <div>
      {/* Component content */}
    </div>
  );
}

// Query debugging
const { data, isLoading, error } = useQuery({
  queryKey: ['/api/data'],
  queryFn: fetchData,
  // Enable detailed logging
  onSuccess: (data) => console.log('Query success:', data),
  onError: (error) => console.error('Query error:', error)
});
```

### Backend Debugging
```typescript
// server/index.ts
import express from 'express';

const app = express();

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.body);
  next();
});

// Error handling middleware
app.use((error: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Server error:', error);
  res.status(500).json({ 
    success: false, 
    error: 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
});
```

### Browser Debugging
```javascript
// Console debugging
console.log('Debug info:', { variable1, variable2 });
console.table(arrayData);
console.error('Error details:', error);

// Performance debugging
console.time('Operation');
// ... code to measure
console.timeEnd('Operation');

// Network debugging in DevTools
// - Check Network tab for API calls
// - Inspect request/response data
// - Check for CORS issues
```

## 📈 Performance Optimization

### Frontend Performance
```typescript
// Lazy loading components
import { Suspense, lazy } from 'react';

const LazyComponent = lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}

// Memoizing expensive calculations
import { useMemo } from 'react';

function ExpensiveComponent({ data }: { data: any[] }) {
  const processedData = useMemo(() => {
    return data.map(item => expensiveProcessing(item));
  }, [data]);

  return <div>{/* Use processedData */}</div>;
}
```

### Bundle Size Optimization
```javascript
// Check bundle size
npm run build
npx bundlr-analyzer dist/public/assets/index-*.js

// Dynamic imports for code splitting
const handleFeature = async () => {
  const { heavyFeature } = await import('./heavyFeature');
  heavyFeature();
};
```

## 🚀 Build Process

### Development Build
```bash
# Start development server
npm run dev

# This runs:
# - Vite dev server for frontend (with HMR)
# - tsx for backend (with auto-restart)
# - TypeScript type checking
```

### Production Build
```bash
# Build for production
npm run build

# This creates:
# - dist/public/ (frontend static files)
# - dist/index.js (backend server bundle)

# Test production build locally
npm start
```

### Build Optimization
```typescript
// vite.config.ts optimizations
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-button']
        }
      }
    },
    minify: 'terser',
    cssCodeSplit: true
  }
});
```

This development guide provides comprehensive information for working effectively with the Kitji Studios website codebase.