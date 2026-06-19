@echo off
chcp 65001 > nul
title [자동화서버-3333] 자동재시작

:RESTART
echo.
echo ============================================
echo  자동화 서버 시작 (포트 3333)  %time%
echo ============================================
node automation_server.js
echo.
echo [!] 종료됨. 3초 후 재시작...
timeout /t 3 /nobreak > nul
goto RESTART
