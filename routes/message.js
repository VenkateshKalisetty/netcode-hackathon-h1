const { authenticateRequest } = require("../controllers/auth");
const router = require("express").Router();
const msgCntlr = require("../controllers/message");

router.post("/", authenticateRequest, msgCntlr.addMessage);
router.get("/:chatRoomId", authenticateRequest, msgCntlr.getMessages);

module.exports = router;
