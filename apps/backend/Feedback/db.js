// db.js
const Database = require("better-sqlite3");
const db = new Database("feedback.db");

// Create table if not exists
db.prepare(`
    CREATE TABLE IF NOT EXISTS feedback (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id TEXT,
        message TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`).run();

module.exports = db;