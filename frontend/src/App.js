import React, { useState } from "react";

function App() {
  const [user, setUser] = useState("");
  const [inputUser, setInputUser] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const BACKEND_URL = "https://chat-backend-v1-8yxc.onrender.com";

  // LOGIN / REGISTER
  const handleLogin = () => {
    if (!inputUser) return alert("Enter username");
    setUser(inputUser);
  };

  // SEND MESSAGE
  const sendMessage = async () => {
    if (!message) return;

    const res = await fetch(`${BACKEND_URL}/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: user,
        message: message,
      }),
    });

    const data = await res.json();

    if (data.success) {
      setMessages([...messages, { user, message }]);
      setMessage("");
    } else {
      alert("Error sending message");
    }
  };

  // UI
  if (!user) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h2>Login / Register</h2>
        <input
          placeholder="Enter username"
          value={inputUser}
          onChange={(e) => setInputUser(e.target.value)}
        />
        <br /><br />
        <button onClick={handleLogin}>Enter Chat</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "500px", margin: "auto", marginTop: "50px" }}>
      <h2>Welcome {user} 🟢 Online</h2>

      <div style={{ border: "1px solid gray", height: "300px", overflowY: "scroll", padding: "10px" }}>
        {messages.map((msg, index) => (
          <div key={index}>
            <b>{msg.user}:</b> {msg.message}
          </div>
        ))}
      </div>

      <br />

      <input
        placeholder="Type message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ width: "70%" }}
      />

      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;