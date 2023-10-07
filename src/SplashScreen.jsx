import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory
import "./SplashScreen.css";
import logo from "./setu_x.png";
function SplashScreen() {
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  // Simulate a delay (e.g., 3 seconds) before navigating to the main page
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/Main"); // Navigate to the main page
    }, 5000); // Adjust the delay as needed
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="container-fluid splash-screen">
      <div className="row">
        <div className="col-12 text-center">
          <img src={logo} alt="Logo" className="logo" />
          <center>
            <p className="splash-text">Welcome!</p>
          </center>
        </div>
      </div>
    </div>
  );
}

export default SplashScreen;
