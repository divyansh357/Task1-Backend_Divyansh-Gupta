const userModel = require('../models/userModel');
const NodeCache = require('node-cache');

// Initialize Cache (Data stays in memory for 60 seconds)
const cache = new NodeCache({ stdTTL: 60 });

// GET ALL USERS (with Pagination & Caching)
const getUsers = async (req, res) => {
    try {
        // 1. Read query params (default to page 1, limit 10)
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        
        // 2. Create a unique Cache Key
        const cacheKey = `users_page_${page}_limit_${limit}`;

        // 3. CHECK CACHE: If data exists, return it immediately
        const cachedData = cache.get(cacheKey);
        if (cachedData) {
            console.log("⚡ Serving from Cache"); // Debug log for your screenshot
            return res.json(cachedData);
        }

        // 4. IF NO CACHE: Fetch from Database
        const offset = (page - 1) * limit;
        const users = await userModel.getAllUsers(limit, offset);

        const responseData = {
            page: page,
            limit: limit,
            count: users.length,
            data: users
        };

        // 5. SAVE TO CACHE for next time
        cache.set(cacheKey, responseData);

        console.log("💾 Serving from Database"); // Debug log
        res.json(responseData);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

// DELETE USER
const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUser = await userModel.deleteUser(id);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Optional: Clear cache here so the list updates immediately next time
        // cache.flushAll(); 

        res.json({ message: "User deleted successfully", user: deletedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

// UPDATE USER
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;

    try {
        const updatedUser = await userModel.updateUser(id, name, email);

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Optional: Clear cache here so the list updates immediately next time
        // cache.flushAll();

        res.json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = { getUsers, deleteUser, updateUser };