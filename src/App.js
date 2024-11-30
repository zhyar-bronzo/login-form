import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Signup";
import VerifyEmail from "./VerifyEmail";
import Login from "./Login";
import Home from "./Home";

const App = () => (
  <Router>
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/verifyemail" element={<VerifyEmail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  </Router>
);

export default App;
