const express = require("express");
const router = express.Router();
const { getContact, postContact } = require("../controllers/formController");

// Helper to detect SPA requests
const isSpa = (req) => req.xhr || req.headers["x-requested-with"] === "XMLHttpRequest";

// Home page
router.get("/", (req, res) => {
  res.render("index", {
    layout: isSpa(req) ? false : "layout",
    title: "Home",
  });
});

// Contact page (GET)
router.get("/contact", (req, res) => {
  if (isSpa(req)) {
    // SPA → no layout
    res.render("contact", { layout: false, success: null, error: null });
  } else {
    // Full page load
    getContact(req, res);
  }
});

// Contact form (POST)
router.post("/contact", postContact);

// Items page
router.get("/items", (req, res) => {
  res.render("items", {
    layout: isSpa(req) ? false : "layout",
    title: "Items",
  });
});

// Login
router.get("/login", (req, res) => {
  if (isSpa(req)) {
    res.render("login", { layout: false, title: "Login" });
  } else {
    res.render("login", { title: "Login" });
  }
});

// Register
router.get("/register", (req, res) => {
  if (isSpa(req)) {
    res.render("register", { layout: false, title: "Register" });
  } else {
    res.render("register", { title: "Register" });
  }
});

module.exports = router;
