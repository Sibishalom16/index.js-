const express = require("express");

const app = express();
const PORT = 3000;
app.use(express.json());

let items = []; // In-memory data storage

// Create (POST)
app.post("/items", (req, res) => {
    const item = { id: Date.now(), ...req.body };
    items.push(item);
    res.status(201).json(item);
});

// Read (GET all)
app.get("/items", (req, res) => res.json(items));

// Read (GET by ID)
app.get("/items/:id", (req, res) => {
    const item = items.find(i => i.id == req.params.id);
    item ? res.json(item) : res.status(404).json({ message: "Item not found" });
});

// Update (PUT)
app.put("/items/:id", (req, res) => {
    const index = items.findIndex(i => i.id == req.params.id);
    if (index === -1) return res.status(404).json({ message: "Item not found" });
    items[index] = { ...items[index], ...req.body };
    res.json(items[index]);
});

// Delete (DELETE)
app.delete("/items/:id", (req, res) => {
    items = items.filter(i => i.id != req.params.id);
    res.json({ message: "Item deleted" });
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
