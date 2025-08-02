# Component Documentation

## 🧩 Component Library Overview

The Kitji Studios website uses a component-based architecture with reusable, accessible, and well-documented components. Each component follows consistent patterns and integrates seamlessly with the dark theme design system.

## 📋 Component Categories

### 🎨 UI Components (`/components/ui/`)
Basic building blocks built on Radix UI primitives.

### 🏗 Layout Components (`/components/layout/`)
Components that define page structure and navigation.

### ✨ Feature Components (`/components/features/`)
Complex components that implement specific business features.

### 📄 Page Components (`/pages/`)
Top-level components that represent entire pages.

---

## 🎨 UI Components

### Button
**Location**: `client/src/components/ui/button.tsx`

Basic button component with multiple variants and sizes.

```typescript
interface ButtonProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
}
```

**Usage:**
```tsx
<Button variant="default" size="lg">
  Primary Action
</Button>

<Button variant="outline" size="sm">
  Secondary Action
</Button>
```

**Variants:**
- `default`: Primary blue button
- `outline`: Transparent with border
- `secondary`: Muted background
- `ghost`: No background, hover effects
- `link`: Text-only button style

### Card
**Location**: `client/src/components/ui/card.tsx`

Container component for grouping related content.

```typescript
interface CardProps {
  className?: string;
  children: React.ReactNode;
}
```

**Usage:**
```tsx
<Card className="p-6">
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description text</CardDescription>
  </CardHeader>
  <CardContent>
    Main card content
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

### Badge
**Location**: `client/src/components/ui/badge.tsx`

Small status or category indicators.

```typescript
interface BadgeProps {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
}
```

**Usage:**
```tsx
<Badge variant="default">New</Badge>
<Badge variant="secondary">Category</Badge>
<Badge variant="outline">Status</Badge>
```

### Input
**Location**: `client/src/components/ui/input.tsx`

Form input component with consistent styling.

```typescript
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}
```

**Usage:**
```tsx
<Input 
  type="email" 
  placeholder="Enter your email"
  error={!!errors.email}
/>
```

### Textarea
**Location**: `client/src/components/ui/textarea.tsx`

Multi-line text input component.

```tsx
<Textarea 
  placeholder="Enter your message"
  rows={4}
/>
```

---

## 🏗 Layout Components

### Navigation
**Location**: `client/src/components/Navigation.tsx`

Main site navigation with responsive mobile menu.

```typescript
interface NavigationProps {
  // No props - self-contained component
}
```

**Features:**
- Responsive design with mobile hamburger menu
- Active route highlighting
- Smooth scroll to sections
- Dark theme consistent styling

**Usage:**
```tsx
<Navigation />
```

**Internal Structure:**
- Desktop: Horizontal navigation bar
- Mobile: Collapsible hamburger menu
- Logo with smooth scroll to top
- Route-based active states

### Footer
**Location**: `client/src/components/Footer.tsx`

Site footer with contact information and links.

**Features:**
- Company contact information
- Social media links
- Copyright information
- Responsive layout

```tsx
<Footer />
```

---

## ✨ Feature Components

### ScrollAnimatedHero
**Location**: `client/src/components/ScrollAnimatedHero.tsx`

Main hero section with scroll-based fade animations.

```typescript
interface ScrollAnimatedHeroProps {
  // Self-contained hero component
}
```

**Features:**
- Scroll-triggered fade out animation
- Enterprise messaging
- Call-to-action buttons
- Responsive design

**Animation Behavior:**
- Fades out as user scrolls down (1000-1400px range)
- Smooth opacity transitions
- GPU-accelerated transforms

```tsx
<ScrollAnimatedHero />
```

### Contact
**Location**: `client/src/components/Contact.tsx`

Comprehensive contact form with validation and email integration.

```typescript
interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  budget: string;
  timeline: string;
}
```

**Features:**
- Real-time form validation with Zod
- Budget and timeline selection
- Email integration via Resend
- Success/error state handling
- Accessible form labels and errors

**Form Fields:**
- Name (required)
- Email (required, validated)
- Subject (required)
- Message (required, min 10 characters)
- Budget range selection
- Timeline selection

```tsx
<Contact />
```

### ProjectShowcase
**Location**: `client/src/components/ProjectShowcase.tsx`

Interactive project gallery with filtering and detailed modals.

```typescript
interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: string;
  technologies: string[];
  features: string[];
  timeline: string;
  teamSize: string;
  status: 'Live' | 'In Development' | 'Completed';
  image: string;
  demoUrl?: string;
  githubUrl?: string;
  icon: React.ComponentType;
  metrics?: {
    users?: string;
    performance?: string;
    uptime?: string;
  };
}
```

**Features:**
- Category-based filtering
- Animated project cards
- Detailed project modals
- Technology stack display
- Project metrics and status
- Responsive grid layout

**Categories:**
- All Projects
- Web3/Blockchain
- Enterprise Software
- Communication Platform
- CRM/Sales
- FinTech
- IoT/Analytics

```tsx
<ProjectShowcase />
```

### TestimonialCarousel
**Location**: `client/src/components/TestimonialCarousel.tsx`

Auto-playing testimonial carousel with detailed client stories.

```typescript
interface Testimonial {
  id: string;
  name: string;
  title: string;
  company: string;
  industry: string;
  quote: string;
  longQuote: string;
  project: string;
  projectType: string;
  results: string[];
  timeline: string;
  teamSize: string;
  rating: number;
  image: string;
  companyLogo?: string;
  videoUrl?: string;
  metrics: {
    performance?: string;
    cost?: string;
    efficiency?: string;
  };
}
```

**Features:**
- Auto-play with pause/play controls
- Manual navigation (previous/next)
- Detailed testimonial modals
- Client project information
- Performance metrics display
- Responsive design

**Controls:**
- Auto-play (5-second intervals)
- Manual navigation buttons
- Play/pause toggle
- Dot indicators for direct access

```tsx
<TestimonialCarousel />
```

### CloudProducts
**Location**: `client/src/components/CloudProducts.tsx`

Showcase of Kitji Studios' flagship products.

**Products Featured:**
- **Utell**: Web3 trust platform with IAAM
- **Pelas**: Resource management system
- **WhatsApp Business**: Integration platform

**Features:**
- Product cards with detailed descriptions
- Feature highlights
- Technology stack information
- Call-to-action buttons

```tsx
<CloudProducts />
```

---

## 📄 Page Components

### HomePage
**Location**: `client/src/pages/home.tsx`

Main landing page with hero section and feature previews.

**Sections:**
- ScrollAnimatedHero
- Services preview
- Contact form
- Quick navigation to other pages

### AboutPage
**Location**: `client/src/pages/about.tsx`

Company overview and value propositions.

**Content:**
- Company mission and vision
- Core values
- Industry expertise
- Client focus areas

### ServicesPage
**Location**: `client/src/pages/services.tsx`

Detailed service offerings with case studies.

**Services:**
- Enterprise Software Development
- Web3 & Blockchain Solutions
- Banking & FinTech Integration
- Government & Public Sector Solutions

### ProductsPage
**Location**: `client/src/pages/products.tsx`

Product showcase using CloudProducts component.

### TeamPage
**Location**: `client/src/pages/team.tsx`

Team member profiles and expertise.

**Features:**
- Individual team member cards
- Role and specialization information
- Professional experience highlights

### WorkPage
**Location**: `client/src/pages/work.tsx`

Portfolio showcase using ProjectShowcase and TestimonialCarousel.

**Sections:**
- Project showcase with filtering
- Client testimonials
- Case studies
- Call-to-action for new projects

---

## 🎯 Component Patterns

### Common Props Pattern
```typescript
interface ComponentProps {
  className?: string;      // For additional styling
  children?: React.ReactNode; // For composition
  // Specific props for component functionality
}
```

### Forwarded Refs Pattern
```typescript
const Component = React.forwardRef<
  HTMLDivElement,
  ComponentProps
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("base-classes", className)}
      {...props}
    />
  );
});
Component.displayName = "Component";
```

### Event Handler Pattern
```typescript
interface ComponentProps {
  onAction?: (data: ActionData) => void;
  onError?: (error: Error) => void;
  onSuccess?: (result: SuccessData) => void;
}
```

### Loading State Pattern
```typescript
interface ComponentProps {
  isLoading?: boolean;
  loadingText?: string;
}

function Component({ isLoading, loadingText = "Loading..." }: ComponentProps) {
  if (isLoading) {
    return <div className="animate-pulse">{loadingText}</div>;
  }
  
  return <div>{/* Component content */}</div>;
}
```

## 🎨 Styling Patterns

### Dark Theme Classes
```css
/* Background patterns */
.bg-main { @apply bg-black/90; }
.bg-card { @apply bg-white/5 backdrop-blur-sm border border-white/10; }
.bg-hover { @apply hover:bg-white/10; }

/* Text patterns */
.text-heading { @apply text-white; }
.text-body { @apply text-gray-300; }
.text-muted { @apply text-gray-400; }
.text-accent { @apply text-primary; }

/* Border patterns */
.border-main { @apply border-white/10; }
.border-accent { @apply border-primary/20; }
```

### Responsive Patterns
```css
/* Mobile-first approach */
.responsive-grid {
  @apply grid grid-cols-1 gap-4;
  @apply md:grid-cols-2 md:gap-6;
  @apply lg:grid-cols-3 lg:gap-8;
}

.responsive-text {
  @apply text-sm;
  @apply md:text-base;
  @apply lg:text-lg;
}
```

### Animation Patterns
```css
/* Smooth transitions */
.smooth-transition { @apply transition-all duration-300 ease-in-out; }

/* Hover effects */
.hover-lift { @apply hover:transform hover:-translate-y-1 hover:shadow-lg; }

/* Loading states */
.loading-pulse { @apply animate-pulse bg-gray-200 dark:bg-gray-700; }
```

## 🧪 Testing Patterns

### Component Testing Template
```typescript
import { render, screen } from '@testing-library/react';
import { Component } from './Component';

describe('Component', () => {
  it('renders correctly', () => {
    render(<Component />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('handles user interactions', () => {
    const onAction = jest.fn();
    render(<Component onAction={onAction} />);
    
    // Test user interactions
  });
});
```

This component documentation provides a comprehensive guide for understanding, using, and extending the component library in the Kitji Studios website.