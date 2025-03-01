import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddToCartForm from "./AddToCartForm";
import { FaShoppingCart, FaInfoCircle } from "react-icons/fa";

const ServiceCard = ({ service }) => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="border rounded-xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] bg-white max-h-[400px] min-h-[400px]">
      {/* Service Image */}
      <div className="relative w-full h-48 overflow-hidden rounded-lg">
        <img
          src={service.images[0]}
          alt={service.name}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Service Details */}
      <div className="mt-4">
        <h3 className="font-semibold text-xl text-gray-900">{service.name}</h3>
        <p className="text-gray-600 mt-2">
          <span className="font-medium text-gray-800">Price:</span>{" "}
          {service.priceType === "fixed"
            ? `₹${service.price}`
            : `₹${service.price} per sq. ft`}
        </p>
        {service.priceType === "perUnit" && (
          <p className="text-sm text-gray-500 mt-1">
            (Price calculated based on length and width)
          </p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex gap-3 mt-6">
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-md"
        >
          <FaShoppingCart className="w-5 h-5" />
          {showForm ? "Cancel" : "Add to Cart"}
        </button>
        <button
          onClick={() => navigate(`/services/${service._id}`)}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all shadow-md"
        >
          <FaInfoCircle className="w-5 h-5" />
          View Details
        </button>
      </div>

      {/* Add to Cart Form */}
      {showForm && (
        <div className="mt-6 border-t pt-6">
          <AddToCartForm service={service} onClose={() => setShowForm(false)} />
        </div>
      )}
    </div>
  );
};

export default ServiceCard;
