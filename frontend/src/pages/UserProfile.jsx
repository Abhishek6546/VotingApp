import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function UserProfile() {
    const [userdata, setuserdata] = useState(null);
    const [CurrentPasssword, setCurrentpasssword] = useState("");
    const [newPasssword, setnewpasssword] = useState("");
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
    }, []);

    const ChangePassword = async (e) => {
        e.preventDefault();
        try {
            await axios.put("https://votingapp-bj15.onrender.com/user/profile/password", {
                currentPassword: CurrentPasssword,
                newPassword: newPasssword,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            alert("Password updated successfully");
            setCurrentpasssword('')
            setnewpasssword('')
        } catch (error) {
            console.error("Error updating password:", error);
            alert("Failed to update password");
        }
    };
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">

            {/* Profile Information */}
            {!userdata &&  <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>}

            {userdata && <div className="bg-white w-full max-w-3xl p-6 shadow-md rounded-lg">
                <h1 className="text-2xl font-semibold text-gray-800 mb-4">Profile</h1>
                <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                        <div className="h-16 w-16 rounded-full bg-gray-300"></div>
                        <div>
                            <h2 className="text-lg font-medium text-gray-700">{userdata.name}</h2>
                            <p className="text-sm text-gray-500">{userdata.email}</p>
                            <p className="text-sm text-gray-500">{userdata.role}</p>

                        </div>
                    </div>
                    <div className="text-gray-600">
                        <p><span className="font-semibold">Adhaar Number:</span> {userdata.aadharCardNumber }</p>
                        <p><span className="font-semibold">Phone:</span>{userdata.mobile}</p>
                        <p><span className="font-semibold">Address:</span> {userdata.address}</p>
                    </div>
                </div>
            </div>
        }
            
          
          {userdata &&   <div className="bg-white w-full max-w-3xl p-6 shadow-md rounded-lg mt-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Change Password</h2>
                <form onSubmit={ChangePassword} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Current Password</label>
                        <input  onChange={(e)=>setCurrentpasssword(e.target.value)}
                            type="password"
                            name="currentPassword"
                            value={CurrentPasssword}
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter current password"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600">New Password</label>
                        <input onChange={(e)=>setnewpasssword(e.target.value)}
                            type="password" 
                            name="newPassword"
                            value={newPasssword}
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter new password"
                        />
                    </div>
                    <button 
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                    >
                        Update Password
                    </button>
                    
                </form>
            
            </div>}
        </div>
            
    );
}

export default UserProfile;
