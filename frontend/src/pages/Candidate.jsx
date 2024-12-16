import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Candidate() {
    const [candidateData, setCandidateData] = useState([]);

    // Fetch candidates
    useEffect(() => {
        const getCandidateData = async () => {
            try {
                const response = await axios.get("http://localhost:3000/candidate/candidates", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setCandidateData(response.data);
            } catch (error) {
                console.error("Error fetching candidate data:", error);
            }
        };
        getCandidateData();
    }, []);

    // Delete candidate
    const deleteCandidate = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/candidate/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            // Remove candidate from state after successful deletion
            setCandidateData(candidateData.filter((candidate) => candidate._id !== id));
        } catch (error) {
            console.error("Error deleting candidate:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            {/* Header Section */}
            <div className="flex justify-between items-center max-w-4xl mx-auto mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Candidates</h1>
             {candidateData.role==="admin" && (
                   <Link to={"/create"}>
                   <button className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 transition">
                       Create New Candidate
                   </button>
               </Link>
             )}
            </div>

            {/* Candidate List */}
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                <ul className="space-y-4">
                    {candidateData.length > 0 ? (
                        candidateData.map((candidate) => (
                            <li
                                key={candidate._id}
                                className="flex justify-between items-center border-b last:border-none py-3"
                            >
                                <div>
                                    <p className="text-lg font-medium text-gray-800">{candidate.name}</p>
                                    <p className="text-sm text-gray-500">{candidate.party}</p>
                                </div>
                            {candidate.role==="admin" && (
                                    <div className="flex space-x-4">
                                    <Link to={`${candidate._id}`}>
                                        <button className="text-blue-500 hover:underline">Update</button>
                                    </Link>
                                    <button
                                        onClick={() => deleteCandidate(candidate._id)}
                                        className="bg-red-500 text-white py-1 px-3 rounded-md shadow hover:bg-red-600 transition"
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                            </li>
                        ))
                    ) : (
                        <p className="text-gray-500">No candidates found.</p>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default Candidate;
