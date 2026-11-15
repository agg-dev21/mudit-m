@echo off
rem Double-click to run the portfolio at http://localhost:8413
rem If the server is already running, this just opens the site.
cd /d "%~dp0"

netstat -ano | findstr /r /c:":8413 .*LISTENING" >nul
if errorlevel 1 (
  start "Portfolio server (close this window to stop it)" /min py -3 -m http.server 8413
  timeout /t 2 /nobreak >nul
)

start "" http://localhost:8413
