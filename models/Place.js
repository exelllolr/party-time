const mongoose = require("mongoose");

const PlaceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true, enum: ["cafe", "cinema", "ice_rink", "restaurant", "bar"] },
    address: { type: String, required: true },
    coordinates: { lat: Number, lng: Number },
    description: { type: String },
    photos: { type: [String], default: [] },
    rating: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Place", PlaceSchema);