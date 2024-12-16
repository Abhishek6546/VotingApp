import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [logindata, setlogindata] = useState({
    aadharCardNumber: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setlogindata({ ...logindata, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://votingapp-bj15.onrender.com/user/login", logindata);
      if (response.data.token) {
        navigate('/UserProfile'); // Redirect to home or dashboard on successful login
      } else {
        alert(response.data || 'Login failed. Please try again.'); // Show error if any
      }
      localStorage.setItem('token', response.data.token)
    } catch (error) {
      console.error("Login failed", error);
      alert("invalid credentials")
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="aadharCardNumber" className="block text-sm font-medium text-gray-700">
              Aadhar Card Number
            </label>
            <input
              onChange={handleChange}
              type="text"
              id="aadharCardNumber"
              value={logindata.aadharCardNumber}
              name="aadharCardNumber"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your Aadhar Card Number"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              onChange={handleChange}
              type="password"
              id="password"
              value={logindata.password}
              name="password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-center text-gray-600 mt-4">
          Don't have an account?{' '}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
