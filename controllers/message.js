const Message = require("../models/message");
const ChatRoom = require("../models/chat_room");
const { Response } = require("../utils");

const saveMessage = async (msgBody, user) => {
    try {
        const msg = {
            msg: msgBody.msg,
            sent_by: user.id,
            chat_room_id: msgBody.chatRoomId,
        };
        const newMsg = await Message.create(msg);
        const savedMsg = {
            msg: newMsg.dataValues.msg,
            sentBy: newMsg.dataValues.sent_by,
            chatRoomId: newMsg.dataValues.chat_room_id,
        };
        return savedMsg;
    } catch (ex) {
        Response.internalServerErr(res, {
            msg: "Error occured while sending message!",
            data: ex.message,
        });
    }
};

const addMessage = async (req, res) => {
    try {
        const msgBody = req.body;
        const msg = {
            msg: msgBody.msg,
            sent_by: req.user.id,
            chat_room_id: msgBody.chatRoomId,
        };
        if (!isChatRoomExists(msg.chat_room_id))
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

const getMessages = async (req, res) => {
    try {
        const { chatRoomId } = req.params;
        if (isChatRoomExists(chatRoomId)) {
            const messages = (
                await Message.findAll({ where: { chat_room_id: chatRoomId } })
            ).map((m) => ({
                id: m.id,
                msg: m.msg,
                sentBy: m.sent_by,
            }));
            Response.ok(res, messages);
        } else {
            Response.badRequest(res, {
                msg: "Chat Room not found!",
            });
        }
    } catch (ex) {
        Response.internalServerErr(res, {
            msg: "Failed to get messages!",
            data: ex.message,
        });
    }
};

const isChatRoomExists = async (chatRoomId) => {
    return (await ChatRoom.findOne({ where: { id: chatRoomId } })) != null;
};

module.exports = { addMessage, getMessages, saveMessage };
