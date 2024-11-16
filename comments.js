// Create web server
// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

// Load comments from file
let comments = JSON.parse(fs.readFileSync('comments.json', 'utf8'));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({extended: true}));

// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.json());

// Get all comments
app.get('/comments', (req, res) => {
  res.json(comments);
});

// Post a new comment
app.post('/comments', (req, res) => {
  const comment = req.body;
  comments.push(comment);
  fs.writeFileSync('comments.json', JSON.stringify(comments));
  res.json(comment);
});

// Start web server
app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});