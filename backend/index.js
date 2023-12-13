import express from "express";
import path from "path";
import { Server as SocketIOServer, Socket } from "socket.io";
import { chats } from "./data/dummyData.js";
import dotenv from "dotenv";
import { connectToDB } from "./config/connectToDB.js";
import userRoute from "./routes/userRoute.js";
import chatRoute from "./routes/chatRoute.js";
import messageRoute from "./routes/messageRoute.js";

// creating a server
const app = express();

// middlewares
app.use(express.json());
dotenv.config();

// connect to database
connectToDB();

app.get("/", (req, res) => {
  res.send("server running succesfully!!");
});

app.use("/api/user", userRoute);

app.use("/api/chat", chatRoute);

app.use("/api/message", messageRoute);

app.get("/api/chat/:id", (req, res) => {
  const chat = chats.find((chat) => chat._id === req.params.id);
  if (!chat) return res.status(404).send({ message: "Chat not found" });
  res.json(chat);
});

//------------------------DEPLOYMENT------------------------------

const __dirname1 = path.resolve();

//------------------------DEPLOYMENT------------------------------

const server = app.listen(5000, () => {
  console.log("Server is running on port : ", 5000);
});

const io = new SocketIOServer(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
  pingInterval: 60000,
});

io.on("connection", (socket) => {
  console.log("A user connected");

  // Handle chat events
  socket.on("setup", (userData) => {
    // Join the chat room
    socket.join(userData?._id);
    console.log(userData?._id);
    socket.emit("connected");
  });
  socket.on("join-chat", (room) => {
    socket.join(room);
    console.log(`A user joined chat: ${room}`);
  });
  socket.on("new-message", (newMessageRecieved) => {
    let chat = newMessageRecieved.chat;
    if (!chat.users) return console.log("Chat.users not defined");
    chat.users.forEach((user) => {
      if (user._id === newMessageRecieved.sender._id) return;
      socket.in(user._id).emit("message-received", newMessageRecieved);
    });
  });

  // Handle typing event
  socket.on("typing", (room) => {
    socket.in(room).emit("typing", room);
  });
  // Handle stop typing event
  socket.on("stop-typing", (room) => {
    socket.in(room).emit("stop-typing", room);
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Export the server and io instance
export { server, io };
