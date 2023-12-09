import expressAsyncHandler from "express-async-handler";
import { Message } from "../models/messageModel.js";
import User from "../models/userModel.js";
import Chat from "../models/chatModel.js";

// send message
export const sendMessage = expressAsyncHandler(async (req, res) => {
  const { chatId, content } = req.body;
  if (!chatId || !content) {
    return res.status(400).json({ msg: "Please provide all fields" });
  }
  try {
    let newMessage = {
      sender: req.user._id,
      content: content,
      chat: chatId,
    };
    let message = await Message.create(newMessage);
    message = await message.populate("sender", "name pic");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });
    await Chat.findByIdAndUpdate(chatId, {
      latestMessage: message,
    });
    res.status(201).json(message);
  } catch (error) {
    console.log(error);
  }
});
export const allMessages = expressAsyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");
    res.json(messages);
  } catch (error) {
    throw new Error(error.message);
  }
});
