import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroImage from "../assets/ypd.jpeg";

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-blue-900 to-blue-700 py-20 text-white">
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Find Real Estate Pro 🏡
          </h1>
          <p className="text-lg text-gray-200 mt-4">
            Explore the best properties with top-notch services tailored to your
            needs.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link
              to="/services"
              className="mt-6 inline-block bg-yellow-500 text-black px-6 py-3 rounded-xl text-lg font-semibold shadow-lg hover:bg-yellow-400 hover:scale-105 transition-all duration-300"
            >
              Explore Services
            </Link>
          </motion.div>
        </motion.div>

        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center"
        >
          <div className="bg-white/10 p-4 rounded-2xl shadow-xl backdrop-blur-lg">
            <img
              src={heroImage}
              alt="Real Estate"
              className="rounded-xl w-full max-w-md"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
