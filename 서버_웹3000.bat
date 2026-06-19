@echo off
chcp 65001 > nul
title [웹서버-3000] 자동재시작

:RESTART
echo.
echo ============================================
echo  Next.js 웹서버 시작 (포트 3000)  %time%
echo ============================================
npm run dev
echo.
echo [!] 종료됨. 3초 후 재시작...
timeout /t 3 /nobreak > nul
goto RESTART
