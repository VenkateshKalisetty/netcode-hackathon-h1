const path = require("path");

const JWT_SECRET_TOKEN =
    "2kl3h5j209foslk3209sudlkr23kjth08uoisjlekhr2ooisuodf8shl2ig8owhs";
const JWT_TOKEN_EXPIRE_TIME = 60 * 60; // In Seconds.
const PORT = 12345;

const SEQUELIZE_OPTIONS = Object.freeze({
    dialect: "sqlite",
    storage: path.join(__dirname, "db/chat.db"),
    logging: false,
});

module.exports = {
    JWT_SECRET_TOKEN,
    JWT_TOKEN_EXPIRE_TIME,
    PORT,
    SEQUELIZE_OPTIONS,
};
