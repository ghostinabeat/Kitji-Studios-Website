namespace KitjiStudios.Client.Services;

public interface IScrollService
{
    Task ScrollToElementAsync(string elementId);
    Task<double> GetScrollPositionAsync();
    void InitializeScrollAnimations();
}