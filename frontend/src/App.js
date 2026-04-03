import { useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);

  const sendMessage = async () => {
    if (!message) return;

    try {
      const res = await fetch(
        "https://YOUR-BACKEND-URL.onrender.com/api/messages",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: message }),
        }
      );

      const data = await res.json();

      setAllMessages([...allMessages, data]);
      setMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Chat App</h2>

      <div style={{ border: "1px solid gray", height: "300px", padding: "10px" }}>
        {allMessages.map((msg, index) => (
          <div key={index}>{msg.text}</div>
        ))}
      </div>

      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type message..."
      />

      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;