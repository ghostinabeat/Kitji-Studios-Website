# Contributing to Kitji Studios Website

Thank you for your interest in contributing to the Kitji Studios website! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Git
- Basic knowledge of React, TypeScript, and Tailwind CSS
- Familiarity with modern web development practices

### Development Setup
1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/kitji-website.git
   cd kitji-website
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Copy environment variables:
   ```bash
   cp .env.example .env
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

## 📋 Development Guidelines

### Code Style
- **TypeScript**: Use strict TypeScript with proper typing
- **React**: Use functional components with hooks
- **Styling**: Use Tailwind CSS classes, avoid custom CSS unless necessary
- **Components**: Create small, reusable components with single responsibilities
- **Naming**: Use descriptive names for components, functions, and variables

### File Structure
```
client/src/
├── components/          # Reusable UI components
│   ├── ui/             # Basic UI primitives (buttons, inputs, etc.)
│   ├── layout/         # Layout components (header, footer, navigation)
│   └── features/       # Feature-specific components
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and configurations
└── types/              # TypeScript type definitions
```

### Component Guidelines
1. **Component Structure**:
   ```typescript
   interface ComponentProps {
     // Define props with TypeScript
   }
   
   export default function Component({ prop1, prop2 }: ComponentProps) {
     // Component logic
     return (
       <div className="tailwind-classes">
         {/* JSX content */}
       </div>
     );
   }
   ```

2. **Styling Conventions**:
   - Use Tailwind CSS utility classes
   - Follow mobile-first responsive design
   - Maintain dark theme consistency
   - Use semantic color tokens (primary, secondary, etc.)

3. **State Management**:
   - Use React hooks for local state
   - Use TanStack Query for server state
   - Keep state as close to components as needed

### Dark Theme Guidelines
The website uses a consistent dark theme. When adding new components:

- **Background Colors**: `bg-black/90`, `bg-white/5`, `bg-white/10`
- **Text Colors**: `text-white` (headings), `text-gray-300` (body text)
- **Borders**: `border-white/10`, `border-white/20`
- **Cards**: `bg-white/5 backdrop-blur-sm border border-white/10`
- **Accent Color**: Use `text-primary` for the blue accent color

### Animation Guidelines
- Use Framer Motion for complex animations
- Follow the existing scroll-based fade pattern
- Keep animations subtle and professional
- Ensure animations don't interfere with accessibility

## 🛠 Pull Request Process

### Before Submitting
1. **Test your changes thoroughly**:
   ```bash
   npm run check    # TypeScript type checking
   npm run build    # Production build test
   ```

2. **Ensure responsive design**:
   - Test on mobile, tablet, and desktop viewports
   - Verify dark theme consistency
   - Check animation performance

3. **Follow commit message format**:
   ```
   type(scope): description
   
   feat(contact): add project budget selection
   fix(hero): resolve scroll animation timing
   docs(readme): update installation instructions
   style(ui): improve button hover states
   refactor(api): simplify email service logic
   ```

### Pull Request Template
```markdown
## Description
Brief description of changes made.

## Type of Change
- [ ] Bug fix (non-breaking change that fixes an issue)
- [ ] New feature (non-breaking change that adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work)
- [ ] Documentation update

## Testing
- [ ] Tested on desktop browsers (Chrome, Firefox, Safari)
- [ ] Tested on mobile devices
- [ ] Dark theme consistency verified
- [ ] Animations working smoothly
- [ ] Form validation working correctly

## Screenshots
Include screenshots of significant UI changes.

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added to complex code sections
- [ ] Documentation updated if needed
```

## 🐛 Bug Reports

### Before Reporting
- Search existing issues to avoid duplicates
- Test on multiple browsers and devices
- Clear browser cache and try again

### Bug Report Template
```markdown
**Bug Description**
Clear description of the bug.

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. Scroll to '...'
4. See error

**Expected Behavior**
What should happen.

**Screenshots**
Add screenshots if applicable.

**Environment**
- OS: [e.g., macOS, Windows, Linux]
- Browser: [e.g., Chrome 91, Firefox 89]
- Device: [e.g., iPhone 12, Desktop]
- Screen size: [e.g., 1920x1080, 375x667]
```

## 💡 Feature Requests

### Feature Request Template
```markdown
**Feature Description**
Clear description of the proposed feature.

**Problem It Solves**
What problem does this feature address?

**Proposed Solution**
Detailed description of the solution.

**Alternatives Considered**
Other approaches you've considered.

**Additional Context**
Screenshots, mockups, or examples.
```

## 📝 Documentation

### Code Documentation
- Add JSDoc comments for complex functions
- Document component props with TypeScript interfaces
- Include usage examples for reusable components

### README Updates
- Update installation instructions if dependencies change
- Document new environment variables
- Update feature list for significant additions

## 🎨 Design Contributions

### UI/UX Improvements
- Follow the existing design system
- Maintain brand consistency
- Ensure accessibility compliance
- Test with screen readers when possible

### Asset Guidelines
- Use SVG for icons and simple graphics
- Optimize images for web (WebP format preferred)
- Maintain consistent visual style
- Follow brand colors and typography

## 🚀 Deployment

### Staging Environment
- All PRs are automatically deployed to staging
- Test your changes in the staging environment
- Verify functionality before requesting review

### Production Deployment
- Only maintainers can deploy to production
- All changes must pass code review
- Automated tests must pass
- Performance impact must be considered

## 📞 Getting Help

### Communication Channels
- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and general discussion
- **Email**: contact@kitjistudios.com for private inquiries

### Code Review Process
1. Submit your pull request
2. Automated checks will run
3. A maintainer will review your code
4. Address any feedback or requested changes
5. Once approved, your PR will be merged

## 🏆 Recognition

Contributors will be recognized in:
- GitHub contributors list
- Project documentation
- Release notes for significant contributions

Thank you for contributing to the Kitji Studios website! Your efforts help us showcase our capabilities and serve our clients better.