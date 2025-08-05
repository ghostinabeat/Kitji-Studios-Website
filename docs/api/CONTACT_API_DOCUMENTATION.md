# Contact API Documentation

## Overview

The Contact API provides endpoints for handling contact form submissions from the React frontend. This ASP.NET Core API replaces the original Express.js server while maintaining full compatibility with the existing React components.

## Base URL

- **Development**: `http://localhost:5001`
- **Production**: `https://api.kitjistudios.com`

## Authentication

Currently, the Contact API endpoints are public and do not require authentication. Future admin endpoints will implement JWT-based authentication.

## Endpoints

### 1. Submit Contact Form

**Endpoint**: `POST /api/contact`
**Description**: Submits a new contact form from the React frontend
**Used by**: `client/src/components/Contact.tsx`

#### Request Body

```json
{
  "name": "John Smith",
  "email": "john@company.com",
  "company": "Tech Corp Inc.", // Optional
  "projectType": "Custom Software Development",
  "budget": "$50,000 - $100,000", // Optional
  "message": "We need a custom CRM system for our sales team..."
}
```

#### Response

**Success (200 OK)**:
```json
{
  "success": true,
  "message": "Thank you for your project inquiry! Our sales team has received it and will contact you within 24 hours to discuss next steps.",
  "id": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Validation Error (400 Bad Request)**:
```json
{
  "success": false,
  "message": "Please check your form data and try again.",
  "errors": [
    "Name is required",
    "Please enter a valid email address"
  ]
}
```

**Server Error (500 Internal Server Error)**:
```json
{
  "success": false,
  "message": "Sorry, there was an error sending your message. Please try again later."
}
```

#### Validation Rules

| Field | Required | Max Length | Additional Rules |
|-------|----------|------------|------------------|
| name | Yes | 100 chars | Non-empty string |
| email | Yes | 255 chars | Valid email format |
| company | No | 100 chars | - |
| projectType | Yes | 100 chars | Must be from predefined list |
| budget | No | 50 chars | Must be from predefined list |
| message | Yes | 2000 chars | Minimum 10 characters |

#### Valid Project Types
- Custom Software Development
- API Integration
- Mobile Application
- Web Application
- Database Design
- System Integration
- Consulting
- Other

#### Valid Budget Ranges
- Under $10,000
- $10,000 - $25,000
- $25,000 - $50,000
- $50,000 - $100,000
- $100,000+

### 2. Get All Contact Submissions (Admin)

**Endpoint**: `GET /api/contact`
**Description**: Retrieves all contact submissions for admin purposes
**Used by**: Admin components (future implementation)

#### Response

**Success (200 OK)**:
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "John Smith",
    "email": "john@company.com",
    "company": "Tech Corp Inc.",
    "projectType": "Custom Software Development",
    "budget": "$50,000 - $100,000",
    "message": "We need a custom CRM system...",
    "createdAt": "2024-01-15T10:30:00Z"
  }
]
```

### 3. Get Paginated Contact Submissions

**Endpoint**: `GET /api/contact/paginated`
**Description**: Retrieves paginated contact submissions for better performance
**Query Parameters**:
- `page` (optional): Page number, default 1
- `pageSize` (optional): Items per page, default 20, max 100

#### Example Request
```
GET /api/contact/paginated?page=2&pageSize=10
```

#### Response

**Success (200 OK)**:
```json
{
  "success": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "John Smith",
      "email": "john@company.com",
      "company": "Tech Corp Inc.",
      "projectType": "Custom Software Development",
      "budget": "$50,000 - $100,000",
      "message": "We need a custom CRM system...",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "page": 2,
    "pageSize": 10,
    "totalCount": 45,
    "totalPages": 5,
    "hasNextPage": true,
    "hasPreviousPage": true
  }
}
```

### 4. Get Contact Submission by ID

**Endpoint**: `GET /api/contact/{id}`
**Description**: Retrieves a specific contact submission by ID

#### Response

**Success (200 OK)**:
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "John Smith",
  "email": "john@company.com",
  "company": "Tech Corp Inc.",
  "projectType": "Custom Software Development", 
  "budget": "$50,000 - $100,000",
  "message": "We need a custom CRM system...",
  "createdAt": "2024-01-15T10:30:00Z"
}
```

**Not Found (404 Not Found)**:
```json
{
  "success": false,
  "message": "Contact submission not found"
}
```

### 5. Get Email Service Status

**Endpoint**: `GET /api/contact/email-status`
**Description**: Gets email service configuration and status for monitoring

#### Response

**Success (200 OK)**:
```json
{
  "isConfigured": true,
  "provider": "SendGrid",
  "isConnected": true,
  "lastChecked": "2024-01-15T10:30:00Z",
  "errorMessage": null
}
```

## Error Handling

### HTTP Status Codes

| Code | Description | When Used |
|------|-------------|-----------|
| 200 | OK | Successful requests |
| 400 | Bad Request | Validation errors, invalid parameters |
| 404 | Not Found | Resource not found |
| 500 | Internal Server Error | Server-side errors |

### Error Response Format

All error responses follow this format:
```json
{
  "success": false,
  "message": "Human-readable error message",
  "errors": ["Detailed validation errors"] // Optional
}
```

## Integration with React Frontend

### HTTP Client Configuration

The React frontend uses a configured HTTP client in `client/src/lib/queryClient.ts`:

```typescript
// Base URL configuration for API calls
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001';

// Example API call from Contact.tsx
const response = await fetch(`${apiBaseUrl}/api/contact`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(formData),
});
```

### TanStack Query Integration

The API integrates seamlessly with TanStack Query for caching and state management:

```typescript
// In Contact.tsx component
const submitMutation = useMutation({
  mutationFn: (data: ContactSubmissionRequest) => 
    apiRequest('/api/contact', { method: 'POST', body: data }),
  onSuccess: (response) => {
    // Handle success
    queryClient.invalidateQueries({ queryKey: ['/api/contact'] });
  },
  onError: (error) => {
    // Handle error
  }
});
```

## Rate Limiting

The API implements rate limiting to prevent abuse:

- **Contact Form**: 5 submissions per IP per hour
- **Admin Endpoints**: 100 requests per IP per minute

Rate limit headers are included in responses:
```
X-RateLimit-Limit: 5
X-RateLimit-Remaining: 4
X-RateLimit-Reset: 1642248000
```

## CORS Configuration

The API is configured to accept requests from the React frontend:

```csharp
// Development origins
"http://localhost:5173"  // Vite dev server
"http://localhost:3000"  // Alternative React dev server
"https://localhost:5173" // HTTPS Vite dev server

// Production origins will be configured based on deployment
```

## Email Integration

The API sends two types of emails for each contact submission:

1. **Notification Email**: Sent to `sales@kitjistudios.com` with form details
2. **Confirmation Email**: Sent to the form submitter with next steps

### Email Templates

Both emails use professional HTML templates matching the website's branding:
- Dark blue gradient headers
- Company branding
- Responsive design
- Plain text fallbacks

### Email Providers

The API supports both SendGrid and Resend:
- **Primary**: SendGrid (full feature support)
- **Fallback**: Resend (via SendGrid-compatible wrapper)
- **Configuration**: Environment variables `SENDGRID_API_KEY` or `RESEND_API_KEY`

## Monitoring and Logging

### Structured Logging

The API uses Serilog for structured logging:

```csharp
// Example log entries
"Contact form submission received from {Email}" 
"Successfully processed contact submission {Id} from {Email}"
"Failed to send email notification for {Email}: {Error}"
```

### Health Checks

Health check endpoint: `GET /api/health`

```json
{
  "status": "Healthy",
  "timestamp": "2024-01-15T10:30:00Z",
  "environment": "Development",
  "version": "1.0.0"
}
```

## Migration from Node.js

### Endpoint Compatibility

| Node.js Endpoint | ASP.NET Endpoint | Status |
|------------------|------------------|---------|
| `POST /api/contact` | `POST /api/contact` | ✅ Compatible |
| `GET /api/contact` | `GET /api/contact` | ✅ Compatible |
| `GET /admin/contacts` | `GET /api/contact/paginated` | ✅ Enhanced |

### Data Model Compatibility

The ASP.NET models maintain full compatibility with the TypeScript interfaces:

| TypeScript (shared/schema.ts) | C# (Models/ContactSubmission.cs) |
|--------------------------------|-----------------------------------|
| `InsertContactSubmission` | `ContactSubmissionRequest` |
| `ContactSubmission` | `ContactSubmission` |
| Response types | `ContactSubmissionResponse` |

### Validation Compatibility

FluentValidation rules match the original Zod schemas:
- Same field requirements
- Same length limits
- Same error messages
- Same validation logic

This ensures the React frontend requires no changes when switching from Node.js to ASP.NET Core backend.