@echo off
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\build-apk.ps1" %*
if errorlevel 1 (echo APK olusturulamadi.)
pause
