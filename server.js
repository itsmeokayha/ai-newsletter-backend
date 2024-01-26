const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

// Define CORS options
const corsOptions = {
  origin: 'https://teal-sawine-c1f959.netlify.app/', // replace with your actual Netlify URL
  optionsSuccessStatus: 200
};

// Use CORS with the specified options
app.use(cors(corsOptions));

// Then continue with the rest of your middleware and routes
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));

app.use(bodyParser.json());


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
    res.sendFile(path.join(__dirname, '/build/index.html'));
});
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});


