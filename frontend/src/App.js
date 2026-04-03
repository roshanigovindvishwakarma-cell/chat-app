import { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";

// ✅ your backend URL
const API = "https://chat-app-1jdk.onrender.com";

// ✅ socket connection
const socket = io(API);

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [onlineUsers, setOnlineUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  // ✅ REGISTER
  const register = async () => {
    await axios.post(`${API}/register`, {
      email,
      password,
    });
    alert("Registered");
  };

  // ✅ LOGIN
  const login = async () => {
    const res = await axios.post(`${API}/login`, {
      email,
      password,
    });

    if (res.data.message === "Success") {
      setIsLoggedIn(true);
      socket.emit("join", email);
    } else {
      alert("Login failed");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setChat((prev) => [...prev, data]);
    });

    socket.on("online_users", (users) => {
      setOnlineUsers(users);
    });
  }, []);

  const sendMessage = () => {
    socket.emit("send_message", {
      user: email,
      text: message,
    });
    setMessage("");
  };

  if (!isLoggedIn) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Login / Register</h2>

        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <br /><br />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br /><br />

        <button onClick={register}>Register</button>
        <button onClick={login}>Login</button>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ width: "25%", borderRight: "1px solid black", padding: "10px" }}>
        <h3>Online Users</h3>
        {onlineUsers.map((u, i) => (
          <p key={i}>🟢 {u}</p>
        ))}
      </div>

      <div style={{ width: "75%", padding: "20px" }}>
        <h2>Public Chat</h2>

        <div style={{ height: "300px", border: "1px solid black", overflow: "auto" }}>
          {chat.map((c, i) => (
            <p key={i}>
              <b>{c.user}:</b> {c.text}
            </p>
          ))}
        </div>

        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;