import React from "react";
import landingImg from "../assets/landingImg.svg";
import { MdKeyboardArrowRight as RightArrow } from "react-icons/md";
import { Link } from "react-scroll";

const LandingPage = () => {
  return (
    <div
      name="landing-page"
      className="h-screen w-full bg-gradient-to-b from-white to-yellow-100"
    >
      <div className="max-w-screen-lg mx-auto flex flex-col items-center justify-center h-full px-4 md:flex-row">
        <div className="text-black flex flex-col justify-center h-full mx-20 max-w-7xl">
          <h2 className="text-4xl sm:text-7xl font-bold">Reconnect</h2>
          <p className="text-gray-500 max-w-md my-5">
            For those friends you haven't thought about in a while, but miss all
            the same.
          </p>
          <div>
            <Link
              to="auth-form"
              smooth
              duration={500}
              className="group text-white w-fit px-6 py-3 my-2 flex items-center rounded-md bg-gradient-to-r from-green-500 to-blue-500 hover:cursor-pointer"
            >
              Get Started
              <span className="group-hover:rotate-90 duration-300">
                <RightArrow size={24.987} className="ml-1" />
              </span>
            </Link>
          </div>
        </div>

        <div className="">
          <img
            src={landingImg}
            alt="landing-image"
            className="rounded-2xl mx-auto h-auto max-w-full md:w-full overflow-hidden"
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
