const mongoose = require("mongoose");

const fatigueSchema = new mongoose.Schema({
    typingSpeed: Number,
    screenTime: Number,
    sleepHours: Number,
    reactionTime: Number,
    fatigueScore: Number,
    riskLevel: String,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Fatigue", fatigueSchema);