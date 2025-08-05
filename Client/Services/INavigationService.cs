namespace KitjiStudios.Client.Services;

public interface INavigationService
{
    void NavigateTo(string url);
    string GetCurrentPath();
    event Action<string>? LocationChanged;
}