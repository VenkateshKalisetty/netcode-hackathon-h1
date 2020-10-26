const express = require("express");
const path = require("path");
const jwt = require("jsonwebtoken");
const userRouter = require("./routes/user");
const chatRoomRouter = require("./routes/chat_room");
const msgRouter = require("./routes/message");
const cors = require("cors");
const { generateToken } = require("./controllers/auth");
const { PORT, JWT_SECRET_TOKEN } = require("./config");
const { saveMessage } = require("./controllers/message");
const user = require("./controllers/user");
require("./db/connection");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "./frontend/dist/wd-m1-ui/")));

app.use("/api/auth", generateToken);
app.use("/api/user", userRouter);
app.use("/api/chat-room", chatRoomRouter);
app.use("/api/message", msgRouter);
app.use("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "./frontend/dist/wd-m1-ui/index.html"));
});

const http = require('http').createServer(app);
const io = require('socket.io')(http);

io.use((socket, next) => {
    if (socket.handshake.query && socket.handshake.query.token) {
        jwt.verify(socket.handshake.query.token, JWT_SECRET_TOKEN, (err, decoded) => {
            if (err) return next(new Error('Authentication error'));
            socket.user = decoded;
            next();
        });
    }
    else {
        next(new Error('Authentication error'));
    }
})
    .on('connection', (socket) => {
    console.log("a user connected.");
    socket.on('disconnect', () => {
        console.log("a user disconnected.");
    })
    socket.on('newMessage', async (msg) => {
        const newMsg = await saveMessage(msg, socket.user)
        io.to(`room_${msg.chatRoomId}`).emit('message', newMsg);
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
