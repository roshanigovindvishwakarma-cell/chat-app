import { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";

// ✅ CONNECT TO YOUR BACKEND
const socket = io("https://chat-app-1jdk.onrender.com");

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [onlineUsers, setOnlineUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  // ✅ REGISTER
  const register = async () => {
    try {
      await axios.post("https://chat-app-1jdk.onrender.com/register", {
        email,
        password,
      });
      alert("Registered Successfully");
    } catch (err) {
      alert("Error in Register");
    }
  };

  // ✅ LOGIN
  const login = async () => {
    try {
      const res = await axios.post(
        "https://chat-app-1jdk.onrender.com/login",
        {
          email,
          password,
        }
      );

      if (res.data.message === "Success") {
        setIsLoggedIn(true);
        socket.emit("join", email);
      } else {
        alert("Login Failed");
      }
    } catch (err) {
      alert("Server Error");
    }
  };

  // ✅ SOCKET LISTEN
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setChat((prev) => [...prev, data]);
    });

    socket.on("online_users", (users) => {
      setOnlineUsers(users);
    });
  }, []);

  // ✅ SEND MESSAGE
  const sendMessage = () => {
    if (message.trim() === "") return;

    socket.emit("send_message", {
      user: email,
      text: message,
    });

    setMessage("");
  };

  // 🔐 LOGIN PAGE
  if (!isLoggedIn) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Login / Register</h2>

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
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

  // 💬 CHAT UI
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* ONLINE USERS */}
      <div
        style={{
          width: "25%",
          borderRight: "1px solid black",
          padding: "10px",
        }}
      >
        <h3>Online Users</h3>
        {onlineUsers.map((u, i) => (
          <p key={i}>🟢 {u}</p>
        ))}
      </div>

      {/* CHAT */}
      <div style={{ width: "75%", padding: "20px" }}>
        <h2>Public Chat</h2>

        <div
          style={{
            height: "300px",
            border: "1px solid black",
            overflow: "auto",
            marginBottom: "10px",
          }}
        >
          {chat.map((c, i) => (
            <p key={i}>
              <b>{c.user}:</b> {c.text}
            </p>
          ))}
        </div>

        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;