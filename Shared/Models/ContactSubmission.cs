using System.ComponentModel.DataAnnotations;
using FluentValidation;

namespace KitjiStudios.Shared.Models;

public class ContactSubmission
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? Company { get; set; }
    public string ProjectType { get; set; } = string.Empty;
    public string? Budget { get; set; }
    public string Message { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public class ContactSubmissionRequest
{
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? Company { get; set; }
    public string ProjectType { get; set; } = string.Empty;
    public string? Budget { get; set; }
    public string Message { get; set; } = string.Empty;
}

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
            .WithMessage("Please enter a valid email address");

        RuleFor(x => x.Company)
            .MaximumLength(100)
            .WithMessage("Company name must be less than 100 characters");

        RuleFor(x => x.ProjectType)
            .NotEmpty()
            .WithMessage("Project type is required");

        RuleFor(x => x.Message)
            .NotEmpty()
            .WithMessage("Message is required")
            .MaximumLength(2000)
            .WithMessage("Message must be less than 2000 characters");
    }
}

public class ContactSubmissionResponse
{
    public bool Success { get; set; }
    public string Message { get; set; } = string.Empty;
    public string? Id { get; set; }
    public List<string>? Errors { get; set; }
}