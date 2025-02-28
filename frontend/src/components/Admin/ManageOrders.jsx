import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo?.token;
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setOrders(res.data))
      .catch((err) => console.log(err));
  }, []);

  const updateStatus = async (orderId, newStatus) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const token = userInfo?.token;

      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/${orderId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.status === 200) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const paginatedOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Manage Orders</h1>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <table className="w-full border border-gray-300 shadow-lg rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="p-3">Order ID</th>
              <th className="p-3">User</th>
              <th className="p-3">Email / Phone</th>
              <th className="p-3">Total Amount</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.map((order, index) => (
              <motion.tr
                key={order._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="border-b hover:bg-gray-100 transition"
              >
                <td
                  className="p-3 cursor-pointer text-blue-600 underline hover:text-blue-800"
                  onClick={() => setSelectedOrder(order)}
                >
                  {order._id}
                </td>
                <td className="p-3">{order.user?.name || "Guest"}</td>
                <td className="p-3">
                  {order.user?.phone || order.user?.email || "N/A"}
                </td>
                <td className="p-3 font-semibold text-green-600">
                  ₹{order.totalAmount}
                </td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-sm font-semibold ${
                      order.status === "Pending"
                        ? "bg-yellow-200 text-yellow-700"
                        : order.status === "Processing"
                        ? "bg-blue-200 text-blue-700"
                        : order.status === "Completed"
                        ? "bg-green-200 text-green-700"
                        : "bg-red-200 text-red-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="p-3">
                  <select
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                    value={order.status}
                    className="border p-2 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      <div className="flex justify-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 mx-1 rounded ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white"
          }`}
        >
          Previous
        </button>

        {Array.from(
          { length: Math.ceil(orders.length / ordersPerPage) },
          (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 mx-1 rounded ${
                currentPage === i + 1 ? "bg-blue-700 text-white" : "bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          )
        )}

        <button
          onClick={() =>
            setCurrentPage((prev) =>
              Math.min(prev + 1, Math.ceil(orders.length / ordersPerPage))
            )
          }
          disabled={currentPage === Math.ceil(orders.length / ordersPerPage)}
          className={`px-4 py-2 mx-1 rounded ${
            currentPage === Math.ceil(orders.length / ordersPerPage)
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white"
          }`}
        >
          Next
        </button>
      </div>

      <AnimatePresence>
        {selectedOrder && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-6 rounded-lg shadow-lg w-[400px]"
            >
              <h2 className="text-xl font-bold mb-3">Order Details</h2>
              <p>
                <strong>Order ID:</strong> {selectedOrder._id}
              </p>
              <p>
                <strong>User:</strong> {selectedOrder.user?.name || "Guest"}
              </p>
              <p>
                <strong>Email / Phone:</strong>{" "}
                {selectedOrder.user?.phone ||
                  selectedOrder.user?.email ||
                  "N/A"}
              </p>
              <p>
                <strong>Total Amount:</strong> ₹{selectedOrder.totalAmount}
              </p>
              <p>
                <strong>Status:</strong> {selectedOrder.status}
              </p>

              <h3 className="font-bold mt-4">Ordered Services:</h3>
              <ul className="list-disc pl-5">
                {selectedOrder.services.map((service, index) => (
                  <li key={index} className="mt-2">
                    <p>
                      <strong>
                        {service.service && service.service.name
                          ? service.service.name
                          : "Unknown Service"}
                      </strong>
                    </p>
                    {service.documentUrl ? (
                      <a
                        href={service.documentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        Document
                      </a>
                    ) : (
                      <span className="text-gray-500">
                        No document uploaded
                      </span>
                    )}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => setSelectedOrder(null)}
                className="bg-red-500 text-white px-4 py-2 mt-4 rounded hover:bg-red-600 transition"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageOrders;
