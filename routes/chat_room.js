const router = require("express").Router();
const { authenticateRequest } = require("../controllers/auth");
const chatRoomCntlr = require("../controllers/chat_room");

router.post("/", authenticateRequest, chatRoomCntlr.addChatRoom);

module.exports = router;