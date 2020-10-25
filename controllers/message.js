const Message = require("../models/message");
const ChatRoom = require("../models/chat_room");
const { Response } = require("../utils");

const addMessage = async (req, res) => {
    try {
        const msgBody = req.body;
        const msg = {
            msg: msgBody.msg,
            sent_by: req.user.id,
            chat_room_id: msgBody.chatRoomId,
        };
        if (!isChatRoomExists)
            return Response.badRequest(res, { msg: "Chat Room not found!" });
        await Message.create(msg);
        Response.created(res);
    } catch (ex) {
        Response.internalServerErr(res, {
            msg: "Error occured while sending message!",
            data: ex.message,
        });
    }
};

const isChatRoomExists = async (userId) => {
    return (await ChatRoom.findOne({ where: { id: userId } })) != null;
};

module.exports = { addMessage };
