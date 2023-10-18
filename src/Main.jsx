import React from "react";
import "./Main.css";
import logoImage from "./setu_x.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Main = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Sign in the user with Firebase Authentication
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard"); // Redirect to the dashboard after successful login
    } catch (error) {
      // Handle login error
      alert("Invalid Credentials!");
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="column">
      <div className="left-div">
        <h1>
          Welcome to <br />
          Setu_X!
        </h1>
        <div className="content1">
          <img src={logoImage} alt="Logo" className="logo" />
        </div>
      </div>
      <div className="right-div">
        <div className="content2">
          <h1>
            {" "}
            Login to your <br />
            account.
          </h1>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email Address"
              className="input-field"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="input-field"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button className="create-account-button" type="submit">
              Login
            </button>
          </form>
          <p className="login-text">
            Don't have an account?
            <br />{" "}
            <Link to="/registration" className="login-link">
              Create New
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
