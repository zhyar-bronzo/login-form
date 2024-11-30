import React, { useState } from "react";
import { auth } from "./firebase-config"; // Ensure Firebase is properly configured
import { signInWithEmailAndPassword } from "firebase/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Sign in with Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken(); // Get Firebase ID token

      // Send the ID token to the backend for further verification
      const response = await axios.post("http://localhost:3500/login", {}, {
        headers: {
          Authorization: `Bearer ${idToken}`, // Send ID token to verify the user
        },
        withCredentials: true, // Allow cookies to be set
      });

      // Redirect to home page if login is successful
      if (response.status === 200) {
        console.log("Login successful");
        navigate("/Home");
      }
    } catch (err) {
      setError("Login failed: " + (err.response?.data || err.message));
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
