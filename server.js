const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001; // Choose an available port
const articlesRoutes = require('./routes/articles');

app.use(cors());
app.use(bodyParser.json());

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, 'build')));

// Endpoint to serve articles.json
app.get('/articles', (req, res) => {
    const articlesPath = path.join(__dirname, 'data/articles.json');
    res.sendFile(articlesPath);
});

app.post('/submit-feedback', (req, res) => {
    const feedback = req.body.feedback;
    console.log('Received feedback:', feedback);

    // Append feedback to a local file
    fs.appendFile('feedback.txt', feedback + '\n', err => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error saving feedback' });
        }
        res.json({ message: 'Feedback received' });
    });
});

// The "catchall" handler to serve the React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'));
});

app.listen(port, () => {
    console.log('Server running on http://localhost:${port}');
});

app.post('/articles', (req, res) => {
    const newArticle = req.body;
    // Implement logic to store newArticle in your database or data structure
    console.log('Received new article:', newArticle);
    res.status(200).json({ message: 'New article added' });
});



app.use('/articles', articlesRoutes);
