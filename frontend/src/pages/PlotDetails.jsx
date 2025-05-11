// components/PlotDetails.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import BookingForm from "./BookingForm";
import { FaBed } from "react-icons/fa";

const PlotDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [plot, setPlot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null); // State for selected image
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [showBookingForm, setShowBookingForm] = useState(false);
  useEffect(() => {
    const fetchPlotDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/plots/${id}`);
        setPlot(response.data.plot);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching plot details:", error);
        setLoading(false);
      }
    };
    fetchPlotDetails();
  }, [id]);



  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true); // Open modal on image click
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const handleBookNow = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      setShowBookingForm(true); // Show booking form if authenticated
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (!plot) {
    return <div className="text-center py-10">Plot not found</div>;
  }

  return (
    <>


<div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-richblack-900 via-richblack-800 to-richblack-700 text-white">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row bg-gradient-to-b from-richblack-900 via-richblack-800 to-richblack-700 text-white">
        {/* Left Side - Details */}
        <div className="p-6 flex-grow">
          <h1 className="text-4xl font-bold text-gray-900">{plot.location}</h1>
          <p className="text-2xl text-gray-700 mt-2">Price <span >: {plot.price}</span></p>

          <div className="mt-4">
            <h3 className="text-2xl font-semibold text-gray-800">Description:</h3>
            <p className="text-gray-600 mt-2">{plot.description}</p>
          </div>

          <div className="mt-4">
            <h3 className="text-2xl font-semibold text-gray-800">Perks:</h3>
            <ul className="list-disc pl-5 text-gray-600 mt-2">
              {plot.perks.map((perk, index) => (
                <li key={index} className="mt-1">{perk}</li>
              ))}
            </ul>
          </div>
          <div className="mt-4 flex">
            <h3 className="text-2xl font-semibold text-gray-800 mr-4"><FaBed />  </h3>
            <h1 className="text-gray-600 mt-0">: {plot.guestDetails}</h1>
          </div>
        </div>

          
       

          

        {/* Right Side - Image */}
        <div className="w-full md:w-1/2">
          <img
            src={plot.images[0]}
            alt="Main Plot"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>

      {/* Book Now Button */}
      <div className="text-center mt-6">
        <button
          onClick={handleBookNow}
          className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors duration-300"
        >
          Book Now
        </button>
        {showBookingForm && <BookingForm plotId={id} />}
      </div>

      {/* Gallery of additional images */}
      <div className="mt-6">
        <h3 className="text-2xl font-semibold text-gray-800">Gallery:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4" >
          {plot.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Plot Image ${index + 1}`}
              className="w-full h-64 object-cover rounded-lg shadow-md transition-transform duration-200 transform hover:scale-105 cursor-pointer"
              onClick={() => handleImageClick(image)} // Handle image click
            />
          ))}
        </div>
      </div>

      {/* Image Preview Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50" onClick={closeModal}>
          <div className="relative max-w-4xl mx-auto">
            <img src={selectedImage} alt="Selected" className="w-full h-auto rounded-lg" />
            <button className="absolute top-2 right-2 text-white bg-red-500 rounded-full p-1" onClick={closeModal}>
              &times; {/* Close button */}
            </button>
          </div>
        </div>
      )}
    </div>


    </>
  );
};

export default PlotDetails;
