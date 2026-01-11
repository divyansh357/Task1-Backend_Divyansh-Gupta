// We will import the model later
const userModel = require('../models/userModel');

const register = async (req, res) => {
    // 1. Destructure input
    const { name, email, password } = req.body;

    // Basic Validation
    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Placeholder response for today
        res.status(201).json({ 
            message: "User registered successfully (Logic coming next step)", 
            user: { name, email } 
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

module.exports = { register };