using SendGrid;
using SendGrid.Helpers.Mail;
using KitjiStudios.Shared.Models;

namespace KitjiStudios.Server.Services;

public class EmailService : IEmailService
{
    private readonly IConfiguration _configuration;
    private readonly ISendGridClient _sendGridClient;

    public EmailService(IConfiguration configuration)
    {
        _configuration = configuration;
        var apiKey = _configuration["RESEND_API_KEY"] ?? _configuration["SENDGRID_API_KEY"];
        
        if (!string.IsNullOrEmpty(apiKey))
        {
            _sendGridClient = new SendGridClient(apiKey);
        }
        else
        {
            // Create a mock client for development
            _sendGridClient = new SendGridClient("mock-key");
        }
    }

    public async Task<bool> SendContactEmailAsync(ContactSubmissionRequest contact)
    {
        try
        {
            var apiKey = _configuration["RESEND_API_KEY"] ?? _configuration["SENDGRID_API_KEY"];
            if (string.IsNullOrEmpty(apiKey))
            {
                Console.WriteLine("No email API key configured. Email sending disabled.");
                return false;
            }

            var from = new EmailAddress("noreply@kitjistudios.com", "Kitji Studios Website");
            var to = new EmailAddress("sales@kitjistudios.com", "Kitji Studios Sales");
            var subject = $"New Project Inquiry from {contact.Name}";

            var htmlContent = $@"
                <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;'>
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
                </div>";

            var plainTextContent = $@"
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

            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = await _sendGridClient.SendEmailAsync(msg);
            
            return response.StatusCode == System.Net.HttpStatusCode.Accepted;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Email sending failed: {ex.Message}");
            return false;
        }
    }
}