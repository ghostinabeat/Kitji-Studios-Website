using KitjiStudios.Shared.Models;

namespace KitjiStudios.Server.Services;

public interface IEmailService
{
    Task<bool> SendContactEmailAsync(ContactSubmissionRequest contact);
}