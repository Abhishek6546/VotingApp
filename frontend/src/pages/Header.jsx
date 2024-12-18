import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <>
    <header className="bg-gray-100 py-20 ">
    <div className="container mx-auto text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to BallotBox</h1>
      <p className="text-lg text-gray-600 mb-8">
        Make voting seamless and accessible for everyone. Join us to cast your votes in a secure and reliable way.
      </p>
     <Link to={"/UserProfile"}>
     <button className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700">
        Get Started
      </button>
     </Link>
    </div>
  </header>

   
    <section className="py-20">
      <div className="  container mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white shadow-md rounded hover:scale-105 transition-all duration-300">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Secure Voting</h3>
            <p className="text-gray-600">
              Ensure every vote is safe with end-to-end encryption.
            </p>
          </div>
          <div className="p-6 bg-white shadow-md rounded hover:scale-105 transition-all duration-300">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Real-time Results</h3>
            <p className="text-gray-600">
              Get instant results after voting ends.
            </p>
          </div>
          <div className="p-6 mr-4 bg-white shadow-md rounded hover:scale-105 transition-all duration-300">
            <h3 className="text-xl font-bold text-gray-800 mb-2">User-Friendly</h3>
            <p className="text-gray-600">
              An intuitive interface for easy navigation and use.
            </p>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default Header