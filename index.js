const express = require('express');
const connectDB = require('./db'); // Import DB connection function
const userRoutes = require('./src/routes/userRoutes')

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Example Route
app.get('/', (req, res) => {
    res.send('MongoDB connected with Express.js');
});

app.use('/users', userRoutes);

// Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});