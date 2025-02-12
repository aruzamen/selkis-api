const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Person = require("./Person"); // Import the Person model

const User = sequelize.define("User", {
    id: {
        type: DataTypes.STRING(20),
        allowNull: false,
        primaryKey: true,
        field: 'idusuario'
    },
    username: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
        field: 'login'
    },
    password: {
        type: DataTypes.STRING(255), // Hashed password
        allowNull: false,
        field: 'paswd'
    },
    idrol: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM,
        values: ['Activo', 'Inactivo'],
        allowNull: false,
        defaultValue: "Activo",
        field: 'estado'
    },
    idalmacen: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'numero'
    },
    emailCompany: {
        type: DataTypes.STRING(50),
        allowNull: true,
        validate: { isEmail: true },
        field: 'emaile'
    },
    passwordCompany: {
        type: DataTypes.STRING(255), // Hashed password
        allowNull: false,
        field: 'paswde'
    },
    sign: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'firma'
    },
    personId: {
        type: DataTypes.STRING(20),
        allowNull: false,
        references: {
            model: Person, // Link to the Person model
            key: "id",
        },
        field: 'idpersona'
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
User.belongsTo(Person, { foreignKey: "personId", as: "person" });

module.exports = User;
