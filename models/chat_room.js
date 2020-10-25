const { DataTypes, Sequelize } = require("sequelize");
const { DB_DIALECT, DB_STORAGE_PATH } = require("../config");

const sequelize = new Sequelize({
    dialect: DB_DIALECT,
    storage: DB_STORAGE_PATH,
});

const ChatRoom = sequelize.define(
    "ChatRooms",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        owner_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: "chat_room",
        modelName: "ChatRooms",
    }
);

module.exports = ChatRoom;
