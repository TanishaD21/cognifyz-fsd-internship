const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/cognifyz_fsd");
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
    process.exit(1);
  }
}

module.exports = connectDB;
