import { useState, useEffect } from "react";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function BeautifulSlider() {
  const [images, setImages] = useState([]);

  // Fetch images from the backend
  const fetchImages = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/plots"); // Replace with your actual endpoint
      console.log(response.data);

      // Assuming response.data contains an array of plots, and each plot has an 'images' array
      const plots = response.data.data; // Change this to match your actual API structure
      const selectedImages = [];

      // Extract one image from each plot, up to 3 images
      for (let i = 0; i < Math.min(plots.length, 3); i++) {
        const plotImages = plots[i].images; // Access the images array of each plot
        if (plotImages.length > 0) {
          selectedImages.push(plotImages[0]); // Push the first image from each plot
        }
      }

      setImages(selectedImages); // Set the selected images in state
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    fetchImages(); // Fetch images when the component mounts
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    pauseOnHover: true,
  };

  return (
    <div className="w-full max-w-6xl mx-auto mt-10">
      {images.length > 0 ? (
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index} className="h-[400px] overflow-hidden rounded-lg relative">
              <img
                src={image} // Assuming each image is just a URL string
                alt={`Slide ${index}`}
                className="w-full h-full object-cover"
              />
              {/* Optional caption overlay */}
              {/* <div className="absolute inset-0 bg-black bg-opacity-30 flex justify-center items-center">
                <h2 className="text-white text-3xl font-bold">Beautiful Slide {index + 1}</h2>
              </div> */}
            </div>
          ))}
        </Slider>
      ) : (
        <p>Loading images...</p>
      )}
    </div>
  );
}
