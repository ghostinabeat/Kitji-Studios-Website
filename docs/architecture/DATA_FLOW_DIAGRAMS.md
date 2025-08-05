# Data Flow Diagrams - React + ASP.NET Architecture

## Overview

This document provides detailed data flow diagrams showing how data moves through the React frontend and ASP.NET Core backend in the Kitji Studios application.

## System Architecture Overview

```mermaid
C4Context
    title System Context Diagram - Kitji Studios Website

    Person(user, "Website Visitor", "Potential client browsing services and submitting contact forms")
    Person(admin, "Admin User", "Kitji Studios team member managing contact submissions")
    
    System_Boundary(frontend, "Frontend Layer") {
        System(react, "React SPA", "TypeScript, Vite, TailwindCSS")
    }
    
    System_Boundary(backend, "Backend Layer") {
        System(aspnet, "ASP.NET Core API", "C# 8.0, Entity Framework, FluentValidation")
    }
    
    System_Boundary(external, "External Services") {
        System(email, "SendGrid", "Email delivery service")
        System(db, "Database", "SQL Server / In-Memory")
    }

    Rel(user, react, "Uses", "HTTPS/Browser")
    Rel(admin, react, "Manages", "HTTPS/Browser")
    Rel(react, aspnet, "API Calls", "HTTP/JSON")
    Rel(aspnet, email, "Send Emails", "HTTPS/API")
    Rel(aspnet, db, "Store Data", "Entity Framework")
```

## Contact Form Data Flow

### Complete Form Submission Journey

```mermaid
flowchart TD
    subgraph "User Interface Layer"
        A[User Opens Contact Form] --> B[React Contact Component Loads]
        B --> C[Form Fields Rendered]
        C --> D[User Fills Form Data]
        D --> E{Client-Side Validation}
    end
    
    subgraph "Form Processing Layer"
        E -->|Valid| F[React Hook Form State]
        E -->|Invalid| G[Display Validation Errors]
        F --> H[TanStack Query Mutation]
        G --> D
    end
    
    subgraph "Network Layer"
        H --> I[HTTP POST /api/contact]
        I --> J[Request Serialization]
        J --> K[Network Transport]
    end
    
    subgraph "ASP.NET Core API Layer"
        K --> L[Controller Receives Request]
        L --> M{FluentValidation Check}
        M -->|Invalid| N[Return 400 Bad Request]
        M -->|Valid| O[ContactService.CreateAsync]
    end
    
    subgraph "Business Logic Layer"
        O --> P[Map DTO to Entity]
        P --> Q[Generate Unique ID]
        Q --> R[Set Timestamp]
        R --> S[Entity Framework Save]
    end
    
    subgraph "Data Persistence Layer"
        S --> T[(Database Write)]
        T --> U[Return Saved Entity]
    end
    
    subgraph "Email Service Layer"
        U --> V[EmailService.SendAsync]
        V --> W[Create HTML Template]
        W --> X[SendGrid API Call]
        X --> Y[Email Delivery]
    end
    
    subgraph "Response Layer"
        Y --> Z[Success Response Created]
        Z --> AA[HTTP 200 OK Response]
        AA --> BB[JSON Serialization]
    end
    
    subgraph "Frontend Response Handling"
        BB --> CC[TanStack Query Success]
        CC --> DD[Update UI State]
        DD --> EE[Show Success Message]
        EE --> FF[Reset Form]
    end
    
    N --> GG[Frontend Error Handling]
    GG --> HH[Display Error Message]
    HH --> D
    
    style A fill:#61dafb
    style L fill:#512bd4
    style T fill:#ff6b6b
    style X fill:#00d4aa
```

### Data Transformation Flow

```mermaid
graph TB
    subgraph "React Frontend"
        A[HTML Form Data] --> B[FormData Object]
        B --> C[React Hook Form State]
        C --> D[TypeScript Interface]
    end
    
    subgraph "Serialization"
        D --> E[JSON.stringify]
        E --> F[HTTP Request Body]
    end
    
    subgraph "ASP.NET Backend"
        F --> G[Model Binding]
        G --> H[ContactSubmissionRequest DTO]
        H --> I[FluentValidation]
        I --> J[ContactSubmission Entity]
    end
    
    subgraph "Database"
        J --> K[Entity Framework Mapping]
        K --> L[SQL Parameters]
        L --> M[(Database Table)]
    end
    
    subgraph "Email Processing"
        J --> N[Email Template Data]
        N --> O[HTML Email Content]
        O --> P[SendGrid Message Object]
    end
    
    subgraph "Response Path"
        M --> Q[ContactSubmission Entity]
        Q --> R[ContactSubmissionResponse DTO]
        R --> S[JSON Response]
        S --> T[HTTP Response]
        T --> U[React Component State]
    end
    
    style D fill:#61dafb
    style H fill:#512bd4
    style M fill:#ff6b6b
    style P fill:#00d4aa
```

## State Management Flow

### React Component State Flow

```mermaid
stateDiagram-v2
    [*] --> FormInitialized
    
    FormInitialized --> FormFilling: User types
    FormFilling --> FormFilling: Continue typing
    FormFilling --> ClientValidation: User tabs/submits
    
    ClientValidation --> FieldErrors: Validation fails
    ClientValidation --> FormReady: Validation passes
    
    FieldErrors --> FormFilling: User corrects
    
    FormReady --> Submitting: User clicks submit
    Submitting --> ServerValidation: HTTP request sent
    
    ServerValidation --> ServerError: 400/500 response
    ServerValidation --> Success: 200 response
    ServerValidation --> NetworkError: Network failure
    
    ServerError --> FormFilling: User retries
    NetworkError --> FormFilling: User retries
    
    Success --> SuccessState: Show success message
    SuccessState --> FormInitialized: Reset form
    
    note right of ClientValidation
        React Hook Form + Zod
        - Field validation
        - Type checking
        - Error messages
    end note
    
    note right of ServerValidation
        ASP.NET Core
        - FluentValidation
        - Business rules
        - Database constraints
    end note
```

### TanStack Query State Management

```mermaid
graph TB
    subgraph "Query Client State"
        A[Initial State] --> B[Loading State]
        B --> C{Response Status}
        C -->|Success| D[Success State]
        C -->|Error| E[Error State]
        D --> F[Cached Data]
        E --> G[Error Information]
    end
    
    subgraph "Cache Management"
        F --> H[Cache Key: /api/contact]
        H --> I[Stale Time: 5 minutes]
        I --> J[Garbage Collection: 10 minutes]
        J --> K[Background Refetch]
    end
    
    subgraph "Mutation Lifecycle"
        L[Mutation Trigger] --> M[Optimistic Update]
        M --> N[HTTP Request]
        N --> O{Response}
        O -->|Success| P[Update Cache]
        O -->|Error| Q[Rollback Optimistic Update]
        P --> R[Invalidate Queries]
    end
    
    style A fill:#61dafb
    style N fill:#512bd4
    style H fill:#4caf50
```

## Error Handling Flow

### Comprehensive Error Handling Strategy

```mermaid
flowchart TD
    subgraph "Error Sources"
        A[Network Error] 
        B[Client Validation Error]
        C[Server Validation Error]
        D[Business Logic Error]
        E[Database Error]
        F[Email Service Error]
    end
    
    subgraph "Error Detection"
        A --> G[Fetch API Catch]
        B --> H[React Hook Form Errors]
        C --> I[400 HTTP Response]
        D --> J[422 HTTP Response]
        E --> K[500 HTTP Response]
        F --> L[Email Service Status]
    end
    
    subgraph "Error Processing"
        G --> M[Network Error Handler]
        H --> N[Field Error Display]
        I --> O[Validation Error Parser]
        J --> P[Business Error Handler]
        K --> Q[Server Error Handler]
        L --> R[Email Status Logger]
    end
    
    subgraph "User Feedback"
        M --> S[Connection Error Toast]
        N --> T[Field Error Messages]
        O --> U[Form Validation Errors]
        P --> V[Business Rule Messages]
        Q --> W[Generic Error Message]
        R --> X[Silent Logging Only]
    end
    
    subgraph "Recovery Actions"
        S --> Y[Retry Button]
        T --> Z[Field Correction]
        U --> AA[Form Correction]
        V --> BB[User Guidance]
        W --> CC[Contact Support]
        X --> DD[Admin Notification]
    end
    
    style M fill:#ff6b6b
    style N fill:#ff9800
    style O fill:#f44336
    style P fill:#e91e63
    style Q fill:#9c27b0
    style R fill:#673ab7
```

## Authentication & Authorization Flow (Future)

### Planned Admin Authentication

```mermaid
sequenceDiagram
    participant Admin as Admin User
    participant React as React App
    participant Auth as Auth Service
    participant API as ASP.NET API
    participant DB as Database

    Admin->>React: Login Request
    React->>Auth: Authenticate Credentials
    Auth->>DB: Verify User
    DB-->>Auth: User Data
    Auth-->>React: JWT Token
    React->>React: Store Token (localStorage)
    
    Note over React,API: Subsequent API Calls
    
    React->>API: Request with Bearer Token
    API->>API: Validate JWT
    API->>DB: Authorized Data Query
    DB-->>API: Query Results
    API-->>React: Protected Data
    React-->>Admin: Display Data
    
    Note over React,Auth: Token Refresh
    
    React->>Auth: Refresh Token
    Auth-->>React: New JWT Token
    React->>React: Update Stored Token
```

## Performance Optimization Flow

### Caching Strategy

```mermaid
graph TB
    subgraph "Browser Cache"
        A[Static Assets] --> B[Service Worker Cache]
        B --> C[Browser Cache Headers]
    end
    
    subgraph "React Query Cache"
        D[API Response Cache] --> E[Background Refetch]
        E --> F[Stale While Revalidate]
        F --> G[Cache Invalidation]
    end
    
    subgraph "ASP.NET Cache"
        H[Memory Cache] --> I[Response Caching]
        I --> J[Output Cache]
    end
    
    subgraph "Database Cache"
        K[Entity Framework Cache] --> L[Query Plan Cache]
        L --> M[Connection Pool]
    end
    
    A --> D
    D --> H
    H --> K
    
    style A fill:#61dafb
    style D fill:#4caf50
    style H fill:#512bd4
    style K fill:#ff9800
```

### Bundle Optimization Flow

```mermaid
flowchart LR
    subgraph "Development"
        A[TypeScript Source] --> B[Vite Dev Server]
        B --> C[Hot Module Reload]
    end
    
    subgraph "Build Process"
        A --> D[TypeScript Compilation]
        D --> E[Vite Build]
        E --> F[Code Splitting]
        F --> G[Tree Shaking]
        G --> H[Minification]
    end
    
    subgraph "Output"
        H --> I[Main Bundle]
        H --> J[Vendor Bundle]
        H --> K[Route Bundles]
        H --> L[Asset Files]
    end
    
    subgraph "Deployment"
        I --> M[CDN Distribution]
        J --> M
        K --> M
        L --> M
    end
    
    style E fill:#646cff
    style M fill:#00d4aa
```

## Database Operation Flow

### Entity Framework Data Flow

```mermaid
flowchart TD
    subgraph "API Layer"
        A[Controller Action] --> B[Service Method Call]
    end
    
    subgraph "Service Layer"
        B --> C[Business Logic]
        C --> D[Data Validation]
        D --> E[Entity Creation/Update]
    end
    
    subgraph "Entity Framework"
        E --> F[DbContext]
        F --> G[Change Tracking]
        G --> H[SQL Generation]
        H --> I[Parameter Binding]
    end
    
    subgraph "Database"
        I --> J[(SQL Server)]
        J --> K[Query Execution]
        K --> L[Result Set]
    end
    
    subgraph "Response Path"
        L --> M[Entity Materialization]
        M --> N[Change Tracking Update]
        N --> O[Return to Service]
        O --> P[DTO Mapping]
        P --> Q[Controller Response]
    end
    
    style F fill:#512bd4
    style J fill:#ff6b6b
    style P fill:#4caf50
```

## Real-time Updates Flow (Future Enhancement)

### SignalR Integration Plan

```mermaid
sequenceDiagram
    participant Admin as Admin Dashboard
    participant SignalR as SignalR Hub
    participant API as ASP.NET API  
    participant React as Contact Form

    React->>API: Submit Contact Form
    API->>API: Save to Database
    API->>SignalR: Notify New Submission
    SignalR->>Admin: Real-time Notification
    Admin->>Admin: Display New Contact
    
    Note over Admin,SignalR: Admin Actions
    
    Admin->>SignalR: Mark as Read
    SignalR->>API: Update Status
    API->>API: Update Database
    API->>SignalR: Confirm Update
    SignalR->>Admin: Status Updated
```

This comprehensive data flow documentation ensures that all stakeholders understand how data moves through the React + ASP.NET Core architecture, from user interaction to database persistence and email delivery.