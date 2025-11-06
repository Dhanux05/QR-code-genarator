# Helper script to get your local network IP address

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Local Network IP Addresses" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Get IPv4 addresses
$ipAddresses = Get-NetIPAddress -AddressFamily IPv4 | 
    Where-Object { $_.IPAddress -notlike "127.*" -and $_.InterfaceAlias -notlike "*Loopback*" } |
    Select-Object IPAddress, InterfaceAlias

if ($ipAddresses) {
    foreach ($ip in $ipAddresses) {
        Write-Host "Interface: " -NoNewline -ForegroundColor Yellow
        Write-Host $ip.InterfaceAlias
        Write-Host "IP Address: " -NoNewline -ForegroundColor Green
        Write-Host $ip.IPAddress -ForegroundColor Green
        Write-Host ""
        Write-Host "Access your app at: " -NoNewline -ForegroundColor Cyan
        Write-Host "http://$($ip.IPAddress):3000" -ForegroundColor White
        Write-Host "----------------------------------------"
        Write-Host ""
    }
} else {
    Write-Host "No network IP addresses found" -ForegroundColor Red
}

Write-Host "Local access: " -NoNewline -ForegroundColor Cyan
Write-Host "http://localhost:3000" -ForegroundColor White
Write-Host ""
Write-Host "Press any key to continue..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
