const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const Fatigue = require("./models/Fatigue");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/fatigueDB")
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));


// 🧠 Fatigue Calculation Logic
function calculateFatigue(data) {
    let score = 0;

    if (data.sleepHours < 6) score += 25;
    if (data.screenTime > 120) score += 20;
    if (data.typingSpeed < 20) score += 20;
    if (data.reactionTime > 600) score += 20;

    let risk = "Low";

    if (score > 60) risk = "High";
    else if (score > 30) risk = "Medium";

    return { score, risk };
}


// API Route
app.post("/analyze", async (req, res) => {

    const { typingSpeed, screenTime, sleepHours, reactionTime } = req.body;

    const result = calculateFatigue({
        typingSpeed,
        screenTime,
        sleepHours,
        reactionTime
    });

    const newRecord = new Fatigue({
        typingSpeed,
        screenTime,
        sleepHours,
        reactionTime,
        fatigueScore: result.score,
        riskLevel: result.risk
    });

    await newRecord.save();

    res.json(result);
});


app.listen(5000, () => {
    console.log("Server running on port 5000");
});