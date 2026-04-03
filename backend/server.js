const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

// chat
let messages = [];

app.post("/send", (req, res) => {
  const { user, text } = req.body;

  if (!user || !text) {
    return res.status(400).json({ error: "Missing data" });
  }

  messages.push({ user, text });
  res.json({ success: true });
});

app.get("/messages", (req, res) => {
  res.json(messages);
});

// IMPORTANT
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});