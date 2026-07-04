@echo off
chcp 65001 > nul
echo [%date% %time%] 전문가이드 자동 업로드 시작 >> D:\서버구축폴더\bestitem\auto_guide.log
cd /d D:\서버구축폴더\bestitem
node auto_guide.js >> D:\서버구축폴더\bestitem\auto_guide.log 2>&1
echo [%date% %time%] 완료 >> D:\서버구축폴더\bestitem\auto_guide.log
