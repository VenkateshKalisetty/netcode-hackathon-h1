const { Sequelize } = require("sequelize");
const { DB_DIALECT, DB_STORAGE_PATH } = require("../config");
const User = require("../models/user");

const sequelize = new Sequelize({
  dialect: DB_DIALECT,
  storage: DB_STORAGE_PATH
});

return sequelize
    .authenticate()
    .then((result) => {
        User.sync();
    })
    .then((result) => {})
    .catch((error) => {
        console.error("Unable to connect to SQLite database:", error);
    });
