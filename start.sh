#!/bin/bash
# Quick Start Script for Railway Concession System

echo "🚂 Railway Concession System - Quick Start"
echo "=========================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js found: $(node --version)"

# Check if npm is installed
if ! command -v npm &> /dev/null
then
    echo "❌ npm is not installed."
    exit 1
fi

echo "✅ npm found: $(npm --version)"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

# Check if .env exists
if [ ! -f .env ]; then
    echo ""
    echo "⚠️  .env file not found. Creating default .env..."
    cat > .env << EOF
MONGO_URI=mongodb://localhost:27017/railway-concession
PORT=3000
EOF
    echo "✅ .env file created"
    echo "Note: Update MONGO_URI in .env with your MongoDB Atlas connection string if needed"
fi

# Seed database
echo ""
echo "🌱 Seeding database with sample data..."
node seed.js

# Start server
echo ""
echo "🚀 Starting server..."
echo "Open your browser and go to: http://localhost:3000/signup-page.html"
npm start
