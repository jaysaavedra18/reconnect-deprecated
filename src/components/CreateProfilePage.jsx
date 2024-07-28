import React, { useState } from "react";
import { updatePersonalData } from "../api";
import { useNavigate } from "react-router-dom";

export const getAgeFromDOB = (dob) => {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
};

const CreateProfilePage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      uid: user.uid,
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      dob: e.target.dob.value,
      age: getAgeFromDOB(e.target.dob.value),
      bio: e.target.bio.value,
      friends: [],
      incomingRequests: [],
      outgoingRequests: [],
      imageURL: "",
      createdAt: new Date().toISOString,
    };
    updatePersonalData(user.uid, data);
    navigate("/");
  };

  return (
    <div
      name="create-profile"
      className="h-screen w-full bg-gradient-to-b p-12 from-white to-yellow-100"
    >
      <div className="flex flex-col p-4 justify-center max-w-screen-lg mx-auto h-full">
        <div className="pb-8">
          <p className="text-4xl font-bold inline border-b-4 border-gray-500">
            Personal Information
          </p>
          <p className="py-6">
            Just fill out a few more details to get started.
          </p>
        </div>

        <div className="flex justify-center items-center">
          <form
            className="flex flex-col w-full text-gray-400"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              name="firstName"
              placeholder="Enter your first name"
              className="p-2 bg-transparent border-2  rounded-md focus:outline-none focus:bg-white focus:text-black"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Enter your last name"
              className="p-2 my-4 bg-transparent border-2 rounded-md focus:outline-none focus:bg-white focus:text-black"
            />
            <input
              type="date"
              name="dob"
              placeholder="Enter your date of birth"
              className="p-2 bg-transparent border-2 rounded-md focus:outline-none focus:bg-white focus:text-black"
            />

            <textarea
              name="bio"
              placeholder="Enter your bio"
              rows={"6"}
              className="p-2 my-4 bg-transparent border-2 rounded-md focus:outline-none focus:bg-white focus:text-black"
            ></textarea>

            <button className="text-white bg-gradient-to-b from-violet-500 to-blue-500 px-6 py-3 my-8 mx-auto flec items-center rounded-md hover:scale-110 duration-300">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProfilePage;
