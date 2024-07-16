// Example using SQLite, replace with your preferred database library
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:'); // Example: in-memory SQLite database

// Create users table
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT,
        email TEXT,
        password TEXT
    )`);
});

// Function to insert user into the database
function insertUser(username, email, password) {
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO users (username, email, password) VALUES (?, ?, ?)`, [username, email, password], function(err) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

// Function to get user by username
function getUserByUsername(username) {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
}

module.exports = {
    db,
    insertUser,
    getUserByUsername
};
