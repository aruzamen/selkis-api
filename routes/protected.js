const express = require("express");
const User = require("../model/User");
const Person = require("../model/Person");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

// Example: Get user profile (Protected Route)
router.get("/profile", authenticateToken, async (req, res) => {
    try {
        
        const user = await User.findOne({
            where: { id: req.user.id }, // Get user based on token payload
            attributes: ["id", "username", "idrol", "status", "emailCompany"], // User fields
            include: [
                {
                    model: Person,
                    as: "person",
                    attributes: ["id", "fullname", "email", "cellphone", "address"], // Select relevant Person fields
                },
            ],
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user profile", error: error.message });
    }
});

// GET LIST OF USERS (Protected Route)
router.get("/users", authenticateToken, async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ["id", "username", "idrol", "status", "emailCompany"], // Select specific fields
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error: error.message });
    }
});

module.exports = router;
