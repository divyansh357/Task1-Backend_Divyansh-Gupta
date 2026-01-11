const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middleware/authMiddleware'); // Import the Guard

// Protect this route with verifyToken
router.get('/', verifyToken, userController.getUsers);
router.delete('/:id', verifyToken, userController.deleteUser); 
router.put('/:id', verifyToken, userController.updateUser);

module.exports = router;