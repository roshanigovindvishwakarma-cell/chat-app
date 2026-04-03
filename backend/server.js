const express = require("express");
const cors = require("cors");

const app = express();

// ✅ Allow frontend (Vercel) to connect
app.use(cors({
  origin: "*"
}));

app.use(express.json());

// ✅ Temporary storage (for demo)
let messages = [];

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

// ✅ Test route (VERY IMPORTANT)
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});