import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { X } from "lucide-react";

const AddToCartForm = ({ service, onClose }) => {
  const dispatch = useDispatch();
  const [width, setWidth] = useState("");
  const [length, setLength] = useState("");
  const [document, setDocument] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async () => {
    if (!document) return null;

    const formData = new FormData();
    formData.append("file", document);

    try {
      setUploading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/uploads`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setUploading(false);
      return data.url;
    } catch (err) {
      setUploading(false);
      console.error("Upload failed:", err);
      toast.error("File upload failed. Please try again.");
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let fileUrl = null;
    if (service.requiresDocument) {
      fileUrl = await handleFileUpload();
      if (!fileUrl) return;
    }

    // Calculate total price based on priceType
    let totalPrice = service.price;
    if (service.priceType === "perUnit" && service.requiresDimensions) {
      totalPrice = service.price * width * length;
    }

    dispatch(
      addToCart({
        service,
        width: service.requiresDimensions ? width : 0,
        length: service.requiresDimensions ? length : 0,
        document: service.requiresDocument ? fileUrl : null,
        quantity: 1,
        totalPrice,
      })
    );

    toast.success("Added to cart successfully!");
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 backdrop-blur-sm">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-lg w-full relative animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Add <span className="text-blue-600">{service.name}</span> to Cart
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Width */}
          {service.requiresDimensions && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Width (ft):
              </label>
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="Enter width"
              />
            </div>
          )}

          {/* Length */}
          {service.requiresDimensions && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Length (ft):
              </label>
              <input
                type="number"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="Enter length"
              />
            </div>
          )}

          {/* File Upload */}
          {service.requiresDocument && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Document:
              </label>
              <div className="flex items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-500 transition-all">
                <input
                  type="file"
                  onChange={(e) => setDocument(e.target.files[0])}
                  accept=".pdf,.jpg,.png"
                  required
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer text-blue-600 hover:text-blue-700 font-medium"
                >
                  {document ? document.name : "Choose a file"}
                </label>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={uploading}
            className={`w-full py-3 rounded-lg text-white font-semibold transition-all ${
              uploading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {uploading ? "Uploading..." : "Add to Cart"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddToCartForm;
