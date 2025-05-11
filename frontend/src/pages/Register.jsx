import  { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [userData, setUserData] = useState({
    userName: '',
    email: '',
    phoneNumber: '',
    accountType: '',
    password: '',
    confirmPassword: '',
  });
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/v1/otp', { email: userData.email });
      console.log("Otp response" , response);
      alert(response.data.message);
      setOtpSent(true);  // Move to OTP screen
    } catch (error) {
      console.log(error);
      alert('Error sending OTP');
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/v1/register', { ...userData, otp });
  
      console.log(response);
      console.log("User registered: ", response.data);
      console.log(response.data.message);
      alert(response.data.message);
    } catch (error) {
      console.log(error);
      alert(`Error occur ${error.response.data.message}`);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 bg-gradient-to-b from-richblack-900 via-richblack-800 to-richblack-700 text-white">
      <div className="w-full max-w-md p-6  rounded-lg shadow-md">
        {!otpSent ? (
          <>
            <h2 className="text-2xl font-bold mb-6">Register</h2>
            <input
              className="w-full p-2 mb-4 text-black border border-gray-300 rounded"
              type="text"
              name="userName"
              placeholder="Username"
              value={userData.userName}
              onChange={handleChange}
            />
            <input
              className="w-full p-2 mb-4 text-black border border-gray-300 rounded"
              type="email"
              name="email"
              placeholder="Email"
              value={userData.email}
              onChange={handleChange}
            />
            <input
              className="w-full p-2 mb-4  text-black border border-gray-300 rounded"
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={userData.phoneNumber}
              onChange={handleChange}
            />
            <input
              className="w-full p-2 mb-4 text-black border border-gray-300 rounded"
              type="text"
              name="accountType"
              placeholder="Account Type"
              value={userData.accountType}
              onChange={handleChange}
            />
            <input
              className="w-full p-2 mb-4 text-black border border-gray-300 rounded"
              type="password"
              name="password"
              placeholder="Password"
              value={userData.password}
              onChange={handleChange}
            />
            <input
              className="w-full p-2 mb-4 text-black border border-gray-300 rounded"
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={userData.confirmPassword}
              onChange={handleChange}
            />
            <button
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              onClick={handleRegister}
            >
              Send OTP
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-6">Enter OTP</h2>
            <input
              className="w-full p-2 mb-4 border text-black border-gray-300 rounded"
              type="text"
              placeholder="OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button
              className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
              onClick={handleVerifyOtp}
            >
              Verify OTP & Register
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Register;
