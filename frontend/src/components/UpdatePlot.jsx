import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";

const UpdatePlot = () => {
  const { id } = useParams(); // Get plot ID from URL params
  console.log("Params" , id);
  const navigate = useNavigate();
  const [plot, setPlot] = useState({
    location: "",
    price: "",
    description: "",
    perks: "",
    aboutPlace: "",
    guestDetails: "",
  });
  const [images, setImages] = useState([]); // For handling file input

  useEffect(() => {
    const fetchPlot = async () => {
      try {
        const token = Cookies.get("token");
        const response = await axios.get(
          `http://localhost:8000/api/v1/plots/${id}`, // Use plot ID from params
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setPlot(response.data.plot); // Populate form with current plot data
      } catch (error) {
        console.error("Error fetching plot:", error);
      }
    };
    fetchPlot();
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    setPlot({ ...plot, [e.target.name]: e.target.value });
  };

  // Handle image file changes
  const handleImageChange = (e) => {
    setImages([...e.target.files]); // Store selected images
  };

  // Handle form submission to update the plot
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(); // Use FormData to handle file uploads
    formData.append("location", plot.location);
    formData.append("price", plot.price);
    formData.append("description", plot.description);
    formData.append("perks", plot.perks);
    formData.append("aboutPlace", plot.aboutPlace);
    formData.append("guestDetails", plot.guestDetails);

    // Append all image files to the form data
    images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      // const token = Cookies.get("token");
      const token = localStorage.getItem("token")?.replace(/['"]+/g, "");
      
      console.log("Token in updatePlot" , token);
      const response = await axios.put(
        `http://localhost:8000/api/v1/plots/update/${id}`, // Update plot using plot ID from params
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );
      console.log("Response : " , response.data.plot.owner);
        alert(response.data.message);
        
      console.log("Plot updated successfully:", response.data);
      navigate(`/dashboard/${response.data.plot.owner}`); // Redirect to dashboard after successful update
    } catch (error) {
        alert(error.message);
      console.error("Error updating plot:", error);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Update Plot</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium">Location</label>
          <input
            type="text"
            name="location"
            value={plot.location}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Price</label>
          <input
            type="number"
            name="price"
            value={plot.price}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={plot.description}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border"
            rows="4"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Perks</label>
          <input
            type="text"
            name="perks"
            value={plot.perks}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">About Place</label>
          <textarea
            name="aboutPlace"
            value={plot.aboutPlace}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border"
            rows="4"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Guest Details</label>
          <textarea
            name="guestDetails"
            value={plot.guestDetails}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border"
            rows="4"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Upload Images</label>
          <input
            type="file"
            name="images"
            onChange={handleImageChange}
            className="mt-1 block w-full p-2 border"
            multiple
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Update Plot
        </button>
      </form>
    </div>
  );
};

export default UpdatePlot;
