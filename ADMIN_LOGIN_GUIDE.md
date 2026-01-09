# 🔐 Admin Login Guide

## Access the Admin Panel

### Step 1: Go to Admin Login Page
```
http://localhost:3000/admin-login.html
```

### Step 2: Enter Demo Credentials
```
Email:    admin@railway.com
Password: admin123
```

### Step 3: Click "Login to Admin Panel"
You'll be redirected to the admin dashboard.

---

## 🎯 Admin Panel Features

### ➕ Add New Trains
1. Fill in the train details form
2. Click "Add Train"
3. Train appears in the table below

### 📋 Manage Trains
1. View all trains in the table
2. Delete trains with the "Delete" button
3. Check seat availability

### 📊 Statistics
- Total trains count
- Total bookings count
- Total revenue earned
- Active trains on time

### 📥 Download Reports
- Export all train data as CSV
- Use for record keeping
- Compatible with Excel

### 🔄 Refresh Data
- Click "Refresh Data" to update stats
- Real-time synchronization
- Auto-updates after actions

---

## 🔑 Demo Admin Credentials

| Field | Value |
|-------|-------|
| **Email** | admin@railway.com |
| **Password** | admin123 |

> ⚠️ **Important**: Change these credentials before deploying to production!

---

## 🚪 Logout
Click the "Logout" button to:
- Clear admin session
- Redirect to admin login page
- Session expires after 24 hours automatically

---

## 📋 Quick Train Entry Form

When adding a train, fill in:

| Field | Example |
|-------|---------|
| Train Number | 12001 |
| Train Name | Rajdhani Express |
| Source Station | Delhi Central |
| Destination | Mumbai Central |
| Total Seats | 500 |
| Departure Time | 14:30 |
| Arrival Time | 07:45 |
| Fare (₹) | 2500 |
| Train Type | Express |
| Status | On Time |

---

## 🎓 Admin Panel Walkthrough

1. **View Statistics** (top section)
   - See key metrics at a glance
   - Updates in real-time

2. **Add Trains** (middle section)
   - Use form to add new trains
   - All fields are required

3. **Manage Trains** (table section)
   - View all trains
   - Delete unwanted trains
   - Check availability

4. **Quick Actions** (bottom)
   - Refresh data
   - Download CSV report
   - Reset database (advanced)

---

## 💾 Sample Train Data

After running `node seed.js`, 8 trains are pre-loaded:

1. **Shatabdi Express** (12001) - Delhi to Agra - ₹400
2. **Rajdhani Express** (12002) - Delhi to Mumbai - ₹2500
3. **Karnataka Express** (12003) - Delhi to Bangalore - ₹2000
4. **Howrah Mail** (12004) - Delhi to Kolkata - ₹1800
5. **Coromandel Express** (12005) - Mumbai to Chennai - ₹1500
6. **Deccan Express** (12006) - Pune to Hyderabad - ₹900
7. **Gujarat Express** (12007) - Mumbai to Ahmedabad - ₹600
8. **Bangalore Express** (12008) - Bangalore to Hyderabad - ₹800

You can:
- Delete sample trains
- Add new trains
- Modify by deleting and re-adding
- Export data to CSV

---

## 🔒 Security Notes

✅ **Session-based**: Login creates secure session
✅ **Auto-expiry**: Session expires after 24 hours
✅ **StorageAPI**: Uses sessionStorage (not saved to disk)
✅ **Protected**: Redirects to login if not authenticated
✅ **Logout**: Clears all session data

---

## ❓ Troubleshooting

### Can't Access Admin Panel
```
Problem: Redirected to login even after entering credentials
Solution: 
1. Check email: admin@railway.com (case-sensitive)
2. Check password: admin123 (case-sensitive)
3. Clear browser cache
4. Try in incognito/private mode
```

### Session Expired
```
Problem: Logged out after some time
Solution:
Sessions expire after 24 hours by design
Just log in again at admin-login.html
```

### Forget Password
```
Problem: Don't know admin password
Solution:
Edit admin-login.html and change:
ADMIN_CREDENTIALS = {
  email: 'admin@railway.com',
  password: 'your-new-password'
}
```

### Can't Delete Trains
```
Problem: Delete button doesn't work
Solution:
1. Check browser console (F12)
2. Verify MongoDB connection
3. Try refreshing page
4. Check train exists in database
```

---

## 📞 Need Help?

- **Can't login?** → Check credentials in admin-login.html
- **Forgot password?** → Edit admin-login.html ADMIN_CREDENTIALS
- **Session expired?** → Log in again
- **Can't delete trains?** → Check MongoDB connection
- **Stats not updating?** → Click "Refresh Data"

---

## 🚀 Next Steps

1. ✅ Login to admin panel
2. ✅ View existing trains
3. ✅ Add a new train
4. ✅ Download CSV report
5. ✅ Delete a test train
6. ✅ Refresh and verify

**Enjoy managing your railway system! 🚂**
