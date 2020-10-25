const { DataTypes, Sequelize } = require("sequelize");
const { SEQUELIZE_OPTIONS } = require("../config");

const sequelize = new Sequelize(SEQUELIZE_OPTIONS);

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
            references: {
                model: "user",
                key: "id",
            },
        },
        chat_room_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "chat_room",
                key: "id",
            },
        },
    },
    {
        tableName: "message",
        modelName: "Messages",
        timestamps: false,
    }
);

module.exports = Message;
