using Microsoft.EntityFrameworkCore;
using KitjiStudios.Shared.Models;

namespace KitjiStudios.Server.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    public DbSet<ContactSubmission> ContactSubmissions { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<ContactSubmission>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
            entity.Property(e => e.Email).IsRequired().HasMaxLength(255);
            entity.Property(e => e.Company).HasMaxLength(100);
            entity.Property(e => e.ProjectType).IsRequired().HasMaxLength(100);
            entity.Property(e => e.Budget).HasMaxLength(50);
            entity.Property(e => e.Message).IsRequired().HasMaxLength(2000);
            entity.Property(e => e.CreatedAt).IsRequired();
        });
    }
}