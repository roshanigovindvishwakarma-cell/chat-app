const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

// ✅ SOCKET SETUP
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

let users = [];

// ✅ SOCKET CONNECTION
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join", (username) => {
    users.push({ id: socket.id, username });
    io.emit("online-users", users);
  });

  socket.on("send-message", (data) => {
    io.emit("receive-message", data);
  });

  socket.on("disconnect", () => {
    users = users.filter((u) => u.id !== socket.id);
    io.emit("online-users", users);
  });
});

// test route
app.get("/", (req, res) => {
  res.send("Backend running");
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log("Server running on port", PORT));