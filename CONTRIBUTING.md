# Contributing to Kitji Studios Website

Thank you for your interest in contributing to the Kitji Studios website! This document provides guidelines and information for contributors.

## 🏗️ Architecture Overview

This project uses a hybrid architecture:
- **Frontend**: React 18 + TypeScript + Vite + TailwindCSS
- **Backend**: ASP.NET Core 8.0 + Entity Framework Core
- **Database**: Entity Framework with In-Memory provider (production-ready for SQL Server/PostgreSQL)
- **Email**: SendGrid integration with HTML templates

## 📋 Prerequisites

Before contributing, ensure you have:
- Node.js 18+ (for React frontend)
- .NET 8.0 SDK (for ASP.NET Core backend)
- Git
- A code editor (VS Code recommended)

## 🚀 Getting Started

### 1. Fork and Clone

```bash
# Fork the repository on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/kitji-studios-website.git
cd kitji-studios-website

# Add the original repository as upstream
git remote add upstream https://github.com/original-owner/kitji-studios-website.git
```

### 2. Install Dependencies

```bash
# Install Node.js dependencies for React frontend
npm install

# Restore .NET dependencies for ASP.NET Core backend
cd Server.NET
dotnet restore
cd ..
```

### 3. Environment Setup

```bash
# Copy environment template
cp .env.example .env

# Edit .env with your configuration
# At minimum, you'll need:
# - VITE_API_BASE_URL=http://localhost:5001
# - SENDGRID_API_KEY or RESEND_API_KEY for email testing
```

### 4. Start Development Servers

```bash
# Terminal 1: Start ASP.NET Core API (Port 5001)
cd Server.NET
dotnet run

# Terminal 2: Start React dev server (Port 5173)
npm run dev
```

## 🔧 Development Workflow

### Branch Naming Convention

- `feature/description` - New features
- `bugfix/description` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring

### Commit Message Format

Follow conventional commits:

```
type(scope): description

Examples:
feat(contact): add form validation
fix(api): resolve email sending issue
docs(readme): update installation instructions
style(ui): improve button hover effects
```

### Development Process

1. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**
   - Follow the coding standards below
   - Test your changes thoroughly
   - Update documentation if needed

3. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat(scope): description"
   ```

4. **Push and Create PR**
   ```bash
   git push origin feature/your-feature-name
   # Create Pull Request on GitHub
   ```

## 📝 Coding Standards

### TypeScript/React Standards

- Use TypeScript for all React components
- Follow functional component pattern with hooks
- Use proper TypeScript interfaces for props and state
- Implement proper error boundaries
- Use React Hook Form for forms with Zod validation

```typescript
// Good: Proper TypeScript interface
interface ContactFormProps {
  onSubmit: (data: ContactFormData) => void;
  isLoading: boolean;
}

// Good: Functional component with proper typing
const ContactForm: React.FC<ContactFormProps> = ({ onSubmit, isLoading }) => {
  // Component logic
};
```

### C# ASP.NET Core Standards

- Follow C# naming conventions (PascalCase for public members)
- Use proper async/await patterns
- Implement proper dependency injection
- Use FluentValidation for input validation
- Follow repository pattern for data access

```csharp
// Good: Proper service interface
public interface IContactService
{
    Task<ContactSubmission> CreateContactSubmissionAsync(ContactSubmissionRequest request);
}

// Good: Proper async implementation
public async Task<ContactSubmission> CreateContactSubmissionAsync(ContactSubmissionRequest request)
{
    // Implementation with proper error handling
}
```

### CSS/Styling Standards

- Use TailwindCSS utility classes
- Follow mobile-first responsive design
- Maintain dark theme consistency
- Use CSS custom properties for theme colors
- Implement proper hover and focus states

### File Organization

```
client/src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and configuration
└── types/              # TypeScript type definitions

Server.NET/
├── Controllers/        # API endpoints
├── Services/           # Business logic
├── Models/            # Data models and DTOs
├── Data/              # Entity Framework configuration
└── Middleware/        # Custom middleware
```

## 🧪 Testing Guidelines

### Frontend Testing

- Write unit tests for utilities and hooks
- Write integration tests for components
- Test API integration with mock services
- Ensure accessibility compliance

```bash
# Run frontend tests
npm test

# Run with coverage
npm run test:coverage
```

### Backend Testing

- Write unit tests for services and utilities
- Write integration tests for controllers
- Test database operations
- Test email functionality with mock providers

```bash
# Run backend tests
cd Server.NET
dotnet test

# Run with coverage
dotnet test --collect:"XPlat Code Coverage"
```

## 📖 Documentation Requirements

### Code Documentation

- Document all public APIs
- Use JSDoc for TypeScript functions
- Use XML comments for C# methods
- Include examples in complex functions

### Component Documentation

- Document component props and usage
- Include Storybook stories for UI components
- Provide usage examples
- Document accessibility features

### API Documentation

- Document all endpoints with OpenAPI/Swagger
- Include request/response examples
- Document error responses
- Provide authentication details

## 🎨 Design Guidelines

### UI/UX Principles

- **Dark Theme**: Maintain black/blue color scheme
- **Accessibility**: WCAG 2.1 AA compliance
- **Responsive**: Mobile-first approach
- **Performance**: Optimize for Core Web Vitals
- **Animation**: Smooth, purposeful transitions

### Component Design

- Use consistent spacing (Tailwind's spacing scale)
- Implement proper loading states
- Provide clear error messages
- Include hover and focus indicators

## 🔒 Security Guidelines

### Frontend Security

- Sanitize all user inputs
- Validate data before API calls
- Use HTTPS in production
- Implement proper CSP headers

### Backend Security

- Use FluentValidation for all inputs
- Implement proper CORS policies
- Use parameterized queries
- Log security events appropriately

## 📊 Performance Guidelines

### Frontend Performance

- Lazy load components and routes
- Optimize images (WebP format)
- Minimize bundle size
- Implement proper caching strategies

### Backend Performance

- Use async/await consistently
- Optimize database queries
- Implement response caching
- Use connection pooling

## 🐛 Bug Reports

When reporting bugs, include:

1. **Environment**: OS, browser, .NET version
2. **Steps to Reproduce**: Clear, numbered steps
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happens
5. **Screenshots**: If applicable
6. **Console Errors**: Browser console or server logs

## 💡 Feature Requests

For new features, provide:

1. **Problem Statement**: What problem does this solve?
2. **Proposed Solution**: How should it work?
3. **User Stories**: Who benefits and how?
4. **Technical Considerations**: Implementation notes
5. **Mockups**: Visual designs if applicable

## 📋 Pull Request Guidelines

### Before Submitting

- [ ] Code follows project standards
- [ ] Tests pass locally
- [ ] Documentation is updated
- [ ] No console errors or warnings
- [ ] Accessibility requirements met
- [ ] Performance impact considered

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature  
- [ ] Documentation update
- [ ] Refactoring

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests pass
- [ ] Manual testing completed

## Screenshots (if applicable)
[Add screenshots here]

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes
```

## 🔄 Review Process

1. **Automated Checks**: CI/CD pipeline runs tests
2. **Code Review**: Maintainer reviews code quality
3. **Testing**: Changes tested in staging environment
4. **Approval**: Approved changes merged to main
5. **Deployment**: Changes deployed to production

## 🎯 Areas for Contribution

### High Priority
- Additional page components (Services, Products, Team, Work)
- Admin dashboard for contact management
- Enhanced email templates
- Performance optimizations

### Medium Priority
- Unit test coverage improvements
- Accessibility enhancements
- SEO optimizations
- Analytics integration

### Good First Issues
- Documentation improvements
- UI polish and animations
- Error message improvements
- Code style consistency

## 📞 Getting Help

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and ideas
- **Email**: sales@kitjistudios.com for urgent matters

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🙏 Recognition

Contributors will be acknowledged in:
- README.md contributors section
- CHANGELOG.md for significant changes
- GitHub releases for version contributions

---

Thank you for contributing to the Kitji Studios website! Your efforts help showcase enterprise-grade software development capabilities.