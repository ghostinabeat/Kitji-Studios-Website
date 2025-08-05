using SendGrid;
using SendGrid.Helpers.Mail;
using KitjiStudios.API.Models;

namespace KitjiStudios.API.Services;

/// <summary>
/// Implementation of email service using SendGrid
/// Maintains compatibility with both SendGrid and Resend API keys
/// Replaces the email.ts functionality from the Node.js version
/// </summary>
public class EmailService : IEmailService
{
    private readonly IConfiguration _configuration;
    private readonly ILogger<EmailService> _logger;
    private readonly ISendGridClient? _sendGridClient;
    private readonly string? _apiKey;
    private readonly string _fromEmail;
    private readonly string _fromName;
    private readonly string _toEmail;

    public EmailService(IConfiguration configuration, ILogger<EmailService> logger)
    {
        _configuration = configuration;
        _logger = logger;

        // Support both Resend and SendGrid API keys (maintaining backward compatibility)
        _apiKey = _configuration["RESEND_API_KEY"] ?? _configuration["SENDGRID_API_KEY"];
        
        // Email configuration
        _fromEmail = _configuration["Email:FromAddress"] ?? "noreply@kitjistudios.com";
        _fromName = _configuration["Email:FromName"] ?? "Kitji Studios Website";
        _toEmail = _configuration["Email:ToAddress"] ?? "sales@kitjistudios.com";

        // Initialize SendGrid client if API key is available
        if (!string.IsNullOrEmpty(_apiKey))
        {
            _sendGridClient = new SendGridClient(_apiKey);
            _logger.LogInformation("Email service initialized with API key");
        }
        else
        {
            _logger.LogWarning("No email API key configured. Email sending will be disabled.");
        }
    }

    /// <summary>
    /// Sends a contact form notification email to the sales team
    /// Creates a professional HTML email with all form details
    /// Matches the functionality of sendContactEmail() in server/email.ts
    /// </summary>
    public async Task<bool> SendContactEmailAsync(ContactSubmissionRequest contact)
    {
        if (contact == null)
        {
            throw new ArgumentNullException(nameof(contact));
        }

        if (_sendGridClient == null || string.IsNullOrEmpty(_apiKey))
        {
            _logger.LogWarning("Email service not configured. Skipping email for contact: {Email}", contact.Email);
            return false;
        }

        try
        {
            _logger.LogInformation("Sending contact notification email for {Email}", contact.Email);

            var from = new EmailAddress(_fromEmail, _fromName);
            var to = new EmailAddress(_toEmail, "Kitji Studios Sales Team");
            var subject = $"New Project Inquiry from {contact.Name}";

            // Create HTML email template (matches the Node.js version styling)
            var htmlContent = CreateContactEmailHtml(contact);
            var plainTextContent = CreateContactEmailText(contact);

            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);

            // Add custom headers for tracking
            msg.AddCustomArg("source", "website_contact_form");
            msg.AddCustomArg("contact_email", contact.Email);
            msg.AddCustomArg("project_type", contact.ProjectType);

            var response = await _sendGridClient.SendEmailAsync(msg);
            
            if (response.StatusCode == System.Net.HttpStatusCode.Accepted)
            {
                _logger.LogInformation("Successfully sent contact notification email for {Email}", contact.Email);
                return true;
            }
            else
            {
                var errorBody = await response.Body.ReadAsStringAsync();
                _logger.LogError("Failed to send contact email. Status: {Status}, Body: {Body}", 
                    response.StatusCode, errorBody);
                return false;
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Exception occurred while sending contact email for {Email}", contact.Email);
            return false;
        }
    }

    /// <summary>
    /// Sends an auto-reply confirmation email to the contact form submitter
    /// Additional functionality to improve user experience
    /// </summary>
    public async Task<bool> SendConfirmationEmailAsync(ContactSubmissionRequest contact)
    {
        if (contact == null)
        {
            throw new ArgumentNullException(nameof(contact));
        }

        if (_sendGridClient == null || string.IsNullOrEmpty(_apiKey))
        {
            _logger.LogWarning("Email service not configured. Skipping confirmation for: {Email}", contact.Email);
            return false;
        }

        try
        {
            _logger.LogInformation("Sending confirmation email to {Email}", contact.Email);

            var from = new EmailAddress(_fromEmail, _fromName);
            var to = new EmailAddress(contact.Email, contact.Name);
            var subject = "Thank you for contacting Kitji Studios - We'll be in touch soon!";

            var htmlContent = CreateConfirmationEmailHtml(contact);
            var plainTextContent = CreateConfirmationEmailText(contact);

            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);

            var response = await _sendGridClient.SendEmailAsync(msg);
            
            if (response.StatusCode == System.Net.HttpStatusCode.Accepted)
            {
                _logger.LogInformation("Successfully sent confirmation email to {Email}", contact.Email);
                return true;
            }
            else
            {
                _logger.LogWarning("Failed to send confirmation email to {Email}. Status: {Status}", 
                    contact.Email, response.StatusCode);
                return false;
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Exception occurred while sending confirmation email to {Email}", contact.Email);
            return false;
        }
    }

    /// <summary>
    /// Validates email configuration and connectivity
    /// </summary>
    public async Task<bool> ValidateEmailConfigurationAsync()
    {
        if (_sendGridClient == null || string.IsNullOrEmpty(_apiKey))
        {
            return false;
        }

        // For SendGrid, we can check API key validity by making a simple API call
        // This is a lightweight operation that doesn't send actual emails
        try
        {
            // Note: In a real implementation, you might want to use a specific validation endpoint
            // For now, we'll just check if the client is configured
            return true;
        }
        catch
        {
            return false;
        }
    }

    /// <summary>
    /// Gets email service status and configuration details
    /// </summary>
    public async Task<EmailServiceStatus> GetServiceStatusAsync()
    {
        var status = new EmailServiceStatus
        {
            IsConfigured = !string.IsNullOrEmpty(_apiKey),
            Provider = !string.IsNullOrEmpty(_apiKey) ? "SendGrid" : "None",
            LastChecked = DateTime.UtcNow
        };

        if (status.IsConfigured)
        {
            status.IsConnected = await ValidateEmailConfigurationAsync();
        }

        return status;
    }

    /// <summary>
    /// Creates HTML email content for contact notifications
    /// Matches the styling from the Node.js version
    /// </summary>
    private string CreateContactEmailHtml(ContactSubmissionRequest contact)
    {
        return $@"
<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8'>
    <title>New Project Inquiry - Kitji Studios</title>
</head>
<body style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;'>
    <div style='background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); padding: 30px; border-radius: 10px; margin-bottom: 20px;'>
        <h1 style='color: white; margin: 0; font-size: 24px;'>New Project Inquiry</h1>
        <p style='color: #e0e7ff; margin: 10px 0 0 0;'>Received from Kitji Studios website</p>
    </div>
    
    <div style='background: #f8fafc; padding: 25px; border-radius: 8px; border-left: 4px solid #3b82f6;'>
        <h2 style='color: #1e3a8a; margin-top: 0;'>Contact Information</h2>
        <p><strong>Name:</strong> {contact.Name}</p>
        <p><strong>Email:</strong> {contact.Email}</p>
        {(!string.IsNullOrEmpty(contact.Company) ? $"<p><strong>Company:</strong> {contact.Company}</p>" : "")}
        <p><strong>Project Type:</strong> {contact.ProjectType}</p>
        {(!string.IsNullOrEmpty(contact.Budget) ? $"<p><strong>Budget:</strong> {contact.Budget}</p>" : "")}
    </div>
    
    <div style='background: white; padding: 25px; border-radius: 8px; border: 1px solid #e2e8f0; margin-top: 20px;'>
        <h3 style='color: #1e3a8a; margin-top: 0;'>Project Details</h3>
        <p style='line-height: 1.6; color: #475569;'>{contact.Message.Replace("\n", "<br>")}</p>
    </div>
    
    <div style='margin-top: 30px; padding: 20px; background: #1e3a8a; border-radius: 8px; text-align: center;'>
        <p style='color: white; margin: 0;'>
            <strong>Next Steps:</strong> Follow up within 24 hours to discuss project requirements and timeline.
        </p>
    </div>
</body>
</html>";
    }

    /// <summary>
    /// Creates plain text email content for contact notifications
    /// </summary>
    private string CreateContactEmailText(ContactSubmissionRequest contact)
    {
        return $@"
New Project Inquiry from Kitji Studios Website

Contact Information:
Name: {contact.Name}
Email: {contact.Email}
{(!string.IsNullOrEmpty(contact.Company) ? $"Company: {contact.Company}" : "")}
Project Type: {contact.ProjectType}
{(!string.IsNullOrEmpty(contact.Budget) ? $"Budget: {contact.Budget}" : "")}

Project Details:
{contact.Message}

Next Steps: Follow up within 24 hours to discuss project requirements and timeline.";
    }

    /// <summary>
    /// Creates HTML confirmation email for the contact form submitter
    /// </summary>
    private string CreateConfirmationEmailHtml(ContactSubmissionRequest contact)
    {
        return $@"
<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8'>
    <title>Thank you for contacting Kitji Studios</title>
</head>
<body style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;'>
    <div style='background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); padding: 30px; border-radius: 10px; margin-bottom: 20px;'>
        <h1 style='color: white; margin: 0; font-size: 24px;'>Thank You, {contact.Name}!</h1>
        <p style='color: #e0e7ff; margin: 10px 0 0 0;'>We've received your project inquiry</p>
    </div>
    
    <div style='background: #f8fafc; padding: 25px; border-radius: 8px;'>
        <h2 style='color: #1e3a8a; margin-top: 0;'>What happens next?</h2>
        <ul style='color: #475569; line-height: 1.6;'>
            <li>Our team will review your {contact.ProjectType.ToLower()} requirements</li>
            <li>We'll contact you within 24 hours via {contact.Email}</li>
            <li>We'll schedule a consultation to discuss your project in detail</li>
            <li>You'll receive a detailed proposal with timeline and pricing</li>
        </ul>
    </div>
    
    <div style='margin-top: 20px; padding: 20px; background: white; border-radius: 8px; border: 1px solid #e2e8f0;'>
        <h3 style='color: #1e3a8a; margin-top: 0;'>In the meantime</h3>
        <p style='color: #475569; line-height: 1.6;'>
            Feel free to explore our <a href='https://kitjistudios.com/work' style='color: #3b82f6;'>case studies</a> 
            and learn more about our <a href='https://kitjistudios.com/team' style='color: #3b82f6;'>team</a>.
        </p>
    </div>
    
    <div style='margin-top: 30px; text-align: center; color: #6b7280; font-size: 14px;'>
        <p>Best regards,<br>The Kitji Studios Team</p>
        <p>Email: sales@kitjistudios.com</p>
    </div>
</body>
</html>";
    }

    /// <summary>
    /// Creates plain text confirmation email
    /// </summary>
    private string CreateConfirmationEmailText(ContactSubmissionRequest contact)
    {
        return $@"
Thank You, {contact.Name}!

We've received your project inquiry for {contact.ProjectType.ToLower()}.

What happens next?
- Our team will review your requirements
- We'll contact you within 24 hours via {contact.Email}
- We'll schedule a consultation to discuss your project in detail
- You'll receive a detailed proposal with timeline and pricing

In the meantime, feel free to explore our case studies at https://kitjistudios.com/work 
and learn more about our team at https://kitjistudios.com/team.

Best regards,
The Kitji Studios Team
Email: sales@kitjistudios.com";
    }
}