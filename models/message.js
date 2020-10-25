const { DataTypes, Sequelize } = require("sequelize");
const { DB_DIALECT, DB_STORAGE_PATH } = require("../config");

const sequelize = new Sequelize({
    dialect: DB_DIALECT,
    storage: DB_STORAGE_PATH,
});

const Message = sequelize.define(
    "Messages",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        msg: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        sent_by: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        chat_room_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: "message",
        modelName: "Messages",
    }
);

module.exports = Message;
