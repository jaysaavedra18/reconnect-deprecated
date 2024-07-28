import React, { useContext } from "react";
import profilePic from "../assets/profile.png";
import { FriendsContext } from "../context/FriendsContext";

const FriendsList = () => {
  const { friends } = useContext(FriendsContext);

  const friendActions = [
    { id: 1, title: "View Profile", path: "/profile" },
    { id: 3, title: "Direct Message", path: "/chat" },
    { id: 2, title: "Remove Friend", path: "/remove-friend?" },
  ];

  return (
    <>
      {friends.map(({ uid, firstName, lastName, imageURL, createdAt }) => {
        // Format the createdAt field for display
        const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        return (
          <div
            key={uid}
            name="friend-container"
            className="flex flex-col mx-auto my-0.5 my border border-gray-500 rounded-lg w-full max-w-screen-lg"
          >
            <div name="friend-identifiers" className="flex ">
              <a href={"/profile/" + uid}>
                <img
                  src={imageURL ? imageURL : profilePic}
                  alt="some-img"
                  className="h-12 w-12 object-cover rounded-full ml-2 mt-2 hover:cursor-pointer"
                />
              </a>

              <div className="flex flex-col justify-end px-12">
                <a
                  href={"/profile/" + uid}
                  className="flex flex-col justify-end hover:underline"
                >
                  {firstName} {lastName}
                </a>
                <p className="text-gray-300 text-sm">
                  Member since {formattedDate}
                </p>
              </div>
            </div>
            <div name="friend-actions" className="flex justify-end mt-12">
              {friendActions.map(({ title, path, id }) => {
                return (
                  <a
                    key={id}
                    href={path + "/" + uid}
                    className="mr-3 text-gray-400"
                  >
                    {title}
                  </a>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default FriendsList;
