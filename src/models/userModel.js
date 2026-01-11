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

// Function to get users with pagination
const getAllUsers = async (limit, offset) => {
    // $1 is limit, $2 is offset
    const result = await pool.query(
        'SELECT id, name, email, created_at FROM users LIMIT $1 OFFSET $2', 
        [limit, offset]
    );
    return result.rows;
};
const deleteUser = async (id) => {
    const result = await pool.query(
        'DELETE FROM users WHERE id = $1 RETURNING *', 
        [id]
    );
    return result.rows[0];
};

const updateUser = async (id, name, email) => {
    const result = await pool.query(
        'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING id, name, email',
        [name, email, id]
    );
    return result.rows[0];
};

module.exports = { findUserByEmail, createUser, getAllUsers, deleteUser, updateUser };