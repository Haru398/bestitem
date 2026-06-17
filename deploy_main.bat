@echo off
echo ==========================================
echo 정식 사이트 배포 스크립트 시작...
echo ==========================================

:: 1. master로 돌아가서 빌드
echo [1/4] 소스 브랜치(master)로 이동...
git checkout master

echo [2/4] Next.js 빌드 실행...
call cmd /c npm run build
if %errorlevel% neq 0 (
  echo 빌드 실패!
  exit /b 1
)

echo [3/4] main 브랜치로 이동 후 out 내용 교체...
git checkout main

:: out 폴더 내용 루트에 복사
xcopy /s /y /e /q out\* .

echo [4/4] Git commit & push...
git add -A
git commit -m "deploy: %date% %time%"
git push origin main

echo ==========================================
echo 배포 완료! item.monster 에 반영 중...
echo (GitHub Pages 적용까지 최대 2분 소요)
echo ==========================================
pause
