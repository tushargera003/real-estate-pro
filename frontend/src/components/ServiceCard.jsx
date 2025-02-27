import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddToCartForm from "./AddToCartForm";

const ServiceCard = ({ service }) => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="border rounded-xl p-4 shadow-lg hover:shadow-xl transition transform hover:scale-[1.02] bg-white">
      {/* Service Image */}
      <div className="relative w-full h-40 overflow-hidden rounded-lg">
        <img
          src={service.images[0] || "https://via.placeholder.com/400x250"}
          alt={service.name}
          className="w-full h-full object-cover rounded-lg shadow-sm"
        />
      </div>

      {/* Service Details */}
      <h3 className="font-semibold text-lg mt-3 text-gray-800">
        {service.name}
      </h3>
      <p className="text-gray-600 mt-1">
        <strong className="text-gray-800">Price:</strong> ₹{service.price}
      </p>

      {/* Buttons */}
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md"
        >
          {showForm ? "Cancel" : "Add to Cart"}
        </button>
        <button
          onClick={() => navigate(`/services/${service._id}`)}
          className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition shadow-md"
        >
          View Details
        </button>
      </div>

      {/* Add to Cart Form */}
      {showForm && (
        <div className="mt-4 border rounded-lg p-4 bg-gray-50">
          <AddToCartForm service={service} onClose={() => setShowForm(false)} />
        </div>
      )}
    </div>
  );
};

export default ServiceCard;
