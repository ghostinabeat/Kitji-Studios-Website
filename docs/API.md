# API Documentation

## 🚀 API Overview

The Kitji Studios website backend provides a RESTful API built with Express.js and TypeScript. The API handles contact form submissions, integrates with external email services, and provides endpoints for future feature expansion.

## 🌐 Base URL

- **Development**: `http://localhost:5000/api`
- **Production**: `https://kitjistudios.com/api`

## 🔐 Authentication

Currently, the API does not require authentication for public endpoints. Future versions may implement API key authentication for administrative functions.

## 📡 API Endpoints

### Health Check
Check API status and server health.

```http
GET /api/health
```

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "version": "1.0.0"
}
```

**Status Codes:**
- `200 OK`: API is healthy and operational

---

### Contact Form Submission
Submit a contact form with project details.

```http
POST /api/contact
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "subject": "Enterprise Software Development Inquiry",
  "message": "We're interested in developing a custom banking solution...",
  "budget": "$50,000 - $100,000",
  "timeline": "3-6 months"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Contact form submitted successfully",
  "id": "contact_123456789",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

**Response (Validation Error):**
```json
{
  "success": false,
  "error": "Validation failed",
  "details": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

**Response (Server Error):**
```json
{
  "success": false,
  "error": "Internal server error",
  "message": "Failed to send email"
}
```

**Status Codes:**
- `200 OK`: Form submitted successfully
- `400 Bad Request`: Validation errors or malformed request
- `429 Too Many Requests`: Rate limit exceeded
- `500 Internal Server Error`: Server or email service error

**Request Validation:**
```typescript
interface ContactFormData {
  name: string;        // Required, 2-100 characters
  email: string;       // Required, valid email format
  subject: string;     // Required, 5-200 characters
  message: string;     // Required, 10-2000 characters
  budget: string;      // Required, from predefined options
  timeline: string;    // Required, from predefined options
}
```

**Budget Options:**
- "Under $10,000"
- "$10,000 - $25,000"
- "$25,000 - $50,000"
- "$50,000 - $100,000"
- "$100,000 - $250,000"
- "Over $250,000"
- "Let's discuss"

**Timeline Options:**
- "1-3 months"
- "3-6 months"
- "6-12 months"
- "12+ months"
- "Flexible"

---

## 📧 Email Integration

### Email Service
The API integrates with Resend for reliable email delivery.

**Email Template:**
Contact form submissions generate professional HTML emails with:
- Client contact information
- Project details and requirements
- Budget and timeline information
- Formatted for easy reading and response

**Email Recipients:**
- Primary: `contact@kitjistudios.com`
- CC: Additional team members (configurable)

### Email Delivery Status
The API handles email delivery status:

**Success**: Email sent successfully to recipients
**Retry**: Temporary failures are retried automatically
**Failure**: Permanent failures are logged and reported

---

## 🔧 Error Handling

### Error Response Format
All API errors follow a consistent format:

```json
{
  "success": false,
  "error": "Error category",
  "message": "Human-readable error description",
  "details": [/* Additional error details */],
  "timestamp": "2024-01-15T10:30:00.000Z",
  "requestId": "req_123456789"
}
```

### Error Categories

**Validation Errors** (`400 Bad Request`)
```json
{
  "success": false,
  "error": "Validation failed",
  "details": [
    {
      "field": "email",
      "message": "Invalid email format",
      "received": "invalid-email"
    }
  ]
}
```

**Rate Limiting** (`429 Too Many Requests`)
```json
{
  "success": false,
  "error": "Rate limit exceeded",
  "message": "Too many requests from this IP",
  "retryAfter": 3600
}
```

**Server Errors** (`500 Internal Server Error`)
```json
{
  "success": false,
  "error": "Internal server error",
  "message": "An unexpected error occurred",
  "requestId": "req_123456789"
}
```

---

## 🛡 Security

### Rate Limiting
- **Contact Form**: 5 submissions per hour per IP address
- **Health Check**: 100 requests per minute per IP address

### Input Validation
- All input is validated using Zod schemas
- HTML content is sanitized to prevent XSS
- Email addresses are validated for format and deliverability

### CORS Policy
```javascript
const corsOptions = {
  origin: [
    'https://kitjistudios.com',
    'https://www.kitjistudios.com',
    // Development origins
    'http://localhost:5000',
    'http://localhost:3000'
  ],
  credentials: true,
  optionsSuccessStatus: 200
};
```

### Headers
Security headers are set for all responses:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Strict-Transport-Security: max-age=31536000`

---

## 📊 Monitoring & Logging

### Request Logging
All API requests are logged with:
- Timestamp
- HTTP method and path
- IP address
- User agent
- Response status
- Response time

### Error Logging
Errors are logged with additional context:
- Full error stack trace
- Request details
- User session information
- Environment variables (sanitized)

### Health Monitoring
The health endpoint provides detailed system status:
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "uptime": 86400,
  "memory": {
    "used": "45.2 MB",
    "total": "512 MB"
  },
  "services": {
    "email": "operational",
    "storage": "operational"
  }
}
```

---

## 🚀 Future API Endpoints

### Authentication (Planned)
```http
POST /api/auth/login
POST /api/auth/logout
GET /api/auth/me
```

### Project Management (Planned)
```http
GET /api/projects
POST /api/projects
GET /api/projects/:id
PUT /api/projects/:id
DELETE /api/projects/:id
```

### Team Management (Planned)
```http
GET /api/team
POST /api/team
GET /api/team/:id
PUT /api/team/:id
DELETE /api/team/:id
```

### Analytics (Planned)
```http
GET /api/analytics/contacts
GET /api/analytics/traffic
GET /api/analytics/performance
```

---

## 🧪 Testing the API

### Using curl

**Health Check:**
```bash
curl -X GET https://kitjistudios.com/api/health
```

**Contact Form Submission:**
```bash
curl -X POST https://kitjistudios.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "API Testing",
    "message": "This is a test message for API validation.",
    "budget": "$10,000 - $25,000",
    "timeline": "3-6 months"
  }'
```

### Using JavaScript/Fetch

```javascript
// Contact form submission
const response = await fetch('/api/contact', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    subject: 'Project Inquiry',
    message: 'Interested in your services...',
    budget: '$50,000 - $100,000',
    timeline: '6-12 months'
  })
});

const result = await response.json();
console.log(result);
```

### Using Postman

Import the following collection for easy API testing:

```json
{
  "info": {
    "name": "Kitji Studios API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Health Check",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "{{baseUrl}}/api/health",
          "host": ["{{baseUrl}}"],
          "path": ["api", "health"]
        }
      }
    },
    {
      "name": "Contact Form",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"name\": \"John Doe\",\n  \"email\": \"john@example.com\",\n  \"subject\": \"Test Inquiry\",\n  \"message\": \"This is a test message.\",\n  \"budget\": \"$25,000 - $50,000\",\n  \"timeline\": \"3-6 months\"\n}"
        },
        "url": {
          "raw": "{{baseUrl}}/api/contact",
          "host": ["{{baseUrl}}"],
          "path": ["api", "contact"]
        }
      }
    }
  ],
  "variable": [
    {
      "key": "baseUrl",
      "value": "https://kitjistudios.com"
    }
  ]
}
```

---

## 📝 Changelog

### v1.0.0 (Current)
- Initial API release
- Contact form endpoint
- Health check endpoint
- Email integration with Resend
- Input validation with Zod
- Rate limiting and security headers

### Planned Features
- Authentication system
- Project management endpoints
- Team management endpoints
- Analytics and reporting
- Webhook support for integrations

This API documentation provides comprehensive information for integrating with the Kitji Studios website backend services.