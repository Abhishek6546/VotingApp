import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function UpdateCandidate() {
    const { id } = useParams(); // Access candidate ID from URL
    const navigate = useNavigate();

    const [candidate, setCandidate] = useState({
        name: '',
        party: '',
        age: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCandidate((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/candidate/${id}`, candidate, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            alert('Candidate updated successfully!');
            navigate('/candidate');
        } catch (error) {
            console.error('Error updating candidate data:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <h1 className="text-2xl font-bold mb-6">Update Candidate</h1>
            <form className="bg-white p-6 shadow-md rounded" onSubmit={handleSubmit}>
                <label className="block mb-2">Name</label>
                <input
                    type="text"
                    name="name"
                    value={candidate.name}
                    onChange={handleChange}
                    className="border w-full p-2 rounded mb-4"
                />
                <label className="block mb-2">Party</label>
                <input
                    type="text"
                    name="party"
                    value={candidate.party}
                    onChange={handleChange}
                    className="border w-full p-2 rounded mb-4"
                />
                <label className="block mb-2">Age</label>
                <input
                    type="number"
                    name="age"
                    value={candidate.age}
                    onChange={handleChange}
                    className="border w-full p-2 rounded mb-4"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    Update Candidate
                </button>
            </form>
        </div>
    );
}

export default UpdateCandidate;
