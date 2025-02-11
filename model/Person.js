const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Person = sequelize.define("Person", {
    idpersona: {
        type: DataTypes.STRING(20),
        allowNull: false,
        primaryKey: true,
    },
    nit: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
    },
    nombres: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    carnetidentidad: {
        type: DataTypes.STRING(15),
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING(200),
        allowNull: true,
        validate: { isEmail: true },
    },
    telefono: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    celular: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    fax: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    fechareg: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    estado: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: "Activo",
    },
    numero: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    direccion: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    paginaweb: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    tipodoc: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    complemento: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
}, {
    tableName: "persona",
    timestamps: false,
});

module.exports = Person;
