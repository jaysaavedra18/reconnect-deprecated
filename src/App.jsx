import React, { useState, useEffect, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import AuthForm from "./components/AuthForm";
import HomePage from "./components/HomePage";
import CreateProfilePage from "./components/CreateProfilePage";
import ViewProfilePage from "./components/ViewProfilePage";
import Navbar from "./components/Navbar";
import { FriendsProvider } from "./context/FriendsContext";

export const Context = React.createContext();

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="from-white to-yellow-100">
      <Context.Provider value={[user, setUser]}>
        {user ? (
          <>
            {console.log(user)}
            {console.log(JSON.parse(localStorage.getItem("user")))}
            <FriendsProvider>
              <Navbar />
              <div className="">
                <Routes>
                  <Route exact path="/" element={<HomePage />} />
                  <Route path="/home" element={<HomePage />} />
                  <Route
                    path="/create-profile"
                    element={<CreateProfilePage />}
                  />
                  <Route path="/profile/:uid" element={<ViewProfilePage />} />
                </Routes>
              </div>
            </FriendsProvider>
          </>
        ) : (
          <div>
            <LandingPage />
            <AuthForm />
          </div>
        )}
      </Context.Provider>
    </div>
  );
}

export default App;
