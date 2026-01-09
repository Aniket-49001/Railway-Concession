# 🚀 Quick Start Checklist

## Pre-Installation

- [ ] Node.js installed (v14+)? → Check with `node --version`
- [ ] npm installed? → Check with `npm --version`
- [ ] MongoDB ready? (Atlas or local)
- [ ] .env file has MONGO_URI
- [ ] Internet connection available

---

## Installation Steps

```bash
# Step 1: Install dependencies
npm install

# Step 2: Verify MongoDB connection
# Update MONGO_URI in .env if needed

# Step 3: Seed database with sample data
node seed.js

# Step 4: Start the server
npm start
```

**Expected Output:**
```
Connected to MongoDB at: mongodb+srv://...
MongoDB models initialized successfully
Server running at http://localhost:3000
```

---

## Access Points

| Page | URL | Purpose |
|------|-----|---------|
| Signup | http://localhost:3000/signup-page.html | Create account |
| Login | http://localhost:3000/login-page.html | Sign in |
| Dashboard | http://localhost:3000/dashboard.html | Main interface |
| Admin | http://localhost:3000/admin.html | Manage trains |

---

## First Time User Flow

```
1. Go to signup-page.html
   ↓
2. Create account (email & password)
   ↓
3. Go to login-page.html
   ↓
4. Login with credentials
   ↓
5. Redirected to dashboard.html
   ↓
6. View trains, search, book tickets
```

---

## Troubleshooting Quick Fix

### Server won't start
```bash
# Reinstall dependencies
npm install

# Check MongoDB is running
# Try different port
# Edit .env and change PORT=3001
```

### Can't login
```bash
# Check MongoDB connection
# Seed database: node seed.js
# Create new account
# Check browser console (F12) for errors
```

### No trains showing
```bash
# Seed database: node seed.js
# Refresh dashboard page
# Check MongoDB Atlas/Compass for data
```

### Port already in use
```bash
# Windows: taskkill /F /IM node.exe
# Mac/Linux: killall node
# Or use different port in .env
```

---

## Test Credentials

After signup, use any email/password:
- Email: `test@example.com`
- Password: `password123`

Or create your own during signup!

---

## Admin Features

**Access**: `http://localhost:3000/admin.html`

- ✅ Add new trains
- ✅ View all trains
- ✅ Delete trains
- ✅ Download CSV report
- ✅ Refresh data
- ✅ View statistics

---

## Dashboard Features

**Access**: After login (automatic redirect)

### Overview Tab
- Real-time statistics
- Network metrics
- System health status

### Search Trains Tab
- Filter by source/destination
- View train details
- Book tickets
- Check seat availability

### My Bookings Tab
- Booking history
- Booking details
- Payment status
- Cancellation (future feature)

### Stations Tab
- All railway stations
- Station codes
- Location information

---

## Database Check

### MongoDB Atlas
1. Go to https://cloud.mongodb.com
2. Login to your account
3. Go to Databases
4. Click "Browse Collections"
5. Check these collections exist:
   - users
   - trains
   - bookings
   - stations

### Local MongoDB
```bash
# Connect with MongoDB Compass
# Server: localhost:27017
# Check railway-concession database
# Should see 4 collections
```

---

## File Locations

- **Server**: server.js
- **Config**: .env
- **Database Seed**: seed.js
- **Login Page**: login-page.html
- **Signup Page**: signup-page.html
- **Dashboard**: dashboard.html
- **Admin Panel**: admin.html
- **Docs**: README.md, SETUP_GUIDE.md, TROUBLESHOOTING.md

---

## Performance Check

✅ Good if:
- Page loads in < 2 seconds
- Dashboard stats appear within 1 second
- Booking completes in < 2 seconds
- No red errors in console (F12)

⚠️ Slow if:
- Page takes > 5 seconds
- API calls timeout
- MongoDB connection fails
- Network tab shows errors

---

## Security Checklist

✅ Implemented:
- Password hashing
- Session authentication
- CORS protection
- Input validation

⚠️ Before Production:
- [ ] Change session secret
- [ ] Enable HTTPS
- [ ] Add rate limiting
- [ ] Implement CSRF protection
- [ ] Use environment variables
- [ ] Keep dependencies updated

---

## Backup Important Files

```
Keep these safe:
- .env (has MongoDB credentials)
- package.json (dependencies list)
- seed.js (recreate data)
```

---

## Common Commands

```bash
# Install
npm install

# Seed database
node seed.js

# Start server
npm start

# Kill server (Ctrl+C in terminal)

# Restart
npm start

# Check Node version
node --version

# Check npm version
npm --version

# View all trains (check MongoDB)
mongodb compass (desktop app)
```

---

## Tips & Tricks

1. **Refresh Page After Changes**
   - Booking → Dashboard may not update until refresh
   - Use browser refresh (Ctrl+R or Cmd+R)

2. **Clear Cache If Styles Look Wrong**
   - Ctrl+Shift+Delete (Chrome)
   - Or Ctrl+F5 (hard refresh)

3. **Check Console for Errors**
   - Press F12 → Console tab
   - Look for red error messages
   - Check Network tab for failed requests

4. **Multiple Test Accounts**
   - Create different accounts for testing
   - Each has its own bookings
   - Useful for testing multi-user scenarios

5. **Reset Database**
   - Run: `node seed.js`
   - Clears all data and restarts fresh
   - Use for testing multiple times

---

## What Next?

After successful setup:

1. **Explore**
   - Create account
   - Search trains
   - Make bookings
   - View bookings

2. **Customize**
   - Change UI colors in CSS
   - Add your own trains
   - Modify station data
   - Add new features

3. **Deploy**
   - Heroku (easiest)
   - AWS, Azure, or DigitalOcean
   - Set environment variables
   - Configure custom domain

4. **Enhance**
   - Add payment gateway
   - Send emails
   - Real-time notifications
   - Mobile app

---

## Help Resources

📖 **Docs in Project**:
- README.md - Full overview
- SETUP_GUIDE.md - Detailed setup
- TROUBLESHOOTING.md - Problem solutions
- PROJECT_SUMMARY.md - Project info

🔗 **Online Help**:
- MongoDB: https://docs.mongodb.com/
- Express: https://expressjs.com/
- Node.js: https://nodejs.org/
- Stack Overflow: [mongodb] [nodejs] [expressjs]

💬 **Community**:
- GitHub Issues (your repo)
- Stack Overflow questions
- MongoDB forums
- Express.js discussions

---

## Success Indicators

✅ Setup is successful if:

1. Server starts without errors
2. MongoDB connects successfully
3. Can signup with new account
4. Can login with credentials
5. Dashboard loads and shows stats
6. Can search trains
7. Can book tickets
8. Bookings appear in "My Bookings"
9. Admin page loads trains
10. No red errors in browser console (F12)

---

## Time Estimates

- **Setup**: 5-10 minutes
- **First booking**: 2-3 minutes
- **Full exploration**: 15-20 minutes
- **Customization**: 30+ minutes
- **Deployment**: 30-60 minutes

---

## Support Summary

```
Issue                Solution
─────────────────────────────────────────────
Won't start          npm install
Can't connect DB     Check .env, verify MONGO_URI
Can't login          Seed database: node seed.js
No trains visible    Check MongoDB collections
Styles broken        Clear cache: Ctrl+Shift+Delete
Port in use          Change PORT in .env or kill process
Slow performance     Check MongoDB connection
```

---

## Remember

- 📝 Keep .env safe (has credentials)
- 🔄 Seed database when starting fresh
- 📖 Read TROUBLESHOOTING.md if stuck
- 🚀 Check console (F12) for errors
- 💾 Backup important files
- 📧 Use admin panel to manage data
- 🔐 Change session secret before deploying

---

**🎉 All Set! Happy Booking! 🚂**

Start with: `npm start`
Then open: `http://localhost:3000/signup-page.html`

For questions: Check SETUP_GUIDE.md or TROUBLESHOOTING.md
