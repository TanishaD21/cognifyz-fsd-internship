const Contact = require("../models/Contact");

// GET → show contact form
const getContact = (req, res) => {
  res.render("contact", { success: null, error: null });
};

// POST → save form data
const postContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.render("contact", { success: null, error: "All fields are required!" });
    }

    await Contact.create({ name, email, message });

    res.render("contact", { success: "Form submitted successfully!", error: null });
  } catch (err) {
    console.error(err);
    res.render("contact", { success: null, error: "Server error, please try again" });
  }
};

module.exports = { getContact, postContact };
