const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'data', 'assignments.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) return console.error(err.message);
  console.log('Connected to the SQLite database.');
});

// Create assignments table
db.run(`
  CREATE TABLE IF NOT EXISTS assignments (
    assignment_id INTEGER PRIMARY KEY AUTOINCREMENT,
    guild_id TEXT NOT NULL,
    course_name TEXT NOT NULL,
    assignment_name TEXT NOT NULL,
    due_date TEXT,
    notes TEXT,
    created_at TEXT NOT NULL
  )
`);

module.exports = db;
