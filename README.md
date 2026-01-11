# Railway Concession Management System (For College Students)

A web application that enables college students to apply online for railway concession certificates. Students register using their college ID, submit concession applications, upload supporting documents, and track application status. College admins verify and approve or reject applications; railway authorities view approved concessions to issue passes.

## Quick Overview

- **Scope**: Only college students may apply for concessions; college admins verify students; railway authority issues passes.
- **Roles**: Student, College Admin, Railway Authority.
- **Primary flows**: Student registration → Submit application → Admin verification → Railway issuance.


## Features

✨ **Student Registration & Authentication**
- Register with college ID and required details
- Secure signup and login with session management
- Password hashing with bcryptjs

📝 **Concession Application**
- Students can apply online for railway concessions
- Upload required documents (college ID, student ID, photos)
- Track application status: Pending / Approved / Rejected

🏫 **College Admin Dashboard**
- Verify college and student records
- View pending applications and supporting documents
- Approve or reject concession applications
- Download CSV reports and audit logs

🚆 **Railway Authority**
- Access approved concessions list
- Issue concession passes based on approvals

📂 **Document Management**
- Secure file uploads and storage
- Attachment preview and download

📱 **Responsive Design**
- Mobile-friendly interface
- Clear workflows for students, admins, and railway authority

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Atlas or Local)
- **Authentication**: express-session, bcryptjs
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Additional**: CORS, dotenv

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account or local MongoDB installation
- Modern web browser

## Installation

### 1. Clone the Repository
```bash
cd Railway-Concession
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables

Create or update `.env` file:

**For MongoDB Atlas (Cloud):**
```env
MONGO_URI=mongodb+srv://username:password@cluster0.mongodb.net/railway-concession?retryWrites=true&w=majority
PORT=3000
```

**For Local MongoDB:**
```env
MONGO_URI=mongodb://localhost:27017/railway-concession
PORT=3000
```

### 4. Seed Sample Data
```bash
node seed.js
```

This will populate the database with:
- Sample colleges for testing
- Sample student applications with different statuses (Pending / Approved / Rejected)

## Running the Application

### Start the Server
```bash
npm start
```

The server will run at `http://localhost:3000`

### Access the Application

1. **Signup**: Register with your college ID at `http://localhost:3000/signup-page.html` (students only)
2. **Login**: Log in with your credentials at `http://localhost:3000/login-page.html`
3. **Dashboard**: After login, you'll be redirected to `http://localhost:3000/dashboard.html`

## Application Structure

```
Railway-Concession/
├── server.js              # Express server with API routes
├── seed.js                # Database seeding script
├── package.json           # Dependencies
├── .env                   # Environment variables
├── login-page.html        # Login page
├── signup-page.html       # Signup page
├── dashboard.html         # Main dashboard
├── profile.html           # User profile page
└── users.json             # Fallback user storage (if MongoDB unavailable)
```

## API Endpoints

### Authentication
- `POST /api/register` - User registration
- `POST /api/login` - User login
- `GET /api/profile` - Get logged-in user profile
- `POST /api/logout` - User logout

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics

### Applications
- `POST /api/applications` - Student submits a concession application
- `GET /api/applications` - College admin / railway authority: list applications (with filters)
- `GET /api/applications/:id` - View application details
- `POST /api/applications/:id/approve` - College admin approves application
- `POST /api/applications/:id/reject` - College admin rejects application
- `GET /api/applications/approved` - Railway authority: list approved applications

## Usage Guide

### Creating an Account
1. Click "Create account" on the login page
2. Enter your email and password (min 6 characters)
3. Click "Sign Up"
4. Redirect to login page to sign in

### Applying for Concession
1. Go to Student Dashboard
2. Click "Apply for Concession"
3. Fill the application form and upload required documents
4. Submit application and note the application ID
5. Track status on dashboard; wait for college admin verification

### Viewing Your Applications
1. Go to "My Applications" or Student Dashboard
2. View application status and details
3. Download concession certificate once approved

### Checking Dashboard Stats
1. Go to "Overview" tab
2. See real-time statistics:
   - Total trains available
   - Your total bookings
   - Total passengers booked
   - Total amount spent
   - Network occupancy rate

## Sample Login Credentials

After running `seed.js`, you can create test accounts by signing up with any email and password.

For testing, create an account like:
- **Email**: test@example.com
- **Password**: password123

## MongoDB Models

### User Schema
```javascript
{
  email: String,
  password_hash: String,
  fullName: String,
  phone: String,
  created_at: Date
}
```

### Application Schema
```javascript
{
  applicationId: String (unique, required),
  studentEmail: String (required),
  collegeId: String (required),
  studentName: String,
  documents: [ { name: String, url: String } ],
  status: String (enum: ['Pending','Approved','Rejected']),
  adminNotes: String,
  created_at: Date,
  updated_at: Date
}
```

### College Schema
```javascript
{
  collegeId: String (unique, required),
  name: String (required),
  verified: Boolean (default: false),
  contactEmail: String,
  created_at: Date (default: now)
}
```

## Features Demonstration

### Dashboard Overview
- **Stats Cards**: Display key metrics at a glance
- **System Overview Table**: Shows occupancy and status
- **Real-time Updates**: Stats update after each booking

### Train Search
- **Dynamic Search**: Filter trains by source/destination
- **Availability**: See seat availability for each train
- **Status Badge**: Color-coded status indicators

### Booking System
- **Modal Interface**: Clean booking form in a modal
- **Dynamic Pricing**: Total fare calculated automatically
- **Journey Date Selection**: Pick your preferred travel date

## Troubleshooting

### MongoDB Connection Issues
```bash
# Check if MongoDB is running
mongod --version

# For MongoDB Atlas, verify connection string in .env
# Ensure IP whitelist includes your IP address
```

### Port Already in Use
```bash
# Change port in .env or kill process using port 3000
lsof -i :3000
kill -9 <PID>
```

### Clear Database
```bash
# Run seed script again to reset and repopulate
node seed.js
```

### Clear Sessions
Delete the `sessions` collection in MongoDB if you want to force re-login.

## Future Enhancements

- 🛂 Passenger details (name, age, ID)
- 💳 Payment gateway integration
- 📧 Email notifications for bookings
- 🗺️ Route map visualization
- ⭐ User reviews and ratings
- 🎟️ QR code for tickets
- 📊 Admin analytics dashboard
- 🔔 Real-time notifications
- 🔐 Two-factor authentication
- 📱 Mobile app version

## Support & Contribution

For issues or improvements, please open an issue or submit a pull request.

## License

This project is open source and available under the MIT License.

---

**Happy Traveling! 🚂✨**
