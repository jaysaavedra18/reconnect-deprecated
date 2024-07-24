import React from "react";

const Register = () => {
  const handleSubmit = () => {};

  return (
    <div
      name="register"
      className="w-full h-screen bg-gradient-to-b from-yellow-100 to-white p-4 text-black"
    >
      <div className="flex flex-col p-4 justify-center max-w-screen-lg mx-auto h-full md:w-4/5">
        <div className="pb-8">
          <p className="text-4xl font-bold inline border-b-4 border-black">
            Register
          </p>
          <p className="py-6">Register to get started finding old friends.</p>
        </div>

        <div className="flex justify-center items-center">
          <form action="" className="flex flex-col w-full">
            <input
              type="text"
              name="email"
              placeholder="Enter your email"
              className="p-2 bg-transparent border-2 rounded-md border-gray-700 text-black focus:outline-none focus:bg-white duration-400"
            />
            <input
              type="password"
              name="password"
              placeholder="Create your password"
              className="my-4 p-2 bg-transparent border-2 rounded-md border-gray-700 text-black focus:outline-none focus:bg-white duration-300"
            />
            <input
              type="password"
              name="confirm-password"
              placeholder="Confirm your password"
              className="p-2 bg-transparent border-2 rounded-md border-gray-700 text-black focus:outline-none focus:bg-white duration-300"
            />

            <button className="text-white bg-gradient-to-b from-green-700 to-blue-500 px-6 py-3 my-8 mx-auto flec items-center rounded-md hover:scale-110 duration-300">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
