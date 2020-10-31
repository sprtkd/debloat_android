@Echo OFF

call:downloadADB Start ADB Missing
echo Starting App..
cd platform-tools
call:startBackend Start ADB Backend
timeout 2 >nul
call:startFrontend Start ADB Frontend
timeout 5 >nul
goto:eof







:downloadADB
if exist "platform-tools\platform-tools" goto:eof 

echo ADB Missing.. Proceeding to download ADB

powershell -command "Start-BitsTransfer -Source https://dl.google.com/android/repository/platform-tools-latest-windows.zip -Destination platform-tools.zip"
echo ADB Download Success.
echo Extracting..
powershell -command "Expand-Archive platform-tools.zip"
del platform-tools.zip
echo ADB Install Success
goto:eof

:startBackend
echo Starting ADB Wrapper Service
start "" app.exe
goto:eof

:startFrontend
echo Starting App
start "" "debloat_android 0.0.1.exe"
goto:eof





