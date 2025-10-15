// database/db.js
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

const dbURL = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(dbURL);
    console.log('✅ MongoDB connected successfully!');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
