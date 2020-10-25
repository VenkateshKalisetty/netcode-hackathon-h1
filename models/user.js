const { DataTypes, Sequelize } = require("sequelize");
const { DB_DIALECT, DB_STORAGE_PATH } = require("../config");

const sequelize = new Sequelize({
    dialect: DB_DIALECT,
    storage: DB_STORAGE_PATH,
});

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
