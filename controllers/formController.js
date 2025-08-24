const Contact = require("../models/Contact");

// GET → show contact form
const getContact = (req, res) => {
  res.render("contact", { success: null, error: null });
};

// POST → save form data
const postContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message, contactMethod, newsletter, password } = req.body;

    // ✅ Server-side validation
    if (!name || name.trim().length < 3) {
      return res.render("contact", { success: null, error: "Name must be at least 3 characters long." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return res.render("contact", { success: null, error: "Please provide a valid email address." });
    }

    if (phone && !/^\d{10}$/.test(phone)) {
      return res.render("contact", { success: null, error: "Phone number must be 10 digits." });
    }

    if (!subject) {
      return res.render("contact", { success: null, error: "Please select a subject." });
    }

    if (!message || message.trim().length < 10) {
      return res.render("contact", { success: null, error: "Message must be at least 10 characters long." });
    }

    if (!password || password.length < 8) {
      return res.render("contact", { success: null, error: "Password must be at least 8 characters long." });
    }

    // ✅ Now saving → password gets hashed automatically in model
    await Contact.create({
      name,
      email,
      phone,
      subject,
      message,
      contactMethod,
      newsletter: newsletter === "yes",
      password
    });

    res.render("contact", { success: "✅ Form submitted successfully!", error: null });
  } catch (err) {
    console.error(err);
    res.render("contact", { success: null, error: "❌ Server error, please try again." });
  }
};

module.exports = { getContact, postContact };
