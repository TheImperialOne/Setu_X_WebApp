import React, { useState } from "react";
import "./Registration.css";
import logoImage from "./setu_x.png";
import { useNavigate } from "react-router-dom";
import { auth } from "./Firebase";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";

const Registration = () => {
  const [hospitalName, setHospitalName] = useState("");
  const [registrationNo, setRegistrationNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      if (password !== retypePassword) {
        alert("Passwords do not match.");
        return;
      }

      // Create the user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      // Registration successful, userCredential.user contains user info
      console.log("User registered:", user);

      // Create a user record in Firestore
      const userId = user.uid;
      const db = getFirestore();
      const userRef = doc(db, "users", userId);
      const userData = {
        hospitalName,
        registrationNo,
        email,
        password,
      };
      await setDoc(userRef, userData);
      alert("Accout Created! ");
      navigate("/Main");
    } catch (error) {
      // Handle registration error
      console.error("Error creating user:", error);
    }
  };

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

      <div className="right-div2">
        <div className="registration-container">
          <div className="registration-content">
            <h1>Create Account</h1>
            <form onSubmit={handleRegister}>
              <div className="input-group">
                <label htmlFor="registrationNo">Registration Number</label>
                <input
                  type="text"
                  id="registrationNo"
                  name="registrationNo"
                  value={registrationNo}
                  onChange={(e) => setRegistrationNo(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="hospitalName">Hospital Name</label>
                <input
                  type="text"
                  id="hospitalName"
                  name="hospitalName"
                  value={hospitalName}
                  onChange={(e) => setHospitalName(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="retypePassword">Confirm Password</label>
                <input
                  type="password"
                  id="retypePassword"
                  name="retypePassword"
                  value={retypePassword}
                  onChange={(e) => setRetypePassword(e.target.value)}
                  required
                />
              </div>
              <button className="create-account-button" type="submit">
                Create Account
              </button>
              <p className="login-link">
                Already have an account? <Link to="/Main">Login</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
