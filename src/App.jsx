import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import AuthForm from "./components/AuthForm";
import HomePage from "./components/HomePage";
import ProfilePage from "./components/ProfilePage";
import Navbar from "./components/Navbar";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    // console.log(user);
    if (user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <>
      {isAuthenticated ? (
        <>
          <Navbar />
          <div className="py-20">
            <Routes>
              <Route exact path="/" element={<HomePage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </div>
        </>
      ) : (
        <div>
          <LandingPage />
          <AuthForm />
        </div>
      )}
    </>
  );
}

export default App;
