const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"]
  },
  phone: {
    type: String,
    match: [/^\d{10}$/, "Phone must be a 10-digit number"]
  },
  subject: {
    type: String,
    enum: ["general", "support", "feedback", "other"],
    required: true
  },
  message: {
    type: String,
    required: true,
    minlength: 10
  },
  contactMethod: {
    type: String,
    enum: ["email", "phone"],
    default: "email"
  },
  newsletter: {
    type: Boolean,
    default: false
  },
  password: {
    type: String,   // will be stored as a hashed password
    required: true,
    minlength: 8
  }
}, { timestamps: true });

contactSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next(); // only hash if password is new/modified
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("Contact", contactSchema);
