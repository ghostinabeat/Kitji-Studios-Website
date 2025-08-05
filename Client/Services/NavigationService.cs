using Microsoft.AspNetCore.Components;

namespace KitjiStudios.Client.Services;

public class NavigationService : INavigationService
{
    private readonly NavigationManager _navigationManager;
    public event Action<string>? LocationChanged;

    public NavigationService(NavigationManager navigationManager)
    {
        _navigationManager = navigationManager;
        _navigationManager.LocationChanged += OnLocationChanged;
    }

    public void NavigateTo(string url)
    {
        _navigationManager.NavigateTo(url);
    }

    public string GetCurrentPath()
    {
        var uri = new Uri(_navigationManager.Uri);
        return uri.AbsolutePath;
    }

    private void OnLocationChanged(object? sender, LocationChangedEventArgs e)
    {
        var uri = new Uri(e.Location);
        LocationChanged?.Invoke(uri.AbsolutePath);
    }
}