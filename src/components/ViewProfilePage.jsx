import React, { useState, useEffect, useContext } from "react";
import { updatePersonalData, getPersonalData } from "../api";
import { getAgeFromDOB } from "./CreateProfilePage";
import { useParams } from "react-router-dom";
import profilePic from "../assets/profile.png";

const ViewProfilePage = () => {
  const { uid: paramUid } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  const uid = paramUid || user.uid;

  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [orignalProfileData, setOriginalProfileData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await getPersonalData(uid);
      setProfileData(data);
      setOriginalProfileData(data);
    };

    fetchProfile();
  }, [uid, user.uid]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      dob: e.target.dob.value,
      age: getAgeFromDOB(e.target.dob.value),
      bio: e.target.bio.value,
    };
    updatePersonalData(user.uid, data);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setProfileData(orignalProfileData);
    setIsEditing(false);
  };

  if (!profileData) return <div>Loading...</div>;

  return (
    <div
      name="profile-page"
      className="h-screen w-full bg-gradient-to-b p-12 from-white to-yellow-100"
    >
      <div className="flex flex-col p-4 justify-center max-w-screen-lg mx-auto h-full">
        <img
          src={profileData.imageURL || profilePic}
          alt=""
          className="h-20 w-20 my-8 object-cover rounded-md"
        />
        <div className="pb-8">
          <p className="text-4xl font-bold inline border-b-4 border-gray-500">
            {profileData.firstName + " " + profileData.lastName + `'s Profile`}
          </p>
          <p className="py-6">Here lies the profile details.</p>
        </div>

        <div className="flex justify-center items-center">
          <form
            className="flex flex-col w-full text-gray-400"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              name="firstName"
              value={profileData.firstName}
              onChange={handleInputChange}
              disabled={!isEditing}
              placeholder="Enter your first name"
              className={`p-2 bg-transparent border-2  rounded-md focus:outline-none ${
                isEditing ? "bg-white text-black border border-black" : ""
              }`}
            />
            <input
              type="text"
              name="lastName"
              value={profileData.lastName}
              onChange={handleInputChange}
              disabled={!isEditing}
              placeholder="Enter your last name"
              className={`p-2 my-4 bg-transparent border-2 rounded-md focus:outline-none ${
                isEditing ? "bg-white text-black border border-black" : ""
              }`}
            />
            <input
              type="date"
              name="dob"
              value={profileData.dob}
              onChange={handleInputChange}
              disabled={!isEditing}
              placeholder="Enter your date of birth"
              className={`p-2 bg-transparent border-2 rounded-md focus:outline-none ${
                isEditing ? "bg-white text-black border border-black" : ""
              }`}
            />
            <textarea
              name="bio"
              value={profileData.bio}
              disabled={!isEditing}
              onChange={handleInputChange}
              placeholder="Enter your bio"
              rows="6"
              className={`p-2 my-4 bg-transparent border-2 rounded-md focus:outline-none ${
                isEditing ? "bg-white text-black border border-black" : ""
              }`}
            ></textarea>

            {uid === user.uid && !isEditing && (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="text-white bg-gradient-to-b from-violet-500 to-blue-500 px-6 py-3 my-8 mx-auto flex items-center rounded-md hover:scale-110 duration-300"
              >
                Edit
              </button>
            )}

            {isEditing && (
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="text-white bg-gradient-to-b from-red-500 to-pink-500 px-6 py-3 my-8 mx-auto flex items-center rounded-md hover:scale-110 duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="text-white bg-gradient-to-b from-violet-500 to-blue-500 px-6 py-3 my-8 mx-auto flex items-center rounded-md hover:scale-110 duration-300"
                >
                  Save
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ViewProfilePage;
