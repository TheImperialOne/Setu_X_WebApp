import React, { useState } from "react";
import "./Registration.css";
import logoImage from "./setu_x.png";
import { useNavigate } from "react-router-dom";
import { auth } from "./Firebase";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";

const Registration = () => {
  const [HospitalName, setHospitalName] = useState("");
  const [Registration, setRegistrationNo] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [RetypePassword, setRetypePassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      if (Password !== RetypePassword) {
        alert("Passwords do not match.");
        return;
      }

      // Create the user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        Email,
        Password
      );

      const user = userCredential.user;

      // Registration successful, userCredential.user contains user info
      console.log("User registered:", user);

      // Create a user record in Firestore
      const userId = user.uid;
      const db = getFirestore();
      const userRef = doc(db, "Hospitals", userId);
      const userData = {
        HospitalName: HospitalName,
        Registration: Registration,
        Email: Email,
        Password: Password,
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
                  type="number"
                  id="registrationNo"
                  name="Registration"
                  value={Registration}
                  onChange={(e) => setRegistrationNo(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="hospitalName">Hospital Name</label>
                <input
                  type="text"
                  id="hospitalName"
                  name="HospitalName"
                  value={HospitalName}
                  onChange={(e) => setHospitalName(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="Email"
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="Password"
                  value={Password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="retypePassword">Confirm Password</label>
                <input
                  type="password"
                  id="retypePassword"
                  name="RetypePassword"
                  value={RetypePassword}
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
