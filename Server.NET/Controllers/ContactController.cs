using Microsoft.AspNetCore.Mvc;
using KitjiStudios.API.Services;
using KitjiStudios.API.Models;
using FluentValidation;

namespace KitjiStudios.API.Controllers;

/// <summary>
/// API controller for contact form operations
/// Replaces the routes defined in server/routes.ts from the Node.js version
/// Provides the same endpoints with enhanced error handling and validation
/// </summary>
[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public class ContactController : ControllerBase
{
    private readonly IContactService _contactService;
    private readonly IEmailService _emailService;
    private readonly IValidator<ContactSubmissionRequest> _validator;
    private readonly ILogger<ContactController> _logger;

    public ContactController(
        IContactService contactService, 
        IEmailService emailService,
        IValidator<ContactSubmissionRequest> validator,
        ILogger<ContactController> logger)
    {
        _contactService = contactService;
        _emailService = emailService;
        _validator = validator;
        _logger = logger;
    }

    /// <summary>
    /// Submits a new contact form from the React frontend
    /// POST /api/contact - Matches the endpoint used by React Contact.tsx component
    /// </summary>
    /// <param name="request">Contact form data from React frontend</param>
    /// <returns>Success response with submission ID or error details</returns>
    /// <response code="200">Contact form submitted successfully</response>
    /// <response code="400">Validation errors in the form data</response>
    /// <response code="500">Internal server error during processing</response>
    [HttpPost]
    [ProducesResponseType(typeof(ContactSubmissionResponse), 200)]
    [ProducesResponseType(typeof(ContactSubmissionResponse), 400)]
    [ProducesResponseType(typeof(ContactSubmissionResponse), 500)]
    public async Task<ActionResult<ContactSubmissionResponse>> SubmitContact([FromBody] ContactSubmissionRequest request)
    {
        _logger.LogInformation("Received contact form submission from {Email}", request?.Email);

        try
        {
            // Validate the request using FluentValidation (replaces Zod validation)
            var validationResult = await _validator.ValidateAsync(request!);
            if (!validationResult.IsValid)
            {
                _logger.LogWarning("Contact form validation failed for {Email}: {Errors}", 
                    request?.Email, string.Join(", ", validationResult.Errors.Select(e => e.ErrorMessage)));

                return BadRequest(new ContactSubmissionResponse
                {
                    Success = false,
                    Message = "Please check your form data and try again.",
                    Errors = validationResult.Errors.Select(e => e.ErrorMessage).ToList()
                });
            }

            // Store in database (replaces storage.createContactSubmission)
            var submission = await _contactService.CreateContactSubmissionAsync(request!);

            // Send notification email to sales team
            var emailSent = await _emailService.SendContactEmailAsync(request!);

            // Send confirmation email to submitter (enhanced functionality)
            var confirmationSent = await _emailService.SendConfirmationEmailAsync(request!);

            // Prepare success response message (matches Node.js version)
            var message = emailSent
                ? "Thank you for your project inquiry! Our sales team has received it and will contact you within 24 hours to discuss next steps."
                : "Thank you for your project inquiry! We've received it. For urgent matters, please contact sales@kitjistudios.com directly.";

            _logger.LogInformation("Successfully processed contact submission {Id} from {Email}. Email sent: {EmailSent}, Confirmation sent: {ConfirmationSent}",
                submission.Id, request.Email, emailSent, confirmationSent);

            return Ok(new ContactSubmissionResponse
            {
                Success = true,
                Message = message,
                Id = submission.Id
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error processing contact form submission from {Email}", request?.Email);
            
            return StatusCode(500, new ContactSubmissionResponse
            {
                Success = false,
                Message = "Sorry, there was an error sending your message. Please try again later."
            });
        }
    }

    /// <summary>
    /// Retrieves all contact submissions for admin purposes
    /// GET /api/contact - Matches the admin endpoint from Node.js version
    /// </summary>
    /// <returns>List of all contact submissions</returns>
    /// <response code="200">Successfully retrieved contact submissions</response>
    /// <response code="500">Internal server error during retrieval</response>
    [HttpGet]
    [ProducesResponseType(typeof(List<ContactSubmission>), 200)]
    [ProducesResponseType(500)]
    public async Task<ActionResult<List<ContactSubmission>>> GetAllSubmissions()
    {
        _logger.LogInformation("Retrieving all contact submissions for admin view");

        try
        {
            var submissions = await _contactService.GetAllContactSubmissionsAsync();
            
            _logger.LogInformation("Successfully retrieved {Count} contact submissions", submissions.Count);
            return Ok(submissions);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving contact submissions");
            return StatusCode(500, new { success = false, message = "Error retrieving contact submissions" });
        }
    }

    /// <summary>
    /// Retrieves paginated contact submissions for admin interface
    /// GET /api/contact/paginated - Enhanced functionality for better performance
    /// </summary>
    /// <param name="page">Page number (1-based)</param>
    /// <param name="pageSize">Number of items per page (max 100)</param>
    /// <returns>Paginated list of contact submissions with total count</returns>
    [HttpGet("paginated")]
    [ProducesResponseType(typeof(object), 200)]
    [ProducesResponseType(400)]
    [ProducesResponseType(500)]
    public async Task<ActionResult<object>> GetSubmissionsPaginated(
        [FromQuery] int page = 1, 
        [FromQuery] int pageSize = 20)
    {
        if (page < 1)
        {
            return BadRequest(new { success = false, message = "Page number must be greater than 0" });
        }

        if (pageSize < 1 || pageSize > 100)
        {
            return BadRequest(new { success = false, message = "Page size must be between 1 and 100" });
        }

        _logger.LogInformation("Retrieving paginated contact submissions - Page: {Page}, Size: {PageSize}", page, pageSize);

        try
        {
            var (items, totalCount) = await _contactService.GetContactSubmissionsPaginatedAsync(page, pageSize);
            
            var response = new
            {
                success = true,
                data = items,
                pagination = new
                {
                    page,
                    pageSize,
                    totalCount,
                    totalPages = (int)Math.Ceiling((double)totalCount / pageSize),
                    hasNextPage = page * pageSize < totalCount,
                    hasPreviousPage = page > 1
                }
            };

            _logger.LogInformation("Successfully retrieved {Count} of {Total} contact submissions (Page {Page})", 
                items.Count, totalCount, page);

            return Ok(response);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving paginated contact submissions");
            return StatusCode(500, new { success = false, message = "Error retrieving contact submissions" });
        }
    }

    /// <summary>
    /// Retrieves a specific contact submission by ID
    /// GET /api/contact/{id} - Enhanced functionality for detailed views
    /// </summary>
    /// <param name="id">Contact submission ID</param>
    /// <returns>Contact submission details or 404 if not found</returns>
    [HttpGet("{id}")]
    [ProducesResponseType(typeof(ContactSubmission), 200)]
    [ProducesResponseType(404)]
    [ProducesResponseType(500)]
    public async Task<ActionResult<ContactSubmission>> GetSubmissionById(string id)
    {
        if (string.IsNullOrWhiteSpace(id))
        {
            return BadRequest(new { success = false, message = "Contact submission ID is required" });
        }

        _logger.LogInformation("Retrieving contact submission {Id}", id);

        try
        {
            var submission = await _contactService.GetContactSubmissionByIdAsync(id);
            
            if (submission == null)
            {
                _logger.LogWarning("Contact submission {Id} not found", id);
                return NotFound(new { success = false, message = "Contact submission not found" });
            }

            _logger.LogInformation("Successfully retrieved contact submission {Id}", id);
            return Ok(submission);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving contact submission {Id}", id);
            return StatusCode(500, new { success = false, message = "Error retrieving contact submission" });
        }
    }

    /// <summary>
    /// Gets email service status for monitoring and health checks
    /// GET /api/contact/email-status - Enhanced functionality for system monitoring
    /// </summary>
    /// <returns>Email service configuration and status</returns>
    [HttpGet("email-status")]
    [ProducesResponseType(typeof(EmailServiceStatus), 200)]
    public async Task<ActionResult<EmailServiceStatus>> GetEmailStatus()
    {
        _logger.LogInformation("Checking email service status");

        var status = await _emailService.GetServiceStatusAsync();
        
        _logger.LogInformation("Email service status: Configured={IsConfigured}, Provider={Provider}, Connected={IsConnected}", 
            status.IsConfigured, status.Provider, status.IsConnected);

        return Ok(status);
    }
}