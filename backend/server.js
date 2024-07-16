const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('frontend'));

// Endpoint for user signup
app.post('/api/signup', (req, res) => {
    const { username, email, password } = req.body;
    console.log("heheheheheheh", req.body);

    Promise.all([
        db.getUserByUsername(username),
    ])
    .then(([existingUserByUsername]) => {
        if (existingUserByUsername) {
            return res.status(400).json({ error: 'Username already exists' });
        }
        return db.insertUser(username, email, password);
    })
    .then(() => {
        res.json({ username });
    })
    .catch(err => {
        console.error('Error signing up user:', err);
        res.status(500).json({ error: 'Error signing up user', err });
    });
});

// Endpoint for user login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    db.getUserByUsername(username)
        .then(user => {
            if (user && user.password === password) {
                res.json({ user });
            } else {
                res.status(401).json({ error: 'Invalid username or password' });
            }
        })
        .catch(err => {
            console.error('Error retrieving user:', err);
            res.status(500).json({ error: 'Error retrieving user' });
        });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
