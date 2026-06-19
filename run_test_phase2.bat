@echo off
cd /d D:\서버구축폴더\bestitem
start /b node automation_server.js > server1.log 2>&1
start /b node ai_worker.js > server2.log 2>&1
ping 127.0.0.1 -n 4 > nul
node test_phase2.js
taskkill /f /im node.exe > nul 2>&1
