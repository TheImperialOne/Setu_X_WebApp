import React, { useState, useEffect } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        // User is signed in.
        setUser(authUser);
        console.log(authUser.uid);
        // Fetch user-specific data from Firestore.
        fetchUserData(authUser.uid);
      } else {
        alert("Please log in!");
        setUser(null);
        navigate("/Main");
      }
    });

    return () => {
      // Unsubscribe from the auth state when the component unmounts.
      unsubscribe();
    };
  }, [navigate]);

  const fetchUserData = async (userId) => {
    try {
      const db = getFirestore();
      const userRef = doc(db, "Hospitals", userId);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        setUserData(userDoc.data());
      } else {
        console.log("User document does not exist");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleSignOut = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      console.log("Signed out");
      navigate("/Main");
      // Handle any additional actions after sign-out (e.g., redirect)
    } catch (error) {
      console.error("Sign-out error:", error);
    }
  };

  return (
    <div>
      <div className="dashboard-container">
        {user ? (
          <div className="profile-info">
            <h2>Welcome to Setu_X Admin!</h2>
            {userData ? (
              <div>
                <p>
                  <br />
                  <strong>Hospital Details:</strong>
                </p>
                <p>
                  <strong>Hospital Name:</strong> {userData.HospitalName}
                </p>
                <p>
                  <strong>Registration no:</strong> {userData.Registration}
                </p>
                <p>
                  <strong>Email:</strong> {userData.Email}
                </p>
              </div>
            ) : (
              <p>Loading user data...</p>
            )}
          </div>
        ) : (
          <p>Please log in to view your data.</p>
        )}
        <div className="card">
          <div class="transparent-box">
            <p>Patient diagnosed till now 101</p>
          </div>
          <div class="transparent-box">
            <p>IPD 347</p>
          </div>
          <div class="transparent-box">
            <p>OPD 421</p>
          </div>
        </div>
      </div>

      <div className="main-actions">
        <button className="add-patient-btn">ADD NEW PATIENT</button>
        {/* Other components */}
      </div>
    </div>
  );
};

export default Dashboard;
