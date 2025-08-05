# Kitji Studios Website - React + ASP.NET Core

A sophisticated full-stack web application showcasing Kitji Studios' enterprise software development capabilities. Features a React TypeScript frontend with an ASP.NET Core backend, maintaining premium dark-themed design with smooth animations and interactive elements.

## 🏗️ Architecture Overview

This project uses a hybrid architecture combining the best of both worlds:

- **Frontend**: React 18 + TypeScript + Vite + TailwindCSS
- **Backend**: ASP.NET Core 8.0 + Entity Framework Core + FluentValidation
- **Database**: Entity Framework with In-Memory provider (production-ready for SQL Server/PostgreSQL)
- **Email**: SendGrid integration with HTML templates
- **Deployment**: Ready for both development and production environments

## 📁 Project Structure

```
├── client/                          # React Frontend
│   ├── src/
│   │   ├── components/              # Reusable UI components
│   │   │   ├── Contact.tsx          # Contact form with ASP.NET integration
│   │   │   ├── Navigation.tsx       # Responsive navigation
│   │   │   └── ScrollAnimatedHero.tsx # Hero section with animations
│   │   ├── pages/                   # Page components
│   │   │   ├── home.tsx            # Landing page
│   │   │   ├── about.tsx           # Company information
│   │   │   └── not-found.tsx       # 404 page
│   │   ├── lib/
│   │   │   └── queryClient.ts      # HTTP client with ASP.NET support
│   │   └── hooks/                  # Custom React hooks
│   └── index.html
├── Server.NET/                      # ASP.NET Core Backend
│   ├── Controllers/
│   │   └── ContactController.cs     # API endpoints
│   ├── Services/
│   │   ├── ContactService.cs        # Business logic
│   │   └── EmailService.cs          # Email handling
│   ├── Models/
│   │   └── ContactSubmission.cs     # Data models & DTOs
│   ├── Data/
│   │   └── ApplicationDbContext.cs  # Entity Framework setup
│   └── Program.cs                   # Application startup
├── docs/                           # Comprehensive documentation
│   ├── architecture/               # System design diagrams
│   ├── api/                        # API documentation
│   └── components/                 # Component documentation
└── server/                         # Original Node.js backend (legacy)
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ (for React frontend)
- .NET 8.0 SDK (for ASP.NET Core backend)
- SendGrid API key (for email functionality)

### Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd kitji-studios-website
   ```

2. **Setup React Frontend**
   ```bash
   cd client
   npm install
   ```

3. **Setup ASP.NET Core Backend**
   ```bash
   cd Server.NET
   dotnet restore
   dotnet build
   ```

4. **Configure Environment Variables**
   ```bash
   # Create .env file in root directory
   VITE_API_BASE_URL=http://localhost:5001
   SENDGRID_API_KEY=your_sendgrid_api_key_here
   RESEND_API_KEY=your_resend_api_key_here  # Alternative to SendGrid
   ```

5. **Start Development Servers**
   
   **Option A: React Frontend + ASP.NET Backend**
   ```bash
   # Terminal 1: Start ASP.NET Core API (Port 5001)
   cd Server.NET
   dotnet run
   
   # Terminal 2: Start React dev server (Port 5173)
   cd client
   npm run dev
   ```
   
   **Option B: React Frontend + Node.js Backend (Legacy)**
   ```bash
   # Single terminal: Start both servers
   npm run dev
   ```

6. **Access the Application**
   - Frontend: http://localhost:5173
   - ASP.NET API: http://localhost:5001
   - API Documentation: http://localhost:5001/api/docs

## 🔧 Key Features

### Frontend Features
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark Theme**: Premium black/blue color scheme throughout
- **Smooth Animations**: Scroll-based transitions and micro-interactions
- **Interactive Elements**: Clickable hero tiles, hover effects
- **Form Validation**: Real-time validation with user-friendly messages
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support

### Backend Features
- **RESTful API**: Clean, documented endpoints
- **Data Validation**: FluentValidation with detailed error messages
- **Email Integration**: Professional HTML email templates
- **Error Handling**: Comprehensive error responses and logging
- **Database Ready**: Entity Framework with migration support
- **CORS Configured**: Properly configured for React frontend

### Business Features
- **Contact Form**: Project inquiry form with budget selection
- **Email Notifications**: Automated emails to sales team and customers
- **Admin Interface**: (Future) Dashboard for managing inquiries
- **Analytics Ready**: Structured for future analytics integration

## 📄 API Documentation

The ASP.NET Core backend provides a comprehensive API for contact form management:

### Contact Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/contact` | Submit contact form |
| GET | `/api/contact` | Get all submissions (admin) |
| GET | `/api/contact/paginated` | Get paginated submissions |
| GET | `/api/contact/{id}` | Get specific submission |
| GET | `/api/contact/email-status` | Check email service status |

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | API health status |

For detailed API documentation, see [`docs/api/CONTACT_API_DOCUMENTATION.md`](docs/api/CONTACT_API_DOCUMENTATION.md).

## 🔄 Data Flow

### Contact Form Submission Flow

1. **User Input**: User fills contact form in React frontend
2. **Client Validation**: React Hook Form + Zod validation
3. **API Request**: HTTP POST to `/api/contact` endpoint
4. **Server Validation**: FluentValidation in ASP.NET Core
5. **Database Storage**: Entity Framework saves to database
6. **Email Notifications**: SendGrid sends emails to sales team and user
7. **Response**: Success/error response back to React frontend
8. **UI Update**: Success message or error display

For detailed data flow diagrams, see [`docs/architecture/DATA_FLOW_DIAGRAMS.md`](docs/architecture/DATA_FLOW_DIAGRAMS.md).

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#3b82f6) - Used for CTAs and highlights
- **Background**: Black (#000000) - Main background
- **Foreground**: White (#ffffff) - Primary text
- **Muted**: Gray variations for secondary content

### Typography
- **Headings**: Bold, large text for hierarchy
- **Body**: Clean, readable font with proper line spacing
- **Interactive**: Hover states and active indicators

### Components
- **Cards**: Semi-transparent backgrounds with blur effects
- **Buttons**: Gradient backgrounds with hover animations
- **Forms**: Consistent styling with validation states

## 🔐 Security Features

### Frontend Security
- **Input Sanitization**: XSS prevention on all user inputs
- **CSRF Protection**: Token-based validation (future)
- **Content Security Policy**: Restrictive CSP headers

### Backend Security
- **Input Validation**: Comprehensive validation with FluentValidation
- **CORS Policy**: Restricted to frontend origins only
- **Rate Limiting**: Protection against form spam (future)
- **SQL Injection Prevention**: Entity Framework parameterized queries

## 📊 Monitoring & Logging

### Frontend Monitoring
- **Error Tracking**: Client-side error logging
- **Performance Metrics**: Core Web Vitals tracking
- **User Analytics**: Interaction tracking (future)

### Backend Logging
- **Structured Logging**: Serilog with JSON output
- **Request Logging**: All API requests logged
- **Error Tracking**: Detailed error information
- **Performance Monitoring**: Request timing and database queries

## 🚀 Deployment

### Development Deployment
```bash
# Build React frontend
cd client
npm run build

# Publish ASP.NET Core backend
cd Server.NET
dotnet publish -c Release -o ../dist/backend
```

### Production Deployment

#### Option 1: Separate Deployments
- **Frontend**: Deploy to Vercel, Netlify, or CDN
- **Backend**: Deploy to Azure App Service, AWS ECS, or similar

#### Option 2: Single ASP.NET Host
- Configure ASP.NET Core to serve React build files
- Deploy as single application to Azure, AWS, or on-premises

For detailed deployment instructions, see [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md).

## 🧪 Testing

### Frontend Testing
```bash
cd client
npm run test          # Unit tests with Jest
npm run test:e2e      # End-to-end tests with Playwright
npm run test:coverage # Coverage report
```

### Backend Testing
```bash
cd Server.NET
dotnet test           # Unit and integration tests
dotnet test --collect:"XPlat Code Coverage"  # Coverage report
```

## 📈 Performance

### Frontend Optimizations
- **Code Splitting**: Route-based lazy loading
- **Image Optimization**: WebP format with fallbacks
- **Bundle Analysis**: Tree shaking and minification
- **Caching**: Service worker caching strategy

### Backend Optimizations
- **Database**: Optimized Entity Framework queries
- **Caching**: In-memory caching for static data
- **Compression**: Response compression middleware
- **Connection Pooling**: Efficient database connections

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript/C# coding standards
- Write tests for new features
- Update documentation as needed
- Ensure accessibility compliance

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For questions and support:
- **Email**: sales@kitjistudios.com
- **Documentation**: See the `docs/` directory
- **Issues**: Create a GitHub issue

## 🔗 Related Documentation

- [React Components Documentation](docs/components/REACT_COMPONENTS_DOCUMENTATION.md)
- [ASP.NET API Documentation](docs/api/CONTACT_API_DOCUMENTATION.md)
- [Architecture Workflow](docs/architecture/REACT_ASPNET_WORKFLOW.md)
- [Data Flow Diagrams](docs/architecture/DATA_FLOW_DIAGRAMS.md)

---

**Built with ❤️ by Kitji Studios** - Showcasing enterprise-grade software development capabilities.