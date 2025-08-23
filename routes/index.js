const express = require("express");
const router = express.Router();
const { getContact, postContact } = require("../controllers/formController");

// Home page
router.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

// Contact form
router.get("/contact", getContact);
router.post("/contact", postContact);

module.exports = router;
