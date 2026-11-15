@echo off
cd /d "%~dp0"
echo Syncing Boomerang source from GitHub...
git pull --rebase origin main
echo.
echo Done. You can close this window.
pause
