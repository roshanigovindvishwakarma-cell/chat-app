import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("https://chat-backend-v1-8yxc.onrender.com");

function App() {
  const [name, setName] = useState("");
  const [user, setUser] = useState("");
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    socket.on("receive-message", (data) => {
      setChat((prev) => [...prev, data]);
    });

    socket.on("online-users", (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.off("receive-message");
      socket.off("online-users");
    };
  }, []);

  const join = () => {
    if (!name) return alert("Enter name");
    setUser(name);
    socket.emit("join", name);
  };

  const sendMessage = () => {
    if (!message) return;

    socket.emit("send-message", {
      user,
      message,
    });

    setMessage("");
  };

  // LOGIN
  if (!user) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h2>Login</h2>
        <input
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br /><br />
        <button onClick={join}>Enter Chat</button>
      </div>
    );
  }

  // CHAT UI
  return (
    <div style={{ display: "flex", padding: "20px" }}>
      
      {/* ONLINE USERS */}
      <div style={{ width: "200px", border: "1px solid gray", padding: "10px" }}>
        <h3>🟢 Online</h3>
        {onlineUsers.map((u, i) => (
          <p key={i}>{u.username}</p>
        ))}
      </div>

      {/* CHAT */}
      <div style={{ flex: 1, marginLeft: "20px" }}>
        <h2>Welcome {user}</h2>

        <div style={{ border: "1px solid gray", height: "300px", overflowY: "scroll", padding: "10px" }}>
          {chat.map((c, i) => (
            <p key={i}>
              <b>{c.user}:</b> {c.message}
            </p>
          ))}
        </div>

        <br />

        <input
          placeholder="Type message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;