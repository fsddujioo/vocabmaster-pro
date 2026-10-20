@echo off
chcp 65001 >nul
cd /d "%~dp0"
where node >nul 2>&1
if errorlevel 1 (
  echo Node.js is needed for the local AI bridge. Opening the offline app instead.
  start "" "%~dp0index.html"
  pause
  exit /b
)
cscript //nologo "%~dp0launch_app.vbs"
