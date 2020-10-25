const { DataTypes, Sequelize } = require("sequelize");
const { SEQUELIZE_OPTIONS } = require("../config");

const sequelize = new Sequelize(SEQUELIZE_OPTIONS);

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
            unique: true,
        },
        owner_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "user",
                key: "id",
            },
        },
    },
    {
        tableName: "chat_room",
        modelName: "ChatRooms",
        timestamps: false,
    }
);

module.exports = ChatRoom;
