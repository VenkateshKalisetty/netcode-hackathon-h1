const express = require("express");
const path = require("path");
const userRouter = require("./routes/user");
const chatRoomRouter = require("./routes/chat_room");
const msgRouter = require("./routes/message");
const cors = require("cors");
const { generateToken } = require("./controllers/auth");
const { PORT } = require("./config");
const { saveMessage } = require("./controllers/message");
require("./db/connection");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "./front-end/dist/wd-h1-ui/")));

app.use("/api/auth", generateToken);
app.use("/api/user", userRouter);
app.use("/api/chat-room", chatRoomRouter);
app.use("/api/message", msgRouter);
app.use("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "./front-end/dist/wd-h1-ui/index.html"));
});

const http = require('http').createServer(app);
const io = require('socket.io')(http);

io.on('connection', (socket) => {
    console.log("a user connected.");
    socket.on('disconnect', () => {
        console.log("a user disconnected.");
    })
    socket.on('newMessage', async (msg) => {
        await saveMessage(msg)
        io.to(`room_${msg.chatRoomId}`).emit('message', msg);
    })

    socket.on('join', (roomId) => {
        socket.join(`room_${roomId}`, () => {
            io.to(`room_${roomId}`).emit(`roomid emitted`);
        })
    })

})

http.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
