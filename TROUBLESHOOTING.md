# 🔧 Troubleshooting Guide

## Common Issues & Solutions

### 1. Server Won't Start

#### Error: "Cannot find module 'express'"
```
Solution:
npm install
```

#### Error: "Port 3000 is already in use"
```
Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

Mac/Linux:
lsof -i :3000
kill -9 <PID>

Or change port in .env:
PORT=3001
```

#### Error: "EADDRINUSE: address already in use"
```
Kill the existing process on that port (see above)
Or restart your computer
```

---

### 2. MongoDB Connection Issues

#### Error: "MongoDB connection failed"

**Check 1: Is MongoDB running?**
```bash
# For MongoDB Atlas (Cloud)
# No action needed - it's always running

# For Local MongoDB
# Windows: Start MongoDB service
# Mac: brew services start mongodb-community
# Linux: sudo systemctl start mongod
```

**Check 2: Is MONGO_URI correct?**
```
Edit .env file:

For Atlas:
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/railway-concession?retryWrites=true&w=majority

For Local:
MONGO_URI=mongodb://localhost:27017/railway-concession
```

**Check 3: IP Whitelist (Atlas only)**
- Go to MongoDB Atlas dashboard
- Network Access → IP Whitelist
- Add your IP address or 0.0.0.0/0 (testing only)

**Check 4: Database user credentials**
- Username and password must match
- No special characters unless URL encoded

**Check 5: Network connectivity**
- Check internet connection
- Try connecting with MongoDB Compass
- Check firewall settings

---

### 3. Authentication Issues

#### Can't Login After Signup

**Problem 1: User not created**
```
Check MongoDB:
- Connect to your database
- Check "users" collection
- Verify email exists
```

**Problem 2: Password mismatch**
```
- Password must be minimum 6 characters
- Passwords are case-sensitive
- Check for typos
```

**Problem 3: Session not saving**
```
- Clear browser cookies
- Check if browser has cookies enabled
- Verify session secret in server.js
```

#### Session expires immediately

**Solution:**
```javascript
// Increase session timeout in server.js
cookie: { maxAge: 24 * 60 * 60 * 1000 }  // 24 hours
```

---

### 4. Database Issues

#### Seed script doesn't work

**Error: "Collection already exists"**
```bash
# The script automatically clears data, but if it fails:
# Option 1: Delete database in MongoDB Atlas/Compass and try again
# Option 2: Run script with force flag (create in seed.js if needed)
```

**No trains appear after seeding**
```bash
# Check if seed completed successfully
# Verify MongoDB connection
# Check if MONGO_URI is correct
# Try running seed.js again
```

#### Too many open connections

**Solution:**
```javascript
// In server.js, ensure mongoose connection is pooled
await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    maxPoolSize: 10,
    minPoolSize: 5
});
```

---

### 5. Booking Issues

#### Can't book a train

**Problem 1: "Not enough seats available"**
```
- Check available seats > number of passengers
- Try different train
- Refresh page and try again
```

**Problem 2: "Train not found"**
```
- Seed database with: node seed.js
- Check if trains exist in dashboard
- Verify train number is correct
```

**Problem 3: Booking fails silently**
```
Check browser console (F12 → Console):
- Look for error messages
- Check network tab
- Verify API endpoint responds
```

#### Booking succeeded but doesn't appear

**Solution:**
```
1. Refresh page
2. Check "My Bookings" tab
3. Verify you're logged in as same user
4. Check MongoDB bookings collection
```

---

### 6. Dashboard Issues

#### Stats show 0 for everything

**Cause 1: Not logged in**
```
- Go to login page
- Login with your credentials
- Dashboard requires authentication
```

**Cause 2: No data in database**
```
# Seed the database
node seed.js
```

**Cause 3: API endpoints failing**
```
Check browser console (F12):
1. Open Developer Tools
2. Go to Network tab
3. Reload page
4. Check /api/dashboard/stats response
5. Look for error messages
```

#### Trains don't load

**Solution 1: Check MongoDB**
```
# Verify trains collection has data
# Use MongoDB Compass or Atlas web interface
```

**Solution 2: API error**
```
# Check server logs for errors
# Verify trains collection is properly indexed
```

**Solution 3: Network issue**
```
# Check browser console for CORS errors
# Verify server is running
# Try different port
```

---

### 7. Frontend Issues

#### Styles not loading (page looks broken)

**Problem: CSS not applied**
```
Clear browser cache:
- Ctrl+Shift+Delete (Chrome/Firefox)
- Cmd+Shift+Delete (Mac)
- Or use Ctrl+F5 to hard refresh
```

#### JavaScript not working

**Problem: Interactive features not working**
```
1. Check browser console (F12 → Console)
2. Look for JavaScript errors
3. Verify server is running
4. Check network requests in Network tab
```

#### Images not loading (if added)

**Solution:**
```
Check file paths are correct relative to html file
Use absolute paths: /images/train.png
Not relative paths: images/train.png
```

---

### 8. Network Issues

#### CORS Error (blocked by browser)

**Error: "Access to XMLHttpRequest blocked by CORS"**
```
Server already handles CORS:
const cors = require('cors');
app.use(cors());

If still failing:
1. Check server is running
2. Check URL is correct
3. Try incognito mode
4. Clear browser cache
```

#### 404 Not Found

**Problem: API endpoint not found**
```
Check:
1. Server is running
2. Route exists in server.js
3. HTTP method is correct (GET, POST, etc)
4. URL path is correct
5. No typos in endpoint
```

#### 500 Internal Server Error

**Check server logs:**
```
- Look at terminal where server is running
- Check MongoDB connection
- Verify all required fields are sent
- Check for unhandled exceptions
```

---

### 9. Browser Compatibility

#### App doesn't work in older browser

**Solution:**
```
Use modern browser:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Or add polyfills for:
- Fetch API
- Promise
- Arrow functions
```

---

### 10. Performance Issues

#### Page loads slowly

**Solutions:**
```
1. Check MongoDB connection (slowest part)
2. Enable browser caching
3. Optimize images (if any)
4. Check for large datasets
5. Add pagination to large lists
```

#### High memory usage

**Solutions:**
```
1. Restart Node.js server
2. Check for memory leaks in code
3. Limit database queries with .limit()
4. Close unused database connections
```

---

## Debug Checklist

Use this when troubleshooting:

```
□ Is Node.js running? (check terminal)
□ Is MongoDB connected? (check server logs)
□ Is .env file configured correctly?
□ Are all dependencies installed? (npm list)
□ Does package.json have all required packages?
□ Is browser console clear of errors? (F12)
□ Is correct port being used? (3000?)
□ Are you using correct URL? (http://localhost:3000?)
□ Is MongoDB data correct? (checked Atlas/Compass?)
□ Did you seed the database? (node seed.js)
□ Are you logged in? (check /api/profile)
□ Is network tab showing success? (Network tab in F12)
□ Are all API endpoints accessible? (try in Postman)
```

---

## Getting Help

1. **Check Logs**
   - Server terminal output
   - Browser console (F12 → Console)
   - Network requests (F12 → Network)

2. **Verify Setup**
   - MongoDB is running
   - .env file is correct
   - All packages installed
   - Server started successfully

3. **Test Manually**
   - Open browser DevTools (F12)
   - Test API endpoints manually
   - Check MongoDB data directly

4. **Reset Everything**
   ```bash
   npm install
   node seed.js
   npm start
   ```

---

## Quick Fix Commands

```bash
# Clear all and reinstall
rm -rf node_modules package-lock.json
npm install

# Reset database
node seed.js

# Kill process on port 3000
Windows: taskkill /F /IM node.exe
Mac/Linux: killall node

# Check if port is available
Windows: netstat -ano | findstr :3000
Mac/Linux: lsof -i :3000

# Test MongoDB connection
node -e "const m = require('mongoose'); m.connect('YOUR_MONGO_URI').then(()=>console.log('OK')).catch(e=>console.log(e))"
```

---

## Prevention Tips

✅ Always keep terminal/logs visible while developing
✅ Test new features in browser DevTools
✅ Check browser console after each change
✅ Verify API responses in Network tab
✅ Keep backups of .env file
✅ Test on clean database periodically
✅ Keep dependencies updated
✅ Use error logging in production

---

**If still stuck, check the README.md and SETUP_GUIDE.md files for more details!**
