// components/BookingConfirmation.js

import React from "react";
import { useNavigate } from "react-router-dom";

const BookingConfirmation = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h2 className="text-3xl font-bold mb-4">Booking Confirmed!</h2>
        <p className="mb-4">Thank you for your booking. A confirmation email has been sent to you.</p>
        <button
          onClick={() => navigate("/")} // Navigate back to home or other page
          className="bg-blue-500 text-white py-2 px-4 rounded-lg"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default BookingConfirmation;
