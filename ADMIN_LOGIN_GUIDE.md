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

### ✅ Verify Applications
1. Open 'Pending Applications' to see unprocessed submissions
2. Click an application to view uploaded documents and student details
3. Add notes and click 'Approve' or 'Reject'

### 📋 Manage Applications
1. Filter applications by status or college
2. Search by student name, college ID, or application ID
3. Export application lists as CSV for audits

### 📊 Statistics
- Applications by status (Pending / Approved / Rejected)
- Recent activity and processing times
- Admin action logs

### 📥 Download Reports
- Export application data as CSV for record-keeping
- Generate reports for approved concessions

### 🔄 Refresh Data
- Click "Refresh Data" to update application lists
- Real-time synchronization after actions

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

## 💾 Sample Application Data

After running `node seed.js`, a few sample student applications are pre-loaded to help testing (Pending, Approved, Rejected statuses).

You can:
- Review sample applications
- Approve or reject for testing
- Export application data to CSV for verification

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
