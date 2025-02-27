import React from "react";

const OrderCard = ({ order, onClick }) => {
  // Format the order date
  const orderDate = new Date(order.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Determine status color dynamically
  const statusColors = {
    Completed: "bg-green-100 text-green-700 border-green-400",
    Pending: "bg-yellow-100 text-yellow-700 border-yellow-400",
    Processing: "bg-blue-100 text-blue-700 border-blue-400",
    Cancelled: "bg-red-100 text-red-700 border-red-400",
  };

  return (
    <div className="p-6 border rounded-xl shadow-lg hover:shadow-xl transition transform hover:scale-[1.02] bg-white">
      {/* Order Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-semibold text-xl text-gray-800">
          Order ID: {order._id}
        </h1>
        <span
          className={`px-3 py-1 text-sm font-medium rounded-lg border ${
            statusColors[order.status] ||
            "bg-gray-100 text-gray-700 border-gray-400"
          }`}
        >
          {order.status || "Unknown"}
        </span>
      </div>

      {/* Order Date & Payment */}
      <p className="text-gray-600 mb-2">
        <strong className="text-gray-800">Order Date:</strong> {orderDate}
      </p>
      <p className="text-gray-600 mb-4">
        <strong className="text-gray-800">Payment Method:</strong>{" "}
        {order.paymentMethod || "Not Available"}
      </p>

      {/* Services List with Documents */}
      <div className="mb-4">
        <strong className="text-gray-800">Services & Documents:</strong>
        <div className="mt-2 space-y-3">
          {order.services.map((serviceItem, index) => (
            <div key={index} className="p-3 border rounded-lg bg-gray-50">
              <p className="font-medium text-gray-700">
                {serviceItem.service?.name || "N/A"} - ₹{serviceItem.price}
              </p>

              {serviceItem.documentUrl && (
                <img
                  src={serviceItem.documentUrl}
                  alt={`Document for ${serviceItem.service?.name || "Service"}`}
                  className="mt-2 rounded-lg border max-w-full h-40 object-cover shadow-sm"
                  loading="lazy"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* View Details Button */}
      <button
        onClick={() => onClick(order)}
        className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md"
      >
        View Details
      </button>
    </div>
  );
};

export default OrderCard;
