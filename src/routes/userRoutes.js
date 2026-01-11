const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middleware/authMiddleware'); // Import the Guard

// Protect this route with verifyToken
router.get('/', verifyToken, userController.getUsers);

module.exports = router;