@echo off
TITLE Bunny E-Commerce - Development Setup

echo.
echo ========================================
echo   Bunny E-Commerce Development Setup
echo ========================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo ✓ Node.js found: 
node --version

REM Check if MongoDB is running
netstat -an | find "27017" >nul 2>&1
if errorlevel 1 (
    echo.
    echo WARNING: MongoDB might not be running on port 27017
    echo Please ensure MongoDB is running before proceeding
    echo.
) else (
    echo ✓ MongoDB is running
)

echo.
echo Setting up Backend...
echo.

cd backend

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing backend dependencies...
    call npm install
) else (
    echo ✓ Backend dependencies already installed
)

echo.
echo ✓ Backend setup complete!
echo.

REM Open new terminal for backend
echo Starting Backend server (port 5000)...
echo.
start cmd /k "npm run dev"

timeout /t 2

cd ..

echo.
echo Setting up Frontend...
echo.

cd frontend

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing frontend dependencies...
    call npm install
) else (
    echo ✓ Frontend dependencies already installed
)

echo.
echo ✓ Frontend setup complete!
echo.

echo Starting Frontend server (port 5175)...
echo.
start cmd /k "npm run dev"

cd ..

echo.
echo ========================================
echo   Development servers starting...
echo ========================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:5175
echo.
echo Frontend will automatically open when ready.
echo.
pause
