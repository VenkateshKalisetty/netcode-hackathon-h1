const { Sequelize } = require("sequelize");
const { SEQUELIZE_OPTIONS } = require("../config");
const User = require("../models/user");
const ChatRoom = require("../models/chat_room");
const Message = require("../models/message");

const sequelize = new Sequelize(SEQUELIZE_OPTIONS);

return sequelize
    .authenticate()
    .then(async (result) => {
        await User.sync();
        await ChatRoom.sync();
        await Message.sync();
        console.log("Db Initialized!");
    })
    .catch((error) => {
        console.error("Unable to connect to SQLite database:", error);
    });
