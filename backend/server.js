const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let messages = [];

// ✅ root test
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// ✅ send message
app.post("/api/messages", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Empty message" });
  }

  const msg = { text };
  messages.push(msg);

  res.json(msg);
});

// ✅ get messages
app.get("/api/messages", (req, res) => {
  res.json(messages);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running...");
});