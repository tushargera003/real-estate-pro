import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPhoneAlt,
  FaEnvelope,
  FaWhatsapp,
} from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  const phoneNumber = "+917065600010";
  const whatsappNumber = "917065600010";
  const email = "info@100solutions.in";
  const address =
    "VIRASAHEMA FARMS Farm no 8, Inside Rudra Farm A-7, Green Avenue Street, Vasant Kunj, New Delhi 110070";

  const [emailInput, setEmailInput] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubscribe = async (event) => {
    event.preventDefault();

    if (!emailInput) {
      setError("Please enter an email.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/newsletter/subscribe",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: emailInput }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Subscription successful!");
        setError("");
        setEmailInput(""); // Clear input field
      } else {
        setError(data.message || "Subscription failed.");
        setMessage("");
      }
    } catch (error) {
      setError("Something went wrong. Try again!");
      setMessage("");
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6">
        {/* Brand Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-4 text-orange-400">
            Your Property Doctor
          </h2>
          <p className="text-gray-300">
            Your trusted partner in finding the perfect property-related
            services.
          </p>
        </motion.div>

        {/* Address & Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold mb-4 text-orange-400">Address:</h3>
          <p className="text-gray-400 mb-2">{address}</p>

          <div className="space-y-2">
            <a
              href={`tel:${phoneNumber}`}
              className="flex items-center text-gray-200 hover:text-orange-400 transition-all"
            >
              <FaPhoneAlt className="mr-2" /> {phoneNumber}
            </a>
            <a
              href={`mailto:${email}`}
              className="flex items-center text-gray-200 hover:text-orange-400 transition-all"
            >
              <FaEnvelope className="mr-2" /> {email}
            </a>
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-200 hover:text-orange-400 transition-all"
            >
              <FaWhatsapp className="mr-2" /> {whatsappNumber}
            </a>
          </div>
        </motion.div>

        {/* Social Media */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-xl font-semibold mb-4 text-orange-400">
            Follow Us On
          </h3>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-orange-400 transition-all"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-orange-400 transition-all"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-orange-400 transition-all"
            >
              <FaLinkedinIn size={20} />
            </a>
          </div>
        </motion.div>

        {/* Subscribe to Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-xl font-semibold mb-4 text-orange-400">
            Subscribe to our Newsletter
          </h3>
          <form className="flex flex-col space-y-2" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Enter your email"
              className="p-2 rounded-lg text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
            />
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg transition-all"
            >
              Subscribe
            </button>
          </form>

          {message && <p className="text-green-400 text-sm mt-2">{message}</p>}
          {error && <p className="text-red-400 text-sm mt-2">{error}</p>}

          <p className="text-gray-400 text-sm mt-2">
            Stay updated with the latest offers and services!
          </p>
        </motion.div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-gray-500">
        © {new Date().getFullYear()} Your Property Doctor All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
