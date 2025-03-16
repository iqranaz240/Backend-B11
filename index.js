const express = require('express');
const connectDB = require('./db'); // Import DB connection function
const userRoutes = require('./src/routes/userRoutes');
const cors = require('cors'); // Import the CORS package

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Enable CORS for all origins
app.use(cors()); // This allows requests from any origin

// Example Route
app.get('/', (req, res) => {
    res.send('MongoDB connected with Express.js');
});

app.use('/users', userRoutes);

// Start Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;