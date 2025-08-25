const express = require("express");
const router = express.Router();
const apiController = require("../controllers/apiController");
const { protect, requireRole } = require("../middleware/auth");

// Public routes (anyone can see items)
router.get("/items", apiController.getItems);
router.get("/items/:id", apiController.getItemById);

// Protected routes (need login)
router.post("/items", protect, apiController.createItem);
router.put("/items/:id", protect, apiController.updateItem);
router.delete("/items/:id", protect, apiController.deleteItem);

// If you want admin-only access, wrap with requireRole("admin")
// e.g. router.post("/items", protect, requireRole("admin"), apiController.createItem);

module.exports = router;
