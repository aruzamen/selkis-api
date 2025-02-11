const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateToken = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) return res.status(403).json({ message: "Access denied. No token provided." });

    try {
        // Extract the token after "Bearer "
        const tokenValue = token.startsWith("Bearer ") ? token.slice(7, token.length) : token;

        // Verify token
        const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET);
        req.user = decoded; // Attach user data to request
        next(); // Proceed to next middleware/route
    } catch (error) {
        res.status(401).json({ message: "Invalid or expired token." });
    }
};

module.exports = authenticateToken;
