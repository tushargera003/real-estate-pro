import React, { useEffect, useState } from "react";
import axios from "axios";
import ServiceCard from "../components/ServiceCard";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { motion } from "framer-motion";

const Services = () => {
  const [services, setServices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 6; // ✅ `servicesPerPage` ko define kiya

  // ✅ Fetch services with pagination
  const fetchServices = async (page = 1) => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/services?page=${page}&limit=${itemsPerPage}`
      );

      console.log("Fetched Data:", JSON.stringify(data, null, 2));
      setServices(data.services || []); // ✅ Ensure data is an array
      setTotalPages(data.totalPages || 1);
      setCurrentPage(data.currentPage || 1);
    } catch (err) {
      console.error("Error fetching services:", err);
      setServices([]);
      console.log("hello"); // ✅ Prevent undefined issues
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices(currentPage);
    console.log("Current Page:", currentPage);
    console.log("Updated Services:", services);
  }, [currentPage]); // ✅ Fetch data whenever currentPage changes

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center items-center min-h-screen bg-gray-50"
      >
        <div className="text-center">
          <DotLottieReact
            src="https://lottie.host/1194f669-3ff3-4ff7-b5fa-44104f79386e/T8KPBDjKYR.lottie"
            loop
            autoplay
            style={{ width: "200px", height: "200px" }}
          />
          <p className="text-gray-600 mt-4">Loading services...</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="container mx-auto py-10"
    >
      <motion.h1 className="text-3xl font-bold mb-8 text-center">
        Our Services
      </motion.h1>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        initial="hidden"
        animate="visible"
      >
        {services.length > 0 ? (
          services.map((service) => (
            <motion.div key={service._id}>
              <ServiceCard service={service} />
            </motion.div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-3">
            No services available
          </p>
        )}
      </motion.div>

      {/* ✅ Pagination UI */}
      <div className="flex justify-center mt-6 space-x-3">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-md ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 rounded-md ${
              currentPage === index + 1
                ? "bg-blue-700 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-md ${
            currentPage === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Next
        </button>
      </div>
    </motion.div>
  );
};

export default Services;
