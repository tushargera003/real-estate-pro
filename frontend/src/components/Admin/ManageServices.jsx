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
  });
  const [editService, setEditService] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false); // Loading state
  const itemsPerPage = 5;

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

  const handleFileChange = (e) => {
    setNewService({ ...newService, document: e.target.files[0] });
  };

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
      setNewService({ name: "", price: "", description: "", document: null });
      toast.success("Service added successfully!");
    } catch (err) {
      console.error("Error adding service:", err);
      toast.error("Failed to add service.");
    } finally {
      setLoading(false);
    }
  };

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
    <div className="p-1">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="text-2xl font-bold mb-2">Manage Services</h1>

      {/* Add New Service Form */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-2 rounded-lg shadow-md mb-2"
      >
        <h2 className="text-l font-semibold mb-2">Add New Service</h2>
        <h6 className="text-s font-serif mb-2">(ALL FIELDS ARE REQUIRED)</h6>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <input
            required
            type="text"
            placeholder="Service Name"
            className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newService.name}
            onChange={(e) =>
              setNewService({ ...newService, name: e.target.value })
            }
          />
          <input
            required
            type="text"
            placeholder="Price"
            className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newService.price}
            onChange={(e) =>
              setNewService({ ...newService, price: e.target.value })
            }
          />
          <input
            required
            type="text"
            placeholder="Description"
            className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newService.description}
            onChange={(e) =>
              setNewService({ ...newService, description: e.target.value })
            }
          />
          <div className="flex items-center">
            <input
              required
              type="file"
              name="file"
              onChange={handleFileChange}
              accept=".pdf,.jpg,.png"
              className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              key={
                newService.document ? "file-input-filled" : "file-input-empty"
              }
            />
            {newService.document && (
              <p className="text-sm text-gray-600 ml-2">
                Selected: {newService.document.name}
              </p>
            )}
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={addService}
          disabled={loading}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? "Adding..." : "Add Service"}
        </motion.button>
      </motion.div>

      {/* Services Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-xl font-semibold mb-4">Services List</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Price</th>
                <th className="p-2 text-left">Description</th>
                <th className="p-2 text-left">Document</th>
                <th className="p-2 text-left">Active</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.length > 0 ? (
                services.map((service) => (
                  <motion.tr
                    key={service._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="border-b"
                  >
                    <td className="p-2">{service.name}</td>
                    <td className="p-2">₹{service.price}</td>
                    <td className="p-2">{service.description}</td>
                    <td className="p-2">
                      {service.document && (
                        <a
                          href={service.document}
                          target="_blank"
                          className="text-blue-500 hover:underline"
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
                        className={`px-2 py-1 rounded ${
                          service.active
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                        } disabled:bg-gray-400 disabled:cursor-not-allowed`}
                      >
                        {service.active ? "Active" : "Inactive"}
                      </button>
                    </td>
                    <td className="p-2 flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setEditService(service)}
                        disabled={loading}
                        className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                      >
                        Edit
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => deleteService(service._id)}
                        disabled={loading}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                      >
                        Delete
                      </motion.button>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center p-3">
                    No services found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Edit Modal */}
      <AnimatePresence>
        {editService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
            >
              <h2 className="text-xl font-bold mb-4">Edit Service</h2>
              <input
                required
                type="text"
                className="border p-2 w-full rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={editService.name}
                onChange={(e) =>
                  setEditService({ ...editService, name: e.target.value })
                }
              />
              <input
                type="text"
                required
                className="border p-2 w-full rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={editService.price}
                onChange={(e) =>
                  setEditService({ ...editService, price: e.target.value })
                }
              />
              <input
                type="text"
                required
                className="border p-2 w-full rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={editService.description}
                onChange={(e) =>
                  setEditService({
                    ...editService,
                    description: e.target.value,
                  })
                }
              />
              <input
                type="file"
                onChange={(e) =>
                  setEditService({
                    ...editService,
                    document: e.target.files[0],
                  })
                }
                className="border p-2 w-full rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={updateService}
                  disabled={loading}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {loading ? "Saving..." : "Save"}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setEditService(null)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-300"
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pagination Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex justify-center items-center mt-6 gap-4"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1 || loading}
          className={`px-4 py-2 rounded-lg ${
            currentPage === 1 || loading
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Previous
        </motion.button>

        <span className="text-lg font-semibold">
          Page {currentPage} of {totalPages}
        </span>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages || loading}
          className={`px-4 py-2 rounded-lg ${
            currentPage === totalPages || loading
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Next
        </motion.button>
      </motion.div>
    </div>
  );
};

export default ManageServices;
