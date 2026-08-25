@echo off
echo =========================================================================
echo   BhoomiAI - Intelligent Land Record Digitization and Validation System
echo   SIH 2026 Problem Statement ID: SIH26-26018
echo   Ministry of Rural Development / Department of Land Resources (DoLR)
echo =========================================================================
echo.
echo [1/2] Starting Python FastAPI Backend Server on port 8000...
start "BhoomiAI Backend API" cmd /k "cd /d %~dp0backend && python -m uvicorn main:app --port 8000 --host 127.0.0.1 --reload"

echo [2/2] Starting Vite React Frontend on port 5173...
start "BhoomiAI Frontend UI" cmd /k "cd /d %~dp0frontend && npm run dev"

echo.
echo =========================================================================
echo   Both servers launched successfully!
echo   - Web Portal:   http://localhost:5173/
echo   - Backend API:  http://localhost:8000/docs
echo =========================================================================
pause
