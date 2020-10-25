const ChatRoom = require("../models/chat_room");
const Message = require("../models/message");

const { Response } = require("../utils");

const addChatRoom = async (req, res) => {
    try {
        const chatRoomBody = req.body;
        const chatRoom = {
            name: chatRoomBody.name,
            owner_id: req.user.id,
        };
        if (await !isChatRoomExists({ name: chatRoomBody.name })) {
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
        const chatRooms = (await ChatRoom.findAll({ order: [["name"]] })).map(
            (cr) => ({
                id: cr.id,
                name: cr.name,
                ownerId: cr.owner_id,
            })
        );
        Response.ok(res, chatRooms);
    } catch {
        Response.internalServerErr(res, {
            msg: "Failed to get Chat Rooms!",
        });
    }
};

const deleteChatRoom = async (req, res) => {
    try {
        const { id } = req.params;
        if (isChatRoomExists({ id })) {
            await Message.destroy({ where: { chat_room_id: id } });
            await ChatRoom.destroy({ where: { id } });
        }
    } catch (ex) {
        Response.internalServerErr(res, {
            msg: "Error occured while deleting Chat Room!",
        });
    }
};

const isChatRoomExists = async (chatRoom) => {
    const { name, id } = chatRoom;
    return (
        (await ChatRoom.findOne({
            where: { $or: [{ name }, { id }] },
        })) != null
    );
};

module.exports = { addChatRoom, getChatRooms, deleteChatRoom };
