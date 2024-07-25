import React from "react";
import FriendsList from "./FriendsList";

const HomePage = () => {
  return (
    <div
      name="home-page"
      className="h-screen w-full bg-gradient-to-b p-12 from-white to-yellow-100"
    >
      <FriendsList />
    </div>
  );
};

export default HomePage;
