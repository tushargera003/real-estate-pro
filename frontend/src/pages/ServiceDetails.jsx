import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import AddToCartForm from "../components/AddToCartForm";

const ServiceDetails = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [showForm, setShowForm] = useState(false); // ✅ Add state for form visibility

  useEffect(() => {
    const fetchService = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/services/${id}`
        );
        setService(data);
      } catch (err) {
        console.error("API Error:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchService();

    const timer = setTimeout(() => {
      setShowContent(true);
    }, 300);

    return () => clearTimeout(timer);
  }, [id]);

  if (!showContent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <video
          src="https://lottie.host/ae495b06-be36-4920-9e29-840f163c7f75/7SaobG7zvf.mp4"
          autoPlay
          loop
          muted
          className="w-48 h-48"
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 min-h-screen flex justify-center">
      <div className="max-w-3xl w-full bg-white shadow-md rounded-lg p-6">
        {loading ? (
          <div className="animate-pulse">
            <div className="h-8 w-3/4 bg-gray-300 rounded mb-4"></div>
            <div className="h-64 bg-gray-300 rounded-lg shadow-md mb-4"></div>
            <div className="h-4 w-full bg-gray-300 rounded mb-2"></div>
            <div className="h-4 w-5/6 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 w-4/6 bg-gray-300 rounded mb-4"></div>
            <div className="h-6 w-32 bg-gray-300 rounded"></div>
          </div>
        ) : service ? (
          <>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {service.name}
            </h2>
            <img
              src={
                service?.images?.[0] || "https://via.placeholder.com/400x250"
              }
              alt={service.name}
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />
            <p className="mt-4 text-lg text-gray-700 leading-relaxed">
              {service.description}
            </p>
            <p className="mt-3 text-xl font-bold text-blue-600">
              Price: ₹{service.price.toLocaleString()}
            </p>

            {/* ✅ Button to show/hide the form */}
            <div className="mt-6">
              <button
                onClick={() => setShowForm(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Add to Cart
              </button>
            </div>

            {/* ✅ Show form only when `showForm` is true */}
            {showForm && (
              <AddToCartForm
                service={service}
                onClose={() => setShowForm(false)}
              />
            )}
          </>
        ) : (
          <div className="text-center py-10">
            <h2 className="text-2xl text-red-500 font-semibold">
              Service Not Found
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceDetails;
