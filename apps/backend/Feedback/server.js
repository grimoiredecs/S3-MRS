// server.js
const express = require("express");
const db = require("./db");
const app = express();
const PORT = 3020;

app.use(express.json());

// POST /feedback
app.post("/feedback", (req, res) => {
    const { user_id, message } = req.body;

    if (!user_id || !message) {
        return res.status(400).json({ error: "user_id and message are required" });
    }

    const stmt = db.prepare("INSERT INTO feedback (user_id, message) VALUES (?, ?)");
    const info = stmt.run(user_id, message);
    res.json({ success: true, feedback_id: info.lastInsertRowid });
});

// GET /feedback
app.get("/feedback", (req, res) => {
    const stmt = db.prepare("SELECT * FROM feedback ORDER BY timestamp DESC");
    const allFeedback = stmt.all();
    res.json(allFeedback);
});

app.listen(PORT, () => {
    console.log(`🚀 Feedback service running on http://localhost:${PORT}`);
});