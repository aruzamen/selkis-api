const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Usuario = require("../model/Usuario");
const authenticateToken = require("../middleware/authMiddleware"); // Import authentication middleware
require("dotenv").config();

const router = express.Router();

// User Login
router.post("/login", async (req, res) => {
    try {
        const { login, password } = req.body;

        // Find user by login
        const usuario = await Usuario.findOne({ where: { login } });
        if (!usuario) return res.status(401).json({ message: "Invalid login or password" });

        // Compare password
        const isMatch = await bcrypt.compare(password, usuario.paswd);
        if (!isMatch) return res.status(401).json({ message: "Invalid login or password" });

        // Generate JWT Token
        const token = jwt.sign(
            { idusuario: usuario.idusuario, login: usuario.login, idrol: usuario.idrol },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        // Update token field in database
        usuario.token = token;
        await usuario.save();

        res.json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// User Registration
router.post("/register", async (req, res) => {
    try {
        const { idusuario, login, password, idrol, idalmacen, numero, emaile, idpersona, idhorario } = req.body;

        // Hash passwords
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const usuario = await Usuario.create({
            idusuario,
            login,
            paswd: hashedPassword,
            paswde: hashedPassword,
            idrol,
            idalmacen,
            numero,
            emaile,
            idpersona,
            idhorario,
        });

        res.status(201).json({ message: "User registered successfully", usuario });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;
