const User = require('../models/user');
const { Response } = require("../utils");


const addUser = async (req, res) => {
    try {
        const userBody = req.body;
        const user = {
            name: userBody.userName,
            password: userBody.password
        };
        if (await isNewUserName(user.name)) {
            await User.create(user);
            Response.created(res);
        } else {
            Response.badRequest(res, {
                msg: "User name already exists!"
            });
        }
    } catch(ex) {
        Response.internalServerErr(res, {
            msg: "Error occured while adding user!"
        });
    }
}

const isNewUserName = async (userName) => {
    return (await User.findOne({ where: { name: userName }})) == null;
}

module.exports = { addUser }
