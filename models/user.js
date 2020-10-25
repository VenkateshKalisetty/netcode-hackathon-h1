const { DataTypes, Sequelize } = require("sequelize");
const { SEQUELIZE_OPTIONS } = require("../config");

const sequelize = new Sequelize(SEQUELIZE_OPTIONS);

const User = sequelize.define(
    "Users",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(20),
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(25),
        },
    },
    {
        tableName: "user",
        modelName: "Users",
        timestamps: false,
    }
);

module.exports = User;
