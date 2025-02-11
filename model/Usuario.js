const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Person = require("./Person"); // Import the Person model

const Usuario = sequelize.define("Usuario", {
    idusuario: {
        type: DataTypes.STRING(20),
        allowNull: false,
        primaryKey: true,
    },
    login: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    paswd: {
        type: DataTypes.STRING(255), // Hashed password
        allowNull: false,
    },
    idrol: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    estado: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: "Activo",
    },
    idalmacen: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    numero: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    emaile: {
        type: DataTypes.STRING(50),
        allowNull: true,
        validate: { isEmail: true },
    },
    paswde: {
        type: DataTypes.STRING(255), // Hashed password
        allowNull: false,
    },
    firma: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    idpersona: {
        type: DataTypes.STRING(20),
        allowNull: false,
        references: {
            model: Person, // Link to the Person model
            key: "idpersona",
        },
    },
    link: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: "usuario.jpg",
    },
    idhorario: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    token: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
}, {
    tableName: "usuario",
    timestamps: false,
});

// Define association
Usuario.belongsTo(Person, { foreignKey: "idpersona", as: "persona" });

module.exports = Usuario;
