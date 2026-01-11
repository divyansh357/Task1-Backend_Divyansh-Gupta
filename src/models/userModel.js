const pool = require('../config/db');

// Function to find a user by email (Used for Login & Duplicate Check)
const findUserByEmail = async (email) => {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0]; // Returns the user object or undefined
};

// Function to create a new user (Used for Signup)
const createUser = async (name, email, hashedPassword) => {
    const result = await pool.query(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
        [name, email, hashedPassword]
    );
    return result.rows[0]; // Returns the newly created user
};

module.exports = { findUserByEmail, createUser };