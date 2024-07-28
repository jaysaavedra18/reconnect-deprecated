import React, { useContext, useEffect } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import { getPersonalData } from "../api";
import { useNavigate } from "react-router-dom";
import { Context } from "../App";

const AuthForm = () => {
  const [authUser, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const [user, setUser] = useContext(Context);

  useEffect(() => {
    if (authUser) {
      localStorage.setItem("user", JSON.stringify(authUser));
      setUser(authUser);
    } else {
      localStorage.removeItem("user");
      setUser(null);
    }
  }, [authUser]);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      // After sign-in, user will be updated automatically by useAuthState hook
      const userData = await getPersonalData(result.user.uid);

      if (userData) {
        console.log("Existing user");
        // navigate("/home");
      } else {
        console.log("New user");
        navigate("/profile");
      }
    } catch (error) {
      console.error("Error signing in with Google: ", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div
      name="auth-form"
      className="w-full h-screen bg-gradient-to-b from-yellow-100 to-white p-4 text-black"
    >
      <div className="flex flex-col p-4 justify-center max-w-screen-lg mx-auto h-full md:w-4/5">
        <div className="pb-8">
          <p className="text-4xl font-bold inline border-b-4 border-black">
            Connect to get started today
          </p>
        </div>
        <div className="flex justify-center items-center">
          <button
            onClick={signInWithGoogle}
            className="text-white bg-gradient-to-b from-green-700 to-blue-500 px-6 py-3 my-8 mx-auto flex items-center rounded-md hover:scale-110 duration-300"
          >
            Connect with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
