# QR Media Storage - System Check

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  QR Media Storage - System Check" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$allGood = $true

# Check 1: Node.js
Write-Host "Checking Node.js..." -NoNewline
try {
    $nodeVersion = node --version
    Write-Host " ✓ $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host " ✗ Not found" -ForegroundColor Red
    $allGood = $false
}

# Check 2: Dependencies
Write-Host "Checking dependencies..." -NoNewline
if (Test-Path "node_modules") {
    Write-Host " ✓ Installed" -ForegroundColor Green
} else {
    Write-Host " ✗ Run 'npm install'" -ForegroundColor Red
    $allGood = $false
}

# Check 3: Environment file
Write-Host "Checking .env.local..." -NoNewline
if (Test-Path ".env.local") {
    $content = Get-Content ".env.local" -Raw
    if ($content -match "your_groq_api_key_here") {
        Write-Host " ⚠ API key not set" -ForegroundColor Yellow
        $allGood = $false
    } else {
        Write-Host " ✓ Configured" -ForegroundColor Green
    }
} else {
    Write-Host " ✗ File missing" -ForegroundColor Red
    $allGood = $false
}

# Check 4: Upload directory
Write-Host "Checking uploads folder..." -NoNewline
if (Test-Path "public/uploads") {
    Write-Host " ✓ Exists" -ForegroundColor Green
} else {
    Write-Host " ✗ Missing" -ForegroundColor Red
    $allGood = $false
}

# Check 5: Database file
Write-Host "Checking database..." -NoNewline
if (Test-Path "data/db.json") {
    Write-Host " ✓ Ready" -ForegroundColor Green
} else {
    Write-Host " ✗ Missing" -ForegroundColor Red
    $allGood = $false
}

# Check 6: Required files
Write-Host "Checking project files..." -NoNewline
$requiredFiles = @(
    "lib/groq.js",
    "lib/db.js",
    "src/app/api/upload/route.js",
    "src/app/api/shorten/route.js",
    "src/app/api/generate-qr/route.js",
    "src/app/api/media/[id]/route.js",
    "src/app/upload/page.js",
    "src/app/media/[id]/page.js"
)

$filesMissing = @()
foreach ($file in $requiredFiles) {
    if (-not (Test-Path $file)) {
        $filesMissing += $file
    }
}

if ($filesMissing.Count -eq 0) {
    Write-Host " ✓ All present" -ForegroundColor Green
} else {
    Write-Host " ✗ Missing files" -ForegroundColor Red
    $allGood = $false
    foreach ($missing in $filesMissing) {
        Write-Host "   - $missing" -ForegroundColor Red
    }
}

# Check 7: Port availability
Write-Host "Checking port 3000..." -NoNewline
$portInUse = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
if ($portInUse) {
    Write-Host " ⚠ Port in use" -ForegroundColor Yellow
} else {
    Write-Host " ✓ Available" -ForegroundColor Green
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan

if ($allGood) {
    Write-Host "  ✓ System Ready!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "1. Make sure you've added your Groq API key to .env.local" -ForegroundColor White
    Write-Host "2. Run: npm run dev:network" -ForegroundColor White
    Write-Host "3. Open: http://localhost:3000" -ForegroundColor White
} else {
    Write-Host "  ⚠ Issues Found" -ForegroundColor Yellow
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Please fix the issues above before running." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Quick fixes:" -ForegroundColor Cyan
    Write-Host "- Missing dependencies: npm install" -ForegroundColor White
    Write-Host "- API key: Edit .env.local with your Groq API key" -ForegroundColor White
    Write-Host "- Get API key: https://console.groq.com" -ForegroundColor White
}

Write-Host ""
