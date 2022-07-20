const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const cookieParser = require("cookie-parser")
const cors = require("cors");
const corsOptions = require('./config/corsOptions');
const credentials = require('./middleware/credentials.js');
const path = require("path");
const connectDB = require('./config/dbConnection');
const PORT = process.env.PORT || 8800;
dotenv.config();


// connect to DB
connectDB();
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));


// middleware logger

// handle options credentials check - before CORS
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// build-in middleware to handle urlencoded from data
app.use(express.urlencoded({ extends: true }));

// change req to json
app.use(express.json());

// 
// app.use(helmet());

//
// app.use(morgan("common"));

//
app.use(cookieParser());

// serve static files
app.use("/", express.static(path.join(__dirname, "/public")));


// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/images");
//   },
//   filename: (req, file, cb) => {
//     cb(null, req.body.name);
//   },
// });

// const upload = multer({ storage: storage });
// app.post("/api/upload", upload.single("file"), (req, res) => {
//   try {
//     return res.status(200).json("File uploded successfully");
//   } catch (error) {
//     console.error(error);
//   }
// });

// routes
app.use("/", require("./routes/root"));
app.use("/auth", require("./routes/auth"));
app.use("/chatroom", require("./routes/chatRoom"));
app.use("/users", require("./routes/users"))
app.use("/friends", require("./routes/friends"))



db.once("open", function () {
  console.log('connected to MongoDB');
  app.listen(PORT, () => {
    console.log("Backend server is running!");
  });
});