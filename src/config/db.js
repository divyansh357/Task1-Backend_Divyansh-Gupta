// src/config/db.js
const { Pool } = require('pg');
require('dotenv').config();

// Create a connection pool (efficient for multiple users)
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Test the connection immediately when this file runs
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('❌ Database Connection Failed:', err);
    } else {
        console.log('✅ Connected to PostgreSQL successfully!');
    }
});

module.exports = pool;