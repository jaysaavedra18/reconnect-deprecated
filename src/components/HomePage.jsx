import React, { useState, useRef, useEffect } from "react";
import FriendsList from "./FriendsList";
import Suggestions from "./Suggestions";
import SearchUsers from "./SearchUsers";

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("friends");

  return (
    <div name="home-page" className="h-screen w-full bg-gradient-to-b p-12">
      <div
        name="tab-selector"
        className="border border-gray-700 rounded-sm h-auto mt-20 "
      >
        <button
          onClick={() => setActiveTab("friends")}
          className={`ml-4 hover:underline ${
            activeTab === "friends" ? "underline" : ""
          }`}
        >
          Friends
        </button>
        <button
          onClick={() => setActiveTab("suggestions")}
          className={`ml-4 hover:underline ${
            activeTab === "suggestions" ? "underline" : ""
          }`}
        >
          Suggestions
        </button>
        <button
          onClick={() => setActiveTab("search")}
          className={`ml-4 hover:underline ${
            activeTab === "search" ? "underline" : ""
          }`}
        >
          Search Users
        </button>
      </div>

      <div
        name="friends-list"
        className="overflow-y-auto h-3/6 border border-gray-600 p-3 rounded-sm"
      >
        {activeTab === "friends" && <FriendsList />}
        {activeTab === "suggestions" && <Suggestions />}
        {activeTab === "search" && <SearchUsers />}
      </div>
    </div>
  );
};

export default HomePage;
