const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(cors());
app.use(express.json());

let users = [];
let onlineUsers = [];

// REGISTER
app.post("/register", (req, res) => {
  users.push(req.body);
  res.json({ message: "Registered" });
});

// LOGIN
app.post("/login", (req, res) => {
  const user = users.find(
    (u) => u.email === req.body.email && u.password === req.body.password
  );

  if (user) res.json({ message: "Success" });
  else res.json({ message: "Fail" });
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  let currentUser = "";

  socket.on("join", (email) => {
    currentUser = email;
    onlineUsers.push(email);
    onlineUsers = [...new Set(onlineUsers)];
    io.emit("online_users", onlineUsers);
  });

  socket.on("send_message", (data) => {
    io.emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((u) => u !== currentUser);
    io.emit("online_users", onlineUsers);
  });
});

// ✅ PORT 5001
server.listen(5001, () => {
  console.log("Server running on port 5001");
});