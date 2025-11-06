# QR Media Storage - Setup Script

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  QR Media Storage - Setup Wizard" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Check Node.js
Write-Host "[1/4] Checking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Node.js not found! Please install Node.js 18+ from https://nodejs.org" -ForegroundColor Red
    exit 1
}

# Step 2: Check if .env.local exists
Write-Host ""
Write-Host "[2/4] Checking environment configuration..." -ForegroundColor Yellow
if (Test-Path ".env.local") {
    Write-Host "✓ .env.local file found" -ForegroundColor Green
    
    $content = Get-Content ".env.local" -Raw
    if ($content -match "your_groq_api_key_here") {
        Write-Host ""
        Write-Host "⚠️  WARNING: You need to add your Groq API key!" -ForegroundColor Red
        Write-Host ""
        Write-Host "1. Get a free API key from: https://console.groq.com" -ForegroundColor Cyan
        Write-Host "2. Open .env.local and replace 'your_groq_api_key_here' with your key" -ForegroundColor Cyan
        Write-Host ""
        
        $openFile = Read-Host "Would you like to open .env.local now? (y/n)"
        if ($openFile -eq "y" -or $openFile -eq "Y") {
            notepad .env.local
        }
    } else {
        Write-Host "✓ Groq API key appears to be set" -ForegroundColor Green
    }
} else {
    Write-Host "✗ .env.local not found!" -ForegroundColor Red
    exit 1
}

# Step 3: Get network IP
Write-Host ""
Write-Host "[3/4] Detecting network configuration..." -ForegroundColor Yellow
$ipAddresses = Get-NetIPAddress -AddressFamily IPv4 | 
    Where-Object { $_.IPAddress -notlike "127.*" -and $_.InterfaceAlias -notlike "*Loopback*" } |
    Select-Object IPAddress -First 1

if ($ipAddresses) {
    $localIP = $ipAddresses.IPAddress
    Write-Host "✓ Network IP detected: $localIP" -ForegroundColor Green
    Write-Host ""
    Write-Host "  Your app will be accessible at:" -ForegroundColor Cyan
    Write-Host "  - Local:   http://localhost:3000" -ForegroundColor White
    Write-Host "  - Network: http://${localIP}:3000" -ForegroundColor White
} else {
    Write-Host "⚠️  Could not detect network IP" -ForegroundColor Yellow
    Write-Host "  You can still use: http://localhost:3000" -ForegroundColor White
}

# Step 4: Ready to start
Write-Host ""
Write-Host "[4/4] Setup complete!" -ForegroundColor Yellow
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Ready to Start!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "To start the development server:" -ForegroundColor Green
Write-Host ""
Write-Host "  npm run dev           " -ForegroundColor White -NoNewline
Write-Host "  (local only)" -ForegroundColor Gray
Write-Host "  npm run dev:network   " -ForegroundColor White -NoNewline
Write-Host "  (accessible on network)" -ForegroundColor Gray
Write-Host ""
Write-Host "Then open: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""

$startNow = Read-Host "Would you like to start the server now? (y/n)"
if ($startNow -eq "y" -or $startNow -eq "Y") {
    Write-Host ""
    Write-Host "Starting server with network access..." -ForegroundColor Green
    Write-Host ""
    npm run dev:network
}
