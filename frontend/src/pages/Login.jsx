import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import {setToken } from "../redux/slices/authSlice"; 
import {setUser , setLoading}  from "../redux/slices/profileSlice";  
import {  useNavigate } from 'react-router-dom';
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
   
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    dispatch(setLoading(true));
    try {
      const response = await axios.post("http://localhost:8000/api/v1/login", formData);
      const { token } = response.data;
    
      // Save token to localStorage
      localStorage.setItem("token", JSON.stringify(token));
      // localStorage.setItem('token', token); 
      // Set token to Redux state
      console.log(response.data.user);
      dispatch(setToken(token));
      dispatch(setUser(response.data.user));
      document.cookie = `token=${token}; path=/; secure; SameSite=Lax`;
      navigate("/");

      // Redirect or show success message
    } catch (error) {
      console.log(error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 bg-gradient-to-b from-richblack-900 via-richblack-800 to-richblack-700 text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg  p-8 rounded shadow-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-700">Login</h2>

        {error && <p className="text-red-500">{error}</p>}

        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
