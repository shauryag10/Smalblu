@echo off
setlocal enabledelayedexpansion
cd /d "%~dp0"
set LOG=%~dp0push-log.txt
echo. > "%LOG%"

echo ===============================================
echo   Push "Smalblu website" to GitHub
echo ===============================================
echo.

where git >nul 2>&1
if errorlevel 1 (
  echo ERROR: git is not installed or not on PATH.
  echo Install from https://git-scm.com/download/win then rerun.
  pause & exit /b 1
)

set /p GHUSER=Your GitHub username:
if "%GHUSER%"=="" (echo No username given. & pause & exit /b 1)
set /p REPONAME=Repo name [Smalblu]:
if "%REPONAME%"=="" set REPONAME=Smalblu
set REPOURL=https://github.com/%GHUSER%/%REPONAME%.git

echo.
echo Remote: %REPOURL%
echo Remote: %REPOURL% >> "%LOG%"
echo.

git remote get-url origin >nul 2>&1
if errorlevel 1 (git remote add origin %REPOURL%) else (git remote set-url origin %REPOURL%)

echo Checking that the repo exists and you can reach it...
git ls-remote origin > "%~dp0_refs.txt" 2>>"%LOG%"
if errorlevel 1 (
  echo.
  echo ---- COULD NOT REACH THE REPO ----
  type "%LOG%"
  echo.
  echo Common causes:
  echo  * Wrong username or repo name ^(check the URL in your browser^)
  echo  * The repo is private and you are not logged in
  echo  * You need a Personal Access Token: https://github.com/settings/tokens
  echo.
  del "%~dp0_refs.txt" 2>nul
  pause & exit /b 1
)

for /f %%A in ('find /c /v "" ^< "%~dp0_refs.txt"') do set REFCOUNT=%%A
del "%~dp0_refs.txt" 2>nul

git branch -M main
echo Staging files ^(node_modules / .next excluded^)...
git add -A
git commit -m "Add Smalblu website source" >>"%LOG%" 2>&1

if "%REFCOUNT%"=="0" (
  echo Remote is empty - pushing directly.
  git push -u origin main
  goto DONE
)

echo Fetching remote branches...
git fetch origin >>"%LOG%" 2>&1
if errorlevel 1 (echo Fetch failed - see push-log.txt & type "%LOG%" & pause & exit /b 1)

set REMOTEBRANCH=
for /f "tokens=2 delims=/" %%B in ('git symbolic-ref refs/remotes/origin/HEAD 2^>nul ^| findstr /r "origin"') do set REMOTEBRANCH=%%B
git remote set-head origin -a >>"%LOG%" 2>&1
for /f "tokens=4 delims=/" %%B in ('git symbolic-ref refs/remotes/origin/HEAD 2^>nul') do set REMOTEBRANCH=%%B
if "%REMOTEBRANCH%"=="" set REMOTEBRANCH=main

echo Remote default branch: %REMOTEBRANCH%
echo.
echo   [1] MERGE - keep remote history, merge your files in ^(safe^)
echo   [2] FORCE - overwrite the remote with this folder
echo   [3] CANCEL
set /p CHOICE=Enter 1, 2 or 3:

if "%CHOICE%"=="1" goto MERGE
if "%CHOICE%"=="2" goto FORCE
echo Cancelled. & pause & exit /b 0

:MERGE
git merge origin/%REMOTEBRANCH% --allow-unrelated-histories -m "Merge remote into local website"
if errorlevel 1 (
  echo.
  echo MERGE CONFLICTS. Fix the listed files, then run:
  echo    git add -A ^&^& git commit ^&^& git push -u origin main
  pause & exit /b 1
)
git push -u origin main
goto DONE

:FORCE
set /p SURE=Type YES to overwrite the remote repo:
if not "%SURE%"=="YES" (echo Cancelled. & pause & exit /b 0)
git push -u origin main --force
goto DONE

:DONE
if errorlevel 1 (
  echo.
  echo Push failed. If prompted for a password, use a Personal Access Token
  echo from https://github.com/settings/tokens instead.
) else (
  echo.
  echo Done: https://github.com/%GHUSER%/%REPONAME%
)
pause
