import React from "react";
import { IoSearchCircle } from "react-icons/io5";
import heroSection from "../assets/heroSectoin.jpg";
import Slider from "../components/Slider";
import PlotsComponent from "../components/PlotsComponent";

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-richblack-900 via-richblack-800 to-richblack-700 text-white">
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row p-4 justify-center items-center lg:h-screen space-y-8 lg:space-y-0">
        {/* Left: Text and Search Bar */}
        <div className="text-center lg:text-left m-6 lg:m-12 lg:mr-44">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 lg:mb-10 leading-tight lg:leading-none">
            Inspiring <br /> Locations <br /> to Lodge
          </h1>

          <p className="text-gray-300 text-sm md:text-base lg:text-lg font-medium mb-6 lg:mb-8">
            Find Your Perfect Space: Homes and Lands for Rent, <br /> Tailored Just for You
          </p>

          {/* Search Bar */}
          {/* <div className="relative w-60 md:w-72 lg:w-80 mx-auto lg:mx-0">
            <input
              className="w-full border-2 border-gray-400 h-10 rounded-full placeholder:text-gray-400 placeholder:pl-4 pl-4 text-sm lg:text-base bg-richblack-600 text-white"
              type="search"
              placeholder="Search plot"
            />
            <IoSearchCircle className="absolute right-[-5px] top-1/2 transform -translate-y-1/2 text-gray-400 text-3xl lg:text-4xl cursor-pointer" />
          </div> */}
        </div>

        {/* Right: Image Section */}
        <div className="flex flex-col items-center">
          <div className="relative w-full max-w-[350px] md:max-w-[450px] lg:max-w-[500px] h-[250px] md:h-[350px] lg:h-[400px] rounded-lg overflow-hidden">
            <img
              className="w-full h-full object-cover rounded-lg"
              src={heroSection}
              alt="Hero Section"
            />

            <div className="absolute inset-0 flex flex-col justify-between items-start p-4 md:p-6 bg-gradient-to-t from-richblack-900 via-transparent to-transparent">
              <p className="text-left text-white font-semibold text-sm md:text-lg lg:text-xl mb-4">
                Exceptional Properties <br /> Located in Stunning Surroundings
              </p>

              <button className="bg-white bg-opacity-20 backdrop-blur-md text-white font-semibold py-1 md:py-2 px-4 md:px-6 rounded-full hover:bg-opacity-30 transition">
                Go to Top Rated
              </button>
            </div>
          </div>

          {/* Stats Section */}
          <div className="flex justify-between items-center mt-4 bg-richblack-500 w-full max-w-[350px] md:max-w-[450px] lg:max-w-[500px] rounded-full h-8 px-5 text-white font-bold text-xs md:text-sm lg:text-base">
            <div>20+</div>
            <div>Unique places</div>
          </div>
        </div>
      </div>

      {/* Slider Section */}
      <Slider />

      {/* Plots Component */}
      <PlotsComponent />
    </div>
  );
}
