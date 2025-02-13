const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Tag = require("./Tag");

const Topic = sequelize.define("Topic", {
    id: {
      type: DataTypes.STRING,
      field: "idtopico", // Maps to "idtopico" in the database
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      field: "nombre", // Maps to "nombre" in the database
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM,
      values: ["Activo", "Inactivo", "Pendiente"],
      defaultValue: "Activo",
      field: "tipo", // Maps to "tipo" in the database
      allowNull: false,
    },
    tagId: {
      type: DataTypes.STRING,
      field: "idetiqueta", // Maps to "idetiqueta" in the database
      unique: true,
    },
  },
  {
    tableName: "topico",
    timestamps: false,
  }
);

// Define One-to-One relationship
Topic.belongsTo(Tag, {
  foreignKey: "tagId",
  onDelete: "CASCADE", 
  as: "tag"
});

module.exports = Topic;
