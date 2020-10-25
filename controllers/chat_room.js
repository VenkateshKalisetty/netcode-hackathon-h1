const ChatRoom = require("../models/chat_room");
const { Response } = require("../utils");

const addChatRoom = async (req, res) => {
    try {
        const chatRoomBody = req.body;
        const chatRoom = {
            name: chatRoomBody.name,
            owner_id: req.user.id,
        };
        if (await isNewChatRoomName(chatRoom.name)) {
            const { dataValues } = await ChatRoom.create(chatRoom, {});
            Response.created(res, {
                id: dataValues.id,
                name: dataValues.name,
                ownerId: dataValues.owner_id,
            });
        } else {
            Response.badRequest(res, {
                msg: "Chat Room name already existed!",
            });
        }
    } catch (ex) {
        Response.internalServerErr(res, {
            msg: "Error occured while adding Chat Room!",
        });
    }
};

const getChatRooms = async (req, res) => {
    try {
        Response.ok(res, await ChatRoom.findAll());
    } catch {
        Response.internalServerErr(res, {
            msg: "Error occured while adding Chat Room!",
        });
    }
};

const isNewChatRoomName = async (chatRoomName) => {
    return (await ChatRoom.findOne({ where: { name: chatRoomName } })) == null;
};

module.exports = { addChatRoom, getChatRooms };
