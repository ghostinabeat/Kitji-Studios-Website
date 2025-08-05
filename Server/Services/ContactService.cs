using KitjiStudios.Server.Data;
using KitjiStudios.Shared.Models;
using Microsoft.EntityFrameworkCore;

namespace KitjiStudios.Server.Services;

public class ContactService : IContactService
{
    private readonly ApplicationDbContext _context;

    public ContactService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<ContactSubmission> CreateContactSubmissionAsync(ContactSubmissionRequest request)
    {
        var submission = new ContactSubmission
        {
            Id = Guid.NewGuid().ToString(),
            Name = request.Name,
            Email = request.Email,
            Company = request.Company,
            ProjectType = request.ProjectType,
            Budget = request.Budget,
            Message = request.Message,
            CreatedAt = DateTime.UtcNow
        };

        _context.ContactSubmissions.Add(submission);
        await _context.SaveChangesAsync();

        return submission;
    }

    public async Task<List<ContactSubmission>> GetAllContactSubmissionsAsync()
    {
        return await _context.ContactSubmissions
            .OrderByDescending(c => c.CreatedAt)
            .ToListAsync();
    }
}