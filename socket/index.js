const io = require("socket.io")(8900, {
    cors: {
        origin: "http://localhost:3000"
    }
});

let users = [];

const addUser = (userId, socketId) => {
    const findUser = users.find((user) => user.userId === userId)
    console.log(`index.js:12 ${findUser}`);
    if(findUser) {
        findUser.socketId = socketId;
    } else {
        users.push({ userId, socketId});
    }
    console.log(users);
}

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId)
}

const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
}

io.on("connection", (socket) => {
    // when connect
    console.log(`index.js:30 - a user connected. users: ${users}`);
    // take userId and socketId from user
    socket.on("addUser", (userId) => {
        console.log(`index.js:34 - userId:${userId} , socketId:${socket.id}`);
        addUser(userId, socket.id);
        io.emit("getUsers", users);
    });

    // send and get message
    socket.on("sendMessage", ({senderId, receiverId, text}) => {
        console.log("r:"+receiverId);
        console.log("s:"+senderId);
        const receiver = getUser(receiverId);
        console.log(receiver);
        console.log(users);
        io.to(receiver.socketId).emit("getMessage", {
            senderId,
            text,
        });
    });

    // when disconnect
    socket.on("disconnect", () => {
        console.log("a user disconnected");
        removeUser(socket.id);
    });
})