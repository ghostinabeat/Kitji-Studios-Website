using System.ComponentModel.DataAnnotations;
using FluentValidation;

namespace KitjiStudios.API.Models;

/// <summary>
/// Represents a contact form submission from the React frontend
/// Maps directly to the TypeScript interface in shared/schema.ts
/// </summary>
public class ContactSubmission
{
    /// <summary>
    /// Unique identifier for the contact submission
    /// </summary>
    public string Id { get; set; } = Guid.NewGuid().ToString();
    
    /// <summary>
    /// Full name of the person submitting the contact form
    /// </summary>
    [Required]
    [MaxLength(100)]
    public string Name { get; set; } = string.Empty;
    
    /// <summary>
    /// Email address for contact response
    /// </summary>
    [Required]
    [EmailAddress]
    [MaxLength(255)]
    public string Email { get; set; } = string.Empty;
    
    /// <summary>
    /// Optional company name
    /// </summary>
    [MaxLength(100)]
    public string? Company { get; set; }
    
    /// <summary>
    /// Type of project (Custom Software Development, API Integration, etc.)
    /// </summary>
    [Required]
    [MaxLength(100)]
    public string ProjectType { get; set; } = string.Empty;
    
    /// <summary>
    /// Optional budget range selection
    /// </summary>
    [MaxLength(50)]
    public string? Budget { get; set; }
    
    /// <summary>
    /// Detailed project description and requirements
    /// </summary>
    [Required]
    [MaxLength(2000)]
    public string Message { get; set; } = string.Empty;
    
    /// <summary>
    /// Timestamp when the submission was created
    /// </summary>
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

/// <summary>
/// DTO for incoming contact form submissions from React frontend
/// Matches the insertContactSubmissionSchema from shared/schema.ts
/// </summary>
public class ContactSubmissionRequest
{
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? Company { get; set; }
    public string ProjectType { get; set; } = string.Empty;
    public string? Budget { get; set; }
    public string Message { get; set; } = string.Empty;
}

/// <summary>
/// FluentValidation validator for contact submissions
/// Provides the same validation rules as Zod schema in TypeScript
/// </summary>
public class ContactSubmissionValidator : AbstractValidator<ContactSubmissionRequest>
{
    public ContactSubmissionValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty()
            .WithMessage("Name is required")
            .MaximumLength(100)
            .WithMessage("Name must be less than 100 characters");

        RuleFor(x => x.Email)
            .NotEmpty()
            .WithMessage("Email is required")
            .EmailAddress()
            .WithMessage("Please enter a valid email address")
            .MaximumLength(255)
            .WithMessage("Email must be less than 255 characters");

        RuleFor(x => x.Company)
            .MaximumLength(100)
            .WithMessage("Company name must be less than 100 characters")
            .When(x => !string.IsNullOrEmpty(x.Company));

        RuleFor(x => x.ProjectType)
            .NotEmpty()
            .WithMessage("Project type is required")
            .Must(BeValidProjectType)
            .WithMessage("Please select a valid project type");

        RuleFor(x => x.Budget)
            .Must(BeValidBudgetRange)
            .WithMessage("Please select a valid budget range")
            .When(x => !string.IsNullOrEmpty(x.Budget));

        RuleFor(x => x.Message)
            .NotEmpty()
            .WithMessage("Message is required")
            .MinimumLength(10)
            .WithMessage("Message must be at least 10 characters")
            .MaximumLength(2000)
            .WithMessage("Message must be less than 2000 characters");
    }

    private static bool BeValidProjectType(string projectType)
    {
        var validTypes = new[]
        {
            "Custom Software Development",
            "API Integration",
            "Mobile Application",
            "Web Application",
            "Database Design",
            "System Integration",
            "Consulting",
            "Other"
        };
        return validTypes.Contains(projectType);
    }

    private static bool BeValidBudgetRange(string budget)
    {
        var validRanges = new[]
        {
            "Under $10,000",
            "$10,000 - $25,000",
            "$25,000 - $50,000",
            "$50,000 - $100,000",
            "$100,000+"
        };
        return validRanges.Contains(budget);
    }
}

/// <summary>
/// Response DTO sent back to React frontend after form submission
/// Matches the ContactSubmissionResponse type in client code
/// </summary>
public class ContactSubmissionResponse
{
    /// <summary>
    /// Indicates if the submission was successful
    /// </summary>
    public bool Success { get; set; }
    
    /// <summary>
    /// Human-readable message for display in React UI
    /// </summary>
    public string Message { get; set; } = string.Empty;
    
    /// <summary>
    /// ID of the created submission (if successful)
    /// </summary>
    public string? Id { get; set; }
    
    /// <summary>
    /// List of validation errors (if any)
    /// </summary>
    public List<string>? Errors { get; set; }
}