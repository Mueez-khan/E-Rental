import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import './style.css'; // Make sure to import your styles

const PlotsComponent = () => {
  const [plots, setPlots] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.plots) {
      setPlots(location.state.plots);
    } else {
      const fetchPlots = async () => {
        try {
          const response = await axios.get("http://localhost:8000/api/v1/plots?limit=20");
          setPlots(response.data.data);
        } catch (error) {
          console.error("Error fetching plots:", error);
        }
      };
      fetchPlots();
    }
  }, [location]);

  const handleCardClick = (plotId) => {
    navigate(`/plot/${plotId}`, { state: { plots } });
  };

  const handleShowAll = () => {
    navigate("/showAllPlots");
  };

  return (
    <div className="homepage mt-14 mx-auto max-w-7xl px-4">
      <h1 className="text-4xl font-bold mb-10 text-center">Featured Plots</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ml-14">
        {plots.map((plot) => (
          <div
            key={plot._id}
            onClick={() => handleCardClick(plot._id)}
            className="glass-effect p-6 rounded-xl shadow-lg cursor-pointer transition-transform transform hover:scale-105"
          >
            {plot.images && plot.images.length > 0 && (
              <img
                src={plot.images[0]}
                alt="Plot"
                className="w-full h-40 object-cover rounded-lg mt-4"
              />
            )}
            <h2 className="text-xl font-semibold mb-2">{plot.location}</h2>
            <p className="text-gray-600">Price: ${plot.price}</p>
            <p className="text-gray-500 mt-2 text-sm">
              {plot.description.length > 100 
                ? `${plot.description.slice(0, 100)}...` 
                : plot.description}
            </p>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <button
          onClick={handleShowAll}
          className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors duration-300"
        >
          Show All Plots
        </button>
      </div>
    </div>
  );
};

export default PlotsComponent;
