const express = require("express");
const router = express.Router();
const apiController = require("../controllers/apiController");

// CRUD Routes
router.post("/items", apiController.createItem);
router.get("/items", apiController.getItems);
router.get("/items/:id", apiController.getItemById);
router.put("/items/:id", apiController.updateItem);
router.delete("/items/:id", apiController.deleteItem);

module.exports = router;
