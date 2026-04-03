import Message from "../models/Message.js";

// 🔥 SEND MESSAGE
export const sendMessage = async (req, res) => {
  try {
    const { receiver, message } = req.body;

    // ✅ validation
    if (!receiver || !message) {
      return res.status(400).json({
        message: "Receiver and message are required",
      });
    }

    // ✅ create message
    const newMessage = await Message.create({
      sender: req.user._id,   // from token
      receiver,
      message,
    });

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// 🔥 GET MESSAGES BETWEEN TWO USERS
export const getMessages = async (req, res) => {
  try {
    const { userId } = req.params;

    const messages = await Message.find({
      $or: [
        { sender: req.user._id, receiver: userId },
        { sender: userId, receiver: req.user._id },
      ],
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};