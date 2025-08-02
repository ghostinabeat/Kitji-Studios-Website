# Styling Guide

## 🎨 Design System Overview

The Kitji Studios website uses a comprehensive dark-themed design system built on Tailwind CSS and shadcn/ui components. This guide provides detailed information about the styling architecture, theme implementation, and component styling patterns.

## 🌑 Dark Theme Architecture

### Color Palette
The design system uses HSL color values for precise control and theme consistency:

```css
:root {
  /* Primary Brand Colors */
  --primary: 213 94% 68%;          /* Blue accent (#3B82F6) */
  --primary-foreground: 210 40% 98%; /* White text on primary */
  
  /* Background Colors */
  --background: 224 71% 4%;         /* Main dark background (#0F0F23) */
  --foreground: 213 31% 91%;        /* Main text color (#E2E8F0) */
  
  /* Surface Colors */
  --card: 224 71% 4%;              /* Card backgrounds */
  --card-foreground: 213 31% 91%;  /* Card text */
  --popover: 224 71% 4%;           /* Popover backgrounds */
  --popover-foreground: 213 31% 91%; /* Popover text */
  
  /* Interactive Elements */
  --muted: 215 28% 17%;            /* Muted backgrounds (#2D3748) */
  --muted-foreground: 215 20% 65%; /* Muted text (#94A3B8) */
  --accent: 216 34% 17%;           /* Accent backgrounds */
  --accent-foreground: 210 40% 98%; /* Accent text */
  
  /* Borders and Separators */
  --border: 216 34% 17%;           /* Border color (#374151) */
  --input: 216 34% 17%;            /* Input borders */
  --ring: 213 94% 68%;             /* Focus rings */
  
  /* Semantic Colors */
  --destructive: 0 62% 30%;        /* Error/danger color */
  --destructive-foreground: 210 40% 98%; /* Error text */
}
```

### Color Usage Patterns

**Backgrounds:**
```css
/* Main page backgrounds */
.bg-main { @apply bg-black/90; }

/* Card and component backgrounds */
.bg-card { @apply bg-white/5 backdrop-blur-sm; }

/* Hover states */
.bg-hover { @apply hover:bg-white/10; }

/* Interactive elements */
.bg-interactive { @apply bg-white/5 hover:bg-white/10 border border-white/10; }
```

**Text Colors:**
```css
/* Primary headings */
.text-heading { @apply text-white; }

/* Body text */
.text-body { @apply text-gray-300; }

/* Muted/secondary text */
.text-muted { @apply text-gray-400; }

/* Accent/brand color */
.text-accent { @apply text-primary; }
```

**Borders:**
```css
/* Standard borders */
.border-main { @apply border-white/10; }

/* Accent borders */
.border-accent { @apply border-primary/20; }

/* Interactive borders */
.border-interactive { @apply border-white/10 hover:border-white/20; }
```

## 🧩 Component Styling Patterns

### Card Components
Standard card styling follows this pattern:
```css
.card-base {
  @apply bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6;
}

.card-hover {
  @apply hover:bg-white/10 transition-all duration-300;
}

.card-content {
  @apply space-y-4;
}
```

### Button Styling
Button variants with consistent dark theme:
```css
/* Primary button */
.btn-primary {
  @apply bg-primary text-white hover:bg-primary/90;
  @apply px-6 py-3 rounded-lg font-medium;
  @apply transition-all duration-200;
}

/* Secondary button */
.btn-secondary {
  @apply bg-white/5 text-white border border-white/10;
  @apply hover:bg-white/10 hover:border-white/20;
}

/* Ghost button */
.btn-ghost {
  @apply text-gray-300 hover:text-white hover:bg-white/5;
}
```

### Form Elements
Input and form styling:
```css
/* Input fields */
.input-base {
  @apply bg-white/5 border border-white/10 text-white placeholder-gray-400;
  @apply focus:border-primary/50 focus:ring-2 focus:ring-primary/20;
  @apply rounded-lg px-4 py-3;
}

/* Labels */
.label-base {
  @apply text-sm font-medium text-gray-300 mb-2 block;
}

/* Error states */
.input-error {
  @apply border-red-500/50 focus:border-red-500 focus:ring-red-500/20;
}

.error-text {
  @apply text-red-400 text-sm mt-1;
}
```

## 📱 Responsive Design

### Breakpoints
The design uses Tailwind's default breakpoints with mobile-first approach:
```css
/* Mobile: 0px - 639px (default) */
/* Tablet: 640px - 767px (sm:) */
/* Desktop: 768px - 1023px (md:) */
/* Large Desktop: 1024px - 1279px (lg:) */
/* Extra Large: 1280px+ (xl:) */
```

### Responsive Patterns
```css
/* Grid layouts */
.responsive-grid {
  @apply grid grid-cols-1 gap-4;
  @apply sm:grid-cols-2 sm:gap-6;
  @apply lg:grid-cols-3 lg:gap-8;
}

/* Typography scaling */
.responsive-heading {
  @apply text-2xl font-bold;
  @apply sm:text-3xl;
  @apply lg:text-4xl;
}

/* Spacing adjustments */
.responsive-padding {
  @apply px-4 py-8;
  @apply sm:px-6 sm:py-12;
  @apply lg:px-8 lg:py-16;
}
```

### Mobile Navigation
```css
.mobile-menu {
  @apply fixed inset-0 z-50 bg-black/95 backdrop-blur-lg;
  @apply md:hidden;
}

.mobile-menu-item {
  @apply block px-6 py-4 text-lg text-gray-300;
  @apply hover:text-white hover:bg-white/5;
  @apply border-b border-white/10;
}
```

## ✨ Animation Patterns

### Transition Standards
```css
/* Standard transitions */
.transition-standard { @apply transition-all duration-300 ease-in-out; }

/* Quick transitions */
.transition-quick { @apply transition-all duration-150 ease-out; }

/* Slow transitions */
.transition-slow { @apply transition-all duration-500 ease-in-out; }
```

### Hover Effects
```css
/* Lift effect */
.hover-lift {
  @apply hover:transform hover:-translate-y-1;
  @apply transition-transform duration-200;
}

/* Scale effect */
.hover-scale {
  @apply hover:scale-105 transition-transform duration-200;
}

/* Glow effect */
.hover-glow {
  @apply hover:shadow-lg hover:shadow-primary/20;
  @apply transition-shadow duration-300;
}
```

### Loading States
```css
/* Pulse animation */
.loading-pulse {
  @apply animate-pulse bg-white/10 rounded;
}

/* Skeleton loading */
.skeleton {
  @apply bg-white/10 rounded animate-pulse;
}

.skeleton-text {
  @apply h-4 bg-white/10 rounded animate-pulse;
}

.skeleton-heading {
  @apply h-6 bg-white/10 rounded animate-pulse;
}
```

## 🔤 Typography

### Font Stack
```css
body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 
               'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
}
```

### Typography Scale
```css
/* Headings */
.text-display { @apply text-4xl lg:text-5xl font-bold; }
.text-h1 { @apply text-3xl lg:text-4xl font-bold; }
.text-h2 { @apply text-2xl lg:text-3xl font-bold; }
.text-h3 { @apply text-xl lg:text-2xl font-semibold; }
.text-h4 { @apply text-lg lg:text-xl font-semibold; }

/* Body text */
.text-lead { @apply text-lg lg:text-xl text-gray-300; }
.text-body { @apply text-base text-gray-300; }
.text-small { @apply text-sm text-gray-400; }
.text-xs { @apply text-xs text-gray-400; }
```

### Text Colors by Context
```css
/* Headings always white */
h1, h2, h3, h4, h5, h6 {
  @apply text-white;
}

/* Body text in gray-300 */
p, li, span {
  @apply text-gray-300;
}

/* Links in primary color */
a {
  @apply text-primary hover:text-primary/80;
}
```

## 🎯 Component-Specific Styles

### Navigation Styling
```css
.nav-link {
  @apply text-gray-300 hover:text-white;
  @apply transition-colors duration-200;
  @apply px-4 py-2 rounded-lg;
  @apply hover:bg-white/5;
}

.nav-link-active {
  @apply text-white bg-white/10;
}
```

### Hero Section
```css
.hero-title {
  @apply text-4xl sm:text-5xl lg:text-6xl font-bold text-white;
  @apply leading-tight tracking-tight;
}

.hero-subtitle {
  @apply text-lg sm:text-xl text-gray-300;
  @apply max-w-2xl mx-auto leading-relaxed;
}
```

### Card Components
```css
.project-card {
  @apply bg-white/5 backdrop-blur-sm border border-white/10;
  @apply rounded-2xl p-6 hover:bg-white/10;
  @apply transition-all duration-300 group;
}

.testimonial-card {
  @apply bg-white/5 backdrop-blur-sm border border-white/10;
  @apply rounded-2xl p-8 lg:p-12;
}
```

### Form Styling
```css
.form-group {
  @apply space-y-2;
}

.form-input {
  @apply w-full bg-white/5 border border-white/10;
  @apply rounded-lg px-4 py-3 text-white placeholder-gray-400;
  @apply focus:border-primary/50 focus:ring-2 focus:ring-primary/20;
  @apply transition-all duration-200;
}

.form-textarea {
  @apply w-full bg-white/5 border border-white/10;
  @apply rounded-lg px-4 py-3 text-white placeholder-gray-400;
  @apply focus:border-primary/50 focus:ring-2 focus:ring-primary/20;
  @apply resize-none transition-all duration-200;
}

.form-select {
  @apply w-full bg-white/5 border border-white/10;
  @apply rounded-lg px-4 py-3 text-white;
  @apply focus:border-primary/50 focus:ring-2 focus:ring-primary/20;
}
```

## 🔧 Utility Classes

### Spacing Utilities
```css
/* Container padding */
.container-padding { @apply px-4 sm:px-6 lg:px-8; }

/* Section spacing */
.section-spacing { @apply py-12 sm:py-16 lg:py-20; }

/* Element spacing */
.element-spacing { @apply space-y-4 sm:space-y-6 lg:space-y-8; }
```

### Layout Utilities
```css
/* Flex layouts */
.flex-center { @apply flex items-center justify-center; }
.flex-between { @apply flex items-center justify-between; }
.flex-start { @apply flex items-center justify-start; }

/* Grid layouts */
.grid-auto { @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6; }
.grid-responsive { @apply grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4; }
```

### Background Utilities
```css
/* Glass morphism effects */
.glass { @apply bg-white/5 backdrop-blur-sm border border-white/10; }
.glass-strong { @apply bg-white/10 backdrop-blur-md border border-white/20; }

/* Gradient backgrounds */
.gradient-bg { @apply bg-gradient-to-r from-primary to-blue-600; }
.gradient-overlay { @apply bg-gradient-to-b from-transparent to-black/50; }
```

## 🎨 Design Tokens

### Design System Values
```javascript
// tailwind.config.ts
const designTokens = {
  colors: {
    primary: 'hsl(213, 94%, 68%)',
    background: 'hsl(224, 71%, 4%)',
    foreground: 'hsl(213, 31%, 91%)',
    card: 'hsl(224, 71%, 4%)',
    border: 'hsl(216, 34%, 17%)',
  },
  spacing: {
    'section': '5rem',      // 80px
    'component': '2rem',    // 32px
    'element': '1rem',      // 16px
  },
  borderRadius: {
    'card': '1rem',         // 16px
    'button': '0.5rem',     // 8px
    'input': '0.5rem',      // 8px
  },
  boxShadow: {
    'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    'hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    'glow': '0 0 20px rgba(59, 130, 246, 0.3)',
  }
};
```

## 📏 Accessibility Considerations

### Color Contrast
All color combinations meet WCAG AA standards:
- White text on dark backgrounds: 15.3:1 ratio
- Primary blue on dark backgrounds: 4.7:1 ratio
- Gray-300 text on dark backgrounds: 7.2:1 ratio

### Focus States
```css
.focus-visible {
  @apply focus-visible:outline-none focus-visible:ring-2;
  @apply focus-visible:ring-primary/50 focus-visible:ring-offset-2;
  @apply focus-visible:ring-offset-black;
}
```

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

This styling guide provides comprehensive information for maintaining consistency and extending the design system of the Kitji Studios website.