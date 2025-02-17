const express = require("express");
const Place = require("../models/Place");

const router = express.Router();

// 📌 1. Получить все места
router.get("/", async (req, res) => {
    try {
        const places = await Place.find();
        res.json(places);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 📌 2. Создать новое место
router.post("/", async (req, res) => {
    try {
        const newPlace = new Place(req.body);
        await newPlace.save();
        res.status(201).json(newPlace);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// 📌 3. Получить место по ID
router.get("/:id", async (req, res) => {
    try {
        const place = await Place.findById(req.params.id);
        if (!place) return res.status(404).json({ message: "Place not found" });
        res.json(place);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 📌 4. Обновить место
router.put("/:id", async (req, res) => {
    try {
        const updatedPlace = await Place.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedPlace);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// 📌 5. Удалить место
router.delete("/:id", async (req, res) => {
    try {
        await Place.findByIdAndDelete(req.params.id);
        res.json({ message: "Place deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;