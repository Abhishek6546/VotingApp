import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Election() {
    const [candidates, setCandidates] = useState([]);
    const [userdata, setuserdata] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
          // Redirect to login if token is missing
          navigate("/login");
          return;
        }
        const getUserData = async () => {
            try {
                const user = await axios.get("https://votingapp-bj15.onrender.com/user/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setuserdata(user.data.user);
             
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        getUserData();
        const fetchCandidates = async () => {
            try {
                const response = await axios.get("https://votingapp-bj15.onrender.com/candidate", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setCandidates(response.data);
              
            } catch (error) {
                console.error("Error fetching candidates:", error);
            }
        };
        fetchCandidates();
    }, [userdata]);

    const handleVote = async (id) => {
        try {
            const response = await axios.put(
                `https://votingapp-bj15.onrender.com/candidate/vote/${id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            if (response.status === 200) {
                alert("Vote successfully cast!");
            }
        } catch (error) {
            console.error("Error casting vote:", error);
            alert("Unable to cast vote. Please try again.");
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            {/* Header Section */}
            <div className="max-w-4xl mx-auto mb-8 text-center">
                <h1 className="text-3xl font-bold text-gray-800">Election</h1>
                <p className="text-gray-600">Vote for your preferred candidate below!</p>
            </div>

            {/* Candidate List */}
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                <ul className="space-y-6">
                    {candidates.length > 0 ? (
                        candidates.map((candidate) => (
                            <li
                                key={candidate._id}
                                className="flex justify-between items-center border-b last:border-none pb-4"
                            >
                                <div>
                                    <p className="text-xl font-medium text-gray-800">{candidate.name}</p>
                                    <p className="text-sm text-gray-500">Party: {candidate.party}</p>
                                    <p className="text-sm text-gray-500">Age: {candidate.age}</p>
                                    <p className="text-sm text-gray-500">Current Votes: {candidate.voteCount}</p>
                                </div>

                                { userdata && !userdata.isVoted ? (
                                    <button
                                        onClick={() => handleVote(candidate._id)}
                                        className="bg-blue-500 text-white py-2 px-4 rounded-md shadow hover:bg-blue-600 transition"
                                    >
                                        Vote Now
                                    </button>
                                ) : (
                                    <p className="text-green-600 font-bold">Thank you for voting!</p>
                                )}
                            </li>
                        ))
                    ) : (
                        <p className="text-gray-500">No candidates available.</p>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default Election;
