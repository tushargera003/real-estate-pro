import React from "react";
import { useParams, Link } from "react-router-dom";

const dummyOrders = {
  ORD001: {
    id: "ORD001",
    date: "2025-02-01",
    total: 7500,
    status: "Delivered",
    items: ["Property Valuation", "Legal Document Verification"],
  },
  ORD002: {
    id: "ORD002",
    date: "2025-02-05",
    total: 5000,
    status: "Processing",
    items: ["Land Survey", "Consultation"],
  },
  ORD003: {
    id: "ORD003",
    date: "2025-02-10",
    total: 8200,
    status: "Shipped",
    items: ["Property Listing", "Advisory"],
  },
  ORD004: {
    id: "ORD004",
    date: "2025-02-15",
    total: 9400,
    status: "Cancelled",
    items: ["Market Analysis", "Professional Services"],
  },
  ORD005: {
    id: "ORD005",
    date: "2025-02-20",
    total: 6700,
    status: "Delivered",
    items: ["Title Search", "Documentation"],
  },
};

const OrderDetails = () => {
  const { id } = useParams();
  const order = dummyOrders[id];

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
        <h2 className="text-3xl font-semibold text-red-500">Order Not Found</h2>
        <Link
          to="/my-orders"
          className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
        >
          Back to Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Order Details
      </h1>
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-8 border">
        <div className="space-y-4">
          <p className="text-lg">
            <strong className="font-semibold">Order ID:</strong> {order.id}
          </p>
          <p className="text-lg">
            <strong className="font-semibold">Date:</strong> {order.date}
          </p>
          <p className="text-lg flex items-center">
            <strong className="font-semibold mr-2">Status:</strong>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                order.status === "Delivered"
                  ? "bg-green-100 text-green-700"
                  : order.status === "Cancelled"
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {order.status}
            </span>
          </p>
          <p className="text-lg">
            <strong className="font-semibold">Total Amount:</strong> ₹
            {order.total.toLocaleString()}
          </p>
          <div>
            <strong className="font-semibold text-lg">Items:</strong>
            <ul className="list-disc pl-6 mt-2 text-gray-700 space-y-1">
              {order.items.map((item, index) => (
                <li key={index} className="text-lg">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-6 text-center">
          <Link
            to="/my-orders"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
          >
            Back to Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
