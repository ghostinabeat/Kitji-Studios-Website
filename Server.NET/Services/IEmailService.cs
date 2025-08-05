using KitjiStudios.API.Models;

namespace KitjiStudios.API.Services;

/// <summary>
/// Service interface for email operations
/// Provides the same functionality as the email.ts module in the Node.js version
/// Supports both SendGrid and Resend API configurations
/// </summary>
public interface IEmailService
{
    /// <summary>
    /// Sends a contact form notification email to the sales team
    /// Equivalent to sendContactEmail() function in server/email.ts
    /// Uses HTML templates and professional formatting
    /// </summary>
    /// <param name="contact">The contact form submission data</param>
    /// <returns>True if email was sent successfully, false otherwise</returns>
    /// <exception cref="ArgumentNullException">Thrown when contact is null</exception>
    Task<bool> SendContactEmailAsync(ContactSubmissionRequest contact);

    /// <summary>
    /// Sends an auto-reply confirmation email to the person who submitted the form
    /// Additional functionality to improve user experience
    /// </summary>
    /// <param name="contact">The contact form submission data</param>
    /// <returns>True if confirmation email was sent successfully, false otherwise</returns>
    Task<bool> SendConfirmationEmailAsync(ContactSubmissionRequest contact);

    /// <summary>
    /// Validates email configuration and connectivity
    /// Useful for health checks and startup validation
    /// </summary>
    /// <returns>True if email service is properly configured and accessible</returns>
    Task<bool> ValidateEmailConfigurationAsync();

    /// <summary>
    /// Gets email service status and configuration details
    /// For monitoring and debugging purposes
    /// </summary>
    /// <returns>Email service configuration status</returns>
    Task<EmailServiceStatus> GetServiceStatusAsync();
}

/// <summary>
/// Represents the status and configuration of the email service
/// Used for health checks and monitoring
/// </summary>
public class EmailServiceStatus
{
    public bool IsConfigured { get; set; }
    public string Provider { get; set; } = string.Empty; // "SendGrid", "Resend", or "None"
    public bool IsConnected { get; set; }
    public DateTime LastChecked { get; set; }
    public string? ErrorMessage { get; set; }
}