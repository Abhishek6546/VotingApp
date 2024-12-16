import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function VoteCount() {
  const [votes, setVotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      // Redirect to login if token is missing
      navigate("/login");
      return;
    }
    const fetchVotes = async () => {
      try {
        const response = await axios.get('https://votingapp-bj15.onrender.com/candidate/votes');
        setVotes(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching vote data:', error);
        setLoading(false);
      }
    };

    fetchVotes();
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md h-screen">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Vote Count</h1>
      {votes.length === 0 ? (
        <p className="text-gray-600">No vote data available.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Party</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Votes</th>
            </tr>
          </thead>
          <tbody>
            {votes.map((vote, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{vote.name}</td>
                <td className="border border-gray-300 px-4 py-2">{vote.party}</td>
                <td className="border border-gray-300 px-4 py-2">{vote.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default VoteCount;
