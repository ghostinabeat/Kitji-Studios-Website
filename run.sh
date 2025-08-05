#!/bin/bash

# Check if .NET is available
if command -v dotnet &> /dev/null; then
    echo "Starting C# application..."
    cd Server
    dotnet run
else
    echo ".NET not available. Starting Node.js application..."
    npm run dev
fi