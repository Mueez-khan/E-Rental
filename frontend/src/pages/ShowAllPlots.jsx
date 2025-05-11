import { useState, useEffect } from "react";
import axios from "axios";
import PlotCard from "./PlotCard";

export default function ShowAllPlots() {
  const [plotData, setPlotData] = useState([]);
  const [filteredPlots, setFilteredPlots] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const showAllPlots = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/plots/allPlots");
      setPlotData(response.data.data);
      setFilteredPlots(response.data.data); // Initially, show all plots
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    showAllPlots();
  }, []);

  // Filter plots based on search query
  useEffect(() => {
    if (searchQuery) {
      const filtered = plotData.filter((plot) =>
        plot.location.toLowerCase().includes(searchQuery.toLowerCase()) || 
        plot.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPlots(filtered);
    } else {
      setFilteredPlots(plotData); // Show all plots if search is empty
    }
  }, [searchQuery, plotData]);

  return (
    <div className="flex flex-col items-center bg-gray-100 py-8 bg-gradient-to-b from-richblack-900 via-richblack-800 to-richblack-700 text-white">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by location or description"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4 p-2 border text-black border-gray-300 rounded"
      />

      {/* Display filtered plots */}
      <div className="flex flex-wrap justify-center">
        {filteredPlots && filteredPlots.length > 0 ? (
          filteredPlots.map((plot) => <PlotCard key={plot._id} plot={plot} />)
        ) : (
          <p>No plots found...</p>
        )}
      </div>
    </div>
  );
}
