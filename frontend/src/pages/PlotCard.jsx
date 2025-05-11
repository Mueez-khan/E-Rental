import React from "react";
import { useNavigate } from "react-router-dom";

const PlotCard = ({ plot }) => {
  const navigate = useNavigate();

  const handlePlotClick = () => {
    navigate(`/plot/${plot._id}`); // Navigate to plot details page
  };

  return (
    <div
      className="cursor-pointer  shadow-lg rounded-lg p-4 m-4 hover:shadow-xl transition-shadow duration-300 bg-gradient-to-b from-richblack-900 via-richblack-800 to-richblack-700 text-white"
      onClick={handlePlotClick} // Redirect on click
    >
      <img
        src={plot.images[0]} // Display the first image of the plot
        alt={plot.location}
        className="w-full h-48 object-cover rounded-lg mb-4 "
      />
      <h2 className="text-xl font-bold">{plot.location}</h2>
      <p className="text-gray-700">Price: RS {plot.price}</p>
      <p className="text-gray-500 mt-2 text-sm w-44">
              {plot.description.length > 100 
                ? `${plot.description.slice(0, 100)}...` 
                : plot.description}
            </p>
    </div>
  );
};

export default PlotCard;
