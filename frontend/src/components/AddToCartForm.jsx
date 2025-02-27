import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

    const fileUrl = await handleFileUpload();
    if (!fileUrl) return;

    dispatch(
      addToCart({
        service,
        width,
        length,
        document: fileUrl,
        quantity: 1,
      })
    );

    toast.success("Added to cart successfully!");
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-lg w-full relative animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-600 hover:text-gray-900 text-xl font-bold"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Add {service.name} to Cart
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Width */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Width (ft):
            </label>
            <input
              type="number"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              required
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Enter width"
            />
          </div>

          {/* Length */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Length (ft):
            </label>
            <input
              type="number"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              required
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Enter length"
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Upload Document:
            </label>
            <input
              type="file"
              onChange={(e) => setDocument(e.target.files[0])}
              accept=".pdf,.jpg,.png"
              required
              className="w-full border rounded-lg px-3 py-2 file:bg-blue-600 file:text-white file:px-3 file:py-2 file:rounded-lg file:cursor-pointer hover:file:bg-blue-700"
            />
            {document && (
              <p className="text-sm text-gray-600 mt-1">
                Selected: {document.name}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={uploading}
            className={`w-full py-2 rounded-lg text-white transition font-semibold ${
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
