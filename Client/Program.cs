using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using KitjiStudios.Client;
using KitjiStudios.Client.Services;
using System.Net.Http;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");

// Configure HttpClient for API calls
builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });

// Add services
builder.Services.AddScoped<INavigationService, NavigationService>();
builder.Services.AddScoped<IContactService, ContactService>();
builder.Services.AddScoped<IScrollService, ScrollService>();

await builder.Build().RunAsync();