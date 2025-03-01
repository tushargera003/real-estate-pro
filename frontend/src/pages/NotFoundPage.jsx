import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600 font-sans">
      {/* Glassmorphism Card */}
      <motion.div
        className="bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl p-10 text-center relative overflow-hidden"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        {/* Glowing Background Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-indigo-400/20 blur-2xl animate-pulse"></div>

        {/* Content */}
        <div className="relative z-10">
          {/* 404 Text with Animation */}
          <motion.h1
            className="text-9xl font-bold text-white drop-shadow-2xl"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            404
          </motion.h1>

          {/* Message */}
          <motion.p
            className="text-2xl text-white/90 mt-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Oops! Page Not Found
          </motion.p>

          {/* Description */}
          <motion.p
            className="text-lg text-white/80 mt-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            The page you're looking for doesn't exist or has been moved.
          </motion.p>

          {/* Back to Home Button */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link
              to="/"
              className="mt-8 inline-block px-6 py-3 bg-white text-purple-600 rounded-full font-semibold hover:bg-purple-100 transition-all duration-300 shadow-lg"
            >
              Go Back Home
            </Link>
          </motion.div>
        </div>

        {/* Floating Icons */}
        <motion.div
          className="absolute -top-20 -left-20 w-40 h-40 bg-purple-400/30 rounded-full blur-2xl"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, delay: 1 }}
        />
        <motion.div
          className="absolute -bottom-20 -right-20 w-40 h-40 bg-indigo-400/30 rounded-full blur-2xl"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        />
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
