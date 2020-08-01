tasklist /FI "IMAGENAME eq teams.exe" 2>NUL | find /I /N "teams.exe">NUL
if "%ERRORLEVEL%"=="0" taskkill /f /im teams.exe