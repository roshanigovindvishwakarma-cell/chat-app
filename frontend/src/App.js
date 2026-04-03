<<<<<<< HEAD
=======
//update
>>>>>>> f38bf6d3eea8158fc46f9bddc0ea6baadf5eb91a
import React from "react";
import axios from "axios";
import { io } from "socket.io-client";

const API = "https://chat-backend-uufb.onrender.com";

const socket = io(API);

function App() {

  const register = async () => {
    try {
      await axios.post(API + "/register", {
        username: "test",
        email: "test@test.com",
        password: "123456"
      });
      alert("Register success");
    } catch (e) {
      alert("Register failed");
      console.log(e);
    }
  };

  const login = async () => {
    try {
      await axios.post(API + "/login", {
        email: "test@test.com",
        password: "123456"
      });
      alert("Login success");
    } catch (e) {
      alert("Login failed");
      console.log(e);
    }
  };

  return (
    <div>
      <h2>Chat App</h2>
      <button onClick={register}>Register</button>
      <button onClick={login}>Login</button>
    </div>
  );
}

export default App;
