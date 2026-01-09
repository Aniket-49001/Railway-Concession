# 🚂 Railway Concession System

A modern web application for railway ticket booking with MongoDB integration and an interactive dashboard.

## Features

✨ **User Authentication**
- Secure signup and login
- Session-based authentication
- Password hashing with bcryptjs

📊 **Dashboard**
- Real-time statistics (trains, bookings, passengers, revenue)
- System occupancy metrics
- User booking history
- Professional UI with charts and cards

🚄 **Train Management**
- Search trains by source and destination
- Filter trains by date
- View real-time seat availability
- Train status tracking (On Time, Delayed, Cancelled)

🎫 **Ticket Booking**
- Easy-to-use booking interface
- Calculate total fare dynamically
- Confirm bookings with journey date
- View booking history
- Booking status tracking

🏢 **Station Management**
- View all railway stations
- Station codes and locations
- City and state information

📱 **Responsive Design**
- Mobile-friendly interface
- Sidebar navigation
- Modern gradient UI
- Smooth transitions and animations

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
- 8 sample railway stations
- 8 sample trains with different routes and fares

## Running the Application

### Start the Server
```bash
npm start
```

The server will run at `http://localhost:3000`

### Access the Application

1. **Signup**: Create a new account at `http://localhost:3000/signup-page.html`
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

### Trains
- `GET /api/trains` - Get all trains
- `GET /api/trains/search` - Search trains by source/destination
- `POST /api/trains` - Create a new train (admin)

### Bookings
- `POST /api/bookings` - Book a ticket
- `GET /api/bookings` - Get user's bookings

### Stations
- `GET /api/stations` - Get all stations

## Usage Guide

### Creating an Account
1. Click "Create account" on the login page
2. Enter your email and password (min 6 characters)
3. Click "Sign Up"
4. Redirect to login page to sign in

### Booking a Train
1. Navigate to "Search Trains" tab
2. (Optional) Filter by source and destination
3. Click "Book" on desired train
4. Enter number of passengers and journey date
5. Review total fare and confirm booking
6. Receive booking confirmation with booking ID

### Viewing Your Bookings
1. Go to "My Bookings" tab
2. View all your confirmed bookings
3. Click "View" to see booking details

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

### Train Schema
```javascript
{
  trainNumber: String,
  trainName: String,
  source: String,
  destination: String,
  totalSeats: Number,
  availableSeats: Number,
  departureTime: String,
  arrivalTime: String,
  fare: Number,
  trainType: String,
  status: String,
  created_at: Date
}
```

### Booking Schema
```javascript
{
  bookingId: String,
  userEmail: String,
  trainNumber: String,
  trainName: String,
  source: String,
  destination: String,
  passengers: Number,
  totalFare: Number,
  seatNumbers: Array,
  status: String,
  bookingDate: Date,
  journeyDate: Date
}
```

### Station Schema
```javascript
{
  name: String,
  code: String,
  city: String,
  state: String,
  latitude: Number,
  longitude: Number,
  created_at: Date
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
