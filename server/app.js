// require('dotenv').config();
// const express = require('express');
// const path = require('path');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const app = express();
// const port = process.env.PORT || 3000; // Default port if not set in .env

// // Middleware
// app.use(cors()); // Enable CORS
// app.use(bodyParser.json()); // Parse JSON bodies
// app.use(bodyParser.urlencoded({ extended: false })); // Parse URL-encoded bodies

// // Serve static files (including uploaded images)
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Import and connect to the database
// require('./config/db_con');

// // Import and use routes
// const router = require('./routes/user_routes');
// app.use('/', router);


// // Start the server
// app.listen(port, () => {
//     // console.log(`The server is live on port ${port}`);
//     // console.log(`http://localhost:${port}`);
// });

// // Global error handling middleware
// app.use((err, req, res, next) => {
//     console.error('Global error handler:', err);
//     res.status(500).send({ message: "Internal Server Error", error: err.message });
// });


require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000; // Default port if not set in .env

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: false })); // Parse URL-encoded bodies

// Serve static files (including uploaded images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Import and connect to the database
require('./config/db_con');

// Simple route to check if the server is working
app.get('/', (req, res) => {
    res.send('Hello World');
});

// Simple route to check if the server is working
app.get('/a', (req, res) => {
    res.send('Hello Woraaaald');
});

// Import and use routes
const router = require('./routes/user_routes');
app.use('/', router);

// Start the server
app.listen(port, () => {
    console.log(`The server is live on port ${port}`);
    console.log(`http://localhost:${port}`);
});

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error('Global error handler:', err);
    res.status(500).send({ message: "Internal Server Error", error: err.message });
});
