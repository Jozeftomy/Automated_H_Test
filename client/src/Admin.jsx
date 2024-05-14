import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";

function Admin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  function handleClick() {
    if (username === "admin" && password === "admin@123") {
      navigate("/test");
    } else {
      alert("Invalid username or password");
    }
  }

  return (
    <div className="form-container">
      <h2>Login</h2>
      <label>
        User id:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button onClick={handleClick}>Login</button>
    </div>
  );
}

export default Admin;
