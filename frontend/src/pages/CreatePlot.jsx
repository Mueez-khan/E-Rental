import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const CreatePlot = () => {
  const [userData, setUserData] = useState({
    location: "",
    price: "",
    description: "",
    perks: "",
    aboutPlace: "",
    guestDetails: "",
    images: [],
  });

  //   const [loading , setLoading] = useState(false);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setUserData({ ...userData, images: e.target.files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cleanedData = {
      location: userData.location.replace(/"/g, ""),
      price: userData.price,
      description: userData.description.replace(/"/g, ""),
      perks: userData.perks.replace(/"/g, ""),
      aboutPlace: userData.aboutPlace.replace(/"/g, ""),
      guestDetails: userData.guestDetails,
      images: userData.images,
    };

    const formData = new FormData();
    formData.append("location", cleanedData.location);
    formData.append("price", cleanedData.price);
    formData.append("description", cleanedData.description);
    formData.append("perks", cleanedData.perks);
    formData.append("aboutPlace", cleanedData.aboutPlace);
    formData.append("guestDetails", cleanedData.guestDetails);

    for (let i = 0; i < cleanedData.images.length; i++) {
      formData.append("images", cleanedData.images[i]);
    }

    try {
      // const token = localStorage.getItem('token');

      const token = Cookies.get("token");

      console.log("Token inside create", token);

      // Check if the token exists
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }
      //   console.log("response" , response);
      console.log(formData);
      console.log(formData);
      const response = await axios.post(
        "http://localhost:8000/api/v1/plots/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );

      console.log("Plot created successfully:", response.data);
    } catch (error) {
      console.error("Error creating plot:", error);
    }
  };

  return (
    <>
      <div className="flex justify-center  items-center bg-gray-500 h-screen bg-gradient-to-b from-richblack-900 via-richblack-800 to-richblack-700 text-white">
        <form
          className="w-full  max-w-md p-12  bg-gradient-to-b  from-richblack-900 via-richblack-800 to-richblack-700 text-white rounded-lg shadow-md"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="location"
            placeholder="Enter location of Place"
            value={userData.location}
            onChange={handleChange}
            className="mb-2 mr-2 p-2 border border-gray-300 rounded"
          />
          <input
            type="number"
            name="price"
            placeholder="Enter Rent of Place"
            value={userData.price}
            onChange={handleChange}
            className="mb-2 mr-2 p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="description"
            placeholder="Enter Description for Place"
            value={userData.description}
            onChange={handleChange}
            className="mb-2 mr-2 p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="perks"
            placeholder="Enter Perks of place"
            value={userData.perks}
            onChange={handleChange}
            className="mb-2 mr-2 p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="aboutPlace"
            placeholder="Enter Special about Place"
            value={userData.aboutPlace}
            onChange={handleChange}
            className="mb-2 mr-2 p-2 border border-gray-300 rounded"
          />
          <input
            type="number"
            name="guestDetails"
            placeholder="Enter Guest Details"
            value={userData.guestDetails}
            onChange={handleChange}
            className="mb-2  mr-2 p-2 border border-gray-300 rounded"
          />
          <input
            type="file"
            name="images"
            onChange={handleImageChange}
            multiple
            className="mb-2 mr-2 p-2 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-2 rounded"
          >
            {/* { loading === true ? <p>Creating ...</p> : "Create plot"} */}
            Create plot
          </button>
        </form>
      </div>
    </>
  );
};

export default CreatePlot;
