const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Tag = sequelize.define("Tag", {
    id: {
      type: DataTypes.STRING,
      field: "idetiqueta", // Maps to "idetiqueta" in the database
      primaryKey: true,
    },
    value: {
      type: DataTypes.STRING,
      field: "valor", // Maps to "valor" in the database
      allowNull: false,
    },
  },
  {
    tableName: "etiqueta", // Keeps the original table name
    timestamps: false, // Disables createdAt and updatedAt fields
  }
);

module.exports = Tag;
