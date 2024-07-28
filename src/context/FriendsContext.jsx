import React, { createContext, useState, useEffect } from "react";
import { getPersonalData } from "../api";

// Create a context for friends data
const FriendsContext = createContext();

// Create a provider component for the friends context
const FriendsProvider = ({ children }) => {
    // Retrieve the current user from localStorage
    const user = JSON.parse(localStorage.getItem("user"));

    // State to store the friends list, initialized with data from localStorage if available
    const [friends, setFriends] = useState(() => {
        const savedFriends = localStorage.getItem("friends");
        return savedFriends ? JSON.parse(savedFriends) : [];
    });

    // Effect to fetch friends data from the server
    useEffect(() => {
        const fetchFriends = async () => {
            if (user && user.uid) { // Check if user exists and has a uid
                try {
                    // Fetch the user's data
                    const userData = await getPersonalData(user.uid);
                    const friendsList = userData.friends;

                    // Fetch data for each friend in the friends list
                    const friendsData = await Promise.all(
                        friendsList.map((uid) => getPersonalData(uid))
                    );

                    // Update the friends state with the fetched data
                    setFriends(friendsData);

                    // Persist the fetched friends data to localStorage
                    localStorage.setItem("friends", JSON.stringify(friendsData));
                } catch (error) {
                    console.error("Error fetching friends:", error);
                }
            }
        };

        // Fetch friends data only if friends list is empty
        if (friends.length === 0) {
            fetchFriends();
        }
    }, [user]); // Run this effect whenever the user changes

    return (
        // Provide the friends state and setter function to the component tree
        <FriendsContext.Provider value={{ friends, setFriends }}>
            {children}
        </FriendsContext.Provider>
    );
};

export { FriendsContext, FriendsProvider };
