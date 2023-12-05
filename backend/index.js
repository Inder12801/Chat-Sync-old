import express from "express";
import { chats } from "./data/dummyData.js";
import dotenv from "dotenv";
import { connectToDB } from "./config/connectToDB.js";
import userRoute from "./routes/userRoute.js";
import chatRoute from "./routes/chatRoute.js";

// creating a server
const app = express();

// middlewares
app.use(express.json());
dotenv.config();

// connect o database
connectToDB();

app.use("/api/user", userRoute);

app.use("/api/chat", chatRoute);

app.get("/api/chat/:id", (req, res) => {
  const chat = chats.find((chat) => chat._id === req.params.id);
  if (!chat) return res.status(404).send({ message: "Chat not found" });
  res.json(chat);
});

const port = 5000;
app.listen(port, () => {
  console.log("Server is running on port : ", port);
});
