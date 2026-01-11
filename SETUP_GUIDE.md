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
✅ Added sample colleges
✅ Added sample applications
🚀 Database seeded successfully!
Sample Colleges: 2
Sample Applications: 3
```

This creates:
- Sample colleges for testing (e.g., ABC College, XYZ University)
- Sample student applications with various statuses (Pending, Approved, Rejected)

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

## Workflow: Create First Account & Submit Application

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

### 3. Apply for Concession (Dashboard)
- Click "Apply for Concession" in sidebar
- Fill the application form with required details
- Upload required documents and attachments
- Submit application and note the application ID

### 4. Submit an Application
- On Student Dashboard, click "Apply for Concession"
- Fill the concession form and upload required documents
- Submit the application
- Note the application ID and track its status

### 5. View Applications
- Click "My Applications" in sidebar
- See all your submitted applications and their status
- Click "View" for application details

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

### Applications Collection
```javascript
{
  _id: ObjectId,
  applicationId: String,        // e.g., "APP123456"
  studentEmail: String,
  collegeId: String,
  studentName: String,
  documents: [ { name: String, url: String } ],
  status: String,               // Pending, Approved, Rejected
  adminNotes: String,
  created_at: Date,
  updated_at: Date
}
```

### Colleges Collection
```javascript
{
  _id: ObjectId,
  collegeId: String,        // e.g., "ABC123"
  name: String,
  contactEmail: String,
  verified: Boolean,        // true/false
  created_at: Date
}
```

### (Legacy) Stations Collection
```
Note: This project focuses on concession applications. Station data remains for legacy/demo purposes and will be phased out or repurposed as needed.
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

### Applications
```bash
# Get all applications
GET /api/applications

# Search applications
GET /api/applications?collegeId=ABC123&status=Pending

# Submit application (student)
POST /api/applications
Body: { studentEmail, collegeId, documents, additionalInfo }
```

### Colleges
```bash
# Get all colleges
GET /api/colleges

# Add a college (admin)
POST /api/colleges
Body: { collegeId, name, contactEmail }
```

### Applications (User)
```bash
# Submit application
POST /api/applications
Body: { studentEmail, collegeId, documents, additionalInfo }

# Get user's applications
GET /api/applications?studentEmail=user@example.com
```

### Dashboard
```bash
# Get statistics
GET /api/dashboard/stats
Returns: { totalApplications, totalProcessed, totalPending, recentActivity }
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
   await Application.find().select('applicationId studentEmail status');
   ```

3. **Add Indexes**: For frequently queried fields
   ```javascript
   applicationSchema.index({ collegeId: 1, status: 1 });
   ```

4. **Use Caching**: For static data like stations
   ```javascript
   const stationsCache = await Station.find();
   ```

5. **Pagination**: For large datasets
   ```bash
   GET /api/applications?page=1&limit=20
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
3. ✅ Submit some applications
4. ✅ Explore dashboard
5. ➡️ Add more features (payments, emails, etc.)
6. ➡️ Deploy to production
7. ➡️ Scale infrastructure

---

**Happy Coding! 🚀🚂**
