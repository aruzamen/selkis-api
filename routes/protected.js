const express = require("express");
const Usuario = require("../model/Usuario");
const Person = require("../model/Person");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

// Example: Get user profile (Protected Route)
router.get("/profile", authenticateToken, async (req, res) => {
    try {
        
        const usuario = await Usuario.findOne({
            where: { idusuario: req.user.idusuario }, // Get user based on token payload
            attributes: ["idusuario", "login", "idrol", "estado", "emaile"], // User fields
            include: [
                {
                    model: Person,
                    as: "persona",
                    attributes: ["idpersona", "nombres", "email", "telefono", "direccion"], // Select relevant Person fields
                },
            ],
        });

        console.log("--user--");
        console.log(usuario);

        if (!usuario) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(usuario);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user profile", error: error.message });
    }
});

// GET LIST OF USERS (Protected Route)
router.get("/users", authenticateToken, async (req, res) => {
    try {
        const usuarios = await Usuario.findAll({
            attributes: ["idusuario", "login", "idrol", "estado", "emaile"], // Select specific fields
        });
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error: error.message });
    }
});

module.exports = router;
