const { Sequelize } = require("sequelize");
const { SEQUELIZE_OPTIONS } = require("../config");
require("../models/user");
require("../models/chat_room");
require("../models/message");

const sequelize = new Sequelize(SEQUELIZE_OPTIONS);

return sequelize
    .authenticate()
    .then(async (result) => {
        await sequelize.sync();
        console.log("Db Initialized!");
    })
    .catch((error) => {
        console.error("Unable to connect to SQLite database:", error);
    });
