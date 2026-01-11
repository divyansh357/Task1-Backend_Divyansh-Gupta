const express = require('express');
const dotenv = require('dotenv');
const pool = require('./src/config/db'); // Imports DB connection
const authRoutes = require('./src/routes/authRoutes'); // Imports Routes
const userRoutes = require('./src/routes/userRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Mount the routes
// Any request starting with /api/auth goes to authRoutes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Start the Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});