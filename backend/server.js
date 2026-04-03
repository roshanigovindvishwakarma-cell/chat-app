const express = require("express");
const cors = require("cors");

const app = express();

// ✅ Allow all origins (Vercel frontend can connect)
app.use(cors());
app.use(express.json());

// ✅ Temporary storage
let messages = [];

// ✅ Root route (IMPORTANT for testing)
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// ✅ Send message
app.post("/api/messages", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Message is empty" });
  }

  const newMessage = {
    text,
    time: new Date()
  };

  messages.push(newMessage);

  res.json(newMessage);
});

// ✅ Get all messages
app.get("/api/messages", (req, res) => {
  res.json(messages);
});

// ✅ Port (Render will use this)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});