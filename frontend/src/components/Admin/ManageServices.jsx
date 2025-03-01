import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageServices = () => {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({
    name: "",
    price: "",
    description: "",
    document: null,
    priceType: "fixed", // Default value
    requiresDimensions: false,
    requiresDocument: false,
  });
  // const [editService, setEditService] = useState({
  //   name: "",
  //   price: "",
  //   description: "",
  //   document: null,
  //   priceType: "fixed", // Default value
  //   requiresDimensions: false,
  //   requiresDocument: false,
  // });
  const [editService, setEditService] = useState(null); // Initialize as null
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 5;

  // Handle File Change Function
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewService({ ...newService, document: file });
    }
  };

  // Upload Image to Cloudinary
  const uploadImageToCloudinary = async (file) => {
    if (!file) return null;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/uploads`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      return data.url;
    } catch (err) {
      console.error("Upload failed:", err);
      toast.error("Document upload failed!");
      return null;
    }
  };

  // Fetch Services
  const fetchServices = async (page = 1) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const token = userInfo?.token;

      const { data } = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/admin/services?page=${page}&limit=${itemsPerPage}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setServices(data.services || []);
      setTotalPages(data.totalPages || 1);
      setCurrentPage(data.currentPage || 1);
    } catch (err) {
      console.error("Error fetching services:", err);
      toast.error("Failed to fetch services.");
      setServices([]);
    }
  };

  useEffect(() => {
    fetchServices(currentPage);
  }, [currentPage]);

  // Add Service
  const addService = async () => {
    if (
      !newService.name ||
      !newService.price ||
      !newService.description ||
      !newService.document
    ) {
      toast.error("All fields are required!");
      return;
    }

    try {
      setLoading(true);
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const token = userInfo?.token;

      let documentUrl = await uploadImageToCloudinary(newService.document);
      if (!documentUrl) {
        toast.error("Document upload failed!");
        return;
      }

      const serviceData = {
        name: newService.name,
        price: newService.price,
        description: newService.description,
        document: documentUrl,
        images: [documentUrl],
        priceType: newService.priceType,
        requiresDimensions: newService.requiresDimensions,
        requiresDocument: newService.requiresDocument,
        active: true,
      };

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/services`,
        serviceData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      fetchServices(currentPage);
      setNewService({
        name: "",
        price: "",
        description: "",
        document: null,
        priceType: "fixed",
        requiresDimensions: false,
        requiresDocument: false,
      });
      toast.success("Service added successfully!");
    } catch (err) {
      console.error("Error adding service:", err);
      toast.error("Failed to add service.");
    } finally {
      setLoading(false);
    }
  };

  // Update Service
  const updateService = async () => {
    if (!editService.name || !editService.price || !editService.description) {
      toast.error("All fields are required!");
      return;
    }

    try {
      setLoading(true);
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const token = userInfo?.token;

      let documentUrl = editService.document;

      if (editService.document instanceof File) {
        documentUrl = await uploadImageToCloudinary(editService.document);
        if (!documentUrl) {
          toast.error("Document upload failed!");
          return;
        }
      }

      const updatedData = {
        name: editService.name,
        price: editService.price,
        description: editService.description,
        document: documentUrl,
        images: [documentUrl],
        priceType: editService.priceType,
        requiresDimensions: editService.requiresDimensions,
        requiresDocument: editService.requiresDocument,
        active: editService.active,
      };

      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/services/${
          editService._id
        }`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      await fetchServices(currentPage);
      setEditService(null);
      toast.success("Service updated successfully!");
    } catch (err) {
      console.error("Error updating service:", err);
      toast.error("Failed to update service.");
    } finally {
      setLoading(false);
    }
  };

  // Delete Service
  const deleteService = async (serviceId) => {
    try {
      setLoading(true);
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const token = userInfo?.token;
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/services/${serviceId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      fetchServices(currentPage);
      toast.success("Service deleted successfully!");
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete service.");
    } finally {
      setLoading(false);
    }
  };

  // Toggle Active Status
  const toggleActiveStatus = async (serviceId, currentStatus) => {
    try {
      setLoading(true);
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const token = userInfo?.token;

      const response = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/services/${serviceId}`,
        { active: !currentStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data) {
        fetchServices(currentPage);
        toast.success(
          `Service marked as ${!currentStatus ? "Active" : "Inactive"}!`
        );
      }
    } catch (err) {
      console.error("Error toggling active status:", err);
      toast.error("Failed to toggle active status.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-4 flex flex-col max-h-[650px] min-h-[650px] w-full max-w-[1200px] mx-auto">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Header */}
      <div className="flex-shrink-0">
        <h1 className="text-lg font-bold text-purple-400 mb-2">
          Manage Services
        </h1>
      </div>

      {/* Add New Service Form */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-gray-800/70 backdrop-blur-lg p-4 rounded-lg shadow-lg mb-4 border border-gray-700/50 flex-shrink-0"
      >
        <h2 className="text-lg font-semibold text-purple-300 mb-2">
          Add New Service
        </h2>
        <h6 className="text-xs text-gray-400 mb-3">
          (ALL FIELDS ARE REQUIRED)
        </h6>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Input fields */}
          <input
            required
            type="text"
            placeholder="Service Name"
            className="border border-gray-700 bg-gray-700/50 text-white p-1.5 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
            value={newService.name}
            onChange={(e) =>
              setNewService({ ...newService, name: e.target.value })
            }
          />
          <input
            required
            type="text"
            placeholder="Price"
            className="border border-gray-700 bg-gray-700/50 text-white p-1.5 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
            value={newService.price}
            onChange={(e) =>
              setNewService({ ...newService, price: e.target.value })
            }
          />
          <input
            required
            type="text"
            placeholder="Description"
            className="border border-gray-700 bg-gray-700/50 text-white p-1.5 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
            value={newService.description}
            onChange={(e) =>
              setNewService({ ...newService, description: e.target.value })
            }
          />
          <select
            className="border border-gray-700 bg-gray-700/50 text-white p-1.5 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
            value={newService.priceType}
            onChange={(e) =>
              setNewService({ ...newService, priceType: e.target.value })
            }
          >
            <option value="fixed">Fixed Price</option>
            <option value="perUnit">Per Unit</option>
          </select>
          <label className="flex items-center text-gray-400 text-sm">
            <input
              type="checkbox"
              className="mr-2"
              checked={newService.requiresDimensions}
              onChange={(e) =>
                setNewService({
                  ...newService,
                  requiresDimensions: e.target.checked,
                })
              }
            />
            Requires Dimensions
          </label>
          <label className="flex items-center text-gray-400 text-sm">
            <input
              type="checkbox"
              className="mr-2"
              checked={newService.requiresDocument}
              onChange={(e) =>
                setNewService({
                  ...newService,
                  requiresDocument: e.target.checked,
                })
              }
            />
            Requires Document
          </label>
          <div className="flex items-center overflow-hidden">
            <input
              required
              type="file"
              name="file"
              onChange={handleFileChange}
              accept=".pdf,.jpg,.png"
              className="border border-gray-700 bg-gray-700/50 text-white p-1.5 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 w-full text-sm"
              key={
                newService.document ? "file-input-filled" : "file-input-empty"
              }
            />
            {newService.document && (
              <p className="text-xs text-gray-400 ml-2">
                Selected: {newService.document.name}
              </p>
            )}
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={addService}
          disabled={
            loading ||
            !newService.name ||
            !newService.price ||
            !newService.description ||
            !newService.document
          }
          className="mt-3 bg-purple-500 text-white px-3 py-1.5 rounded-md hover:bg-purple-600 transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed text-sm"
        >
          {loading ? "Adding..." : "Add Service"}
        </motion.button>
      </motion.div>

      {/* Services Table */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="bg-gray-800/70 backdrop-blur-lg p-4 rounded-lg shadow-lg border border-gray-700/50 flex-grow overflow-hidden"
        style={{ maxHeight: "300px", overflowY: "auto" }} // Fixed height and scrollable
      >
        <h2 className="text-lg font-semibold text-purple-300 mb-2">
          Services List
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-700/50">
                <th className="p-2 text-left text-purple-400 text-sm">Name</th>
                <th className="p-2 text-left text-purple-400 text-sm">Price</th>
                <th className="p-2 text-left text-purple-400 text-sm">
                  Description
                </th>
                <th className="p-2 text-left text-purple-400 text-sm">
                  Price Type
                </th>
                <th className="p-2 text-left text-purple-400 text-sm">
                  Requires Dimensions
                </th>
                <th className="p-2 text-left text-purple-400 text-sm">
                  Requires Document
                </th>
                <th className="p-2 text-left text-purple-400 text-sm">
                  Document
                </th>
                <th className="p-2 text-left text-purple-400 text-sm">
                  Status
                </th>
                <th className="p-2 text-left text-purple-400 text-sm">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {services.length > 0 ? (
                services.map((service) => (
                  <motion.tr
                    key={service._id}
                    className="border-b border-gray-700/50 hover:bg-gray-700/30 transition duration-200"
                  >
                    <td className="p-2 text-purple-300 text-sm">
                      {service.name}
                    </td>
                    <td className="p-2 text-purple-300 text-sm">
                      ₹{service.price}
                    </td>
                    <td className="p-2 text-purple-300 text-sm">
                      {service.description}
                    </td>
                    <td className="p-2 text-purple-300 text-sm">
                      {service.priceType}
                    </td>
                    <td className="p-2 text-purple-300 text-sm">
                      {service.requiresDimensions ? "Yes" : "No"}
                    </td>
                    <td className="p-2 text-purple-300 text-sm">
                      {service.requiresDocument ? "Yes" : "No"}
                    </td>
                    <td className="p-2">
                      {service.document && (
                        <a
                          href={service.document}
                          target="_blank"
                          className="text-blue-400 hover:underline text-sm"
                        >
                          View
                        </a>
                      )}
                    </td>
                    <td className="p-2">
                      <button
                        onClick={() =>
                          toggleActiveStatus(service._id, service.active)
                        }
                        disabled={loading}
                        className={`px-2 py-1 rounded text-sm ${
                          service.active
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                        } disabled:bg-gray-400 disabled:cursor-not-allowed`}
                      >
                        {service.active ? "Active" : "Inactive"}
                      </button>
                    </td>
                    <td className="p-2">
                      <div className="flex justify-center items-center gap-1">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setEditService(service)}
                          disabled={loading}
                          className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded hover:bg-yellow-500/30 transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed text-sm"
                        >
                          Edit
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => deleteService(service._id)}
                          disabled={loading}
                          className="bg-red-500/20 text-red-400 px-2 py-1 rounded hover:bg-red-500/30 transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed text-sm"
                        >
                          Delete
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="9"
                    className="text-center p-2 text-gray-400 text-sm"
                  >
                    No services found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Pagination Controls */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="flex justify-center items-center mt-4 gap-3 flex-shrink-0"
      >
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1 || loading}
          className={`px-3 py-1 rounded-md text-sm ${
            currentPage === 1 || loading
              ? "bg-gray-700/50 cursor-not-allowed"
              : "bg-purple-500/20 text-purple-400 hover:bg-purple-500/30"
          }`}
        >
          Previous
        </motion.button>

        <span className="text-sm font-semibold text-purple-300">
          Page {currentPage} of {totalPages}
        </span>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages || loading}
          className={`px-3 py-1 rounded-md text-sm ${
            currentPage === totalPages || loading
              ? "bg-gray-700/50 cursor-not-allowed"
              : "bg-purple-500/20 text-purple-400 hover:bg-purple-500/30"
          }`}
        >
          Next
        </motion.button>
      </motion.div>
    </div>
  );
};

export default ManageServices;
