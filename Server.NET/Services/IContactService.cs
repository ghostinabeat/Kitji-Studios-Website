using KitjiStudios.API.Models;

namespace KitjiStudios.API.Services;

/// <summary>
/// Service interface for contact form operations
/// Provides the same functionality as the storage interface in server/storage.ts
/// Abstraction allows for easy testing and future implementation changes
/// </summary>
public interface IContactService
{
    /// <summary>
    /// Creates a new contact submission in the database
    /// Equivalent to storage.createContactSubmission() in Node.js version
    /// </summary>
    /// <param name="request">The contact form data from React frontend</param>
    /// <returns>The created contact submission with generated ID and timestamp</returns>
    /// <exception cref="ArgumentException">Thrown when request data is invalid</exception>
    /// <exception cref="InvalidOperationException">Thrown when database operation fails</exception>
    Task<ContactSubmission> CreateContactSubmissionAsync(ContactSubmissionRequest request);

    /// <summary>
    /// Retrieves all contact submissions, ordered by creation date (newest first)  
    /// Equivalent to storage.getAllContactSubmissions() in Node.js version
    /// Used by admin endpoints and reporting
    /// </summary>
    /// <returns>List of all contact submissions</returns>
    /// <exception cref="InvalidOperationException">Thrown when database query fails</exception>
    Task<List<ContactSubmission>> GetAllContactSubmissionsAsync();

    /// <summary>
    /// Retrieves a specific contact submission by ID
    /// Additional functionality not present in original Node.js version
    /// Useful for detailed views and follow-up tracking
    /// </summary>
    /// <param name="id">The unique identifier of the contact submission</param>
    /// <returns>The contact submission if found, null otherwise</returns>
    /// <exception cref="ArgumentException">Thrown when ID is null or empty</exception>
    Task<ContactSubmission?> GetContactSubmissionByIdAsync(string id);

    /// <summary>
    /// Gets paginated contact submissions for admin interface
    /// Enhanced functionality for better performance with large datasets
    /// </summary>
    /// <param name="page">Page number (1-based)</param>
    /// <param name="pageSize">Number of items per page</param>
    /// <returns>Paginated list of contact submissions</returns>
    Task<(List<ContactSubmission> Items, int TotalCount)> GetContactSubmissionsPaginatedAsync(int page = 1, int pageSize = 20);
}