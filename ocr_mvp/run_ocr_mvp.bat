@echo off
echo =========================================================
echo   BhoomiAI - Standalone Land Record OCR MVP
echo =========================================================
echo.
echo Starting OCR Server on http://127.0.0.1:5000...
start "" http://127.0.0.1:5000
python app.py
pause
