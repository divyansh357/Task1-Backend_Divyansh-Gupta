const userModel = require('../models/userModel');

const getUsers = async (req, res) => {
    try {
        // 1. Read query params (default to page 1, limit 10 if missing)
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        
        // 2. Calculate Offset (Skip)
        // Example: Page 1 -> skip 0. Page 2 -> skip 10.
        const offset = (page - 1) * limit;

        // 3. Call Model
        const users = await userModel.getAllUsers(limit, offset);

        // 4. Send Response with metadata (Good practice!)
        res.json({
            page: page,
            limit: limit,
            count: users.length,
            data: users
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params; // Get ID from URL (e.g., /users/5)

    try {
        const deletedUser = await userModel.deleteUser(id);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "User deleted successfully", user: deletedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body; // Data to update

    try {
        const updatedUser = await userModel.updateUser(id, name, email);

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = { getUsers, deleteUser, updateUser };