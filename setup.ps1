# Setup Script for Lingo with Tea
# Run this script to set up your development environment

Write-Host "☕ Welcome to Lingo with Tea Setup!" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
Write-Host "Checking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js is installed: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Node.js is not installed!" -ForegroundColor Red
    Write-Host "Please install Node.js from https://nodejs.org/" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Check if npm is available
Write-Host "Checking npm installation..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version
    Write-Host "✓ npm is installed: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ npm is not available!" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Install dependencies
Write-Host "Installing dependencies..." -ForegroundColor Yellow
Write-Host "This may take a few minutes..." -ForegroundColor Gray
npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Dependencies installed successfully!" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to install dependencies" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Check if .env exists
if (Test-Path ".env") {
    Write-Host "✓ .env file already exists" -ForegroundColor Green
} else {
    Write-Host "Creating .env file from template..." -ForegroundColor Yellow
    Copy-Item .env.example .env
    Write-Host "✓ .env file created" -ForegroundColor Green
    Write-Host ""
    Write-Host "⚠️  IMPORTANT: Please edit .env and add your Gemini API key!" -ForegroundColor Yellow
    Write-Host "Get your API key from: https://makersuite.google.com/app/apikey" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "✅ Setup Complete!" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Add your Gemini API key to .env file" -ForegroundColor White
Write-Host "2. Run: npm start" -ForegroundColor White
Write-Host "3. Open http://localhost:3000 in your browser" -ForegroundColor White
Write-Host ""
Write-Host "For more information, see:" -ForegroundColor Yellow
Write-Host "- README.md (full documentation)" -ForegroundColor White
Write-Host "- QUICKSTART.md (quick start guide)" -ForegroundColor White
Write-Host "- PROJECT_SUMMARY.md (project overview)" -ForegroundColor White
Write-Host ""
Write-Host "Happy Learning! ☕📚" -ForegroundColor Cyan
