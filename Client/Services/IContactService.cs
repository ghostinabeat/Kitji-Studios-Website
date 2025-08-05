using KitjiStudios.Shared.Models;

namespace KitjiStudios.Client.Services;

public interface IContactService
{
    Task<ContactSubmissionResponse> SubmitContactAsync(ContactSubmissionRequest request);
}