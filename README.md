# Kitji Studios - Enterprise Software Development Company Website

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

A sophisticated, dark-themed React-based website for Kitji Studios, showcasing enterprise software development capabilities with advanced scroll animations and modern UI components.

## 🚀 Features

### 🎨 Design & User Experience
- **Premium Dark Theme**: Consistent black/blue color palette across all pages
- **Scroll-Based Animations**: Hero-style fade transitions using Framer Motion
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Accessibility**: Built on Radix UI primitives for screen reader compatibility
- **Enterprise Aesthetics**: Professional layout targeting banking, insurance, and government sectors

### 🛠 Technical Stack
- **Frontend**: React 18 with TypeScript and Vite
- **Backend**: Express.js REST API with TypeScript
- **Database**: PostgreSQL with Drizzle ORM (configured for future expansion)
- **Styling**: Tailwind CSS with shadcn/ui components
- **Animations**: Framer Motion for scroll-triggered transitions
- **Forms**: React Hook Form with Zod validation
- **Email**: Resend integration for contact form submissions
- **Routing**: Wouter for client-side navigation

### 📄 Pages & Functionality
- **Homepage**: Enhanced hero section with enterprise messaging and service previews
- **About**: Company overview and value propositions
- **Services**: Business solutions with case studies and testimonials
- **Products**: Flagship products (Utell, Pelas, WhatsApp Business Integration)
- **Team**: Real team members with authentic specializations
- **Work**: Project showcase with interactive filtering and detailed case studies
- **Contact**: Comprehensive contact form with project scoping and budget selection

## 🏗 Project Structure

```
kitji-studios/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility functions and configurations
│   │   ├── App.tsx        # Main application component
│   │   ├── main.tsx       # Application entry point
│   │   └── index.css      # Global styles and theme
│   └── index.html         # HTML template
├── server/                # Backend Express.js application
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API route definitions
│   ├── storage.ts        # Data storage interface
│   ├── email.ts          # Email service integration
│   └── vite.ts           # Vite development server integration
├── shared/               # Shared types and schemas
│   └── schema.ts         # Zod schemas and TypeScript types
├── docs/                 # Project documentation
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── tailwind.config.ts    # Tailwind CSS configuration
├── vite.config.ts        # Vite build configuration
└── README.md            # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL database (optional, uses in-memory storage by default)
- Resend API key for email functionality

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kitji-studios/kitji-website.git
   cd kitji-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Required environment variables:
   ```env
   RESEND_API_KEY=your_resend_api_key_here
   ```
   
   Optional (for database functionality):
   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/kitji_db
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5000`

### Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 🛠 Development

### Available Scripts

```bash
npm run dev      # Start development server with hot reload
npm run build    # Build for production
npm start        # Start production server
npm run check    # Run TypeScript type checking
npm run db:push  # Push database schema changes (when using database)
```

### Code Style & Architecture

This project follows modern React and TypeScript best practices:

- **TypeScript-first**: Full type safety across frontend and backend
- **Component Architecture**: Small, reusable components with clear responsibilities
- **Custom Hooks**: Business logic extracted into reusable hooks
- **Schema Validation**: Zod schemas for runtime type checking
- **Error Boundaries**: Graceful error handling and user feedback
- **Performance**: Optimized with React Query for efficient data fetching

### Key Components

#### Core UI Components
- `ScrollAnimatedHero`: Main hero section with scroll-based fade animations
- `Navigation`: Responsive navigation with mobile menu
- `Contact`: Contact form with validation and email integration
- `ProjectShowcase`: Interactive project gallery with filtering
- `TestimonialCarousel`: Auto-playing testimonial carousel

#### Feature Components
- `CloudProducts`: Product showcase for Utell and Pelas
- `Services`: Service presentation with case studies
- `Team`: Team member profiles
- `Footer`: Site footer with contact information

## 🎨 Design System

### Color Palette
```css
/* Primary Colors */
--primary: 213 94% 68%        /* Blue accent */
--background: 224 71% 4%      /* Dark background */
--foreground: 213 31% 91%     /* Light text */

/* Surface Colors */
--card: 224 71% 4%            /* Card backgrounds */
--muted: 215 28% 17%          /* Muted backgrounds */
--border: 216 34% 17%         /* Border colors */
```

### Typography
- **Headings**: Inter font family, bold weights
- **Body**: Inter font family, regular weight
- **Scale**: Responsive typography using Tailwind's type scale

### Spacing & Layout
- **Grid System**: CSS Grid and Flexbox for layouts
- **Breakpoints**: Mobile-first responsive design
- **Spacing**: Consistent 8px base unit system

## 📧 Email Integration

The contact form integrates with Resend for reliable email delivery:

```typescript
// server/email.ts
export async function sendContactEmail(data: ContactFormData) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  
  await resend.emails.send({
    from: 'noreply@kitjistudios.com',
    to: 'contact@kitjistudios.com',
    subject: `New Contact: ${data.subject}`,
    html: generateEmailTemplate(data)
  });
}
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment
```bash
# Build the application
npm run build

# Deploy dist/public (frontend) and dist/index.js (backend) to your hosting provider
```

### Environment Variables for Production
```env
NODE_ENV=production
RESEND_API_KEY=your_production_api_key
DATABASE_URL=your_production_database_url (optional)
```

## 🤝 Contributing

We welcome contributions to improve the Kitji Studios website. Please follow these guidelines:

### Development Workflow
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code Standards
- Follow existing TypeScript and React patterns
- Use meaningful component and variable names
- Add JSDoc comments for complex functions
- Ensure responsive design for all changes
- Test on multiple browsers and devices

### Commit Message Format
```
type(scope): description

feat(contact): add project budget selection
fix(hero): resolve scroll animation timing
docs(readme): update installation instructions
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏢 About Kitji Studios

Kitji Studios is an enterprise software development company specializing in:

- **Web3 & Blockchain Solutions**: Decentralized identity platforms (Utell)
- **Enterprise Software**: Resource management systems (Pelas)
- **Communication Platforms**: WhatsApp Business integration
- **Banking & FinTech**: Real-time payment systems
- **Government Solutions**: Secure, compliant software systems

### Flagship Products
- **Utell**: Web3 trust platform with IAAM capabilities
- **Pelas**: Personalized Electronic Ledger Accounting System
- **WhatsApp Business Integration**: Enterprise communication solutions

### Contact Information
- **Website**: [kitjistudios.com](https://kitjistudios.com)
- **Email**: contact@kitjistudios.com
- **Location**: Caribbean Region

---

Built with ❤️ by the Kitji Studios team