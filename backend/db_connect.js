const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();

// MySQL connection configuration
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'your_username',
    password: 'your_password',
    database: 'customer_as'
});

// Connect to MySQL database
connection.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Handle form submission
app.post('/submit', (req, res) => {
    // Process form data
    const formData = req.body;
    
    // Insert data into MySQL database
    connection.query('INSERT INTO as_requests SET ?', formData, (err, result) => {
        if (err) {
            console.error('Error inserting data into MySQL:', err);
            res.status(500).send('Error submitting request');
            return;
        }
        console.log('Data inserted into MySQL:', result);
        // Send SMS or perform any other actions
        res.redirect('/confirmation');
    });
});

// Confirmation page route
app.get('/confirmation', (req, res) => {
    res.sendFile(__dirname + '/confirmation.html');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
