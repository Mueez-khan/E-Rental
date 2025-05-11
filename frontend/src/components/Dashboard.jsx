import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const Dashboard = () => {
  const [plots, setPlots] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams(); // Get user ID from the URL params
  console.log("id from params", id);

  useEffect(() => {
    const fetchPlots = async () => {
      try {
        // const token = Cookies.get("token");
        const token = localStorage.getItem("token")?.replace(/['"]+/g, ""); // Clean up token
        console.log("Token inside the dashboard", token);
        
        if (!token) {
          navigate("/login"); // Redirect if token is not found
          console.log("Token not found");
          return;
        }

        // Check if id is present
        if (!id) {
          console.error("User ID not found in params.");
          return;
        }

        console.log("id : ", id);
        const response = await axios.get(
          `http://localhost:8000/api/v1/plots/dashboard/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` }, // Use cleaned token
            withCredentials: true,
          }
        );

        console.log("Response from server: ", response);
        setPlots(response.data.plots);
      } catch (error) {
        console.error("Error fetching plots", error);
        // if (error.response && error.response.status === 401) {
        //   navigate("/login"); // Redirect to login if unauthorized
        // }
      }
    };
    fetchPlots();
  }, [id, navigate]);

  const handleDelete = async (plotId) => {
    try {
      const token = localStorage.getItem("token")?.replace(/['"]+/g, ""); // Clean up token

      console.log("PlotId :" , plotId);
      console.log("Delete token", token);

      await axios.delete(
        `http://localhost:8000/api/v1/plots/${plotId}`, // Correct delete endpoint
        {
          headers: { Authorization: `Bearer ${token}` }, // Use cleaned token
          withCredentials: true,
        }
      );
      setPlots(plots.filter((plot) => plot._id !== plotId)); // Update state
    } catch (error) {
      console.error("Error deleting plot", error);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">My Dashboard</h1>
      <Link
        to="/createPlot"
        className="bg-green-500 text-white px-4 py-2 rounded-md mb-4 inline-block"
      >
        Create New Plot
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plots.length > 0 ? (
          plots.map((plot) => (
            <div
              key={plot._id}
              className="p-6 border rounded-lg shadow-lg bg-white"
            >
              <h2 className="text-2xl font-bold mb-2">{plot.location}</h2>
              <p className="text-gray-700 mb-4">Price: ${plot.price}</p>
              <Link
                to={`/update/${plot._id}`}
                className="bg-blue-500 text-white px-3 py-2 rounded-md mr-2"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(plot._id)}
                className="bg-red-500 text-white px-3 py-2 rounded-md"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No plots found</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
