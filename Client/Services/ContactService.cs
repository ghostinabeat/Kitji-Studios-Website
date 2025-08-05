using System.Net.Http.Json;
using KitjiStudios.Shared.Models;

namespace KitjiStudios.Client.Services;

public class ContactService : IContactService
{
    private readonly HttpClient _httpClient;

    public ContactService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<ContactSubmissionResponse> SubmitContactAsync(ContactSubmissionRequest request)
    {
        try
        {
            var response = await _httpClient.PostAsJsonAsync("api/contact", request);
            
            if (response.IsSuccessStatusCode)
            {
                return await response.Content.ReadFromJsonAsync<ContactSubmissionResponse>() 
                    ?? new ContactSubmissionResponse { Success = false, Message = "Invalid response" };
            }
            else
            {
                var errorResponse = await response.Content.ReadFromJsonAsync<ContactSubmissionResponse>();
                return errorResponse ?? new ContactSubmissionResponse 
                { 
                    Success = false, 
                    Message = "An error occurred while submitting your message." 
                };
            }
        }
        catch (Exception ex)
        {
            return new ContactSubmissionResponse
            {
                Success = false,
                Message = "Network error. Please check your connection and try again."
            };
        }
    }
}