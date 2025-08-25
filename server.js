require("dotenv").config();
const express = require("express");
const path = require("path");
const morgan = require("morgan");
const expressLayouts = require("express-ejs-layouts");
const connectDB = require("./utils/db");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// EJS setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(expressLayouts);

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Connect DB
connectDB();

// Routes
const indexRoutes = require("./routes/index");
const apiRoutes = require("./routes/api");

app.use("/", indexRoutes);
app.use("/api", apiRoutes);

// 🔥 ADD THIS ROUTE for Level 3 Task 5
app.get("/items", (req, res) => {
  res.render("items");
});

// Error handler
app.use((req, res) => {
  res.status(404).render("error", { error: "Page not found!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
