const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Person = sequelize.define("Person", {
    id: {
        type: DataTypes.STRING(20),
        allowNull: false,
        primaryKey: true,
        field: 'idpersona'
    },
    nit: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
    },
    fullname: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: 'nombres'
    },
    ci: {
        type: DataTypes.STRING(15),
        allowNull: false,
        unique: true,
        field: 'carnetidentidad'
    },
    email: {
        type: DataTypes.STRING(200),
        allowNull: true,
        validate: { isEmail: true },
    },
    phone: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'telefono'
    },
    cellphone: {
        type: DataTypes.STRING(20),
        allowNull: true,
        field: 'celular'
    },
    fax: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    registeredAt: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        field: 'fechareg'
    },
    status: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: "Activo",
        field: 'estado'
    },
    number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'numero'
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'direccion'
    },
    web: {
        type: DataTypes.STRING(100),
        allowNull: true,
        field: 'paginaweb'
    },
    docType: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'tipodoc'
    },
    complement: {
        type: DataTypes.STRING(20),
        allowNull: true,
        field: 'complemento'
    },
}, {
    tableName: "persona",
    timestamps: false,
});

module.exports = Person;
