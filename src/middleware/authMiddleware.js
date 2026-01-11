const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // 1. Get the token from the header (Format: "Bearer <token>")
    const authHeader = req.headers['authorization'];
    
    // Check if header exists and starts with "Bearer "
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "Access Denied: No Token Provided" });
    }

    // Extract the token part (remove "Bearer " string)
    const token = authHeader.split(' ')[1];

    try {
        // 2. Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // 3. Attach user info to the request object
        req.user = decoded;
        
        // 4. Move to the next step (the controller)
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid Token" });
    }
};

module.exports = verifyToken;