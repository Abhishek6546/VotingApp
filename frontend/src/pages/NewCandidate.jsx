import axios from "axios";
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function NewCandidate() {
    const [Candidate, setCandidate] = useState({
        name: '',
        party: '',
        age: ''
    });
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCandidate({ ...Candidate, [name]: value })
    }

    const HandleSubmit = async (e) => {
        e.preventDefault();
      
        try {
            const candidateData = await axios.post("https://votingapp-bj15.onrender.com/candidate", Candidate, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            setCandidate({ name: '', party: '', age: '' });
            navigate('/candidate');
            setCandidate(candidateData);
        } catch (error) {
            console.error("Error fetching candidate data:", error);
        }
    }


    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4 flex justify-center items-center">
            <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Candidate</h2>
                <form onSubmit={HandleSubmit} className="space-y-4">
                    {/* Name Input */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1" htmlFor="name">
                            Name
                        </label>
                        <input onChange={handleChange}
                            type="text"
                            id="name"
                            name="name"
                            value={Candidate.name}
                            placeholder="Enter candidate's name"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Party Input */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1" htmlFor="party">
                            Party
                        </label>
                        <input onChange={handleChange}
                            type="text"
                            id="party"
                            name="party"
                            value={Candidate.party}
                            placeholder="Enter party name"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Age Input */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1" htmlFor="age">
                            Age
                        </label>
                        <input onChange={handleChange}
                            type="number"
                            id="age"
                            name="age"
                            value={Candidate.age}
                            placeholder="Enter candidate's age"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 transition"
                    >
                        Add Candidate
                    </button>
                </form>
            </div>
        </div>
    );
}

export default NewCandidate;
