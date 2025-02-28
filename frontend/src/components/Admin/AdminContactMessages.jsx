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
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 p-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-gray-800 mb-6 text-center"
      >
        Contact Messages
      </motion.h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : messages.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <table className="w-full">
            <thead className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              <tr>
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
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-4 border-b">{message.name}</td>
                    <td className="p-4 border-b">{message.email}</td>
                    <td className="p-4 border-b">{message.subject}</td>
                    <td className="p-4 border-b">{message.message}</td>
                    <td className="p-4 border-b">
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
          className="text-center text-gray-600"
        >
          <p>No messages found.</p>
        </motion.div>
      )}
    </div>
  );
};

export default AdminContactMessages;
