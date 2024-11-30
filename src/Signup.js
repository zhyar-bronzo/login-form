import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const res = await axios.post("http://localhost:3500/signup", { username, email, password });
      if (res.status === 201) {
        // On successful signup, pass email to the VerifyEmail page
        navigate("/verifyemail", { state: { email } });
      }
    } catch (err) {
      console.error("Signup error:", err);
    }
  };

  return (
    <div>
      <h1>Signup</h1>
      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
};

export default Signup;
