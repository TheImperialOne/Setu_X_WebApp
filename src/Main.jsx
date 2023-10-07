import React from "react";
import "./Main.css";
import logoImage from "./setu_x.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

const Main = () => {
  return (
    <div className="column">
      <div className="left-div">
        <h1>
          Welcome to <br />
          Setu_X!
        </h1>
        <div className="content2">
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
          <input
            type="email"
            placeholder="Email Address"
            className="input-field"
          />
          <input
            type="password"
            placeholder="Password"
            className="input-field"
          />
          <Link to="/login">
            <button className="create-account-button">Login</button>
          </Link>
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
