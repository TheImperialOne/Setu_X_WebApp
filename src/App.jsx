import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SplashScreen from "./SplashScreen";
import Registration from "./Registration";
import Dashboard from "./Dashboard";
import Main from "./Main";
import "./App.css";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/Main" element={<Main />} />
        <Route path="/Registration" element={<Registration />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
