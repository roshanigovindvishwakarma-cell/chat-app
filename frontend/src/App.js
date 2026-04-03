import React, { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:5002");

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const register = async () => {
    const res = await axios.post("http://localhost:5001/api/auth/register", {
      name,
      email,
      password,
    });
    setMsg(res.data.message);
  };

  const login = async () => {
    const res = await axios.post("http://localhost:5001/api/auth/login", {
      email,
      password,
    });

    localStorage.setItem("token", res.data.token);
    setIsLoggedIn(true);
    setMsg(res.data.message);

    socket.emit("join", email);
  };

  const sendMessage = () => {
    if (!message.trim()) return;

    socket.emit("sendMessage", {
      senderId: name,
      message,
    });

    setMessage("");
  };

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    socket.on("onlineUsers", (users) => {
      setOnlineUsers(users);
    });
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px", fontFamily: "Arial" }}>
      <h2>Real-Time Chat Application</h2>
      <p>Online Users: {onlineUsers.length}</p>

      {!isLoggedIn ? (
        <>
          <input placeholder="Name" onChange={(e) => setName(e.target.value)} /><br />
          <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} /><br />
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} /><br />

          <button onClick={register}>Register</button>
          <button onClick={login}>Login</button>

          <p>{msg}</p>
        </>
      ) : (
        <>
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type message"
          />
          <button onClick={sendMessage}>Send</button>

          <div style={{ marginTop: "20px" }}>
            {messages.map((m, i) => (
              <p key={i}>
                <b>{m.senderId}:</b> {m.message}
              </p>
            ))}
          </div>

          <button onClick={() => {
            localStorage.removeItem("token");
            setIsLoggedIn(false);
          }}>
            Logout
          </button>
        </>
      )}
    </div>
  );
}

export default App;