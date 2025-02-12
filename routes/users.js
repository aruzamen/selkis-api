const express = require("express");
const User = require("../model/User");
const Person = require("../model/Person");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

// Get user profile
router.get("/profile", authenticateToken, async (request, response) => {
    try {
        
        const user = await User.findOne({
            where: { id: request.user.id }, // Get user based on token payload
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
            return response.status(404).json({ message: "User not found" });
        }

        response.json(user);
    } catch (error) {
        response.status(500).json({ message: "Error fetching user profile", error: error.message });
    }
});

// Get user by ID
router.get('/:id', authenticateToken, async (request, response) => {
  try {
    const user = await User.findByPk(request.params.id);
    if (!user) {
      response.status(404).json({ message: 'User not found.' });
    } 
    
    response.json(user);
  } catch (error) {
    response.status(500).json({ message: 'Failed to fetch user.', error: error.message });
  }
});

// Update user by ID
router.put('/:id', async (request, response) => {
    try {
      const [updatedRowsCount] = await User.update(request.body, {
          where: { id: request.params.id }
      });      
      if (updatedRowsCount === 0) {
        response.status(404).json({ message: 'User not found.' });
      } else {
        const user = await User.findByPk(request.params.id);
        response.json(user);
      }
    } catch (error) {
      response.status(500).json({ message: 'Failed to update user.', error: error.message });
    }
});

// Get all users
router.get("/", authenticateToken, async (request, response) => {
    try {
        const users = await User.findAll({
            attributes: ["id", "username", "idrol", "status", "emailCompany"], // Select specific fields
        });
        response.json(users);
    } catch (error) {
        response.status(500).json({ message: "Error fetching users", error: error.message });
    }
});

module.exports = router;
