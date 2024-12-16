import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const [menu, setmenu] = useState(false);
  const navigate = useNavigate();
  const navItems = [
    {
      id: 1,
      text: "Home",
      link: "/"
    },
    {
      id: 2,
      text: "UserProfile",
      link: "UserProfile"
    },
    {
      id: 3,
      text: "Candidates",
      link: "candidate"
    },
    {
      id: 4,
      text: "Election",
      link: "election"
    },
    {
      id: 5,
      text: "VoteCount",
      link: "votecount"
    },
  ];
  const token = localStorage.getItem("token");
  const handleLogin = () => {
    navigate("/login")
  }
  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/")
  }
  
  return (
    <div className="max-w-screen-2xl container mx-auto px-4 md:px-20 h-16 shadow-md bg-slate-200 top-0 left-0 right-0 z-50">
      <div className="flex justify-between items-center h-16">
        <div className="flex space-x-2">
          <h1 className="font-semibold text-xl cursor-pointer">
            BallotBox
          </h1>
        </div>
        <div>
          {/* Desktop menu */}
          <ul className="hidden md:flex space-x-8">
            {navItems.map(({ id, text, link }) => (
              <li
                className="hover:scale-105 duration-200 cursor-pointer"
                key={id}
              >
                <Link to={link}>{text}</Link>
              </li>
            ))}
            {!token ? (
              <button onClick={handleLogin} className="px-2 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200">
                Login
              </button>
            ) : <button onClick={handleLogOut} className="px-2 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200">
              LogOut
            </button>
            }

          </ul>

          {/* Hamburger Menu */}
          <div
            onClick={() => setmenu(!menu)}
            className="md:hidden text-2xl cursor-pointer"
          >
            {menu ? "✕" : "☰"}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menu && (
        <div className="absolute top-16 left-0 w-full bg-white">
          <ul className="flex flex-col items-center space-y-3 text-xl py-4">
            {navItems.map(({ id, text, link }) => (
              <li key={id}>
                <Link
                  to={link}
                  onClick={() => setmenu(!menu)}
                >
                  {text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Navbar;
