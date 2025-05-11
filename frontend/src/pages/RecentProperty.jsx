import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PlotCard from "./PlotCard";

export default function RecentProperty() {
  const [plotData, setPlotData] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input

  const showAllPlots = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/plots/recentProperty");
      setPlotData(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    showAllPlots();
  }, []);

  const navigate = useNavigate();

  const handlePlotClick = (plotId) => {
    navigate(`/plot/${plotId}`); // Navigate to plot details page
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value); // Update the search query state
  };

  // Filter plots based on search query
  const filteredPlots = plotData.filter((plot) => 
    plot.location.toLowerCase().includes(searchQuery.toLowerCase()) || 
    plot.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* Search Input */}
      <div className="flex justify-center py-4  bg-richblack-900  ">
        <input
          type="text"
          placeholder="Search by location or description"
          value={searchQuery}
          onChange={handleSearchChange}
          className="border rounded-md px-4 py-2"
        />
      </div>

      <div className="flex flex-wrap justify-center bg-gray-100 py-8 bg-gradient-to-b from-richblack-900 via-richblack-800 to-richblack-700 text-white">
        {filteredPlots.length > 0 ? (
          filteredPlots.map((plot) => (
            <PlotCard 
              key={plot._id} 
              plot={plot} 
              onClick={() => handlePlotClick(plot._id)} // Pass click handler
            />
          ))
        ) : (
          <p>No plots found.</p>
        )}
      </div>
    </div>
  );
}
