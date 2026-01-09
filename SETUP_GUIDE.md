# 📚 Setup Guide - Railway Concession System

## Complete Setup Instructions

### Prerequisites Check

Before you begin, ensure you have:

1. **Node.js** (v14 or higher)
   - Download: https://nodejs.org/
   - Verify: `node --version`

2. **npm** (comes with Node.js)
   - Verify: `npm --version`

3. **MongoDB** (choose one option)
   - **Option A**: MongoDB Atlas (Cloud) - Recommended for beginners
   - **Option B**: Local MongoDB installation

4. **Text Editor / IDE**
   - VS Code (recommended)
   - Any modern web browser

---

## Step 1: Prepare MongoDB Connection

### Option A: MongoDB Atlas (Cloud) - RECOMMENDED

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new project
4. Create a new cluster (choose Free Tier)
5. Create a database user with a strong password
6. Get your connection string:
   - Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<username>`, `<password>`, and `<cluster-name>`

Example format:
```
mongodb+srv://username:password@cluster0.mongodb.net/railway-concession?retryWrites=true&w=majority
```

7. Update your `.env` file:
```env
MONGO_URI=mongodb+srv://username:password@cluster0.mongodb.net/railway-concession?retryWrites=true&w=majority
PORT=3000
```

### Option B: Local MongoDB

1. Install MongoDB Community Edition:
   - **Windows**: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/
   - **Mac**: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-macos/
   - **Linux**: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/

2. Start MongoDB:
   ```bash
   # Windows (in MongoDB bin folder)
   mongod
   
   # Mac/Linux
   brew services start mongodb-community
   # or
   mongod
   ```

3. Update `.env` file:
```env
MONGO_URI=mongodb://localhost:27017/railway-concession
PORT=3000
```

---

## Step 2: Install Dependencies

Navigate to the project directory and run:

```bash
npm install
```

This will install all required packages:
- express (web framework)
- mongoose (MongoDB ODM)
- bcryptjs (password hashing)
- express-session (session management)
- cors (cross-origin requests)
- dotenv (environment variables)

---

## Step 3: Seed the Database

Populate the database with sample data:

```bash
node seed.js
```

Expected output:
```
Connected to MongoDB
Cleared existing data
✅ Added 8 stations
✅ Added 8 trains
🚀 Database seeded successfully!
Total Stations: 8
Total Trains: 8
```

This creates:
- 8 railway stations (Delhi, Mumbai, Bangalore, etc.)
- 8 sample trains with different routes and schedules

---

## Step 4: Start the Server

### Option A: Using npm (Recommended)
```bash
npm start
```

### Option B: Direct Node.js
```bash
node server.js
```

### Option C: Using Start Script
**Windows:**
```bash
start.bat
```

**Linux/Mac:**
```bash
bash start.sh
```

Expected output:
```
Connected to MongoDB at: mongodb+srv://...
MongoDB models initialized successfully
Server running at http://localhost:3000
Static files served from [your-path]
```

---

## Step 5: Access the Application

Open your web browser and navigate to:

### Fresh Start (Create Account)
```
http://localhost:3000/signup-page.html
```

### Existing User (Login)
```
http://localhost:3000/login-page.html
```

### After Login (Dashboard)
```
http://localhost:3000/dashboard.html
```

### Admin Panel
```
http://localhost:3000/admin.html
```

---

## Workflow: Create First Account & Book Ticket

### 1. Create an Account
- Go to `http://localhost:3000/signup-page.html`
- Enter email: `test@example.com`
- Enter password: `password123` (min 6 characters)
- Click "Sign Up"
- You'll be redirected to login

### 2. Login
- Enter same email and password
- Click "Log In"
- You'll be redirected to dashboard

### 3. Search Trains (Dashboard)
- Click "Search Trains" in sidebar
- Leave filters empty or enter source/destination
- Click "Search Trains"
- Available trains will display

### 4. Book a Ticket
- Click "Book" button on any train
- Enter number of passengers
- Select journey date
- Review total fare (calculated automatically)
- Click "Confirm Booking"
- You'll see booking confirmation with Booking ID

### 5. View Bookings
- Click "My Bookings" in sidebar
- See all your confirmed bookings
- Click "View" for booking details

### 6. Check Dashboard Stats
- Click "Overview" in sidebar
- See real-time statistics:
  - Total trains available
  - Your total bookings
  - Total passengers booked
  - Total amount spent
  - Network occupancy rate

---

## Configuration Options

### Environment Variables (.env)

```env
# MongoDB Connection
MONGO_URI=mongodb+srv://user:pass@cluster0.mongodb.net/railway-concession

# Server Port
PORT=3000

# Optional: Add more configurations as needed
```

### Server Configuration (server.js)

Key configurations you can modify:

```javascript
// Session configuration
app.use(session({
    secret: 'sehat-secret-key',        // Change this to a random string
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }  // Session timeout: 24 hours
}));

// CORS configuration
app.use(cors());

// Port
const port = process.env.PORT || 3000;
```

---

## Database Schemas

### Users Collection
```javascript
{
  _id: ObjectId,
  email: String,          // Unique, lowercase
  password_hash: String,  // Bcrypt hashed
  fullName: String,
  phone: String,
  created_at: Date
}
```

### Trains Collection
```javascript
{
  _id: ObjectId,
  trainNumber: String,      // e.g., "12001"
  trainName: String,        // e.g., "Rajdhani Express"
  source: String,
  destination: String,
  totalSeats: Number,
  availableSeats: Number,
  departureTime: String,    // e.g., "14:30"
  arrivalTime: String,
  fare: Number,             // In INR
  trainType: String,        // Express, Superfast, Passenger, Local
  status: String,           // On Time, Delayed, Cancelled
  created_at: Date
}
```

### Bookings Collection
```javascript
{
  _id: ObjectId,
  bookingId: String,        // e.g., "BK1234567890"
  userEmail: String,
  trainNumber: String,
  trainName: String,
  source: String,
  destination: String,
  passengers: Number,
  totalFare: Number,
  seatNumbers: [String],
  status: String,           // Confirmed, Cancelled, Pending
  bookingDate: Date,
  journeyDate: Date
}
```

### Stations Collection
```javascript
{
  _id: ObjectId,
  name: String,             // e.g., "Delhi Central"
  code: String,             // e.g., "DLI"
  city: String,
  state: String,
  latitude: Number,
  longitude: Number,
  created_at: Date
}
```

---

## API Quick Reference

### Authentication
```bash
# Sign Up
POST /api/register
Body: { email, password }

# Login
POST /api/login
Body: { email, password }

# Get Profile
GET /api/profile

# Logout
POST /api/logout
```

### Trains
```bash
# Get all trains
GET /api/trains

# Search trains
GET /api/trains/search?source=Delhi&destination=Mumbai

# Add new train (admin)
POST /api/trains
Body: { trainNumber, trainName, source, destination, ... }
```

### Bookings
```bash
# Book a ticket
POST /api/bookings
Body: { trainNumber, passengers, journeyDate }

# Get user bookings
GET /api/bookings
```

### Dashboard
```bash
# Get statistics
GET /api/dashboard/stats
Returns: { totalTrains, totalBookings, totalPassengers, totalRevenue, occupancyRate }
```

### Stations
```bash
# Get all stations
GET /api/stations
```

---

## Troubleshooting

### Issue: "Cannot find module 'mongoose'"
**Solution:**
```bash
npm install
```

### Issue: "MongoDB connection failed"
**Check:**
1. Is MongoDB running?
2. Is MONGO_URI correct in .env?
3. For Atlas: Is your IP whitelisted?
4. Check network connectivity

### Issue: "Port 3000 already in use"
**Solution:**
Change port in `.env`:
```env
PORT=3001
```

Or kill the process using port 3000:
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :3000
kill -9 <PID>
```

### Issue: "ENOENT: no such file or directory"
**Solution:**
Make sure you're in the correct directory:
```bash
cd /path/to/Railway-Concession
npm install
```

### Issue: Session not persisting
**Solution:**
- Check browser cookies are enabled
- Check session secret in server.js
- Verify MongoDB is running

### Issue: Cannot login after signup
**Solution:**
1. Check user was created in MongoDB
2. Check password hashing works
3. Look at server logs for errors

---

## Performance Tips

1. **Enable Connection Pooling**: MongoDB Atlas handles this automatically

2. **Optimize Queries**: Only fetch needed fields
   ```javascript
   await Train.find().select('trainNumber trainName fare');
   ```

3. **Add Indexes**: For frequently queried fields
   ```javascript
   trainSchema.index({ source: 1, destination: 1 });
   ```

4. **Use Caching**: For static data like stations
   ```javascript
   const stationsCache = await Station.find();
   ```

5. **Pagination**: For large datasets
   ```bash
   GET /api/trains?page=1&limit=20
   ```

---

## Security Best Practices

✅ **Implemented:**
- Password hashing with bcryptjs
- Session-based authentication
- CORS protection
- Environment variables for secrets

🔒 **Additional (Recommended):**
- HTTPS in production
- Rate limiting
- Input validation/sanitization
- SQL injection prevention (using Mongoose)
- CSRF protection
- Two-factor authentication

---

## Deployment

### Heroku (Free)
1. Install Heroku CLI
2. Create Procfile: `web: npm start`
3. Push to Heroku
4. Add MongoDB Atlas MONGO_URI as env variable

### AWS, Azure, or other platforms
- Set up Node.js environment
- Configure MongoDB Atlas
- Set MONGO_URI env variable
- Run `npm install && npm start`

---

## Support & Resources

- **MongoDB Docs**: https://docs.mongodb.com/
- **Express.js**: https://expressjs.com/
- **Node.js**: https://nodejs.org/docs/
- **Mongoose**: https://mongoosejs.com/

---

## Next Steps

1. ✅ Complete setup
2. ✅ Create test accounts
3. ✅ Book some tickets
4. ✅ Explore dashboard
5. ➡️ Add more features (payments, emails, etc.)
6. ➡️ Deploy to production
7. ➡️ Scale infrastructure

---

**Happy Coding! 🚀🚂**
