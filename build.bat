@echo off
echo ==========================================
echo Starting SSG Build Script...
echo ==========================================

if exist ..\api_backup (
    move ..\api_backup src\app\api >nul
)

echo [1/2] Cleaning .next cache...
if exist .next rd /s /q .next

echo [2/2] Running Next.js Build...
call npm.cmd run build

echo ==========================================
echo Build Completed!
echo Upload the contents of the 'out' folder to GitHub Pages.
echo ==========================================
pause
