using Microsoft.AspNetCore.Mvc;
using KitjiStudios.Server.Services;
using KitjiStudios.Shared.Models;
using FluentValidation;

namespace KitjiStudios.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ContactController : ControllerBase
{
    private readonly IContactService _contactService;
    private readonly IEmailService _emailService;
    private readonly IValidator<ContactSubmissionRequest> _validator;

    public ContactController(
        IContactService contactService, 
        IEmailService emailService,
        IValidator<ContactSubmissionRequest> validator)
    {
        _contactService = contactService;
        _emailService = emailService;
        _validator = validator;
    }

    [HttpPost]
    public async Task<ActionResult<ContactSubmissionResponse>> SubmitContact([FromBody] ContactSubmissionRequest request)
    {
        try
        {
            // Validate the request
            var validationResult = await _validator.ValidateAsync(request);
            if (!validationResult.IsValid)
            {
                return BadRequest(new ContactSubmissionResponse
                {
                    Success = false,
                    Message = "Please check your form data and try again.",
                    Errors = validationResult.Errors.Select(e => e.ErrorMessage).ToList()
                });
            }

            // Store in database
            var submission = await _contactService.CreateContactSubmissionAsync(request);

            // Send email notification
            var emailSent = await _emailService.SendContactEmailAsync(request);

            var message = emailSent
                ? "Thank you for your project inquiry! Our sales team has received it and will contact you within 24 hours to discuss next steps."
                : "Thank you for your project inquiry! We've received it. For urgent matters, please contact sales@kitjistudios.com directly.";

            return Ok(new ContactSubmissionResponse
            {
                Success = true,
                Message = message,
                Id = submission.Id
            });
        }
        catch (Exception ex)
        {
            // Log the error (you might want to add proper logging here)
            Console.WriteLine($"Contact form error: {ex.Message}");
            
            return StatusCode(500, new ContactSubmissionResponse
            {
                Success = false,
                Message = "Sorry, there was an error sending your message. Please try again later."
            });
        }
    }

    [HttpGet]
    public async Task<ActionResult<List<ContactSubmission>>> GetAllSubmissions()
    {
        try
        {
            var submissions = await _contactService.GetAllContactSubmissionsAsync();
            return Ok(submissions);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error fetching contact submissions: {ex.Message}");
            return StatusCode(500, new { success = false, message = "Error retrieving contact submissions" });
        }
    }
}