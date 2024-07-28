import React, { useContext, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.config";
import { Context } from "../App";

const Navbar = () => {
  const [user, setUser] = useContext(Context);

  const [nav, setNav] = useState(false);

  const links = [{ id: 1, link: "profile" }];

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      setNav(!nav);
      setUser(null);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <div className="flex justify-between items-center w-full h-20 text-white bg-black fixed px-4 mb-10">
      <div>
        <Link to="home">
          <h1 className="font-signature text-4xl ml-2 cursor-pointer">
            Reconnect
          </h1>
        </Link>
      </div>

      <ul className="hidden md:flex">
        {links.map(({ id, link }) => {
          return (
            <li
              key={id}
              className="px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-white duration-200"
            >
              <Link to={link + "/" + user.uid}>{link}</Link>
            </li>
          );
        })}
        <li className="px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-white duration-200">
          <button onClick={handleSignOut}>Sign Out</button>
        </li>
      </ul>

      <div
        onClick={() => setNav(!nav)}
        className="cursor-pointer pr-4 z-10 text-gray-500 md:hidden"
      >
        {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>

      {nav && (
        <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black to-gray-800 text-gray-500">
          {links.map(({ id, link }) => {
            return (
              <li
                key={id}
                className="px-4 cursor-pointer capitalize py-6 text-4xl hover:text-white"
              >
                <Link onClick={() => setNav(!nav)} to={link + "/" + user.uid}>
                  {link}
                </Link>
              </li>
            );
          })}
          <li className="px-4 cursor-pointer capitalize py-6 text-4xl hover:text-white">
            <button onClick={handleSignOut}>Sign Out</button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navbar;
