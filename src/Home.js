import React, { useEffect, useState } from "react";
import axios from "axios";
import { auth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Fetch user info
        const res = await axios.get("http://localhost:3500/home", { withCredentials: true });
        setUser(res.data); // Set the user info when the response is successful
      } catch {
        navigate("/login"); // Redirect to login if authentication fails
      }
    };
    fetchUser();
  }, [navigate]);

  // Logout function
  const handleLogout = async () => {
    try {
      // Send POST request to logout route to clear the token in cookies
      await auth.signOut();
      await axios.post("http://localhost:3500/logout", {}, { withCredentials: true });
      navigate("/login"); // Redirect to login page after logging out
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div>
      <h1>Home Page</h1>
      {user ? (
        <>
          <p>Welcome, {user.email}!</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Home;
