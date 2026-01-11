# GitHub Copilot + Project Prompts

Use these prompts as code comments or commit messages to instruct Copilot to generate code for each module.

## 1. Project Initialization
// Create Node.js project skeleton with Express, Mongoose, dotenv, and session support

## 2. Authentication
// Implement user registration endpoint: POST /api/register
// - payload: { collegeId, fullName, email, password }
// - validate collegeId and unique email
// - hash password and store user

// Implement login endpoint: POST /api/login
// - establish session or return JWT

## 3. Applications
// Implement POST /api/applications to submit application
// - store documents (name, url) and metadata
// - initial status: 'Pending'

// Implement GET /api/applications?studentEmail=... for students
// Implement GET /api/applications for admin (filter by status/collegeId)

## 4. Admin Actions
// Implement POST /api/applications/:id/approve (admin only)
// Implement POST /api/applications/:id/reject (admin only)

## 5. Railway Authority
// Implement GET /api/applications/approved for railway authority

## 6. Testing Prompts
// Create unit tests for User model and Application model
// Create integration tests: register -> submit application -> admin approves -> railway lists approved

## 7. Docs & Scripts
// Auto-generate README sections for setup, deployment, and testing

---

Tip: Paste each comment in the relevant file and let Copilot suggest implementation code; review and adjust security validations and error handling before merging.