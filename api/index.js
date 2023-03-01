const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");




const credentials = require('./middleware/credentials.js');
const verifyJWT = require('./middleware/verifyJWT.js');
const corsOptions = require('./config/corsOptions');
const connectDB = require('./config/dbConnection');
const PORT = process.env.PORT || 8800;
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
  }
});

const { addUser, removeUser, getUser, getUsers } = require("./controllers/socket");

// Run when client connects
io.on("connection", (socket) => {
  console.log("a new user connected.");

  socket.on("join", (user) => {
    socket.join(user.chatRoomId);
    addUser(user.userId, user.chatRoomId, socket.id)
    console.log(getUsers());
    console.log(`${user.userId} join the room ${user.chatRoomId}`);
  })

  socket.on("leave", (userId) => {
    const user = getUser(userId);
    if (user) {
      socket.leave(user.chatRoomId);
      removeUser(userId);
      console.log(getUsers());
      console.log(`${user.userId} leave the room ${user.chatRoomId}`);
    }
  })

  socket.on("sendMessage", (message) => {
    socket.broadcast.to(message.chatRoomId).emit("getMessage", message);
    console.log(message)
  })


  socket.on("disconnect", () => {
    console.log("a user had left.");
    removeUser(socket.id);
    io.emit("getUsers", getUsers());
  })
})


// connect to DB
connectDB();
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));



// handle options credentials check - before CORS
app.use(credentials);
app.use(verifyJWT);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// change req to json
app.use(express.json());

app.use(cookieParser());

// serve static files
app.use("/", express.static(path.join(__dirname, "/public")));


// routes
app.use("/", require("./routes/root"));
app.use("/auth", require("./routes/auth"));
app.use("/chatroom", require("./routes/chatRoom"));
app.use("/user", require("./routes/user"));


db.once("open", function () {
  console.log('connected to MongoDB');
  server.listen(PORT, () => {
    console.log(`Backend server is running on port ${PORT}!`);
  });
});