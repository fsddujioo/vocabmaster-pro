#!/usr/bin/env bash
# VocabMaster Pro - Launcher for macOS & Linux

echo "========================================================"
echo "  VocabMaster Pro - Học Tiếng Anh Flashcard & SRS       "
echo "========================================================"

PORT=8080

open_browser() {
    local url=$1
    if command -v xdg-open &>/dev/null; then
        xdg-open "$url" &
    elif command -v open &>/dev/null; then
        open "$url" &
    fi
}

if command -v python3 &>/dev/null; then
    echo "[1/2] Đang mở ứng dụng trên trình duyệt..."
    open_browser "http://localhost:$PORT/index.html"
    echo "[2/2] Khởi chạy Local Web Server cổng $PORT..."
    python3 -m http.server $PORT
elif command -v python &>/dev/null; then
    echo "[1/2] Đang mở ứng dụng trên trình duyệt..."
    open_browser "http://localhost:$PORT/index.html"
    echo "[2/2] Khởi chạy Local Web Server cổng $PORT..."
    python -m http.server $PORT
else
    echo "[THÔNG BÁO] Chưa cài Python, mở trực tiếp qua trình duyệt..."
    open_browser "index.html"
fi