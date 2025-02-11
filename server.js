require("dotenv").config();

const express = require("express");
const sequelize = require("./config/database");
const authRoutes = require("./routes/auth");
const protectedRoutes = require("./routes/protected");

const app = express();
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/protected", protectedRoutes);

// Root Route
app.get("/", (req, res) => {
  res.send("Selkis API");
});

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "development";

// Sync Database and Start Server
sequelize.sync()
    .then(() => {
        console.log(`Database connected in ${NODE_ENV} mode`);
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => console.error("Database connection failed:", err));
