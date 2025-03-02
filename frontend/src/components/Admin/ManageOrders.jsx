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
    <div className=" bg-gradient-to-br from-gray-900 to-gray-800 p-5  overflow-y-auto h-full">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-center text-purple-400 mb-8">
          Manage Orders
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-gray-800/70 backdrop-blur-lg rounded-lg shadow-lg p-6 border border-gray-700/50"
        >
          <table className="w-full">
            <thead>
              <tr className="bg-gray-700/50 rounded-t-lg">
                <th className="py-2 px-2 text-left text-purple-400 font-semibold">
                  Order ID
                </th>
                <th className="py-2 px-2 text-left text-purple-400 font-semibold">
                  User
                </th>
                <th className="py-2 px-2 text-left text-purple-400 font-semibold">
                  Email / Phone
                </th>
                <th className="py-2 px-2 text-left text-purple-400 font-semibold">
                  Total Amount
                </th>
                <th className="py-2 px-2 text-left text-purple-400 font-semibold">
                  Status
                </th>
                <th className="py-2 px-2 text-left text-purple-400 font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedOrders.map((order, index) => (
                <motion.tr
                  key={order._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors duration-200"
                >
                  <td
                    className="py-2 px-2 text-purple-300 cursor-pointer underline hover:text-purple-400 overflow-hidden text-ellipsis whitespace-nowrap"
                    onClick={() => setSelectedOrder(order)}
                  >
                    {order._id}
                  </td>
                  <td className="py-2 px-2 text-purple-300 overflow-hidden text-ellipsis whitespace-nowrap">
                    {order.user?.name || "Guest"}
                  </td>
                  <td className="py-2 px-2 text-purple-300 overflow-hidden text-ellipsis whitespace-nowrap">
                    {order.user?.email || order.user?.phone || "N/A"}
                  </td>
                  <td className="py-2 px-2 text-purple-300 font-semibold overflow-hidden text-ellipsis whitespace-nowrap">
                    ₹{order.totalAmount}
                  </td>
                  <td className="py-2 px-2 overflow-hidden text-ellipsis whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-semibold ${
                        order.status === "Pending"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : order.status === "Processing"
                          ? "bg-blue-500/20 text-blue-400"
                          : order.status === "Completed"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-2 px-2 overflow-hidden text-ellipsis whitespace-nowrap">
                    <select
                      onChange={(e) => updateStatus(order._id, e.target.value)}
                      value={order.status}
                      className="bg-gray-700/50 border border-gray-600 text-purple-300 p-1 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
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

        <div className="flex justify-center mt-6">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 mx-1 rounded ${
              currentPage === 1
                ? "bg-gray-700/50 cursor-not-allowed text-gray-500"
                : "bg-purple-500/50 text-purple-300 hover:bg-purple-500/70"
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
                  currentPage === i + 1
                    ? "bg-purple-500/70 text-purple-100"
                    : "bg-gray-700/50 text-purple-300 hover:bg-gray-700/70"
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
                ? "bg-gray-700/50 cursor-not-allowed text-gray-500"
                : "bg-purple-500/50 text-purple-300 hover:bg-purple-500/70"
            }`}
          >
            Next
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedOrder && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-800/90 backdrop-blur-lg p-6 rounded-lg shadow-lg w-[400px] border border-gray-700/50"
            >
              <h2 className="text-2xl font-bold mb-4 text-purple-400">
                Order Details
              </h2>
              <div className="space-y-3 text-purple-300">
                <p>
                  <strong>Order ID:</strong> {selectedOrder._id}
                </p>
                <p>
                  <strong>User:</strong> {selectedOrder.user?.name || "Guest"}
                </p>
                <p>
                  <strong>Email:</strong> {selectedOrder.user?.email || "N/A"}
                </p>
                <p>
                  <strong>Phone:</strong> {selectedOrder.user?.phone || "N/A"}
                </p>
                <p>
                  <strong>Total Amount:</strong> ₹{selectedOrder.totalAmount}
                </p>
                <p>
                  <strong>Status:</strong> {selectedOrder.status}
                </p>

                <h3 className="font-bold mt-4 text-purple-400">
                  Ordered Services:
                </h3>
                <ul className="list-disc pl-5">
                  {selectedOrder.services.map((service, index) => (
                    <li key={index} className="mt-2">
                      <p>
                        <strong>
                          {service.service?.name || "Unknown Service"}
                        </strong>
                      </p>
                      <p>
                        <strong>Price:</strong> ₹{service.price}
                      </p>
                      {service.width && service.length && (
                        <p>
                          <strong>Dimensions:</strong> {service.width} ft (W) x{" "}
                          {service.length} ft (L)
                        </p>
                      )}
                      {service.documentUrl ? (
                        <a
                          href={service.documentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 underline hover:text-blue-300"
                        >
                          View Document
                        </a>
                      ) : (
                        <span className="text-gray-400">
                          No document uploaded
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => setSelectedOrder(null)}
                className="bg-red-500/50 text-red-300 px-4 py-2 mt-4 rounded hover:bg-red-500/70 transition"
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
