//update
import React from "react";
import axios from "axios";
import { io } from "socket.io-client";

const backendURL = "https://chat-backend-uufb.onrender.com";

// socket connection
const socket = io(backendURL);

function App() {

  const registerUser = async () => {
    try {
      await axios.post(`${backendURL}/register`, {
        username: "test",
        email: "test@test.com",
        password: "123456"
      });
      alert("Registered successfully");
    } catch (err) {
      console.log(err);
      alert("Register error");
    }
  };

  const loginUser = async () => {
    try {
      await axios.post(`${backendURL}/login`, {
        email: "test@test.com",
        password: "123456"
      });
      alert("Login successful");
    } catch (err) {
      console.log(err);
      alert("Login error");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Chat App</h2>

      <button onClick={registerUser}>Register</button>
      <br /><br />

      <button onClick={loginUser}>Login</button>
    </div>
  );
}

export default App;
