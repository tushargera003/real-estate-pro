import React, { useEffect, useState } from "react";
import axios from "axios";
import OrderCard from "../components/OrderCard";
import { useSelector } from "react-redux";
import Modal from "react-modal";

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

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <main className="container mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
          My Orders
        </h1>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-lg text-gray-600 animate-pulse">Loading...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="h-64 flex items-center justify-center">
            <p className="text-lg text-gray-500">No orders found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders
              .slice()
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((order) => (
                <div
                  key={order._id}
                  className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-all cursor-pointer"
                  onClick={() => setSelectedOrder(order)}
                >
                  <OrderCard order={order} />
                </div>
              ))}
          </div>
        )}

        {selectedOrder && (
          <Modal
            isOpen={!!selectedOrder}
            onRequestClose={() => setSelectedOrder(null)}
            className="max-w-lg w-full bg-white p-6 rounded-lg shadow-xl outline-none"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4"
          >
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Order Details
            </h2>
            <div className="space-y-2 text-gray-700">
              <p>
                <strong>Order ID:</strong> {selectedOrder._id}
              </p>
              <p>
                <strong>Payment Method:</strong> {selectedOrder.paymentMethod}
              </p>
              <p>
                <strong>Services:</strong>
              </p>
              <ul className="list-disc list-inside pl-4 space-y-1">
                {selectedOrder.services.map((service, index) => (
                  <li key={index} className="font-medium">
                    {service.service?.name || "N/A"} - ₹{service.price}
                  </li>
                ))}
              </ul>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`font-medium px-2 py-1 rounded ${
                    selectedOrder.status === "Completed"
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {selectedOrder.status}
                </span>
              </p>
            </div>
            <button
              onClick={() => setSelectedOrder(null)}
              className="mt-6 w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Close
            </button>
          </Modal>
        )}
      </main>
    </div>
  );
};

export default MyOrders;
