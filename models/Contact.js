const mongoose = require("mongoose");

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
  }
}, { timestamps: true });

module.exports = mongoose.model("Contact", contactSchema);
