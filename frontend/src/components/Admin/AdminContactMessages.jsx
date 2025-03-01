import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

const AdminContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getMessages();
  }, []);

  const getMessages = () => {
    setLoading(true);
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo?.token;
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/getAllContactMessages/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        setMessages(res.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Failed to fetch messages");
        setLoading(false);
      });
  };

  return (
    <motion.div
      className=" min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-8 "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="bg-white/10 backdrop-blur-xl shadow-2xl rounded-2xl p-6 w-full max-w-6xl max-h-[750px] overflow-y-auto"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <motion.h1
          className="text-4xl font-bold text-white text-center mb-6"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          Contact Messages 📩
        </motion.h1>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : messages.length > 0 ? (
          <motion.div
            className="rounded-lg overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <table className="w-full text-white">
              <thead>
                <tr className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                  <th className="p-4 text-left">Name</th>
                  <th className="p-4 text-left">Email</th>
                  <th className="p-4 text-left">Subject</th>
                  <th className="p-4 text-left">Message</th>
                  <th className="p-4 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {messages.map((message, index) => (
                    <motion.tr
                      key={message._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="border-b border-gray-700 hover:bg-gray-700/30 transition-all"
                    >
                      <td className="p-4">{message.name}</td>
                      <td className="p-4">{message.email}</td>
                      <td className="p-4">{message.subject}</td>
                      <td className="p-4 truncate max-w-xs">
                        {message.message}
                      </td>
                      <td className="p-4">
                        {new Date(message.createdAt).toLocaleString()}
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center text-gray-300"
          >
            <p>No messages found.</p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default AdminContactMessages;
