const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5002;

// MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/chat-app")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// User Model
const User = mongoose.model("User", {
  name: String,
  email: String,
  password: String,
});

// Register
app.post("/api/auth/register", async (req, res) => {
  const { name, email, password } = req.body;

  const existing = await User.findOne({ email });
  if (existing) return res.json({ message: "User already exists" });

  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashed });
  await user.save();

  res.json({ message: "User registered successfully" });
});

// Login
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.json({ message: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.json({ message: "Wrong password" });

  const token = jwt.sign({ id: user._id }, "secretkey");

  res.json({ message: "Login successful", token });
});

// Socket.IO
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: { origin: "*" },
});

let users = [];

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("join", (name) => {
    users.push(name);
    io.emit("onlineUsers", users);
  });

  socket.on("sendMessage", (data) => {
    io.emit("receiveMessage", data);
  });

  socket.on("disconnect", () => {
    users.pop();
    io.emit("onlineUsers", users);
  });
});

http.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});