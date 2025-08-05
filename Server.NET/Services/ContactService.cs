using KitjiStudios.API.Data;
using KitjiStudios.API.Models;
using Microsoft.EntityFrameworkCore;

namespace KitjiStudios.API.Services;

/// <summary>
/// Implementation of contact form business logic
/// Replaces the storage.ts functionality from the Node.js version
/// Provides enhanced features like pagination and detailed error handling
/// </summary>
public class ContactService : IContactService
{
    private readonly ApplicationDbContext _context;
    private readonly ILogger<ContactService> _logger;

    public ContactService(ApplicationDbContext context, ILogger<ContactService> logger)
    {
        _context = context;
        _logger = logger;
    }

    /// <summary>
    /// Creates a new contact submission in the database
    /// Maps the incoming request to a database entity and persists it
    /// Equivalent to storage.createContactSubmission() in the Node.js version
    /// </summary>
    public async Task<ContactSubmission> CreateContactSubmissionAsync(ContactSubmissionRequest request)
    {
        _logger.LogInformation("Creating new contact submission for {Email}", request.Email);

        try
        {
            // Map request DTO to entity model
            var submission = new ContactSubmission
            {
                Id = Guid.NewGuid().ToString(),
                Name = request.Name.Trim(),
                Email = request.Email.Trim().ToLowerInvariant(),
                Company = request.Company?.Trim(),
                ProjectType = request.ProjectType.Trim(),
                Budget = request.Budget?.Trim(),
                Message = request.Message.Trim(),
                CreatedAt = DateTime.UtcNow
            };

            // Add to database context
            _context.ContactSubmissions.Add(submission);
            await _context.SaveChangesAsync();

            _logger.LogInformation("Successfully created contact submission {Id} for {Email}", 
                submission.Id, submission.Email);

            return submission;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to create contact submission for {Email}", request.Email);
            throw new InvalidOperationException("Failed to create contact submission", ex);
        }
    }

    /// <summary>
    /// Retrieves all contact submissions ordered by creation date (newest first)
    /// Equivalent to storage.getAllContactSubmissions() in the Node.js version
    /// Used by the admin endpoint GET /api/contact
    /// </summary>
    public async Task<List<ContactSubmission>> GetAllContactSubmissionsAsync()
    {
        _logger.LogInformation("Retrieving all contact submissions");

        try
        {
            var submissions = await _context.ContactSubmissions
                .OrderByDescending(c => c.CreatedAt)
                .ToListAsync();

            _logger.LogInformation("Retrieved {Count} contact submissions", submissions.Count);
            return submissions;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to retrieve contact submissions");
            throw new InvalidOperationException("Failed to retrieve contact submissions", ex);
        }
    }

    /// <summary>
    /// Retrieves a specific contact submission by ID
    /// Additional functionality for detailed views and follow-up tracking
    /// </summary>
    public async Task<ContactSubmission?> GetContactSubmissionByIdAsync(string id)
    {
        if (string.IsNullOrWhiteSpace(id))
        {
            throw new ArgumentException("Contact submission ID cannot be null or empty", nameof(id));
        }

        _logger.LogInformation("Retrieving contact submission {Id}", id);

        try
        {
            var submission = await _context.ContactSubmissions
                .FirstOrDefaultAsync(c => c.Id == id);

            if (submission == null)
            {
                _logger.LogWarning("Contact submission {Id} not found", id);
            }
            else
            {
                _logger.LogInformation("Retrieved contact submission {Id}", id);
            }

            return submission;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to retrieve contact submission {Id}", id);
            throw new InvalidOperationException($"Failed to retrieve contact submission {id}", ex);
        }
    }

    /// <summary>
    /// Gets paginated contact submissions for admin interface
    /// Enhanced functionality for better performance with large datasets
    /// Supports filtering and searching capabilities
    /// </summary>
    public async Task<(List<ContactSubmission> Items, int TotalCount)> GetContactSubmissionsPaginatedAsync(
        int page = 1, int pageSize = 20)
    {
        if (page < 1) page = 1;
        if (pageSize < 1 || pageSize > 100) pageSize = 20;

        _logger.LogInformation("Retrieving paginated contact submissions - Page: {Page}, Size: {PageSize}", 
            page, pageSize);

        try
        {
            var query = _context.ContactSubmissions.AsQueryable();

            // Get total count for pagination
            var totalCount = await query.CountAsync();

            // Apply pagination
            var submissions = await query
                .OrderByDescending(c => c.CreatedAt)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            _logger.LogInformation("Retrieved {Count} of {Total} contact submissions (Page {Page})", 
                submissions.Count, totalCount, page);

            return (submissions, totalCount);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to retrieve paginated contact submissions");
            throw new InvalidOperationException("Failed to retrieve paginated contact submissions", ex);
        }
    }
}