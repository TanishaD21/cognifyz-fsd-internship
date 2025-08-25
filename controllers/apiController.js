const Item = require("../models/Item");

// CREATE → Add new item
const createItem = async (req, res) => {
  try {
    const { name, description, price, inStock } = req.body;
    const item = await Item.create({ name, description, price, inStock });
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, error: err.message });
  }
};

// READ → Get all items
const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json({ success: true, data: items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// READ → Get single item by ID
const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, error: "Item not found" });
    res.status(200).json({ success: true, data: item });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, error: "Invalid ID" });
  }
};

// UPDATE → Update item by ID
const updateItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item) return res.status(404).json({ success: false, error: "Item not found" });
    res.status(200).json({ success: true, data: item });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, error: err.message });
  }
};

// DELETE → Delete item by ID
const deleteItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, error: "Item not found" });
    res.status(200).json({ success: true, message: "Item deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, error: "Invalid ID" });
  }
};

module.exports = { createItem, getItems, getItemById, updateItem, deleteItem };
