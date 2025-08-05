using Microsoft.JSInterop;

namespace KitjiStudios.Client.Services;

public class ScrollService : IScrollService
{
    private readonly IJSRuntime _jsRuntime;

    public ScrollService(IJSRuntime jsRuntime)
    {
        _jsRuntime = jsRuntime;
    }

    public async Task ScrollToElementAsync(string elementId)
    {
        await _jsRuntime.InvokeVoidAsync("scrollAnimations.scrollToElement", elementId);
    }

    public async Task<double> GetScrollPositionAsync()
    {
        return await _jsRuntime.InvokeAsync<double>("window.pageYOffset");
    }

    public void InitializeScrollAnimations()
    {
        _ = _jsRuntime.InvokeVoidAsync("scrollAnimations.initialize");
    }
}