using Microsoft.EntityFrameworkCore;
using KitjiStudios.API.Models;

namespace KitjiStudios.API.Data;

/// <summary>
/// Entity Framework DbContext for Kitji Studios application
/// Replaces the in-memory storage from the original Node.js version
/// Provides the same interface but with proper database persistence
/// </summary>
public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    /// <summary>
    /// Contact form submissions from React frontend
    /// Maps to the contactSubmissions table in shared/schema.ts
    /// </summary>
    public DbSet<ContactSubmission> ContactSubmissions { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configure ContactSubmission entity
        // Matches the Drizzle schema from shared/schema.ts
        modelBuilder.Entity<ContactSubmission>(entity =>
        {
            entity.HasKey(e => e.Id);
            
            // Configure string properties with appropriate lengths
            entity.Property(e => e.Id)
                .HasMaxLength(36) // UUID string length
                .IsRequired();
                
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .IsRequired();
                
            entity.Property(e => e.Email)
                .HasMaxLength(255)
                .IsRequired();
                
            entity.Property(e => e.Company)
                .HasMaxLength(100)
                .IsRequired(false);
                
            entity.Property(e => e.ProjectType)
                .HasMaxLength(100)
                .IsRequired();
                
            entity.Property(e => e.Budget)
                .HasMaxLength(50)
                .IsRequired(false);
                
            entity.Property(e => e.Message)
                .HasMaxLength(2000)
                .IsRequired();
                
            entity.Property(e => e.CreatedAt)
                .IsRequired()
                .HasDefaultValueSql("GETUTCDATE()"); // SQL Server
                // For PostgreSQL, use: .HasDefaultValueSql("NOW()")
                
            // Add index for common queries
            entity.HasIndex(e => e.CreatedAt)
                .HasDatabaseName("IX_ContactSubmissions_CreatedAt");
                
            entity.HasIndex(e => e.Email)
                .HasDatabaseName("IX_ContactSubmissions_Email");
        });
    }

    /// <summary>
    /// Seed data for development and testing
    /// Can be removed in production
    /// </summary>
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            // This should not happen as we configure in Program.cs
            // But added as fallback for development
            optionsBuilder.UseInMemoryDatabase("KitjiStudiosDb");
        }
        
        // Enable sensitive data logging in development
        if (Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Development")
        {
            optionsBuilder.EnableSensitiveDataLogging();
            optionsBuilder.EnableDetailedErrors();
        }
    }
}