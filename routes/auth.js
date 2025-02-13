const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const authenticateToken = require("../middleware/authMiddleware"); // Import authentication middleware
require("dotenv").config();

const router = express.Router();

// User Login
router.post("/login", async (request, response) => {
    try {
        const { username, password } = request.body;

        // Find user by login
        const user = await User.findOne({ where: { username } });
        if (!user) return response.status(401).json({ message: "Invalid login or password" });

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return response.status(401).json({ message: "Invalid login or password" });

        // Generate JWT Token
        const token = jwt.sign(
            { id: user.id, username: user.username, idrol: user.idrol },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        // Update token field in database
        user.token = token;
        await user.save();

        response.json({ message: "Login successful", token });
    } catch (error) {
        response.status(500).json({ message: "Server error", error: error.message });
    }
});

// User Registration
router.post("/register", async (request, response) => {
    try {
        const { id, username, password, idrol, idalmacen, number, emailCompany, personId, idhorario } = request.body;

        // Hash passwords
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = await User.create({
            id,
            username,
            password: hashedPassword,
            passwordCompany: hashedPassword,
            idrol,
            idalmacen,
            number,
            emailCompany,
            personId,
            idhorario,
        });

        response.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        response.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;
