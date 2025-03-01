import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const NewsletterSubscribers = () => {
  const [subscribers, setSubscribers] = useState([]);

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const token = userInfo?.token;

        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/newsletter/subscribers`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setSubscribers(response.data);
      } catch (error) {
        console.error("Error fetching subscribers:", error);
      }
    };

    fetchSubscribers();
  }, []);

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gray-900 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-3xl"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <motion.h1
          className="text-3xl font-bold text-white text-center mb-6"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          Newsletter Subscribers
        </motion.h1>
        <div className="overflow-x-auto">
          <motion.table
            className="w-full border-collapse text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <thead>
              <tr className="bg-gray-800">
                <th className="p-4">Email</th>
                <th className="p-4">Subscribed At</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.length > 0 ? (
                subscribers.map((subscriber, index) => (
                  <motion.tr
                    key={subscriber._id}
                    className="border-b border-gray-700 hover:bg-gray-800 transition-all duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <td className="p-4">{subscriber.email}</td>
                    <td className="p-4">
                      {new Date(subscriber.subscribedAt).toLocaleString()}
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="text-center p-4 text-gray-400">
                    No subscribers found.
                  </td>
                </tr>
              )}
            </tbody>
          </motion.table>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default NewsletterSubscribers;
