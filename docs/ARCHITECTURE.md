# System Architecture

## Overview
- Client (frontend): Static HTML/CSS/JS pages
- Server (backend): Node.js + Express
- Database: MongoDB (Mongoose ODM)
- Authentication: Session-based (express-session) or JWT
- Storage: Local filesystem or cloud for document uploads

## Components
1. Frontend
   - Public pages: `signup-page.html`, `login-page.html`
   - Student dashboard: `dashboard.html` (apply, track)
   - Admin panel: `admin.html` (verify, approve)
   - Railway panel: `railway.html` (view approved)

2. Backend
   - API routes: `/api/register`, `/api/login`, `/api/applications`, `/api/admin/*`
   - Middlewares: authentication, file upload, validation, logging

3. Database
   - Collections: users, applications, colleges, auditLogs

## Communication
- HTTPS recommended for production
- All API requests must include session cookie or Authorization header

## Failure & Recovery
- Health-check endpoint: `/api/health`
- Log errors to console and optionally a logging service
- Backups: periodic MongoDB exports or snapshots
