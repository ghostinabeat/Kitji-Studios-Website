using KitjiStudios.Shared.Models;

namespace KitjiStudios.Server.Services;

public interface IContactService
{
    Task<ContactSubmission> CreateContactSubmissionAsync(ContactSubmissionRequest request);
    Task<List<ContactSubmission>> GetAllContactSubmissionsAsync();
}