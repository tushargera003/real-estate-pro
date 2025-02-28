import React from "react";
import { motion } from "framer-motion";

const DocsPage = () => {
  const letters = "DOCUMENT".split("");

  return (
    <div className="bg-[#f9f9f9] min-h-screen font-sans flex flex-col items-center w-full">
      {/* Hero Section */}
      <section className="relative w-full max-w-6xl h-[400px] bg-gradient-to-r from-blue-500 to-purple-500 flex flex-col items-center justify-center text-white rounded-lg shadow-lg mt-6 p-6">
        <div className="flex text-6xl font-extrabold space-x-2">
          {letters.map((letter, index) => (
            <motion.span
              key={index}
              className="text-orange-400"
              initial={{ y: -20 }}
              animate={{ y: [20, -20, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: index * 0.2,
              }}
            >
              {letter}
            </motion.span>
          ))}
        </div>
        <p className="text-lg mt-3 text-center italic">
          “Real Estate Pro - Documenting the Path to Success”
        </p>
      </section>

      {/* Introduction Section */}
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-10 text-center mt-6">
        <h2 className="text-4xl font-bold text-gray-800">
          Welcome to <span className="text-blue-500">R</span>
          <span className="text-orange-500">E</span>
          <span className="text-blue-500">P</span>
        </h2>
        <p className="mt-4 text-gray-600 text-lg">
          The Delhi Development Authority (DDA) was created in 1957 under the
          provisions of the Delhi Development Act to "promote and secure the
          development of Delhi."
        </p>
        <button className="mt-6 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full shadow-lg hover:scale-105 transition-transform">
          Know More
        </button>
      </div>

      {/* What's New Section */}
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-10 mt-6">
        <h3 className="text-3xl font-semibold text-orange-500">What's New</h3>
        <ul className="mt-4 space-y-4 text-gray-700 text-lg">
          <li className="border-l-4 border-orange-500 pl-4">
            Offering of 1000 additional EWS flats in Narela under Sabka Ghar
            Awaas Yojana 2025 - 10.02.2025
            <span className="text-red-500 ml-2 font-bold">New</span>
          </li>
          <li className="border-l-4 border-blue-500 pl-4">
            Circular removal of one flat from DDA Special Housing Scheme 2025
            e-auction - 04.02.2025
            <span className="text-red-500 ml-2 font-bold">New</span>
          </li>
        </ul>
        <button className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full shadow-lg hover:scale-105 transition-transform">
          View All
        </button>
      </div>

      {/* Photo Gallery */}
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-10 mt-6">
        <h3 className="text-3xl font-semibold text-blue-500">Photo Gallery</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <img
            src="https://th.bing.com/th?id=OIP.P3sm5urm-H28xcZXRxfaTgHaEz&w=310&h=201&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"
            alt="Gallery"
            className="rounded-lg shadow-md hover:scale-105 transition-transform w-full h-64 object-cover"
          />
          <img
            src="https://th.bing.com/th?id=OIP.P3sm5urm-H28xcZXRxfaTgHaEz&w=310&h=201&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"
            alt="Gallery"
            className="rounded-lg shadow-md hover:scale-105 transition-transform w-full h-64 object-cover"
          />
          <img
            src="https://th.bing.com/th?id=OIP.odSm-Lqc9Au-acbkdUboowHaE-&w=304&h=205&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"
            alt="Gallery"
            className="rounded-lg shadow-md hover:scale-105 transition-transform w-full h-64 object-cover"
          />
        </div>
      </div>

      {/* Trusted Logos */}
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-10 text-center mt-6">
        <p className="text-lg font-bold text-gray-700">
          TRUSTED BY OVER MILLION USERS
        </p>
        <div className="flex justify-center items-center space-x-6 mt-4">
          <img
            src="https://yourpropertydoctor.com/assets/mcd%20logo.png"
            alt="MCD Logo"
            className="h-20 w-20 object-contain"
          />
          <img
            src="https://yourpropertydoctor.com/assets/dda%20logo.png"
            alt="DDA Logo"
            className="h-20 w-20 object-contain"
          />
          <img
            src="https://yourpropertydoctor.com/assets/delhi%20fire%20services.png"
            alt="Delhi Fire Services"
            className="h-20 w-20 object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default DocsPage;
