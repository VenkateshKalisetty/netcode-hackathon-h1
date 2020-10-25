const path = require('path');

const JWT_SECRET_TOKEN = '2kl3h5j209foslk3209sudlkr23kjth08uoisjlekhr2ooisuodf8shl2ig8owhs';
const JWT_TOKEN_EXPIRE_TIME = 60 * 60; // In Seconds.
const PORT = 12345;
const DB_DIALECT = 'sqlite';
const DB_STORAGE_PATH = path.join(__dirname, 'db/chat.db');

module.exports = {
    JWT_SECRET_TOKEN,
    JWT_TOKEN_EXPIRE_TIME,
    PORT,
    DB_DIALECT,
    DB_STORAGE_PATH
}