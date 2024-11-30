import React from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const VerifyEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [message, setMessage] = React.useState("");

  // Get the email passed from the signup page
  const email = location.state?.email;

  const handleVerify = async () => {
    if (!email) {
      setMessage("No email provided.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3500/verifyemail", { email });

      if (res.status === 200) {
        // Successfully verified, navigate to login page
        navigate("/login");
      } else if (res.status === 201) {
        // Not verified yet, stay on the same page
        setMessage("Email not verified yet, please check your email.");
      }
    } catch (err) {
      setMessage(err.response?.data || "Verification failed.");
    }
  };

  return (
    <div>
      <h1>Verify Email</h1>
      <p>Click the button to verify your email after confirming the email link.</p>
      <button onClick={handleVerify}>Verify</button>
      {message && <p style={{ color: "red" }}>{message}</p>}
    </div>
  );
};

export default VerifyEmail;
