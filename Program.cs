using System.Diagnostics;

var startInfo = new ProcessStartInfo
{
    FileName = "dotnet",
    Arguments = "run --project Server/KitjiStudios.Server.csproj",
    UseShellExecute = false,
    RedirectStandardOutput = true,
    RedirectStandardError = true,
    CreateNoWindow = true
};

using var process = Process.Start(startInfo);
if (process != null)
{
    process.WaitForExit();
}
else
{
    Console.WriteLine("Failed to start C# application. Falling back to Node.js version.");
}