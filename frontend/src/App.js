import { useState } from "react";

function App() {
  const [user, setUser] = useState("");
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    const res = await fetch("https://chat-backend-v1-8yxc.onrender.com/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user, message }),
    });

    const data = await res.json();

    setChat([...chat, data]);
    setMessage("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Chat App</h2>

      <input
        placeholder="Your name"
        value={user}
        onChange={(e) => setUser(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button onClick={sendMessage}>Send</button>

      <div>
        {chat.map((c, i) => (
          <p key={i}>
            <b>{c.user}:</b> {c.message}
          </p>
        ))}
      </div>
    </div>
  );
}

export default App;