const sendMessage = async () => {
  alert("clicked");  // check button working

  fetch("https://chat-backend-v1-8yxc.onrender.com/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: user,
      message: message,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      alert("Message sent"); // check backend working

      setChat([...chat, data]);
      setMessage("");
    })
    .catch(() => {
      alert("Error sending message");
    });
};