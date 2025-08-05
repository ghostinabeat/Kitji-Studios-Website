# Deployment Guide - Kitji Studios Website

This guide covers deployment options for the React + ASP.NET Core hybrid architecture.

## 🏗️ Architecture Overview

The application consists of:
- **React Frontend**: Static files served by CDN or web server
- **ASP.NET Core Backend**: API server with database connectivity
- **Database**: SQL Server, PostgreSQL, or Azure SQL Database
- **Email Service**: SendGrid for transactional emails

## 🚀 Deployment Options

### Option 1: Separate Deployments (Recommended)

Deploy frontend and backend to different services for maximum scalability.

#### Frontend Deployment (Vercel/Netlify)

**Vercel Deployment:**
```bash
# Install Vercel CLI
npm install -g vercel

# Build React application
cd client
npm run build

# Deploy to Vercel
vercel --prod

# Configure environment variables in Vercel dashboard:
# VITE_API_BASE_URL=https://your-api.azurewebsites.net
```

**Netlify Deployment:**
```bash
# Build React application
cd client
npm run build

# Deploy to Netlify (drag & drop or CLI)
npm install -g netlify-cli
netlify deploy --prod --dir=dist

# Configure environment variables in Netlify dashboard
```

#### Backend Deployment (Azure App Service)

**Azure App Service:**
```bash
# Install Azure CLI
# Create resource group
az group create --name kitji-studios --location "East US"

# Create App Service plan
az appservice plan create --name kitji-studios-plan --resource-group kitji-studios --sku B1

# Create web app
az webapp create --name kitji-studios-api --resource-group kitji-studios --plan kitji-studios-plan --runtime "DOTNET:8.0"

# Deploy application
cd Server.NET
dotnet publish -c Release -o ./publish
az webapp deployment source config-zip --resource-group kitji-studios --name kitji-studios-api --src ./publish.zip
```

### Option 2: Single ASP.NET Core Host

Deploy React build files alongside ASP.NET Core API.

#### Configure ASP.NET Core to Serve React

**Update Program.cs:**
```csharp
// Add after app.UseRouting()
app.UseStaticFiles();

// Add before app.MapControllers()
app.MapFallbackToFile("index.html");

// Configure static files path
builder.Services.Configure<Microsoft.Extensions.FileProviders.PhysicalFileProvider>(options =>
{
    options.WebRootPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
});
```

**Build Process:**
```bash
# Build React frontend
cd client
npm run build

# Copy build files to ASP.NET Core wwwroot
cp -r dist/* ../Server.NET/wwwroot/

# Publish ASP.NET Core with React files
cd ../Server.NET
dotnet publish -c Release -o ./publish
```

### Option 3: Docker Deployment

Deploy using containers for consistent environments.

**Dockerfile (Multi-stage):**
```dockerfile
# Build React frontend
FROM node:18-alpine AS frontend-build
WORKDIR /app/client
COPY client/package*.json ./
RUN npm ci --only=production
COPY client/ ./
RUN npm run build

# Build ASP.NET Core backend
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS backend-build
WORKDIR /app/Server.NET
COPY Server.NET/*.csproj ./
RUN dotnet restore
COPY Server.NET/ ./
RUN dotnet publish -c Release -o out

# Runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=backend-build /app/Server.NET/out .
COPY --from=frontend-build /app/client/dist ./wwwroot
EXPOSE 80
ENTRYPOINT ["dotnet", "KitjiStudios.API.dll"]
```

**Docker Compose:**
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "80:80"
    environment:
      - ASPNETCORE_ENVIRONMENT=Production
      - DATABASE_CONNECTION_STRING=${DATABASE_CONNECTION_STRING}
      - SENDGRID_API_KEY=${SENDGRID_API_KEY}
    depends_on:
      - db
  
  db:
    image: mcr.microsoft.com/mssql/server:2022-latest
    environment:
      - SA_PASSWORD=YourStrong@Passw0rd
      - ACCEPT_EULA=Y
    ports:
      - "1433:1433"
    volumes:
      - sqldata:/var/opt/mssql

volumes:
  sqldata:
```

## 🗄️ Database Setup

### SQL Server (Azure SQL Database)

**Create Database:**
```bash
# Create Azure SQL Database
az sql server create --name kitji-studios-sql --resource-group kitji-studios --location "East US" --admin-user sqladmin --admin-password YourPassword123!

az sql db create --resource-group kitji-studios --server kitji-studios-sql --name kitji-studios-db --service-objective S0
```

**Connection String:**
```
Server=tcp:kitji-studios-sql.database.windows.net,1433;Initial Catalog=kitji-studios-db;Persist Security Info=False;User ID=sqladmin;Password=YourPassword123!;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;
```

**Update appsettings.json:**
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=tcp:kitji-studios-sql.database.windows.net,1433;Initial Catalog=kitji-studios-db;Persist Security Info=False;User ID=sqladmin;Password={your_password};MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;"
  }
}
```

### PostgreSQL (Azure Database for PostgreSQL)

**Create Database:**
```bash
# Create PostgreSQL server
az postgres server create --resource-group kitji-studios --name kitji-studios-postgres --location "East US" --admin-user pgadmin --admin-password YourPassword123! --sku-name GP_Gen5_2

# Create database
az postgres db create --resource-group kitji-studios --server-name kitji-studios-postgres --name kitji-studios-db
```

**Update Entity Framework Configuration:**
```csharp
// In Program.cs, replace UseInMemoryDatabase with:
services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
```

## 🔐 Environment Configuration

### Production Environment Variables

**Frontend (.env.production):**
```env
VITE_API_BASE_URL=https://your-api-domain.com
VITE_GA_TRACKING_ID=GA_MEASUREMENT_ID
VITE_SENTRY_DSN=your_sentry_dsn
```

**Backend (Azure App Service Configuration):**
```bash
# Configure via Azure CLI
az webapp config appsettings set --resource-group kitji-studios --name kitji-studios-api --settings \
  ASPNETCORE_ENVIRONMENT=Production \
  DATABASE_CONNECTION_STRING="your_connection_string" \
  SENDGRID_API_KEY="your_sendgrid_key" \
  EMAIL_FROM_ADDRESS="noreply@kitjistudios.com" \
  EMAIL_TO_ADDRESS="sales@kitjistudios.com"
```

### Security Configuration

**CORS Settings:**
```csharp
// Update Program.cs for production
builder.Services.AddCors(options =>
{
    options.AddPolicy("Production", policy =>
    {
        policy
            .WithOrigins("https://kitjistudios.com", "https://www.kitjistudios.com")
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

// Use in production
if (app.Environment.IsProduction())
{
    app.UseCors("Production");
}
```

**SSL/TLS Configuration:**
```csharp
// Force HTTPS in production
if (app.Environment.IsProduction())
{
    app.UseHttpsRedirection();
    app.UseHsts();
}
```

## 📊 Monitoring & Logging

### Application Insights (Azure)

**Configure Application Insights:**
```bash
# Create Application Insights resource
az monitor app-insights component create --app kitji-studios-insights --location "East US" --resource-group kitji-studios --application-type web
```

**Update Program.cs:**
```csharp
// Add Application Insights
builder.Services.AddApplicationInsightsTelemetry();

// Configure logging
builder.Services.AddLogging(logging =>
{
    logging.AddApplicationInsights();
    logging.AddConsole();
});
```

### Health Checks

**Configure Health Checks:**
```csharp
// Add health checks
builder.Services.AddHealthChecks()
    .AddDbContext<ApplicationDbContext>()
    .AddUrlGroup(new Uri("https://api.sendgrid.com/v3/mail/send"), "sendgrid");

// Map health check endpoint
app.MapHealthChecks("/health", new HealthCheckOptions
{
    ResponseWriter = UIResponseWriter.WriteHealthCheckUIResponse
});
```

## 🚀 CI/CD Pipeline

### GitHub Actions Workflow

**.github/workflows/deploy.yml:**
```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    # Build React Frontend
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: 18
        cache: 'npm'
        cache-dependency-path: client/package-lock.json
    
    - name: Install frontend dependencies
      run: |
        cd client
        npm ci
    
    - name: Build frontend
      run: |
        cd client
        npm run build
      env:
        VITE_API_BASE_URL: ${{ secrets.API_BASE_URL }}
    
    # Build ASP.NET Core Backend
    - name: Setup .NET
      uses: actions/setup-dotnet@v3
      with:
        dotnet-version: 8.0.x
    
    - name: Restore dependencies
      run: |
        cd Server.NET
        dotnet restore
    
    - name: Build backend
      run: |
        cd Server.NET
        dotnet build --no-restore -c Release
    
    # Copy frontend build to backend
    - name: Copy frontend to backend
      run: |
        cp -r client/dist/* Server.NET/wwwroot/
    
    # Publish application
    - name: Publish application
      run: |
        cd Server.NET
        dotnet publish -c Release -o ../publish
    
    # Deploy to Azure App Service
    - name: Deploy to Azure
      uses: azure/webapps-deploy@v2
      with:
        app-name: kitji-studios-api
        publish-profile: ${{ secrets.AZURE_WEBAPP_PUBLISH_PROFILE }}
        package: ./publish
```

### Azure DevOps Pipeline

**azure-pipelines.yml:**
```yaml
trigger:
  branches:
    include:
    - main

pool:
  vmImage: 'ubuntu-latest'

variables:
  buildConfiguration: 'Release'

stages:
- stage: Build
  jobs:
  - job: BuildApplication
    steps:
    # Build React Frontend
    - task: NodeTool@0
      inputs:
        versionSpec: '18.x'
    
    - script: |
        cd client
        npm install
        npm run build
      displayName: 'Build React Frontend'
    
    # Build ASP.NET Core Backend
    - task: UseDotNet@2
      inputs:
        version: '8.0.x'
    
    - script: |
        cd Server.NET
        dotnet restore
        dotnet build --configuration $(buildConfiguration)
        dotnet publish --configuration $(buildConfiguration) --output $(Build.ArtifactStagingDirectory)
      displayName: 'Build ASP.NET Core Backend'
    
    # Copy frontend to backend output
    - script: |
        cp -r client/dist/* $(Build.ArtifactStagingDirectory)/wwwroot/
      displayName: 'Copy Frontend Files'
    
    - task: PublishBuildArtifacts@1
      inputs:
        pathToPublish: '$(Build.ArtifactStagingDirectory)'
        artifactName: 'drop'

- stage: Deploy
  jobs:
  - deployment: DeployToProduction
    environment: 'production'
    strategy:
      runOnce:
        deploy:
          steps:
          - task: AzureWebApp@1
            inputs:
              azureSubscription: 'Azure Service Connection'
              appType: 'webApp'
              appName: 'kitji-studios-api'
              package: '$(Pipeline.Workspace)/drop'
```

## 🔧 Performance Optimization

### CDN Configuration

**Azure CDN:**
```bash
# Create CDN profile
az cdn profile create --name kitji-studios-cdn --resource-group kitji-studios --sku Standard_Microsoft

# Create CDN endpoint
az cdn endpoint create --name kitji-studios --profile-name kitji-studios-cdn --resource-group kitji-studios --origin kitjistudios.com
```

### Caching Strategy

**ASP.NET Core Response Caching:**
```csharp
// Add response caching
builder.Services.AddResponseCaching();

// Configure caching policies
builder.Services.AddControllers(options =>
{
    options.CacheProfiles.Add("StaticContent", new CacheProfile
    {
        Duration = 86400, // 1 day
        Location = ResponseCacheLocation.Any
    });
});
```

## 🛠️ Troubleshooting

### Common Deployment Issues

1. **CORS Errors**: Update CORS policy with production domains
2. **Database Connection**: Verify connection string and firewall rules
3. **Environment Variables**: Ensure all required variables are set
4. **Static Files**: Verify React build files are in wwwroot directory
5. **SSL Certificates**: Configure proper HTTPS certificates

### Monitoring Commands

```bash
# Check application logs (Azure)
az webapp log tail --name kitji-studios-api --resource-group kitji-studios

# Check health endpoint
curl https://your-domain.com/health

# Monitor performance
az monitor metrics list --resource /subscriptions/{subscription-id}/resourceGroups/kitji-studios/providers/Microsoft.Web/sites/kitji-studios-api
```

This deployment guide ensures your Kitji Studios website runs reliably in production with proper monitoring, security, and performance optimization.