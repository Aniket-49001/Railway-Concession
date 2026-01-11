/**
 * Seed Script for Railway Concession System (college-scoped)
 * Run: node seed.js
 * This script populates the MongoDB database with sample colleges, users and applications
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/railway-concession';

// Define Schemas
const collegeSchema = new mongoose.Schema({
    collegeId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    address: { type: String, default: '' },
    verified: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, lowercase: true },
    password_hash: { type: String, required: true },
    fullName: { type: String, default: '' },
    collegeId: { type: String, default: '' },
    role: { type: String, enum: ['student', 'college_admin', 'railway'], default: 'student' },
    created_at: { type: Date, default: Date.now }
});

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

// Create Models
const College = mongoose.model('College', collegeSchema);
const User = mongoose.model('User', userSchema);
const Application = mongoose.model('Application', applicationSchema);

// Sample Data
const sampleColleges = [
    { collegeId: 'ABC123', name: 'Alpha Business College', address: '123 Main St, City' },
    { collegeId: 'DEF456', name: 'Delta Engineering College', address: '456 Elm Rd, City' },
    { collegeId: 'GHI789', name: 'Gamma Arts College', address: '789 Oak Ave, City' }
];

async function seedDatabase() {
    try {
        await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');

        // Clear existing data
        await College.deleteMany({});
        await User.deleteMany({});
        await Application.deleteMany({});
        console.log('Cleared existing college/user/application data');

        // Insert sample colleges
        await College.insertMany(sampleColleges);
        console.log('✅ Added', sampleColleges.length, 'colleges');

        // Create sample users
        const salt = await bcrypt.genSalt(10);
        const students = [
            { email: 'student1@example.com', password: await bcrypt.hash('password1', salt), fullName: 'Student One', collegeId: 'ABC123', role: 'student' },
            { email: 'student2@example.com', password: await bcrypt.hash('password2', salt), fullName: 'Student Two', collegeId: 'DEF456', role: 'student' }
        ];
        const admins = [
            { email: 'admin-abc@example.com', password: await bcrypt.hash('adminpass', salt), fullName: 'ABC Admin', collegeId: 'ABC123', role: 'college_admin' },
            { email: 'railway@example.com', password: await bcrypt.hash('railpass', salt), fullName: 'Railway Authority', collegeId: '', role: 'railway' }
        ];

        await User.insertMany([...students, ...admins]);
        console.log('✅ Added sample users (students and admins)');

        // Create sample applications
        const app1 = new Application({ applicationId: 'APP' + Date.now(), studentEmail: 'student1@example.com', studentName: 'Student One', collegeId: 'ABC123', reason: 'Semester travel for internship', documents: [] });
        await app1.save();

        const app2 = new Application({ applicationId: 'APP' + (Date.now()+1), studentEmail: 'student2@example.com', studentName: 'Student Two', collegeId: 'DEF456', reason: 'Home visit during semester break', documents: [] });
        await app2.save();

        console.log('✅ Added sample applications');

        console.log('\n🚀 Database seeded successfully!');
        console.log('Total Colleges:', await College.countDocuments());
        console.log('Total Users:', await User.countDocuments());
        console.log('Total Applications:', await Application.countDocuments());

        process.exit(0);
    } catch (err) {
        console.error('Error seeding database:', err);
        process.exit(1);
    }
}

seedDatabase();
