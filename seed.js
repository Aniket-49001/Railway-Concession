/**
 * Seed Script for Railway Concession System
 * Run: node seed.js
 * This script populates the MongoDB database with sample trains and stations
 */

const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/railway-concession';

// Define Schemas
const stationSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    code: { type: String, required: true, unique: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    latitude: { type: Number, default: 0 },
    longitude: { type: Number, default: 0 },
    created_at: { type: Date, default: Date.now }
});

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

// Create Models
const Station = mongoose.model('Station', stationSchema);
const Train = mongoose.model('Train', trainSchema);

// Sample Data
const sampleStations = [
    { name: 'Delhi Central', code: 'DLI', city: 'Delhi', state: 'Delhi', latitude: 28.6355, longitude: 77.2263 },
    { name: 'Mumbai Central', code: 'MUM', city: 'Mumbai', state: 'Maharashtra', latitude: 18.9711, longitude: 72.8479 },
    { name: 'Bangalore City', code: 'BNG', city: 'Bangalore', state: 'Karnataka', latitude: 12.9716, longitude: 77.5946 },
    { name: 'Kolkata', code: 'KOL', city: 'Kolkata', state: 'West Bengal', latitude: 22.5726, longitude: 88.3639 },
    { name: 'Chennai Central', code: 'CHE', city: 'Chennai', state: 'Tamil Nadu', latitude: 13.0287, longitude: 80.2058 },
    { name: 'Hyderabad', code: 'HYD', city: 'Hyderabad', state: 'Telangana', latitude: 17.3850, longitude: 78.4867 },
    { name: 'Pune', code: 'PUN', city: 'Pune', state: 'Maharashtra', latitude: 18.5204, longitude: 73.8567 },
    { name: 'Ahmedabad', code: 'AHM', city: 'Ahmedabad', state: 'Gujarat', latitude: 23.0225, longitude: 72.5714 }
];

const sampleTrains = [
    {
        trainNumber: '12001',
        trainName: 'Shatabdi Express',
        source: 'Delhi Central',
        destination: 'Agra Cantt',
        totalSeats: 400,
        availableSeats: 350,
        departureTime: '06:00 AM',
        arrivalTime: '10:15 AM',
        fare: 400,
        trainType: 'Express',
        status: 'On Time'
    },
    {
        trainNumber: '12002',
        trainName: 'Rajdhani Express',
        source: 'Delhi Central',
        destination: 'Mumbai Central',
        totalSeats: 500,
        availableSeats: 480,
        departureTime: '04:55 PM',
        arrivalTime: '07:45 AM',
        fare: 2500,
        trainType: 'Superfast',
        status: 'On Time'
    },
    {
        trainNumber: '12003',
        trainName: 'Karnataka Express',
        source: 'Delhi Central',
        destination: 'Bangalore City',
        totalSeats: 450,
        availableSeats: 420,
        departureTime: '03:00 PM',
        arrivalTime: '09:45 AM',
        fare: 2000,
        trainType: 'Express',
        status: 'On Time'
    },
    {
        trainNumber: '12004',
        trainName: 'Howrah Mail',
        source: 'Delhi Central',
        destination: 'Kolkata',
        totalSeats: 400,
        availableSeats: 380,
        departureTime: '11:00 AM',
        arrivalTime: '05:20 AM',
        fare: 1800,
        trainType: 'Express',
        status: 'On Time'
    },
    {
        trainNumber: '12005',
        trainName: 'Coromandel Express',
        source: 'Mumbai Central',
        destination: 'Chennai Central',
        totalSeats: 350,
        availableSeats: 320,
        departureTime: '09:00 AM',
        arrivalTime: '03:30 PM',
        fare: 1500,
        trainType: 'Express',
        status: 'On Time'
    },
    {
        trainNumber: '12006',
        trainName: 'Deccan Express',
        source: 'Pune',
        destination: 'Hyderabad',
        totalSeats: 300,
        availableSeats: 280,
        departureTime: '10:30 PM',
        arrivalTime: '06:15 AM',
        fare: 900,
        trainType: 'Passenger',
        status: 'Delayed'
    },
    {
        trainNumber: '12007',
        trainName: 'Gujarat Express',
        source: 'Mumbai Central',
        destination: 'Ahmedabad',
        totalSeats: 350,
        availableSeats: 340,
        departureTime: '07:00 PM',
        arrivalTime: '11:30 PM',
        fare: 600,
        trainType: 'Express',
        status: 'On Time'
    },
    {
        trainNumber: '12008',
        trainName: 'Bangalore Express',
        source: 'Bangalore City',
        destination: 'Hyderabad',
        totalSeats: 250,
        availableSeats: 200,
        departureTime: '11:00 AM',
        arrivalTime: '05:00 PM',
        fare: 800,
        trainType: 'Express',
        status: 'On Time'
    }
];

async function seedDatabase() {
    try {
        await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');

        // Clear existing data
        await Station.deleteMany({});
        await Train.deleteMany({});
        console.log('Cleared existing data');

        // Insert sample data
        await Station.insertMany(sampleStations);
        console.log('✅ Added', sampleStations.length, 'stations');

        await Train.insertMany(sampleTrains);
        console.log('✅ Added', sampleTrains.length, 'trains');

        console.log('\n🚀 Database seeded successfully!');
        console.log('Total Stations:', await Station.countDocuments());
        console.log('Total Trains:', await Train.countDocuments());

        process.exit(0);
    } catch (err) {
        console.error('Error seeding database:', err);
        process.exit(1);
    }
}

seedDatabase();
