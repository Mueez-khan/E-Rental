// components/BookingForm.js

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BookingForm = ({ plotId }) => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    name: "",
    phone: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const token = localStorage.getItem("token")?.replace(/['"]+/g, "");
    try {
      const response = await axios.post(`http://localhost:8000/api/v1/property/booking`, {
        plotId,
        userDetails
      },  {
        headers: { Authorization: `Bearer ${token}` }, // Use cleaned token
        withCredentials: true,
      
      });

      // Handle successful booking
      console.log(response.data);
      navigate("/confirmation"); // Redirect to confirmation page or plot details
    } catch (err) {
      console.error("Error booking plot:", err);
      setError("Error creating booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto  shadow-md rounded-lg p-6 mt-6 bg-gradient-to-b from-richblack-900 via-richblack-800 to-richblack-700 text-white">
      <h2 className="text-2xl font-bold mb-4">Book Plot</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={userDetails.name}
            onChange={handleChange}
            required
            className="border rounded-lg p-2 w-full text-black"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={userDetails.phone}
            onChange={handleChange}
            required
            className="border rounded-lg p-2 w-full text-black"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`bg-blue-500 text-white py-2 px-4 rounded-lg w-full ${loading && "opacity-50 cursor-not-allowed"}`}
        >
          {loading ? "Booking..." : "Book Now"}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
