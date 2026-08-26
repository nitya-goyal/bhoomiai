Write-Host "=========================================================================" -ForegroundColor Cyan
Write-Host "  BhoomiAI - Intelligent Land Record Digitization and Validation System" -ForegroundColor Green
Write-Host "  National Land Record Modernization & AI Intelligence Platform" -ForegroundColor Yellow
Write-Host "=========================================================================" -ForegroundColor Cyan
Write-Host ""

$root = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host "[1/2] Starting Python FastAPI Backend Server (Port 8000)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$root\backend'; python -m uvicorn main:app --port 8000 --host 127.0.0.1 --reload"

Write-Host "[2/2] Starting Vite React Frontend (Port 5173)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$root\frontend'; npm run dev"

Write-Host ""
Write-Host "=========================================================================" -ForegroundColor Green
Write-Host "  Both servers launched successfully!" -ForegroundColor Green
Write-Host "  - Web Portal:   http://localhost:5173/" -ForegroundColor Cyan
Write-Host "  - Backend API:  http://localhost:8000/docs" -ForegroundColor Cyan
Write-Host "=========================================================================" -ForegroundColor Green
