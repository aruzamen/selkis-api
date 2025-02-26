const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Role = sequelize.define("Role", {
    id: {
      type: DataTypes.STRING,
      field: "idrol",
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      field: "nombre",
      allowNull: false,
    },
    status: {
        type: DataTypes.ENUM,
        values: ['Activo', 'Inactivo'],
        allowNull: false,
        defaultValue: "Activo",
        field: 'estado'
    },
    number: {
        type: DataTypes.STRING,
        field: "numero",
        allowNull: false,
    },
  },
  {
    tableName: "rol", // Keeps the original table name
    timestamps: false, // Disables createdAt and updatedAt fields
  }
);

module.exports = Role;
