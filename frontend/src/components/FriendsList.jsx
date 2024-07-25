import React from "react";
import profilePic from "../assets/profile.png";

const FriendsList = () => {
  const handleViewUserProfile = () => {};

  const friendActions = [
    { id: 1, title: "View Profile", path: "/profile" },
    { id: 3, title: "Direct Message", path: "/chat" },
    { id: 2, title: "Remove Friend", path: "/remove-friend?" },
  ];

  const friends = [
    {
      uid: "userid1",
      firstName: "John",
      lastName: "Doe",
      imageURL: profilePic,
    },
    {
      uid: "userid2",
      firstName: "Jane",
      lastName: "Doe",
      imageURL: profilePic,
    },
    {
      uid: "userid3",
      firstName: "Fawn",
      lastName: "Doug",
      imageURL: profilePic,
    },
    {
      uid: "userid4",
      firstName: "Phil",
      lastName: "Smith",
      imageURL: profilePic,
    },
  ];

  return (
    <>
      <h1>Friends list: </h1>
      <div
        name="friends-list"
        className="overflow-y-auto h-3/6 border border-gray-600 p-3 rounded-md"
      >
        {friends.map(({ uid, firstName, lastName, imageURL }) => {
          return (
            <div
              key={uid}
              name="friend-container"
              className="flex flex-col mx-auto my-0.5 my border border-gray-500 rounded-lg w-full max-w-screen-lg"
            >
              <div name="friend-identifiers" className="flex ">
                <img
                  src={imageURL}
                  alt="some-img"
                  className="h-12 rounded-full ml-2 mt-2"
                />
                <div className="flex flex-col justify-end px-12">
                  <button
                    onClick={handleViewUserProfile}
                    className="flex flex-col justify-end"
                  >
                    {firstName} {lastName}
                  </button>
                  <p className="text-gray-300 text-sm">
                    Member since 10/14/2024
                  </p>
                </div>
              </div>
              <div name="friend-actions" className="flex justify-end mt-12">
                {friendActions.map(({ title, path, id }) => {
                  return (
                    <a key={id} href={path} className="mr-3 text-gray-400">
                      {title}
                    </a>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default FriendsList;
