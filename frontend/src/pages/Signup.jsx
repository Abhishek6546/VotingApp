import React, { useState } from 'react';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    mobile: '',
    email: '',
    address: '',
    aadharCardNumber: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://votingapp-bj15.onrender.com/user/signup", formData)
      if (!response.data.success) {
        localStorage.setItem('token', response.data.token)
        navigate('/');
      }

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-96 bg-white shadow-md rounded-lg p-4">
        <p onClick={() => navigate("/")} className='flex justify-end cursor-pointer'>X</p>
        <h2 className="text-xl font-bold text-center mb-4">Signup</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="block text-gray-700 font-medium text-sm mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              placeholder="Name"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700 font-medium text-sm mb-1">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              placeholder="Age"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700 font-medium text-sm mb-1">Mobile</label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              placeholder="Mobile"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700 font-medium text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700 font-medium text-sm mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              placeholder="Address"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700 font-medium text-sm mb-1">Aadhar Card Number</label>
            <input
              type="number"
              name="aadharCardNumber"
              value={formData.aadharCardNumber}
              onChange={handleChange}
              className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              placeholder="Aadhar"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium text-sm mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              placeholder="Password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-medium py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
