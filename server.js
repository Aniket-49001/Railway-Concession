const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const path = require('path');
const cors = require('cors'); // CORS for fetch from browser
const fs = require('fs').promises;
const session = require('express-session');

// Load environment variables from .env (optional)
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// --- Config ---
// MongoDB connection string is read from environment variable `MONGO_URI`.
// If not set, the placeholder below will keep the server using the file-based fallback.
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/railway-concession';
const USERS_JSON = path.join(__dirname, 'users.json');

let UserModel = null;
let TrainModel = null;
let BookingModel = null;
let StationModel = null;
let CollegeModel = null;
let ApplicationModel = null;

async function tryConnectMongo() {
    if (!MONGO_URI) {
        console.log('MONGO_URI not set — skipping MongoDB connect.');
        return;
    }

    try {
        await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB at:', MONGO_URI);

        // User Schema (extended for college workflow)
        const userSchema = new mongoose.Schema({
            email: { type: String, required: true, unique: true, lowercase: true },
            password_hash: { type: String, required: true },
            fullName: { type: String, default: '' },
            collegeId: { type: String, default: '' },
            role: { type: String, enum: ['student', 'college_admin', 'railway'], default: 'student' },
            phone: { type: String, default: '' },
            created_at: { type: Date, default: Date.now }
        });
        UserModel = mongoose.model('User', userSchema);

        // College Schema
        const collegeSchema = new mongoose.Schema({
            collegeId: { type: String, required: true, unique: true },
            name: { type: String, required: true },
            address: { type: String, default: '' },
            verified: { type: Boolean, default: false },
            created_at: { type: Date, default: Date.now }
        });
        CollegeModel = mongoose.model('College', collegeSchema);

        // Application Schema
        const applicationSchema = new mongoose.Schema({
            applicationId: { type: String, unique: true },
            studentEmail: { type: String, required: true },
            studentName: { type: String, required: true },
            collegeId: { type: String, required: true },
            reason: { type: String, default: '' },
            documents: [String],
            status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
            appliedAt: { type: Date, default: Date.now },
            decidedAt: { type: Date },
            decidedBy: { type: String }
        });
        ApplicationModel = mongoose.model('Application', applicationSchema);

        // Station Schema (kept for compatibility)
        const stationSchema = new mongoose.Schema({
            name: { type: String, required: true, unique: true },
            code: { type: String, required: true, unique: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            latitude: { type: Number, default: 0 },
            longitude: { type: Number, default: 0 },
            created_at: { type: Date, default: Date.now }
        });
        StationModel = mongoose.model('Station', stationSchema);

        // Train Schema (kept for compatibility)
        const trainSchema = new mongoose.Schema({
            trainNumber: { type: String, required: true, unique: true },
            trainName: { type: String, required: true },
            source: { type: String, required: true },
            destination: { type: String, required: true },
            totalSeats: { type: Number, required: true },
            availableSeats: { type: Number, required: true },
            departureTime: { type: String, required: true },
            arrivalTime: { type: String, required: true },
            fare: { type: Number, required: true },
            trainType: { type: String, enum: ['Express', 'Passenger', 'Local', 'Superfast'], default: 'Express' },
            status: { type: String, enum: ['On Time', 'Delayed', 'Cancelled'], default: 'On Time' },
            created_at: { type: Date, default: Date.now }
        });
        TrainModel = mongoose.model('Train', trainSchema);

        // Booking Schema (kept for compatibility)
        const bookingSchema = new mongoose.Schema({
            bookingId: { type: String, unique: true },
            userId: mongoose.Schema.Types.ObjectId,
            userEmail: { type: String, required: true },
            trainNumber: { type: String, required: true },
            trainName: { type: String, required: true },
            source: { type: String, required: true },
            destination: { type: String, required: true },
            passengers: { type: Number, required: true },
            totalFare: { type: Number, required: true },
            seatNumbers: [String],
            status: { type: String, enum: ['Confirmed', 'Cancelled', 'Pending'], default: 'Confirmed' },
            bookingDate: { type: Date, default: Date.now },
            journeyDate: { type: Date, required: true }
        });
        BookingModel = mongoose.model('Booking', bookingSchema);

        console.log('MongoDB models initialized successfully');
    } catch (err) {
        console.error('MongoDB connection failed, using file-based store:', err.message);
    }
}

// Try to connect (non-blocking)
tryConnectMongo();

// --- Middleware ---
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'sehat-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));

// Serve static files from workspace root so HTML pages load directly
app.use(express.static(path.join(__dirname)));

// --- Authentication Middleware ---
const requireAuth = (req, res, next) => {
    if (!req.session || !req.session.user) {
        return res.status(401).json({ message: 'Not authenticated' });
    }
    next();
};

// --- Helper: File-based users store ---
async function readUsersFile() {
    try {
        const data = await fs.readFile(USERS_JSON, 'utf8');
        return JSON.parse(data || '[]');
    } catch (err) {
        if (err.code === 'ENOENT') return [];
        throw err;
    }
}

async function writeUsersFile(users) {
    await fs.writeFile(USERS_JSON, JSON.stringify(users, null, 2), 'utf8');
}

// Abstracted helpers that work with MongoDB if available, otherwise file store
async function findUserByEmail(email) {
    if (UserModel) return await UserModel.findOne({ email: email.toLowerCase() }).lean();
    const users = await readUsersFile();
    return users.find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
}

async function createUser(email, passwordHash, opts = {}) {
    const { fullName = '', collegeId = '', role = 'student' } = opts;
    if (UserModel) {
        const doc = new UserModel({ email: email.toLowerCase(), password_hash: passwordHash, fullName, collegeId, role });
        return await doc.save();
    }
    const users = await readUsersFile();
    const newUser = { id: Date.now(), email: email.toLowerCase(), password_hash: passwordHash, fullName, collegeId, role, created_at: new Date() };
    users.push(newUser);
    await writeUsersFile(users);
    return newUser;
}

// --- Routes ---
app.post(['/api/register', '/signup'], async (req, res) => {
    const { email, password, collegeId, fullName } = req.body || {};
    if (!email || !password || !collegeId || !fullName) return res.status(400).json({ message: 'Email, password, collegeId and fullName are required.' });
    if (password.length < 6) return res.status(400).json({ message: 'Password must be at least 6 characters long.' });

    try {
        const existing = await findUserByEmail(email);
        if (existing) return res.status(409).json({ message: 'Email is already in use.' });

        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);
        await createUser(email, password_hash, { fullName, collegeId, role: 'student' });
        return res.status(201).json({ message: 'Account created! Please log in.' });
    } catch (err) {
        console.error('Registration error:', err);
        return res.status(500).json({ message: 'Server error' });
    }
});

app.post(['/api/login', '/login'], async (req, res) => {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ message: 'Email and password are required.' });

    try {
        const user = await findUserByEmail(email);
        if (!user) return res.status(401).json({ message: 'Invalid credentials.' });

        const match = await bcrypt.compare(password, user.password_hash || user.passwordHash);
        if (!match) return res.status(401).json({ message: 'Invalid credentials.' });

        req.session.user = { email: user.email, role: user.role || 'student', fullName: user.fullName || user.fullName || '', collegeId: user.collegeId || '' };
        return res.json({ message: 'Login successful.' });
    } catch (err) {
        console.error('Login error:', err);
        return res.status(500).json({ message: 'Server error' });
    }
});

app.get('/api/profile', (req, res) => {
    if (!req.session || !req.session.user) return res.status(401).json({ message: 'Not authenticated' });
    return res.json({ email: req.session.user.email });
});

app.post('/api/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).json({ message: 'Could not log out' });
        res.json({ message: 'Logged out' });
    });
});

// --- RAILWAY DASHBOARD ROUTES ---

// Get Dashboard Statistics
app.get('/api/dashboard/stats', requireAuth, async (req, res) => {
    try {
        // Keep legacy train/booking stats if models exist
        const stats = {
            totalTrains: 0,
            totalBookings: 0,
            totalPassengers: 0,
            totalRevenue: 0,
            occupancyRate: 0,
            totalApplications: 0,
            pendingApplications: 0
        };

        if (TrainModel) {
            const trains = await TrainModel.find();
            stats.totalTrains = await TrainModel.countDocuments();
            const totalSeats = trains.reduce((sum, t) => sum + t.totalSeats, 0);
            const availableSeats = trains.reduce((sum, t) => sum + t.availableSeats, 0);
            stats.occupancyRate = totalSeats > 0 ? ((totalSeats - availableSeats) / totalSeats * 100).toFixed(2) : 0;
        }

        if (BookingModel) {
            stats.totalBookings = await BookingModel.countDocuments({ userEmail: req.session.user.email });
            const bookingData = await BookingModel.aggregate([
                { $match: { userEmail: req.session.user.email } },
                { $group: { _id: null, totalPassengers: { $sum: '$passengers' }, totalRevenue: { $sum: '$totalFare' } } }
            ]);
            stats.totalPassengers = bookingData[0]?.totalPassengers || 0;
            stats.totalRevenue = bookingData[0]?.totalRevenue || 0;
        }

        if (ApplicationModel) {
            const userRole = req.session.user.role || 'student';
            if (userRole === 'student') {
                stats.totalApplications = await ApplicationModel.countDocuments({ studentEmail: req.session.user.email });
                stats.pendingApplications = await ApplicationModel.countDocuments({ studentEmail: req.session.user.email, status: 'Pending' });
            } else {
                stats.totalApplications = await ApplicationModel.countDocuments();
                stats.pendingApplications = await ApplicationModel.countDocuments({ status: 'Pending' });
            }
        }

        res.json(stats);
    } catch (err) {
        console.error('Error fetching stats:', err);
        res.status(500).json({ message: 'Error fetching statistics' });
    }
});

// Get All Trains
app.get('/api/trains', async (req, res) => {
    try {
        if (!TrainModel) {
            return res.json([]);
        }
        const trains = await TrainModel.find().sort({ departureTime: 1 });
        res.json(trains);
    } catch (err) {
        console.error('Error fetching trains:', err);
        res.status(500).json({ message: 'Error fetching trains' });
    }
});

// Search Trains
app.get('/api/trains/search', async (req, res) => {
    try {
        const { source, destination, date } = req.query;
        
        if (!TrainModel) {
            return res.json([]);
        }

        const query = {};
        if (source) query.source = { $regex: source, $options: 'i' };
        if (destination) query.destination = { $regex: destination, $options: 'i' };

        const trains = await TrainModel.find(query);
        res.json(trains);
    } catch (err) {
        console.error('Error searching trains:', err);
        res.status(500).json({ message: 'Error searching trains' });
    }
});

// Add New Train (Admin only)
app.post('/api/trains', async (req, res) => {
    try {
        if (!TrainModel) {
            return res.status(503).json({ message: 'MongoDB not connected' });
        }

        const { trainNumber, trainName, source, destination, totalSeats, departureTime, arrivalTime, fare, trainType } = req.body;

        if (!trainNumber || !trainName || !source || !destination || !totalSeats) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const newTrain = new TrainModel({
            trainNumber,
            trainName,
            source,
            destination,
            totalSeats,
            availableSeats: totalSeats,
            departureTime,
            arrivalTime,
            fare,
            trainType
        });

        await newTrain.save();
        res.status(201).json(newTrain);
    } catch (err) {
        console.error('Error creating train:', err);
        res.status(500).json({ message: 'Error creating train' });
    }
});

// Book a Ticket
app.post('/api/bookings', requireAuth, async (req, res) => {
    try {
        if (!TrainModel || !BookingModel) {
            return res.status(503).json({ message: 'MongoDB not connected' });
        }

        const { trainNumber, passengers, journeyDate } = req.body;

        if (!trainNumber || !passengers || passengers < 1) {
            return res.status(400).json({ message: 'Invalid booking details' });
        }

        const train = await TrainModel.findOne({ trainNumber });
        if (!train) {
            return res.status(404).json({ message: 'Train not found' });
        }

        if (train.availableSeats < passengers) {
            return res.status(400).json({ message: 'Not enough seats available' });
        }

        const bookingId = `BK${Date.now()}`;
        const totalFare = train.fare * passengers;

        const newBooking = new BookingModel({
            bookingId,
            userEmail: req.session.user.email,
            trainNumber: train.trainNumber,
            trainName: train.trainName,
            source: train.source,
            destination: train.destination,
            passengers,
            totalFare,
            journeyDate: new Date(journeyDate),
            status: 'Confirmed'
        });

        await newBooking.save();

        // Update available seats
        train.availableSeats -= passengers;
        await train.save();

        res.status(201).json({ message: 'Booking successful', booking: newBooking });
    } catch (err) {
        console.error('Error booking ticket:', err);
        res.status(500).json({ message: 'Error booking ticket' });
    }
});

// Get User Bookings
app.get('/api/bookings', requireAuth, async (req, res) => {
    try {
        if (!BookingModel) {
            return res.json([]);
        }

        const bookings = await BookingModel.find({ userEmail: req.session.user.email }).sort({ bookingDate: -1 });
        res.json(bookings);
    } catch (err) {
        console.error('Error fetching bookings:', err);
        res.status(500).json({ message: 'Error fetching bookings' });
    }
});

// --- APPLICATIONS API ---

// Submit a new application (student)
app.post('/api/applications', requireAuth, async (req, res) => {
    try {
        if (!ApplicationModel) return res.status(503).json({ message: 'MongoDB not connected' });
        const { collegeId, reason, documents } = req.body || {};
        const studentEmail = req.session.user.email;
        const studentName = req.session.user.fullName || req.body.studentName || '';
        const cid = collegeId || req.session.user.collegeId || '';
        if (!cid) return res.status(400).json({ message: 'collegeId is required' });

        const applicationId = `APP${Date.now()}`;
        const appDoc = new ApplicationModel({ applicationId, studentEmail, studentName, collegeId: cid, reason: reason || '', documents: documents || [] });
        await appDoc.save();
        res.status(201).json({ message: 'Application submitted', application: appDoc });
    } catch (err) {
        console.error('Error submitting application:', err);
        res.status(500).json({ message: 'Error submitting application' });
    }
});

// Get applications (students: own, admins/railway: all or by college)
app.get('/api/applications', requireAuth, async (req, res) => {
    try {
        if (!ApplicationModel) return res.status(503).json({ message: 'MongoDB not connected' });
        const userRole = req.session.user.role || 'student';
        const userEmail = req.session.user.email;
        const { collegeId } = req.query;

        if (userRole === 'student') {
            const apps = await ApplicationModel.find({ studentEmail }).sort({ appliedAt: -1 });
            return res.json(apps);
        }

        // admin/railway
        const query = {};
        if (collegeId) query.collegeId = collegeId;

        const apps = await ApplicationModel.find(query).sort({ appliedAt: -1 });
        res.json(apps);
    } catch (err) {
        console.error('Error fetching applications:', err);
        res.status(500).json({ message: 'Error fetching applications' });
    }
});

// Approve an application (college_admin / railway)
app.post('/api/applications/:id/approve', requireAuth, async (req, res) => {
    try {
        const userRole = req.session.user.role || 'student';
        if (!['college_admin', 'railway'].includes(userRole)) return res.status(403).json({ message: 'Not authorized' });
        if (!ApplicationModel) return res.status(503).json({ message: 'MongoDB not connected' });

        const app = await ApplicationModel.findOne({ applicationId: req.params.id });
        if (!app) return res.status(404).json({ message: 'Application not found' });

        app.status = 'Approved';
        app.decidedAt = new Date();
        app.decidedBy = req.session.user.email;
        await app.save();
        res.json({ message: 'Application approved', application: app });
    } catch (err) {
        console.error('Error approving application:', err);
        res.status(500).json({ message: 'Error approving application' });
    }
});

// Reject an application (college_admin / railway)
app.post('/api/applications/:id/reject', requireAuth, async (req, res) => {
    try {
        const userRole = req.session.user.role || 'student';
        if (!['college_admin', 'railway'].includes(userRole)) return res.status(403).json({ message: 'Not authorized' });
        if (!ApplicationModel) return res.status(503).json({ message: 'MongoDB not connected' });

        const app = await ApplicationModel.findOne({ applicationId: req.params.id });
        if (!app) return res.status(404).json({ message: 'Application not found' });

        app.status = 'Rejected';
        app.decidedAt = new Date();
        app.decidedBy = req.session.user.email;
        await app.save();
        res.json({ message: 'Application rejected', application: app });
    } catch (err) {
        console.error('Error rejecting application:', err);
        res.status(500).json({ message: 'Error rejecting application' });
    }
});

// Get All Stations
app.get('/api/stations', async (req, res) => {
    try {
        if (!StationModel) {
            return res.json([]);
        }
        const stations = await StationModel.find().sort({ name: 1 });
        res.json(stations);
    } catch (err) {
        console.error('Error fetching stations:', err);
        res.status(500).json({ message: 'Error fetching stations' });
    }
});

// Fallback route to help during development
app.get('/status', (req, res) => {
    res.json({ status: 'ok', mongoConnected: !!UserModel });
});

// --- Start the Server ---
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log('Static files served from', __dirname);
});