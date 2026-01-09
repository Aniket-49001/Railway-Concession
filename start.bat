@echo off
REM Quick Start Script for Railway Concession System (Windows)

echo.
echo 🚂 Railway Concession System - Quick Start
echo ==========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    echo Download from: https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js found: 
node --version

REM Check if npm is installed
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ npm is not installed.
    pause
    exit /b 1
)

echo ✅ npm found: 
npm --version

REM Install dependencies
echo.
echo 📦 Installing dependencies...
call npm install

REM Check if .env exists
if not exist ".env" (
    echo.
    echo ⚠️  .env file not found. Creating default .env...
    (
        echo MONGO_URI=mongodb://localhost:27017/railway-concession
        echo PORT=3000
    ) > .env
    echo ✅ .env file created
    echo Note: Update MONGO_URI in .env with your MongoDB Atlas connection string if needed
)

REM Seed database
echo.
echo 🌱 Seeding database with sample data...
call node seed.js

REM Start server
echo.
echo 🚀 Starting server...
echo.
echo Open your browser and go to: http://localhost:3000/signup-page.html
echo.
call npm start

pause
