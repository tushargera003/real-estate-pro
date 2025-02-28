import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaTrashAlt, FaUserShield } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo?.token;

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUsers(res.data))
      .catch((err) => toast.error("Failed to fetch users"));
  };

  // Function to toggle isAdmin status
  const toggleAdmin = async (id) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo?.token;

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/toggle-admin/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(res.data.message);
      fetchUsers(); // Refresh the user list
    } catch (error) {
      toast.error("Failed to update admin status");
    }
  };

  // Delete User Function
  const deleteUser = async (id) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo?.token;

    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(res.data.message);
      fetchUsers();
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  return (
    <motion.div
      className="p-6 bg-gray-100 min-h-screen flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-3xl font-bold text-gray-800 mb-6"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        Manage Users
      </motion.h1>

      <motion.div
        className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <table className="w-full">
          <thead>
            <tr className="bg-blue-500 text-white text-left">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3 text-center">Role</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <motion.tr
                key={user._id}
                className={`border-b hover:bg-gray-100 transition duration-300 ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3 text-center">
                  {user.isAdmin ? (
                    <motion.button
                      className="bg-green-500 text-white px-3 py-1 rounded-lg flex items-center gap-2 hover:bg-green-600 transition duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleAdmin(user._id)}
                    >
                      <FaUserShield /> Admin
                    </motion.button>
                  ) : (
                    <motion.button
                      className="bg-gray-500 text-white px-3 py-1 rounded-lg flex items-center gap-2 hover:bg-gray-600 transition duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleAdmin(user._id)}
                    >
                      <FaUserShield /> User
                    </motion.button>
                  )}
                </td>
                <td className="p-3 text-center">
                  <motion.button
                    className="bg-red-500 text-white px-3 py-1 rounded-lg flex items-center gap-2 hover:bg-red-600 transition duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => deleteUser(user._id)}
                  >
                    <FaTrashAlt /> Delete
                  </motion.button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  );
};

export default ManageUsers;
