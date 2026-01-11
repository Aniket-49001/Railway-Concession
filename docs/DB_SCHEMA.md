# Database Schema

## Users (Students & Admins)
- _id: ObjectId
- email: String (unique)
- password_hash: String
- fullName: String
- role: String (enum: ['student','college_admin','railway'])
- collegeId: String (students/admins)
- created_at: Date

## Colleges
- collegeId: String (unique)
- name: String
- verified: Boolean
- contactEmail: String
- created_at: Date

## Applications
- applicationId: String (unique)
- studentEmail: String
- collegeId: String
- studentName: String
- documents: [ { name: String, url: String } ]
- status: String (enum: ['Pending','Approved','Rejected'])
- adminNotes: String
- created_at: Date
- updated_at: Date

## AuditLog
- _id: ObjectId
- action: String
- actor: String (user email)
- targetId: String (applicationId)
- timestamp: Date
- details: Object

Indexes:
- applications: { collegeId: 1, status: 1 }
- users: { email: 1 }
- colleges: { collegeId: 1 }
