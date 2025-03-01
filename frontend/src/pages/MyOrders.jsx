import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Modal from "react-modal";
import { FaFilePdf, FaTimes } from "react-icons/fa";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const token = userInfo?.token;

        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/orders/myorders`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setOrders(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching orders:", error.response?.data || error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userInfo]);

  // Format date and time
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString(),
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          My Orders
        </h1>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : orders.length === 0 ? (
          <div className="h-64 flex items-center justify-center">
            <p className="text-lg text-gray-600">No orders found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders
              .slice()
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((order) => {
                const { date, time } = formatDateTime(order.createdAt);
                return (
                  <div
                    key={order._id}
                    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer"
                    onClick={() => setSelectedOrder(order)}
                  >
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm text-gray-500">
                        {date} at {time}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          order.status === "Completed"
                            ? "bg-green-100 text-green-600"
                            : "bg-yellow-100 text-yellow-600"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                      Order #{order._id.slice(-6).toUpperCase()}
                    </h2>
                    <p className="text-gray-600 mb-4">
                      Total: ₹{order.totalAmount}
                    </p>
                    <div className="space-y-2">
                      {order.services.slice(0, 2).map((service, index) => (
                        <div key={index} className="text-gray-700">
                          <p className="font-medium">
                            {service.service?.name || "N/A"}
                          </p>
                          <p className="text-sm">₹{service.price}</p>
                        </div>
                      ))}
                      {order.services.length > 2 && (
                        <p className="text-sm text-gray-500">
                          +{order.services.length - 2} more services
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        )}

        {selectedOrder && (
          <Modal
            isOpen={!!selectedOrder}
            onRequestClose={() => setSelectedOrder(null)}
            className="max-w-2xl w-full bg-white p-8 rounded-xl shadow-2xl outline-none"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Order Details
              </h2>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Order ID</p>
                  <p className="font-medium text-gray-900">
                    {selectedOrder._id}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Payment Method</p>
                  <p className="font-medium text-gray-900">
                    {selectedOrder.paymentMethod}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Order Date</p>
                  <p className="font-medium text-gray-900">
                    {formatDateTime(selectedOrder.createdAt).date} at{" "}
                    {formatDateTime(selectedOrder.createdAt).time}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <p
                    className={`font-medium px-3 py-1 rounded-full text-sm ${
                      selectedOrder.status === "Completed"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {selectedOrder.status}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Services
                </h3>
                <div className="space-y-4">
                  {selectedOrder.services.map((service, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <p className="font-medium text-gray-900">
                          {service.service?.name || "N/A"}
                        </p>
                        <p className="text-gray-600">₹{service.price}</p>
                      </div>
                      {(service.width > 0 || service.length > 0) && (
                        <div className="mt-2 text-sm text-gray-600">
                          <p>
                            <strong>Dimensions:</strong> {service.width}m x{" "}
                            {service.length}m
                          </p>
                        </div>
                      )}
                      {service.documentUrl && (
                        <div className="mt-2">
                          <a
                            href={service.documentUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-purple-600 hover:text-purple-800"
                          >
                            <FaFilePdf className="mr-2" />
                            View Document
                          </a>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
