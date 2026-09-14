@echo off
chcp 65001 > nul
title VocabMaster Pro - Khoi Dong Ung Dung
echo ========================================================
echo   VocabMaster Pro - Hoc Tieng Anh Flashcard & SRS
echo ========================================================
echo.

set HAS_PY=0

:: Kiem tra python trong PATH
where python >nul 2>&1
if %errorlevel% equ 0 set HAS_PY=1

:: Kiem tra msys64 python neu co
if exist "C:\msys64\ucrt64\bin\python.exe" set HAS_PY=2

if %HAS_PY% equ 1 (
    echo [1/2] Phat hien Python, dang mo ung dung tren trinh duyet...
    start "" "http://localhost:8080/index.html"
    echo [2/2] Dang chay Local Web Server (Cong 8080)...
    echo Nhan Ctrl + C de dung server khi tat app.
    echo.
    python -m http.server 8080
) else if %HAS_PY% equ 2 (
    echo [1/2] Phat hien Python, dang mo ung dung tren trinh duyet...
    start "" "http://localhost:8080/index.html"
    echo [2/2] Dang chay Local Web Server (Cong 8080)...
    echo Nhan Ctrl + C de dung server khi tat app.
    echo.
    C:\msys64\ucrt64\bin\python.exe -m http.server 8080
) else (
    echo [THONG BAO] May cua ban chua cai Python.
    echo He thong se tu dong mo truc tiep ung dung tren trinh duyet mac dinh...
    echo.
    start "" "index.html"
    echo [THANH CONG] Ung dung da san sang su dung!
    pause
)