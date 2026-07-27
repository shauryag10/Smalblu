@echo off
setlocal enabledelayedexpansion
cd /d "%~dp0"

echo ===============================================
echo   Push "Smalblu website" to GitHub repo Smalblu
echo ===============================================
echo.

where git >nul 2>&1
if errorlevel 1 (
  echo ERROR: git is not installed or not on PATH.
  echo Install it from https://git-scm.com/download/win then run this again.
  pause & exit /b 1
)

set /p GHUSER=Your GitHub username:
if "%GHUSER%"=="" (echo No username given. & pause & exit /b 1)
set REPOURL=https://github.com/%GHUSER%/Smalblu.git

echo.
echo Remote: %REPOURL%
echo.

git remote get-url origin >nul 2>&1
if errorlevel 1 (
  git remote add origin %REPOURL%
) else (
  git remote set-url origin %REPOURL%
)

git rev-parse --verify HEAD >nul 2>&1
if errorlevel 1 (set FIRSTCOMMIT=1) else (set FIRSTCOMMIT=0)

git branch -M main

echo Staging files (node_modules and .next are excluded by .gitignore)...
git add -A
git commit -m "Add Smalblu website source" 2>nul
if errorlevel 1 echo (nothing new to commit - continuing)

echo.
echo Fetching remote...
git fetch origin main
if errorlevel 1 (
  echo.
  echo Could not fetch. Check the repo name/username and your GitHub login.
  pause & exit /b 1
)

echo.
echo The remote repo already has files. Choose how to combine:
echo   [1] MERGE  - keep remote history, merge your local files into it (safe)
echo   [2] FORCE  - overwrite the remote repo with this folder (destroys remote history)
echo   [3] CANCEL
set /p CHOICE=Enter 1, 2 or 3:

if "%CHOICE%"=="1" goto MERGE
if "%CHOICE%"=="2" goto FORCE
goto CANCEL

:MERGE
git merge origin/main --allow-unrelated-histories -m "Merge remote Smalblu into local website"
if errorlevel 1 (
  echo.
  echo MERGE CONFLICTS. Resolve the listed files, then run:
  echo    git add -A ^&^& git commit ^&^& git push -u origin main
  pause & exit /b 1
)
git push -u origin main
goto DONE

:FORCE
echo.
set /p SURE=Type YES to overwrite the remote repo:
if not "%SURE%"=="YES" goto CANCEL
git push -u origin main --force
goto DONE

:CANCEL
echo Cancelled. Nothing was pushed.
pause & exit /b 0

:DONE
if errorlevel 1 (
  echo.
  echo Push failed. If it asked for a password, use a Personal Access Token
  echo from https://github.com/settings/tokens instead of your password.
) else (
  echo.
  echo Done: https://github.com/%GHUSER%/Smalblu
)
pause
